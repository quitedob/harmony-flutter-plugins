const express = require('express');
const { getActiveProfile, setActiveProfile, listProfiles, listFlowProfiles } = require('../lib/profile');
const { getFilteredStages } = require('../lib/stages');
const { readSettings } = require('../lib/settings');
const { resolveOhosNpmScope } = require('../lib/rn-ohos-npm-scope');
const { asyncHandler, AppError } = require('../lib/errors');

const router = express.Router();

/**
 * Extract a serialisable graph descriptor from STAGES edges.
 * condition functions cannot be serialised, so we only send { from, to, label }.
 */
function buildGraphDescriptor(stages) {
  const edges = [];
  for (const stage of stages) {
    if (!stage.edges) continue;
    for (const edge of stage.edges) {
      if (edge.to === 'error-handler') continue;
      edges.push({ from: stage.id, to: edge.to, label: edge.label || '' });
    }
  }
  return { edges };
}

function buildProfileResponse(profile, stages, settings) {
  const payload = {
    id: profile.id,
    name: profile.name,
    framework: profile.framework,
    targetPlatform: profile.targetPlatform,
    flowVersion: profile.flowVersion || 'full',
    flowProfiles: listFlowProfiles(profile.framework),

    branding: profile.branding,
    displayMaps: profile.displayMaps,
    dashboardCards: profile.dashboardCards,

    tpcOrgUrl: profile.TPC_ORG_URL,
    targetBranch: profile.TARGET_BRANCH,

    stages: stages.map(s => ({
      id: s.id,
      name: s.name,
      shortName: s.name,
      description: s.description,
      runnerType: s.script ? 'script' : 'agent',
    })),

    graph: buildGraphDescriptor(stages),

    availableProfiles: listProfiles(profile.flowVersion || 'full')
  };
  if (profile.framework === 'react-native') {
    payload.ohosNpmScope = resolveOhosNpmScope(settings);
  }
  return payload;
}

/**
 * GET /api/profile — 返回当前 profile 的前端配置
 */
router.get('/', asyncHandler(async (req, res) => {
  const settings = await readSettings();
  const stages = getFilteredStages(settings);
  res.json(buildProfileResponse(getActiveProfile(), stages, settings));
}));

/**
 * PUT /api/profile — 切换当前活跃 profile
 * body: { profileId: 'flutter-ohos' | 'rn-ohos' | 'android-sdk-ohos' | ... }
 */
router.put('/', asyncHandler(async (req, res) => {
  const { profileId } = req.body;
  if (!profileId) throw new AppError('profileId is required', 400);

  try {
    setActiveProfile(profileId);
  } catch (err) {
    throw new AppError(err.message, 400);
  }

  const settings = await readSettings();
  const stages = getFilteredStages(settings);
  res.json(buildProfileResponse(getActiveProfile(), stages, settings));
}));

module.exports = router;
