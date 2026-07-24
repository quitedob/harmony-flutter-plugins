'use strict';

const path = require('path');
const { AppError } = require('./errors');

/**
 * Normalize optional monorepo subpath (relative to clone root).
 * Uses forward slashes in storage; rejects ".." segments.
 * @param {unknown} raw
 * @returns {string} normalized relative path or ""
 */
function normalizePackagePath(raw) {
  if (raw == null) return '';
  const s = String(raw).trim().replace(/\\/g, '/');
  if (!s) return '';
  const trimmed = s.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!trimmed) return '';
  const segments = trimmed.split('/').filter(Boolean);
  if (segments.some((seg) => seg === '..' || seg === '.')) {
    throw new AppError('packagePath 不能包含 . 或 .. 段', 400);
  }
  return segments.join('/');
}

/**
 * Absolute path to the directory where adaptation + package live
 * (clone root, or clone root + packagePath).
 * @param {string} cloneRoot - getReposDir()/plugin.name
 * @param {{ packagePath?: string } | null} plugin
 * @returns {string}
 */
function resolvePluginWorkRoot(cloneRoot, plugin) {
  const sub = normalizePackagePath(plugin && plugin.packagePath);
  if (!sub) return path.resolve(cloneRoot);
  const cloneAbs = path.resolve(cloneRoot);
  const resolved = sub.split('/').reduce((acc, seg) => path.join(acc, seg), cloneAbs);
  const rel = path.relative(cloneAbs, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new AppError('packagePath 非法：必须位于克隆仓库目录内', 400);
  }
  return resolved;
}

module.exports = { normalizePackagePath, resolvePluginWorkRoot };
