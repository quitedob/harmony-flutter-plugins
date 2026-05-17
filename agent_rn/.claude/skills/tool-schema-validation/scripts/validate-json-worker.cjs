/**
 * JSON Schema validation worker script.
 * Called by the validate-json OpenCode custom tool.
 *
 * Usage: node validate-json-worker.cjs <file_path> <schema_key> <workspace_root>
 *
 * schema_key: analysis | planning | coding-library | testing | coding-example (legacy) | summary | plugins
 */

const fs = require("fs");
const path = require("path");

const STAGE_SCHEMA_MAP = {
  analysis: "01-analysis.schema.json",
  planning: "02-planning.schema.json",
  "coding-library": "03-coding-library.schema.json",
  "testing": "04-testing.schema.json",
  "coding-example": "04-testing.schema.json",
  summary: "05-summary.schema.json",
  plugins: "plugins.schema.json",
};

function main() {
  const [, , filePath, schemaKey, workspaceRoot] = process.argv;

  if (!filePath || !schemaKey || !workspaceRoot) {
    console.log(
      JSON.stringify({
        valid: false,
        error: `用法: node validate-json-worker.cjs <file_path> <schema_key> <workspace_root>\n可用 schema_key: ${Object.keys(STAGE_SCHEMA_MAP).join(", ")}`,
        errors: [],
      }),
    );
    process.exit(0);
  }

  const schemaFile = STAGE_SCHEMA_MAP[schemaKey];
  if (!schemaFile) {
    console.log(
      JSON.stringify({
        valid: false,
        error: `未知的 schema_key: "${schemaKey}"。可用值: ${Object.keys(STAGE_SCHEMA_MAP).join(", ")}`,
        errors: [],
      }),
    );
    process.exit(0);
  }

  const absoluteFilePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(workspaceRoot, filePath);
  if (!fs.existsSync(absoluteFilePath)) {
    console.log(
      JSON.stringify({
        valid: false,
        error: `文件不存在: ${absoluteFilePath}`,
        errors: [],
      }),
    );
    process.exit(0);
  }

  let data;
  try {
    const content = fs.readFileSync(absoluteFilePath, "utf8");
    data = JSON.parse(content);
  } catch (e) {
    console.log(
      JSON.stringify({
        valid: false,
        error: `JSON 解析失败: ${e.message}`,
        errors: [],
      }),
    );
    process.exit(0);
  }

  const skillDir = path.join(__dirname, "..");
  const schemaPath = path.join(skillDir, "json-schema", schemaFile);
  if (!fs.existsSync(schemaPath)) {
    console.log(
      JSON.stringify({
        valid: false,
        error: `Schema 文件不存在: ${schemaPath}`,
        errors: [],
      }),
    );
    process.exit(0);
  }

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  } catch (e) {
    console.log(
      JSON.stringify({
        valid: false,
        error: `Schema 文件解析失败: ${e.message}`,
        errors: [],
      }),
    );
    process.exit(0);
  }

  const skillNodeModules = path.join(skillDir, "node_modules");
  const ajvPath = path.join(skillNodeModules, "ajv", "dist", "2020.js");
  const ajvFormatsPath = path.join(skillNodeModules, "ajv-formats");

  let Ajv2020, addFormats;
  try {
    Ajv2020 = require(ajvPath);
    addFormats = require(ajvFormatsPath);
  } catch (e) {
    console.log(
      JSON.stringify({
        valid: false,
        error: `无法加载 ajv 校验库: ${e.message}。请在 .claude/skills/tool-schema-validation/ 目录下执行 npm install`,
        errors: [],
      }),
    );
    process.exit(0);
  }

  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);

  const validator = ajv.compile(schema);
  const valid = validator(data);

  if (valid) {
    console.log(
      JSON.stringify({
        valid: true,
        errors: [],
        message: `校验通过: ${path.basename(absoluteFilePath)} 完全符合 ${schemaFile} 定义`,
      }),
    );
  } else {
    const errors = validator.errors.map((e) => ({
      path: e.instancePath || "/",
      message: e.message,
      keyword: e.keyword,
      schemaPath: e.schemaPath,
    }));
    console.log(
      JSON.stringify({
        valid: false,
        errors,
        message: `校验未通过: ${errors.length} 个问题`,
      }),
    );
  }
}

main();
