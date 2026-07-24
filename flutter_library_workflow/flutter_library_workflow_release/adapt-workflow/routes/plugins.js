const express = require('express');
const fsSync = require('fs');
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const multer = require('multer');
const { readData, writeData, sanitizePlugin, readLibrarySources, normalizeRepoUrl, buildTpcRepoUrl } = require('../lib/data');
const { generateId, isValidRepoUrl, sanitizeRepoName, parseMonorepoUrl } = require('../lib/utils');
const { getReposDir, WORKSPACE_ROOT } = require('../lib/config');
const { readSettings } = require('../lib/settings');
const { getActiveProfile } = require('../lib/profile');
const { getEnrichedPluginList } = require('../lib/services/plugin-service');
const cloneService = require('../lib/services/clone-service');
const pubDownloadService = require('../lib/services/pub-download-service');
const zipService = require('../lib/services/zip-service');
const zipUploadService = require('../lib/services/zip-upload-service');
const { findPluginOrFail } = require('../lib/plugin-lookup');
const { asyncHandler, AppError } = require('../lib/errors');
const { getAdaptationDir } = require('../lib/agent/helpers');
const { normalizePackagePath, resolvePluginWorkRoot } = require('../lib/plugin-work-root');
const { loadUpgradeLibraryPlugin } = require('../lib/upgrade/detail-adapter');

// True when the request is served under an upgrade profile (detail-page reuse:
// upgrade libraries are addressed through the same /api/plugins/:id/... routes).
function isUpgradeRequest() {
  return getActiveProfile().workflow === 'upgrade';
}

const router = express.Router();

const UPLOAD_TEMP_DIR = path.join(__dirname, '..', 'data', '_temp-zip-uploads');
if (!fsSync.existsSync(UPLOAD_TEMP_DIR)) {
  fsSync.mkdirSync(UPLOAD_TEMP_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fsSync.existsSync(UPLOAD_TEMP_DIR)) {
      fsSync.mkdirSync(UPLOAD_TEMP_DIR, { recursive: true });
    }
    cb(null, UPLOAD_TEMP_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.originalname.endsWith('.zip')) {
      cb(null, true);
    } else {
      cb(new AppError('仅支持 .zip 文件', 400), false);
    }
  }
});

// 安卓 UI 参考截图上传：复用临时目录，仅接受图片，落盘后供 02 阶段编码参考与截图比对基线使用。
const imageUpload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024, files: 60 },
  fileFilter: (req, file, cb) => {
    if (/\.(png|jpe?g|webp)$/i.test(file.originalname)) {
      cb(null, true);
    } else {
      cb(new AppError('仅支持 PNG / JPG / WEBP 图片', 400), false);
    }
  }
});

// ── GET / — enriched plugin list (three-way merge) ──

router.get('/', asyncHandler(async (req, res) => {
  const plugins = await getEnrichedPluginList();
  res.json(plugins);
}));

// ── POST / — add a single plugin ──

