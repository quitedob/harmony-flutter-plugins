#!/bin/bash

# 创建目录结构
mkdir -p docs/flutter_library_workflow/skills/android-sdk
mkdir -p docs/flutter_library_workflow/skills/android-sdk-fast
mkdir -p docs/flutter_library_workflow/skills/flutter
mkdir -p docs/flutter_library_workflow/skills/flutter-fast
mkdir -p docs/flutter_library_workflow/skills/rn
mkdir -p docs/flutter_library_workflow/skills/rn-fast

# 复制 android-sdk skills
echo "复制 Android SDK skills..."
find flutter_library_workflow/flutter_library_workflow_release/agent-android-sdk/.claude/skills -name "SKILL.md" | while read file; do
    skill_name=$(basename $(dirname "$file"))
    target_dir="docs/flutter_library_workflow/skills/android-sdk/$skill_name"
    mkdir -p "$target_dir"
    cp -r "$(dirname "$file")"/* "$target_dir/"
    echo "  - $skill_name"
done

# 复制 android-sdk-fast skills
echo "复制 Android SDK Fast skills..."
find flutter_library_workflow/flutter_library_workflow_release/agent-android-sdk-fast/.claude/skills -name "SKILL.md" | while read file; do
    skill_name=$(basename $(dirname "$file"))
    target_dir="docs/flutter_library_workflow/skills/android-sdk-fast/$skill_name"
    mkdir -p "$target_dir"
    cp -r "$(dirname "$file")"/* "$target_dir/"
    echo "  - $skill_name"
done

# 复制 flutter skills
echo "复制 Flutter skills..."
if [ -d "flutter_library_workflow/flutter_library_workflow_release/agent-flutter/.claude/skills" ]; then
    find flutter_library_workflow/flutter_library_workflow_release/agent-flutter/.claude/skills -name "SKILL.md" | while read file; do
        skill_name=$(basename $(dirname "$file"))
        target_dir="docs/flutter_library_workflow/skills/flutter/$skill_name"
        mkdir -p "$target_dir"
        cp -r "$(dirname "$file")"/* "$target_dir/"
        echo "  - $skill_name"
    done
fi

# 复制 flutter-fast skills
echo "复制 Flutter Fast skills..."
if [ -d "flutter_library_workflow/flutter_library_workflow_release/agent-flutter-fast/.claude/skills" ]; then
    find flutter_library_workflow/flutter_library_workflow_release/agent-flutter-fast/.claude/skills -name "SKILL.md" | while read file; do
        skill_name=$(basename $(dirname "$file"))
        target_dir="docs/flutter_library_workflow/skills/flutter-fast/$skill_name"
        mkdir -p "$target_dir"
        cp -r "$(dirname "$file")"/* "$target_dir/"
        echo "  - $skill_name"
    done
fi

# 复制 rn skills
echo "复制 React Native skills..."
if [ -d "flutter_library_workflow/flutter_library_workflow_release/agent-rn/.claude/skills" ]; then
    find flutter_library_workflow/flutter_library_workflow_release/agent-rn/.claude/skills -name "SKILL.md" | while read file; do
        skill_name=$(basename $(dirname "$file"))
        target_dir="docs/flutter_library_workflow/skills/rn/$skill_name"
        mkdir -p "$target_dir"
        cp -r "$(dirname "$file")"/* "$target_dir/"
        echo "  - $skill_name"
    done
fi

# 复制 rn-fast skills
echo "复制 React Native Fast skills..."
if [ -d "flutter_library_workflow/flutter_library_workflow_release/agent-rn-fast/.claude/skills" ]; then
    find flutter_library_workflow/flutter_library_workflow_release/agent-rn-fast/.claude/skills -name "SKILL.md" | while read file; do
        skill_name=$(basename $(dirname "$file"))
        target_dir="docs/flutter_library_workflow/skills/rn-fast/$skill_name"
        mkdir -p "$target_dir"
        cp -r "$(dirname "$file")"/* "$target_dir/"
        echo "  - $skill_name"
    done
fi

# 复制主要文档
echo "复制主要文档..."
cp flutter_library_workflow/flutter_library_workflow_release/README.md docs/flutter_library_workflow/
cp flutter_library_workflow/flutter_library_workflow_release/adapt-workflow/AGENTS.md docs/flutter_library_workflow/
cp flutter_library_workflow/flutter_library_workflow_release/adapt-workflow/README.md docs/flutter_library_workflow/ADAPT_WORKFLOW_README.md

echo "完成！"
