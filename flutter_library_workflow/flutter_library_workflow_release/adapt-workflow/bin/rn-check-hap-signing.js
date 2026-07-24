#!/usr/bin/env node
'use strict';

/**
 * RN 黑盒链路专用：build-profile.json5 签名一致性 + signed HAP 校验。
 *
 * 为什么独立于 adapt-workflow/lib/ohos-sign/build-profile-sync.js：
 *   公共库 syncProductSigningConfigRef 的 bracketStart 计算漏了 -1，导致
 *   products[].signingConfig 永远不会被替换为 signingConfigs[].name，这是
 *   RN demo 工程默认 signingConfig="debug" 与注入材料 name="default" 不匹配、
 *   最终产出 unsigned HAP 的根因。Flutter/SDK 暂未踩到，故公共库暂不动；
 *   RN 链路在此处自行实现严格对齐。
 *
 * 三类用法：
 *   1. CLI 检查：node rn-check-hap-signing.js <repoPath> [--align] [--rebuild]
 *      - 默认仅检查，输出问题清单；非 0 退出表示有问题
 *      - --align   检测到不一致时直接修正 build-profile.json5（强制 default）
 *      - --rebuild 对齐后调用 hvigorw assembleHap 重 build
 *   2. require：const { checkSigning, alignSigningConfigs, findSignedHap, rebuildHap } = require('./rn-check-hap-signing.js')
 *   3. 上游脚本（rn-ohos-blackbox-verify.js / gate-demo-gen.js）通过 require 复用
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const EXPECTED_NAME = 'default';

// ─── 路径解析 ───

/**
 * 定位 example_auto/harmony 工程根。
 * 支持两种入口路径：
 *   - 通过 repos-rn/<plugin>/ 进入：example_auto 在 ohos/example_auto（ohos 是 junction）
 *   - 通过 junction 真实路径（如 F:/rn/3）进入：example_auto 直接在根下
 * 返回 { repoPath, exampleAutoDir, harmonyDir, buildProfile, appJson5, outputsDir } 或抛错。
 */
function resolveExampleAuto(repoPath) {
  const root = path.resolve(repoPath);
  const candidates = [
    path.join(root, 'ohos', 'example_auto'),  // 标准入口（ohos 子目录）
    path.join(root, 'example_auto'),           // junction 真实路径入口
  ];
  let exampleAutoDir = '';
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      exampleAutoDir = c;
      break;
    }
  }
  if (!exampleAutoDir) {
    throw new Error(`example_auto 不存在: 尝试过 ${candidates.join(' / ')}`);
  }
  // 真实路径（解析符号链接/junction）
  let realExampleAuto = exampleAutoDir;
  try { realExampleAuto = fs.realpathSync.native(exampleAutoDir); } catch {}
  const harmonyCandidates = [
    path.join(realExampleAuto, 'harmony'),
    path.join(realExampleAuto, 'ohos'),
    realExampleAuto,
  ];
  let harmonyDir = '';
  for (const c of harmonyCandidates) {
    if (fs.existsSync(path.join(c, 'build-profile.json5'))) {
      harmonyDir = c;
      break;
    }
  }
  if (!harmonyDir) {
    throw new Error(`example_auto 下未找到 build-profile.json5: ${exampleAutoDir}`);
  }
  const appJson5 = path.join(harmonyDir, 'AppScope', 'app.json5');
  return {
    repoPath: root,
    exampleAutoDir: realExampleAuto,
    harmonyDir,
    buildProfile: path.join(harmonyDir, 'build-profile.json5'),
    appJson5: fs.existsSync(appJson5) ? appJson5 : '',
    outputsDir: path.join(harmonyDir, 'entry', 'build', 'default', 'outputs', 'default'),
  };
}

// ─── JSON5 关键字段提取（不引入 json5 依赖，用扫描器） ───

/**
 * 扫描 build-profile.json5 文本，提取：
 *   - signingConfigs: [{ name, material: { storeFile, profile, ... } }]
 *   - products:       [{ name, signingConfig }]
 * 字符串/转义/嵌套都正确处理；注释 (// 与 /*) 容忍。
 */
