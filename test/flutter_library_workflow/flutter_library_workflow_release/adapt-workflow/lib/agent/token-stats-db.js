const { execSync } = require('child_process');
const fsSync = require('fs');
const path = require('path');

let IS_WIN = false;
try { IS_WIN = require('../platform').IS_WIN; } catch { IS_WIN = process.platform === 'win32'; }
const { getActiveProfile } = require('../profile');

// ═══════════════════════════════════════════════════════════════
// CLI 方式查询 OpenCode 数据库（替代 better-sqlite3）
// ═══════════════════════════════════════════════════════════════

let _dbPath = null;

/**
 * 获取 OpenCode 数据库路径（通过 opencode db path 命令）
 * @returns {string|null} 数据库路径或 null
 */
function getDbPath() {
  if (_dbPath) return _dbPath;
  try {
    _dbPath = execSync('opencode db path', { encoding: 'utf8' }).trim();
    return _dbPath;
  } catch (err) {
    console.error(`[token-stats-db] 获取数据库路径失败: ${err.message}`);
    return null;
  }
}

/**
 * 检查数据库是否存在
 * @returns {boolean}
 */
function dbExists() {
  const dbPath = getDbPath();
  return dbPath && fsSync.existsSync(dbPath);
}

/**
 * 通过 opencode db CLI 执行 SQL 查询
 * @param {string} sql - SQL 查询语句
 * @returns {Array} 查询结果数组，失败返回空数组
 */
