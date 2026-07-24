'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const fsSync = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const tar = require('tar');
const { pipeline } = require('stream/promises');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { HttpProxyAgent } = require('http-proxy-agent');
const { getReposDir } = require('../config');
const { readSettings, buildProxyEnv } = require('../settings');
const { generateId } = require('../utils');
const { buildTpcRepoUrl, readData, writeData, sanitizePlugin } = require('../data');
const { getActiveProfile, runWithProfile } = require('../profile');
const { ensureWorkspaceLinks } = require('../backends/workspace-links');
const { WORKSPACE_ROOT } = require('../config');

const PUB_API_BASE = 'https://pub.dev/api';
const PUB_ARCHIVE_BASE = 'https://pub.dev/packages';

/**
 * Parse package name with optional version
 * @param {string} input - Input like "dio:5.4.0" or "dio"
 * @returns {{name: string, version: string|null}}
 */
function parsePackageWithVersion(input) {
  if (!input || typeof input !== 'string') return { name: null, version: null };

  const trimmed = input.trim();

  // Check for version separator
  const colonIndex = trimmed.indexOf(':');

  if (colonIndex === -1) {
    // No version specified
    return { name: trimmed, version: null };
  }

  const name = trimmed.slice(0, colonIndex).trim();
  const version = trimmed.slice(colonIndex + 1).trim();

  // Validate version format (semver or pub.dev version format)
  // Examples: 1.0.0, 1.0.0-dev, 1.0.0-beta.1, 1.0.0+build
  const validVersion = /^[\d]+\.[\d]+\.[\d]+[\w.-]*$/.test(version);

  if (!validVersion) {
    console.warn(`[pub-download] Invalid version format: ${version}, will use latest`);
    return { name, version: null };
  }

  return { name, version };
}

/**
 * Fetch package info from pub.dev API (support specific version)
 * @param {string} packageName - The package name
 * @param {string|null} version - Optional specific version
 * @param {object} proxyEnv - Proxy environment variables
 * @returns {Promise<object>} - Package info including version and archive URL
 */
async function fetchPubPackageInfo(packageName, version = null, proxyEnv = {}) {
  return new Promise((resolve, reject) => {
    // If version specified, use specific version API endpoint
    const url = version
      ? `${PUB_API_BASE}/packages/${packageName}/versions/${version}`
      : `${PUB_API_BASE}/packages/${packageName}`;

    const options = {
      headers: {
        'Accept': 'application/vnd.pub.v2+json',
        'User-Agent': 'adapt-workflow/1.0'
      }
    };

    // Add proxy agent if configured
    const proxyUrl = proxyEnv.HTTPS_PROXY || proxyEnv.https_proxy || proxyEnv.HTTP_PROXY || proxyEnv.http_proxy;
    if (proxyUrl) {
      try {
        // Use https-proxy-agent for HTTPS requests through HTTP/HTTPS proxy
        options.agent = new HttpsProxyAgent(proxyUrl);
      } catch (e) {
        console.warn(`[pub-download] Failed to create proxy agent: ${e.message}`);
      }
    }

    const req = https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);

            // Based on whether version is specified, extract from different fields
            if (version) {
              // Specific version requested - return that version's info
              resolve({
                name: parsed.name || packageName,
                version: parsed.version,
                archiveUrl: parsed.archive_url,
                description: parsed.pubspec?.description || '',
                homepage: parsed.pubspec?.homepage || ''
              });
            } else {
              // No version specified - return latest
              resolve({
                name: parsed.name,
                latestVersion: parsed.latest?.version,
                archiveUrl: parsed.latest?.archive_url,
                description: parsed.latest?.pubspec?.description || '',
                homepage: parsed.latest?.pubspec?.homepage || ''
              });
            }
          } catch (e) {
            reject(new Error(`Failed to parse pub.dev response: ${e.message}`));
          }
        } else if (res.statusCode === 404) {
          reject(new Error(`Package${version ? ` version ${version}` : ''} not found on pub.dev: ${packageName}`));
        } else {
          reject(new Error(`pub.dev API error: ${res.statusCode} ${res.statusMessage}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Failed to fetch package info: ${e.message}`));
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Download a file from URL to local path
 * @param {string} url - The URL to download from
 * @param {string} destPath - The local path to save to
 * @param {object} proxyEnv - Proxy environment variables
 */
async function downloadFile(url, destPath, proxyEnv = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;

    const options = {
      headers: {
        'User-Agent': 'adapt-workflow/1.0'
      }
    };

    // Add proxy agent if configured
    const proxyUrl = proxyEnv.HTTPS_PROXY || proxyEnv.https_proxy || proxyEnv.HTTP_PROXY || proxyEnv.http_proxy;
    if (proxyUrl) {
      try {
        // Choose correct proxy agent based on target URL protocol
        const isHttps = url.startsWith('https:');
        options.agent = isHttps ? new HttpsProxyAgent(proxyUrl) : new HttpProxyAgent(proxyUrl);
      } catch (e) {
        console.warn(`[pub-download] Failed to create proxy agent: ${e.message}`);
      }
    }

    const req = protocol.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        downloadFile(res.headers.location, destPath, proxyEnv).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: ${res.statusCode} ${res.statusMessage}`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (e) => {
        fs.unlink(destPath, () => {});
        reject(new Error(`Failed to write file: ${e.message}`));
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Download failed: ${e.message}`));
    });

    req.setTimeout(120000, () => {
      req.destroy();
      reject(new Error('Download timeout'));
    });
  });
}