router.post('/', asyncHandler(async (req, res) => {
  let { repoUrl, name: reqName, sourceUrl, tpcRepoUrl, packagePath: rawPackagePath } = req.body;

  if (!repoUrl) throw new AppError('Repository URL is required', 400);

  // Auto-detect monorepo URL (e.g. .../tree/main/packages/foo)
  const parsed = parseMonorepoUrl(repoUrl);
  repoUrl = parsed.repoUrl;
  if (!rawPackagePath && parsed.packagePath) {
    rawPackagePath = parsed.packagePath;
  }
  const sourceBranch = parsed.sourceBranch || '';

  if (!repoUrl.endsWith('.git')) {
    repoUrl = repoUrl + '.git';
  }

  if (!isValidRepoUrl(repoUrl)) throw new AppError('Invalid repository URL format', 400);

  const rawName = reqName || repoUrl.split('/').pop().replace('.git', '');
  const repoName = sanitizeRepoName(rawName);

  if (!repoName) throw new AppError('Invalid repository name', 400);

  const data = await readData();
  const existing = data.plugins.find(p => p.name === repoName);
  if (existing) {
    return res.json(existing);
  }

  const id = generateId();
  let packagePathNorm = '';
  try {
    packagePathNorm = normalizePackagePath(rawPackagePath);
  } catch (e) {
    if (e instanceof AppError) throw e;
    throw new AppError(String(e.message || e), 400);
  }

  const plugin = {
    id,
    name: repoName,
    repoUrl,
    sourceUrl: sourceUrl || '',
    tpcRepoUrl: tpcRepoUrl || buildTpcRepoUrl(repoName),
    commitHash: '',
    cloneTime: null,
    addedAt: new Date().toISOString(),
    status: 'initialized',
    ...(packagePathNorm ? { packagePath: packagePathNorm } : {}),
    ...(sourceBranch ? { sourceBranch } : {})
  };

  data.plugins.push(plugin);
  await writeData(data);

  res.json(plugin);
}));

// ── POST /batch-create — add multiple repos and auto batch-clone ──

router.post('/batch-create', asyncHandler(async (req, res) => {
  const { urls } = req.body;
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new AppError('urls must be a non-empty array', 400);
  }

  const data = await readData();
  const created = [];
  const skipped = [];

  for (const rawUrl of urls) {
    let repoUrl = String(rawUrl).trim();
    if (!repoUrl) continue;

    // Auto-detect monorepo URL (e.g. .../tree/main/packages/foo)
    const parsed = parseMonorepoUrl(repoUrl);
    repoUrl = parsed.repoUrl;
    const packagePath = parsed.packagePath;
    const sourceBranch = parsed.sourceBranch;

    if (!repoUrl.endsWith('.git')) {
      repoUrl = repoUrl + '.git';
    }

    if (!isValidRepoUrl(repoUrl)) {
      skipped.push({ url: String(rawUrl).trim(), reason: 'invalid_url' });
      continue;
    }

    // For monorepo, use the sub-package directory name; otherwise use repo name
    const rawName = packagePath
      ? packagePath.split('/').pop()
      : repoUrl.split('/').pop().replace('.git', '');
    const repoName = sanitizeRepoName(rawName);
    if (!repoName) {
      skipped.push({ url: String(rawUrl).trim(), reason: 'invalid_name' });
      continue;
    }

    const existing = data.plugins.find(p => p.name === repoName);
    if (existing) {
      skipped.push({ url: String(rawUrl).trim(), reason: 'duplicate', name: repoName });
      continue;
    }

    let packagePathNorm = '';
    try {
      packagePathNorm = normalizePackagePath(packagePath);
    } catch { /* ignore invalid packagePath in batch mode */ }

    const id = generateId();
    const plugin = {
      id,
      name: repoName,
      repoUrl,
      sourceUrl: '',
      tpcRepoUrl: buildTpcRepoUrl(repoName),
      commitHash: '',
      cloneTime: null,
      addedAt: new Date().toISOString(),
      status: 'initialized',
      ...(packagePathNorm ? { packagePath: packagePathNorm } : {}),
      ...(sourceBranch ? { sourceBranch } : {})
    };

    data.plugins.push(plugin);
    created.push(plugin);
  }

  if (created.length > 0) {
    await writeData(data);
  }

  res.json({ created: created.length, skipped, ids: created.map(p => p.id), plugins: created });

  if (created.length > 0) {
    const profileId = getActiveProfile().id;
    const settings = await readSettings();
    const maxConcurrency = settings.maxCloneConcurrency || 5;
    cloneService.startBatchClone(created.map(p => p.id), maxConcurrency, { profileId }).catch(err =>
      console.error('Batch clone error:', err.message)
    );
  }
}));

// ── POST /:id/clone — clone a single repo ──

