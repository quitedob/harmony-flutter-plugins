/**
 * Cross-stage pipeline consistency validator.
 * Checks data consistency between stage outputs (01~05).
 *
 * Usage: node validate-pipeline-worker.cjs <adaptation_dir>
 *
 * adaptation_dir: absolute path to .rn-ohos-adaptation/ directory
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

function main() {
  const [, , adaptDir] = process.argv;

  if (!adaptDir) {
    console.log(
      JSON.stringify({
        valid: false,
        error: "用法: node validate-pipeline-worker.cjs <adaptation_dir>",
        checks: [],
      }),
    );
    process.exit(0);
  }

  const analysis = loadJSON(path.join(adaptDir, "01-analysis.json"));
  const planning = loadJSON(path.join(adaptDir, "02-planning.json"));
  const codingLib = loadJSON(path.join(adaptDir, "03-coding-library.json"));
  const codingExample = loadJSON(path.join(adaptDir, "04-testing.json"))
    || loadJSON(path.join(adaptDir, "04-coding-example.json"));
  const summary = loadJSON(path.join(adaptDir, "05-summary.json"));

  const checks = [];

  function addCheck(name, status, details) {
    checks.push({ name, status, details });
  }

  // Check 1: TurboModule/Component names in 03 must exist in 01
  if (analysis && codingLib) {
    const analysisModuleNames = new Set(
      (analysis.native_modules || []).map((m) => m.name),
    );
    const libModuleNames = new Set(
      (codingLib.implemented_methods || [])
        .concat(codingLib.not_implemented || [])
        .map((m) => m.channel),
    );
    const unknownModules = [...libModuleNames].filter(
      (m) => !analysisModuleNames.has(m),
    );
    if (unknownModules.length === 0) {
      addCheck(
        "module_name_consistency",
        "pass",
        "03 中所有 TurboModule/组件名称都在 01 的 native_modules 列表中",
      );
    } else {
      addCheck(
        "module_name_consistency",
        "fail",
        `03 中引用了 01 未定义的 TurboModule/组件: ${unknownModules.join(", ")}`,
      );
    }
  } else {
    addCheck(
      "module_name_consistency",
      "skip",
      `缺少必要产物: ${!analysis ? "01-analysis.json" : ""} ${!codingLib ? "03-coding-library.json" : ""}`.trim(),
    );
  }

  // Check 2: target_module_types consistency between 02 and 03
  if (planning && codingLib) {
    const planTypes = planning.target_module_types || [];
    const libTypes = codingLib.target_module_types || [];
    const planTypesStr = planTypes.sort().join(",");
    const libTypesStr = libTypes.sort().join(",");
    if (planTypesStr === libTypesStr) {
      addCheck(
        "target_module_types_consistency",
        "pass",
        `02 和 03 使用相同的 target_module_types: [${planTypesStr}]`,
      );
    } else {
      addCheck(
        "target_module_types_consistency",
        "warning",
        `02 规划 target_module_types [${planTypesStr}] 与 03 实际使用 [${libTypesStr}] 不一致`,
      );
    }
  } else {
    addCheck(
      "target_module_types_consistency",
      "skip",
      `缺少必要产物: ${!planning ? "02-planning.json" : ""} ${!codingLib ? "03-coding-library.json" : ""}`.trim(),
    );
  }

  // Check 3: build_status propagation from 03 to 05
  if (codingLib && summary) {
    if (codingLib.build_status === summary.build_status) {
      addCheck(
        "build_status_propagation",
        "pass",
        `05 的 build_status (${summary.build_status}) 与 03 一致`,
      );
    } else {
      addCheck(
        "build_status_propagation",
        "fail",
        `05 的 build_status "${summary.build_status}" 与 03 的 "${codingLib.build_status}" 不一致`,
      );
    }
  } else {
    addCheck(
      "build_status_propagation",
      "skip",
      `缺少必要产物: ${!codingLib ? "03-coding-library.json" : ""} ${!summary ? "05-summary.json" : ""}`.trim(),
    );
  }

  // Check 4: example_status propagation from 04 to 05
  if (codingExample && summary) {
    const expected = codingExample.example_build_status;
    const actual = summary.example_status;
    if (expected === actual) {
      addCheck(
        "example_status_propagation",
        "pass",
        `05 的 example_status (${actual}) 与 04 一致`,
      );
    } else if (actual === "unknown") {
      addCheck(
        "example_status_propagation",
        "warning",
        `05 标记 example_status 为 unknown，但 04 产物存在且值为 "${expected}"`,
      );
    } else {
      addCheck(
        "example_status_propagation",
        "fail",
        `05 的 example_status "${actual}" 与 04 的 "${expected}" 不一致`,
      );
    }
  } else if (!codingExample && summary) {
    if (summary.example_status === "unknown") {
      addCheck(
        "example_status_propagation",
        "pass",
        "04 缺失，05 正确标记 example_status 为 unknown",
      );
    } else if (summary.example_status === "skip") {
      addCheck(
        "example_status_propagation",
        "pass",
        "04 缺失，05 标记 example_status 为 skip",
      );
    } else {
      addCheck(
        "example_status_propagation",
        "fail",
        `04 缺失但 05 的 example_status 为 "${summary.example_status}"（应为 unknown 或 skip）`,
      );
    }
  } else {
    addCheck("example_status_propagation", "skip", "缺少 05-summary.json");
  }

  // Check 5: coverage math consistency in 05
  if (codingLib && summary && summary.coverage) {
    const libImpl = (codingLib.implemented_methods || []).length;
    const libNotImpl = (codingLib.not_implemented || []).length;
    const libTotal = libImpl + libNotImpl;
    const sumTotal = summary.coverage.total_methods;
    const sumImpl = summary.coverage.implemented;
    const sumNotImpl = summary.coverage.not_implemented;

    const issues = [];
    if (sumTotal !== libTotal) {
      issues.push(
        `total_methods: 05 报 ${sumTotal}，03 计算为 ${libTotal}`,
      );
    }
    if (sumImpl !== libImpl) {
      issues.push(
        `implemented: 05 报 ${sumImpl}，03 有 ${libImpl} 个`,
      );
    }
    if (sumNotImpl !== libNotImpl) {
      issues.push(
        `not_implemented: 05 报 ${sumNotImpl}，03 有 ${libNotImpl} 个`,
      );
    }

    if (issues.length === 0) {
      addCheck(
        "coverage_math_consistency",
        "pass",
        `05 覆盖率数据与 03 一致: ${libImpl}/${libTotal}`,
      );
    } else {
      addCheck(
        "coverage_math_consistency",
        "fail",
        `覆盖率数据不一致: ${issues.join("; ")}`,
      );
    }
  } else {
    addCheck(
      "coverage_math_consistency",
      "skip",
      `缺少必要产物: ${!codingLib ? "03-coding-library.json" : ""} ${!summary ? "05-summary.json 或 coverage 字段" : ""}`.trim(),
    );
  }

  // Check 6: runtime_check_summary consistency in 05
  if (codingExample && summary && summary.runtime_check_summary) {
    const rtChecks = codingExample.runtime_checks || [];
    const rtSum = summary.runtime_check_summary;
    const actualPass = rtChecks.filter((r) => r.status === "pass").length;
    const actualWarn = rtChecks.filter((r) => r.status === "warning").length;
    const actualFail = rtChecks.filter((r) => r.status === "fail").length;

    const issues = [];
    if (rtSum.total !== rtChecks.length)
      issues.push(`total: 05 报 ${rtSum.total}，04 有 ${rtChecks.length} 项`);
    if (rtSum.pass !== actualPass)
      issues.push(`pass: 05 报 ${rtSum.pass}，04 有 ${actualPass} 项`);
    if (rtSum.warning !== actualWarn)
      issues.push(
        `warning: 05 报 ${rtSum.warning}，04 有 ${actualWarn} 项`,
      );
    if (rtSum.fail !== actualFail)
      issues.push(`fail: 05 报 ${rtSum.fail}，04 有 ${actualFail} 项`);

    if (issues.length === 0) {
      addCheck(
        "runtime_check_summary_consistency",
        "pass",
        "05 的运行态检测统计与 04 一致",
      );
    } else {
      addCheck(
        "runtime_check_summary_consistency",
        "fail",
        `运行态检测统计不一致: ${issues.join("; ")}`,
      );
    }
  } else {
    addCheck(
      "runtime_check_summary_consistency",
      "skip",
      "缺少 04 runtime_checks 或 05 runtime_check_summary",
    );
  }

  // Check 7: device_test_summary consistency between 04 and 05
  if (codingExample && summary && summary.device_test_summary) {
    const dtStatus = codingExample.device_test_status;
    const dtSumStatus = summary.device_test_summary.status;
    if (!dtStatus && dtSumStatus === "unknown") {
      addCheck(
        "device_test_summary_consistency",
        "pass",
        "04 无 device_test_status，05 正确标记为 unknown",
      );
    } else if (dtStatus === dtSumStatus) {
      addCheck(
        "device_test_summary_consistency",
        "pass",
        `05 的 device_test_summary.status (${dtSumStatus}) 与 04 一致`,
      );
    } else {
      addCheck(
        "device_test_summary_consistency",
        "fail",
        `05 的 device_test_summary.status "${dtSumStatus}" 与 04 的 device_test_status "${dtStatus}" 不一致`,
      );
    }

    if (dtStatus && dtStatus !== "skipped" && codingExample.device_test_results) {
      const dtResults = codingExample.device_test_results || [];
      const dtPassCount = dtResults.filter((r) => r.result === "pass").length;
      const dtSum = summary.device_test_summary;
      if (dtSum.pass_count !== undefined && dtSum.pass_count !== dtPassCount) {
        addCheck(
          "device_test_count_consistency",
          "fail",
          `05 的 device_test_summary.pass_count (${dtSum.pass_count}) 与 04 实际 pass 数 (${dtPassCount}) 不一致`,
        );
      } else {
        addCheck(
          "device_test_count_consistency",
          "pass",
          "05 的设备验证通过数与 04 一致",
        );
      }
    } else {
      addCheck(
        "device_test_count_consistency",
        "skip",
        "设备验证未执行或跳过",
      );
    }
  } else if (!codingExample && summary && summary.device_test_summary) {
    if (
      summary.device_test_summary.status === "unknown" ||
      summary.device_test_summary.status === "skipped"
    ) {
      addCheck(
        "device_test_summary_consistency",
        "pass",
        "04 缺失，05 设备验证状态为 unknown/skipped",
      );
    } else {
      addCheck(
        "device_test_summary_consistency",
        "fail",
        `04 缺失但 05 的 device_test_summary.status 为 "${summary.device_test_summary.status}"`,
      );
    }
  } else {
    addCheck(
      "device_test_summary_consistency",
      "skip",
      "缺少 05 device_test_summary 或 04 产物",
    );
  }

  // Check 8: quality_score vs actual data consistency
  if (summary && codingLib) {
    const impl = (codingLib.implemented_methods || []).length;
    const total =
      impl + (codingLib.not_implemented || []).length;
    const coverageRate = total > 0 ? impl / total : 0;
    const buildPass = codingLib.build_status === "pass";
    const score = summary.quality_score;

    const issues = [];
    if (score === "A" || score === "B") {
      if (!buildPass)
        issues.push(`评分 ${score} 但 build_status 为 fail`);
      if (score === "A" && coverageRate < 1.0)
        issues.push(
          `评分 A 但覆盖率 ${(coverageRate * 100).toFixed(0)}% < 100%`,
        );
      if (score === "B" && coverageRate < 0.8)
        issues.push(
          `评分 B 但覆盖率 ${(coverageRate * 100).toFixed(0)}% < 80%`,
        );
    }
    if (score === "D" && buildPass && coverageRate >= 0.5) {
      issues.push(
        `评分 D 但 build_status=pass 且覆盖率 ${(coverageRate * 100).toFixed(0)}% >= 50%`,
      );
    }

    if (issues.length === 0) {
      addCheck(
        "quality_score_consistency",
        "pass",
        `评分 ${score} 与实际数据一致`,
      );
    } else {
      addCheck(
        "quality_score_consistency",
        "fail",
        `评分与数据矛盾: ${issues.join("; ")}`,
      );
    }
  } else {
    addCheck(
      "quality_score_consistency",
      "skip",
      "缺少 03 或 05 产物",
    );
  }

  const failCount = checks.filter((c) => c.status === "fail").length;
  const warnCount = checks.filter((c) => c.status === "warning").length;
  const passCount = checks.filter((c) => c.status === "pass").length;
  const skipCount = checks.filter((c) => c.status === "skip").length;

  console.log(
    JSON.stringify({
      valid: failCount === 0,
      message:
        failCount === 0
          ? `流水线一致性校验通过 (${passCount} pass, ${warnCount} warning, ${skipCount} skip)`
          : `流水线一致性校验未通过: ${failCount} 个错误`,
      summary: {
        total: checks.length,
        pass: passCount,
        warning: warnCount,
        fail: failCount,
        skip: skipCount,
      },
      checks,
    }),
  );
}

main();
