#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""SONAME binary patcher for HarmonyOS HAP compatibility.

Usage:
    py patch-soname.py <file> <old_soname> <new_soname>

Example:
    py patch-soname.py libgmp.so "libgmp.so.10" "libgmp.so"
    py patch-soname.py libgmpxx.so "libgmpxx.so.4" "libgmpxx.so"

The new SONAME must not be longer than the old one.
Extra bytes are filled with null (\\x00) to keep ELF structure intact.
"""

import sys


def patch_soname(filepath, old_soname, new_soname):
    old = old_soname.encode('utf-8')
    new = new_soname.encode('utf-8')

    if len(new) > len(old):
        print(f'ERROR: new SONAME "{new_soname}" is longer than old "{old_soname}"')
        return False

    with open(filepath, 'rb') as f:
        data = f.read()

    idx = data.find(old)
    if idx < 0:
        print(f'WARNING: "{old_soname}" not found in {filepath}')
        return True

    patched = new + b'\x00' * (len(old) - len(new))
    data = data[:idx] + patched + data[idx + len(old):]

    with open(filepath, 'wb') as f:
        f.write(data)

    print(f'Patched: "{old_soname}" -> "{new_soname}" at offset {idx}')
    return True


def main():
    if len(sys.argv) != 4:
        print(__doc__)
        sys.exit(1)

    filepath = sys.argv[1]
    old_soname = sys.argv[2]
    new_soname = sys.argv[3]

    if not patch_soname(filepath, old_soname, new_soname):
        sys.exit(1)


if __name__ == '__main__':
    main()
