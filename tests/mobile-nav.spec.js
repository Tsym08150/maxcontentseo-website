const { test, expect } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'cases/index.html',
  'cases/lingqi.html',
  'blog/index.html',
  'impressum.html',
  'datenschutz.html',
  'audit-beispiel.html',
  'danke.html',
  'blog/lingqi-haarausfall.html',
  'branchen/kosmetikstudios.html',
  'branchen/tcm-praxen.html',
  'branchen/wellness-spa.html',
  'was-kostet-seo-kosmetikstudio/index.html',
  'seo-anbieter-finden.html',
];

const expectedLinks = [
  'Leistungsübersicht',
  'BAFA-Beratung',
  'Kostenlose Erstanalyse',
];

let server;
let baseUrl;

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

function pageUrl(relativePath) {
  return `${baseUrl}/${relativePath}`;
}

test.use({ viewport: { width: 375, height: 667 } });

test.beforeAll(async () => {
  const root = process.cwd();

  server = http.createServer((request, response) => {
    const urlPath = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    let filePath = path.resolve(root, urlPath === '/' ? 'index.html' : urlPath.slice(1));

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'content-type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
    });
    fs.createReadStream(filePath).pipe(response);
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

test.afterAll(async () => {
  if (!server) return;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

for (const relativePath of pages) {
  test(`mobile nav works on ${relativePath}`, async ({ page }) => {
    await page.addInitScript(() => {
      const originalSetTimeout = window.setTimeout;
      window.setTimeout = (callback, delay, ...args) => {
        if (String(callback).includes('muster-premium-audit.pdf')) return 0;
        return originalSetTimeout(callback, delay, ...args);
      };
    });

    await page.goto(pageUrl(relativePath));

    const toggle = page.locator('[data-burger]');
    const nav = page.locator('[data-mobile-panel]');

    await expect(toggle, 'Hamburger button should be visible').toBeVisible();
    await expect(nav, 'Primary navigation should be closed initially').toBeHidden();

    await toggle.click();
    await expect(nav, 'Primary navigation should open after tapping hamburger').toBeVisible();
    await expect(toggle, 'aria-expanded should reflect open state').toHaveAttribute('aria-expanded', 'true');
    await nav.locator('summary').filter({ hasText: 'Leistungen' }).click();

    for (const label of expectedLinks) {
      const link = nav.getByRole('link', { name: label, exact: true });
      await expect(link, `${label} should be visible in the opened menu`).toBeVisible();
      await link.click({ trial: true });
    }

    await toggle.click();
    await expect(nav, 'Primary navigation should close after tapping the hamburger again').toBeHidden();
    await expect(toggle, 'aria-expanded should reflect closed state').toHaveAttribute('aria-expanded', 'false');

    await toggle.click();
    await expect(nav).toBeVisible();

    const beforeUrl = page.url();
    await nav.getByRole('link', { name: 'BAFA-Beratung', exact: true }).click();

    await expect
      .poll(async () => {
        const urlChanged = page.url() !== beforeUrl;
        const menuHidden = await nav.isHidden().catch(() => true);
        return urlChanged || menuHidden;
      })
      .toBe(true);
  });
}
