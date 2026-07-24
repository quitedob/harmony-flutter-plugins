'use strict';

const fsSync = require('fs');
const path = require('path');

/**
 * Analyze a React Native module repository to determine its type and platforms.
 * Parses package.json and scans directory structure.
 */
function analyzePlugin(repoPath) {
  const result = { type: 'js_only', platforms: [], details: {} };

  try {
    const pkgPath = path.join(repoPath, 'package.json');
    const pkgContent = fsSync.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(pkgContent);

    const hasRNPeer = !!(pkg.peerDependencies?.['react-native']);
    const hasRNDep = !!(pkg.dependencies?.['react-native']);
    const hasCodegenConfig = !!pkg.codegenConfig;

    result.details.hasReactNativeDep = hasRNPeer || hasRNDep;

    const allPlatforms = ['android', 'ios', 'windows', 'macos'];
    const detectedPlatforms = allPlatforms.filter(dir =>
      fsSync.existsSync(path.join(repoPath, dir))
    );
    result.platforms = detectedPlatforms;

    const hasNativeCode = detectedPlatforms.some(p => ['android', 'ios'].includes(p));

    if (hasCodegenConfig) {
      const codegenType = pkg.codegenConfig.type;
      if (codegenType === 'modules') {
        result.type = 'turbo_module';
      } else if (codegenType === 'components') {
        result.type = 'fabric_component';
      } else if (codegenType === 'all') {
        result.type = 'native_mixed';
      } else {
        result.type = hasNativeCode ? 'native_module' : 'js_only';
      }
      result.details.hasCodegen = true;
    } else if (hasNativeCode) {
      result.type = 'native_module';
    }

    if (pkg.react_native_modules || pkg.rnpm) {
      result.details.hasLegacyLinking = true;
    }
  } catch (error) {
    console.error('Error analyzing RN module:', error.message);
  }

  return result;
}

module.exports = { analyzePlugin };
