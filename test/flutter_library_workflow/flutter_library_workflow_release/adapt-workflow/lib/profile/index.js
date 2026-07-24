'use strict';

const { AsyncLocalStorage } = require('async_hooks');

const flutterOhos = require('./flutter-ohos/index');
const rnOhos = require('./rn-ohos/index');
const androidSdkOhos = require('./android-sdk-ohos/index');
const flutterOhosFast = require('./flutter-ohos-fast/index');
const rnOhosFast = require('./rn-ohos-fast/index');
const androidSdkOhosFast = require('./android-sdk-ohos-fast/index');
const flutterUpgrade = require('./flutter-upgrade/index');
const rnUpgrade = require('./rn-upgrade/index');
const androidSdkUpgrade = require('./android-sdk-upgrade/index');

const profiles = {
  'flutter-ohos': flutterOhos,
  'rn-ohos': rnOhos,
  'android-sdk-ohos': androidSdkOhos,
  'flutter-ohos-fast': flutterOhosFast,
  'rn-ohos-fast': rnOhosFast,
  'android-sdk-ohos-fast': androidSdkOhosFast,
  'flutter-upgrade': flutterUpgrade,
  'rn-upgrade': rnUpgrade,
  'android-sdk-upgrade': androidSdkUpgrade
};

// Map an upgrade library `type` (flutter / rn / sdk) to its upgrade profile id.
// Used by lib/upgrade/* to switch into the right profile context before
// delegating stage execution to the shared lib/agent/executor.js.
const UPGRADE_PROFILE_BY_TYPE = {
  flutter: 'flutter-upgrade',
  rn: 'rn-upgrade',
  sdk: 'android-sdk-upgrade'
};

function getUpgradeProfileId(type) {
  const key = String(type || '').trim().toLowerCase();
  const profileId = UPGRADE_PROFILE_BY_TYPE[key];
  if (!profileId) {
    throw new Error(`Unknown upgrade library type: ${type}. Expected one of: ${Object.keys(UPGRADE_PROFILE_BY_TYPE).join(', ')}`);
  }
  return profileId;
}

function listUpgradeProfiles() {
  return Object.values(profiles)
    .filter(p => p.workflow === 'upgrade')
    .map(p => ({ id: p.id, name: p.name, framework: p.framework }));
}

const FLOW_LABELS = {
  full: '完整流程版',
  fast: '高效流程版'
};

const DEFAULT_PROFILE_ID = 'flutter-ohos-fast';

let activeProfileId = DEFAULT_PROFILE_ID;
const profileContext = new AsyncLocalStorage();

function isKnownProfileId(profileId) {
  return Boolean(profileId && profiles[profileId]);
}

function getCurrentProfileId() {
  const store = profileContext.getStore();
  const profileId = store?.profileId;
  return isKnownProfileId(profileId) ? profileId : null;
}

function assertProfileId(profileId) {
  const normalized = String(profileId || '');
  if (!profiles[normalized]) {
    throw new Error(`Unknown profile: ${normalized}. Available: ${Object.keys(profiles).join(', ')}`);
  }
  return normalized;
}

function resolveProfileId(profileId) {
  const explicitId = isKnownProfileId(profileId) ? String(profileId) : null;
  if (explicitId) return explicitId;
  return getCurrentProfileId() || activeProfileId;
}

function getProfile(profileId) {
  return profiles[resolveProfileId(profileId)] || profiles[DEFAULT_PROFILE_ID];
}

function getActiveProfile() {
  return getProfile();
}

function setActiveProfile(profileId) {
  activeProfileId = assertProfileId(profileId);
}

function runWithProfile(profileId, fn) {
  const resolvedProfileId = profileId == null
    ? resolveProfileId()
    : assertProfileId(profileId);
  return profileContext.run({ profileId: resolvedProfileId }, fn);
}

function listProfiles(flowVersion = null) {
  const items = flowVersion
    ? Object.values(profiles).filter(p => p.flowVersion === flowVersion)
    : Object.values(profiles);
  return items.map(p => ({
    id: p.id,
    name: p.name,
    framework: p.framework,
    targetPlatform: p.targetPlatform,
    flowVersion: p.flowVersion,
    workflow: p.workflow
  }));
}

function listFlowProfiles(framework) {
  return ['fast', 'full']
    .map(version => {
      const profile = Object.values(profiles).find(p =>
        p.framework === framework && p.flowVersion === version
      );
      if (!profile) return null;
      return {
        value: version,
        label: FLOW_LABELS[version] || version,
        profileId: profile.id
      };
    })
    .filter(Boolean);
}

module.exports = {
  getProfile,
  getActiveProfile,
  getCurrentProfileId,
  runWithProfile,
  setActiveProfile,
  listProfiles,
  listFlowProfiles,
  listUpgradeProfiles,
  getUpgradeProfileId,
  DEFAULT_PROFILE_ID
};
