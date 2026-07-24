#!/usr/bin/env bash
# build-ohos-cmake.sh — OHOS arm64-v8a CMake 交叉编译模板
# 在 MSYS2 终端执行：bash build-ohos-cmake.sh

set -euo pipefail

# ============ 配置区 ============
LIB_NAME="mylib"
LIB_VERSION="1.0.0"
SOURCE_DIR="$(pwd)/${LIB_NAME}-${LIB_VERSION}"
DIST_DIR="$(pwd)/ohos-dist"

# OHOS NDK 路径（Windows 8.3 短路径）
OHOS_NDK="C:/PROGRA~1/Huawei/DEVECO~1/sdk/default/OPENHA~1/native"

# ============ 工具链 ============
LLVM_BIN="${OHOS_NDK}/llvm/bin"
TOOLCHAIN_CC="${LLVM_BIN}/clang"
TOOLCHAIN_CXX="${LLVM_BIN}/clang++"
TOOLCHAIN_AR="${LLVM_BIN}/llvm-ar"
TOOLCHAIN_RANLIB="${LLVM_BIN}/llvm-ranlib"
TOOLCHAIN_STRIP="${LLVM_BIN}/llvm-strip"

SYSROOT="${OHOS_NDK}/sysroot"
TARGET_FLAG="--target=aarch64-linux-ohos --sysroot=${SYSROOT}"

# ============ 环境检查 ============
check_env() {
    echo "=== 环境检查 ==="
    if [ ! -f "${TOOLCHAIN_CC}" ]; then
        echo "ERROR: clang 不存在: ${TOOLCHAIN_CC}"
        echo "请确认 OHOS NDK 路径是否正确"
        exit 1
    fi
    if ! command -v cmake &>/dev/null; then
        echo "ERROR: cmake 未安装"
        echo "MSYS2 安装：pacman -S cmake"
        exit 1
    fi
    echo "clang: $(${TOOLCHAIN_CC} --version | head -1)"
    echo "cmake: $(cmake --version | head -1)"
}

# ============ 生成工具链文件 ============
generate_toolchain() {
    echo "=== 生成 CMake 工具链文件 ==="
    cat > "${SOURCE_DIR}/ohos-toolchain.cmake" << 'TCEOF'
set(CMAKE_SYSTEM_NAME Linux)
set(CMAKE_SYSTEM_PROCESSOR aarch64)

set(CMAKE_C_COMPILER "${OHOS_NDK}/llvm/bin/clang")
set(CMAKE_CXX_COMPILER "${OHOS_NDK}/llvm/bin/clang++")
set(CMAKE_AR "${OHOS_NDK}/llvm/bin/llvm-ar")
set(CMAKE_RANLIB "${OHOS_NDK}/llvm/bin/llvm-ranlib")
set(CMAKE_STRIP "${OHOS_NDK}/llvm/bin/llvm-strip")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} --target=aarch64-linux-ohos --sysroot=${OHOS_NDK}/sysroot -fuse-ld=lld")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} --target=aarch64-linux-ohos --sysroot=${OHOS_NDK}/sysroot -fuse-ld=lld")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} --target=aarch64-linux-ohos --sysroot=${OHOS_NDK}/sysroot -fuse-ld=lld")
set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} --target=aarch64-linux-ohos --sysroot=${OHOS_NDK}/sysroot -fuse-ld=lld")

set(CMAKE_FIND_ROOT_PATH "${OHOS_NDK}/sysroot")
set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
TCEOF

    sed -i "s|\${OHOS_NDK}|${OHOS_NDK}|g" "${SOURCE_DIR}/ohos-toolchain.cmake"
    echo "工具链文件已生成: ${SOURCE_DIR}/ohos-toolchain.cmake"
}

# ============ 编译 ============
build() {
    echo "=== CMake 配置与编译 ==="
    local BUILD_DIR="${SOURCE_DIR}/build-ohos"
    mkdir -p "${BUILD_DIR}"

    cmake -S "${SOURCE_DIR}" -B "${BUILD_DIR}" \
        -DCMAKE_TOOLCHAIN_FILE="${SOURCE_DIR}/ohos-toolchain.cmake" \
        -DCMAKE_BUILD_TYPE=Release \
        -DBUILD_SHARED_LIBS=ON \
        -DCMAKE_INSTALL_PREFIX="${DIST_DIR}/arm64-v8a" \
        -DBUILD_TESTING=OFF

    cmake --build "${BUILD_DIR}" -j$(nproc)
    cmake --install "${BUILD_DIR}"
}

# ============ Strip ============
strip_libs() {
    echo "=== Strip ==="
    for so in "${DIST_DIR}/arm64-v8a/lib/"*.so; do
        if [ -f "$so" ]; then
            ${TOOLCHAIN_STRIP} --strip-unneeded "$so"
            echo "Stripped: $so"
        fi
    done
}

# ============ 验证 ============
verify() {
    echo "=== 验证 ==="
    for so in "${DIST_DIR}/arm64-v8a/lib/"*.so; do
        if [ ! -f "$so" ]; then continue; fi
        echo ""
        echo "--- $(basename $so) ---"
        echo "[ELF 架构]"
        ${LLVM_BIN}/llvm-readelf -h "$so" | grep -E "Class|Machine|Type"
        echo "[SONAME / NEEDED]"
        ${LLVM_BIN}/llvm-readelf -d "$so" | grep -E "SONAME|NEEDED"
        echo "[导出符号数]"
        ${LLVM_BIN}/llvm-readelf -s "$so" | grep -c "FUNC.*GLOBAL.*DEFAULT"
        echo "[文件大小]"
        ls -la "$so" | awk '{print $5, "bytes"}'
    done
}

# ============ 主流程 ============
main() {
    check_env
    generate_toolchain
    build
    strip_libs
    verify
    echo ""
    echo "=== 完成 ==="
    echo "产物目录: ${DIST_DIR}/arm64-v8a/"
}

main "$@"
