#!/usr/bin/env bash
# api-change-scan.sh — 直接调用 DevEco ApiScanUtil 接口的命令行工具 (macOS/Linux)
# 用法:
#   ./api-change-scan.sh --list-versions
#   ./api-change-scan.sh --project <工程路径> --start <版本> --end <版本> [--out <目录>] [--no-scan]
#
# 版本串须完整匹配 VERSION_LIST, 例如 HarmonyOS_5.1.0(18)_Release / HarmonyOS_6.0.0(20)_Beta3
# 先 --list-versions 查看合法取值。
#
# DevEco 安装目录解析 (与 Java 端 ApiChangeCli.detectDevDir 对齐, 并额外做两层兜底):
#   1) 依次尝试环境变量: DEVECO_HOME -> TOOL_HOME -> DEV_DIR -> DEVECO_SDK_HOME 的父目录
#      (DEVECO_SDK_HOME 形如 .../Contents/sdk, 取父目录即 .../Contents)
#   2) 常见路径: /Applications/DevEco-Studio.app/Contents, /Applications/DevEco-Studio.app
#   3) .app 包根归一化: 若候选以 .app 结尾且含 Contents/, 自动改用 .../Contents
#   4) 每个候选都必须同时含 lib/ (构建 classpath) 与 jbr java, 否则跳过并尝试下一个
# 因此即便 DEVECO_HOME 指向 .app 根目录或错误路径, 也不会再误判为 "DevEco 未安装"。
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 在候选目录下定位 JBR java 的 bin 目录 (兼容 macOS / Linux 两种布局)。
# 命中: 把 bin 目录写入全局 JBR_BIN 并返回 0; 否则返回 1。
jbr_bin_in() {
  local d="$1" cand
  for cand in "$d/jbr/Contents/Home/bin" "$d/jbr/bin"; do
    if [ -x "$cand/java" ]; then
      JBR_BIN="$cand"
      return 0
    fi
  done
  return 1
}

# 解析 DevEco 的 Contents 目录 (即同时含 lib/ 与 jbr 的目录)。
# 命中: 设置全局 DEVECO / JBR_BIN 并返回 0; 全部失败: 返回 1, 失败明细写入全局 DEVECO_TRIED。
resolve_deveco() {
  DEVECO=""
  JBR_BIN=""
  DEVECO_TRIED=""
  local -a raw=()
  if [ -n "${DEVECO_HOME:-}" ]; then    raw+=("$DEVECO_HOME"); fi
  if [ -n "${TOOL_HOME:-}" ]; then      raw+=("$TOOL_HOME"); fi
  if [ -n "${DEV_DIR:-}" ]; then        raw+=("$DEV_DIR"); fi
  if [ -n "${DEVECO_SDK_HOME:-}" ]; then raw+=("$(dirname "$DEVECO_SDK_HOME")"); fi
  raw+=("/Applications/DevEco-Studio.app/Contents")
  raw+=("/Applications/DevEco-Studio.app")

  local c contents
  for c in "${raw[@]}"; do
    [ -n "$c" ] || continue
    # .app 包根归一化
    contents="$c"
    case "$c" in
      *.app)
        if [ -d "$c/Contents" ]; then contents="$c/Contents"; fi
        ;;
    esac
    # 必须含 lib/ (classpath 依赖)
    if [ ! -d "$contents/lib" ]; then
      DEVECO_TRIED+="  - $c -> 无 lib/ 目录"$'\n'
      continue
    fi
    # 必须能找到 jbr java
    if jbr_bin_in "$contents"; then
      DEVECO="$contents"
      return 0
    fi
    DEVECO_TRIED+="  - $c -> 有 lib/ 但未找到 jbr java ($contents/jbr/...)"$'\n'
  done
  return 1
}

if ! resolve_deveco; then
  {
    echo "ERROR: 未能定位可用的 DevEco Studio 安装目录 (需同时含 lib/ 与 jbr java)。"
    echo "环境变量:"
    echo "  DEVECO_HOME=${DEVECO_HOME:-<未设置>}"
    echo "  TOOL_HOME=${TOOL_HOME:-<未设置>}"
    echo "  DEV_DIR=${DEV_DIR:-<未设置>}"
    echo "  DEVECO_SDK_HOME=${DEVECO_SDK_HOME:-<未设置>}"
    echo "已尝试的候选:"
    printf '%s' "$DEVECO_TRIED"
    echo "请用 DEVECO_HOME 指向 DevEco 的 Contents 目录:"
    echo "  macOS:  export DEVECO_HOME=/Applications/DevEco-Studio.app/Contents"
    echo "  (传 .app 包根亦可, 脚本会自动补 /Contents)"
  } >&2
  exit 1
fi

JAVA="$JBR_BIN/java"
JAVAC="$JBR_BIN/javac"
echo "[deveco] DEVECO=$DEVECO  JAVA=$JAVA" >&2

# classpath: lib/* + 所有插件 lib/*
CP="$(echo "$DEVECO"/lib/*.jar | tr ' ' ':'):$(echo "$DEVECO"/plugins/*/lib/*.jar | tr ' ' ':')"

# 源码变更时自动重编译
SRC="$SCRIPT_DIR/ApiChangeCli.java"
CLS="$SCRIPT_DIR/ApiChangeCli.class"
if [ ! -f "$CLS" ] || [ "$SRC" -nt "$CLS" ]; then
  echo "[setup] 编译 ApiChangeCli.java ..." >&2
  "$JAVAC" -proc:none -encoding UTF-8 -cp "$CP" "$SRC" || { echo "ERROR: 编译失败" >&2; exit 1; }
fi

exec "$JAVA" -cp "$CP:$SCRIPT_DIR" ApiChangeCli "$@"
