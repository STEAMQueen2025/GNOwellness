// GNO Health & Wellness Alliance — site builder
// Reads content/*.json + templates/*.html, writes finished pages to _site/
// No dependencies. Run: node build.js
const fs = require('fs');
const path = require('path');

const read = f => fs.readFileSync(f, 'utf8');
const j = f => JSON.parse(read(f));

const data = {
  settings: j('content/settings.json'),
  home: j('content/home.json'),
  mwm: j('content/mwm.json'),
  elphage: j('content/elphage.json'),
  leadership: j('content/leadership.json'),
};

// ---------- computed HTML fragments ----------
const esc = s => (s == null ? '' : String(s));

function leadershipCards() {
  return data.leadership.members.map(m => {
    const bios = (m.bios || []).map(b => `          <p class="bbio">${esc(b.text)}</p>`).join('\n');
    const creds = (m.creds && m.creds.length)
      ? `\n          <div class="creds">\n            ${m.creds.map(c => `<span>${esc(c.text)}</span>`).join('')}\n          </div>`
      : '';
    const quote = m.quote ? `\n          <blockquote class="bquote">${esc(m.quote)}</blockquote>` : '';
    return `<article class="bcard reveal">
        <img class="photo" src="${esc(m.photo)}" alt="${esc(m.alt || m.name)}">
        <div class="bbody">
          <div class="bname">${esc(m.name)}</div>
          <div class="btitle">${esc(m.title)}</div>
${bios}${creds}${quote}
        </div>
      </article>`;
  }).join('\n      ');
}

function mwmGallery() {
  return data.mwm.gallery.map(g =>
    `      <figure${g.wide ? ' class="span2"' : ''}><img src="${esc(g.image)}" alt="${esc(g.alt)}"><figcaption>${esc(g.caption)}</figcaption></figure>`
  ).join('\n');
}

function baPairs() {
  return data.elphage.ba_pairs.map(p => {
    if (p.before) {
      return `      <div class="ba-pair reveal">
        <div class="ba-item"><img src="${esc(p.before)}" alt="${esc(p.before_alt)}"></div>
        <div class="ba-item"><img src="${esc(p.after)}" alt="${esc(p.after_alt)}"></div>
        <p class="ba-cap">${esc(p.caption)}</p>
      </div>`;
    }
    return `      <div class="ba-pair reveal">
        <div class="ba-item" style="grid-column:1 / -1;max-width:560px;margin:0 auto"><img src="${esc(p.after)}" alt="${esc(p.after_alt)}" style="aspect-ratio:auto"></div>
        <p class="ba-cap">${esc(p.caption)}</p>
      </div>`;
  }).join('\n');
}

function howCards() {
  return data.elphage.how_cards.map((c, i) =>
    `<div class="how-card"><div class="n">${i + 1}</div><h4>${esc(c.title)}</h4><p>${esc(c.text)}</p></div>`
  ).join('\n      ');
}

const computed = {
  leadership_cards: leadershipCards(),
  mwm_gallery: mwmGallery(),
  ba_pairs: baPairs(),
  how_cards: howCards(),
};

// ---------- token replacement ----------
function render(tpl) {
  return tpl.replace(/\{\{(\w+)\.(\w+)\}\}/g, (full, scope, key) => {
    if (scope === 'computed') return computed[key] != null ? computed[key] : full;
    const bucket = data[scope];
    if (bucket && bucket[key] != null) return bucket[key];
    console.error('MISSING TOKEN:', full);
    process.exitCode = 1;
    return full;
  });
}

// ---------- build ----------
const OUT = '_site';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

for (const f of fs.readdirSync('templates')) {
  // two passes so tokens inside content (e.g. the venue name in a step) also resolve
  fs.writeFileSync(path.join(OUT, f), render(render(read(path.join('templates', f)))));
}

// static assets
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.copyFileSync('assets/styles.css', path.join(OUT, 'styles.css'));
fs.copyFileSync('assets/site.js', path.join(OUT, 'site.js'));

// images at repo root (original site filenames)
for (const f of fs.readdirSync('.')) {
  if (/\.(jpe?g|png|webp|gif|svg)$/i.test(f)) fs.copyFileSync(f, path.join(OUT, f));
}
// CMS-uploaded media
if (fs.existsSync('assets/uploads')) {
  fs.mkdirSync(path.join(OUT, 'assets', 'uploads'), { recursive: true });
  for (const f of fs.readdirSync('assets/uploads')) {
    fs.copyFileSync(path.join('assets/uploads', f), path.join(OUT, 'assets', 'uploads', f));
  }
}
// admin app
fs.mkdirSync(path.join(OUT, 'admin'), { recursive: true });
for (const f of fs.readdirSync('admin')) {
  fs.copyFileSync(path.join('admin', f), path.join(OUT, 'admin', f));
}

console.log('Built', fs.readdirSync(OUT).length, 'items into', OUT);
