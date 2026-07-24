'use strict';

const fs = require('fs').promises;
const path = require('path');

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readJsonFile(filePath) {
  try {
    if (!(await pathExists(filePath))) return null;
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function readOptionalText(filePath) {
  try {
    if (!(await pathExists(filePath))) return null;
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return null;
  }
}

async function extractListFields(adaptDir) {
  const result = {
    plugin_type: null,
    plugin_architecture: null,
    complexity_level: null,
    quality_score: null
  };

  const analysis = await readJsonFile(path.join(adaptDir, '01-analysis.json'));
  if (analysis) {
    result.plugin_type =
      analysis.conversion_source?.kind === 'android'
        ? 'android_sdk'
        : analysis.conversion_source?.kind
          ? 'multiplatform_sdk'
          : null;
    result.plugin_architecture = analysis.architecture_type || null;
    result.complexity_level = analysis.difficulty_level || null;
  }

  const evaluation = await readJsonFile(path.join(adaptDir, '05-evaluation.json'));
  if (evaluation) {
    result.quality_score = evaluation.quality_score ?? null;
  }

  return result;
}

async function extractDetailFields(adaptDir) {
  const [analysis, planning, demoData, evaluation, workUnitPrdIndex, workUnitPlanIndex] = await Promise.all([
    readJsonFile(path.join(adaptDir, '01-analysis.json')),
    readJsonFile(path.join(adaptDir, '02-planning.json')),
    readJsonFile(path.join(adaptDir, '04-har-demo.json')),
    readJsonFile(path.join(adaptDir, '05-evaluation.json')),
    readOptionalText(path.join(adaptDir, 'work_unit_prd', 'index.md')),
    readOptionalText(path.join(adaptDir, 'work_unit_plan', 'index.md'))
  ]);

  const summaryData = evaluation || demoData;

  let adaptation = null;
  if (analysis) {
    adaptation = {
      plugin_info: {
        name: analysis.sdk_name,
        version: analysis.sdk_version,
        description: analysis.description,
        type:
          analysis.conversion_source?.kind === 'android'
            ? 'android_sdk'
            : analysis.conversion_source?.kind || 'unknown',
        architecture: analysis.architecture_type
      },
      quality_score: evaluation?.quality_score ?? null
    };
  }

  const planningMarkdown = {
    work_unit_prd_index_exists: Boolean(workUnitPrdIndex),
    work_unit_plan_index_exists: Boolean(workUnitPlanIndex)
  };

  return { analysis, planning, summaryData, adaptation, planningMarkdown };
}

async function extractExportRow(plugin, adaptDir) {
  const [analysis, demoData, evaluation] = await Promise.all([
    readJsonFile(path.join(adaptDir, '01-analysis.json')),
    readJsonFile(path.join(adaptDir, '04-har-demo.json')),
    readJsonFile(path.join(adaptDir, '05-evaluation.json'))
  ]);

  return [
    plugin.name,
    plugin.repoUrl,
    plugin.commitHash || '',
    plugin.status,
    plugin.cloneTime || '',
    analysis?.conversion_source?.kind || '',
    analysis?.architecture_type || '',
    evaluation?.status || demoData?.status || (analysis ? 'in_progress' : ''),
    evaluation?.quality_score ?? ''
  ];
}

module.exports = { extractListFields, extractDetailFields, extractExportRow };
