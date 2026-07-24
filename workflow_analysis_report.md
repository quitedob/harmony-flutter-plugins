# Flutter Library Workflow - Complete Analysis Report

## 1. Project Overview

This is an **automated workflow system** for adapting third-party libraries (Flutter plugins, React Native modules, and Android SDKs) to HarmonyOS/OpenHarmony platform using AI agents.

### Core Components

- **adapt-workflow/**: Web-based management panel (Node.js + Express backend, native ES Modules frontend)
- **Agent directories**: Multiple workflow configurations for different adaptation scenarios
- **Skills system**: Modular capabilities that extend agent functionality
- **Multi-stage pipeline**: Automated analysis → planning → coding → testing → summary

---

## 2. PRD (Product Requirements Document) Generation Process

### 2.1 Where PRD is Produced

**Location**: `.ohos-adaptation/01-analysis-prd.md`

**Stage**: Analysis phase (Stage 1 - primary-01-analysis)

**Template**: `agent-flutter/.claude/skills/tool-schema-validation/docs/01-analysis-prd.md`

### 2.2 PRD Generation Workflow

The PRD is generated in **two rounds**:

#### Round 1: Generate PRD Content
1. **Input**: Plugin source code (Dart, Android, iOS)
2. **Analysis**: 
   - Scan all public APIs (classes, methods, enums, typedefs)
   - Extract Channel methods (MethodChannel, EventChannel, BasicMessageChannel)
   - Identify PlatformViews, FFI bindings, permissions
   - Cross-validate Dart/Android/iOS implementations
3. **Output**: `01-analysis-prd.md` - comprehensive requirements specification

#### Round 2: Coverage Statistics
1. **Count**: Agent counts actual API entries listed in PRD
2. **Calculate**: Coverage percentages for:
   - Adaptation contracts (hard requirement: 100%)
   - Dart public APIs (diagnostic info, no threshold)
   - API-to-module mapping
   - Module-to-API mapping
3. **Update**: Write coverage data back to `01-analysis.json` → `api_inventory.prd_coverage`

### 2.3 PRD Structure (12 Chapters)

1. Plugin Overview
2. Feature Module Overview
3. Public API Specification (Core Chapter)
4. Event & Callback Specification
5. PlatformView Specification
6. Permission Requirements
7. Data Flow & Interaction Processes
8. Error Handling Specification
9. Initialization & Lifecycle
10. Non-functional Requirements
11. Adaptation Points & Platform Differences
12. Completeness Self-check (REQUIRED)

### 2.4 Critical Requirements

1. **100% Contract Coverage**: Every Channel method, EventChannel, PlatformView, and FFI main function MUST appear in PRD
2. **Three-platform Union**: Dart + Android + iOS method names merged (union set)
3. **No HarmonyOS Solutions**: PRD describes "what to do", not "how to do it on HarmonyOS"
4. **Federated Plugin Handling**: Must scan platform implementation packages and merge public APIs

---

## 3. Skills Inventory

### 3.1 Agent-Flutter Skills (28 skills)

**Testing Skills (7)**:
- 01-test-analysis, 02-test-case-gen, 03-case-review, 04-testcase-gen
- flu-plugins-hypium-testcase-gen, test-analysis, test-case-gen, test-design

**Documentation Search Skills (5)**:
- flutter-adapted-library (468 libraries: 151 adapted, 220 in progress)
- flutter-docs-lookup (423 Flutter OHOS documentation files)
- harmonyos-docs-lookup (HarmonyOS official docs)
- harmonyos-sdk-api-lookup (SDK .d.ts API signatures)
- ohpm-package-api-lookup (OHPM package APIs)

**Coding & Quality Skills (8)**:
- arkts-rules, ohos-coding-guide, ohos-code-review
- dfx-quality, code-stats, analysis-review, case-review

**Compliance & Mapping Skills (3)**:
- huawei-ecosystem-compliance
- native-lib-index, native-library-substitution

**Generation & Tools Skills (5)**:
- flutter-plugin-example-generator2
- flutter-sdk-switch
- requirement-parse
- tool-schema-validation (JSON Schema + PostWrite Hook + auto-report generation)
- tool-summary

### 3.2 Agent-Android-SDK Skills (21 skills)

**Testing**: 01-sdk-test-analysis, 02-sdk-test-case-gen, 03-sdk-case-review
**Migration**: android-sdk-to-arkts, arkts-full-implementation, arkts-native-bridge
**Quality**: dfx-quality, ohos-sdk-code-review, migration-verifier
**Coding**: arkts-rules, ohos-coding-guide
**Documentation**: harmonyos-docs-lookup, harmonyos-sdk-api-lookup
**Tools**: ohos-har-integration-demo, sdk-hardemo-generator, ui-component-mapping
**Others**: code-stats, huawei-ecosystem-compliance, native-library-substitution, ohos-native-cross-compile

### 3.3 Agent-RN Skills (25 skills)

**Testing**: 01-test-analysis, 02-test-case-gen, 03-case-review, case-review, ohos-hypium-uitest, ohos-testing-guide, test-report
**Documentation**: harmonyos-docs-lookup, harmonyos-sdk-api-lookup, rn-docs-lookup, rn-adapted-library
**Coding & Quality**: arkts-rules, ohos-coding-guide, ohos-code-review, dfx-quality, code-stats, analysis-review
**Generation**: rn-plugin-example-generator
**Tools**: tool-example, tool-ohos-plugin-repo, tool-schema-validation, tool-summary, tool-testing
**Learning**: failure-lessons

### 3.4 Common Skills Across All Agents

- **arkts-rules**: ArkTS language constraints
- **code-stats**: Code metrics
- **dfx-quality**: Quality checks
- **harmonyos-docs-lookup**: Documentation search
- **harmonyos-sdk-api-lookup**: API signature lookup
- **ohos-coding-guide**: Coding standards
- **tool-schema-validation**: JSON validation + auto-report generation

---

## 4. Workflow Structure & Organization Pattern

### 4.1 Two Workflow Versions

#### Full Workflow Version (5-6 stages)
- **Target Models**: GLM, DeepSeek, Kimi, Minimax, Mimo
- **Approach**: Break down complexity through detailed multi-stage analysis

**Flutter Full Workflow (5 stages)**:
1. analysis → 01-analysis.json + 01-analysis-prd.md
2. planning → 02-planning.json
3. coding-library → 03-coding-library.json + OHOS native implementation
4. testing → 04-testing.json + Example generation
5. summary → 05-summary.json + INTEGRATION_GUIDE.md

#### Fast Workflow Version (3 stages)
- **Target Models**: GPT-5.5, Claude Opus 4.8 (strong reasoning models)
- **Recommended Backend**: Claude Code
- **Approach**: Merge stages for higher efficiency

**Flutter Fast Workflow (3 stages)**:
1. analysis → Same as full version
2. coding-library → Merge planning + coding + testing
3. validation → Quality review + completeness check

### 4.2 Directory Structure Pattern

Each agent directory follows this structure:

```
agent-{platform}/
├── CLAUDE.md              # Global rules for this workflow
├── .claude/
│   ├── settings.json
│   ├── prompts/
│   │   ├── develop/       # Production prompts
│   │   └── test/          # Test prompts
│   └── skills/            # Skill modules
└── opencode.json          # OpenCode configuration
```

### 4.3 Profile Architecture

The system uses **Profile** pattern for framework-agnostic extension.

Current profiles:
- **flutter-ohos**: Flutter plugin adaptation
- **rn-ohos**: React Native module adaptation
- **android-sdk-ohos**: Android SDK (HAR) adaptation

---

## 5. Data Architecture

### 5.1 Two-Layer Design

1. **plugins.json** (repository list management)
   - Location: `repos/plugins.json`
   - Contents: Clone status, commit hash, sync time
   
2. **Adaptation artifacts** (detailed outputs)
   - Location: `repos/{plugin}/.ohos-adaptation/`
   - Stage outputs: 01-analysis.json, 02-planning.json, etc.
   - Reports: *-report.md (auto-generated)
   - PRD: 01-analysis-prd.md (manually written by agent)
   - Logs: logs/*.log

### 5.2 JSON Schema + Validation

- **Location**: `.claude/skills/tool-schema-validation/json-schema/`
- **Files**: 01-analysis.schema.json through 05-summary.schema.json
- **Validation**: Automatic via PostWrite Hook
- **Report Generation**: Handlebars templates in report-templates/zh-CN/

### 5.3 PostWrite Hook Flow

```
Agent writes JSON via write/edit tool
         ↓
PostWrite Hook triggered
         ↓
validate-json-worker.cjs (AJV validation)
         ↓
render-report-worker.cjs (Handlebars → Markdown)
         ↓
validate-pipeline-worker.cjs (stage 5 only: cross-stage consistency)
         ↓
Results displayed to agent
```

---

## 6. Key Files Summary

### 6.1 Documentation Files
- README.md (10,267 bytes) - User guide
- AGENTS.md - Technical architecture
- CLAUDE.md (per agent) - Workflow rules

### 6.2 Prompt Files
- **68 total prompt files** across all agents
- Primary prompts: primary-01-*.md through primary-05-*.md
- Sub-agent prompts: sub-*.md

### 6.3 Configuration Files
- settings.json - Agent settings
- opencode.json - OpenCode configuration
- model-tiers.json - Model configuration

---

## 7. Content Recommendations for docs/

### 7.1 Essential Documentation (Must Copy)

1. **README.md** - Main user guide and setup
2. **AGENTS.md** - Technical architecture reference
3. **agent-flutter/CLAUDE.md** - Flutter workflow rules
4. **PRD Template** - tool-schema-validation/docs/01-analysis-prd.md
5. **JSON Schemas** - All .schema.json files
6. **Skills Overview** - Comprehensive skills catalog

### 7.2 Recommended docs/ Structure

```
docs/
├── README.md                          # User guide
├── ARCHITECTURE.md                    # Technical architecture
├── workflows/
│   ├── flutter-full-workflow.md       # 5-stage workflow
│   ├── flutter-fast-workflow.md       # 3-stage workflow
│   ├── android-sdk-workflow.md        # Android SDK
│   └── react-native-workflow.md       # React Native
├── prd/
│   ├── prd-template.md                # PRD generation guide
│   └── prd-examples/                  # Example PRDs
├── schemas/
│   ├── 01-analysis.schema.json
│   ├── 02-planning.schema.json
│   ├── 03-coding-library.schema.json
│   ├── 04-testing.schema.json
│   └── 05-summary.schema.json
├── skills/
│   ├── skills-catalog.md              # All 70+ skills
│   ├── common-skills.md               # Shared skills
│   └── skill-development.md           # Creating new skills
└── api/
    └── api-reference.md               # adapt-workflow API
```

---

## 8. Key Findings Summary

### 8.1 PRD Generation Process

**Two-Round Generation**:
- Round 1: Generate PRD content (12 chapters)
- Round 2: Calculate coverage statistics and update JSON

**Critical Metrics**:
- Adaptation contracts coverage: **100% required** (hard threshold)
- Dart public API coverage: No threshold (diagnostic only)
- Three-platform union: Dart + Android + iOS merged

**PRD Location**: `.ohos-adaptation/01-analysis-prd.md`
**Template**: `tool-schema-validation/docs/01-analysis-prd.md`

### 8.2 Skills Distribution

- **Agent-Flutter**: 28 skills
- **Agent-Android-SDK**: 21 skills  
- **Agent-RN**: 25 skills
- **Common skills**: 7 shared across all agents
- **Total unique skills**: 70+ skills

**Key Skill Categories**:
- Documentation search (5 skills per agent)
- Testing (7+ skills per agent)
- Coding & quality (8+ skills)
- Compliance & ecosystem (3 skills)
- Tools & generation (5+ skills)

### 8.3 Workflow Organization

**Two Variants**:
1. Full Workflow (5-6 stages): For GLM, DeepSeek, Kimi, etc.
2. Fast Workflow (3 stages): For GPT-5.5, Claude Opus 4.8

**Stage Pipeline**:
- Analysis → Planning → Coding → Testing → Summary (full)
- Analysis → Coding → Validation (fast)

**Output Structure**:
- JSON data files (validated by schema)
- Markdown reports (auto-generated)
- PRD document (manually written by agent)
- Integration guide (summary stage)

### 8.4 Files to Copy to docs/

**Priority 1 (Essential)**:
- README.md, AGENTS.md, CLAUDE.md files
- PRD template
- All JSON schemas (5 files)

**Priority 2 (Recommended)**:
- Skills catalog and documentation
- Workflow comparison guides
- API reference

**Priority 3 (Optional)**:
- Report templates
- Validation scripts
- Example outputs
