# Technische Prüfung maxcontentseo.de, Oktober 2026

Stand: 23.10.2026 · Zweig `cloud/technik-pruefung-2026-10` (Basis `main` a0f7dd2) · nicht gemergt, nicht live.

## Umfang und Verfahren

| Punkt | Wert |
|---|---|
| HTML-Dateien geprüft | 46, davon 8 Weiterleitungsseiten (Meta-Refresh, Kanonisch auf Ziel) |
| Interne Links aufgelöst | 1.699, davon 369 mit Anker (`#…`) auf der Zielseite geprüft |
| Externe Links | 77, nur Syntax geprüft (kein Abruf) |
| Ressourcen-Verweise | alle `src`, `srcset`, `<link href>`, `og:image` gegen die Dateien im Repo aufgelöst |
| Bilder (`<img>`) | 21 Einbindungen, im echten Layout vermessen (1280 px Desktop, 390 px Mobil mit 2-fach-Dichte) |

Werkzeuge (lokal, nicht im Repo abgelegt):

1. **Statischer Prüfer** (Node + cheerio 1.0.0): lang-Attribut, genau eine h1, Überschriftensprünge, Skip-Link, `<main>`, alt-Texte, width/height, Formular-Labels, `label for`, Buttons/Links ohne Namen, doppelte IDs, ARIA-Verweise ins Leere, fokussierbare Elemente in `aria-hidden`, ungültige Rollen, Tabellen ohne `th`, iframes ohne title, interne Links und Anker, fehlende Ressourcen, Head (title, description, canonical, og-Tags, Doppelungen). **Rot-Nachweis:** an einer absichtlich fehlerhaften Testseite fand er alle 12 eingebauten Fehler (kaputte Datei, kaputter Anker auf Fremd- und eigener Seite, fehlendes Bild, fehlendes alt, fehlendes lang, h1→h3, Feld ohne Label, Tabelle ohne th, fehlender Skip-Link).
2. **axe-core 4.10.2** (Regeln WCAG 2.0/2.1/2.2 A und AA plus Best Practice) in Headless-Chromium (Playwright 1.60) gegen `python -m http.server`, jede Seite in Desktop- und Mobilansicht, externe Abrufe gesperrt.
3. **Bildvermessung** in Playwright: geladene Datei (`currentSrc`), natürliche gegen dargestellte Größe, Lage zur ersten Ansicht.
4. **Vorher/Nachher-Bildschirmfotos** (ganze Seite, beide Ansichten) aller geänderten Seiten mit Pixelvergleich und CLS-Messung.

## Ergebnis auf einen Blick

| | vorher | nachher |
|---|---|---|
| axe-Verstöße (WCAG A/AA) | 4 Seiten, 13 Elemente je Ansicht (alle Farbkontrast) | **0** |
| Statische Befunde (echte) | 2 Bilder ohne width/height | **0** |
| Kaputte interne Links / Anker / Ressourcen | 0 | 0 |
| Beschreibungen über 155 Zeichen | 7 | **0** |
| Doppelte Titel / Beschreibungen | 0 | 0 |

Bereits sauber (vorheriges Vollaudit wirkt): `lang="de"` auf allen Seiten, Skip-Link „Zum Inhalt springen“ und `<main id="main">` auf allen 38 Inhaltsseiten, genau eine h1 je Inhaltsseite, keine Überschriftensprünge, alle Bilder mit alt-Text, alle sichtbaren Formularfelder beschriftet, Tabellen mit Kopfzellen und als tastaturbedienbare Region, Fokusrahmen global gesetzt (`:focus-visible` in `design-system.css` und `tap-targets.css`), keine doppelten IDs, keine ARIA-Verweise ins Leere.

## Befund-Tabelle

Schwere: **hoch** = WCAG-AA-Verstoß oder kaputte Funktion · **mittel** = messbare Wirkung auf Nutzer oder Ladezeit · **niedrig** = Feinschliff/SEO-Hygiene · **Info** = kein Handlungsbedarf, nur dokumentiert.

