#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function checkDependencies(nodeModulesPath) {
  if (!fs.existsSync(nodeModulesPath)) {
    console.error(`node_modules not found: ${nodeModulesPath}`);
    process.exit(1);
  }

  const packages = fs.readdirSync(nodeModulesPath)
    .filter(name => !name.startsWith('.'))
    .flatMap(name => {
      const pkgPath = path.join(nodeModulesPath, name);
      
      if (name.startsWith('@')) {
        const scopedPkgs = fs.readdirSync(pkgPath)
          .filter(sub => !sub.startsWith('.'))
          .map(sub => ({
            name: `${name}/${sub}`,
            path: path.join(pkgPath, sub)
          }));
        return scopedPkgs;
      }
      
      return [{ name, path: pkgPath }];
    });

  const result = {
    pure_js: [],
    harmonized: [],
    not_harmonized: []
  };

  const WHITE_LIST = [
    'react-native',
    '@react-native/gradle-plugin',
    '@react-native-community/cli',
    '@react-native-community/cli-platform-android',
    '@react-native-community/cli-platform-ios',
  ];

  for (const pkg of packages) {
    const pkgJsonPath = path.join(pkg.path, 'package.json');
    
    if (!fs.existsSync(pkgJsonPath)) {
      continue;
    }

    let pkgJson;
    try {
      pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    } catch {
      continue;
    }

    const needsHarmony = checkNeedsHarmony(pkg.path, pkgJson);
    
    if (!needsHarmony) {
      result.pure_js.push(pkg.name);
      continue;
    }

    const harmonized = checkIsHarmonized(pkg.path, pkgJson);
    
    if (harmonized) {
      result.harmonized.push(pkg.name);
    } else if (WHITE_LIST.includes(pkg.name)) {
      result.harmonized.push(`${pkg.name} (白名单)`);
    } else {
      result.not_harmonized.push(pkg.name);
    }
  }

  return result;
}

function checkNeedsHarmony(pkgPath, pkgJson) {
  if (fs.existsSync(path.join(pkgPath, 'ios'))) return true;
  if (fs.existsSync(path.join(pkgPath, 'android'))) return true;
  if (fs.existsSync(path.join(pkgPath, 'src', 'ios'))) return true;
  if (fs.existsSync(path.join(pkgPath, 'src', 'android'))) return true;

  const files = fs.readdirSync(pkgPath);
  if (files.some(f => f.endsWith('.podspec'))) return true;
  if (files.includes('build.gradle')) return true;
  if (files.includes('build.gradle.kts')) return true;
  if (fs.existsSync(path.join(pkgPath, 'react-native.config.js'))) return true;

  if (pkgJson.codegenConfig) return true;
  if (pkgJson.reactNative) return true;

  return false;
}

function checkIsHarmonized(pkgPath, pkgJson) {
  if (fs.existsSync(path.join(pkgPath, 'ohos'))) return true;
  if (fs.existsSync(path.join(pkgPath, 'harmony'))) return true;

  if (pkgJson.harmony) return true;
  if (pkgJson['harmony.alias']) return true;

  const files = fs.readdirSync(pkgPath);
  if (files.some(f => f.includes('hvigorfile'))) return true;

  const configPath = path.join(pkgPath, 'react-native.config.js');
  if (fs.existsSync(configPath)) {
    try {
      delete require.cache[require.resolve(configPath)];
      const config = require(configPath);
      if (config && config.platforms && config.platforms.harmony) {
        return true;
      }
    } catch {}
  }

  return false;
}

const nodeModulesPath = process.argv[2] || path.join(process.cwd(), 'node_modules');

console.log(`Checking dependencies in: ${nodeModulesPath}\n`);

const result = checkDependencies(nodeModulesPath);

console.log('=== 已鸿蒙化 ===');
console.log(result.harmonized.length > 0 ? result.harmonized.join('\n') : '无');
console.log('');

console.log('=== 未鸿蒙化（需要关注）===');
if (result.not_harmonized.length > 0) {
  console.log(result.not_harmonized.join('\n'));
  console.log(`\n警告: 发现 ${result.not_harmonized.length} 个未鸿蒙化的原生库！`);
  process.exit(1);
} else {
  console.log('无');
  console.log('\n所有原生依赖均已鸿蒙化。');
}

const outputPath = path.join(process.cwd(), '.ohos-adaptation', 'dependency-check.json');
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(`\n结果已保存到: ${outputPath}`);