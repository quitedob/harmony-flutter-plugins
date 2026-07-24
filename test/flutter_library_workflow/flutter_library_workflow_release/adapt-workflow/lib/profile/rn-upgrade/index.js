'use strict';

// React Native upgrade profile. See flutter-upgrade/index.js for rationale.

const config = require('./config');

module.exports = {
  id: 'rn-upgrade',
  name: 'React Native → 鸿蒙 升级',
  framework: 'react-native',
  targetPlatform: 'ohos',
  workflow: 'upgrade',

  ...config
};
