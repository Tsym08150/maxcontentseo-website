# Ladezeit maxcontentseo.de, Oktober 2026

Zweig `cloud/ladezeit-2026-10`, abgezweigt von `main` auf GitHub (7432b35). Nicht gemergt.
Optik und Text sind unverändert; der Beleg dafür steht in Abschnitt 4.

## 1. Methode

- **Werkzeug:** Lighthouse 13.4.0 (CLI), nur die Kategorie Leistung, Mobil-Voreinstellung mit **simulierter Drosselung**
  (langsames 4G, vierfache CPU-Bremse). Chrome 155 im Headless-Modus (`--headless=new`), Windows 10, Hauptrechner.
- **Seiten:** Startseite `/`, `/leistungen/`, `/fuer-agenturen/`, Blogartikel `/blog/google-bewertung-loeschen.html`
  (der einzige Artikel mit Bildern im Text), `/seo-muenchen/`. Dazu als Ergänzung `/blog/` und `/ueber-mich/`, weil die
  Bildänderungen dort am meisten bringen.
- **Lokal:** eigener kleiner Node-Server, der wie GitHub Pages ausliefert (gzip für Text, `cache-control: max-age=600`,
  Verzeichnis → `index.html`). „Vorher" = unveränderter Stand von `main` (Port 8731), „Nachher" = dieser Zweig (Port 8732).
- **Läufe:** Vorher lokal wurde zuerst wie vorgegeben mit 3 Läufen gemessen. Danach zeigte sich, dass der Rechner zwischen
  Läufen schwankt (eine unveränderte Seite sprang von 1,5 auf 2,3 s LCP). Für den Vergleich in Abschnitt 3 liefen deshalb
  **je Seite 5 Läufe, abwechselnd Vorher und Nachher** (V, N, V, N …), damit Lastschwankungen beide Fassungen gleich
  treffen. Angegeben ist je Kennzahl der **Median**. Die drei sequenziellen Vorher-Läufe ergaben dieselben Mediane wie die
  fünf abwechselnden.
- **Live:** 3 Läufe gegen https://maxcontentseo.de, gemessen am 20.10.2026 gegen 12:50 Uhr (Stand der Seite = `main` 7432b35).
- **Kennzahlen:** LCP, CLS, TBT, FCP, Gesamtgröße (`total-byte-weight`, übertragene Bytes), Anzahl der Anfragen
  (`network-requests`). Lighthouse lädt Bilder mit `loading="lazy"` unterhalb des ersten Bildschirms nicht; deren Ersparnis
  steht deshalb gesondert in Abschnitt 3.3.

## 2. Vorher

### 2.1 Live (maxcontentseo.de, 3 Läufe, Median)

| Seite | Score | FCP s | LCP s | CLS | TBT ms | kB | Anfragen |
|---|---|---|---|---|---|---|---|
| Startseite | 95 | 1,79 | 2,01 | 0,000 | 111 | 123 | 11 |
| Leistungen | 98 | 1,26 | 1,41 | 0,000 | 100 | 97 | 11 |
| Für Agenturen | 100 | 1,21 | 1,48 | 0,039 | 1 | 111 | 10 |
| Blogartikel | 99 | 1,31 | 2,04 | 0,000 | 1 | 234 | 13 |
| SEO München | 98 | 1,24 | 1,39 | 0,000 | 100 | 94 | 10 |

### 2.2 Lokal (Stand `main`, 5 Läufe abwechselnd, Median)

| Seite | Score | FCP s | LCP s | CLS | TBT ms | kB | Anfragen |
|---|---|---|---|---|---|---|---|
| Startseite | 99 | 1,51 | 1,81 | 0,000 | 0 | 123 | 11 |
| Leistungen | 100 | 1,36 | 1,51 | 0,000 | 0 | 97 | 11 |
| Für Agenturen | 99 | 1,36 | 1,66 | 0,039 | 0 | 111 | 10 |
| Blogartikel | 97 | 1,51 | 2,42 | 0,000 | 0 | 233 | 13 |
| SEO München | 100 | 1,36 | 1,51 | 0,000 | 0 | 94 | 10 |

