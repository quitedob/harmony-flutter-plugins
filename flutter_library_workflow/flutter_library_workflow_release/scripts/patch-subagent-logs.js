#!/usr/bin/env node
/**
 * patch-subagent-logs.js
 *
 * Patches the opencode binary to show subagent (Task tool) execution logs
 * in the console when using `opencode run`.
 *
 * By default, opencode filters all events to the current session only,
 * hiding everything that happens inside spawned subagents. This patch
 * removes that filter so subagent tool calls are visible in real time.
 *
 * Usage:
 *   node patch-subagent-logs.js              # auto-detect opencode binary
 *   node patch-subagent-logs.js /path/to/opencode
 *   node patch-subagent-logs.js --revert     # restore original filter
 *   node patch-subagent-logs.js --scan       # scan without patching
 *
 * Supports: Windows, macOS, Linux
 * Requirements: Node.js 14+ (no external dependencies)
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

// ─── Config ────────────────────────────────────────────────────────────────

// Broad regex: catches all X.sessionID !== Y patterns.
const BROAD_RE = /\w{1,50}\.sessionID\s*!==\s*\w{1,50}/g;

// After patching, we leave behind "false" + spaces. Used to detect already-patched.
const PATCH_SIGNATURE = 'false' + ' '.repeat(10);

// ─── Helpers ───────────────────────────────────────────────────────────────
const colors = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

function log(color, ...args) {
  console.log(color(args.join(' ')));
}

function die(msg) {
  log(colors.red, 'ERROR: ' + msg);
  process.exit(1);
}

function resolveBinaryPath(p) {
  try { return fs.realpathSync(p); } catch { return path.resolve(p); }
}

function findOpencodeInPath() {
  const cmd = process.platform === 'win32' ? 'where opencode' : 'which opencode';
  try {
    const out = execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    const first = out.trim().split(/[\r\n]+/)[0];
    if (first) return first.trim();
  } catch {}
  return null;
}

function codesign(binaryPath) {
  if (process.platform !== 'darwin') return;
  try {
    execSync(`codesign --sign - --force "${binaryPath}"`, {
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    console.log('  codesign OK');
  } catch {
    log(colors.yellow, '  codesign failed (may still work)');
  }
}

function getVersion(binaryPath) {
  try {
    const r = spawnSync(binaryPath, ['--version'], {
      encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
    });
    return r.status === 0 ? (r.stdout || r.stderr || '').trim() : 'unknown';
  } catch { return 'unknown'; }
}

// ─── Pattern detection ─────────────────────────────────────────────────────

/**
 * Find all X.sessionID !== Y patterns in the binary, with context.
 */
function findAllPatterns(text) {
  const results = [];
  let m;
  BROAD_RE.lastIndex = 0;
  while ((m = BROAD_RE.exec(text)) !== null) {
    const offset = m.index;
    const match = m[0];
    const ctxStart = Math.max(0, offset - 80);
    const ctxEnd = Math.min(text.length, offset + match.length + 80);
    results.push({
      offset,
      match,
      length: match.length,
      before: text.slice(ctxStart, offset),
      after: text.slice(offset + match.length, ctxEnd),
      context: text.slice(ctxStart, ctxEnd),
    });
  }
  return results;
}

/**
 * Identify the event-loop session filter(s) among all matches.
 *
 * The target pattern sits inside the `opencode run` event streaming loop:
 *   if (X.sessionID !== Y)
 *     continue;
 *
 * Detection heuristics:
 *  1. Followed by `) continue;` (it's a loop guard, not a callback return)
 *  2. The right-hand side Y is a bare identifier (not Y.something — excludes
 *     dedup comparisons like `info.sessionID !== existing.info.sessionID`)
 *  3. The left side references something like `part.sessionID` or `props.sessionID`
 *     (event part properties)
 */
function findEventLoopFilters(allMatches, text) {
  return allMatches.filter((m) => {
    const afterTrimmed = m.after.replace(/^\s*/, '');
    const hasContinue = /^\)\s*(continue|return)\s*;/.test(afterTrimmed);
    if (!hasContinue) return false;

    // Right side should be a bare identifier — not followed by "."
    // Pattern is "X.sessionID !== Y", so after the match the next non-space
    // char should be ")" not "."
    const firstCharAfter = m.after.trimStart()[0];
    if (firstCharAfter === '.') return false;

    return true;
  });
}

