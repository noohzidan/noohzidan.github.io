// ===== mobile nav toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const shell = document.querySelector('.shell');
  const toggle = document.querySelector('.mobile-toggle');
  const scrim = document.querySelector('.scrim');

  if (toggle && shell) {
    toggle.addEventListener('click', () => shell.classList.toggle('nav-open'));
  }
  if (scrim && shell) {
    scrim.addEventListener('click', () => shell.classList.remove('nav-open'));
  }

  // close mobile nav on link click
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', () => shell && shell.classList.remove('nav-open'));
  });

  // ===== copy-to-clipboard for code blocks =====
  document.querySelectorAll('.prose pre').forEach(pre => {
    if (pre.closest('.codeblock')) return; // already wrapped
    const wrapper = document.createElement('div');
    wrapper.className = 'codeblock';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'copy';
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code') || pre;
      navigator.clipboard.writeText(code.innerText).then(() => {
        btn.textContent = 'copied';
        setTimeout(() => (btn.textContent = 'copy'), 1400);
      });
    });
    wrapper.appendChild(btn);
  });

  // ===== mark active nav link based on current path =====
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
