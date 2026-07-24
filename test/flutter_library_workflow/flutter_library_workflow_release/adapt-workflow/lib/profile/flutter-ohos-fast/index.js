'use strict';

const config = require('./config');
const { extractListFields, extractDetailFields, extractExportRow } = require('../flutter-ohos/extractors');
const { analyzePlugin } = require('../flutter-ohos/analyzer');

module.exports = {
  id: 'flutter-ohos-fast',
  name: 'Flutter → 鸿蒙',
  framework: 'flutter',
  targetPlatform: 'ohos',
  flowVersion: 'fast',

  ...config,

  extractListFields,
  extractDetailFields,
  extractExportRow,

  analyzePlugin
};
