'use strict';

const fsSync = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { WORKSPACE_ROOT } = require('../config');

function loadSchema() {
  const fp = path.join(WORKSPACE_ROOT, '.opencode', 'schema', 'json-schema', 'mapping-analysis.schema.json');
  const raw = fsSync.readFileSync(fp, 'utf8');
  return JSON.parse(raw);
}

let _ajvValidate = null;
function getAjvValidate() {
  if (_ajvValidate) return _ajvValidate;
  const ajv = new Ajv({ allErrors: true, strict: false, allowUnionTypes: true });
  addFormats(ajv);
  const schema = loadSchema();
  _ajvValidate = ajv.compile(schema);
  return _ajvValidate;
}

function formatAjvErrors(errors) {
  return (errors || []).map(e => {
    const at = e.instancePath || e.schemaPath || '';
    const msg = e.message || 'schema error';
    return `${at}: ${msg}`;
  });
}

function extractNeedleFromAndroidSymbol(androidSymbol) {
  const s = String(androidSymbol || '').trim();
  if (!s) return [];

  // Best-effort heuristics:
  // - "a.b.C#method" => ["C", "method"]
  // - "a.b.C.FIELD" => ["C", "FIELD"]
  // - fallback => last segment
  const parts = [];
  const hashIdx = s.indexOf('#');
  if (hashIdx !== -1) {
    const left = s.slice(0, hashIdx);
    const right = s.slice(hashIdx + 1);
    const cls = left.split('.').filter(Boolean).pop();
    if (cls) parts.push(cls);
    const meth = right.split('(')[0].split('.').filter(Boolean).pop();
    if (meth) parts.push(meth);
    return parts;
  }

  const segs = s.split('.').filter(Boolean);
  if (segs.length >= 2) {
    parts.push(segs[segs.length - 2]);
    parts.push(segs[segs.length - 1]);
  } else if (segs.length === 1) {
    parts.push(segs[0]);
  }
  return Array.from(new Set(parts)).filter(Boolean);
}

function extractNeedleFromHarmonyName(name) {
  const s = String(name || '').trim();
  if (!s) return [];
  // Take last identifier-like token.
  const tokens = s.split(/[^A-Za-z0-9_.$]/).filter(Boolean);
  const last = tokens[tokens.length - 1] || '';
  const segs = last.split('.').filter(Boolean);
  const t = segs[segs.length - 1] || last;
  return t ? [t] : [];
}

function validateEntrySemantics(entry) {
  const errors = [];
  const warnings = [];

  const ev = entry && entry.evidence;
  const fp = String(ev?.filePath || '');
  const snip = String(ev?.snippet || '');

  if (!fp) errors.push('evidence.filePath 为空');
  if (!snip || snip.trim().length < 10) errors.push('evidence.snippet 过短（<10）');

  // Minimum anti-hallucination check: the symbol should be evidenced in the snippet
  // depending on which side the evidence is from.
  const isAndroidEvidence = /(^|[\\/])android([\\/]|$)/i.test(fp);
  const isOhosEvidence = /(^|[\\/])ohos([\\/]|$)/i.test(fp);

  const snipLower = snip.toLowerCase();

  if (isAndroidEvidence) {
    const needles = extractNeedleFromAndroidSymbol(entry.androidSymbol);
    const hit = needles.some(n => snipLower.includes(String(n).toLowerCase()));
    if (!hit) errors.push(`Android 证据未命中 androidSymbol（needles: ${needles.join(', ') || 'n/a'}）`);
  } else if (isOhosEvidence) {
    const needles = extractNeedleFromHarmonyName(entry.harmonyReplacement?.name);
    const hit = needles.some(n => snipLower.includes(String(n).toLowerCase()));
    if (!hit) errors.push(`OHOS 证据未命中 harmonyReplacement.name（needles: ${needles.join(', ') || 'n/a'}）`);
  } else {
    warnings.push('evidence.filePath 未能判断 android/ohos 侧（未做强命中校验）');
  }

  // Encourage richer evidence; not a hard fail yet.
  if (!isAndroidEvidence && !isOhosEvidence) {
    warnings.push('建议提供 android/ 或 ohos/ 路径下的证据，减少推断空间');
  }

  return { ok: errors.length === 0, errors, warnings };
}

function validateMappingResultJson(json) {
  const validate = getAjvValidate();
  const ok = !!validate(json);
  return { ok, errors: ok ? [] : formatAjvErrors(validate.errors) };
}

function validateAndFilterMappings(json) {
  // Returns filtered items that pass semantic rules (schema must already pass).
  const items = Array.isArray(json) ? json : [];
  const passed = [];
  const rejected = [];
  const warnings = [];

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const r = validateEntrySemantics(it);
    if (r.warnings.length) warnings.push({ index: i, warnings: r.warnings });
    if (!r.ok) {
      rejected.push({ index: i, androidSymbol: it?.androidSymbol || '', errors: r.errors });
      continue;
    }
    passed.push(it);
  }
  return { passed, rejected, warnings };
}

module.exports = {
  validateMappingResultJson,
  validateAndFilterMappings
};