/**
 * Extract a .tar.gz file to destination directory
 * @param {string} tarPath - Path to the .tar.gz file
 * @param {string} destDir - Destination directory
 */
async function extractTarGz(tarPath, destDir) {
  // Ensure destination exists
  await fsPromises.mkdir(destDir, { recursive: true });
  await tar.x({
    file: tarPath,
    cwd: destDir
  });
}

/**
 * Download and extract a pub.dev package
 * @param {string} packageName - The package name
 * @param {string} reposDir - The repos directory
 * @param {object} proxyEnv - Proxy environment variables
 * @param {string|null} version - Optional specific version to download
 * @returns {Promise<object>} - Download result with version and paths
 */
async function downloadPubPackage(packageName, reposDir, proxyEnv = {}, version = null) {
  // Fetch package info (supports specific version)
  const info = await fetchPubPackageInfo(packageName, version, proxyEnv);

  // Based on whether version was specified, extract correct fields
  const actualVersion = version ? info.version : info.latestVersion;
  const archiveUrl = info.archiveUrl;

  if (!actualVersion || !archiveUrl) {
    throw new Error(`No${version ? ` version ${version}` : ' stable version'} found for ${packageName}`);
  }

  const targetDir = path.join(reposDir, packageName);
  const tarPath = path.join(reposDir, `${packageName}-${actualVersion}.tar.gz`);

  // Check if already downloaded
  if (fsSync.existsSync(targetDir)) {
    console.log(`[pub-download] ${packageName} already exists at ${targetDir}, skipping download`);
    return {
      version: actualVersion,
      archiveUrl,
      targetDir,
      skipped: true
    };
  }

  console.log(`[pub-download] Downloading ${packageName} ${actualVersion} from ${archiveUrl}...`);

  // Download archive
  await downloadFile(archiveUrl, tarPath, proxyEnv);

  console.log(`[pub-download] Extracting ${packageName} ${actualVersion}...`);

  // Extract archive
  await extractTarGz(tarPath, targetDir);

  // Cleanup tar.gz
  try {
    await fsPromises.unlink(tarPath);
  } catch {}

  console.log(`[pub-download] ${packageName} ${actualVersion} extracted to ${targetDir}`);

return {
    version: actualVersion,
    archiveUrl,
    targetDir,
    description: info.description,
    homepage: info.homepage,
    skipped: false
  };
}

/**
 * Download a group of packages to a single main directory (for federated plugins)
 * Supports version specification: "packageName:version"
 * Single package: extract directly to repos/{packageName}/
 * Multiple packages: extract each to repos/{mainPackage}/{packageName}/
 * @param {string[]} packages - Array of package inputs (may include version like "dio:5.4.0")
 * @param {string} reposDir - The repos directory
 * @param {object} proxyEnv - Proxy environment variables
 * @returns {Promise<object>} - Download result with all packages info
 */
