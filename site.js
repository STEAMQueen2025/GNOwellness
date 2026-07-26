// ===== GNO Health & Wellness — shared scripts =====

// Mobile menu
const mb = document.getElementById('menuBtn');
const nl = document.getElementById('navlinks');
if (mb && nl) {
  mb.addEventListener('click', () => {
    const open = nl.classList.toggle('open');
    mb.setAttribute('aria-expanded', open);
  });
  nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nl.classList.remove('open'); mb.setAttribute('aria-expanded', false);
  }));
}

// Programs dropdown (click/keyboard support for touch screens)
const dt = document.getElementById('dropToggle');
const dm = document.getElementById('dropMenu');
if (dt && dm) {
  dt.addEventListener('click', (e) => {
    // On small screens the menu is static; let the hash link work there.
    if (window.innerWidth > 760) {
      e.preventDefault();
      const open = dm.classList.toggle('open');
      dt.setAttribute('aria-expanded', open);
    }
  });
  document.addEventListener('click', (e) => {
    if (!dt.contains(e.target) && !dm.contains(e.target)) {
      dm.classList.remove('open'); dt.setAttribute('aria-expanded', false);
    }
  });
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact / interest form
const ORG_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfTud6mFQOzi9vXfCAAqm4tjRDmEez81GR04Y3RUl58Jln1SQ/viewform';
const jf = document.getElementById('joinForm');
if (jf) {
  jf.addEventListener('submit', function(e){
    e.preventDefault();
    const val = id => { const el = document.getElementById(id); return el ? (el.value || '').trim() : ''; };
    // Organizing clients -> Google intake form (fitness / both are unchanged)
    if (/elphage|organizing/i.test(val('f-interest'))) {
      window.open(ORG_FORM, '_blank', 'noopener');
      const ok = document.getElementById('formOk'); if (ok) ok.classList.add('show');
      return;
    }
    const name = val('f-name'), email = val('f-email');
    if (!name || !email) { alert('Please add your name and email so we can reach you.'); return; }
    const body =
      'Hi GNO Health & Wellness team,\n\n' +
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + (val('f-phone') || '—') + '\n' +
      'Interested in: ' + (val('f-interest') || '—') + '\n\n' +
      'Message: ' + (val('f-msg') || '—') + '\n';
    const url = 'mailto:GNOHealthWellness@gmail.com'
      + '?subject=' + encodeURIComponent('Website note — ' + name)
      + '&body=' + encodeURIComponent(body);
    window.location.href = url;
    const ok = document.getElementById('formOk'); if (ok) ok.classList.add('show');
  });
}
