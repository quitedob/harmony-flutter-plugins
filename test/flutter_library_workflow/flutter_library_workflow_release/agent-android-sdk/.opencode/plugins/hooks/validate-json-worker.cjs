/**
 * JSON Schema validation worker script.
 * Called by validate-on-write.cjs.
 *
 * Usage: node validate-json-worker.cjs <file_path> <schema_key> <workspace_root>
 *
 * schema_key: sdk-analysis | sdk-planning | sdk-implementation | sdk-har-demo | sdk-evaluation
 */

const fs = require("fs");
const path = require("path");

const STAGE_SCHEMA_MAP = {
  "sdk-analysis": "01-analysis.schema.json",
  "sdk-planning": "02-planning.schema.json",
  "sdk-implementation": "03-implementation.schema.json",
  "sdk-har-demo": "04-har-demo.schema.json",
  "sdk-evaluation": "05-evaluation.schema.json",
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

  const schemaPath = path.join(
    workspaceRoot,
    ".opencode",
    "schema",
    "json-schema",
    schemaFile,
  );
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

  // Resolve ajv from .opencode/node_modules (local dependency)
  const opencodeNodeModules = path.join(
    workspaceRoot,
    ".opencode",
    "node_modules",
  );
  const ajvPath = path.join(opencodeNodeModules, "ajv", "dist", "2020.js");
  const ajvFormatsPath = path.join(opencodeNodeModules, "ajv-formats");

  let Ajv2020, addFormats;
  try {
    Ajv2020 = require(ajvPath);
    addFormats = require(ajvFormatsPath);
  } catch (e) {
    console.log(
      JSON.stringify({
        valid: false,
        error: `无法加载 ajv 校验库: ${e.message}。请在 .opencode/ 目录下执行 bun install 或 npm install`,
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
