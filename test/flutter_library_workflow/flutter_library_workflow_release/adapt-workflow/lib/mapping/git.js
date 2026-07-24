'use strict';

const fsSync = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { IS_WIN } = require('../platform');

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      cwd,
      shell: IS_WIN,
      stdio: ['ignore', 'pipe', 'pipe']
    });
    let out = '';
    let err = '';
    proc.stdout.on('data', c => { out += c.toString(); });
    proc.stderr.on('data', c => { err += c.toString(); });
    proc.on('close', (code) => {
      if (code === 0) return resolve({ out, err });
      reject(new Error(`${cmd} ${args.join(' ')} failed (code=${code}): ${err || out}`));
    });
    proc.on('error', (e) => reject(e));
  });
}

async function ensureRepoCloned(repoDir, gitUrl) {
  if (fsSync.existsSync(path.join(repoDir, '.git'))) return;
  await run('git', ['clone', gitUrl, repoDir], process.cwd());
}

async function fetchAll(repoDir) {
  await run('git', ['fetch', '--all', '--prune'], repoDir);
}

async function checkout(repoDir, ref) {
  if (!ref) return;
  await run('git', ['checkout', ref], repoDir);
}

module.exports = { run, ensureRepoCloned, fetchAll, checkout };

