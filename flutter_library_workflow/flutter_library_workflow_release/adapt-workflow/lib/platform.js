'use strict';

const { execSync } = require('child_process');

const IS_WIN = process.platform === 'win32';

/**
 * Format an executable + args array into a display string (for logs, not execution).
 */
function formatCommand(executable, args) {
  const parts = [executable, ...args.map(a =>
    /[\s"']/.test(a) ? `"${a.length > 120 ? a.substring(0, 120) + '...' : a}"` : a
  )];
  return parts.join(' ');
}

/**
 * Kill a process tree cross-platform.
 * On Windows, uses taskkill /T to kill the tree.
 * On Unix, sends SIGTERM to the process group first; if the process is still
 * alive after 5 seconds, escalates to SIGKILL.
 */
function killProc(proc, reason = null) {
  if (!proc || proc.killed) return;
  if (reason && !proc._terminationReason) {
    proc._terminationReason = reason;
  }

  if (IS_WIN) {
    try {
      execSync(`taskkill /pid ${proc.pid} /T /F`, { stdio: 'ignore' });
    } catch {}
    return;
  }

  try {
    process.kill(-proc.pid, 'SIGTERM');
  } catch {
    try { proc.kill('SIGTERM'); } catch {}
  }

  setTimeout(() => {
    try {
      process.kill(proc.pid, 0);
      try { process.kill(-proc.pid, 'SIGKILL'); } catch {
        try { proc.kill('SIGKILL'); } catch {}
      }
    } catch {
      // process already dead
    }
  }, 5000);
}

module.exports = { IS_WIN, formatCommand, killProc };
