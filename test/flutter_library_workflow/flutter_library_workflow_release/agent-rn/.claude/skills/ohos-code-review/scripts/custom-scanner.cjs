'use strict';
/**
 * 轻量扫描器（Layer 2）：盲区规则 + CodeLinter 不可用/规则失效时的兜底。
 * 核心：先 maskCode 把注释与字符串/模板的“内容”替换为空格（保留长度/换行/引号），
 * 再在“纯代码”上跑规则，消灭“字符串/注释里的数字、== null”等正则误报。
 * 无第三方依赖（Node >= 14）。
 */
const fs = require('fs');

/** 把注释、字符串/模板字面量的内容替换为空格；保留行列、保留引号/反引号字符本身。 */
function maskCode(src) {
  const n = src.length;
  const out = src.split('');
  let i = 0;
  let state = 'code'; // code | line | block | sq | dq | tpl
  while (i < n) {
    const c = src[i];
    const c2 = i + 1 < n ? src[i + 1] : '';
    if (state === 'code') {
      if (c === '/' && c2 === '/') { out[i] = ' '; out[i + 1] = ' '; i += 2; state = 'line'; continue; }
      if (c === '/' && c2 === '*') { out[i] = ' '; out[i + 1] = ' '; i += 2; state = 'block'; continue; }
      if (c === "'") { state = 'sq'; i++; continue; }
      if (c === '"') { state = 'dq'; i++; continue; }
      if (c === '`') { state = 'tpl'; i++; continue; }
      i++; continue;
    }
    if (state === 'line') {
      if (c === '\n') { state = 'code'; i++; continue; }
      out[i] = ' '; i++; continue;
    }
    if (state === 'block') {
      if (c === '*' && c2 === '/') { out[i] = ' '; out[i + 1] = ' '; i += 2; state = 'code'; continue; }
      if (c !== '\n') out[i] = ' ';
      i++; continue;
    }
    if (state === 'sq' || state === 'dq') {
      const q = state === 'sq' ? "'" : '"';
      if (c === '\\') { out[i] = ' '; if (i + 1 < n && src[i + 1] !== '\n') out[i + 1] = ' '; i += 2; continue; }
      if (c === q) { state = 'code'; i++; continue; }
      if (c === '\n') { state = 'code'; i++; continue; } // 未闭合保护
      out[i] = ' '; i++; continue;
    }
    if (state === 'tpl') {
      if (c === '\\') { out[i] = ' '; if (i + 1 < n) out[i + 1] = ' '; i += 2; continue; }
      if (c === '`') { state = 'code'; i++; continue; }
      if (c !== '\n') out[i] = ' '; // 模板表达式一并屏蔽（保守）
      i++; continue;
    }
  }
  return out.join('');
}

const MAX_HITS_PER_SCANNER = 300;

/** 在单行 masked 文本里定位 `keyword (` 的整段括号，返回 {inner, after}（单行）。 */
function controlParen(line, keyword) {
  const re = new RegExp('\\b' + keyword + '\\s*\\(');
  const m = re.exec(line);
  if (!m) return null;
  let depth = 0;
  let start = m.index + m[0].length - 1; // 指向 '('
  for (let i = start; i < line.length; i++) {
    const ch = line[i];
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) {
        return { inner: line.slice(start + 1, i), after: line.slice(i + 1) };
      }
    }
  }
  return null; // 括号跨行
}

/** 去掉一行里 <...> ( ) [ ] { } 的成对内容（非嵌套近似），用于“多变量声明”判定。 */
function stripGroups(s) {
  let prev;
  do {
    prev = s;
    s = s.replace(/<[^<>]*>/g, '').replace(/\([^()]*\)/g, '').replace(/\[[^[\]]*\]/g, '').replace(/\{[^{}]*\}/g, '');
  } while (s !== prev);
  return s;
}

const LIFECYCLE = new Set([
  'aboutToAppear', 'aboutToDisappear', 'build', 'onPageShow', 'onPageHide', 'onBackPress',
  'aboutToReuse', 'aboutToRecycle', 'onDidBuild'
]);