function runSQL(sql) {
  if (!dbExists()) return [];

  try {
    // 将多行 SQL 合并为单行，转义双引号
    const singleLineSql = sql.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const escapedSql = singleLineSql.replace(/"/g, '\\"');

    // 使用 opencode db 命令执行查询，JSON 格式输出
    const result = execSync(
      `opencode db "${escapedSql}" --format json`,
      {
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
        timeout: 30000,
        shell: true
      }
    ).trim();

    if (!result) return [];
    return JSON.parse(result);
  } catch (err) {
    console.error(`[token-stats-db] SQL 执行失败: ${err.message}`);
    return [];
  }
}

function sqlEscape(str) {
  return str.replace(/'/g, "''");
}

/**
 * 优化版：一次查询同时获取 all + sinceClone 的 message 统计
 * 返回格式：[{type: 'totals', scope: 'all', ...}, {type: 'totals', scope: 'clone', ...}, ...]
 * 
 * @param {string} sessionSubAll - all session 子查询
 * @param {string} sessionSubClone - clone session 子查询
 * @param {boolean} hasCloneTime - 是否有 clone 时间
 * @returns {Array} 查询结果
 */
function queryMessageStatsOptimized(sessionSubAll, sessionSubClone, hasCloneTime) {
  // 简化方案：分别查询，但用更紧凑的方式
  const baseWhere = `session_id IN ${sessionSubAll}`;
  const cloneWhere = hasCloneTime ? `session_id IN ${sessionSubClone}` : baseWhere;

  // 查询 1: totals (all + clone 用 UNION ALL)
  const totalsSQL = hasCloneTime
    ? `SELECT 'all' as scope, COUNT(*) as interactions, COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens, COALESCE(SUM(json_extract(data, '$.tokens.reasoning')), 0) as reasoning_tokens, COALESCE(SUM(json_extract(data, '$.tokens.cache.read')), 0) as cache_read, COALESCE(SUM(json_extract(data, '$.tokens.cache.write')), 0) as cache_write, COALESCE(SUM(json_extract(data, '$.cost')), 0) as total_cost FROM message WHERE ${baseWhere} UNION ALL SELECT 'clone' as scope, COUNT(*) as interactions, COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens, COALESCE(SUM(json_extract(data, '$.tokens.reasoning')), 0) as reasoning_tokens, COALESCE(SUM(json_extract(data, '$.tokens.cache.read')), 0) as cache_read, COALESCE(SUM(json_extract(data, '$.tokens.cache.write')), 0) as cache_write, COALESCE(SUM(json_extract(data, '$.cost')), 0) as total_cost FROM message WHERE ${cloneWhere}`
    : `SELECT 'all' as scope, COUNT(*) as interactions, COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens, COALESCE(SUM(json_extract(data, '$.tokens.reasoning')), 0) as reasoning_tokens, COALESCE(SUM(json_extract(data, '$.tokens.cache.read')), 0) as cache_read, COALESCE(SUM(json_extract(data, '$.tokens.cache.write')), 0) as cache_write, COALESCE(SUM(json_extract(data, '$.cost')), 0) as total_cost FROM message WHERE ${baseWhere}`;

  const totalsResult = runSQL(totalsSQL);

  // 查询 2: byModel (only all)
  const byModelSQL = `SELECT json_extract(data, '$.modelID') as model, json_extract(data, '$.providerID') as provider, COUNT(*) as interactions, COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens FROM message WHERE ${baseWhere} GROUP BY model, provider ORDER BY total_tokens DESC`;
  const byModelResult = runSQL(byModelSQL);

  // 查询 3: byAgent (all + clone 用 UNION ALL)
  const byAgentSQL = hasCloneTime
    ? `SELECT 'all' as scope, json_extract(data, '$.agent') as agent, COUNT(*) as interactions, COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens, COALESCE(SUM(json_extract(data, '$.tokens.cache.read')), 0) as cache_read FROM message WHERE ${baseWhere} GROUP BY agent UNION ALL SELECT 'clone' as scope, json_extract(data, '$.agent') as agent, COUNT(*) as interactions, COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens, COALESCE(SUM(json_extract(data, '$.tokens.cache.read')), 0) as cache_read FROM message WHERE ${cloneWhere} GROUP BY agent ORDER BY total_tokens DESC`
    : `SELECT 'all' as scope, json_extract(data, '$.agent') as agent, COUNT(*) as interactions, COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens, COALESCE(SUM(json_extract(data, '$.tokens.cache.read')), 0) as cache_read FROM message WHERE ${baseWhere} GROUP BY agent ORDER BY total_tokens DESC`;

  const byAgentResult = runSQL(byAgentSQL);

  return { totalsResult, byModelResult, byAgentResult };
}

/**
 * 优化版：一次性查询 all + sinceClone 统计（从 8 次优化到 5 次）
 * 
 * 查询次数：
 * - Sessions: 1 次（UNION ALL 合并 all + clone）
 * - Message totals: 1 次（UNION ALL 合并 all + clone）
 * - Message byModel: 1 次（仅 all）
 * - Message byAgent: 1 次（UNION ALL 合并 all + clone，或仅 all）
 * 
 * 总计: 4 次（原来 8 次）
 * 
 * @param {string} repoPath - 插件仓库绝对路径
 * @param {number|null} cloneTimeMs - 可选，clone 时间戳
 * @returns {object|null} { allStats, sinceCloneStats } 或 null
 */
function queryTokenStatsOptimized(repoPath, cloneTimeMs = null) {
  if (!dbExists()) return null;

  const dir = sqlEscape(repoPath);
  const hasCloneTime = cloneTimeMs && cloneTimeMs > 0;

  const sessionWhereAll = `directory = '${dir}'`;
  const sessionWhereClone = hasCloneTime
    ? `directory = '${dir}' AND time_created >= ${cloneTimeMs}`
    : sessionWhereAll;

  // ═══════════════════════════════════════════════════════════════
  // 查询 1: Sessions (UNION ALL 合并 all + clone)
  // ═══════════════════════════════════════════════════════════════
  const sessionsSQL = hasCloneTime
    ? `SELECT 'all' as scope, COUNT(*) as total, COALESCE(SUM(CASE WHEN parent_id IS NULL THEN 1 ELSE 0 END), 0) as primary_count, COALESCE(SUM(CASE WHEN parent_id IS NOT NULL THEN 1 ELSE 0 END), 0) as sub_count FROM session WHERE ${sessionWhereAll} UNION ALL SELECT 'clone' as scope, COUNT(*) as total, COALESCE(SUM(CASE WHEN parent_id IS NULL THEN 1 ELSE 0 END), 0) as primary_count, COALESCE(SUM(CASE WHEN parent_id IS NOT NULL THEN 1 ELSE 0 END), 0) as sub_count FROM session WHERE ${sessionWhereClone}`
    : `SELECT 'all' as scope, COUNT(*) as total, COALESCE(SUM(CASE WHEN parent_id IS NULL THEN 1 ELSE 0 END), 0) as primary_count, COALESCE(SUM(CASE WHEN parent_id IS NOT NULL THEN 1 ELSE 0 END), 0) as sub_count FROM session WHERE ${sessionWhereAll}`;

  const sessionsResult = runSQL(sessionsSQL);

  // 解析 sessions 结果
  let sessionsAll = { total: 0, primary_count: 0, sub_count: 0 };
  let sessionsClone = hasCloneTime ? { total: 0, primary_count: 0, sub_count: 0 } : null;

  for (const row of sessionsResult) {
    const data = {
      total: row.total || 0,
      primary_count: row.primary_count || 0,
      sub_count: row.sub_count || 0
    };
    if (row.scope === 'all') sessionsAll = data;
    else if (row.scope === 'clone') sessionsClone = data;
  }

  // ═══════════════════════════════════════════════════════════════
  // 查询 2-4: Message stats
  // ═══════════════════════════════════════════════════════════════
  const sessionSubAll = `(SELECT id FROM session WHERE ${sessionWhereAll})`;
  const sessionSubClone = hasCloneTime
    ? `(SELECT id FROM session WHERE ${sessionWhereClone})`
    : sessionSubAll;

  const { totalsResult, byModelResult, byAgentResult } = queryMessageStatsOptimized(
    sessionSubAll, sessionSubClone, hasCloneTime
  );

  // 解析 totals 结果
  let totalsAll = { interactions: 0, total_tokens: 0, input_tokens: 0, output_tokens: 0, reasoning_tokens: 0, cache_read: 0, cache_write: 0, total_cost: 0 };
  let totalsClone = hasCloneTime ? { interactions: 0, total_tokens: 0, input_tokens: 0, output_tokens: 0, reasoning_tokens: 0, cache_read: 0, cache_write: 0, total_cost: 0 } : null;

  for (const row of totalsResult) {
    const data = {
      interactions: row.interactions || 0,
      total_tokens: row.total_tokens || 0,
      input_tokens: row.input_tokens || 0,
      output_tokens: row.output_tokens || 0,
      reasoning_tokens: row.reasoning_tokens || 0,
      cache_read: row.cache_read || 0,
      cache_write: row.cache_write || 0,
      total_cost: row.total_cost || 0
    };
    if (row.scope === 'all') totalsAll = data;
    else if (row.scope === 'clone') totalsClone = data;
  }

  // 解析 byModel 结果 (only all)
  const byModelAll = byModelResult.map(row => ({
    model: row.model,
    provider: row.provider,
    interactions: row.interactions || 0,
    total_tokens: row.total_tokens || 0,
    input_tokens: row.input_tokens || 0,
    output_tokens: row.output_tokens || 0
  }));

  // 解析 byAgent 结果
  const byAgentAll = [];
  const byAgentClone = [];

  for (const row of byAgentResult) {
    const data = {
      agent: row.agent,
      interactions: row.interactions || 0,
      total_tokens: row.total_tokens || 0,
      input_tokens: row.input_tokens || 0,
      output_tokens: row.output_tokens || 0,
      cache_read: row.cache_read || 0
    };
    if (row.scope === 'all') byAgentAll.push(data);
    else if (row.scope === 'clone') byAgentClone.push(data);
  }

  // 排序
  byModelAll.sort((a, b) => b.total_tokens - a.total_tokens);
  byAgentAll.sort((a, b) => b.total_tokens - a.total_tokens);
  byAgentClone.sort((a, b) => b.total_tokens - a.total_tokens);

  // 构建返回结果
  const allStats = {
    sessions: sessionsAll,
    totals: totalsAll,
    byModel: byModelAll,
    byAgent: byAgentAll
  };

  const sinceCloneStats = hasCloneTime ? {
    sessions: sessionsClone,
    totals: totalsClone,
    byModel: [],
    byAgent: byAgentClone
  } : null;

  return { allStats, sinceCloneStats };
}

/**
 * 兼容旧接口：查询单个时间段的统计（4 次 SQL）
 * @param {string} repoPath - 插件仓库绝对路径
 * @param {number|null} sinceMs - 可选，只统计此时间之后的 session
 * @returns {object|null} 结构化统计或 null
 */
function queryTokenStats(repoPath, sinceMs = null) {
  if (!dbExists()) return null;

  const dir = sqlEscape(repoPath);
  const sw = sinceMs
    ? `directory = '${dir}' AND time_created >= ${sinceMs}`
    : `directory = '${dir}'`;
  const sessionSub = `(SELECT id FROM session WHERE ${sw})`;

  const sessions = runSQL(
    `SELECT COUNT(*) as total, ` +
    `COALESCE(SUM(CASE WHEN parent_id IS NULL THEN 1 ELSE 0 END), 0) as primary_count, ` +
    `COALESCE(SUM(CASE WHEN parent_id IS NOT NULL THEN 1 ELSE 0 END), 0) as sub_count ` +
    `FROM session WHERE ${sw};`
  );

  sessions[0] = sessions[0] || { total: 0, primary_count: 0, sub_count: 0 };
  sessions[0].primary_count = sessions[0].primary_count || 0;
  sessions[0].sub_count = sessions[0].sub_count || 0;

  const msgWhere = `session_id IN ${sessionSub}`;

  const totals = runSQL(
    `SELECT COUNT(*) as interactions, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.reasoning')), 0) as reasoning_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.cache.read')), 0) as cache_read, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.cache.write')), 0) as cache_write, ` +
    `COALESCE(SUM(json_extract(data, '$.cost')), 0) as total_cost ` +
    `FROM message WHERE ${msgWhere};`
  );

  const byModel = runSQL(
    `SELECT json_extract(data, '$.modelID') as model, ` +
    `json_extract(data, '$.providerID') as provider, ` +
    `COUNT(*) as interactions, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens ` +
    `FROM message WHERE ${msgWhere} ` +
    `GROUP BY model, provider ORDER BY total_tokens DESC;`
  );

  const byAgent = runSQL(
    `SELECT json_extract(data, '$.agent') as agent, ` +
    `COUNT(*) as interactions, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.total')), 0) as total_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.input')), 0) as input_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.output')), 0) as output_tokens, ` +
    `COALESCE(SUM(json_extract(data, '$.tokens.cache.read')), 0) as cache_read ` +
    `FROM message WHERE ${msgWhere} ` +
    `GROUP BY agent ORDER BY total_tokens DESC;`
  );

  return {
    sessions: sessions[0],
    totals: totals[0] || { interactions: 0, total_tokens: 0, input_tokens: 0, output_tokens: 0, reasoning_tokens: 0, cache_read: 0, cache_write: 0, total_cost: 0 },
    byModel,
    byAgent
  };
}

// ── Report helpers ──

function fmtNum(n) {
  return Number(n || 0).toLocaleString('en-US');
}

function pctStr(part, whole) {
  if (!whole || whole === 0) return '0.0';
  return ((part / whole) * 100).toFixed(1);
}

/**
 * Render one stats block (reused for both all-time and since-clone sections).
 */
function renderStatsSection(heading, stats, stageSnapshots) {
  const { sessions, totals, byModel, byAgent } = stats;
  let md = '';

  md += `${heading}\n\n`;
  md += `### 总量\n\n`;
  md += `| 指标 | 数值 |\n|------|------|\n`;
  md += `| **总 Session 数** | ${sessions.total}（${sessions.primary_count} 个主 Session + ${sessions.sub_count} 个子 Session） |\n`;
  md += `| **模型交互次数** | **${fmtNum(totals.interactions)} 次** |\n`;
  md += `| **总 Token** | **${fmtNum(totals.total_tokens)}** |\n`;
  md += `| **输入 Token** | ${fmtNum(totals.input_tokens)} |\n`;
  md += `| **输出 Token** | ${fmtNum(totals.output_tokens)} |\n`;
  md += `| **推理 Token** | ${fmtNum(totals.reasoning_tokens)} |\n`;
  md += `| **缓存读取 Token** | ${fmtNum(totals.cache_read)} |\n`;
  md += `| **缓存写入 Token** | ${fmtNum(totals.cache_write)} |\n`;
  md += `| **费用** | $${Number(totals.total_cost || 0).toFixed(4)} |\n\n`;

  if (byModel && byModel.length > 0) {
    md += `### 按模型分布\n\n`;
    md += `| 模型 | Provider | 交互次数 | 总 Token | 输入 Token | 输出 Token |\n`;
    md += `|------|----------|----------|----------|------------|------------|\n`;
    for (const row of byModel) {
      md += `| ${row.model || '-'} | ${row.provider || '-'} | ${fmtNum(row.interactions)} | ${fmtNum(row.total_tokens)}（${pctStr(row.total_tokens, totals.total_tokens)}%） | ${fmtNum(row.input_tokens)} | ${fmtNum(row.output_tokens)} |\n`;
    }
    md += '\n';
  }

  if (byAgent && byAgent.length > 0) {
    md += `### 按 Agent 阶段分布\n\n`;
    md += `| Agent | 交互次数 | 总 Token | 输入 Token | 输出 Token | 缓存读取 |\n`;
    md += `|-------|----------|----------|------------|------------|----------|\n`;
    for (const row of byAgent) {
      md += `| ${row.agent || '-'} | ${fmtNum(row.interactions)} | ${fmtNum(row.total_tokens)} | ${fmtNum(row.input_tokens)} | ${fmtNum(row.output_tokens)} | ${fmtNum(row.cache_read)} |\n`;
    }
    md += '\n';
  }

  if (stageSnapshots && stageSnapshots.length > 0) {
    md += `### 各阶段执行记录\n\n`;
    md += `| 阶段 | 完成时间 | 本阶段交互 | 本阶段 Token | 累计交互 | 累计 Token |\n`;
    md += `|------|----------|------------|-------------|----------|------------|\n`;
    for (const snap of stageSnapshots) {
      const time = snap.timestamp.replace('T', ' ').replace(/\.\d+Z$/, '');
      md += `| ${snap.stageId} | ${time} | ${fmtNum(snap.delta.interactions)} | ${fmtNum(snap.delta.total_tokens)} | ${fmtNum(snap.cumulative.interactions)} | ${fmtNum(snap.cumulative.total_tokens)} |\n`;
    }
    md += '\n';
  }

  return md;
}

/**
 * Generate a full Markdown report with both all-time and since-clone sections.
 */
function generateReport(allStats, sinceCloneStats, pluginName, stageSnapshots, cloneTime) {
  let md = `# ${pluginName} — Token 消耗统计报告\n\n`;
  md += `> 生成时间: ${new Date().toISOString()}\n`;
  if (cloneTime) md += `> Clone 时间: ${cloneTime}\n`;
  md += '\n';

  if (sinceCloneStats && sinceCloneStats.totals.interactions > 0) {
    md += renderStatsSection('## 本轮统计（自 clone 起）', sinceCloneStats, stageSnapshots);
    md += '---\n\n';
    md += renderStatsSection('## 历史汇总（全部数据）', allStats, null);
  } else {
    md += renderStatsSection('## 总体统计', allStats, stageSnapshots);
  }

  return md;
}

// ── Main collect & save ──

/**
 * Collect token stats from OpenCode DB (optimized: 4 SQL queries instead of 8).
 *
 * @param {string} repoPath - absolute path to plugin repo
 * @param {string} stageId - the stage that just completed (prefix with _ to skip snapshot)
 * @param {string} pluginName - plugin name for report title
 * @param {object} [opts] - optional settings
 * @param {number} [opts.cloneTimeMs] - epoch ms of clone time, enables since-clone filtering
 * @param {string} [opts.cloneTimeIso] - ISO string of clone time for display
 * @returns {object|null} { allStats, sinceCloneStats, snapshot } or null on failure
 */
function collectAndSaveTokenStats(repoPath, stageId, pluginName, opts = {}) {
  if (!dbExists()) return null;

  try {
    const adaptDir = path.join(repoPath, getActiveProfile().ADAPTATION_DIR);
    if (!fsSync.existsSync(adaptDir)) {
      fsSync.mkdirSync(adaptDir, { recursive: true });
    }

    const statsPath = path.join(adaptDir, 'token-stats.json');
    const reportPath = path.join(adaptDir, 'token-stats-report.md');

    let existing = { snapshots: [] };
    if (fsSync.existsSync(statsPath)) {
      try { existing = JSON.parse(fsSync.readFileSync(statsPath, 'utf8')); } catch {}
    }
    if (!Array.isArray(existing.snapshots)) existing.snapshots = [];

    const cloneTimeMs = opts.cloneTimeMs || existing.cloneTimeMs || null;
    const cloneTimeIso = opts.cloneTimeIso || existing.cloneTimeIso || null;

    // 使用优化版查询（4 次 SQL，原来是 8 次）
    const result = queryTokenStatsOptimized(repoPath, cloneTimeMs);
    if (!result) return null;

    const { allStats, sinceCloneStats } = result;

    // Compute delta for stage snapshot
    const refTotals = sinceCloneStats ? sinceCloneStats.totals : allStats.totals;
    const prevCumulative = existing.snapshots.length > 0
      ? existing.snapshots[existing.snapshots.length - 1].cumulative
      : { interactions: 0, total_tokens: 0, input_tokens: 0, output_tokens: 0 };

    const delta = {
      interactions: refTotals.interactions - prevCumulative.interactions,
      total_tokens: refTotals.total_tokens - prevCumulative.total_tokens,
      input_tokens: refTotals.input_tokens - prevCumulative.input_tokens,
      output_tokens: refTotals.output_tokens - prevCumulative.output_tokens
    };

    const isManual = stageId.startsWith('_');

    let snapshot = null;
    if (!isManual) {
      snapshot = {
        stageId,
        timestamp: new Date().toISOString(),
        cumulative: {
          interactions: refTotals.interactions,
          total_tokens: refTotals.total_tokens,
          input_tokens: refTotals.input_tokens,
          output_tokens: refTotals.output_tokens
        },
        delta
      };
      existing.snapshots.push(snapshot);
    }

    existing.latest = allStats;
    existing.latestSinceClone = sinceCloneStats;
    if (cloneTimeMs) existing.cloneTimeMs = cloneTimeMs;
    if (cloneTimeIso) existing.cloneTimeIso = cloneTimeIso;

    fsSync.writeFileSync(statsPath, JSON.stringify(existing, null, 2), 'utf8');

    const report = generateReport(allStats, sinceCloneStats, pluginName, existing.snapshots, cloneTimeIso);
    fsSync.writeFileSync(reportPath, report, 'utf8');

    return { allStats, sinceCloneStats, snapshot };
  } catch (err) {
    console.error(`[token-stats-db] 统计失败: ${err.message}`);
    return null;
  }
}

module.exports = { queryTokenStats, queryTokenStatsOptimized, collectAndSaveTokenStats, getDbPath, dbExists };