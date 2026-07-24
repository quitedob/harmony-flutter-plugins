import * as api from './api.js';
import { showError } from './utils.js';
import { STAGE_IDS, STAGE_SHORT_NAMES } from './profile-store.js';

const TIER_LABELS = {
  high: { name: '高', badge: 'high' },
  medium: { name: '中', badge: 'medium' },
  low: { name: '低', badge: 'low' },
  multimodal: { name: '多模态', badge: 'multimodal' },
};

const CONCURRENCY_OPTIONS = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30];

function concurrencyOptions() {
  return CONCURRENCY_OPTIONS.map(value => `<option value="${value}">${value}</option>`).join('');
}

function getEl(id) {
  return document.getElementById(id);
}

function valueOf(id, fallback = '') {
  const el = getEl(id);
  return el ? el.value : fallback;
}

function checkedOf(id, fallback = false) {
  const el = getEl(id);
  return el ? el.checked : fallback;
}

function setChecked(id, value) {
  const el = getEl(id);
  if (el) el.checked = value;
}

function setValue(id, value) {
  const el = getEl(id);
  if (el) el.value = value;
}

function ensureSettingsModal() {
  if (getEl('settingsModal')) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div id="settingsModal" class="modal-overlay">
      <div class="modal-content modal-settings">
        <div class="modal-header">
          <h2>系统设置</h2>
          <button class="modal-close" id="settingsModalClose" aria-label="关闭">&times;</button>
        </div>
        <div class="modal-body">
          <div class="settings-form">
            <div class="settings-section">
              <h3>模型层级配置</h3>
              <p class="form-hint" style="margin-bottom:12px">配置四个层级分别对应的具体模型，所有 Agent 根据层级自动获取模型</p>
              <div id="modelTiersGrid" class="model-tiers-grid"></div>
              <div style="margin-top:8px;text-align:right">
                <button class="btn btn-secondary btn-small" id="resetModelTiersBtn" type="button">恢复默认</button>
              </div>
            </div>
            <div class="settings-section">
              <h3>AI 后端</h3>
              <div class="form-group">
                <label for="agentBackend">全局默认后端</label>
                <select id="agentBackend" class="form-select">
                  <option value="opencode">OpenCode</option>
                  <option value="claude-code">Claude Code</option>
                  <option value="cline">Cline CLI</option>
                </select>
                <p class="form-hint">所有阶段默认使用的 AI 执行引擎</p>
              </div>
              <div class="form-group">
                <label>按阶段覆盖</label>
                <p class="form-hint">为特定阶段指定不同的后端，留空则使用全局默认</p>
                <div class="stage-backend-grid" id="stageBackendGrid"></div>
              </div>
              <div class="form-group">
                <label for="shellMode">使用 Shell</label>
                <select id="shellMode" class="form-select">
                  <option value="default">默认</option>
                  <option value="yes">是</option>
                  <option value="no">否</option>
                </select>
                <p class="form-hint">默认：Claude Code 不使用 Shell，其他后端在 Windows 使用 Shell。</p>
              </div>
            </div>
            <div class="settings-section">
              <h3>阶段启用控制</h3>
              <p class="form-hint" style="margin-bottom:12px">禁用后流水线中不显示这些阶段，执行时自动跳过</p>
              <div class="stage-enable-group" style="margin-bottom:16px">
                <p class="form-hint" style="font-weight:500;margin-bottom:8px">Flutter 插件适配</p>
                <div class="stage-enable-grid">
                  <label class="checkbox-label"><input type="checkbox" id="enableTestDesign" checked><span>用例设计</span><span class="stage-id-hint">(test-design)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableDemoGen" checked><span>DEMO生成</span><span class="stage-id-hint">(demo-gen)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableBlackboxVerify" checked><span>黑盒验证</span><span class="stage-id-hint">(blackbox-verify)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableQualityReview" checked><span>质量审查</span><span class="stage-id-hint">(quality-review)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableQualityFix" checked><span>质量修复</span><span class="stage-id-hint">(quality-fix)</span></label>
                </div>
              </div>
              <div class="stage-enable-group" style="margin-bottom:16px">
                <p class="form-hint" style="font-weight:500;margin-bottom:8px">Android SDK 适配</p>
                <div class="stage-enable-grid">
                  <label class="checkbox-label"><input type="checkbox" id="enableSdkTestDesign" checked><span>用例设计</span><span class="stage-id-hint">(sdk-test-design)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableSdkCaseConfrontation" checked><span>用例对抗验证</span><span class="stage-id-hint">(sdk-case-confrontation)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableSdkDemoGen" checked><span>DEMO生成</span><span class="stage-id-hint">(sdk-demo-gen)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableSdkBlackboxVerify" checked><span>黑盒验证</span><span class="stage-id-hint">(sdk-blackbox-verify)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableSdkQualityReview" checked><span>质量审查</span><span class="stage-id-hint">(sdk-quality-review)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableSdkQualityFix" checked><span>质量修复</span><span class="stage-id-hint">(sdk-quality-fix)</span></label>
                </div>
              </div>
              <div class="stage-enable-group" style="margin-bottom:16px">
                <p class="form-hint" style="font-weight:500;margin-bottom:8px">React Native 鸿蒙化</p>
                <div class="stage-enable-grid">
                  <label class="checkbox-label"><input type="checkbox" id="enableRnTestDesign" checked><span>用例设计</span><span class="stage-id-hint">(test-design)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableRnDemoGen" checked><span>DEMO生成</span><span class="stage-id-hint">(demo-gen)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableRnBlackboxVerify" checked><span>黑盒验证</span><span class="stage-id-hint">(blackbox-verify)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableRnTestReport" checked><span>测试报告</span><span class="stage-id-hint">(test-report)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableRnQualityReview" checked><span>质量审查</span><span class="stage-id-hint">(rn-quality-review)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableRnQualityFix" checked><span>质量修复</span><span class="stage-id-hint">(rn-quality-fix)</span></label>
                </div>
              </div>
              <div class="stage-enable-group">
                <p class="form-hint" style="font-weight:500;margin-bottom:8px">React Native 鸿蒙化（高效流程版）<span class="stage-id-hint">— 默认关闭，按需开启</span></p>
                <div class="stage-enable-grid">
                  <label class="checkbox-label"><input type="checkbox" id="enableRnFastTestDesign"><span>用例设计</span><span class="stage-id-hint">(test-design)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableRnFastDemoGen"><span>DEMO生成</span><span class="stage-id-hint">(demo-gen)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableRnFastBlackboxVerify"><span>黑盒验证</span><span class="stage-id-hint">(blackbox-verify)</span></label>
                  <label class="checkbox-label"><input type="checkbox" id="enableRnFastTestReport"><span>测试报告</span><span class="stage-id-hint">(test-report)</span></label>
                </div>
              </div>
            </div>
            <div class="settings-section">
              <h3>并发控制</h3>
              <div class="form-group">
                <label for="maxAgentConcurrency">适配最大并发数</label>
                <select id="maxAgentConcurrency" class="form-select">
                  ${concurrencyOptions()}
                </select>
                <p class="form-hint">同时执行适配任务的插件数量（每个任务会消耗较多内存和 API 额度）</p>
              </div>
              <div class="form-group">
                <label for="upgradeMaxConcurrency">升级最大并发数</label>
                <select id="upgradeMaxConcurrency" class="form-select">
                  ${concurrencyOptions()}
                </select>
                <p class="form-hint">升级列表页同时运行的库数量</p>
              </div>
              <div class="form-group">
                <label for="maxCloneConcurrency">Clone 最大并发数</label>
                <select id="maxCloneConcurrency" class="form-select">
                  <option value="3">3</option><option value="5">5</option><option value="8">8</option><option value="10">10</option>
                </select>
                <p class="form-hint">批量克隆时的并发 git clone 数</p>
              </div>
            </div>
            <div class="settings-section">
              <h3>React Native 鸿蒙化</h3>
              <div class="form-group">
                <label for="ohosNpmScope">鸿蒙 npm scope</label>
                <input type="text" id="ohosNpmScope" class="form-input" placeholder="@oh-rn">
                <p class="form-hint">
                  生成 <code>ohos/package.json</code>、Example 依赖、CMake/ETS import 时使用的包名前缀。
                  默认 <code>@oh-rn</code>；与已发布到 npm 的 <code>@react-native-oh-tpl/*</code> 生态并存时，查表库仍用原 scope，仅新适配工程使用此处配置。
                  环境变量 <code>RN_OHOS_NPM_SCOPE</code> 可覆盖（Agent 执行时由面板自动注入）。
                </p>
              </div>
            </div>
            <div class="settings-section">
              <h3>GitHub 同步</h3>
              <div class="form-group">
                <label for="githubToken">GitHub Token</label>
                <input type="password" id="githubToken" class="form-input" placeholder="ghp_xxxx...">
                <p class="form-hint" id="githubTokenHint">用于将适配代码推送到目标组织。需要 repo 权限的 PAT</p>
              </div>
            </div>
            <div class="settings-section">
              <h3>代理设置</h3>
              <div class="form-group">
                <label class="checkbox-label"><input type="checkbox" id="proxyEnabled"><span>启用代理</span></label>
                <p class="form-hint">启用后将使用代理访问 Git 仓库</p>
              </div>
              <div id="proxyFields" class="proxy-fields">
                <div class="form-group"><label for="httpProxy">HTTP Proxy</label><input type="text" id="httpProxy" placeholder="http://127.0.0.1:7890"></div>
                <div class="form-group"><label for="httpsProxy">HTTPS Proxy</label><input type="text" id="httpsProxy" placeholder="http://127.0.0.1:7890"></div>
              </div>
            </div>
            <div class="settings-section">
              <h3>鸿蒙签名（本机）</h3>
              <div class="form-group">
                <p class="form-hint" style="line-height:1.6;">
                  只需填一份 <code>adapt-workflow/data/signing.local.json</code>（复制自同目录 <code>signing.example.json</code>），
                  写入证书 <code>.p12 / .p7b / .cer</code> 路径、密码、bundleName。<br>
                  testing 阶段启动前会自动执行 <code>bin/ohos-sync-build-profile.js</code>，把签名同步进各插件
                  <code>example/ohos/build-profile.json5</code>，hvigor 直接出签名包；Agent 照常写
                  <code>flutter build hap</code> / <code>hdc install</code> 即可。<br>
                  <strong>java / hdc</strong> 仅用于自检与 <code>hdc install</code> 探测（优先 DevEco Studio 自带 JBR 与 SDK toolchains）。
                  不需要 <code>export JAVA_HOME</code> 或把 <code>hdc</code> 配进 PATH。<br>
                  签名证书 / 密码只留在本机，<strong>不入仓库</strong>。<br>
                  自检：<code>node adapt-workflow/bin/ohos-build-install.js --mode=check</code>；
                  详见 <code>adapt-workflow/docs/ohos-signing.md</code>。
                </p>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button class="btn btn-secondary" id="cancelSettingsBtn">取消</button>
            <button class="btn btn-primary" id="saveSettingsBtn">保存</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper.firstElementChild);
}

function buildStageBackendGrid(stageBackends = {}) {
  const grid = getEl('stageBackendGrid');
  if (!grid) return;
  const stageIds = Array.isArray(STAGE_IDS) ? STAGE_IDS : [];
  grid.innerHTML = stageIds.map((id, index) => {
    const val = stageBackends[id] || '';
    const name = STAGE_SHORT_NAMES[id] || id;
    const num = String(index + 1).padStart(2, '0');
    return `<div class="stage-backend-row">
      <span class="stage-backend-label">${num} - ${name}</span>
      <select class="form-select form-select-sm" data-stage="${id}">
        <option value=""${val === '' ? ' selected' : ''}>跟随全局</option>
        <option value="opencode"${val === 'opencode' ? ' selected' : ''}>OpenCode</option>
        <option value="claude-code"${val === 'claude-code' ? ' selected' : ''}>Claude Code</option>
        <option value="cline"${val === 'cline' ? ' selected' : ''}>Cline CLI</option>
      </select>
    </div>`;
  }).join('');
}

function applyHighTierToAll() {
  const backends = ['opencode', 'claude-code', 'cline'];
  for (const backend of backends) {
    const source = document.querySelector(`#modelTiersGrid input[data-tier="high"][data-backend="${backend}"]`);
    if (!source) continue;
    for (const tier of ['medium', 'low', 'multimodal']) {
      const target = document.querySelector(`#modelTiersGrid input[data-tier="${tier}"][data-backend="${backend}"]`);
      if (target) target.value = source.value;
    }
  }
}

function renderModelTiersGrid(config) {
  const grid = getEl('modelTiersGrid');
  if (!grid) return;
  const tiers = config.tiers || {};
  grid.innerHTML = `
    <div class="tier-header"></div>
    <div class="tier-header">OpenCode</div>
    <div class="tier-header">Claude Code</div>
    <div class="tier-header">Cline</div>
    <div class="tier-header"></div>
  `;
  for (const [key, meta] of Object.entries(TIER_LABELS)) {
    const t = tiers[key] || {};
    const action = key === 'high'
      ? '<button class="btn btn-secondary btn-small tier-apply-all" type="button" id="applyHighTierToAllBtn">应用全部</button>'
      : '<span></span>';
    grid.innerHTML += `
      <div class="tier-label"><span class="tier-badge tier-badge-${meta.badge}"></span>${meta.name}</div>
      <input type="text" data-tier="${key}" data-backend="opencode" value="${t.opencode || ''}" placeholder="provider/model">
      <input type="text" data-tier="${key}" data-backend="claude-code" value="${t['claude-code'] || ''}" placeholder="sonnet / haiku / opus">
      <input type="text" data-tier="${key}" data-backend="cline" value="${t.cline || ''}" placeholder="model id">
      ${action}
    `;
  }
  getEl('applyHighTierToAllBtn')?.addEventListener('click', applyHighTierToAll);
}

async function saveModelTiers() {
  const tiers = {};
  document.querySelectorAll('#modelTiersGrid input[data-tier]').forEach(el => {
    const tier = el.dataset.tier;
    const backend = el.dataset.backend;
    if (!tiers[tier]) tiers[tier] = {};
    tiers[tier][backend] = el.value.trim();
  });
  await fetch('/api/model-tiers', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tiers })
  });
}

async function resetModelTiers() {
  try {
    const res = await fetch('/api/model-tiers/reset', { method: 'POST' });
    const data = await res.json();
    renderModelTiersGrid(data.config || data);
  } catch (error) {
    showError('重置模型配置失败: ' + error.message);
  }
}

async function openSettings() {
  ensureSettingsModal();

  try {
    const tierConfig = await fetch('/api/model-tiers').then(r => r.json());
    renderModelTiersGrid(tierConfig);
  } catch (error) {
    console.error('加载模型层级配置失败:', error);
    renderModelTiersGrid({ tiers: {} });
  }

  try {
    const settings = await api.fetchSettings();
    setChecked('proxyEnabled', settings.proxy?.enabled || false);
    setValue('httpProxy', settings.proxy?.http || 'http://127.0.0.1:7890');
    setValue('httpsProxy', settings.proxy?.https || 'http://127.0.0.1:7890');
    const proxyFields = getEl('proxyFields');
    if (proxyFields) proxyFields.style.display = checkedOf('proxyEnabled') ? 'block' : 'none';

    setValue('agentBackend', settings.agentBackend || 'opencode');
    setValue('shellMode', settings.shellMode || 'default');
    setValue('maxAgentConcurrency', String(settings.maxAgentConcurrency || 3));
    setValue('upgradeMaxConcurrency', String(settings.upgradeMaxConcurrency || 1));
    setValue('maxCloneConcurrency', String(settings.maxCloneConcurrency || 5));
    setValue('githubToken', settings.githubToken || '');
    setValue('ohosNpmScope', settings.ohosNpmScope || '@oh-rn');

    const enabledStages = settings.enabledStages || {};
    setChecked('enableTestDesign', enabledStages.testDesign !== false);
    setChecked('enableDemoGen', enabledStages.demoGen !== false);
    setChecked('enableBlackboxVerify', enabledStages.blackboxVerify !== false);
    setChecked('enableQualityReview', enabledStages.qualityReview !== false);
    setChecked('enableQualityFix', enabledStages.qualityFix !== false);
    setChecked('enableSdkTestDesign', enabledStages.sdkTestDesign !== false);
    setChecked('enableSdkCaseConfrontation', enabledStages.sdkCaseConfrontation !== false);
    setChecked('enableSdkDemoGen', enabledStages.sdkDemoGen !== false);
    setChecked('enableSdkBlackboxVerify', enabledStages.sdkBlackboxVerify !== false);
    setChecked('enableSdkQualityReview', enabledStages.sdkQualityReview !== false);
    setChecked('enableSdkQualityFix', enabledStages.sdkQualityFix !== false);
    setChecked('enableRnTestDesign', enabledStages.rnTestDesign !== false);
    setChecked('enableRnDemoGen', enabledStages.rnDemoGen !== false);
    setChecked('enableRnBlackboxVerify', enabledStages.rnBlackboxVerify !== false);
    setChecked('enableRnTestReport', enabledStages.rnTestReport !== false);
    setChecked('enableRnFastTestDesign', enabledStages.rnFastTestDesign === true);
    setChecked('enableRnFastDemoGen', enabledStages.rnFastDemoGen === true);
    setChecked('enableRnFastBlackboxVerify', enabledStages.rnFastBlackboxVerify === true);
    setChecked('enableRnFastTestReport', enabledStages.rnFastTestReport === true);
    setChecked('enableRnQualityReview', enabledStages.rnQualityReview !== false);
    setChecked('enableRnQualityFix', enabledStages.rnQualityFix !== false);

    buildStageBackendGrid(settings.stageBackends || {});
  } catch (error) {
    setChecked('proxyEnabled', false);
    setValue('httpProxy', 'http://127.0.0.1:7890');
    setValue('httpsProxy', 'http://127.0.0.1:7890');
    const proxyFields = getEl('proxyFields');
    if (proxyFields) proxyFields.style.display = 'none';
    setValue('agentBackend', 'opencode');
    setValue('shellMode', 'default');
    setValue('maxAgentConcurrency', '3');
    setValue('upgradeMaxConcurrency', '1');
    setValue('maxCloneConcurrency', '5');
    setValue('githubToken', '');
    setValue('ohosNpmScope', '@oh-rn');
    buildStageBackendGrid({});
  }

  const modal = getEl('settingsModal');
  modal.classList.add('visible');
  modal.style.display = 'block';
}

function closeSettings() {
  const modal = getEl('settingsModal');
  if (!modal) return;
  modal.classList.remove('visible');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 200);
}

async function saveSettings(onSaved) {
  const stageBackends = {};
  document.querySelectorAll('#stageBackendGrid select[data-stage]').forEach(sel => {
    if (sel.value) stageBackends[sel.dataset.stage] = sel.value;
  });

  const enabledStages = {
    testDesign: checkedOf('enableTestDesign', true),
    demoGen: checkedOf('enableDemoGen', true),
    blackboxVerify: checkedOf('enableBlackboxVerify', true),
    qualityReview: checkedOf('enableQualityReview', true),
    qualityFix: checkedOf('enableQualityFix', true),
    sdkTestDesign: checkedOf('enableSdkTestDesign', true),
    sdkCaseConfrontation: checkedOf('enableSdkCaseConfrontation', true),
    sdkDemoGen: checkedOf('enableSdkDemoGen', true),
    sdkBlackboxVerify: checkedOf('enableSdkBlackboxVerify', true),
    sdkQualityReview: checkedOf('enableSdkQualityReview', true),
    sdkQualityFix: checkedOf('enableSdkQualityFix', true),
    rnTestDesign: checkedOf('enableRnTestDesign', true),
    rnDemoGen: checkedOf('enableRnDemoGen', true),
    rnBlackboxVerify: checkedOf('enableRnBlackboxVerify', true),
    rnTestReport: checkedOf('enableRnTestReport', true),
    rnFastTestDesign: checkedOf('enableRnFastTestDesign', false),
    rnFastDemoGen: checkedOf('enableRnFastDemoGen', false),
    rnFastBlackboxVerify: checkedOf('enableRnFastBlackboxVerify', false),
    rnFastTestReport: checkedOf('enableRnFastTestReport', false),
    rnQualityReview: checkedOf('enableRnQualityReview', true),
    rnQualityFix: checkedOf('enableRnQualityFix', true)
  };

  let base = {};
  try {
    base = await api.fetchSettings();
  } catch (e) {
    console.warn('读取当前设置失败，将仅保存表单字段', e);
  }

  const settings = {
    ...base,
    proxy: {
      enabled: checkedOf('proxyEnabled', false),
      http: valueOf('httpProxy', 'http://127.0.0.1:7890').trim() || 'http://127.0.0.1:7890',
      https: valueOf('httpsProxy', 'http://127.0.0.1:7890').trim() || 'http://127.0.0.1:7890'
    },
    agentBackend: valueOf('agentBackend', 'opencode'),
    shellMode: valueOf('shellMode', 'default'),
    stageBackends,
    claudeCode: {
      ...(base.claudeCode || {}),
      skipPermissions: true
    },
    maxAgentConcurrency: parseInt(valueOf('maxAgentConcurrency', '3'), 10) || 3,
    upgradeMaxConcurrency: parseInt(valueOf('upgradeMaxConcurrency', '1'), 10) || 1,
    maxCloneConcurrency: parseInt(valueOf('maxCloneConcurrency', '5'), 10) || 5,
    githubToken: valueOf('githubToken').trim(),
    ohosNpmScope: valueOf('ohosNpmScope', '@oh-rn').trim() || '@oh-rn',
    enabledStages: {
      ...(base.enabledStages || {}),
      ...enabledStages
    }
  };

  try {
    await api.updateSettings(settings);
    await saveModelTiers();
    if (typeof onSaved === 'function') await onSaved(settings);
    closeSettings();
  } catch (error) {
    showError('保存设置失败: ' + error.message);
  }
}

let initialized = false;

export function initSettingsModal(options = {}) {
  ensureSettingsModal();
  if (initialized) return;
  initialized = true;

  const trigger = getEl(options.triggerId || 'settingsBtn');
  trigger?.addEventListener('click', openSettings);
  getEl('settingsModalClose')?.addEventListener('click', closeSettings);
  getEl('cancelSettingsBtn')?.addEventListener('click', closeSettings);
  getEl('saveSettingsBtn')?.addEventListener('click', () => saveSettings(options.onSaved));
  getEl('proxyEnabled')?.addEventListener('change', (e) => {
    const proxyFields = getEl('proxyFields');
    if (proxyFields) proxyFields.style.display = e.target.checked ? 'block' : 'none';
  });
  getEl('resetModelTiersBtn')?.addEventListener('click', resetModelTiers);
  window.addEventListener('click', (e) => {
    if (e.target === getEl('settingsModal')) closeSettings();
  });
}