function parseBuildProfile(raw) {
  const result = { signingConfigs: [], products: [] };
  let i = 0;
  const n = raw.length;

  const skipWsAndComments = () => {
    while (i < n) {
      const c = raw[i];
      if (c === ' ' || c === '\t' || c === '\r' || c === '\n') { i++; continue; }
      if (c === '/' && raw[i + 1] === '/') {
        while (i < n && raw[i] !== '\n') i++;
        continue;
      }
      if (c === '/' && raw[i + 1] === '*') {
        i += 2;
        while (i < n && !(raw[i] === '*' && raw[i + 1] === '/')) i++;
        i += 2;
        continue;
      }
      break;
    }
  };

  const readString = () => {
    skipWsAndComments();
    if (raw[i] !== '"') return null;
    i++;
    let out = '';
    while (i < n && raw[i] !== '"') {
      if (raw[i] === '\\') {
        const next = raw[i + 1];
        const simple = { '"': '"', '\\': '\\', '/': '/', 'b': '\b', 'f': '\f', 'n': '\n', 'r': '\r', 't': '\t' };
        if (simple[next]) { out += simple[next]; i += 2; }
        else if (next === 'u') {
          const hex = raw.slice(i + 2, i + 6);
          out += String.fromCharCode(parseInt(hex, 16));
          i += 6;
        } else { out += next; i += 2; }
      } else { out += raw[i]; i++; }
    }
    i++; // 跳过闭合 "
    return out;
  };

  const skipValue = () => {
    skipWsAndComments();
    const c = raw[i];
    if (c === '"') { readString(); return; }
    if (c === '{' || c === '[') {
      const close = c === '{' ? '}' : ']';
      let depth = 0;
      let inStr = false;
      for (; i < n; i++) {
        const ch = raw[i];
        if (inStr) {
          if (ch === '\\') { i++; continue; }
          if (ch === '"') inStr = false;
          continue;
        }
        if (ch === '"') { inStr = true; continue; }
        if (ch === c) depth++;
        else if (ch === close) {
          depth--;
          if (depth === 0) { i++; return; }
        }
      }
      return;
    }
    // number / true / false / null / 裸标识符
    while (i < n && !/[\s,}\]]/.test(raw[i])) i++;
  };

  const readKey = () => {
    skipWsAndComments();
    if (raw[i] === '"') return readString();
    // 裸标识符（JSON5）
    let start = i;
    while (i < n && /[A-Za-z0-9_]/.test(raw[i])) i++;
    return raw.slice(start, i);
  };

  const enterObject = (handler) => {
    skipWsAndComments();
    if (raw[i] !== '{') return;
    i++; // 跳过 {
    while (i < n) {
      skipWsAndComments();
      if (raw[i] === '}') { i++; break; }
      const key = readKey();
      skipWsAndComments();
      if (raw[i] === ':') i++;
      handler(key);
      skipWsAndComments();
      if (raw[i] === ',') { i++; continue; }
    }
  };

  // 顶层对象
  enterObject((topKey) => {
    if (topKey === 'app') {
      enterObject((appKey) => {
        if (appKey === 'signingConfigs') {
          skipWsAndComments();
          if (raw[i] === '[') {
            i++;
            while (i < n) {
              skipWsAndComments();
              if (raw[i] === ']') { i++; break; }
              const entry = { name: '', material: {} };
              enterObject((scKey) => {
                if (scKey === 'name') entry.name = readString() || '';
                else if (scKey === 'material') {
                  enterObject((mKey) => {
                    if (mKey === 'storeFile' || mKey === 'profile' || mKey === 'certpath' || mKey === 'keyAlias' || mKey === 'signAlg') {
                      entry.material[mKey] = readString() || '';
                    } else {
                      skipValue();
                    }
                  });
                } else {
                  skipValue();
                }
              });
              result.signingConfigs.push(entry);
              skipWsAndComments();
              if (raw[i] === ',') { i++; continue; }
            }
          }
        } else if (appKey === 'products') {
          skipWsAndComments();
          if (raw[i] === '[') {
            i++;
            while (i < n) {
              skipWsAndComments();
              if (raw[i] === ']') { i++; break; }
              const prod = { name: '', signingConfig: '' };
              enterObject((pKey) => {
                if (pKey === 'name') prod.name = readString() || '';
                else if (pKey === 'signingConfig') prod.signingConfig = readString() || '';
                else skipValue();
              });
              result.products.push(prod);
              skipWsAndComments();
              if (raw[i] === ',') { i++; continue; }
            }
          }
        } else {
          skipValue();
        }
      });
    } else {
      skipValue();
    }
  });

  return result;
}

