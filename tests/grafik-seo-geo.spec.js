// Prueft den Einbau der SEO-vs-GEO-Grafik auf /ki-sichtbarkeit/:
// wirklich geladen (nicht nur im Markup), Alt-Text traegt die Aussage,
// kein seitliches Scrollen, Breite passt zum Viewport. Angelegt 07.08.2026.
const { test, expect } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');

const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.ico': 'image/x-icon', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
};

let server, baseUrl;

test.beforeAll(async () => {
  const root = path.resolve(__dirname, '..');
  server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    let filePath = path.resolve(root, urlPath === '/' ? 'index.html' : urlPath.slice(1));
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.afterAll(async () => { await new Promise((r) => server.close(r)); });

for (const seite of ['/ki-sichtbarkeit/']) {
  for (const vp of [{ width: 1280, height: 900 }, { width: 375, height: 667 }]) {
    test(`Grafik auf ${seite} bei ${vp.width}px`, async ({ page }) => {
      await page.setViewportSize(vp);
      const fehler = [];
      page.on('response', (r) => {
        if (r.url().includes('seo-vs-geo') && r.status() !== 200) fehler.push(r.status());
      });
      await page.goto(baseUrl + seite, { waitUntil: 'load' });
      const img = page.locator('img[src="/assets/seo-vs-geo.svg"]');
      await expect(img).toHaveCount(1);
      await img.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      // wirklich gerendert, nicht nur im Markup
      expect(await img.evaluate((e) => e.complete && e.naturalWidth > 0)).toBe(true);
      expect(fehler).toEqual([]);
      // Alt-Text traegt die Aussage, nicht nur ein Etikett
      expect(await img.getAttribute('alt')).toContain('GEO ersetzt SEO nicht');
      // die Seite darf durch die Grafik nicht seitlich scrollen
      const querscroll = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(querscroll).toBe(false);
      const box = await img.boundingBox();
      expect(box.width).toBeLessThanOrEqual(vp.width);
      expect(box.width).toBeGreaterThan(vp.width * 0.5);
    });
  }
}
