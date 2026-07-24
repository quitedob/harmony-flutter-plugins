'use strict';

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { WORKSPACE_ROOT } = require('../config');

const REVIEWS_FILE = 'mapping-reviews.json';

function reviewsFilePath() {
  return path.join(WORKSPACE_ROOT, 'repos', REVIEWS_FILE);
}

async function readReviews() {
  try {
    const raw = await fs.readFile(reviewsFilePath(), 'utf8');
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return { reviews: {} };
    if (!data.reviews || typeof data.reviews !== 'object') data.reviews = {};
    return data;
  } catch {
    return { reviews: {} };
  }
}

async function writeReviews(data) {
  await fs.mkdir(path.dirname(reviewsFilePath()), { recursive: true });
  const out = data && typeof data === 'object' ? data : { reviews: {} };
  if (!out.reviews || typeof out.reviews !== 'object') out.reviews = {};
  await fs.writeFile(reviewsFilePath(), JSON.stringify(out, null, 2), 'utf8');
  return out;
}

function reviewsExists() {
  return fsSync.existsSync(reviewsFilePath());
}

function sanitizeReviewPatch(patch) {
  const p = patch && typeof patch === 'object' ? patch : {};
  const now = new Date().toISOString();
  const status = p.status ? String(p.status) : undefined;
  const reviewer = (p.reviewer !== undefined) ? String(p.reviewer || '').trim() : undefined;
  const notes = (p.notes !== undefined) ? String(p.notes || '').trim() : undefined;

  // finalOverride: optional, allow partial override of mapping fields.
  const fo = (p.finalOverride && typeof p.finalOverride === 'object') ? p.finalOverride : undefined;

  return {
    ...(status ? { status } : {}),
    ...(reviewer !== undefined ? { reviewer } : {}),
    ...(notes !== undefined ? { notes } : {}),
    ...(fo ? { finalOverride: fo } : {}),
    updatedAt: now
  };
}

async function upsertReview(key, patch) {
  if (!key) return null;
  const data = await readReviews();
  const cur = data.reviews[key] || { status: 'unreviewed', reviewer: '', notes: '', finalOverride: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  const nextPatch = sanitizeReviewPatch(patch);
  const next = {
    ...cur,
    ...nextPatch,
    createdAt: cur.createdAt || nextPatch.updatedAt
  };
  data.reviews[key] = next;
  await writeReviews(data);
  return next;
}

module.exports = {
  reviewsFilePath,
  readReviews,
  writeReviews,
  reviewsExists,
  upsertReview
};

