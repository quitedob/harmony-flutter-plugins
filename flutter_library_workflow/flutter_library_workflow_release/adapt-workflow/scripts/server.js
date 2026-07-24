#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const path = require('path');

const IS_WIN = process.platform === 'win32';
const PORT = 3020;
const SERVER_PATH = path.join(__dirname, '..', 'server.js');

function findProcessOnPort(port) {
  try {
    if (IS_WIN) {
      const result = execSync(
        `netstat -ano | findstr :${port} | findstr LISTENING`,
        { encoding: 'utf8' }
      ).trim();
      if (!result) return [];
      const pids = new Set();
      for (const line of result.split('\n')) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && /^\d+$/.test(pid)) pids.add(pid);
      }
      return [...pids];
    } else {
      const result = execSync(`lsof -ti:${port}`, { encoding: 'utf8' }).trim();
      return result ? result.split('\n') : [];
    }
  } catch (error) {
    return [];
  }
}

function sleepSync(ms) {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  } catch (e) {
    const end = Date.now() + ms;
    while (Date.now() < end) { /* busy-wait fallback */ }
  }
}

function killProcess(pid) {
  try {
    if (IS_WIN) {
      try {
        execSync(`taskkill /PID ${pid} /F /T`, { stdio: 'ignore' });
        console.log(`已终止进程 ${pid}`);
        return true;
      } catch (e) {
        console.error(`终止进程 ${pid} 失败:`, e.message);
        return false;
      }
    }

    process.kill(pid, 'SIGTERM');
    console.log(`已发送终止信号到进程 ${pid}`);

    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      try {
        process.kill(pid, 0);
        attempts++;
        sleepSync(500);
      } catch (e) {
        console.log(`进程 ${pid} 已成功终止`);
        return true;
      }
    }

    try {
      process.kill(pid, 'SIGKILL');
      console.log(`强制终止进程 ${pid}`);
      return true;
    } catch (e) {
      return false;
    }
  } catch (error) {
    console.error(`终止进程 ${pid} 失败:`, error.message);
    return false;
  }
}

function stopServer() {
  console.log(`检查端口 ${PORT}...`);
  const pids = findProcessOnPort(PORT);

  if (pids.length === 0) {
    console.log(`端口 ${PORT} 未被占用`);
    return true;
  }

  console.log(`发现 ${pids.length} 个进程占用端口 ${PORT}`);

  let allKilled = true;
  for (const pid of pids) {
    if (!killProcess(pid)) {
      allKilled = false;
    }
  }

  return allKilled;
}

function startServer() {
  console.log('启动服务器...');

  const server = spawn('node', [SERVER_PATH], {
    stdio: 'inherit',
    detached: false
  });

  server.on('error', (error) => {
    console.error('启动服务器失败:', error.message);
    process.exit(1);
  });

  server.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`服务器异常退出，代码: ${code}`);
      process.exit(code);
    }
  });

  function shutdown() {
    console.log('\n正在关闭服务器...');
    if (IS_WIN) {
      try {
        execSync(`taskkill /PID ${server.pid} /F /T`, { stdio: 'ignore' });
      } catch {}
    } else {
      server.kill('SIGTERM');
    }
    process.exit(0);
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  if (IS_WIN) {
    process.on('SIGHUP', shutdown);
  }
}

function restartServer() {
  console.log('重启服务器...');
  stopServer();
  startServer();
}

const command = process.argv[2];

switch (command) {
  case 'start':
    startServer();
    break;
  case 'stop':
    stopServer();
    process.exit(0);
    break;
  case 'restart':
    restartServer();
    break;
  default:
    console.log('用法: node scripts/server.js [start|stop|restart]');
    console.log('  start   - 启动服务器');
    console.log('  stop    - 停止服务器');
    console.log('  restart - 重启服务器（先停止再启动）');
    process.exit(1);
}
