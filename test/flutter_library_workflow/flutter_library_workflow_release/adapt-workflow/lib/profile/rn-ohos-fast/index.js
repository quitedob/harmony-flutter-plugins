'use strict';

const config = require('./config');
const { extractListFields, extractDetailFields, extractExportRow } = require('../rn-ohos/extractors');
const { analyzePlugin } = require('../rn-ohos/analyzer');

module.exports = {
  id: 'rn-ohos-fast',
  name: 'React Native → 鸿蒙',
  framework: 'react-native',
  targetPlatform: 'ohos',
  flowVersion: 'fast',

  ...config,

  extractListFields,
  extractDetailFields,
  extractExportRow,

  analyzePlugin
};
