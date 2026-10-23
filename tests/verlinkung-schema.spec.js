const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Prueft ohne Browser: JSON-LD gueltig, Entitaeten (#organization, #georg, #website) ueberall
// identisch, FAQPage wortgleich zum sichtbaren Text, alle internen Links aufloesbar.
// Eingefuehrt mit dem Zweig cloud/verlinkung-schema-2026-10 (Oktober 2026).
const root = path.resolve(__dirname, '..');
const SKIP = new Set(['.git', 'node_modules', 'qa_output', 'test-results', 'tests', '.claude']);
const SITE = 'https://maxcontentseo.de';

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (SKIP.has(e.name)) return [];
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}
const files = htmlFiles(root);
const rel = (p) => path.relative(root, p).split(path.sep).join('/');
const read = (p) => fs.readFileSync(p, 'utf8');
const blocks = (html) => [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const nodes = (d) => (Array.isArray(d) ? d : d['@graph'] || [d]);
const decode = (t) => t.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const norm = (t) => decode(t).replace(/[  ]/g, ' ').replace(/\s+/g, ' ').trim();

test('JSON-LD ist gueltig und die Entitaeten sind ueberall identisch', () => {
  const versions = {};
  for (const f of files) {
    for (const raw of blocks(read(f))) {
      let d;
      expect(() => { d = JSON.parse(raw); }, `JSON-LD in ${rel(f)}`).not.toThrow();
      for (const n of nodes(d)) {
        if ([`${SITE}/#organization`, `${SITE}/#georg`, `${SITE}/#website`].includes(n['@id'])) {
          (versions[n['@id']] ||= new Set()).add(JSON.stringify(n));
        }
      }
    }
  }
  for (const [id, v] of Object.entries(versions)) expect(v.size, `${id} in mehreren Fassungen`).toBe(1);
});

test('FAQPage-Texte stehen wortgleich im sichtbaren Text', () => {
  for (const f of files) {
    const html = read(f);
    const body = (html.match(/<body[\s\S]*<\/body>/) || [''])[0].replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/g, '');
    const spaced = norm(body.replace(/<[^>]+>/g, ' '));
    const tight = norm(body.replace(/<[^>]+>/g, ''));
    for (const raw of blocks(html)) {
      for (const n of nodes(JSON.parse(raw))) {
        if (n['@type'] !== 'FAQPage') continue;
        for (const q of n.mainEntity) {
          for (const t of [q.name, q.acceptedAnswer.text]) {
            const x = norm(t);
            expect(spaced.includes(x) || tight.includes(x), `${rel(f)}: ${x.slice(0, 80)}`).toBe(true);
          }
        }
      }
    }
  }
});

test('alle internen Links zeigen auf vorhandene Dateien', () => {
  const broken = [];
  for (const f of files) {
    const body = read(f).replace(/<script\b[\s\S]*?<\/script>/g, '');
    for (const [, hrefRaw] of body.matchAll(/\bhref="([^"]*)"/g)) {
      const href = decode(hrefRaw);
      if (/^(mailto:|tel:|javascript:|data:|#)/.test(href) || href === '') continue;
      let p;
      if (/^https?:\/\//.test(href)) {
        const u = new URL(href);
        if (!['maxcontentseo.de', 'www.maxcontentseo.de'].includes(u.hostname)) continue;
        p = u.pathname;
      } else {
        p = href.split('#')[0].split('?')[0];
        if (p === '') continue;
      }
      let target = p.startsWith('/') ? path.join(root, decodeURIComponent(p)) : path.join(path.dirname(f), decodeURIComponent(p));
      if (p.endsWith('/') || (fs.existsSync(target) && fs.statSync(target).isDirectory())) target = path.join(target, 'index.html');
      if (!fs.existsSync(target)) broken.push(`${rel(f)}: ${href}`);
    }
  }
  expect(broken, broken.join('\n')).toEqual([]);
});
