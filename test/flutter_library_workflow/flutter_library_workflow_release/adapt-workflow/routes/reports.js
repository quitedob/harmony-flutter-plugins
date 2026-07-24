const express = require('express');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { readData } = require('../lib/data');
const { getReposDir } = require('../lib/config');
const { getActiveProfile } = require('../lib/profile');
const { findPluginOrFail } = require('../lib/plugin-lookup');
const { asyncHandler, AppError } = require('../lib/errors');
const { resolvePluginWorkRoot } = require('../lib/plugin-work-root');

const router = express.Router();

function getReportPath(plugin) {
  const cloneRoot = path.join(getReposDir(), plugin.name);
  const workRoot = resolvePluginWorkRoot(cloneRoot, plugin);
  return path.join(workRoot, getActiveProfile().ADAPTATION_DIR, '05-summary.json');
}

router.post('/plugins/:id/refresh-report', asyncHandler(async (req, res) => {
  const { plugin } = await findPluginOrFail(req.params.id);

  const reportPath = getReportPath(plugin);
  if (!fsSync.existsSync(reportPath)) throw new AppError('Report file not found', 404);

  const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
  res.json({ ...plugin, report });
}));

router.post('/refresh-all-reports', asyncHandler(async (req, res) => {
  const data = await readData();
  const results = data.plugins.map(plugin => {
    const reportPath = getReportPath(plugin);
    const hasReport = fsSync.existsSync(reportPath);
    return { ...plugin, hasReport };
  });
  res.json(results);
}));

router.get('/plugins/:id/report', asyncHandler(async (req, res) => {
  const { plugin } = await findPluginOrFail(req.params.id);

  const reportPath = getReportPath(plugin);
  if (!fsSync.existsSync(reportPath)) throw new AppError('No report available', 404);

  const reportData = await fs.readFile(reportPath, 'utf8');
  res.json(JSON.parse(reportData));
}));

module.exports = router;
