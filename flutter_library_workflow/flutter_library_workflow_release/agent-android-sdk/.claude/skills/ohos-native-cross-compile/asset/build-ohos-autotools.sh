#!/bin/bash
# GMP OHOS Cross-Compile Script (Windows/MSYS2)
#
# Prerequisites: MSYS2 with: pacman -S make m4 autoconf automake libtool
#
# Output: ../ohos-dist/arm64-v8a/
#   - libgmp.so (pure C, no NAPI)
#   - libgmpxx.so (C++ bindings)
#   - gmp.h, gmpxx.h

set -e

# === OHOS SDK Path (Windows) ===
# Use 8.3 short path to avoid spaces breaking GMP's configure script
SDK_HOME="${OHOS_SDK_HOME:-/c/PROGRA~1/Huawei/DEVECO~1/sdk/default/OPENHA~1/native}"
LLVM_BIN="${SDK_HOME}/llvm/bin"

# Embed -fuse-ld=lld and --target/--sysroot into CC/CXX so libtool always
# passes them through. Libtool strips LDFLAGS but keeps $compiler_flags
# from CC/CXX. Without -fuse-ld=lld, libtool falls back to MSYS2's
# /usr/bin/ld which can't handle arm64 objects.
SYSROOT="${SDK_HOME}/sysroot"
export CC="${LLVM_BIN}/clang.exe -fuse-ld=lld --target=aarch64-linux-ohos --sysroot=${SYSROOT}"
export CXX="${LLVM_BIN}/clang++.exe -fuse-ld=lld --target=aarch64-linux-ohos --sysroot=${SYSROOT}"
export AR="${LLVM_BIN}/llvm-ar.exe"
export RANLIB="${LLVM_BIN}/llvm-ranlib.exe"
export STRIP="${LLVM_BIN}/llvm-strip.exe"
export LD="${LLVM_BIN}/ld.lld.exe"
export OBJDUMP="${LLVM_BIN}/llvm-objdump.exe"

HOST_TRIPLE="aarch64-linux-gnu"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
GMP_SRC="$(cd "${SCRIPT_DIR}/.." && pwd)"
BUILD_DIR="${SCRIPT_DIR}/build-temp"
OUTPUT_DIR="${GMP_SRC}/ohos-dist/arm64-v8a"

echo "=== GMP OHOS Cross-Compile (Windows/MSYS2) ==="
echo "GMP_SRC: ${GMP_SRC}"
echo "SDK_HOME: ${SDK_HOME}"
echo "OUTPUT: ${OUTPUT_DIR}"

CLANG_PATH="${LLVM_BIN}/clang.exe"
if [ ! -f "${CLANG_PATH}" ]; then
    echo "ERROR: clang not found at ${CLANG_PATH}"
    echo "Set OHOS_SDK_HOME to your SDK path"
    exit 1
fi

rm -rf "${BUILD_DIR}"
mkdir -p "${BUILD_DIR}"
mkdir -p "${OUTPUT_DIR}"

cd "${BUILD_DIR}"

cleanup() {
    rm -rf "${BUILD_DIR}"
}
trap cleanup EXIT

# Create a cache file for cross-compilation settings that
# configure cannot determine by running test programs
cat > cross.cache << 'EOF'
gmp_cv_c_for_build_ansi=yes
gmp_cv_check_libm_for_cos=yes
ac_cv_func_alarm=yes
ac_cv_func_clock=yes
ac_cv_func_clock_gettime=yes
ac_cv_func_getpagesize=yes
ac_cv_func_getrusage=yes
ac_cv_func_gettimeofday=yes
ac_cv_func_localeconv=yes
ac_cv_func_memset=yes
ac_cv_func_mmap=yes
ac_cv_func_mprotect=yes
ac_cv_func_nl_langinfo=yes
ac_cv_func_raise=yes
ac_cv_func_sigaction=yes
ac_cv_func_sigaltstack=yes
ac_cv_func_strchr=yes
ac_cv_func_strerror=yes
ac_cv_func_strnlen=yes
ac_cv_func_strtol=yes
ac_cv_func_strtoul=yes
ac_cv_func_sysconf=yes
ac_cv_func_vsnprintf=yes
ac_cv_func_sstream=yes
ac_cv_sizeof_mp_limb_t=8
ac_cv_type_ptrdiff_t=yes
gmp_cv_asm_align_log=yes
EOF

# GMP configure for cross-compilation
# --host: target platform
# --build: force build platform so configure skips running test programs
# --disable-assembly: NOT set - we want arm64 assembly for performance
# The key: GMP's arm64 .asm files use m4 macros and are preprocessed
# by m4 before being assembled. clang's integrated assembler handles
# arm64 well, so assembly should work out of the box.

