import type { sdk } from "@opencode-ai/sdk"
import path from "path"

/** 仅三方 SDK → 鸿蒙流水线的产物（与 flutter-ohos / rn-ohos 的 01–05 分离） */
const ADAPTATION_FILES = new Set([
  "01-analysis.json",
  "02-planning.json",
  "03-implementation.json",
  "04-har-demo.json",
  "05-evaluation.json",
  "sdks.json",
])

function isScaffoldPath(filePath: string): boolean {
  // workspace-links 会把 agent-android-sdk/scaffold 以 junction 形式映射到每个仓库根的 ./scaffold
  // 若允许写入该路径，会污染共享模板，导致“多次转换后代码串库”
  const normalized = filePath.replaceAll("\\", "/")
  return (
    normalized === "scaffold" ||
    normalized.startsWith("scaffold/") ||
    normalized.includes("/scaffold/") ||
    normalized.endsWith("/scaffold")
  )
}

export const ValidateOnWrite: sdk = async ({ worktree, $ }) => {
  const hookScript = path.join(
    worktree,
    ".opencode",
    "sdks",
    "hooks",
    "validate-on-write.cjs",
  )

  return {
    "tool.execute.before": async (input) => {
      const tool = input.tool
      if (tool !== "write" && tool !== "edit") return

      const filePath =
        (input.args as any)?.filePath ||
        (input.args as any)?.file_path ||
        (input.args as any)?.path
      if (!filePath || typeof filePath !== "string") return

      if (isScaffoldPath(filePath)) {
        throw new Error(
          `禁止写入共享模板目录: ${filePath}\n` +
            `原因：./scaffold/** 为 workspace-links 映射到 agent-android-sdk/scaffold 的共享只读模板；写入会污染后续仓库并造成“串库”。\n` +
            `做法：请先将 ./scaffold/hardemo 整目录复制到仓库内新目录（如 ohos-hardemo/），再只在复制体内改 entry/library。`,
        )
      }
    },
    "tool.execute.after": async (input, output) => {
      const tool = input.tool
      if (tool !== "write" && tool !== "edit") return

      const args = (input.args ?? {}) as Record<string, unknown>
      const meta =
        output.metadata && typeof output.metadata === "object"
          ? (output.metadata as Record<string, unknown>)
          : undefined
      const filePath = [
        args.filePath,
        args.file_path,
        args.path,
        args.target_file,
        meta?.filePath,
        meta?.file_path,
        meta?.path,
      ].find((v): v is string => typeof v === "string" && v.length > 0)
      if (!filePath) return

      const basename = path.basename(filePath)
      if (!ADAPTATION_FILES.has(basename)) return

      if (!filePath.includes(".ohos-adaptation") && basename !== "sdks.json")
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
