#!/usr/bin/env node
/**
 * Cross-stage pipeline consistency validator for Android SDK → HarmonyOS HAR.
 *
 * Follows the Markdown-first flow:
 *   01: analysis marker + PRD/work_unit_prd
 *   02: planning marker + work_unit_plan
 *   03: HAR implementation marker/report
 *   04: HAR Demo marker/report
 *   05: evaluation marker/report
 */

const fs = require("fs");
const path = require("path");

function loadJSON(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function exists(adaptDir, relativePath) {
  return Boolean(relativePath) && fs.existsSync(path.join(adaptDir, relativePath));
}

function main() {
  const [, , adaptDir] = process.argv;

  if (!adaptDir) {
    console.log(JSON.stringify({
      valid: false,
      error: "用法: node validate-pipeline-worker.cjs <adaptation_dir>",
      checks: [],
    }));
    process.exit(0);
  }

  const analysis = loadJSON(path.join(adaptDir, "01-analysis.json"));
  const planning = loadJSON(path.join(adaptDir, "02-planning.json"));
  const implementation = loadJSON(path.join(adaptDir, "03-implementation.json"));
  const harDemo = loadJSON(path.join(adaptDir, "04-har-demo.json"));
  const evaluation = loadJSON(path.join(adaptDir, "05-evaluation.json"));

  const checks = [];
  const addCheck = (name, status, details) => checks.push({ name, status, details });

  if (analysis) {
    addCheck(
      "analysis_prd_exists",
      exists(adaptDir, analysis.prd_path || "01-analysis-prd.md") ? "pass" : "fail",
      "01 总 PRD 文件存在"
    );
    addCheck(
      "work_unit_prd_index_exists",
      exists(adaptDir, analysis.work_unit_prd_index_path || "work_unit_prd/index.md") ? "pass" : "fail",
      "01 模块 PRD 索引存在"
    );
  } else {
    addCheck("analysis_prd_exists", "skip", "缺少 01-analysis.json");
    addCheck("work_unit_prd_index_exists", "skip", "缺少 01-analysis.json");
  }

  if (analysis && planning) {
    addCheck(
      "sdk_name_01_02",
      analysis.sdk_name === planning.sdk_name ? "pass" : "fail",
      `01 sdk_name="${analysis.sdk_name}"，02 sdk_name="${planning.sdk_name}"`
    );
    addCheck(
      "work_unit_plan_index_exists",
      exists(adaptDir, planning.work_unit_plan_index_path || "work_unit_plan/index.md") ? "pass" : "fail",
      "02 Work Unit 编码计划索引存在"
    );
    addCheck(
      "work_unit_count_present",
      Number.isInteger(planning.work_unit_count) && planning.work_unit_count >= 0 ? "pass" : "fail",
      `02 work_unit_count=${planning.work_unit_count}`
    );
  } else {
    addCheck("sdk_name_01_02", "skip", "缺少 01 或 02 产物");
    addCheck("work_unit_plan_index_exists", "skip", "缺少 02-planning.json");
    addCheck("work_unit_count_present", "skip", "缺少 02-planning.json");
  }

  if (analysis && implementation) {
    addCheck(
      "sdk_name_01_03",
      analysis.sdk_name === implementation.sdk_name ? "pass" : "fail",
      `01 sdk_name="${analysis.sdk_name}"，03 sdk_name="${implementation.sdk_name}"`
    );
  } else {
    addCheck("sdk_name_01_03", "skip", "缺少 01 或 03 产物");
  }

  if (implementation) {
    addCheck(
      "harmony_har_deliverable",
      implementation.artifact_type === "har" && implementation.primary_language === "arkts" ? "pass" : "fail",
      `03 artifact_type="${implementation.artifact_type}" primary_language="${implementation.primary_language}"`
    );
    addCheck(
      "implementation_build_status",
      ["pass", "warning", "fail"].includes(implementation.build_status) ? "pass" : "fail",
      `03 build_status="${implementation.build_status}"`
    );
  } else {
    addCheck("harmony_har_deliverable", "skip", "缺少 03-implementation.json");
    addCheck("implementation_build_status", "skip", "缺少 03-implementation.json");
  }

  if (implementation && harDemo) {
    addCheck(
      "sdk_name_03_04",
      implementation.sdk_name === harDemo.sdk_name ? "pass" : "fail",
      `03 sdk_name="${implementation.sdk_name}"，04 sdk_name="${harDemo.sdk_name}"`
    );
    addCheck(
      "har_path_03_04",
      implementation.har_module_relative_path === harDemo.har_module_relative_path ? "pass" : "fail",
      `03 HAR="${implementation.har_module_relative_path}"，04 HAR="${harDemo.har_module_relative_path}"`
    );
    addCheck(
      "demo_build_status",
      ["pass", "warning", "fail"].includes(harDemo.demo_build_status) ? "pass" : "fail",
      `04 demo_build_status="${harDemo.demo_build_status}"`
    );
  } else {
    addCheck("sdk_name_03_04", "skip", "缺少 03 或 04 产物");
    addCheck("har_path_03_04", "skip", "缺少 03 或 04 产物");
    addCheck("demo_build_status", "skip", "缺少 04-har-demo.json");
  }

  if (analysis && evaluation) {
    addCheck(
      "sdk_name_01_05",
      analysis.sdk_name === evaluation.sdk_name ? "pass" : "fail",
      `01 sdk_name="${analysis.sdk_name}"，05 sdk_name="${evaluation.sdk_name}"`
    );
    addCheck(
      "evaluation_report_exists",
      exists(adaptDir, evaluation.report_path || "05-evaluation-report.md") ? "pass" : "fail",
      "05 评估报告存在"
    );
  } else {
    addCheck("sdk_name_01_05", "skip", "缺少 01 或 05 产物");
    addCheck("evaluation_report_exists", "skip", "缺少 05-evaluation.json");
  }

  if (implementation && evaluation) {
    const implFail = implementation.build_status === "fail";
    const demoFail = harDemo?.demo_build_status === "fail";
    if ((implFail || demoFail) && evaluation.status === "success") {
      addCheck(
        "status_reasonability",
        "warning",
        `05 为 success 但 03 build_status=${implementation.build_status}，04 demo_build_status=${harDemo?.demo_build_status ?? "n/a"}`
      );
    } else {
      addCheck("status_reasonability", "pass", "05 状态与 03/04 构建结果未明显冲突");
    }
  } else {
    addCheck("status_reasonability", "skip", "缺少 03 或 05 产物");
  }

  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warning").length;
  const passCount = checks.filter((c) => c.status === "pass").length;
  const skipCount = checks.filter((c) => c.status === "skip").length;

  console.log(JSON.stringify({
    valid: failCount === 0,
    message: failCount === 0
      ? `SDK 流水线一致性校验通过 (${passCount} pass, ${warnCount} warning, ${skipCount} skip)`
      : `SDK 流水线一致性校验未通过: ${failCount} 个错误`,
    summary: {
      total: checks.length,
      pass: passCount,
      warning: warnCount,
      fail: failCount,
      skip: skipCount,
    },
    checks,
  }));
}

main();
