'use strict';

const fsSync = require('fs');
const path = require('path');

/**
 * 粗略识别仓库是否为 Android / 多平台 SDK（用于列表展示，非强制）。
 */
function analyzePlugin(repoPath) {
  const result = { type: 'unknown', platforms: [], details: {} };

  try {
    const markers = {
      android: ['build.gradle', 'build.gradle.kts', 'settings.gradle', 'settings.gradle.kts', 'pom.xml'],
      ios: ['Podfile', '.xcodeproj'],
      js: ['package.json']
    };

    const walk = (dir, depth = 0) => {
      if (depth > 3 || !fsSync.existsSync(dir)) return;
      const entries = fsSync.readdirSync(dir, { withFileTypes: true });
      for (const e of entries) {
        if (e.name.startsWith('.')) continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p, depth + 1);
      }
    };

    if (markers.android.some((f) => fsSync.existsSync(path.join(repoPath, f)))) {
      result.type = 'android_sdk';
      result.platforms.push('android');
    }
    if (markers.ios.some((f) => fsSync.existsSync(path.join(repoPath, f)))) {
      result.platforms.push('ios');
    }
    if (fsSync.existsSync(path.join(repoPath, 'package.json'))) {
      result.platforms.push('js');
      if (result.type === 'unknown') result.type = 'multiplatform_sdk';
    }

    walk(repoPath);
    result.details.hasGradle = markers.android.some((f) =>
      fsSync.existsSync(path.join(repoPath, f))
    );
  } catch (err) {
    console.error('android-sdk-ohos analyzePlugin:', err.message);
  }

  return result;
}

module.exports = { analyzePlugin };