"${GMP_SRC}/configure" \
    --host="${HOST_TRIPLE}" \
    --build=x86_64-pc-msys \
    --prefix="${BUILD_DIR}/install" \
    --disable-static \
    --enable-shared \
    --enable-cxx \
    --cache-file=cross.cache \
    --disable-demos \
    CC="${CC}" \
    CXX="${CXX}" \
    CC_FOR_BUILD="gcc" \
    AR="${AR}" \
    RANLIB="${RANLIB}" \
    STRIP="${STRIP}" \
    CFLAGS="-O2 -fPIC" \
    CXXFLAGS="-O2 -fPIC" \
    LDFLAGS=""

echo ""
echo "=== Configure done, checking if assembly is enabled ==="
grep -E "have_asm|asm_dir" config.m4 || true
echo ""

# Build - let make go as far as it can; it will fail at demos (no yacc)
# but the .so files will already be built by then
make -j$(nproc) || true

# Ensure the final .so linking step completed (may have been skipped due to
# parallel build failing at demos). Re-run just the top-level link targets.
make libgmp.la || true
make libgmpxx.la || true
# make install may also fail at demos, just copy what we need
make install || true

# Copy outputs - only the main .so files, NOT the versioned symlinks
# Try install directory first, fall back to build .libs
if [ -f "${BUILD_DIR}/install/lib/libgmp.so" ]; then
    cp "${BUILD_DIR}/install/lib/libgmp.so" "${OUTPUT_DIR}/"
    cp "${BUILD_DIR}/install/lib/libgmpxx.so" "${OUTPUT_DIR}/"
    cp "${BUILD_DIR}/install/include/gmp.h" "${OUTPUT_DIR}/"
    cp "${BUILD_DIR}/install/include/gmpxx.h" "${OUTPUT_DIR}/"
elif [ -f "${BUILD_DIR}/.libs/libgmp.so" ]; then
    cp "${BUILD_DIR}/.libs/libgmp.so" "${OUTPUT_DIR}/"
    cp "${BUILD_DIR}/.libs/libgmpxx.so" "${OUTPUT_DIR}/"
    cp "${BUILD_DIR}/gmp.h" "${OUTPUT_DIR}/"
    cp "${BUILD_DIR}/gmpxx.h" "${OUTPUT_DIR}/" 2>/dev/null || true
    # gmpxx.h is in the source dir
    cp "${GMP_SRC}/gmpxx.h" "${OUTPUT_DIR}/"
else
    echo "ERROR: libgmp.so not found in expected locations"
    find "${BUILD_DIR}" -name 'libgmp*.so*' 2>/dev/null
    exit 1
fi

# Strip debug symbols
"${STRIP}" "${OUTPUT_DIR}/libgmp.so"
"${STRIP}" "${OUTPUT_DIR}/libgmpxx.so"

# Patch SONAME: remove version suffix so HarmonyOS runtime finds the .so
# libgmp:   -version-info 15:0:5 → SONAME=libgmp.so.10
# libgmpxx: -version-info 11:0:7 → SONAME=libgmpxx.so.4
patch_soname() {
    local file="$1"
    local old_soname="$2"
    local new_soname="$3"
    
    # Find SONAME in the binary and replace it
    # ELF SONAME is in .dynstr section, null-terminated
    local old_len=${#old_soname}
    local new_len=${#new_soname}
    
    if [ ${new_len} -gt ${old_len} ]; then
        echo "ERROR: new SONAME '${new_soname}' is longer than old '${old_soname}'"
        return 1
    fi
    
    # Use python for binary patching (more reliable than sed on binary)
    py -c "
import sys
old = b'${old_soname}'
new = b'${new_soname}'
data = open(sys.argv[1], 'rb').read()
idx = data.find(old)
if idx < 0:
    print('WARNING: ${old_soname} not found in ${file}')
    sys.exit(0)
# Pad with null bytes
patched = new + b'\x00' * (len(old) - len(new))
data = data[:idx] + patched + data[idx+len(old):]
open(sys.argv[1], 'wb').write(data)
print('Patched: ${old_soname} -> ${new_soname} at offset ' + str(idx))
" "${file}"
}

patch_soname "${OUTPUT_DIR}/libgmp.so" "libgmp.so.10" "libgmp.so"
patch_soname "${OUTPUT_DIR}/libgmpxx.so" "libgmpxx.so.4" "libgmpxx.so"
patch_soname "${OUTPUT_DIR}/libgmpxx.so" "libgmp.so.10" "libgmp.so"

# Verify no versioned SONAME remains
echo ""
echo "=== Verification ==="
echo "libgmp.so strings:"
"${OBJDUMP}" -p "${OUTPUT_DIR}/libgmp.so" 2>/dev/null | grep -E "SONAME|NEEDED" || strings "${OUTPUT_DIR}/libgmp.so" | grep -E "libgmp\.so" || true
echo "libgmpxx.so strings:"
"${OBJDUMP}" -p "${OUTPUT_DIR}/libgmpxx.so" 2>/dev/null | grep -E "SONAME|NEEDED" || strings "${OUTPUT_DIR}/libgmpxx.so" | grep -E "libgmp.*\.so" || true

echo ""
echo "=== Build Complete ==="
ls -la "${OUTPUT_DIR}"
