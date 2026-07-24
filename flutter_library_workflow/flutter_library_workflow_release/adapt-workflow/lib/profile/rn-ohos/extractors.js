'use strict';

const fs = require('fs').promises;
const path = require('path');
const { displayMaps } = require('./config.js');

async function pathExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function readJsonFile(filePath) {
  try {
    if (!(await pathExists(filePath))) return null;
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch { return null; }
}

// ── 字段提取：列表页 ──

async function extractListFields(adaptDir) {
  const result = {
    plugin_type: null,
    plugin_architecture: null,
    adaptation_recommendation: null,
    complexity_level: null,
    quality_score: null
  };

  const analysis = await readJsonFile(path.join(adaptDir, '01-analysis.json'));
  if (analysis) {
    result.plugin_type = analysis.plugin_type || null;
    
    // 组合展示：plugin_architecture:arch_type（中文）
    const archType = analysis.arch_type || null;
    const pluginArch = analysis.plugin_architecture || null;
    if (pluginArch && archType) {
      const archLabel = displayMaps.architecture[pluginArch] || pluginArch;
      const typeLabel = displayMaps.archType[archType] || archType;
      result.plugin_architecture = `${archLabel}:${typeLabel}`;
    } else if (pluginArch) {
      result.plugin_architecture = displayMaps.architecture[pluginArch] || pluginArch;
    } else if (archType) {
      result.plugin_architecture = displayMaps.archType[archType] || archType;
    } else {
      result.plugin_architecture = null;
    }
    
    result.adaptation_recommendation = analysis.complexity_assessment?.adaptation_recommendation || null;
    result.complexity_level = analysis.complexity_assessment?.level || null;
  }

  const summary = await readJsonFile(path.join(adaptDir, '05-summary.json'));
  if (summary) {
    result.quality_score = summary.quality_score || null;
  }

  return result;
}

// ── 字段提取：详情页 ──

async function extractDetailFields(adaptDir) {
  const [analysis, planning, summaryData] = await Promise.all([
    readJsonFile(path.join(adaptDir, '01-analysis.json')),
    readJsonFile(path.join(adaptDir, '02-planning.json')),
    readJsonFile(path.join(adaptDir, '05-summary.json'))
  ]);

  let adaptation = null;
  if (analysis) {
    adaptation = {
      plugin_info: {
        name: analysis.plugin_name,
        version: analysis.plugin_version,
        description: analysis.description,
        type: analysis.plugin_type,
        architecture: analysis.plugin_architecture,
      },
      adaptation_recommendation: analysis.complexity_assessment?.adaptation_recommendation || null,
      quality_score: summaryData?.quality_score || null,
    };
  }

  return { analysis, planning, summaryData, adaptation };
}

// ── 字段提取：CSV 导出 ──

async function extractExportRow(plugin, adaptDir) {
  const [analysis, summary] = await Promise.all([
    readJsonFile(path.join(adaptDir, '01-analysis.json')),
    readJsonFile(path.join(adaptDir, '05-summary.json'))
  ]);

  return [
    plugin.name,
    plugin.repoUrl,
    plugin.commitHash || '',
    plugin.status,
    plugin.cloneTime || '',
    analysis?.plugin_type || '',
    analysis?.plugin_architecture || '',
    summary?.status || (analysis ? 'in_progress' : ''),
    summary?.quality_score || ''
  ];
}

module.exports = { extractListFields, extractDetailFields, extractExportRow };
