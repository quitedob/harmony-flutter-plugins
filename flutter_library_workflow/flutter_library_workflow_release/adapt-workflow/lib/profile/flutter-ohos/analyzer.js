'use strict';

const fsSync = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Analyze a Flutter plugin repository to determine its type and platforms.
 * Parses pubspec.yaml and scans directory structure.
 */
function analyzePlugin(repoPath) {
  const result = { type: 'dart', platforms: [], details: {} };

  try {
    const pubspecPath = path.join(repoPath, 'pubspec.yaml');
    const pubspecContent = fsSync.readFileSync(pubspecPath, 'utf8');
    const pubspec = yaml.load(pubspecContent);

    const hasFFIDep = pubspec.dependencies && pubspec.dependencies.ffi;
    const hasFfigenDep = pubspec.dev_dependencies && pubspec.dev_dependencies.ffigen;
    const hasPlatformInterface = pubspec.dependencies && pubspec.dependencies.plugin_platform_interface;

    if (pubspec.flutter && pubspec.flutter.plugin) {
      const plugin = pubspec.flutter.plugin;

      if (plugin.platforms) {
        result.platforms = Object.keys(plugin.platforms);
        const isFFIPlugin = Object.values(plugin.platforms).some(p => p.ffiPlugin === true);

        if (isFFIPlugin) {
          result.type = 'ffi_plugin';
          result.details.subtype = 'ffi';
          result.details.hasFFIDep = !!hasFFIDep;
          result.details.hasFfigen = !!hasFfigenDep;
        } else {
          result.type = 'plugin';
          if (hasPlatformInterface) {
            result.details.subtype = 'platform_interface';
            result.details.isFederated = true;
          }
        }
      } else {
        result.type = 'plugin';
      }
    } else if (hasFFIDep || hasFfigenDep) {
      result.type = 'ffi_package';
      result.details.hasFFIDep = !!hasFFIDep;
      result.details.hasFfigen = !!hasFfigenDep;
    }

    const allPlatforms = ['android', 'ios', 'web', 'linux', 'macos', 'windows'];
    const detectedPlatforms = allPlatforms.filter(dir =>
      fsSync.existsSync(path.join(repoPath, dir))
    );

    if (result.platforms.length === 0 && detectedPlatforms.length > 0) {
      result.platforms = detectedPlatforms;
    }

    if (result.type === 'ffi_plugin' || result.type === 'ffi_package' || result.details.subtype === 'ffi') {
      result.details.ffiPattern = detectFfiPattern(repoPath);
    } else {
      result.details.ffiPattern = 'none';
    }
  } catch (error) {
    console.error('Error analyzing plugin:', error.message);
  }

  return result;
}

function detectFfiPattern(repoPath) {
  const hasCargoToml = fsSync.existsSync(path.join(repoPath, 'Cargo.toml')) ||
    fsSync.existsSync(path.join(repoPath, 'rust', 'Cargo.toml'));

  if (hasCargoToml) return 'rust_crate';

  const srcDir = path.join(repoPath, 'src');
  if (fsSync.existsSync(srcDir)) {
    try {
      const srcFiles = fsSync.readdirSync(srcDir);
      if (srcFiles.some(f => /\.(c|cpp|cc|cxx|h|hpp)$/i.test(f))) {
        return 'c_source';
      }
    } catch (_) {}
  }

  const jniLibsArm64 = path.join(repoPath, 'android', 'src', 'main', 'jniLibs', 'arm64-v8a');
  if (fsSync.existsSync(jniLibsArm64)) {
    try {
      const soFiles = fsSync.readdirSync(jniLibsArm64);
      if (soFiles.some(f => /\.so$/.test(f))) {
        return 'prebuilt_only';
      }
    } catch (_) {}
  }

  const hasFetchSignals = detectBuildTimeFetch(repoPath);
  if (hasFetchSignals) return 'fetch_at_build';

  return 'none';
}

function detectBuildTimeFetch(repoPath) {
  const gradlePath = path.join(repoPath, 'android', 'build.gradle');
  if (fsSync.existsSync(gradlePath)) {
    try {
      const gradleContent = fsSync.readFileSync(gradlePath, 'utf8');
      if (/download|fetch|URL\s*\(/i.test(gradleContent)) return true;
    } catch (_) {}
  }

  if (fsSync.existsSync(path.join(repoPath, 'cargokit'))) return true;

  const buildYamlPath = path.join(repoPath, 'build.yaml');
  if (fsSync.existsSync(buildYamlPath)) {
    try {
      const buildYaml = fsSync.readFileSync(buildYamlPath, 'utf8');
      if (/download|fetch|url/i.test(buildYaml)) return true;
    } catch (_) {}
  }

  return false;
}

module.exports = { analyzePlugin };
