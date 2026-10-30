# Technische Prüfung maxcontentseo.de, 30.10.2026

Verfahren: offline aus den Dateien (46 HTML-Seiten, davon 8 Weiterleitungsseiten mit Meta-Refresh). Eigene Prüfskripte, nicht im Repo. 400-px-Test mit Headless-Chromium gegen lokalen Server, externe Abrufe gesperrt. Externe Links wurden nur gelistet, nicht abgerufen.

**Ergebnis: keine eindeutigen Fehler gefunden, daher keine Änderung an Seiten.** Die Tabelle nennt nur Beobachtungen, die Sie kennen sollten.

| Seite | Befund | behoben ja/nein | Beleg Datei:Zeile |
|---|---|---|---|
| alle | Check 1: alle lokalen href/src/srcset sowie Anker (#id) lösen auf, 0 Fehler. 47 externe Ziele nur gelistet (u. a. gesetze-im-internet.de, support.google.com, bafa.de, stripe.com, formspree.io) | kein Fehler | gesamte Site |
| sitemap.xml | 34 URLs, alle Ziele existieren, keine Doppelten, lastmod durchgehend im Format JJJJ-MM-TT | kein Fehler | sitemap.xml |
| 404.html, danke.html, danke-muster.html, stimme/aufnahme.html | Nicht in der Sitemap, aber `noindex`: gewollt | kein Fehler | 404.html:6, danke.html:9, danke-muster.html:9, stimme/aufnahme.html:9 |
| 8 Weiterleitungsseiten (z. B. cases.html, ai-analyse-firmen.html) | Nicht in der Sitemap, ohne h1 und Beschreibung, Canonical zeigt auf das Ziel: gewollt | kein Fehler | ai-analyse-firmen.html:13, cases.html:7 |
| llms.txt | Alle verlinkten Seiten existieren; alle Sitemap-URLs sind enthalten. Zusätzlich verlinkt: PDF-Checkliste (nicht in der Sitemap, Datei existiert) | kein Fehler | llms.txt:47 |
| llms-full.txt | Datei existiert nicht und wird nirgends referenziert | nein (nichts zu beheben) | – |
| robots.txt | Alles erlaubt, Sitemap-Verweis korrekt | kein Fehler | robots.txt:3, robots.txt:46 |
| alle Inhaltsseiten (38) | Genau ein title, genau eine Beschreibung (keine doppelt), genau eine h1, `lang="de"`, Canonical entspricht der eigenen URL, Viewport-Meta vorhanden | kein Fehler | gesamte Site |
| 404.html, danke.html, danke-muster.html, stimme/aufnahme.html | Kein Canonical (bei noindex unkritisch); stimme/aufnahme.html ohne Beschreibung | nein, bewusst nicht geändert | stimme/aufnahme.html:9 |
| alle JSON-LD-Blöcke | Alle gültiges JSON; Typen plausibel (ProfessionalService, Service, Offer, FAQPage, BlogPosting, BreadcrumbList u. a.) | kein Fehler | gesamte Site |
| JSON-LD Adresse | 33 Blöcke, überall Hauptstr. 29, 85551 Kirchheim b. München, identisch zum Impressum | kein Fehler | index.html:45-47, impressum.html:439 |
| JSON-LD Preise | 499 (Kombi-Audit), 1299 (Premium), 149 (Agenturbericht), 0 (Check); jeweils auch im sichtbaren Text | kein Fehler | leistungen/index.html:205, audit-beispiel.html:675 |
| fuer-agenturen/index.html | Zeitabhängig: Das Angebot gilt laut Seite bis 30.11.2026, danach 249 € je Bericht. Das Schema nennt 149. Ab 01.12.2026 manuell nachziehen | nein (kein Fehler heute) | fuer-agenturen/index.html:211 |
| alle 38 Seiten ohne Weiterleitung | Bei 400 px kein horizontaler Überlauf außerhalb scrollbarer Container | kein Fehler | gesamte Site |
| alle Seiten | Keine fest verdrahteten Breiten über 380 px in Inline-Styles | kein Fehler | gesamte Site |
| BAFA, Programmlaufzeit | Genannt wird nur die Frist für den Verwendungsnachweis bis 31.12.2028 (Richtlinie verlängert), nicht „Programm bis 31.12.2028“ wörtlich. Das widerspricht nichts, die Formulierung aber nicht ohne Quelle verändert | nein, zur Prüfung | beratung-bafa/index.html:158, blog/bafa-foerderung-beratung-studio.html:591, llms.txt:50 |
| BAFA, 40-Stunden-Regel | Korrekt nur für Anträge ab 01.01.2027 genannt. Kein Widerspruch auf einer Seite | kein Fehler | beratung-bafa/index.html:198, beratung-bafa/index.html:436 |
| leistungen/index.html | „fünf Beratungstage“ ohne Hinweis auf die Stundenregel ab 2027. Kein Widerspruch, aber Hinweis | nein, zur Prüfung | leistungen/index.html:445 |
| Bilder | 0 `<img>` ohne alt, 0 ohne width/height | kein Fehler | gesamte Site |

## Zahlen je Prüfpunkt

| Prüfpunkt | Gefunden | Behoben |
|---|---|---|
| 1 Links/Anker | 0 | 0 |
| 2 Sitemap/robots/llms | 0 Fehler, 2 Hinweise | 0 |
| 3 Head-Daten | 0 Fehler | 0 |
| 4 JSON-LD | 0 Fehler, 1 zeitabhängiger Hinweis | 0 |
| 5 Mobil | 0 | 0 |
| 6 BAFA | 0 Widersprüche, 2 Hinweise | 0 |
| 7 Bilder | 0 | 0 |
