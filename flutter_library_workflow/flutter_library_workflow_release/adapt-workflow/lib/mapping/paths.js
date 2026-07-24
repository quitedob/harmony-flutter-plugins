'use strict';

const path = require('path');
const fsSync = require('fs');
const { WORKSPACE_ROOT } = require('../config');

function getMappingReposRoot() {
  // Mapping repos should be GLOBAL across profiles.
  return path.join(WORKSPACE_ROOT, 'repos', '_mapping_sources');
}

function safeSlug(input) {
  const s = String(input || '').trim();
  if (!s) return '';
  // Keep it readable on Windows; avoid reserved characters.
  const cleaned = s
    .replace(/\.git$/i, '')
    .replace(/^https?:\/\//i, '')
    .replace(/[\\/]+/g, '/')
    .split('/')
    .filter(Boolean)
    .pop() || '';
  return cleaned
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 64);
}

function getRepoDirName(source) {
  const id = String(source?.id || '').trim();
  const shortId = id ? id.slice(0, 8) : '';
  const fromName = safeSlug(source?.name);
  const fromUrl = safeSlug(source?.gitUrl);
  const base = fromName || fromUrl || shortId || 'source';
  return shortId ? `${base}__${shortId}` : base;
}

function getSourceRepoDir(sourceOrId, meta = null) {
  const sourceId = (typeof sourceOrId === 'string') ? sourceOrId : String(sourceOrId?.id || '');
  const root = getMappingReposRoot();

  // Backward-compat: old layout used `<root>/<sourceId>`; keep using it if present.
  const legacy = path.join(root, sourceId);
  if (sourceId && fsSync.existsSync(legacy)) return legacy;

  const src = (typeof sourceOrId === 'object' && sourceOrId) ? sourceOrId : { id: sourceId, ...(meta || {}) };
  return path.join(root, getRepoDirName(src));
}

module.exports = { getMappingReposRoot, getSourceRepoDir };

