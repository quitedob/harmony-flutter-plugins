'use strict';

const config = require('./config');
const { extractListFields, extractDetailFields, extractExportRow } = require('./extractors');
const { analyzePlugin } = require('./analyzer');

module.exports = {
  id: 'flutter-ohos',
  name: 'Flutter → 鸿蒙',
  framework: 'flutter',
  targetPlatform: 'ohos',
  flowVersion: 'full',

  ...config,

  extractListFields,
  extractDetailFields,
  extractExportRow,

  analyzePlugin,
};
