document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });


  const navLinks = Array.from(document.querySelectorAll('header nav a'));
  const sections = navLinks
    .map(a => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  function onScroll() {
    const scrollPos = window.scrollY + (window.innerHeight / 3);
    let current = sections[0];
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) current = sec;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href').slice(1) === current.id));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const revealEls = document.querySelectorAll('section, .project-card, header');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
  function createModal() {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="project-modal__backdrop"></div>
      <div class="project-modal__panel" role="dialog" aria-modal="true">
        <button class="project-modal__close" aria-label="Close project">✕</button>
        <div class="project-modal__content"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.project-modal__close').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.project-modal__backdrop').addEventListener('click', () => closeModal(modal));
    return modal;
  }

  function openModal(contentHtml) {
    let modal = document.querySelector('.project-modal');
    if (!modal) modal = createModal();
    modal.querySelector('.project-modal__content').innerHTML = contentHtml;
    modal.classList.add('open');
    const focusable = modal.querySelector('.project-modal__close');
    if (focusable) focusable.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) modal = document.querySelector('.project-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const title = card.querySelector('h3') ? card.querySelector('h3').innerText : 'Project';
      const desc = card.querySelector('p') ? card.querySelector('p').innerText : '';
      const content = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(desc)}</p>`;
      openModal(content);
    });
  });
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  themeToggle.innerText = '🌓';
  const header = document.querySelector('header');
  if (header) header.appendChild(themeToggle);

  const storedTheme = localStorage.getItem('site-theme');
  if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);

  themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
  });
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const upBtn = document.createElement('button');
  upBtn.className = 'back-to-top';
  upBtn.title = 'Back to top';
  upBtn.innerText = '↑';
  document.body.appendChild(upBtn);
  upBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    upBtn.classList.toggle('visible', window.scrollY > window.innerHeight / 2);
  }, { passive: true });

});

