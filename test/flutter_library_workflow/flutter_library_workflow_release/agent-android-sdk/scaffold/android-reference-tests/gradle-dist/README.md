# Optional Offline Gradle Distribution

This directory is intentionally kept empty by default.

For offline runs, place a pinned Gradle distribution zip here, for example:

```text
gradle-dist/gradle-8.7-bin.zip
```

After copying this scaffold into `.ohos-adaptation/android-reference-tests/`,
the planning agent may rewrite `gradle/wrapper/gradle-wrapper.properties` in
the copied project to a `file:///.../gradle-dist/gradle-8.7-bin.zip` URL.

Do not edit the original Android SDK's wrapper to make reference tests run.