| # | Seite | Problem | Schwere | korrigiert |
|---|---|---|---|---|
| 1 | blog/bafa-foerderung-beratung-studio.html | Tabellenkopf `#E8956F` auf weißer Tabelle, Kontrast 2,0:1 (WCAG 1.4.3) | hoch | ja (T-1) |
| 2 | blog/eine-seite-je-behandlung.html | wie 1 | hoch | ja (T-1) |
| 3 | blog/tcm-praxis-werbung-website.html | wie 1 | hoch | ja (T-1) |
| 4 | blog/plattform-oder-eigene-website.html | Textlink „Musterbericht Kombi-Audit ansehen“ im Terrakotta-Kasten: `#C4633F` auf `#A94F30`, 1,35:1 (praktisch unsichtbar) | hoch | ja (T-2) |
| 5 | blog/plattform-oder-eigene-website.html | 4 Quellenlinks in der dunklen Schrittliste: `#C4633F` auf `#2E332B`, 3,2:1 | hoch | ja (T-2) |
| 6 | cases/lingqi.html | Hero-Foto ohne width/height (CLS-Risiko); Datei 1280×2293 px / 162 KB, dargestellt mit höchstens 378 px Breite | mittel | ja (B-1) |
| 7 | cases/index.html | gleiches Foto in der Fallkarte ohne width/height, ohne `loading="lazy"` (liegt unterhalb der ersten Ansicht) | mittel | ja (B-1) |
| 8 | blog/google-bewertung-loeschen.html | Beschreibung 158 Zeichen | niedrig | ja (H-1) |
| 9 | blog/ki-sichtbarkeit-messung-pruefen.html | Beschreibung 156 Zeichen | niedrig | ja (H-1) |
| 10 | blog/ranking-und-ki-nennung.html | Beschreibung 158 Zeichen | niedrig | ja (H-1) |
| 11 | branchen/kosmetikstudios.html | Beschreibung 156 Zeichen | niedrig | ja (H-1) |
| 12 | branchen/wellness-spa.html | Beschreibung 159 Zeichen | niedrig | ja (H-1) |
| 13 | index.html | Beschreibung 157 Zeichen | niedrig | ja (H-1) |
| 14 | was-kostet-seo-kosmetikstudio/index.html | Beschreibung 156 Zeichen | niedrig | ja (H-1) |
| 15 | branchen/tcm-praxen.html, branchen/wellness-spa.html, seo-anbieter-finden.html, was-kostet-seo-kosmetikstudio/index.html | UTF-8-BOM vor `<!DOCTYPE>`: Browser ignorieren es, aber manche Parser/Crawler schließen den Head zu früh und „sehen“ keinen title/description (unser eigener Prüfer tat genau das) | niedrig | ja (H-2) |
| 16 | blog/lingqi-haarausfall.html | title 86 Zeichen (Google kürzt ab etwa 60) | niedrig | nein, Empfehlung |
| 17 | blog/tcm-praxis-werbung-website.html | title 72 Zeichen | niedrig | nein, Empfehlung |
| 18 | branchen/tcm-praxen.html | title 72 Zeichen | niedrig | nein, Empfehlung |
| 19 | blog/google-bewertung-loeschen.html | title 65 Zeichen | niedrig | nein, Empfehlung |
| 20 | beratung-bafa/index.html | title 63 Zeichen | niedrig | nein, Empfehlung |
| 21 | index.html | title 62 Zeichen | niedrig | nein, Empfehlung |
| 22 | 16 Seiten mit Kontaktformular (Blog, Rechtsseiten, danke, ki-sichtbarkeits-check, ki-transparenz) | Eingabefelder: `outline:none` beim Fokus, Ersatz nur Randfarbe + Schatten mit 15 % Deckkraft; erfüllt 2.4.7 knapp über die Randfarbe, ist aber schwach | niedrig | nein, Empfehlung |
| 23 | alle Seiten (og:image) | `assets/og-logo.png` 257 KB als Vorschaubild | niedrig | nein, Empfehlung |
| 24 | Repo | ungenutzte große Dateien: `assets/haarausfall-stress.png` 1,1 MB, `assets/linqi.PNG` und `linqi.PNG` (Wurzel) je 429 KB, `assets/kosmetikstudio-muenchen.webp` 29 KB; nirgends in HTML/CSS/JS verlinkt | niedrig | nein, Empfehlung |
| 25 | impressum.html, datenschutz.html | `og:type` fehlt | niedrig | nein (Rechtsseiten sind NO-TOUCH) |
| 26 | cases.html, ki-sichtbarkeit-studio-geo/index.html | Weiterleitungsseiten ohne `noindex` (die übrigen sechs haben es); Kanonisch zeigt korrekt aufs Ziel | niedrig | nein, Empfehlung |
| 27 | fuer-agenturen/index.html | Musterbericht-Bilder: JPG + WebP, kein AVIF | Info | nein |
| 28 | blog/index.html | 8 Kartenbilder ohne `loading`; alle dieselbe Datei `og-logo-800.avif` (5 KB), wird einmal geladen | Info | nein, kein Nutzen |
| 29 | index.html, audit-beispiel.html, beratung-bafa/index.html, danke.html, danke-muster.html | Feld `_gotcha` ohne Label: Spam-Falle mit `display:none`, für Hilfstechnik unsichtbar | Info | Fehlalarm |
| 30 | stimme/aufnahme.html | Feld in `aria-hidden="true"`: Spam-Falle mit `tabindex="-1"`, nicht fokussierbar | Info | Fehlalarm |
| 31 | alle | axe konnte bei 728 Elementen den Kontrast nicht automatisch bestimmen (Verläufe, halbtransparente Flächen, überlagerte Bilder) | Info | Stichprobe von Hand empfohlen |

