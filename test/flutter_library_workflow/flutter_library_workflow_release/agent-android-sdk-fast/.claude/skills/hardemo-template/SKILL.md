---
name: hardemo-template
description: HarmonyOS HAR Demo project template for Android SDK to HarmonyOS SDK migration. Use when an agent needs to create or repair the `ohos_hardemo` two-module project, place adapted HAR code in `library`, wire an `entry` demo app to the local HAR, configure pages/resources/permissions, or run hvigor `assembleHar` / `assembleHap` builds.
---

# HAR Demo Template

Use this skill when creating the HarmonyOS project for Android SDK migration. The bundled template is in `ohos-hardemo/`.

## Copy Or Reuse

- Treat `ohos-hardemo/` in this skill as read-only.
- Copy it to the target SDK repo as `ohos_hardemo/` if that directory does not exist.
- If `ohos_hardemo/` already exists, reuse it and only repair the missing or incorrect parts.
- Keep the root `build-profile.json5` as an `entry + library` multi-module project.
- If the local machine's `targetSdkVersion` does not match the template, you may update that field; do not modify `runtimeOS`.
