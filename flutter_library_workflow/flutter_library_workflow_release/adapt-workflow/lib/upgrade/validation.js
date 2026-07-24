'use strict';

const { AppError } = require('../errors');

const VALID_TYPES = new Set(['flutter', 'rn', 'sdk']);

/**
 * Validate + normalize an upgrade-library input. Throws AppError(400) on invalid.
 * @returns {{ type, repoUrl, harmonizedRepoUrl, repoBranch, harmonizedBranch, targetOsVersion, targetFrameworkVersion, name }}
 */
function validateLibrary(input) {
  const body = input || {};
  const type = String(body.type || '').trim().toLowerCase();
  if (!VALID_TYPES.has(type)) {
    throw new AppError('type 必须是 flutter / rn / sdk', 400);
  }

  const repoUrl = String(body.repoUrl || body.url || '').trim();
  const harmonizedRepoUrl = String(body.harmonizedRepoUrl || body.harmonizedUrl || '').trim();
  const repoBranch = String(body.repoBranch || '').trim();
  const harmonizedBranch = String(body.harmonizedBranch || '').trim();
  const targetOsVersion = String(body.targetOsVersion || '').trim();
  const targetFrameworkVersion = String(body.targetFrameworkVersion || '').trim();
  const name = String(body.name || '').trim();

  if (!repoUrl) throw new AppError('repoUrl（仓库）不能为空', 400);
  if (!harmonizedRepoUrl) throw new AppError('harmonizedRepoUrl（已鸿蒙化插件仓库）不能为空', 400);
  // 分支可选（留空克隆默认分支）；目标OS版本、目标框架版本均为可选

  return {
    type,
    name,
    repoUrl,
    harmonizedRepoUrl,
    repoBranch,
    harmonizedBranch,
    targetOsVersion,
    // sdk has no framework version
    targetFrameworkVersion: type === 'sdk' ? '' : targetFrameworkVersion
  };
}

module.exports = { validateLibrary, VALID_TYPES };
