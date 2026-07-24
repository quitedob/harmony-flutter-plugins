#!/usr/bin/env bash
# build-ohos-plain.sh — OHOS arm64-v8a 纯 C/C++ 源码直接编译模板
# 在 MSYS2 终端执行：bash build-ohos-plain.sh

set -euo pipefail

# ============ 配置区 ============
LIB_NAME="mylib"
SOURCE_DIR="$(pwd)/${LIB_NAME}"
DIST_DIR="$(pwd)/ohos-dist"

# OHOS NDK 路径（Windows 8.3 短路径）
OHOS_NDK="C:/PROGRA~1/Huawei/DEVECO~1/sdk/default/OPENHA~1/native"

# ============ 工具链 ============
LLVM_BIN="${OHOS_NDK}/llvm/bin"
CC="${LLVM_BIN}/clang -fuse-ld=lld --target=aarch64-linux-ohos --sysroot=${OHOS_NDK}/sysroot"
CXX="${LLVM_BIN}/clang++ -fuse-ld=lld --target=aarch64-linux-ohos --sysroot=${OHOS_NDK}/sysroot"
AR="${LLVM_BIN}/llvm-ar"
RANLIB="${LLVM_BIN}/llvm-ranlib"
STRIP="${LLVM_BIN}/llvm-strip"

CFLAGS="-O2 -fPIC -DHAVE_CONFIG_H"
CXXFLAGS="-O2 -fPIC -DHAVE_CONFIG_H"

# ============ 环境检查 ============
check_env() {
    echo "=== 环境检查 ==="
    if [ ! -f "${LLVM_BIN}/clang" ]; then
        echo "ERROR: clang 不存在: ${LLVM_BIN}/clang"
        echo "请确认 OHOS NDK 路径是否正确"
        exit 1
    fi
    echo "clang: $(${LLVM_BIN}/clang --version | head -1)"
}

# ============ 编译 ============
build() {
    echo "=== 编译 ==="
    local BUILD_DIR="${SOURCE_DIR}/build-ohos"
    mkdir -p "${BUILD_DIR}"

    # 逐个编译 .c → .o
    local obj_files=()
    for src in "${SOURCE_DIR}"/src/*.c; do
        if [ ! -f "$src" ]; then continue; fi
        local basename=$(basename "$src" .c)
        local obj="${BUILD_DIR}/${basename}.o"
        echo "  CC  $basename"
        ${CC} ${CFLAGS} -c "$src" -o "$obj" -I"${SOURCE_DIR}/include"
        obj_files+=("$obj")
    done

    if [ ${#obj_files[@]} -eq 0 ]; then
        echo "ERROR: 未找到 .c 源文件"
        exit 1
    fi

    # 链接为 .so
    echo "  LD  lib${LIB_NAME}.so"
    ${CC} -shared -o "${BUILD_DIR}/lib${LIB_NAME}.so" "${obj_files[@]}"

    # 头文件拷贝
    mkdir -p "${DIST_DIR}/arm64-v8a/include" "${DIST_DIR}/arm64-v8a/lib"
    cp "${BUILD_DIR}/lib${LIB_NAME}.so" "${DIST_DIR}/arm64-v8a/lib/"
    if [ -d "${SOURCE_DIR}/include" ]; then
        cp -r "${SOURCE_DIR}/include/"* "${DIST_DIR}/arm64-v8a/include/"
    fi
}

# ============ Strip ============
strip_libs() {
    echo "=== Strip ==="
    ${STRIP} --strip-unneeded "${DIST_DIR}/arm64-v8a/lib/lib${LIB_NAME}.so"
    echo "Stripped: lib${LIB_NAME}.so"
}

# ============ 验证 ============
verify() {
    echo "=== 验证 ==="
    local so="${DIST_DIR}/arm64-v8a/lib/lib${LIB_NAME}.so"
    echo "[ELF 架构]"
    ${LLVM_BIN}/llvm-readelf -h "$so" | grep -E "Class|Machine|Type"
    echo "[SONAME / NEEDED]"
    ${LLVM_BIN}/llvm-readelf -d "$so" | grep -E "SONAME|NEEDED"
    echo "[导出符号数]"
    ${LLVM_BIN}/llvm-readelf -s "$so" | grep -c "FUNC.*GLOBAL.*DEFAULT"
    echo "[文件大小]"
    ls -la "$so" | awk '{print $5, "bytes"}'
}

# ============ 主流程 ============
main() {
    check_env
    build
    strip_libs
    verify
    echo ""
    echo "=== 完成 ==="
    echo "产物目录: ${DIST_DIR}/arm64-v8a/"
}

main "$@"
