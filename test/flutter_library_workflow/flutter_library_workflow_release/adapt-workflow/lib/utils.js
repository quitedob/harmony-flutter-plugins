function stripAnsi(str) {
  return str
    .replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~]|\].*?(?:\x07|\x1B\\))/g, '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '');
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function isValidRepoUrl(url) {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'git:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function sanitizeRepoName(name) {
  return name.replace(/-/g, '_');
}

/**
 * Parse a GitHub/GitLab URL that may contain /tree/{branch}/{path} segments.
 * Returns { repoUrl, packagePath, sourceBranch } with monorepo parts extracted.
 *
 * Examples:
 *   "https://github.com/user/repo/tree/main/packages/foo"
 *     → { repoUrl: "https://github.com/user/repo", packagePath: "packages/foo", sourceBranch: "main" }
 *   "https://github.com/user/repo/tree/next/packages/base"
 *     → { repoUrl: "https://github.com/user/repo", packagePath: "packages/base", sourceBranch: "next" }
 *   "https://github.com/user/repo"
 *     → { repoUrl: "https://github.com/user/repo", packagePath: "", sourceBranch: "" }
 */
function parseMonorepoUrl(url) {
  const treeMatch = url.match(/^(https?:\/\/[^/]+\/[^/]+\/[^/]+)\/tree\/([^/]+)\/(.+)$/);
  if (treeMatch) {
    return {
      repoUrl: treeMatch[1],
      sourceBranch: treeMatch[2],
      packagePath: treeMatch[3].replace(/\/+$/, '')
    };
  }
  return { repoUrl: url, sourceBranch: '', packagePath: '' };
}

module.exports = {
  stripAnsi,
  generateId,
  isValidRepoUrl,
  sanitizeRepoName,
  parseMonorepoUrl
};
