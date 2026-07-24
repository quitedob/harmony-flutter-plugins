// 全局一级模块切换栏：在每个页面 header 的 #moduleNav 挂载点注入
// [适配 | 升级]，并按 location.pathname / ?profileId= 高亮当前模块。
// 升级详情页复用 /detail.html（链接带 ?profileId=<...-upgrade>），所以仅靠 pathname
// 无法区分——这里同时看 profileId 是否以 -upgrade 结尾。
// 纯前端导航，各页只需提供 <div id="moduleNav"></div>
// 并引入本脚本（<script type="module" src="js/module-nav.js"></script>）。

const _navParams = new URLSearchParams(location.search);
const _navPid = _navParams.get('profileId') || _navParams.get('profile') || _navParams.get('p');
function isUpgradeContext(pathname) {
  if (_navPid) return _navPid.endsWith('-upgrade');
  return pathname.startsWith('/upgrade');
}

const MODULES = [
  { label: '适配', href: '/', match: (p) => !isUpgradeContext(p) && (p === '/' || p === '/index.html' || p.startsWith('/detail')) },
  { label: '升级', href: '/upgrade.html', match: (p) => isUpgradeContext(p) }
];

export function renderModuleNav() {
  const mount = document.getElementById('moduleNav');
  if (!mount) return;
  const path = location.pathname;
  mount.className = 'module-nav';
  mount.innerHTML = MODULES.map(m =>
    `<a class="module-nav-btn${m.match(path) ? ' active' : ''}" href="${m.href}">${m.label}</a>`
  ).join('');
}

renderModuleNav();