router.post('/:id/clone', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { branch } = req.body || {};
  const profileId = getActiveProfile().id;

  const plugin = await cloneService.findOrMaterializePlugin(id);
  if (!plugin) throw new AppError('Plugin not found', 404);

  plugin.status = 'cloning';
  await cloneService.persistPlugin(plugin);
  res.json(plugin);

  cloneService.clonePlugin(plugin.id, { branch, profileId }).catch(err =>
    console.error('Clone error:', err.message)
  );
}));

// ── POST /batch-clone — clone multiple repos with concurrency control ──

router.post('/batch-clone', asyncHandler(async (req, res) => {
  const { ids, all } = req.body;
  const profileId = getActiveProfile().id;
  const settings = await readSettings();
  const maxConcurrency = settings.maxCloneConcurrency || 5;

  let targetIds = ids || [];
  if (all) {
    targetIds = await cloneService.resolveBatchCloneTargets(targetIds);
  }

  if (targetIds.length === 0) {
    return res.json({ success: true, total: 0, message: '没有需要克隆的插件' });
  }

  const result = await cloneService.startBatchClone(targetIds, maxConcurrency, { profileId });
  if (!result.started) {
    throw new AppError(result.error, 409);
  }

  res.json({
    success: true,
    total: result.total,
    message: `开始批量克隆 ${result.total} 个插件（并发 ${maxConcurrency}）`
  });
}));

router.get('/batch-clone/status', (req, res) => {
  res.json(cloneService.getBatchCloneState());
});

// ── PATCH /:id — update plugin fields ──

router.patch('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = sanitizePlugin(req.body);

  const data = await readData();
  const index = data.plugins.findIndex(p => p.id === id);

  if (index === -1) throw new AppError('Plugin not found', 404);

  const merged = { ...data.plugins[index], ...updates };
  if (Object.prototype.hasOwnProperty.call(updates, 'packagePath')) {
    let norm = '';
    try {
      norm = normalizePackagePath(updates.packagePath);
    } catch (e) {
      if (e instanceof AppError) throw e;
      throw new AppError(String(e.message || e), 400);
    }
    merged.packagePath = norm || undefined;
    if (merged.packagePath === undefined) {
      delete merged.packagePath;
    }
    const cloneRoot = path.join(getReposDir(), merged.name);
    if (fsSync.existsSync(cloneRoot) && merged.packagePath) {
      const workRoot = resolvePluginWorkRoot(cloneRoot, merged);
      if (!fsSync.existsSync(workRoot)) {
        throw new AppError('packagePath 指向的目录不存在', 400);
      }
    }
  }

  data.plugins[index] = sanitizePlugin(merged);
  await writeData(data);

  res.json(data.plugins[index]);
}));

// ── DELETE /:id — remove plugin + clean local folder ──

router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await readData();
  const plugin = data.plugins.find(p => p.id === id);

  if (!plugin) {
    return res.json({ success: true, action: 'not_found' });
  }

  console.log(`Deleting: ${plugin.name}`);

  const libSources = readLibrarySources();
  const catalogNames = new Set(libSources.map(s => s.name));
  const catalogUrls = new Set(libSources.map(s => normalizeRepoUrl(s.source_url)));
  const inCatalog = catalogNames.has(plugin.name) ||
    (plugin.repoUrl && catalogUrls.has(normalizeRepoUrl(plugin.repoUrl)));

  const repoPath = path.join(getReposDir(), plugin.name);
  if (fsSync.existsSync(repoPath)) {
    await fs.rm(repoPath, { recursive: true, force: true });
  }

  data.plugins = data.plugins.filter(p => p.id !== id);
  await writeData(data);
  console.log(`Deleted: ${plugin.name}`);

  res.json({
    success: true,
    action: inCatalog ? 'reset' : 'removed',
    in_catalog: inCatalog
  });
}));

// ── POST /:id/open-dir ──

