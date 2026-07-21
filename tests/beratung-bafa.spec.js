const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const pagePath = path.join(root, 'beratung-bafa', 'index.html');

function findHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'qa_output') return [];
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(absolutePath);
    return entry.isFile() && entry.name.endsWith('.html') ? [absolutePath] : [];
  });
}

function faqFromVisibleHtml(html) {
  const faqSection = html.match(/<section aria-label="Häufige Fragen zur BAFA-Förderung"[\s\S]*?<\/section>/);
  expect(faqSection, 'Visible FAQ section should exist').not.toBeNull();

  return [...faqSection[0].matchAll(
    /<details[^>]*>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<\/details>/g,
  )].map((match) => ({
    question: match[1].trim(),
    answer: match[2].trim(),
  }));
}

function faqFromJsonLd(html) {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const schemas = scripts.map((match) => JSON.parse(match[1]));
  const faq = schemas.find((schema) => schema['@type'] === 'FAQPage');
  expect(faq, 'FAQPage JSON-LD should exist and contain valid JSON').toBeTruthy();

  return faq.mainEntity.map((entity) => ({
    question: entity.name,
    answer: entity.acceptedAnswer.text,
  }));
}

test('BAFA page is indexable, discoverable, and compliant', () => {
  const html = fs.readFileSync(pagePath, 'utf8');

  expect(html).not.toMatch(/<meta name="robots" content="[^"]*noindex/i);
  expect(html).toContain('Beim BAFA als Beratungsunternehmen gelistet · Berater-ID 229676');
  expect(html).toContain('href="#kontakt"');
  expect(html).toContain('id="kontakt"');
  expect(html).toContain('https://www.bafa.de/unb');
  expect(html).toContain('#134d35');
  expect(html).toContain('Rechtsanspruch besteht nicht');

  const forbiddenClaims = [
    'zertifiziert',
    'akkreditiert',
    'autorisiert',
    'vom Bund anerkannt',
    'staatlich anerkannt',
    'Förderung unternehmerischen Know-hows',
  ];
  for (const claim of forbiddenClaims) expect(html).not.toContain(claim);

  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  expect(sitemap).toContain('<loc>https://maxcontentseo.de/beratung-bafa/</loc>');

  const navigationPages = findHtmlFiles(root)
    .filter((file) => file !== pagePath)
    .filter((file) => fs.readFileSync(file, 'utf8').includes('>Leistungsübersicht</a>'));
  expect(navigationPages.length).toBeGreaterThan(0);
  for (const file of navigationPages) {
    expect(fs.readFileSync(file, 'utf8'), `${file} should link to the BAFA page`).toContain('/beratung-bafa/');
  }
});

test('visible FAQ and FAQPage JSON-LD stay exactly synchronized', () => {
  const html = fs.readFileSync(pagePath, 'utf8');
  const visibleFaq = faqFromVisibleHtml(html);
  const schemaFaq = faqFromJsonLd(html);

  expect(visibleFaq).toHaveLength(5);
  expect(schemaFaq).toEqual(visibleFaq);
});