**Summe:** 31 Einträge. 26 echte Befunde, davon **15 korrigiert** (Nr. 1 bis 15; das sind 18 Seitenbefunde, weil Nr. 15 vier Seiten umfasst) und 11 offen als Empfehlung (Nr. 16 bis 26). Dazu 5 Einträge Info oder Fehlalarm (Nr. 27 bis 31).

## Korrekturen auf dem Zweig

Kennzeichen stehen als CSS-Kommentar an der Stelle, die den Fehler behebt.

- **T-1 Tabellenkopf-Kontrast** (`blog/bafa-foerderung-beratung-studio.html`, `blog/eine-seite-je-behandlung.html`, `blog/tcm-praxis-werbung-website.html`): Ursache ist die globale Regel in `assets/css/design-system.css`, die jeden `.table-wrap th` außerhalb heller Abschnitte auf `#E8956F` (für dunkle Tabellenköpfe) zwingt. Auf diesen drei Seiten ist die Tabelle aber weiß. Seitenlokal ergänzt: `html body .table-wrap[role="region"] table th{color:#8E4227 !important;}`. Das ist die Farbe, die die Seite selbst schon vorsah; Kontrast auf dem Kopfgrund 6,1:1. `design-system.css` blieb unverändert, damit kein anderer Tabellenkopf kippt.
- **T-2 Linkkontrast** (`blog/plattform-oder-eigene-website.html`): Link im Terrakotta-Kasten auf `#FAF7F2` (5,1:1, unterstrichen wie zuvor), Quellenlinks in der dunklen Liste auf das vorhandene Token `--terra-on-dark` `#E08A66` (4,9:1). Nur Textfarbe, keine Gestaltungsänderung.
- **B-1 LingQi-Foto** (`cases/lingqi.html`, `cases/index.html`): `width="1280" height="2293"`, neue Variante `assets/lingqi-foto-800.webp` (mit sharp 0.33.5 verkleinert, WebP q82, **72,8 KB statt 162 KB**) per `srcset`/`sizes`; Fallkarte zusätzlich `loading="lazy" decoding="async"`, Hero-Bild `fetchpriority="high"`. In `cases/lingqi.html` bekam `.hero-card__image` `height:auto`, sonst würde das height-Attribut das Bild strecken. Bildvergleich: Hero vorher/nachher sichtbar gleich; übrige Pixelabweichungen sind Subpixel-Verschiebungen der Schrift um weniger als 1 px. CLS vorher und nachher 0,0000 bis 0,0001.
- **H-1 Beschreibungen** auf ≤ 155 Zeichen, jeweils kleinste Kürzung ohne Inhaltsverlust, gleichlautend in `description`, `og:description`, `twitter:description` und JSON-LD `description` (sitemap, llms.txt, robots unberührt):
  - google-bewertung-loeschen: „wann Sie eine Bewertung melden können“ → „wann Sie sie melden können“ (158 → 147)
  - ki-sichtbarkeit-messung-pruefen: „an jeden Anbieter“ → „an Anbieter“ (156 → 150)
  - ranking-und-ki-nennung: „rankt bei Google für 2 Begriffe“ → „rankt für 2 Google-Begriffe“ (158 → 153)
  - branchen/kosmetikstudios: „keine Agentur-Verträge“ → „kein Agenturvertrag“ (156 → 153)
  - branchen/wellness-spa: „Einmaliges Audit 499 €, keine Agentur-Verträge.“ → „Audit 499 € einmalig, kein Agenturvertrag.“ (159 → 155)
  - index.html (nur `description`; `og:description` hat einen eigenen Text): „in 48 Stunden“ → „in 48 h“ (157 → 151)
  - was-kostet-seo-kosmetikstudio: „ohne Abo und ohne Folgeauftrag“ → „ohne Abo, ohne Folgeauftrag“ (156 → 153)
