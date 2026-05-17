#!/usr/bin/env node
/**
 * Unified validation hook for JSON stage artifacts.
 * Shared entry point for both Claude Code (PostToolUse hook) and OpenCode (plugin).
 *
 * Invocation modes:
 *   1. CLI args:  node validate-on-write.cjs <file_path> <workspace_root>
 *   2. Stdin JSON: pipe Claude Code PostToolUse event JSON (reads tool_input.file_path + cwd)
 *
 * Behavior:
 *   - Detects if the written file is a stage artifact in .rn-ohos-adaptation/
 *   - Runs JSON Schema validation via validate-json-worker.cjs
 *   - For 05-summary.json, also runs cross-stage pipeline validation
 *   - Outputs human-readable results to stdout (shown to the AI agent)
 *   - Always exits 0 to avoid blocking the write operation
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SCHEMA_MAP = {
  "01-analysis.json": "analysis",
  "02-planning.json": "planning",
  "03-coding-library.json": "coding-library",
  "04-testing.json": "testing",
  "04-coding-example.json": "testing",
  "05-summary.json": "summary",
  "plugins.json": "plugins",
};

function resolveInputFromArgs() {
  if (process.argv.length >= 4) {
    return {
      filePath: process.argv[2],
      workspaceRoot: process.argv[3],
    };
  }
  return null;
}

function resolveInputFromStdin(stdinData) {
  try {
    const input = JSON.parse(stdinData);
    const filePath =
      input.tool_input?.file_path ||
      input.tool_input?.path ||
      input.tool_input?.filePath;
    const workspaceRoot = input.cwd || process.cwd();
    return filePath ? { filePath, workspaceRoot } : null;
  } catch {
    return null;
  }
}

function formatJsonValidation(result) {
  let parsed;
  try {
    parsed = JSON.parse(result);
  } catch {
    return result.trim();
  }

  if (parsed.valid) {
    return `✅ ${parsed.message}`;
  }

  let output = `❌ ${parsed.message || parsed.error}`;
  if (parsed.errors && parsed.errors.length > 0) {
    output += "\n\n需要修复的问题:";
    for (const err of parsed.errors) {
      output += `\n  - 路径 \`${err.path}\`: ${err.message} (${err.keyword})`;
    }
    output += "\n\n请根据以上错误修改 JSON 文件后重新写入。";
  }
  return output;
}

function formatPipelineValidation(result) {
  let parsed;
  try {
    parsed = JSON.parse(result);
  } catch {
    return result.trim();
  }

  let output = parsed.valid
    ? `✅ ${parsed.message}`
    : `❌ ${parsed.message || parsed.error}`;

  for (const check of parsed.checks || []) {
    const icon =
      { pass: "✅", warning: "⚠️", fail: "❌", skip: "⏭️" }[check.status] ||
      "❓";
    output += `\n  ${icon} ${check.name}: ${check.details}`;
  }

  if (!parsed.valid) {
    output +=
      "\n\n请根据以上错误检查各阶段产物间的数据一致性，修复后重新写入。";
  }
  return output;
}

function runWorker(scriptPath, args) {
  try {
    return execSync(
      `node "${scriptPath}" ${args.map((a) => `"${a}"`).join(" ")}`,
      { encoding: "utf8", timeout: 30000 },
    );
  } catch (e) {
    return JSON.stringify({
      valid: false,
      error: `校验脚本执行失败: ${e.message}`,
      errors: [],
    });
  }
}

async function main() {
  let input = resolveInputFromArgs();

  if (!input) {
    let stdinData = "";
    if (!process.stdin.isTTY) {
      try {
        stdinData = fs.readFileSync(0, "utf8");
      } catch {
        // no stdin
      }
    }
    if (stdinData) {
      input = resolveInputFromStdin(stdinData);
    }
  }

  if (!input || !input.filePath) {
    process.exit(0);
  }

  const { filePath, workspaceRoot } = input;
  const basename = path.basename(filePath);
  const schemaKey = SCHEMA_MAP[basename];

  if (!schemaKey) {
    process.exit(0);
  }

  if (!filePath.includes(".rn-ohos-adaptation") && !filePath.includes(".ohos-adaptation") && basename !== "plugins.json") {
    process.exit(0);
  }

  const absoluteFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(workspaceRoot, filePath);

  if (!fs.existsSync(absoluteFilePath)) {
    process.exit(0);
  }

  const scriptsDir = __dirname;
  const jsonWorker = path.join(scriptsDir, "validate-json-worker.cjs");

  if (!fs.existsSync(jsonWorker)) {
    console.log(`⚠️ 校验脚本不存在: ${jsonWorker}`);
    process.exit(0);
  }

  console.log(`\n🔍 自动校验: ${basename}`);

  const jsonResult = runWorker(jsonWorker, [
    absoluteFilePath,
    schemaKey,
    workspaceRoot,
  ]);
  console.log(formatJsonValidation(jsonResult));

  if (basename === "05-summary.json") {
    const pipelineWorker = path.join(scriptsDir, "validate-pipeline-worker.cjs");
    if (fs.existsSync(pipelineWorker)) {
      const adaptDir = path.dirname(absoluteFilePath);
      console.log("\n🔍 跨阶段一致性校验:");
      const pipelineResult = runWorker(pipelineWorker, [adaptDir]);
      console.log(formatPipelineValidation(pipelineResult));
    }
  }
}

main().catch(() => process.exit(0));
