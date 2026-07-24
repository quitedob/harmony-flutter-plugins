'use strict';

const fsSync = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const AdmZip = require('adm-zip');
const { getReposDir, WORKSPACE_ROOT } = require('../config');
const { readData, writeData, sanitizePlugin, buildTpcRepoUrl } = require('../data');
const { generateId } = require('../utils');
const { getActiveProfile } = require('../profile');
const { ensureWorkspaceLinks } = require('../backends/workspace-links');

const TEMP_DIR = path.join(__dirname, '..', '..', 'data', '_temp-zip');

const SDK_MARKERS = [
  'pom.xml',
  'build.gradle',
  'build.gradle.kts',
  'settings.gradle',
  'settings.gradle.kts'
];

async function ensureTempDir() {
  if (!fsSync.existsSync(TEMP_DIR)) {
    await fsPromises.mkdir(TEMP_DIR, { recursive: true });
  }
}

async function cleanupTempDir(dir) {
  try {
    if (fsSync.existsSync(dir)) {
      await fsPromises.rm(dir, { recursive: true, force: true });
    }
  } catch (err) {
    console.warn('[zip-upload] Failed to cleanup temp dir:', err.message);
  }
}

function hasSdkMarker(dir) {
  for (const marker of SDK_MARKERS) {
    if (fsSync.existsSync(path.join(dir, marker))) {
      return true;
    }
  }
  return false;
}

async function findSdkRoot(baseDir, maxDepth = 3) {
  if (hasSdkMarker(baseDir)) {
    return baseDir;
  }

  async function walk(dir, depth) {
    if (depth > maxDepth) return null;
    if (!fsSync.existsSync(dir)) return null;

    try {
      const entries = await fsPromises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (entry.name.startsWith('.')) continue;
        
        const subDir = path.join(dir, entry.name);
        if (hasSdkMarker(subDir)) {
          return subDir;
        }
        
        const found = await walk(subDir, depth + 1);
        if (found) return found;
      }
    } catch (err) {
      console.warn('[zip-upload] Error walking directory:', err.message);
    }

    return null;
  }

  return await walk(baseDir, 0);
}

async function extractZip(zipPath, targetDir) {
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(targetDir, true);
}

async function processZipUpload(zipFilePath, pluginName) {
  await ensureTempDir();
  
  const tempExtractDir = path.join(TEMP_DIR, `extract-${pluginName}-${Date.now()}`);
  
  try {
    await fsPromises.mkdir(tempExtractDir, { recursive: true });
    
    console.log(`[zip-upload] Extracting ${zipFilePath} to ${tempExtractDir}...`);
    await extractZip(zipFilePath, tempExtractDir);
    
    console.log(`[zip-upload] Detecting SDK root in ${tempExtractDir}...`);
    const sdkRoot = await findSdkRoot(tempExtractDir);
    
    if (!sdkRoot) {
      throw new Error('未找到有效的 Android SDK 项目标记（pom.xml 或 build.gradle）');
    }
    
    const reposDir = getReposDir();
    const targetDir = path.join(reposDir, pluginName);
    
    if (fsSync.existsSync(targetDir)) {
      throw new Error(`插件目录已存在: ${pluginName}`);
    }
    
    console.log(`[zip-upload] Moving SDK from ${sdkRoot} to ${targetDir}...`);
    
    const entries = await fsPromises.readdir(sdkRoot, { withFileTypes: true });
    await fsPromises.mkdir(targetDir, { recursive: true });
    
    for (const entry of entries) {
      const srcPath = path.join(sdkRoot, entry.name);
      const destPath = path.join(targetDir, entry.name);
      await fsPromises.rename(srcPath, destPath);
    }
    
    const profile = getActiveProfile();
    const analysis = profile.analyzePlugin ? profile.analyzePlugin(targetDir) : { type: 'unknown' };
    
    console.log(`[zip-upload] Plugin type analysis:`, analysis);
    
    ensureWorkspaceLinks(targetDir, WORKSPACE_ROOT);
    
    const plugin = {
      id: generateId(),
      name: pluginName,
      repoUrl: '',
      sourceUrl: '',
      tpcRepoUrl: buildTpcRepoUrl(pluginName),
      commitHash: '',
      cloneTime: new Date().toISOString(),
      status: 'cloned',
      sourceType: 'zip_upload',
      zipFileName: path.basename(zipFilePath),
      zipUploadTime: new Date().toISOString(),
      type: analysis.type || 'unknown'
    };
    
    const data = await readData();
    data.plugins.push(sanitizePlugin(plugin));
    await writeData(data);
    
    console.log(`[zip-upload] Successfully uploaded ${pluginName}`);
    
    return { success: true, plugin, analysis };
    
  } catch (err) {
    console.error('[zip-upload] Failed:', err.message);
    return { success: false, error: err.message };
  } finally {
    await cleanupTempDir(tempExtractDir);
    
    try {
      if (fsSync.existsSync(zipFilePath)) {
        await fsPromises.unlink(zipFilePath);
      }
    } catch {}
  }
}

async function checkPluginNameExists(pluginName) {
  const data = await readData();
  return data.plugins.some(p => p.name === pluginName);
}

module.exports = {
  processZipUpload,
  checkPluginNameExists,
  SDK_MARKERS,
  findSdkRoot
};