// 每个 scanner: (ctx) => hits[]，hit = {line, column?, snippet, confidence?, value?}
const SCANNERS = {
  // ---- 表达式安全 ----
  strictEquality(ctx) {
    return eachLine(ctx, (mline) => {
      // == / != 但非 === !== <= >= =>，且排除 == null / != null
      const re = /([^=!<>])(===?|!==?)([^=])/g; // 捕获 == 或 ===；下面排除 3 字符
      const hits = [];
      let m;
      while ((m = re.exec(mline))) {
        const op = m[2];
        if (op === '===' || op === '!==') continue;
        // 排除 == null / != null（masked 中 null 仍是 null）
        const tail = mline.slice(m.index + m[0].length - 1);
        if (/^\s*null\b/.test(tail)) continue;
        hits.push(m.index);
      }
      return hits.length ? [{ col: hits[0] + 1 }] : [];
    });
  },
  assignInCondition(ctx) {
    const out = [];
    ctx.maskedLines.forEach((mline, idx) => {
      for (const kw of ['if', 'while']) {
        const cp = controlParen(mline, kw);
        if (cp && /[^=!<>]=[^=]/.test(cp.inner) && !/=>/.test(cp.inner)) {
          out.push(mk(ctx, idx)); break;
        }
      }
    });
    return out;
  },
  useIsnan(ctx) {
    return eachLine(ctx, (m) => (/(===?|!==?)\s*NaN\b/.test(m) || /\bNaN\s*(===?|!==?)/.test(m)) ? [{}] : []);
  },
  floatEquality(ctx) {
    return eachLine(ctx, (m) => (/(===|!==)\s*-?\d+\.\d+/.test(m) || /-?\d+\.\d+\s*(===|!==)/.test(m)) ? [{}] : []);
  },
  // ---- 声明与初始化 ----
  literalStyle(ctx) {
    return eachLine(ctx, (m) => /\bnew\s+(Boolean|Array|Object)\b/.test(m) ? [{}] : []);
  },
  oneVarPerLine(ctx) {
    return eachLine(ctx, (m) => {
      const dm = /\b(let|const|var)\b(.*)$/.exec(m);
      if (!dm) return [];
      const body = dm[2].split(';')[0];
      return (/,/.test(stripGroups(body)) && /=/.test(body)) ? [{}] : [];
    });
  },
  immutableExport(ctx) {
    return eachLine(ctx, (m) => /\bexport\s+(let|var)\b/.test(m) ? [{}] : []);
  },
  noArguments(ctx) {
    return eachLine(ctx, (m) => /(^|[^.\w])arguments\b/.test(m) ? [{}] : []);
  },
  // ---- 异常处理 ----
  finallyControl(ctx) {
    const src = ctx.maskedSrc;
    const out = [];
    const re = /\bfinally\s*\{/g;
    let m;
    while ((m = re.exec(src))) {
      let depth = 0, i = m.index + m[0].length - 1, end = -1;
      for (; i < src.length; i++) {
        if (src[i] === '{') depth++;
        else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
      }
      if (end === -1) continue;
      const block = src.slice(m.index, end);
      if (/\b(return|break|continue|throw)\b/.test(block)) {
        out.push(mk(ctx, lineOf(src, m.index)));
      }
    }
    return out;
  },
  jsonTryCatch(ctx) {
    return eachLine(ctx, (m) => /\bJSON\.(parse|stringify)\s*\(/.test(m) ? [{ confidence: 'needs_review' }] : []);
  },
  // ---- 资源管理 ----
  fileStreamClose(ctx) {
    return eachLine(ctx, (m) => /\b(fs|fileIo)\.open(Sync)?\s*\(/.test(m) ? [{ confidence: 'needs_review' }] : []);
  },
  // ---- 安全（信号常在字符串字面量里，故用 raw 行，跳过纯注释行）----
  noMd5(ctx) {
    return eachRaw(ctx, (raw) => /\bmd5\b/i.test(raw) ? [{}] : []);
  },
  keyHardcode(ctx) {
    return eachRaw(ctx, (raw) =>
      /\b(secret|api[_-]?key|apikey|private_key|client_secret)\b\s*[:=]/i.test(raw)
        ? [{ confidence: 'needs_review' }] : []);
  },
  logKey(ctx) {
    return eachRaw(ctx, (raw) =>
      /\b(hilog|console|Logger)\b\s*\.\s*\w+/.test(raw) && /\b(key|token|password|secret|priKey|deviceInfo)\b/i.test(raw)
        ? [{ confidence: 'needs_review' }] : []);
  },
  // ---- 命名 / 魔法值 ----
  namingClass(ctx) {
    return eachLine(ctx, (m) => /\b(class|enum)\s+[a-z]\w*/.test(m) ? [{}] : []);
  },
  magicValue(ctx) {
    const out = [];
    ctx.maskedLines.forEach((mline, idx) => {
      // 跳过文件级 UPPER_SNAKE 常量定义点（定义本身合法）
      const isUpperConst = /^\s*(export\s+)?const\s+[A-Z][A-Z0-9_]*\s*[:=]/.test(mline);
      if (isUpperConst) return;
      const re = /(^|[^\w.$])(-?\d+(?:\.\d+)?)/g;
      let m;
      while ((m = re.exec(mline))) {
        const raw = m[2];
        // 跳过十六进制（前缀 0x 已不会被本正则按十进制匹配，但保险起见跳过紧邻 x）
        const before = mline.slice(Math.max(0, m.index), m.index + m[0].length);
        if (/0[xX]$/.test(mline.slice(0, m.index + m[1].length))) continue;
        const num = Number(raw);
        if (num === 0 || num === 1 || num === -1) continue; // 对齐 codelinter
        // 数组下标 [n]
        const after = mline.slice(m.index + m[0].length);
        const justBefore = mline.slice(0, m.index + m[1].length);
        if (/\[\s*$/.test(justBefore) && /^\s*\]/.test(after)) continue;
        out.push({ line: idx + 1, snippet: snip(ctx.rawLines[idx]), value: raw });
        if (out.length >= MAX_HITS_PER_SCANNER) return;
      }
    });
    return out;
  },
  forIndexLoop(ctx) {
    return eachLine(ctx, (m) => /\bfor\s*\(\s*(let|var|const)\s+\w+\s*=/.test(m) ? [{}] : []);
  },
  negativeBoolean(ctx) {
    return eachLine(ctx, (m) => /\b(isNot|isNo[A-Z]|hasNo[A-Z])/.test(m) ? [{}] : []);
  },
  // ---- 格式 ----
  doubleQuote(ctx) {
    return eachLine(ctx, (m, idx, raw) => {
      if (/^\s*(import|export)\b/.test(m)) return [];
      return /"/.test(m) ? [{}] : [];
    });
  },
  requireBraces(ctx) {
    const out = [];
    ctx.maskedLines.forEach((mline, idx) => {
      for (const kw of ['if', 'for', 'while']) {
        const cp = controlParen(mline, kw);
        if (!cp) continue;
        const after = cp.after.trim();
        if (after === '' ) continue;            // 体在下一行，无法判定 → 跳过避免误报
        if (after.startsWith('{')) continue;     // 有大括号
        if (kw === 'if' && /^else\b/.test(after)) continue;
        out.push(mk(ctx, idx)); break;
      }
    });
    return out;
  },
  arrayType(ctx) {
    return eachLine(ctx, (m) => {
      if (/^\s*(import|export)\b/.test(m)) return [];
      return /\bArray\s*</.test(m) ? [{}] : [];
    });
  },
  lineWidth(ctx) {
    const out = [];
    ctx.rawLines.forEach((raw, idx) => {
      if (raw.length > 120 && !/https?:\/\//.test(raw)) out.push({ line: idx + 1, snippet: snip(raw) });
    });
    return out;
  },
  mathRandom(ctx) {
    return eachLine(ctx, (m) => /\bMath\.random\b/.test(m) ? [{}] : []);
  },
  keywordSpacing(ctx) {
    return eachLine(ctx, (m) => /\b(if|for|while|switch|catch)\(/.test(m) ? [{}] : []);
  },
  dotNotation(ctx) {
    return eachLine(ctx, (m) => /\[\s*['"][ ]*['"]\s*\]/.test(m) || /\[\s*['"]\s*['"]\s*\]/.test(m) ? [{}] : []);
  },
  commentedCode(ctx) {
    // 注意：注释已被 mask，必须用 raw 行
    const out = [];
    ctx.rawLines.forEach((raw, idx) => {
      if (/^\s*\/\/\s*(const|let|var|function|if|for|return|import|public|private|protected)\b/.test(raw)) {
        out.push({ line: idx + 1, snippet: snip(raw) });
      }
    });
    return out;
  },
  // ---- Android 残留 (P0) ----
  // import 的包名常在被 mask 的模块字符串里（如 from 'androidx.core'），故 import/from/require 行用 raw 判定；
  // 代码中的 android.X API 调用用 masked 判定，避免命中注释/字符串。
  androidResidue(ctx) {
    const out = [];
    ctx.rawLines.forEach((raw, idx) => {
      const masked = ctx.maskedLines[idx];
      if (/\bimport\s+(android|androidx|java|javax|kotlin)\./.test(raw)) { out.push(mk(ctx, idx)); return; }
      if ((/\bimport\b/.test(raw) || /\bfrom\b/.test(raw) || /\brequire\s*\(/.test(raw)) &&
          /\b(android|androidx|java|javax|kotlin)[./]/.test(raw)) { out.push(mk(ctx, idx)); return; }
      if (/(^|[^.\w])(android|androidx)\.[A-Za-z]/.test(masked)) { out.push(mk(ctx, idx)); }
    });
    return out;
  },
};

// ---------- helpers ----------
function snip(raw) { return (raw || '').trim().slice(0, 160); }
function lineOf(src, index) { return src.slice(0, index).split('\n').length; }
function mk(ctx, idx) { return { line: idx + 1, snippet: snip(ctx.rawLines[idx]) }; }
function eachLine(ctx, fn) {
  const out = [];
  for (let i = 0; i < ctx.maskedLines.length; i++) {
    const res = fn(ctx.maskedLines[i], i, ctx.rawLines[i]) || [];
    for (const r of res) {
      out.push(Object.assign({ line: i + 1, snippet: snip(ctx.rawLines[i]) }, r));
      if (out.length >= MAX_HITS_PER_SCANNER) return out;
    }
  }
  return out;
}
// 跑在 raw 行上（跳过纯行注释），用于信号藏在字符串里的安全类规则
function eachRaw(ctx, fn) {
  const out = [];
  for (let i = 0; i < ctx.rawLines.length; i++) {
    const raw = ctx.rawLines[i];
    if (/^\s*\/\//.test(raw)) continue;
    const res = fn(raw, i) || [];
    for (const r of res) {
      out.push(Object.assign({ line: i + 1, snippet: snip(raw) }, r));
      if (out.length >= MAX_HITS_PER_SCANNER) return out;
    }
  }
  return out;
}

/**
 * 扫描一个文件。
 * @param {string} absPath 绝对路径
 * @param {string} relPath 相对工程根的路径（用于输出）
 * @param {string[]} scannerIds 要运行的 scanner id
 * @returns {{[scannerId:string]: hit[]}}
 */
function scanFile(absPath, relPath, scannerIds) {
  let src;
  try { src = fs.readFileSync(absPath, 'utf8'); } catch (e) { return {}; }
  const masked = maskCode(src);
  const ctx = {
    file: relPath,
    rawSrc: src,
    maskedSrc: masked,
    rawLines: src.split('\n'),
    maskedLines: masked.split('\n'),
  };
  const result = {};
  for (const id of scannerIds) {
    const fn = SCANNERS[id];
    if (!fn) continue;
    const hits = fn(ctx).map((h) => Object.assign({ file: relPath }, h));
    if (hits.length) result[id] = hits;
  }
  return result;
}

module.exports = { maskCode, SCANNERS, scanFile };
