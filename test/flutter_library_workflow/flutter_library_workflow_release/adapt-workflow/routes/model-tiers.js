const express = require('express');
const { asyncHandler, badRequest } = require('../lib/errors');
const {
  VALID_TIERS,
  VALID_BACKENDS,
  loadTierConfig,
  saveTierConfig,
  loadDefaultTierConfig,
  clearCache,
} = require('../lib/model-tier-resolver');

const router = express.Router();

/**
 * GET /api/model-tiers
 * Return the current tier configuration.
 */
router.get('/', asyncHandler(async (_req, res) => {
  const config = loadTierConfig();
  res.json(config);
}));

/**
 * PUT /api/model-tiers
 * Update tier configuration. Accepts partial updates.
 * Body: { tiers?: { high?: {...}, ... }, agent_tiers?: { ... } }
 */
router.put('/', asyncHandler(async (req, res) => {
  const current = loadTierConfig();
  const { tiers, agent_tiers } = req.body;

  if (tiers) {
    for (const [name, tierConfig] of Object.entries(tiers)) {
      if (!VALID_TIERS.includes(name)) {
        throw badRequest(`无效的层级名: ${name}，可用值: ${VALID_TIERS.join(', ')}`);
      }
      if (typeof tierConfig !== 'object') {
        throw badRequest(`层级 ${name} 的配置必须是对象`);
      }
      for (const backend of VALID_BACKENDS) {
        if (tierConfig[backend] !== undefined && typeof tierConfig[backend] !== 'string') {
          throw badRequest(`层级 ${name} 的 ${backend} 值必须是字符串`);
        }
      }
      current.tiers[name] = { ...current.tiers[name], ...tierConfig };
    }
  }

  if (agent_tiers) {
    if (typeof agent_tiers !== 'object' || Array.isArray(agent_tiers)) {
      throw badRequest('agent_tiers 必须是对象');
    }
    for (const tier of Object.values(agent_tiers)) {
      if (!VALID_TIERS.includes(tier)) {
        throw badRequest(`无效的层级值: ${tier}，可用值: ${VALID_TIERS.join(', ')}`);
      }
    }
    current.agent_tiers = { ...current.agent_tiers, ...agent_tiers };
  }

  saveTierConfig(current);
  res.json({ success: true, config: current });
}));

/**
 * POST /api/model-tiers/reset
 * Reset to default configuration.
 */
router.post('/reset', asyncHandler(async (_req, res) => {
  const defaults = loadDefaultTierConfig();
  saveTierConfig(defaults);
  res.json({ success: true, config: defaults });
}));

module.exports = router;