router.post('/:id/open-dir', asyncHandler(async (req, res) => {
  let openPath;
  let repoPath;

  if (isUpgradeRequest()) {
    const u = await loadUpgradeLibraryPlugin(req.params.id);
    if (!u) throw new AppError('library 不存在', 404);
    repoPath = u.repoDir;
    if (!fsSync.existsSync(repoPath)) throw new AppError('本地目录不存在，请先执行 Clone 操作', 404);
    openPath = repoPath;
  } else {
    const { plugin } = await findPluginOrFail(req.params.id);
    repoPath = path.join(getReposDir(), plugin.name);
    if (!fsSync.existsSync(repoPath)) throw new AppError('本地目录不存在，请先执行 Clone 操作', 404);
    openPath = resolvePluginWorkRoot(repoPath, plugin);
  }

  const platform = process.platform;
  let cmd;
  if (platform === 'darwin') cmd = 'open';
  else if (platform === 'win32') cmd = 'explorer';
  else cmd = 'xdg-open';

  const child = spawn(cmd, [openPath], { detached: true, stdio: 'ignore' });
  child.unref();

  res.json({ success: true, path: repoPath });
}));

// ── POST /:id/sync-to-tpc — push adapted code to TPC target branch (profile-driven) ──

router.post('/:id/sync-to-tpc', asyncHandler(async (req, res) => {
  // TPC sync is adaptation-only (push adapted code to the harmonised org).
  // Upgrade reuses the detail page (button stays visible) but the operation is
  // not wired for upgrade yet — return a benign not-supported result.
  if (isUpgradeRequest()) {
    return res.json({ success: false, error: '升级工作流暂不支持 TPC 同步' });
  }
  const result = await cloneService.syncToTpc(req.params.id);

  if (!result.success) {
    const status = result.error === '插件不存在' ? 404 : result.error === '仓库尚未克隆' ? 400 : 500;
    throw new AppError(result.error, status);
  }

  res.json(result);
}));

// ── 安卓 UI 参考截图：落盘到 <workRoot>/.ohos-adaptation/ui-baseline/android/ ──
// 文件名保留用户命名（可表示页面，如 登录页.png），供 02 阶段 UI 编码参考与后续截图比对基线使用。