Live und lokal unterscheiden sich vor allem bei der TBT (live 100 bis 111 ms auf drei Seiten, lokal 0). Das liegt am
Messrechner und am Netz, nicht an der Seite: Lighthouse rechnet die CPU-Zeit des Messrechners hoch, und die beiden Messungen
liefen zu verschiedenen Zeiten. Verglichen wird deshalb nur lokal mit lokal.

**Ausgangslage:** Die Seite war schon schlank (94 bis 234 kB, keine fremden Dienste, eigene Schriften mit
`font-display: swap`, zwei Schriften vorgeladen, Skripte mit `defer`). Lighthouse meldete kein ungenutztes CSS oder JS.
Die echten Schwachstellen waren:

1. **Bilder:** Der Blogartikel lud drei PNG-Screenshots sofort und ohne Maße (110 kB, Lighthouse „unsized-images").
   Die Blog-Übersicht lud **1,35 MB** Kartenbilder (ein 864-kB-PNG für eine etwa 360 px breite Karte); LCP dort 8,3 s.
   Das Porträt (1728 × 2304 px, 58 kB) wird auf der Startseite mit 230 px gezeigt.
2. **Für Agenturen:** Layoutverschiebung CLS 0,039, weil drei nicht vorgeladene Schriften (Geist Mono, Figtree 500,
   Lora 500) erst nach dem ersten Aufbau eintrafen und den Text umbrachen.
3. **Skript `redesign.js`:** Lighthouse meldete „erzwungenes Layout": Beim Einblenden las das Skript für jedes der
   67 Elemente der Startseite die Position und schrieb danach sofort einen Stil, sodass jedes Element eine eigene
   Layout-Berechnung auslöste.

## 3. Nachher

### 3.1 Lokal, 5 Läufe abwechselnd mit Vorher, Median

| Seite | LCP vorher → nachher | Gewicht vorher → nachher | Anfragen | FCP | CLS | TBT | Score |
|---|---|---|---|---|---|---|---|
| Startseite | 1,81 → 1,82 s | 123 → 123 kB | 11 → 11 | 1,51 → 1,52 s | 0 → 0 | 0 → 0 | 99 → 99 |
| Leistungen | 1,51 → 1,52 s | 97 → 97 kB | 11 → 11 | 1,36 → 1,37 s | 0 → 0 | 0 → 0 | 100 → 100 |
| Für Agenturen | **1,66 → 1,51 s** | 111 → 111 kB | 10 → 10 | **1,36 → 0,92 s** | **0,039 → 0,000** | 0 → 0 | 99 → 100 |
| Blogartikel | **2,42 → 1,66 s** | **233 → 125 kB** | **13 → 10** | 1,51 → 1,51 s | 0 → 0 | 0 → 0 | 97 → 99 |
| SEO München | 1,51 → 1,52 s | 94 → 94 kB | 10 → 10 | 1,36 → 1,37 s | 0 → 0 | 0 → 0 | 100 → 100 |

Unterschiede von 0,01 s liegen im Rauschen. Startseite, Leistungen und SEO München sind in dieser Messung **unverändert**:
Auf diesen Seiten lag nichts, was sich ohne Eingriff in die Optik verbessern ließ (siehe 3.4).

### 3.2 Ergänzung: Blog-Übersicht und Über mich (3 Läufe abwechselnd, Median)

| Seite | LCP vorher → nachher | Gewicht vorher → nachher | Score |
|---|---|---|---|
| Blog-Übersicht `/blog/` | **8,28 → 1,59 s** | **1.413 → 125 kB** | 75 → 99 |
| Über mich `/ueber-mich/` | **1,96 → 1,66 s** | 148 → 116 kB | 99 → 99 |

### 3.3 Bilder, die Lighthouse nicht lädt (unterhalb des ersten Bildschirms)

Wer weiterscrollt, lädt nachher weniger (Browser mit AVIF, also aktuelle Chrome, Edge, Firefox, Safari):

| Seite | Bild | vorher | nachher |
|---|---|---|---|
| Startseite | Porträt | 58 kB (WebP 1728 px) | 8,5 kB (AVIF 460 px), auf Retina 20 kB (920 px) |
| Blogartikel | drei Screenshots | 110 kB (PNG) | 35 kB (AVIF), WebP-Ersatz 74 kB |

### 3.4 Was nicht umgesetzt wurde, mit Messwert (Experiment, nicht im Zweig)

Um zu klären, ob auf Startseite, Leistungen und SEO München mehr zu holen ist, lief eine zusätzliche, **nicht
committete** Variante (5 Läufe abwechselnd mit dem Nachher-Stand):

| Eingriff | Ergebnis |
|---|---|
| Startseite: Einblend-Animation für Elemente im ersten Bildschirm weglassen | LCP 1,81 → 1,81 s, also **kein Gewinn** in der Messung. Würde die Optik ändern. Nicht umgesetzt. |
| Leistungen und SEO München: `design-system.css` und `tap-targets.css` direkt ins HTML schreiben | FCP 1,36 → 1,21 s, LCP 1,51 → 1,51 s, 2 Anfragen weniger. Kein LCP-Gewinn, aber dieselben Regeln stünden dann auf jeder Seite doppelt und müssten überall einzeln gepflegt werden. Nicht umgesetzt. |
| Startseite: Figtree 500 vorladen (der LCP-Absatz nutzt diese Schrift) | Im ersten Nachher-Lauf FCP 1,51 → 1,70 s, also schlechter, weil die zusätzliche Schrift mit dem Seitenaufbau um die Leitung konkurriert. Wieder entfernt. |

Diese drei Seiten haben einen LCP von etwa 1,5 bis 1,8 s unter langsamem 4G. Googles Grenze für „gut" liegt bei 2,5 s.
Der Rest wird von der Schriftladezeit bestimmt.

## 4. Visuelle Gleichheit

Ganzseiten-Screenshots mit Playwright (Chromium), Desktop 1366 × 900 und Mobil 390 × 844, jeweils `reducedMotion: reduce`
(damit die Einblend-Animationen nicht jedes Bild verschieden machen). Vor der Aufnahme wurde die Seite einmal durchgescrollt,
damit verzögert geladene Bilder auch erscheinen. Verglichen wurde pixelweise (pixelmatch, Schwelle 0,1).

**Nullkontrolle:** Der unveränderte Stand, zweimal aufgenommen, ergibt auf allen 14 Aufnahmen **0 abweichende Pixel**.
Die Aufnahme ist also reproduzierbar, und jede Abweichung unten stammt von der Änderung.

| Aufnahme | abweichende Pixel | Anteil | Ursache |
|---|---|---|---|
| Startseite Desktop / Mobil | 0 / 0 | 0 % | – |
| Leistungen Desktop / Mobil | 0 / 0 | 0 % | – |
| Für Agenturen Desktop / Mobil | 0 / 0 | 0 % | – |
| SEO München Desktop / Mobil | 0 / 0 | 0 % | – |
| Über mich Desktop / Mobil | 0 / 0 | 0 % | – |
| Blogartikel Desktop | 1.374 | 0,008 % | Kompressionsrauschen der AVIF-Screenshots (y 4903–6052) |
| Blogartikel Mobil | 0 | 0 % | – |
| Blog-Übersicht Desktop | 2.340 | 0,07 % | Kartenbilder sind jetzt 800 statt 1200 bis 1514 px breit und werden anders herunterskaliert |
| Blog-Übersicht Mobil | 3.227 | 0,26 % | wie Desktop |

Im Ausschnitt nebeneinander (`ladezeit-2026-10/*-ausschnitt.jpg`) ist kein Unterschied zu erkennen: gleiche Lage, gleiche
Größe, gleiche Farben. Die Abweichungen betreffen nur einzelne Pixel an Kanten innerhalb der Bilder.

Dateien in `ladezeit-2026-10/`: `<seite>-<desktop|mobil>-vorher.jpg`, `-nachher.jpg`, `-diff.jpg` (rot = abweichendes Pixel,
nur wo es Abweichungen gab) und `-ausschnitt.jpg` (links vorher, rechts nachher). Desktop-Ganzseiten sind zur Ablage auf halbe
Breite verkleinert. Der Pixelvergleich lief auf den PNG-Dateien in voller Größe.

**Nebenbefund (nicht geändert):** Der Blogartikel ist mobil 398 statt 390 px breit, die Seite lässt sich also um 8 px
seitlich verschieben. Das war vorher schon so.

## 5. Änderungen

| Datei | Änderung |
|---|---|
| `blog/google-bewertung-loeschen.html` | Drei Screenshots in `<picture>` mit AVIF, dann WebP, PNG als Rückfall. `width`/`height` gesetzt, dazu `height:auto` im Inline-Stil, damit das Seitenverhältnis bei `max-width:100%` erhalten bleibt. `loading="lazy"`, `decoding="async"`. |
| `blog/index.html` | Fünf Kartenbilder in `<picture>` mit 800-px-AVIF/WebP, PNG als Rückfall. `width`/`height` gesetzt. Die beiden letzten Karten (Google-Bewertung, Haarausfall) liegen unterhalb des ersten Bildschirms und bekommen `loading="lazy"`. `display:contents` am `<picture>`, damit das Bild weiter direktes Flex-Kind der Karte bleibt (`height:100%`, `object-fit` greifen unverändert). |
| `index.html` | Porträt in `<picture>`: AVIF/WebP 460 und 920 px mit `sizes="230px"`. `georg.webp` bleibt als Rückfall. Bleibt `lazy` (liegt weit unten). |
| `ueber-mich/index.html` | Porträt in `<picture>`: AVIF/WebP 460 und 1088 px plus Original 1728 px. Das Bild ist dort im ersten Bildschirm, deshalb `fetchpriority="high"`. |
| `fuer-agenturen/index.html` | Preload für `geist-mono-latin-var.woff2`, `figtree-latin-500.woff2`, `lora-latin-500.woff2`. Beseitigt die Schrift-Layoutverschiebung (CLS 0,039 → 0). |
| `assets/js/redesign.js` | Einblenden: erst alle Positionen lesen, dann alle Stile schreiben (ein Layout statt eines je Element). Die Entscheidung „sofort zeigen oder beim Scrollen" bleibt je Element gleich: Die alte Reihenfolge las die Position nach dem gesetzten `translateY(26px)`, deshalb werden 26 px addiert. Geprüft: Kein Reveal-Element liegt in einem anderen, es gibt also keine verschachtelten Transforms. `window.innerHeight` wird nur noch gelesen, wenn es Reveal-Elemente gibt (nur auf der Startseite). Sonst erzwang das Lesen auf den anderen Seiten ein vorgezogenes Layout im Skript; das zeigte sich im ersten Nachher-Lauf als 160 ms TBT auf dem Blogartikel. |
| `assets/*-460/-800/-900/-920/-1088.{avif,webp}` | 18 neue Bilddateien (Pillow 12.2, WebP q82 bzw. q90 für Screenshots, AVIF q60 bzw. q70). Alle Originale bleiben liegen: Sie dienen als Rückfall und als `og:image`. |
| `_config.yml` | `LADEZEIT-2026-10.md` und `ladezeit-2026-10/` von Jekyll ausgeschlossen, damit Bericht und Screenshots bei einem Merge nicht als öffentliche Seiten erscheinen. |

Keine externen Dienste hinzugefügt, kein Text geändert, keine Farben oder Abstände geändert.

## 6. Risiken und offene Punkte

- **Cache:** `redesign.js` wird auf den meisten Seiten ohne Versionsparameter eingebunden. GitHub Pages liefert mit
  `max-age=600`, nach spätestens 10 Minuten haben alle Besucher die neue Fassung. Startseite und KI-Sichtbarkeits-Check
  tragen `?v=20260710`; dort kann der Browser die alte Datei bis zu 10 Minuten weiter nutzen. Das ist unkritisch, weil
  sich nur die Reihenfolge der Lese- und Schreibzugriffe ändert.
- **AVIF-Screenshots im Blogartikel:** sichtbar gleich, aber verlustbehaftet (0,008 % Pixel). Falls Georg die Screenshots
  pixelgenau will: Qualität hochsetzen oder die AVIF-Quelle weglassen. Dann greift WebP mit 74 statt 35 kB.
- **Cache-Dauer** (Lighthouse „cache-insight", 78 bis 194 kB je Seite) lässt sich auf GitHub Pages nicht einstellen.
- **Live-Nachmessung** nach einem Merge steht aus. Die Live-Werte oben sind nur der Vorher-Stand.
- **Tests:** Die Playwright-Tests im Ordner `tests/` wurden nicht ausgeführt. Geprüft wurde die Gleichheit über die
  Pixelvergleiche oben.
- Die mobile Überbreite des Blogartikels (8 px) ist nicht Teil dieses Auftrags und bleibt offen.
