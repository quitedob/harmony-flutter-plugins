#!/usr/bin/env node
'use strict';

// Fast profile 入口：复用 rn-ohos-blackbox-verify.js 的全部逻辑，
// 仅覆盖产物目录为 .ohos-adaptation（fast 线与 sdk/flutter 对齐）。
// full profile 继续走 rn-ohos-blackbox-verify.js，仍用 .rn-ohos-adaptation。

const path = require('path');
const { run } = require('./rn-ohos-blackbox-verify');

const FAST_ADAPTATION_DIR = '.ohos-adaptation';

(async () => {
  try {
    await run(FAST_ADAPTATION_DIR);
  } catch (err) {
    console.error('黑盒验证失败:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
