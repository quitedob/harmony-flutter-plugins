/**
 * Scroll-aware compact mode for the detail page header.
 * Shrinks the header when the active content area is scrolled past a threshold.
 *
 * Uses a lock to prevent oscillation: toggling compact changes the layout height,
 * which can push content across the overflow boundary, causing scrollTop to
 * fluctuate and the compact class to toggle in an infinite loop.
 * Once compact is entered, it stays locked until a view/panel switch resets it.
 */

let _compactRaf = null;
let _compactLocked = false;

export function updateCompact() {
  const main = document.querySelector('.detail-main');
  if (!main) return;

  if (_compactLocked) {
    main.classList.add('compact');
    return;
  }

  let scrollTop = 0;

  const isOverview = document.getElementById('panelOverview').classList.contains('active');
  if (isOverview) {
    const el = document.querySelector('.overview-scroll');
    if (el) scrollTop = el.scrollTop;
  } else {
    const reportActive = document.getElementById('reportView').classList.contains('active');
    const prdActive = document.getElementById('prdView').classList.contains('active');
    if (reportActive || prdActive) {
      const container = reportActive
        ? document.querySelector('#reportView .report-scroll')
        : document.querySelector('#prdView .report-scroll');
      if (container) scrollTop = container.scrollTop;
    } else {
      const el = document.getElementById('stageLogOutput');
      if (el && el.style.display !== 'none') scrollTop = el.scrollTop;
    }
  }

  if (scrollTop > 50) {
    _compactLocked = true;
  }

  main.classList.toggle('compact', _compactLocked);
}

export function resetCompact() {
  _compactLocked = false;
  const main = document.querySelector('.detail-main');
  if (main) main.classList.remove('compact');
}

function _onContentScroll() {
  if (_compactRaf) return;
  _compactRaf = requestAnimationFrame(() => {
    _compactRaf = null;
    updateCompact();
  });
}

export function setupScrollListeners() {
  const opts = { passive: true };
  const overviewScroll = document.querySelector('.overview-scroll');
  if (overviewScroll) overviewScroll.addEventListener('scroll', _onContentScroll, opts);

  document.querySelectorAll('.report-scroll').forEach(el => {
    el.addEventListener('scroll', _onContentScroll, opts);
  });

  const logOutput = document.getElementById('stageLogOutput');
  if (logOutput) logOutput.addEventListener('scroll', _onContentScroll, opts);
}
