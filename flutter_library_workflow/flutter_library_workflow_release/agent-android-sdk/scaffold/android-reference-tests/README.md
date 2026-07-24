# Android Reference Tests Scaffold

This scaffold is copied into an SDK repository as:

```text
.ohos-adaptation/android-reference-tests/
```

It is a JVM unit-test project for generating Android behavior baselines from the original SDK using JUnit4, Robolectric, and Mockito.

Default toolchain:

- JDK 17
- Gradle Wrapper pinned to Gradle 8.7
- Android Gradle Plugin 8.6.1

Rules:

- Keep the original Android SDK read-only.
- Configure `sourceSdkModuleDir` in `gradle.properties` to point to the original SDK module, relative to this copied project.
- Before running tests, inspect the original SDK's Gradle Wrapper, Android Gradle Plugin, compileSdk/minSdk, support-library/AndroidX usage, and required JDK.
- Adjust only this copied project for build compatibility.
- If the original SDK's Gradle/AGP line cannot run on JDK 17, keep this scaffold's pinned Gradle/AGP line and switch `sourceSdkAttachMode=source_set`. This compiles the original SDK's `src/main/java`, `src/main/res`, and `src/main/assets` as read-only source roots inside `:reference-tests`.
- Use `sourceSdkAttachMode=gradle_project` only when the original SDK module Gradle script is compatible with the active JDK and pinned Gradle/AGP.
- For legacy `android.support.*` SDKs, keep `android.useAndroidX=true` for Robolectric's AndroidX test dependencies, add the required support dependency to the copied `reference-tests/build.gradle`, and raise only the copied project's `referenceMinSdk` when test dependencies require it.
- If the SDK source references its own generated `R` class, set `referenceNamespace` in the copied `gradle.properties` to the original SDK package.
- Keep copied Gradle and Java files as UTF-8 without BOM.
- Generate tests under `reference-tests/src/test/`.
- Record failures as reference findings. Do not patch the original Android SDK to make these tests pass.
- If the environment is offline, place `gradle-8.7-bin.zip` under `gradle-dist/` and rewrite the copied `gradle/wrapper/gradle-wrapper.properties` to a local `file:///.../gradle-dist/gradle-8.7-bin.zip` URL.

Typical command from `.ohos-adaptation/android-reference-tests/`:

```powershell
.\gradlew.bat testDebugUnitTest --no-daemon
```