// ─── Main ──────────────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  let revert = false;
  let scanOnly = false;
  let binary = '';

  for (const arg of args) {
    if (arg === '--revert' || arg === '-r') revert = true;
    else if (arg === '--scan' || arg === '-s') scanOnly = true;
    else if (!arg.startsWith('-')) binary = arg;
    else die(`Unknown flag: ${arg}`);
  }

  if (!binary) {
    binary = findOpencodeInPath();
    if (!binary) die('opencode not found in PATH. Pass the binary path as an argument.');
  }

  const resolved = resolveBinaryPath(binary);
  if (!fs.existsSync(resolved)) die(`Not a file: ${resolved}`);
  if (!fs.statSync(resolved).isFile()) die(`Not a file: ${resolved}`);

  log(colors.bold, `Target binary: ${resolved}`);
  const version = getVersion(resolved);
  console.log(`Version: ${version}\n`);

  const backupPath = `${resolved}.original`;

  // ─── Revert ─────────────────────────────────────────────────────────────
  if (revert) {
    if (!fs.existsSync(backupPath)) die(`No backup found at ${backupPath} — cannot revert`);
    log(colors.bold, 'Reverting patch...');
    fs.copyFileSync(backupPath, resolved);
    codesign(resolved);
    log(colors.green, '✓ Reverted to original binary');
    process.exit(0);
  }

  // ─── Read binary ────────────────────────────────────────────────────────
  let data;
  try { data = fs.readFileSync(resolved); } catch (e) {
    die(`Cannot read binary: ${e.message}`);
  }
  const text = data.toString('latin1');

  // ─── Find patterns ──────────────────────────────────────────────────────
  const allMatches = findAllPatterns(text);
  const targets = findEventLoopFilters(allMatches, text);
  const alreadyPatched = text.includes(PATCH_SIGNATURE);

  // ─── Scan mode ──────────────────────────────────────────────────────────
  if (scanOnly) {
    if (allMatches.length === 0) {
      log(colors.yellow, 'No .sessionID !== patterns found.');
      if (alreadyPatched) console.log('(Binary appears to be already patched)');
    } else {
      log(colors.bold, `All .sessionID !== patterns (${allMatches.length}):\n`);
      for (const m of allMatches) {
        const isTarget = targets.includes(m);
        const tag = isTarget ? colors.green(' ← TARGET') : '';
        console.log(`  offset ${m.offset}: ${colors.bold(`"${m.match}"`)}${tag}`);
        const ctx = m.context.replace(/\n/g, '\\n');
        console.log(`  ${colors.dim(`...${ctx}...`)}`);
        console.log();
      }
      console.log(`Event-loop filter targets: ${targets.length}`);
    }
    process.exit(0);
  }

  // ─── Already patched? ───────────────────────────────────────────────────
  if (targets.length === 0 && alreadyPatched) {
    log(colors.yellow, 'Binary is already patched. Use --revert to restore original.');
    process.exit(0);
  }

  if (targets.length === 0) {
    log(colors.yellow, `Found ${allMatches.length} .sessionID !== pattern(s), but none matched the event-loop filter heuristic.`);
    if (allMatches.length > 0) {
      console.log('Candidates found:');
      for (const m of allMatches) {
        const ctx = m.context.replace(/\n/g, '\\n');
        console.log(`  offset ${m.offset}: "${m.match}"`);
        console.log(`    ...${ctx}...`);
      }
    }
    die(
      `Could not auto-detect the event-loop filter.\n` +
      `Run with --scan for full diagnostics.\n` +
      `Please open an issue with your opencode version (${version}).`
    );
  }

  console.log(`Detected ${targets.length} event-loop session filter(s) to patch:`);
  for (const t of targets) {
    console.log(`  "${t.match}" at offset ${t.offset}`);
  }
  console.log();

  // ─── Backup ─────────────────────────────────────────────────────────────
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(resolved, backupPath);
    console.log(`Backup saved to: ${backupPath}`);
  } else {
    log(colors.yellow, `Backup already exists at ${backupPath} (skipping)`);
  }

  // ─── Apply patches ───────────────────────────────────────────────────────
  log(colors.bold, 'Applying patch...');

  let buf = Buffer.from(data);
  let totalOffset = 0;

  for (const target of targets) {
    const replacement = Buffer.from('false' + ' '.repeat(target.length - 5), 'latin1');
    if (replacement.length !== target.length) {
      die(`BUG: replacement length mismatch (${replacement.length} vs ${target.length})`);
    }

    const idx = target.offset;
    const before = buf.subarray(0, idx);
    const after = buf.subarray(idx + target.length);
    buf = Buffer.concat([before, replacement, after]);

    console.log(`  [${++totalOffset}] offset ${idx}: "${target.match}" → "false${' '.repeat(target.length - 5)}"`);
  }

  fs.writeFileSync(resolved, buf);
  console.log(`  patched ${targets.length} location(s)`);

  // ─── Re-sign (macOS) ─────────────────────────────────────────────────────
  if (process.platform === 'darwin') {
    console.log('Re-signing binary (ad-hoc)...');
    codesign(resolved);
  }

  // ─── Verify ──────────────────────────────────────────────────────────────
  const newVersion = getVersion(resolved);
  if (!newVersion || newVersion === 'unknown') die('Patched binary failed to run');
  log(colors.green, `✓ Patch applied successfully (version: ${newVersion})`);
  console.log('');
  console.log("Subagent tool calls will now be visible in 'opencode run' output.");
  console.log('To revert: node patch-subagent-logs.js --revert');
  console.log(`           (or restore from backup: ${backupPath})`);
}

main();
