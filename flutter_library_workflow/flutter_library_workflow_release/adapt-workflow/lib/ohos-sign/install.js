'use strict';

const fs = require('fs');
const { spawnSync } = require('child_process');

/**
 * Detect whether at least one device is connected via hdc.
 * Returns { available, targets, raw }.
 */
function listHdcTargets(hdcBin) {
  const bin = hdcBin || 'hdc';
  const res = spawnSync(bin, ['list', 'targets'], { encoding: 'utf8' });
  if (res.error) {
    return { available: false, targets: [], raw: res.error.message, cliMissing: true };
  }
  const out = (res.stdout || '').trim();
  const targets = out.split(/\r?\n/).map(s => s.trim()).filter(s => s && !/\[Empty\]/i.test(s));
  return { available: targets.length > 0, targets, raw: out };
}

/**
 * hdc install the given HAP file.
 * When `target` is provided, installs to that specific device via `-t <target>`.
 * Throws on failure with combined stdout/stderr.
 */
function installHap(hapPath, hdcBin, target) {
  if (!fs.existsSync(hapPath)) {
    throw new Error(`HAP 不存在: ${hapPath}`);
  }
  const bin = hdcBin || 'hdc';
  const args = target ? ['-t', target, 'install', '-r', hapPath] : ['install', '-r', hapPath];
  const res = spawnSync(bin, args, { encoding: 'utf8' });
  if (res.error) {
    throw new Error(`启动 hdc 失败: ${res.error.message}`);
  }
  const stdout = (res.stdout || '').trim();
  const stderr = (res.stderr || '').trim();
  const combined = [stdout, stderr].filter(Boolean).join('\n');

  // hdc install exits 0 on success, but surface "fail" / "error" in stdout
  const ok = res.status === 0 && !/\bfail(ed)?\b|\berror\b/i.test(combined);
  if (!ok) {
    const prefix = target ? `hdc install 失败（设备 ${target}，退出码 ${res.status}）` : `hdc install 失败（退出码 ${res.status}）`;
    throw new Error(`${prefix}\n${combined}`);
  }
  return { stdout, stderr, target: target || '' };
}

/**
 * Install HAP to every connected target. Returns an array of per-target results.
 * Throws on first failure (with the partial results attached as `error.results`).
 */
function installHapToAllTargets(hapPath, hdcBin, targets) {
  const list = Array.isArray(targets) ? targets.filter(Boolean) : [];
  const results = [];
  if (list.length <= 1) {
    const r = installHap(hapPath, hdcBin, list[0] || '');
    results.push(r);
    return results;
  }
  for (const target of list) {
    try {
      const r = installHap(hapPath, hdcBin, target);
      results.push(r);
    } catch (err) {
      err.results = results;
      throw err;
    }
  }
  return results;
}

module.exports = { listHdcTargets, installHap, installHapToAllTargets };