// ─── 一致性检查 ───

/**
 * 检查 build-profile.json5 的签名配置一致性。
 * 返回 { ok, problems: string[], parsed }。
 */
function checkSigningConsistency(buildProfilePath) {
  const problems = [];
  let parsed;
  try {
    parsed = parseBuildProfile(fs.readFileSync(buildProfilePath, 'utf8'));
  } catch (e) {
    return { ok: false, problems: [`无法解析 build-profile.json5: ${e.message}`], parsed: null };
  }

  if (!parsed.signingConfigs || parsed.signingConfigs.length === 0) {
    problems.push('signingConfigs 为空，hvigor 会跳过签名');
    return { ok: false, problems, parsed };
  }

  const names = parsed.signingConfigs.map((s) => s.name).filter(Boolean);
  if (!names.includes(EXPECTED_NAME)) {
    problems.push(`signingConfigs 中不存在 name="${EXPECTED_NAME}" 的条目（现有: ${JSON.stringify(names)}）`);
  }

  const materialEntry = parsed.signingConfigs.find((s) => s.name === EXPECTED_NAME);
  if (materialEntry) {
    const m = materialEntry.material || {};
    const required = ['storeFile', 'profile', 'certpath'];
    for (const k of required) {
      if (!m[k]) {
        problems.push(`signingConfigs[name=default].material.${k} 缺失`);
      } else if (!fs.existsSync(m[k])) {
        problems.push(`signingConfigs[name=default].material.${k} 文件不存在: ${m[k]}`);
      }
    }
  }

  if (!parsed.products || parsed.products.length === 0) {
    problems.push('products 为空，无法对齐 signingConfig 引用');
  } else {
    for (const p of parsed.products) {
      if (p.signingConfig !== EXPECTED_NAME) {
        problems.push(`products[name=${p.name || '?'}].signingConfig="${p.signingConfig}"，应为 "${EXPECTED_NAME}"`);
      }
    }
  }

  return { ok: problems.length === 0, problems, parsed };
}

// ─── 签名对齐（强制 default） ───

/**
 * 强制把 build-profile.json5 改为：
 *   - signingConfigs[].name = "default"（首个条目）
 *   - products[].signingConfig = "default"
 * 不动密码材料本身——材料由 ohos-sync-build-profile.js 注入。
 *
 * 实现策略：用 parseBuildProfile 拿到字段位置不靠谱（流式扫描没保留偏移），
 * 改用 "字符串级 targeted 替换"：
 *   1. 把所有 "signingConfigs": [ ... ] 块内每个 "name": "<x>" 改成 "name": "default"
 *   2. 把所有 "signingConfig": "<x>" 改成 "signingConfig": "default"
 * 这两处的字段名不同（一个带 s 一个不带），不会互相误伤。
 *
 * 返回 { changed: boolean, raw, changes: string[] }。
 */