- **H-2 BOM entfernt** in vier Dateien (nur die drei unsichtbaren Bytes vor `<!DOCTYPE>`).

Kein sichtbarer Text geändert, keine Gedankenstriche eingeführt, keine Preise geändert, Gestaltung Variante B unverändert. NO-TOUCH-Dateien (`sitemap.xml`, `robots.txt`, `llms.txt`, `CNAME`, Workflows, Rechtsseiten) nicht berührt.

Nachprüfung nach den Korrekturen: statischer Prüfer 0 Befunde, axe 0 Verstöße auf allen 46 Seiten in beiden Ansichten.

## Offene Empfehlungen (größere oder redaktionelle Eingriffe)

1. **Titel kürzen** (Nr. 16 bis 21): sechs Titel über 60 Zeichen; am dringendsten `blog/lingqi-haarausfall.html` (86) und die beiden TCM-Seiten (72). Ist eine redaktionelle SEO-Entscheidung, deshalb nicht angefasst. Vorschlag: Markenzusatz „| MaxContentSEO“ bei langen Titeln weglassen.
2. **Globale Tabellenkopf-Regel** in `design-system.css` unterscheidet nicht zwischen hellen und dunklen Tabellen. Jede neue Blogseite mit weißer `.table-wrap`-Tabelle erbt denselben Kontrastfehler (die drei betroffenen Seiten sind alle aus Oktober). Dauerhafte Lösung: Regel auf dunkle Tabellen beschränken oder weiße Tabellen per Klasse ausnehmen, danach alle Seiten mit axe gegenprüfen. Bis dahin: neue Blogseite vor dem Veröffentlichen einmal durch axe laufen lassen.
3. **Fokus der Formularfelder** (Nr. 22): `outline:none` streichen oder den Schatten auf volle Deckkraft (`0 0 0 3px #C4633F`) setzen. Betrifft 16 Seiten mit identischem Block, sinnvoll zentral in `design-system.css`.
4. **og-logo.png** (257 KB) verlustfrei verkleinern oder als JPG/WebP unter 100 KB anbieten; Social-Vorschauen laden schneller, Inhalt unverändert.
5. **Ungenutzte Dateien** (Nr. 24, zusammen rund 2 MB) prüfen und löschen, sofern sie nicht extern verlinkt sind (z. B. in alten Mails oder Bildersuche).
6. **Weiterleitungsseiten** `cases.html` und `ki-sichtbarkeit-studio-geo/` mit `noindex` angleichen.
7. **Kontrast-Stichprobe von Hand** bei Elementen auf Verläufen und Fotos (Nr. 31), vor allem Hero-Bereiche mit radialem Verlauf.
8. **Parallele Zweige:** `cloud/ladezeit-2026-10`, `cloud/website-pruefung-2026-10` und `cloud/verlinkung-schema-2026-10` bestehen gleichzeitig und können dieselben Dateien berühren (Blog, cases, index). Beim Zusammenführen auf Konflikte in den Head-Zeilen und Bildeinbindungen achten.
