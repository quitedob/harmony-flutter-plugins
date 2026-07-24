const express = require('express');
const path = require('path');
const { readData } = require('../lib/data');
const { getReposDir } = require('../lib/config');
const { getActiveProfile } = require('../lib/profile');
const { resolvePluginWorkRoot } = require('../lib/plugin-work-root');

const router = express.Router();

router.get('/export', async (req, res) => {
  try {
    const profile = getActiveProfile();
    const data = await readData();

    const headers = profile.exportColumns;
    const csvRows = [headers.join(',')];

    const rows = await Promise.all(
      data.plugins.map(plugin => {
        const cloneRoot = path.join(getReposDir(), plugin.name);
        const workRoot = resolvePluginWorkRoot(cloneRoot, plugin);
        const adaptDir = path.join(workRoot, profile.ADAPTATION_DIR);
        return profile.extractExportRow(plugin, adaptDir);
      })
    );
    for (const row of rows) {
      csvRows.push(row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="plugins.csv"');
    res.send(csvRows.join('\n'));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
