'use strict';

const fs = require('fs');
const path = require('path');
const { IS_WIN } = require('../platform');
const { getActiveProfile } = require('../profile');

const DEFAULT_WORKSPACE_DIRS = ['.claude', '.opencode'];
const DEFAULT_WORKSPACE_FILES = ['CLAUDE.md'];

function getWorkspaceDirs() {
  const profile = getActiveProfile();
  return profile.workspaceDirs || DEFAULT_WORKSPACE_DIRS;
}

function getWorkspaceFiles() {
  const profile = getActiveProfile();
  return profile.workspaceFiles || DEFAULT_WORKSPACE_FILES;
}

function getWorkspaceExtraSymlinks() {
  const profile = getActiveProfile();
  return profile.workspaceExtraSymlinks || [];
}

/**
 * Resolve the agent resource root directory.
 * If the active profile defines agentDir, resources live under
 * workspaceRoot/agentDir; otherwise fall back to workspaceRoot itself.
 */
function resolveAgentRoot(workspaceRoot) {
  const profile = getActiveProfile();
  return profile.agentDir
    ? path.join(workspaceRoot, profile.agentDir)
    : workspaceRoot;
}

function symlinkDir(target, linkPath) {
  if (IS_WIN) {
    const absTarget = path.resolve(target);
    fs.symlinkSync(absTarget, linkPath, 'junction');
  } else {
    const rel = path.relative(path.dirname(linkPath), target);
    fs.symlinkSync(rel, linkPath);
  }
}

/**
 * Ensure agent resource directories and files are accessible from
 * a plugin repo via persistent symlinks / copies.
 *
 * Returns { success: boolean, errors: string[] } so callers can
 * decide whether to abort on critical link failures.
 */