function sanitizeShotName(original) {
  const ext = path.extname(original || '').toLowerCase();
  const rawBase = path.basename(original || '', path.extname(original || ''));
  const safeBase = rawBase
    .replace(/[\\/]/g, '_')
    .replace(/[\x00-\x1f<>:"|?*]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\.+$/, '')
    .trim()
    .slice(0, 80) || 'shot';
  const safeExt = /^\.(png|jpe?g|webp)$/.test(ext) ? (ext === '.jpeg' ? '.jpg' : ext) : '.png';
  return `${safeBase}${safeExt}`;
}

async function resolveAndroidShotsDir(pluginId) {
  const { plugin } = await findPluginOrFail(pluginId);
  const repoPath = path.join(getReposDir(), plugin.name);
  if (!fsSync.existsSync(repoPath)) {
    throw new AppError('本地目录不存在，请先执行 Clone 操作', 404);
  }
  const workRoot = resolvePluginWorkRoot(repoPath, plugin);
  const dir = path.join(getAdaptationDir(workRoot), 'ui-baseline', 'android');
  return { workRoot, dir };
}

// GET /:id/android-ui-shots — 列出已上传的安卓 UI 截图
router.get('/:id/android-ui-shots', asyncHandler(async (req, res) => {
  // Android UI baseline shots are adaptation-only; report empty for upgrade so
  // the reused upload UI doesn't 404.
  if (isUpgradeRequest()) return res.json({ success: true, dir: '', count: 0, files: [] });
  const { workRoot, dir } = await resolveAndroidShotsDir(req.params.id);
  let files = [];
  if (fsSync.existsSync(dir)) {
    files = (await fs.readdir(dir)).filter((n) => /\.(png|jpe?g|webp)$/i.test(n)).sort();
  }
  res.json({ success: true, dir: path.relative(workRoot, dir), count: files.length, files });
}));

// POST /:id/android-ui-shots — 上传一张或多张安卓 UI 截图（字段名 shots）
router.post('/:id/android-ui-shots', imageUpload.array('shots', 60), asyncHandler(async (req, res) => {
  if (isUpgradeRequest()) {
    return res.json({ success: true, dir: '', count: 0, files: [] });
  }
  const files = req.files || [];
  try {
    const { workRoot, dir } = await resolveAndroidShotsDir(req.params.id);
    if (!files.length) throw new AppError('请选择要上传的截图', 400);
    await fs.mkdir(dir, { recursive: true });
    const saved = [];
    for (const f of files) {
      const safe = sanitizeShotName(f.originalname);
      await fs.copyFile(f.path, path.join(dir, safe));
      saved.push(safe);
    }
    res.json({ success: true, dir: path.relative(workRoot, dir), count: saved.length, files: saved });
  } finally {
    for (const f of files) { await fs.unlink(f.path).catch(() => {}); }
  }
}));

// ── POST /zip-upload — upload SDK as ZIP file (Android SDK Profile only) ──

router.post('/zip-upload', upload.single('zipFile'), asyncHandler(async (req, res) => {
  const { name: pluginName } = req.body;
  const zipFile = req.file;

  if (!pluginName || typeof pluginName !== 'string') {
    throw new AppError('请提供插件名称', 400);
  }

  const trimmedName = pluginName.trim();
  if (!trimmedName || trimmedName.length > 64) {
    throw new AppError('插件名称长度必须在 1-64 字符之间', 400);
  }

  if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(trimmedName)) {
    throw new AppError('插件名称必须以字母开头，只能包含字母、数字、下划线和连字符', 400);
  }

  if (!zipFile) {
    throw new AppError('请上传 ZIP 文件', 400);
  }

  const nameExists = await zipUploadService.checkPluginNameExists(trimmedName);
  if (nameExists) {
    throw new AppError(`插件名称 "${trimmedName}" 已存在，请使用不同的名称`, 409);
  }

  const result = await zipUploadService.processZipUpload(zipFile.path, trimmedName);

  if (!result.success) {
    throw new AppError(result.error || 'ZIP 上传处理失败', 400);
  }

  res.json({
    success: true,
    plugin: result.plugin,
    analysis: result.analysis,
    message: `SDK "${trimmedName}" 已成功上传并导入`
  });
}));

// ── POST /pub-download — batch download from pub.dev ──

router.post('/pub-download', asyncHandler(async (req, res) => {
  let { packageNames } = req.body;
  const profileId = getActiveProfile().id;

  if (!packageNames) {
    throw new AppError('请提供 packageNames', 400);
  }

  // Support string input (newline or comma separated) or array
  let inputLines = [];
  if (typeof packageNames === 'string') {
    inputLines = packageNames.split('\n').map(s => s.trim()).filter(Boolean);
  } else if (Array.isArray(packageNames)) {
    inputLines = packageNames.map(s => typeof s === 'string' ? s.trim() : '').filter(Boolean);
  }

  if (inputLines.length === 0) {
    throw new AppError('没有有效的输入', 400);
  }

  // Parse each line: comma-separated packages (may include version like "dio:5.4.0")
  // Each line is a group, first package is the main directory name
  const packageGroups = [];
  const invalidNames = [];

  for (const line of inputLines) {
    const packagesInLine = line.split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (packagesInLine.length === 0) continue;

    // Validate all package names in this line (extract name from "name:version" format)
    const validPackages = [];
    for (const pkgInput of packagesInLine) {
      const parsed = pubDownloadService.parsePackageWithVersion(pkgInput);

      if (parsed.name && isValidPubPackageName(parsed.name)) {
        // Store the original input (with version if specified)
        validPackages.push(pkgInput);
      } else {
        invalidNames.push(pkgInput);
      }
    }

    if (validPackages.length > 0) {
      packageGroups.push(validPackages);
    }
  }

  if (packageGroups.length === 0) {
    throw new AppError('没有有效的包名', 400);
  }

  // Create plugin records for each group (using main package name without version)
  const data = await readData();
  const createdPlugins = [];
  const existingPlugins = [];

  for (const group of packageGroups) {
    // Extract package name from first input (may be "name:version")
    const mainPackageInput = group[0];
    const { name: mainPackageName } = pubDownloadService.parsePackageWithVersion(mainPackageInput);

    const existing = data.plugins.find(p => p.name === mainPackageName);
    if (existing) {
      existingPlugins.push(existing);
      continue;
    }

    // Create a new plugin record for the main package
    const plugin = {
      id: generateId(),
      name: mainPackageName,
      repoUrl: '',
      sourceUrl: `https://pub.dev/packages/${mainPackageName}`,
      tpcRepoUrl: buildTpcRepoUrl(mainPackageName),
      commitHash: '',
      cloneTime: null,
      status: 'initialized',
      sourceType: 'pub',
      pubVersion: '',
      pubArchiveUrl: '',
      pubPackages: group.length > 1 ? group : undefined  // Store all packages if federated
    };

    data.plugins.push(plugin);
    createdPlugins.push(plugin);
  }

  if (createdPlugins.length > 0) {
    await writeData(data);
  }

  // Start batch download with package groups
  const settings = await readSettings();
  const maxConcurrency = settings.maxCloneConcurrency || 5;
  const result = await pubDownloadService.startBatchDownload(packageGroups, maxConcurrency, { profileId });

  res.json({
    success: true,
    total: packageGroups.length,
    created: createdPlugins.length,
    existing: existingPlugins.length,
    invalid: invalidNames,
    groups: packageGroups.map(g => g.length > 1 ? `${g[0]} (${g.length} packages)` : g[0]),
    message: `开始下载 ${packageGroups.length} 个插件组（并发 ${maxConcurrency}）`
  });
}));

// ── GET /pub-download/status — get batch download status ──

router.get('/pub-download/status', (req, res) => {
  res.json(pubDownloadService.getBatchDownloadState());
});

// ── POST /pub-download/resolve — resolve package names and check existence ──

router.post('/pub-download/resolve', asyncHandler(async (req, res) => {
  let { packageNames } = req.body;

  if (!packageNames) {
    throw new AppError('请提供 packageNames', 400);
  }

  // Support string or array input
  let inputLines = [];
  if (typeof packageNames === 'string') {
    inputLines = packageNames.split('\n').map(s => s.trim()).filter(Boolean);
  } else if (Array.isArray(packageNames)) {
    inputLines = packageNames.map(s => typeof s === 'string' ? s.trim() : '').filter(Boolean);
  }

  const data = await readData();
  const results = [];

  for (const line of inputLines) {
    const packagesInLine = line.split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (packagesInLine.length === 0) continue;

    const mainPackageName = packagesInLine[0];
    const existing = data.plugins.find(p => p.name === mainPackageName);
    const repoPath = path.join(getReposDir(), mainPackageName);
    const repoExists = fsSync.existsSync(repoPath);

    results.push({
      line: line,
      mainPackage: mainPackageName,
      packages: packagesInLine,
      valid: packagesInLine.every(pkg => isValidPubPackageName(pkg)),
      inList: !!existing,
      repoExists,
      status: existing?.status || (repoExists ? 'cloned' : 'not_cloned')
    });
  }

  res.json({ results });
}));

/**
 * Validate pub.dev package name
 * Rules: lowercase letters, numbers, underscores, hyphens; cannot start with number
 */
function isValidPubPackageName(name) {
  if (!name || typeof name !== 'string') return false;
  // pub.dev package name rules
  return /^[a-z][a-z0-9_-]*$/.test(name) && name.length <= 64;
}

// ── POST /batch-zip — batch zip selected plugins ──

router.post('/batch-zip', asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new AppError('请提供要打包的插件ID列表', 400);
  }

  // Get plugin names from IDs
  const data = await readData();
  const pluginNames = [];

  for (const id of ids) {
    const plugin = data.plugins.find(p => p.id === id);
    if (plugin && plugin.status === 'cloned') {
      pluginNames.push(plugin.name);
    }
  }

  if (pluginNames.length === 0) {
    throw new AppError('没有可打包的插件（需要已克隆状态）', 400);
  }

  // Batch zip
  const result = await zipService.batchZipPlugins(pluginNames);

  res.json({
    success: result.success,
    total: pluginNames.length,
    successCount: result.successCount,
    failedCount: result.failedCount,
    totalSize: result.totalSizeFormatted,
    outputDir: result.outputDir,
    results: result.results.map(r => ({
      pluginName: r.pluginName,
      success: r.success,
      size: r.sizeFormatted,
      error: r.error
    }))
  });
}));

