'use strict';

const config = require('./config');
const { extractListFields, extractDetailFields, extractExportRow } = require('./extractors');
const { analyzePlugin } = require('./analyzer');

module.exports = {
  id: 'rn-ohos',
  name: 'React Native → 鸿蒙',
  framework: 'react-native',
  targetPlatform: 'ohos',
  flowVersion: 'full',

  ...config,

  extractListFields,
  extractDetailFields,
  extractExportRow,

  analyzePlugin,
};
