(function () {

  /* ── Elements ── */
  const hamburgerBtn     = document.getElementById('hamburgerBtn');
  const mobilePanel      = document.getElementById('mobilePanel');
  const menuOverlay      = document.getElementById('menuOverlay');
  const accountBox       = document.getElementById('account');
  const openAccountDesk  = document.getElementById('openAccountDesktop');
  const openAccountMob   = document.getElementById('openAccountMobile');
  const quitaccount      = document.getElementById('quitaccount');
  const quitaccountlogin = document.getElementById('quitaccountlogin');
  const signupForm       = document.getElementById('signup');
  const loginForm        = document.getElementById('login');
  const openlogin        = document.getElementById('openlogin');
  const opensignup       = document.getElementById('opensignup');
  const mainContent      = document.getElementById('mainContent');
  const heroSell         = document.getElementById('heroSell');

  /* ── Mobile menu ── */
  function openMenu() {
    hamburgerBtn.classList.add('active');
    mobilePanel.classList.add('open');
    menuOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    mobilePanel.classList.remove('open');
    menuOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    mobilePanel.classList.contains('open') ? closeMenu() : openMenu();
  });

  menuOverlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      hideAuth();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 850) closeMenu();
  });

  /* ── Auth modal ── */
  function showAuth() {
    accountBox.classList.add('show-modal');
    // default: show signup, hide login
    signupForm.style.display = '';
    loginForm.style.display  = 'none';
  }

  function hideAuth() {
    accountBox.classList.remove('show-modal');
  }

  if (openAccountDesk)  openAccountDesk.addEventListener('click',  function (e) { e.preventDefault(); showAuth(); });
  if (openAccountMob)   openAccountMob.addEventListener('click',   function (e) { e.preventDefault(); closeMenu(); showAuth(); });
  if (quitaccount)      quitaccount.addEventListener('click',      hideAuth);
  if (quitaccountlogin) quitaccountlogin.addEventListener('click', hideAuth);

  accountBox.addEventListener('click', function (e) {
    if (e.target === accountBox) hideAuth();
  });

  if (openlogin) {
    openlogin.addEventListener('click', function () {
      signupForm.style.display = 'none';
      loginForm.style.display  = '';
    });
  }

  if (opensignup) {
    opensignup.addEventListener('click', function () {
      loginForm.style.display  = 'none';
      signupForm.style.display = '';
    });
  }

  /* Hero "Start Selling" → open auth */
  if (heroSell) heroSell.addEventListener('click', showAuth);

  /* ── Tab navigation ── */
  function activateTab(tabId) {
    // Show main content area, hide hero
    mainContent.style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.querySelector('.ticker').style.display = 'none';

    // Deactivate all tab panes & buttons
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(a => a.classList.remove('active-tab'));

    // Activate the right pane
    const pane = document.getElementById('tab-' + tabId);
    if (pane) pane.classList.add('active-pane');

    // Activate matching tab button & nav link
    document.querySelectorAll('.tab-btn[data-tab="' + tabId + '"]').forEach(b => b.classList.add('active'));
    document.querySelectorAll('.nav-tab[data-tab="' + tabId + '"]').forEach(a => a.classList.add('active-tab'));

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Wire up all elements with data-tab
  document.querySelectorAll('[data-tab]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const tab = el.getAttribute('data-tab');
      if (tab) {
        closeMenu();
        activateTab(tab);
      }
    });
  });

  // Logo click → back to hero
  document.querySelector('.logo').addEventListener('click', function () {
    mainContent.style.display = 'none';
    document.getElementById('home').style.display = '';
    document.querySelector('.ticker').style.display = '';
    document.querySelectorAll('.nav-tab').forEach(a => a.classList.remove('active-tab'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  });

})();
