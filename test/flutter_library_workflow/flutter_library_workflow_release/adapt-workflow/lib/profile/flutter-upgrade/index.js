'use strict';

// Flutter upgrade profile.
//
// Same role as the adaptation profiles (flutter-ohos / flutter-ohos-fast) but
// for the *upgrade* workflow: re-running against a library that already has a
// HarmonyOS adaptation. `workflow: 'upgrade'` distinguishes it from the
// adaptation profiles so the upgrade module can resolve it by library type.

const config = require('./config');

module.exports = {
  id: 'flutter-upgrade',
  name: 'Flutter → 鸿蒙 升级',
  framework: 'flutter',
  targetPlatform: 'ohos',
  workflow: 'upgrade',

  ...config
};
