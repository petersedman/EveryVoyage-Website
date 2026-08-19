// Navigation - dynamically injected for consistency across pages
(function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isIndex = currentPage === 'index.html' || currentPage === '';

  // Helper to get correct href for index page vs other pages
  const href = (path) => {
    if (path.startsWith('#')) {
      return isIndex ? path : `index.html${path}`;
    }
    return path;
  };

  // Check if link is active
  const isActive = (page) => {
    if (page === 'index.html') return isIndex;
    return currentPage === page;
  };

  // Desktop nav links
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.innerHTML = `
      <li><a href="${href('#features')}">Features</a></li>
      <li><a href="${href('#how-it-works')}">How It Works</a></li>
      <li><a href="about"${isActive('about.html') ? ' class="active"' : ''}>About</a></li>
      <li><a href="faq"${isActive('faq.html') ? ' class="active"' : ''}>FAQ</a></li>
      <li><a href="contact"${isActive('contact.html') ? ' class="active"' : ''}>Contact</a></li>
      <li><a href="${href('#download')}" class="nav-cta">Download</a></li>
      <li>
        <div class="lang-switcher" id="langSwitcher">
          <button class="lang-switcher-btn" aria-label="Change language">
            EN
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="lang-dropdown">
            <a href="index" class="active">English (UK)</a>
            <a href="en-us/index">English (US)</a>
            <a href="es/index">Español</a>
            <a href="de/index">Deutsch</a>
            <a href="sv/index">Svenska</a>
            <a href="it/index">Italiano</a>
            <a href="fr/index">Français</a>
            <a href="nl/index">Nederlands</a>
            <a href="da/index">Dansk</a>
            <a href="no/index">Norsk</a>
          </div>
        </div>
      </li>
    `;
  }

  // Mobile menu links
  const mobileMenuInner = document.getElementById('mobileMenuInner');
  if (mobileMenuInner) {
    mobileMenuInner.innerHTML = `
      <hr class="mobile-divider">
      <a href="${href('#features')}">Features</a>
      <a href="${href('#how-it-works')}">How It Works</a>
      <a href="about"${isActive('about.html') ? ' class="active"' : ''}>About</a>
      <a href="faq"${isActive('faq.html') ? ' class="active"' : ''}>FAQ</a>
      <a href="contact"${isActive('contact.html') ? ' class="active"' : ''}>Contact</a>
      <hr class="mobile-divider">
      <a href="${href('#download')}" class="mobile-cta">Download</a>
      <hr class="mobile-divider">
      <div class="mobile-lang-switch">
        <a href="index" class="active">UK</a>
        <a href="en-us/index">US</a>
        <a href="es/index">ES</a>
        <a href="de/index">DE</a>
        <a href="sv/index">SV</a>
        <a href="it/index">IT</a>
        <a href="fr/index">FR</a>
        <a href="nl/index">NL</a>
        <a href="da/index">DA</a>
        <a href="no/index">NO</a>
      </div>
    `;
  }
})();

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

function openMenu(){
  document.body.classList.add('menu-open');
  navToggle.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-label', 'Close menu');
}

function closeMenu(){
  document.body.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-label', 'Open menu');
}

navToggle?.addEventListener('click', () => {
  document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
});

mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu();
});
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMenu();
});

// Language switcher toggle
const langSwitcher = document.getElementById('langSwitcher');
const langBtn = langSwitcher?.querySelector('.lang-switcher-btn');

langBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  langSwitcher.classList.toggle('open');
});

document.addEventListener('click', () => {
  langSwitcher?.classList.remove('open');
});