async function downloadPubPackageGroup(packages, reposDir, proxyEnv = {}) {
  if (!packages || packages.length === 0) {
    throw new Error('No packages provided');
  }

  // Parse each package input to extract name and optional version
  const parsedPackages = packages.map(p => parsePackageWithVersion(p));
  const mainPackageName = parsedPackages[0]?.name;

  if (!mainPackageName) {
    throw new Error('Invalid main package name');
  }

  // Single package: extract directly without extra subdirectory
  if (packages.length === 1) {
    console.log(`[pub-download] Downloading single package: ${mainPackageName}${parsedPackages[0].version ? `:${parsedPackages[0].version}` : ''}`);
    const { name, version } = parsedPackages[0];
    const result = await downloadPubPackage(name, reposDir, proxyEnv, version);
    return {
      mainPackage: mainPackageName,
      packages: [{
        name,
        version: result.version,
        archiveUrl: result.archiveUrl,
        targetDir: result.targetDir,
        description: result.description,
        homepage: result.homepage,
        skipped: result.skipped
      }],
      targetDir: result.targetDir,
      allSkipped: result.skipped,
      isFederated: false
    };
  }

  // Multiple packages: create main directory with subdirectories
  console.log(`[pub-download] Downloading package group (federated): ${packages.join(', ')}`);

  const mainDir = path.join(reposDir, mainPackageName);

  // Create main directory
  await fsPromises.mkdir(mainDir, { recursive: true });

  const results = [];
  let hasNewDownload = false;

  for (const parsed of parsedPackages) {
    const { name, version } = parsed;

    if (!name) {
      console.warn(`[pub-download] Invalid package name in group, skipping`);
      continue;
    }

    const pkgDir = path.join(mainDir, name);
    const tarPath = path.join(reposDir, `${name}-temp.tar.gz`);

    // Check if subdirectory already exists
    if (fsSync.existsSync(pkgDir)) {
      console.log(`[pub-download] ${name} already exists in ${mainPackageName}, skipping`);
      results.push({
        name,
        targetDir: pkgDir,
        skipped: true
      });
      continue;
    }

    try {
      // Fetch package info (supports specific version)
      const info = await fetchPubPackageInfo(name, version, proxyEnv);

      const actualVersion = version ? info.version : info.latestVersion;
      const archiveUrl = info.archiveUrl;

      if (!actualVersion || !archiveUrl) {
        console.warn(`[pub-download] No${version ? ` version ${version}` : ' version'} found for ${name}, skipping`);
        results.push({
          name,
          error: 'No version found',
          skipped: true
        });
        continue;
      }

      console.log(`[pub-download] Downloading ${name} ${actualVersion}${version ? ` (specified: ${version})` : ''}...`);

      // Download archive
      await downloadFile(archiveUrl, tarPath, proxyEnv);

      console.log(`[pub-download] Extracting ${name} to ${pkgDir}...`);

      // Extract to subdirectory
      await extractTarGz(tarPath, pkgDir);

      // Cleanup tar.gz
      try {
        await fsPromises.unlink(tarPath);
      } catch {}

      hasNewDownload = true;

      results.push({
        name,
        version: actualVersion,
        archiveUrl,
        targetDir: pkgDir,
        description: info.description,
        homepage: info.homepage,
        skipped: false
      });
    } catch (err) {
      console.error(`[pub-download] Failed to download ${name}: ${err.message}`);
      results.push({
        name,
        error: err.message,
        skipped: true
      });
    }
  }

  // Create .gitignore in main directory
  if (hasNewDownload) {
    const gitignorePath = path.join(mainDir, '.gitignore');
    const gitignoreContent = `.claude/\n.opencode/\nCLAUDE.md\n.ohos-adaptation/\n`;
    try {
      await fsPromises.writeFile(gitignorePath, gitignoreContent);
    } catch {}
  }

  console.log(`[pub-download] Package group ${mainPackageName} completed: ${results.filter(r => !r.skipped).length}/${packages.length} downloaded`);

return {
    mainPackage: mainPackageName,
    packages: results,
    targetDir: mainDir,
    allSkipped: results.every(r => r.skipped),
    isFederated: true
  };
}

/**
 * Create a plugin record for pub.dev package
 * @param {string} packageName - The package name
 * @param {string} version - The version
 * @param {string} archiveUrl - The archive URL
 * @returns {object} - Plugin record
 */
function createPubPluginRecord(packageName, version, archiveUrl, description = '', homepage = '') {
  return {
    id: generateId(),
    name: packageName,
    repoUrl: homepage || '',
    sourceUrl: `https://pub.dev/packages/${packageName}`,
    tpcRepoUrl: buildTpcRepoUrl(packageName),
    commitHash: '',
    cloneTime: null,
    status: 'initialized',
    sourceType: 'pub',
    pubVersion: version,
    pubArchiveUrl: archiveUrl
  };
}

/**
 * Batch download state (similar to batch clone)
 */
const batchDownloadState = {
  running: false,
  progress: null,
  profileId: null
};

/**
 * Get batch download state
 */
function getBatchDownloadState() {
  return {
    running: batchDownloadState.running,
    progress: batchDownloadState.progress,
    profileId: batchDownloadState.profileId || batchDownloadState.progress?.profileId || null
  };
}