function alignSigningConfigs(buildProfilePath) {
  const raw = fs.readFileSync(buildProfilePath, 'utf8');
  const changes = [];
  let next = raw;

  // ① "signingConfig": "xxx"  → "signingConfig": "default"
  //    （仅匹配 products 里那种带冒号赋值的，单数形式不会匹配到 "signingConfigs" 数组键）
  const reProd = /("signingConfig"\s*:\s*")([^"]*)(")/g;
  let m;
  let prodCount = 0;
  while ((m = reProd.exec(next)) !== null) {
    if (m[2] !== EXPECTED_NAME) {
      prodCount++;
    }
  }
  if (prodCount > 0) {
    next = next.replace(reProd, `$1${EXPECTED_NAME}$3`);
    changes.push(`products[].signingConfig: ${prodCount} 处统一为 "${EXPECTED_NAME}"`);
  }

  // ② "name": "xxx"  → 仅在 signingConfigs 数组内的才改
  //    为避免误伤 products[].name，先定位 signingConfigs 块的字符范围
  const scLabel = '"signingConfigs"';
  const scIdx = next.indexOf(scLabel);
  if (scIdx !== -1) {
    // 找 signingConfigs 后的第一个 [ 和它配对的 ]
    let depth = 0;
    let inStr = false;
    let esc = false;
    let arrStart = -1;
    let arrEnd = -1;
    for (let i = scIdx + scLabel.length; i < next.length; i++) {
      const ch = next[i];
      if (inStr) {
        if (esc) { esc = false; continue; }
        if (ch === '\\') { esc = true; continue; }
        if (ch === '"') { inStr = false; continue; }
        continue;
      }
      if (ch === '"') { inStr = true; continue; }
      if (ch === '[') {
        if (depth === 0 && arrStart === -1) { arrStart = i; }
        depth++;
      } else if (ch === ']') {
        depth--;
        if (depth === 0 && arrStart !== -1) { arrEnd = i; break; }
      }
    }
    if (arrStart !== -1 && arrEnd !== -1) {
      const block = next.slice(arrStart, arrEnd + 1);
      const fixed = block.replace(/("name"\s*:\s*")([^"]*)(")/g, `$1${EXPECTED_NAME}$3`);
      if (fixed !== block) {
        next = next.slice(0, arrStart) + fixed + next.slice(arrEnd + 1);
        changes.push(`signingConfigs[].name: 统一为 "${EXPECTED_NAME}"`);
      }
    }
  }

  const changed = next !== raw;
  if (changed) {
    fs.writeFileSync(buildProfilePath, next, 'utf8');
  }
  return { changed, raw, next, changes };
}

// ─── bundleName 对齐 ───

function alignBundleName(appJson5Path, bundleName) {
  if (!appJson5Path || !bundleName) return { changed: false, previous: '' };
  if (!fs.existsSync(appJson5Path)) return { changed: false, previous: '' };
  const raw = fs.readFileSync(appJson5Path, 'utf8');
  const re = /("bundleName"\s*:\s*")([^"]*)(")/;
  const m = raw.match(re);
  if (!m) return { changed: false, previous: '' };
  if (m[2] === bundleName) return { changed: false, previous: m[2] };
  fs.writeFileSync(appJson5Path, raw.replace(re, `$1${bundleName}$3`), 'utf8');
  return { changed: true, previous: m[2] };
}

// ─── HAP 产物查找 ───

function findSignedHap(outputsDir) {
  return findHap(outputsDir, true);
}

function findAnyHap(outputsDir) {
  return findHap(outputsDir, false);
}

function findHap(outputsDir, signedOnly) {
  if (!fs.existsSync(outputsDir)) return '';
  const files = fs.readdirSync(outputsDir)
    .filter((n) => n.endsWith('.hap'))
    .map((n) => path.join(outputsDir, n));
  if (files.length === 0) return '';
  const signed = files.filter((f) => /-signed\.hap$/i.test(path.basename(f)));
  if (signed.length > 0) {
    signed.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    return signed[0];
  }
  if (signedOnly) return '';
  // 退而求其次：返回非 unsigned 的，再退到最新
  const neutral = files.filter((f) => !/-unsigned\.hap$/i.test(path.basename(f)));
  const pool = neutral.length > 0 ? neutral : files;
  pool.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return pool[0];
}

// ─── hvigorw 重 build ───

function findHvigorw(harmonyDir) {
  // 1. harmony 工程根的 wrapper（generate_example.py 会拷贝过来，但有些 RN 模板没有）
  for (const name of ['hvigorw.bat', 'hvigorw.cmd', 'hvigorw']) {
    const p = path.join(harmonyDir, name);
    if (fs.existsSync(p)) return p;
  }
  // 2. DevEco Studio 自带的 hvigorw（Windows: tools/hvigor/bin/hvigorw.bat；Mac: 同结构）
  const home = process.env.HOME || process.env.USERPROFILE || '';
  const devEcoRoots = process.platform === 'darwin'
    ? ['/Applications/DevEco-Studio.app/Contents']
    : [
        'C:\\Program Files\\Huawei\\DevEco Studio',
        'D:\\Program Files\\Huawei\\DevEco Studio',
        path.join(home, 'DevEco Studio'),
        process.env.DEVECO_HOME || '',
      ].filter(Boolean);
  for (const root of devEcoRoots) {
    const exe = process.platform === 'win32' ? 'hvigorw.bat' : 'hvigorw';
    const candidates = process.platform === 'darwin'
      ? [path.join(root, 'tools', 'hvigor', 'bin', exe)]
      : [path.join(root, 'tools', 'hvigor', 'bin', exe)];
    for (const p of candidates) {
      if (p && fs.existsSync(p)) return p;
    }
  }
  // 3. PATH 上找（hvigorw 已加到 PATH 时直接命中）
  try {
    const { spawnSync } = require('child_process');
    const which = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['hvigorw'], { encoding: 'utf8' });
    if (which.status === 0 && which.stdout.trim()) {
      return which.stdout.trim().split(/\r?\n/)[0];
    }
  } catch {}
  // 4. 兜底：让 PATH 解析（rn.py 也是这样 fallback 的）
  return 'hvigorw';
}

