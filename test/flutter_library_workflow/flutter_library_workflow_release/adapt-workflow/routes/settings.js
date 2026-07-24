const express = require('express');
const { readSettings, writeSettings, getDefaultSettings, validateSettings } = require('../lib/settings');
const { asyncHandler, AppError } = require('../lib/errors');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const settings = await readSettings();
  res.json(settings);
}));

router.put('/', asyncHandler(async (req, res) => {
  const settings = req.body;
  if (!validateSettings(settings)) {
    throw new AppError('设置数据格式无效', 400);
  }
  await writeSettings(settings);
  res.json({ success: true, settings });
}));

router.post('/reset', asyncHandler(async (req, res) => {
  const defaults = getDefaultSettings();
  await writeSettings(defaults);
  res.json({ success: true, settings: defaults });
}));

module.exports = router;
