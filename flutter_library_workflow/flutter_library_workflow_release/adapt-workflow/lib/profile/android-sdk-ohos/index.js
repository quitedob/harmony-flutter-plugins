'use strict';

const config = require('./config');
const { extractListFields, extractDetailFields, extractExportRow } = require('./extractors');
const { analyzePlugin } = require('./analyzer');

module.exports = {
  id: 'android-sdk-ohos',
  name: 'Android SDK → 鸿蒙',
  framework: 'android-sdk',
  targetPlatform: 'ohos',
  flowVersion: 'full',

  ...config,

  extractListFields,
  extractDetailFields,
  extractExportRow,

  analyzePlugin
};