// ── GET /batch-zip/output-dir — get zip output directory ──

router.get('/batch-zip/output-dir', (req, res) => {
  res.json({
    outputDir: zipService.getZipOutputDir()
  });
});

// ── POST /batch-zip/open-output-dir — open zip output directory ──

router.post('/batch-zip/open-output-dir', asyncHandler(async (req, res) => {
  await zipService.openZipOutputDir();
  res.json({ success: true });
}));

// ── GET /:id/edge-disable — get disabled edges for a plugin ──

router.get('/:id/edge-disable', asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Upgrade pipeline is a fixed linear chain with no user-toggled edges; the
  // reused pipeline renderer still calls this on load, so return empty (200).
  if (isUpgradeRequest()) return res.json({ disabledEdges: [] });
  const { plugin } = await findPluginOrFail(id);
  
  const cloneRoot = path.join(getReposDir(), plugin.name);
  const workRepoPath = resolvePluginWorkRoot(cloneRoot, plugin);
  const edgeDisablePath = path.join(getAdaptationDir(workRepoPath), 'edge-disable.json');
  
  try {
    if (fsSync.existsSync(edgeDisablePath)) {
      const data = JSON.parse(fsSync.readFileSync(edgeDisablePath, 'utf8'));
      res.json({ disabledEdges: data.disabledEdges || [] });
    } else {
      res.json({ disabledEdges: [] });
    }
  } catch (error) {
    console.error('Error reading edge-disable.json:', error);
    res.json({ disabledEdges: [] });
  }
}));

// ── POST /:id/edge-disable — save disabled edges for a plugin ──

router.post('/:id/edge-disable', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { disabledEdges } = req.body || {};

  if (isUpgradeRequest()) return res.json({ success: true });

  const { plugin } = await findPluginOrFail(id);
  
  const cloneRoot = path.join(getReposDir(), plugin.name);
  const workRepoPath = resolvePluginWorkRoot(cloneRoot, plugin);
  const adaptDir = getAdaptationDir(workRepoPath);
  const edgeDisablePath = path.join(adaptDir, 'edge-disable.json');
  
  try {
    // Create adaptation directory if it doesn't exist
    if (!fsSync.existsSync(adaptDir)) {
      fsSync.mkdirSync(adaptDir, { recursive: true });
    }
    
    // Write disabled edges to file
    const data = { disabledEdges: Array.isArray(disabledEdges) ? disabledEdges : [] };
    fsSync.writeFileSync(edgeDisablePath, JSON.stringify(data, null, 2));
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing edge-disable.json:', error);
    throw new AppError('Failed to save disabled edges', 500);
  }
}));

module.exports = router;