/**
 * Batch download package groups from pub.dev
 * @param {Array<string[]>} packageGroups - Array of package groups, each group is an array of package names
 *                                          First package in each group is the main directory name
 * @param {number} maxConcurrency - Maximum concurrent downloads
 * @returns {Promise<object>} - Batch result
 */
async function startBatchDownload(packageGroups, maxConcurrency = 5, options = {}) {
  const profileId = options.profileId || getActiveProfile().id;
  return runWithProfile(profileId, () => startBatchDownloadInCurrentProfile(packageGroups, maxConcurrency, profileId));
}

async function startBatchDownloadInCurrentProfile(packageGroups, maxConcurrency, profileId) {
  if (batchDownloadState.running) {
    return { started: false, total: 0, error: '批量下载已在进行中' };
  }

  if (!packageGroups || packageGroups.length === 0) {
    return { started: true, total: 0 };
  }

  batchDownloadState.running = true;
  batchDownloadState.profileId = profileId;
  batchDownloadState.progress = { total: packageGroups.length, completed: 0, failed: 0, current: '', profileId };

  const proxyEnv = await (async () => {
    const settings = await readSettings();
    return buildProxyEnv(settings);
  })();

  const reposDir = getReposDir();

  (async () => {
    await runWithProfile(profileId, async () => {
      async function downloadOneGroup(packageGroup) {
        // Parse main package name (may include version like "dio:5.4.0")
        const mainPackageInput = packageGroup[0];
        const { name: mainPackage } = parsePackageWithVersion(mainPackageInput);
        batchDownloadState.progress.current = mainPackage;

        try {
          const result = await downloadPubPackageGroup(packageGroup, reposDir, proxyEnv);

          // Update plugin record status to 'cloned'
          await updatePluginStatus(mainPackage, result, packageGroup);

          batchDownloadState.progress.completed++;
        } catch (err) {
          console.error(`[pub-download] Failed to download group ${mainPackage}: ${err.message}`);

          // Update plugin record status to 'clone_failed'
          await updatePluginStatusFailed(mainPackage, err.message);

          batchDownloadState.progress.failed++;
        }
      }

      const executing = new Set();
      for (const packageGroup of packageGroups) {
        const p = downloadOneGroup(packageGroup).then(() => { executing.delete(p); });
        executing.add(p);
        if (executing.size >= maxConcurrency) {
          await Promise.race(executing);
        }
      }
      await Promise.all(executing);

      batchDownloadState.running = false;
      batchDownloadState.progress = null;
      batchDownloadState.profileId = null;
      console.log(`[pub-download] Batch download completed: ${packageGroups.length} groups`);
    });
  })().catch(() => {
    batchDownloadState.running = false;
    batchDownloadState.progress = null;
    batchDownloadState.profileId = null;
  });

  return { started: true, total: packageGroups.length };
}

/**
 * Update plugin record after successful download
 */
async function updatePluginStatus(mainPackage, downloadResult, packageGroup) {
  try {
    const data = await readData();
    const pluginIdx = data.plugins.findIndex(p => p.name === mainPackage);

    if (pluginIdx === -1) return;

    const firstPkg = downloadResult.packages.find(p => p.name === mainPackage);

    data.plugins[pluginIdx] = sanitizePlugin({
      ...data.plugins[pluginIdx],
      status: 'cloned',
      cloneTime: new Date().toISOString(),
      pubVersion: firstPkg?.version || '',
      pubArchiveUrl: firstPkg?.archiveUrl || '',
      repoUrl: firstPkg?.homepage  || '',

      pubPackages: packageGroup.length > 1 ? packageGroup : undefined
    });

    await writeData(data);
  } catch (err) {
    console.error(`[pub-download] Failed to update plugin status for ${mainPackage}:`, err.message);
  }
}

/**
 * Update plugin record status to failed
 */
async function updatePluginStatusFailed(mainPackage, errorMessage) {
  try {
    const data = await readData();
    const pluginIdx = data.plugins.findIndex(p => p.name === mainPackage);

    if (pluginIdx === -1) return;

    data.plugins[pluginIdx] = sanitizePlugin({
      ...data.plugins[pluginIdx],
      status: 'clone_failed'
    });

    await writeData(data);
  } catch (err) {
    console.error(`[pub-download] Failed to update plugin status for ${mainPackage}:`, err.message);
  }
}

module.exports = {
  parsePackageWithVersion,
  fetchPubPackageInfo,
  downloadFile,
  extractTarGz,
  downloadPubPackage,
  downloadPubPackageGroup,
  createPubPluginRecord,
  getBatchDownloadState,
  startBatchDownload
};
