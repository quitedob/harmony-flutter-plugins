'use strict';

const config = require('./config');
const { extractListFields, extractDetailFields, extractExportRow } = require('../android-sdk-ohos/extractors');
const { analyzePlugin } = require('../android-sdk-ohos/analyzer');

module.exports = {
  id: 'android-sdk-ohos-fast',
  name: 'Android SDK → 鸿蒙',
  framework: 'android-sdk',
  targetPlatform: 'ohos',
  flowVersion: 'fast',

  ...config,

  extractListFields,
  extractDetailFields,
  extractExportRow,

  analyzePlugin
};
