'use strict';

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const archiver = require('archiver');
const { getReposDir } = require('../config');

/**
 * Create a zip file from a directory
 * @param {string} sourceDir - The source directory to zip
 * @param {string} outputPath - The output zip file path
 * @returns {Promise<{success: boolean, size: number, error?: string}>}
 */
async function createZipFromDirectory(sourceDir, outputPath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(sourceDir)) {
      return reject(new Error(`Source directory not found: ${sourceDir}`));
    }

    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    output.on('close', () => {
      resolve({
        success: true,
        size: archive.pointer(),
        path: outputPath
      });
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Add directory contents to archive
    archive.directory(sourceDir, false);

    archive.finalize();
  });
}

/**
 * Zip a single plugin directory
 * @param {string} pluginName - The plugin name (directory name)
 * @param {string} reposDir - The repos directory
 * @param {string} outputDir - The output directory for zip files
 * @returns {Promise<object>}
 */
async function zipPlugin(pluginName, reposDir, outputDir) {
  const sourceDir = path.join(reposDir, pluginName);
  const zipPath = path.join(outputDir, `${pluginName}.zip`);

  if (!fs.existsSync(sourceDir)) {
    return {
      success: false,
      pluginName,
      error: 'Plugin directory not found'
    };
  }

  try {
    // Ensure output directory exists
    await fsPromises.mkdir(outputDir, { recursive: true });

    const result = await createZipFromDirectory(sourceDir, zipPath);

    return {
      success: true,
      pluginName,
      zipPath,
      size: result.size,
      sizeFormatted: formatBytes(result.size)
    };
  } catch (err) {
    return {
      success: false,
      pluginName,
      error: err.message
    };
  }
}

/**
 * Batch zip multiple plugin directories
 * @param {string[]} pluginNames - Array of plugin names
 * @returns {Promise<object>}
 */
async function batchZipPlugins(pluginNames) {
  if (!pluginNames || pluginNames.length === 0) {
    return { success: true, results: [], totalSize: 0 };
  }

  const reposDir = getReposDir();
  const outputDir = path.join(getReposDir(), '_zips');

  // Ensure output directory exists
  await fsPromises.mkdir(outputDir, { recursive: true });

  const results = [];
  let totalSize = 0;

  for (const pluginName of pluginNames) {
    console.log(`[zip] Creating ${pluginName}.zip...`);
    const result = await zipPlugin(pluginName, reposDir, outputDir);
    results.push(result);

    if (result.success) {
      totalSize += result.size;
    }
  }

  return {
    success: results.every(r => r.success),
    results,
    outputDir,
    totalSize,
    totalSizeFormatted: formatBytes(totalSize),
    successCount: results.filter(r => r.success).length,
    failedCount: results.filter(r => !r.success).length
  };
}

/**
 * Get the output directory for zip files
 * @returns {string}
 */
function getZipOutputDir() {
  return path.join(getReposDir(), '_zips');
}

/**
 * Open the zip output directory in file explorer
 * @returns {Promise<void>}
 */
async function openZipOutputDir() {
  const outputDir = getZipOutputDir();
  await fsPromises.mkdir(outputDir, { recursive: true });

  const platform = process.platform;
  let cmd;
  if (platform === 'darwin') cmd = 'open';
  else if (platform === 'win32') cmd = 'explorer';
  else cmd = 'xdg-open';

  const { spawn } = require('child_process');
  const child = spawn(cmd, [outputDir], { detached: true, stdio: 'ignore' });
  child.unref();
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

module.exports = {
  createZipFromDirectory,
  zipPlugin,
  batchZipPlugins,
  getZipOutputDir,
  openZipOutputDir
};