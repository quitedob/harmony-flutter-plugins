import type { Plugin } from "@opencode-ai/plugin"
import path from "path"

const ADAPTATION_FILES = new Set([
  "01-analysis.json",
  "02-planning.json",
  "03-coding-library.json",
  "04-testing.json",
  "04-coding-example.json",
  "05-summary.json",
  "plugins.json",
])

function resolveWrittenPath(
  args: Record<string, unknown> | undefined,
  metadata: unknown,
): string | undefined {
  const meta =
    metadata && typeof metadata === "object"
      ? (metadata as Record<string, unknown>)
      : undefined
  const fromArgs = args && typeof args === "object" ? args : undefined
  const candidates = [
    fromArgs?.filePath,
    fromArgs?.file_path,
    fromArgs?.path,
    fromArgs?.target_file,
    meta?.filePath,
    meta?.file_path,
    meta?.path,
  ]
  for (const v of candidates) {
    if (typeof v === "string" && v.length > 0) return v
  }
  return undefined
}

/**
 * Auto-validates JSON stage artifacts after write/edit operations.
 * Calls the shared validate-on-write.cjs hook script and appends
 * the validation result to the tool output visible to the agent.
 */
export const ValidateOnWrite: Plugin = async ({ worktree, $ }) => {
  const hookScript = path.join(
    worktree,
    ".claude",
    "skills",
    "tool-schema-validation",
    "scripts",
    "validate-on-write.cjs",
  )

  return {
    "tool.execute.after": async (input, output) => {
      const tool = input.tool
      if (tool !== "write" && tool !== "edit") return

      const filePath = resolveWrittenPath(input.args, output.metadata)
      if (!filePath) return

      const basename = path.basename(filePath)
      if (!ADAPTATION_FILES.has(basename)) return

      if (!filePath.includes(".rn-ohos-adaptation") && basename !== "plugins.json")
        return

      const absolutePath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(worktree, filePath)

      try {
        const result =
          await $`node ${hookScript} ${absolutePath} ${worktree}`.text()
        if (result.trim()) {
          if (typeof output.output === "string") {
            output.output += "\n" + result
          } else if (output.metadata && typeof output.metadata === "object") {
            ;(output.metadata as Record<string, unknown>).validation = result
          }
        }
      } catch {
        // Validation script error — don't block the write
      }
    },
  }
}