/**
 * 跑 hvigorw assembleHap 重 build。返回 { ok, stdout, stderr, durationMs }。
 * 把日志写到 stdoutPath/stderrPath（可选）。
 *
 * Windows 注意：hvigorw.bat 等 .cmd/.bat 必须用 shell 调用，否则 spawn 会直接 ENOENT。
 */
function rebuildHap(harmonyDir, opts = {}) {
  const hvigorw = findHvigorw(harmonyDir);
  if (!hvigorw) {
    return { ok: false, stdout: '', stderr: `未找到 hvigorw（在 ${harmonyDir} 下查找 hvigorw.bat/hvigorw）`, durationMs: 0 };
  }
  const args = ['assembleHap', '--mode', 'module', '--no-daemon'];
  const startedAt = Date.now();

  // Windows: .bat/.cmd 必须用 shell 调用，且路径带空格（如 C:\Program Files\）
  // 需要把整条命令组合成 cmdline 字符串交给 cmd.exe，否则会被空格切碎
  const isWin = process.platform === 'win32';
  const isWinBat = isWin && /\.(bat|cmd)$/i.test(hvigorw);
  const spawnOpts = {
    cwd: harmonyDir,
    encoding: 'utf8',
    windowsHide: true,
    maxBuffer: 64 * 1024 * 1024,
    env: process.env,
  };
  let res;
  try {
    if (isWinBat) {
      // 构造 quoted cmdline，shell:true 让 Windows 用 cmd.exe 解析
      const quote = (s) => {
        const str = String(s);
        if (str === '') return '""';
        // 路径或参数带空格/特殊字符时加双引号
        return /[\s"&|<>^()%!]/.test(str) ? `"${str.replace(/"/g, '\\"')}"` : str;
      };
      const cmdline = [quote(hvigorw), ...args.map(quote)].join(' ');
      res = spawnSync(cmdline, { ...spawnOpts, shell: true });
    } else {
      res = spawnSync(hvigorw, args, spawnOpts);
    }
  } catch (e) {
    const durationMs = Date.now() - startedAt;
    return {
      ok: false,
      exitCode: undefined,
      stdout: '',
      stderr: `spawn hvigorw 失败: ${e.message}`,
      durationMs,
      command: `${hvigorw} ${args.join(' ')}`,
    };
  }
  const durationMs = Date.now() - startedAt;
  const stdout = res.stdout || '';
  const stderr = res.stderr || '';
  if (opts.stdoutPath) {
    try { fs.mkdirSync(path.dirname(opts.stdoutPath), { recursive: true }); fs.writeFileSync(opts.stdoutPath, stdout); } catch {}
  }
  if (opts.stderrPath) {
    try { fs.mkdirSync(path.dirname(opts.stderrPath), { recursive: true }); fs.writeFileSync(opts.stderrPath, stderr); } catch {}
  }
  return {
    ok: res.status === 0,
    exitCode: res.status,
    stdout,
    stderr,
    durationMs,
    command: `${hvigorw} ${args.join(' ')}`,
  };
}

// ─── 高层封装：完整检查 ───

/**
 * 完整检查 example_auto 工程的签名链路。
 * 返回 {
 *   ok, problems, buildProfile, harmonyDir,
 *   signing: { ok, problems, parsed },
 *   hap: { signedHap: string, anyHap: string }
 * }
 */
function checkSigning(repoPath) {
  const resolved = resolveExampleAuto(repoPath);
  const signing = checkSigningConsistency(resolved.buildProfile);
  const problems = [...signing.problems];
  const hap = {
    signedHap: findSignedHap(resolved.outputsDir),
    anyHap: findAnyHap(resolved.outputsDir),
  };
  if (!hap.signedHap) {
    if (hap.anyHap) {
      problems.push(`未找到 signed HAP，仅有 ${path.basename(hap.anyHap)}（hvigor 编译时未应用签名）`);
    } else {
      problems.push(`未找到任何 HAP 产物: ${resolved.outputsDir}`);
    }
  }
  return {
    ok: problems.length === 0,
    problems,
    ...resolved,
    signing,
    hap,
  };
}

// ─── CLI ───

function parseArgs(argv) {
  const out = { repo: '', align: false, rebuild: false, help: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-h' || a === '--help') out.help = true;
    else if (a === '--align') out.align = true;
    else if (a === '--rebuild') out.rebuild = true;
    else if (!out.repo) out.repo = a;
  }
  return out;
}

function usage() {
  console.log(`rn-check-hap-signing <repoPath> [--align] [--rebuild]

  默认：仅检查 example_auto/harmony/build-profile.json5 签名配置一致性 + signed HAP 是否存在
  --align   检测到不一致时直接修正 build-profile.json5（强制 default）
  --rebuild 对齐后调用 hvigorw assembleHap 重 build
`);
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.repo) {
    usage();
    process.exit(args.help ? 0 : 1);
  }
  try {
    const resolved = resolveExampleAuto(args.repo);
    console.log(`工程: ${resolved.harmonyDir}`);

    let alignResult = null;
    if (args.align) {
      alignResult = alignSigningConfigs(resolved.buildProfile);
      if (alignResult.changed) {
        for (const c of alignResult.changes) console.log(`  [align] ${c}`);
      } else {
        console.log('  [align] 无需修改');
      }
    }

    const result = checkSigningConsistency(resolved.buildProfile);
    if (result.problems.length > 0) {
      console.log('签名一致性检查:');
      for (const p of result.problems) console.log(`  ✗ ${p}`);
    } else {
      console.log('签名一致性检查: ✓');
    }

    const signedHap = findSignedHap(resolved.outputsDir);
    const anyHap = findAnyHap(resolved.outputsDir);
    if (signedHap) {
      console.log(`signed HAP: ✓ ${path.basename(signedHap)}`);
    } else if (anyHap) {
      console.log(`signed HAP: ✗ 仅找到 ${path.basename(anyHap)}`);
    } else {
      console.log(`HAP 产物: ✗ 未找到（${resolved.outputsDir}）`);
    }

    if (args.rebuild) {
      if (result.problems.length > 0 && !args.align) {
        console.log('跳过 rebuild：build-profile 不一致，请先 --align');
        process.exit(1);
      }
      console.log('rebuild: 调用 hvigorw assembleHap...');
      const r = rebuildHap(resolved.harmonyDir);
      console.log(`  exit=${r.exitCode}, ${r.durationMs}ms, cmd=${r.command}`);
      if (r.stdout) console.log(r.stdout.slice(-2000));
      if (r.stderr) console.error(r.stderr.slice(-2000));
      if (!r.ok) process.exit(2);
      const after = findSignedHap(resolved.outputsDir);
      if (!after) {
        console.log('rebuild 后仍未找到 signed HAP');
        process.exit(3);
      }
      console.log(`rebuild 后 signed HAP: ${path.basename(after)}`);
    }

    process.exit(result.ok && signedHap ? 0 : 1);
  } catch (e) {
    console.error(`失败: ${e.message}`);
    process.exit(2);
  }
}

module.exports = {
  EXPECTED_NAME,
  resolveExampleAuto,
  parseBuildProfile,
  checkSigningConsistency,
  alignSigningConfigs,
  alignBundleName,
  findSignedHap,
  findAnyHap,
  findHvigorw,
  rebuildHap,
  checkSigning,
};

if (require.main === module) {
  main();
}