function ensureWorkspaceLinks(repoPath, workspaceRoot) {
  const agentRoot = resolveAgentRoot(workspaceRoot);
  const WORKSPACE_DIRS = getWorkspaceDirs();
  const WORKSPACE_FILES = getWorkspaceFiles();
  const errors = [];

  for (const dir of WORKSPACE_DIRS) {
    const src = path.join(agentRoot, dir);
    if (!fs.existsSync(src)) continue;

    const dst = path.join(repoPath, dir);

    if (!fs.existsSync(dst)) {
      try {
        symlinkDir(src, dst);
      } catch (err) {
        const msg = `Failed to create symlink ${dst} → ${src}: ${err.message}`;
        console.warn(`[workspace-links] ${msg}`);
        errors.push(msg);
      }
      continue;
    }

    let stat;
    try { stat = fs.lstatSync(dst); } catch (err) {
      console.warn(`[workspace-links] Cannot stat ${dst}: ${err.message}`);
      continue;
    }

    if (stat.isSymbolicLink()) {
      try {
        if (fs.realpathSync(dst) === fs.realpathSync(src)) continue;
      } catch {}
      try { fs.unlinkSync(dst); } catch (err) {
        const msg = `Cannot remove stale symlink ${dst}: ${err.message}`;
        console.warn(`[workspace-links] ${msg}`);
        errors.push(msg);
        continue;
      }
      try {
        symlinkDir(src, dst);
      } catch (err) {
        const msg = `Failed to recreate symlink ${dst} → ${src}: ${err.message}`;
        console.warn(`[workspace-links] ${msg}`);
        errors.push(msg);
      }
      continue;
    }

    if (stat.isDirectory()) {
      const subErrors = bridgeSubEntries(src, dst);
      errors.push(...subErrors);
    }
  }

  for (const file of WORKSPACE_FILES) {
    const src = path.join(agentRoot, file);
    if (!fs.existsSync(src)) continue;

    const dst = path.join(repoPath, file);
    try {
      const srcContent = fs.readFileSync(src);
      const dstContent = fs.existsSync(dst) ? fs.readFileSync(dst) : null;
      if (!dstContent || !srcContent.equals(dstContent)) {
        fs.writeFileSync(dst, srcContent);
      }
    } catch (err) {
      const msg = `Failed to copy workspace file ${file}: ${err.message}`;
      console.warn(`[workspace-links] ${msg}`);
      errors.push(msg);
    }
  }

  for (const { from, to } of getWorkspaceExtraSymlinks()) {
    const src = path.join(agentRoot, from);
    if (!fs.existsSync(src)) continue;

    const dst = path.join(repoPath, to);
    let srcIsDir;
    try {
      srcIsDir = fs.statSync(src).isDirectory();
    } catch {
      continue;
    }

    try {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
    } catch (err) {
      const msg = `Failed to mkdir for extra symlink ${dst}: ${err.message}`;
      console.warn(`[workspace-links] ${msg}`);
      errors.push(msg);
      continue;
    }

    let dstLstat = null;
    try {
      dstLstat = fs.lstatSync(dst);
    } catch (e) {
      if (e && e.code !== 'ENOENT') {
        const msg = `Cannot stat extra link ${dst}: ${e.message}`;
        console.warn(`[workspace-links] ${msg}`);
        errors.push(msg);
      }
    }

    if (dstLstat) {
      const sameReal = () => {
        try {
          const a = fs.realpathSync(dst);
          const b = fs.realpathSync(src);
          if (IS_WIN) return a.toLowerCase() === b.toLowerCase();
          return a === b;
        } catch {
          return false;
        }
      };

      if (dstLstat.isSymbolicLink()) {
        try {
          if (sameReal()) continue;
        } catch {}
        try {
          fs.unlinkSync(dst);
        } catch (err) {
          const msg = `Cannot remove stale symlink ${dst}: ${err.message}`;
          console.warn(`[workspace-links] ${msg}`);
          errors.push(msg);
          continue;
        }
      } else if (IS_WIN && srcIsDir) {
        // Junctions often appear as directories, not symlinks — still skip or replace by realpath.
        try {
          if (sameReal()) continue;
        } catch {}
        try {
          fs.unlinkSync(dst);
        } catch (err) {
          const msg = `Cannot remove stale junction/dir ${dst}: ${err.message}`;
          console.warn(`[workspace-links] ${msg}`);
          errors.push(msg);
          continue;
        }
      } else {
        continue;
      }
    }

    try {
      if (IS_WIN) {
        if (srcIsDir) {
          symlinkDir(src, dst);
        } else {
          fs.symlinkSync(path.resolve(src), dst, 'file');
        }
      } else {
        const rel = path.relative(path.dirname(dst), src);
        fs.symlinkSync(rel, dst);
      }
    } catch (err) {
      if (err && err.code === 'EEXIST' && dstLstat) {
        try {
          fs.unlinkSync(dst);
          if (IS_WIN) {
            if (srcIsDir) symlinkDir(src, dst);
            else fs.symlinkSync(path.resolve(src), dst, 'file');
          } else {
            const rel = path.relative(path.dirname(dst), src);
            fs.symlinkSync(rel, dst);
          }
        } catch (err2) {
          const msg = `Failed to create extra symlink ${dst} → ${src}: ${err.message} (retry: ${err2.message})`;
          console.warn(`[workspace-links] ${msg}`);
          errors.push(msg);
        }
      } else {
        const msg = `Failed to create extra symlink ${dst} → ${src}: ${err.message}`;
        console.warn(`[workspace-links] ${msg}`);
        errors.push(msg);
      }
    }
  }

  return { success: errors.length === 0, errors };
}

function bridgeSubEntries(srcDir, dstDir) {
  const errors = [];
  let entries;
  try { entries = fs.readdirSync(srcDir); } catch { return errors; }

  for (const name of entries) {
    if (name.startsWith('.')) continue;

    const srcPath = path.join(srcDir, name);
    const dstPath = path.join(dstDir, name);

    if (fs.existsSync(dstPath)) continue;

    try {
      const srcStat = fs.statSync(srcPath);
      if (srcStat.isDirectory()) {
        symlinkDir(srcPath, dstPath);
      } else {
        if (IS_WIN) {
          fs.symlinkSync(path.resolve(srcPath), dstPath, 'file');
        } else {
          const rel = path.relative(dstDir, srcPath);
          fs.symlinkSync(rel, dstPath);
        }
      }
    } catch (err) {
      const msg = `Failed to bridge ${name} in ${dstDir}: ${err.message}`;
      console.warn(`[workspace-links] ${msg}`);
      errors.push(msg);
    }
  }

  return errors;
}

module.exports = {
  ensureWorkspaceLinks,
  resolveAgentRoot,
  getWorkspaceDirs,
  getWorkspaceFiles,
  getWorkspaceExtraSymlinks
};
