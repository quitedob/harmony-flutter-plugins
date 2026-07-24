'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Inject bundleName into example/ohos/AppScope/app.json5 (or example/harmony/...).
 * JSON5 comments and trailing commas are tolerated by regex-based replacement;
 * we avoid a full JSON5 parser to keep dependencies minimal and round-trip stable.
 *
 * Returns { changed: boolean, path: string, previous: string|null }.
 * Throws if the target file exists but no bundleName field can be located/written.
 */
function injectBundleName(repoPath, bundleName) {
  if (!bundleName || typeof bundleName !== 'string') {
    throw new Error('injectBundleName: bundleName 必须是非空字符串');
  }

  const appJson5 = findAppJson5(repoPath);
  if (!appJson5) {
    return { changed: false, path: null, previous: null, skipped: 'app.json5_not_found' };
  }

  const raw = fs.readFileSync(appJson5, 'utf8');

  // Match: "bundleName"<ws>:<ws>"<value>"
  const re = /("bundleName"\s*:\s*")([^"]*)(")/;
  const m = raw.match(re);
  if (!m) {
    throw new Error(`${appJson5} 中未找到 bundleName 字段，无法注入`);
  }
  const previous = m[2];
  if (previous === bundleName) {
    return { changed: false, path: appJson5, previous };
  }
  const next = raw.replace(re, `$1${bundleName}$3`);
  fs.writeFileSync(appJson5, next);
  return { changed: true, path: appJson5, previous };
}

/**
 * Locate AppScope/app.json5 in the repo's example project.
 * Tries example/ohos (Flutter) first, then example/harmony (RN).
 */
function findAppJson5(repoPath) {
  const candidates = [
    path.join(repoPath, 'example', 'ohos', 'AppScope', 'app.json5'),
    path.join(repoPath, 'example', 'harmony', 'AppScope', 'app.json5'),
    // RN plugin convention: ohos/example/harmony/
    path.join(repoPath, 'ohos', 'example', 'harmony', 'AppScope', 'app.json5')
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/**
 * Walk up from `startDir` to discover the nearest HarmonyOS project that
 * contains `<subdir>/AppScope/app.json5`. Works when called from inside
 * `example/`（cwd 在子目录）或插件仓库根。
 * Returns { projectRoot, ohosDir, appJson5 } or null.
 */
function findOhosProjectFromCwd(startDir) {
  let cur = path.resolve(startDir);
  const seen = new Set();
  for (let i = 0; i < 8 && !seen.has(cur); i++) {
    seen.add(cur);
    const selfAppJson5 = path.join(cur, 'AppScope', 'app.json5');
    if (fs.existsSync(selfAppJson5)) {
      return { projectRoot: path.dirname(cur), ohosDir: cur, appJson5: selfAppJson5 };
    }
    for (const sub of ['ohos', 'harmony']) {
      const appJson5 = path.join(cur, sub, 'AppScope', 'app.json5');
      if (fs.existsSync(appJson5)) {
        return { projectRoot: cur, ohosDir: path.join(cur, sub), appJson5 };
      }
    }
    for (const sub of ['ohos', 'harmony']) {
      const appJson5 = path.join(cur, 'example', sub, 'AppScope', 'app.json5');
      if (fs.existsSync(appJson5)) {
        return {
          projectRoot: path.join(cur, 'example'),
          ohosDir: path.join(cur, 'example', sub),
          appJson5
        };
      }
    }
    const up = path.dirname(cur);
    if (up === cur) break;
    cur = up;
  }
  return null;
}

/**
 * Idempotently inject bundleName into the app.json5 found via findOhosProjectFromCwd.
 */
function injectBundleNameAt(appJson5Path, bundleName) {
  const raw = fs.readFileSync(appJson5Path, 'utf8');
  const re = /("bundleName"\s*:\s*")([^"]*)(")/;
  const m = raw.match(re);
  if (!m) {
    throw new Error(`${appJson5Path} 中未找到 bundleName 字段`);
  }
  const previous = m[2];
  if (previous === bundleName) return { changed: false, path: appJson5Path, previous };
  fs.writeFileSync(appJson5Path, raw.replace(re, `$1${bundleName}$3`));
  return { changed: true, path: appJson5Path, previous };
}

module.exports = {
  injectBundleName,
  findAppJson5,
  findOhosProjectFromCwd,
  injectBundleNameAt
};
