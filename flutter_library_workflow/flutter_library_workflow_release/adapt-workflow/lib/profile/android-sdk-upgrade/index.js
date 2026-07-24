'use strict';

// Android SDK upgrade profile. See flutter-upgrade/index.js for rationale.

const config = require('./config');

module.exports = {
  id: 'android-sdk-upgrade',
  name: 'Android SDK → 鸿蒙 升级',
  framework: 'android-sdk',
  targetPlatform: 'ohos',
  workflow: 'upgrade',

  ...config
};
