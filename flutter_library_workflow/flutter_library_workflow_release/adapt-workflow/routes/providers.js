const express = require('express');
const { asyncHandler } = require('../lib/errors');
const providerResolver = require('../lib/provider-resolver');

const router = express.Router();

/**
 * GET /api/providers
 * List all available providers from global opencode config.
 */
router.get('/', asyncHandler(async (_req, res) => {
  const providers = providerResolver.listAvailableProviders();
  res.json({ providers });
}));

module.exports = router;
