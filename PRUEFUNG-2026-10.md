# Website-Prüfung maxcontentseo.de, Oktober 2026

Stand: 20.10.2026 · Zweig `cloud/website-pruefung-2026-10` · geprüft: 41 HTML-Seiten (davon 8 Weiterleitungs-Stubs), `sitemap.xml`, `robots.txt`, `llms.txt`, `assets/`.

Verfahren: statische Prüfung per Skript (alle `href`/`src`/`srcset`, Anker-IDs, `canonical`, `og:*`, alle 54 JSON-LD-Blöcke mit Prüfung auf doppelte Schlüssel, Sitemap gegen Dateien und `git log`, CSS-Schriftgrößen und Breiten), danach Durchsicht der Textstellen zu Preisen, Leistungsumfang und Zusagen. Externe Links per HTTP-Abruf. Kein Browserlauf; die Handy-Befunde sind aus CSS und Inline-Styles abgeleitet.

Zeilennummern beziehen sich auf den Stand **nach** den Korrekturen in diesem Zweig.

---

## 1. Direkt im Zweig korrigiert (nur Technik)

| # | Datei | Änderung |
|---|---|---|
| K1 | `blog/google-bewertung-loeschen.html` (publisher), `fuer-agenturen/index.html` (provider) | Unternehmensknoten ohne `@id` → `"@id": "https://maxcontentseo.de/#organization"` ergänzt. Damit verweisen jetzt alle MaxContentSEO-Knoten auf **eine** Entität. |
| K2 | 11 Dateien: `blog/google-bewertung-loeschen.html`, `blog/ki-sichtbarkeit-messung-pruefen.html`, `blog/ladezeit-kosmetikstudio.html`, `blog/lingqi-haarausfall.html` (2 Knoten), `blog/ranking-und-ki-nennung.html`, `branchen/kosmetikstudios.html`, `branchen/tcm-praxen.html`, `branchen/wellness-spa.html`, `ki-sichtbarkeit/index.html`, `ki-sichtbarkeits-check/index.html`, `seo-anbieter-finden.html`, `seo-begriffe/index.html` | Person-Knoten „Georg Stopfer“ ohne `@id` → `"@id": "https://maxcontentseo.de/#georg"` ergänzt (wie bereits auf Startseite, Leistungen, Über mich). |
| K3 | `sitemap.xml` | `lastmod` bei 11 URLs auf das Datum der letzten inhaltlichen Änderung laut `git log` gesetzt: `/cases/`, `/cases/lingqi.html`, `/was-kostet-seo-kosmetikstudio/`, `/blog/`, `/datenschutz.html`, `/ki-transparenz/`, `/impressum.html` (je 16.10.), `/leistungen/`, `/ki-sichtbarkeit/` (17.10.), `/seo-anbieter-finden.html`, `/seo-muenchen/` (20.10.). Vorher teils August-Daten trotz Änderungen im Oktober. |

Nachprüfung nach den Korrekturen: alle 54 JSON-LD-Blöcke gültiges JSON, keine doppelten Schlüssel; kein MaxContentSEO- oder Georg-Knoten mehr ohne `@id`.

**Ohne Befund geprüft:** 0 kaputte interne Links, 0 fehlende Anker, 0 fehlende Bilder/PDFs/Schriften, 0 Bilder ohne `alt`, alle `og:image` vorhanden, alle Seiten mit `lang="de"`, `viewport` auf allen Seiten korrekt (`width=device-width`, kein Zoom-Verbot), keine doppelten Titel oder Beschreibungen, keine `http://`- oder `www`-Links, keine internen Links auf Weiterleitungs-Stubs. Sitemap: 29 URLs, jede hat eine Datei, keine `noindex`-Seite drin, jede indexierbare Seite drin (die 8 Stubs zeigen per `canonical` und Meta-Refresh auf ihr Ziel und fehlen zu Recht). `robots.txt` gültig, Sitemap-Verweis stimmt. `llms.txt`: alle 31 Links erreichen eine vorhandene, indexierbare Seite. JSON-LD: **keine Telefonnummer, keine Öffnungszeiten** in irgendeinem Knoten; Adresse überall `Hauptstr. 29, 85551 Kirchheim b. München`.

---

## 2. Vorschläge (nicht geändert)

Kategorien: **T** Technik/Meta · **J** strukturierte Daten · **M** Handy · **P** Preise/Leistungsumfang · **A** Aussagen, Recht, Gedankenstriche. Priorität: hoch / mittel / niedrig.

### P · Preise und Leistungsumfang

| # | Prio | Datei:Zeile | Zitat | Vorschlag |
|---|---|---|---|---|
| P1 | hoch | `index.html:497` | „Monatliche Berichte mit klaren Handlungsempfehlungen.“ | „Ein schriftlicher Befundbericht mit klaren Handlungsempfehlungen. Kein Fachjargon, sondern: Was bringt am meisten?“ |
| P2 | hoch | `index.html:524–545` (Ablauf) | „In 4 Schritten zu mehr Anfragen“ · „90-Tage-Plan …“ · „Umsetzung: Texterstellung, technische Korrekturen, Local SEO und GEO. Alles aus einer Hand.“ · „Monatliche Messung von Platzierungen, Besucherzahlen und Anfragen.“ | Überschrift: „In 4 Schritten zu Ihrem Maßnahmenplan“. Schritt 3: „Umsetzung: selbst, mit Ihrer Website-Betreuung oder auf Nachfrage als Quick Fix (699 € einmalig).“ Schritt 4: „Nachmessen: Ein optionales Re-Audit zeigt, was sich verändert hat.“ Unterzeile: „Klar strukturiert und transparent.“ |
| P3 | hoch | `index.html:678` und JSON-LD `index.html:148–153` | „Gibt es Mindestlaufzeiten? Nein. Ich empfehle mindestens 3 Monate, damit Maßnahmen greifen können, aber es gibt keine Knebelverträge.“ | „Gibt es Mindestlaufzeiten? Nein. Das Kombi-Audit ist eine einmalige Leistung ohne Abo und ohne Folgeauftrag.“ (Text in FAQ und JSON-LD gleich halten.) |
| P4 | hoch | `index.html:682` und JSON-LD `index.html:156–160`; ebenso `index.html:648–649` | „Beides. Ich liefere fertig optimierte Texte, setze technische Änderungen um und kümmere mich um Ihr Google Business Profil. Sie müssen nichts selbst umsetzen …“ · „Umsetzung, nicht nur Beratung“ | „Der Einstieg ist eine Analyse. Die Umsetzung der wichtigsten Maßnahmen biete ich auf Nachfrage als Quick Fix an: 699 € einmalig, bis zu 5 Seiten, jede weitere Seite 90 €.“ Kachel 648: „Umsetzung auf Nachfrage“ / „Wenn Sie es nicht selbst umsetzen wollen, übernehme ich die wichtigsten Maßnahmen als Quick Fix.“ |
| P5 | hoch | Anrechnungssatz in `branchen/kosmetikstudios.html:362`, `branchen/tcm-praxen.html:329`, `branchen/wellness-spa.html:345`, `leistungen/index.html:375`, `seo-anbieter-finden.html:353`, `was-kostet-seo-kosmetikstudio/index.html:315`, JSON-LD `audit-beispiel-kombi.html:703` | „… rechne ich die 499 € an, entweder auf die einmalige Umsetzung oder auf den ersten Monat einer laufenden Betreuung, einmal und nicht beides.“ | Laufende Betreuung soll nicht auf der Website stehen: „Wenn Sie innerhalb von 30 Tagen nach dem Kombi-Audit die Umsetzung beauftragen, rechne ich die 499 € einmal an.“ (In 703: „… bekommt das Audit einmal auf die Umsetzung angerechnet.“) |
| P6 | hoch | `llms.txt:9` | „Leistungen: Audit, laufende Betreuung, KI-Sichtbarkeit.“ | „Leistungen: SEO+GEO-Kombi-Audit (499 € einmalig), Premium-Audit auf Nachfrage, KI-Sichtbarkeit.“ |
| P7 | mittel | Quick Fix ohne Umfang: `branchen/kosmetikstudios.html:362`, `branchen/tcm-praxen.html:329`, `branchen/wellness-spa.html:345`, `was-kostet-seo-kosmetikstudio/index.html:168, 184, 315, 320` | „Umsetzung einzelner Maßnahmen (Quick Fix, 699 €)“ · „kostet das als Quick Fix 699 €, auf Nachfrage“ | Überall gleich: „Quick Fix: 699 € einmalig, auf Nachfrage, bis zu 5 Seiten, jede weitere Seite 90 €.“ Auf keiner Seite stehen bisher „bis zu 5 Seiten“ und „90 €“. |
| P8 | mittel | „laufende Begleitung“ als Angebot: `branchen/kosmetikstudios.html:362, 370`, `branchen/tcm-praxen.html:329, 330`, `branchen/wellness-spa.html:345, 347`, `was-kostet-seo-kosmetikstudio/index.html:168, 320` (dazu je die JSON-LD-FAQ ab Zeile ~207–239) | „Umsetzung einzelner Maßnahmen (Quick Fix, 699 €) und laufende Begleitung sind auf Nachfrage möglich“ | „Die Umsetzung einzelner Maßnahmen ist auf Nachfrage möglich (Quick Fix, 699 € einmalig).“ Den Teil mit der laufenden Begleitung streichen. |
| P9 | mittel | `fuer-agenturen/index.html:100`, JSON-LD `:78–81` (`priceValidUntil 2026-10-31`) | „Kennenlernangebot im Oktober …“ · Offer „price: 149“ | **Fällig am 01.11.2026:** Eyebrow, Kapsel (`:107`), Preisblock (`:120–121`), Meta-Beschreibung (`:7`) und Offer auf 249 € umstellen (`"price": "249"`, Name ohne „Kennenlernpreis Oktober 2026“, `priceValidUntil` entfernen). Sonst steht ab November ein abgelaufenes Angebot online. |
| P10 | niedrig | `fuer-agenturen/index.html:107, 120` | „<s>249 €</s> 149 €“ | Rechtlich heikel: Ein durchgestrichener Preis, der noch nie berechnet wurde, wird leicht als Rabatt auf einen Vorpreis gelesen (UWG § 5, PAngV § 11). Sicherer: „149 € je Bericht (Kennenlernpreis bis 31.10.2026; ab 01.11.2026: 249 €)“ ohne Durchstreichung. Ab 01.11. entfällt das ohnehin. |
| P11 | niedrig | `seo-muenchen/index.html:420` | „Ja, das ist Teil des GEO-Sichtbarkeits-Checks, der als Ergänzung zur klassischen SEO-Analyse angeboten wird.“ | Veraltet, KI-Sichtbarkeit ist im Kombi-Audit enthalten: „Ja. Die Prüfung der Sichtbarkeit in ChatGPT und Gemini ist im SEO+GEO-Kombi-Audit (499 € einmalig) enthalten.“ |
| P12 | niedrig | `seo-muenchen/index.html:417` | „Eine Optimierung kann auf Wunsch zusätzlich beauftragt werden“ | „Die Umsetzung kann auf Nachfrage als Quick Fix beauftragt werden (699 € einmalig, bis zu 5 Seiten, jede weitere Seite 90 €).“ |

Preisleiter sonst stimmig: 0 € Erstanalyse, 499 € einmalig Kombi-Audit, 1.299 € Premium nur „auf Nachfrage“ (`leistungen/index.html:357`, `was-kostet-seo-kosmetikstudio/index.html:315–316`, `audit-beispiel.html:894`), 149 €/249 € Partnerbericht. **Keine „ab“-Preise, keine Monatspreise von MaxContentSEO** gefunden (Monatsbeträge nur als Beschreibung von Agentur-Marktpreisen, `was-kostet-seo-kosmetikstudio/index.html:318`, `seo-anbieter-finden.html:348`; dort unkritisch). BAFA-Honorar (3.500 €, 5 × 700 €) gehört nicht zur Leiter und ist in sich stimmig.

### A · Aussagen, Widersprüche, Recht, Gedankenstriche

| # | Prio | Datei:Zeile | Zitat | Vorschlag |
|---|---|---|---|---|
| A1 | hoch | `seo-muenchen/index.html:335` | „… kein generisches PDF aus einem automatisierten Tool, sondern eine individuelle Analyse Ihres Studios.“ | Widerspricht `leistungen/index.html:336` und `audit-beispiel-kombi.html:1146` („Automatisiertes Einstiegs-Audit“), Irreführungsrisiko. Ersatz: „Einen schriftlichen Befundbericht zu Ihrem Studio mit priorisierten Ansatzpunkten. Die Messung läuft automatisiert, jeder Befund wird von einem zweiten KI-Modell gegengeprüft.“ |
| A2 | hoch | `branchen/kosmetikstudios.html:372`, `branchen/tcm-praxen.html:331`, `branchen/wellness-spa.html:348` | „Die Nachmessung erfolgt im September 2026 über die Google Search Console und wird in der Fallstudie veröffentlicht.“ | Datum verstrichen (heute 20.10.). Wenn gemessen: Ergebnis verlinken. Sonst: „Die Nachmessung gegen die veröffentlichten Ausgangswerte steht noch aus; das Ergebnis erscheint in der Fallstudie.“ |
| A3 | hoch | `cases/index.html:315`; `cases/lingqi.html:366, 384, 385, 406, 527, 559` | „die Nachmessung ist für September 2026 angesetzt“ · „Nachher September 2026“ · „Nachmessung September 2026: Ergebnisse werden hier veröffentlicht.“ | Wie A2. Spalte 527: „Nachher (Nachmessung ausstehend)“; 559: „Nachmessung: Ergebnisse werden hier veröffentlicht, sobald sie vorliegen.“ |
| A4 | mittel | `seo-muenchen/index.html:431` | „… keine parallele Betreuung branchenfremder Unternehmen.“ | Widerspricht `index.html:645, 690` („Handwerk“), der KMU-Beratung (`/beratung-bafa/`) und den Agenturberichten. Ersatz: „Kein Agentur-Hintergrund, kein Team, das wechselt. Sie sprechen direkt mit der Person, die Ihre Analyse durchführt.“ |
| A5 | mittel | `leistungen/index.html:335`; `branchen/kosmetikstudios.html:353` (H1-Zeile); `seo-muenchen/index.html:290`; `llms.txt:18` | „Mehr qualifizierte Anfragen aus Google …“ · „mehr qualifizierte Anfragen über Google“ · „Mehr lokale Anfragen über Google und Google Maps …“ | Erfolgsversprechen. Ersatz: „Lokales SEO für Kosmetikstudios, Wellnesszentren und TCM-Praxen: gefunden werden, wenn Kundinnen in Ihrer Nähe suchen.“ bzw. „SEO für Kosmetikerinnen und Kosmetikstudios: bei Google gefunden werden“ bzw. „Bei Google und Google Maps gefunden werden, ohne Agenturvertrag und ohne Monatspauschale.“ |
| A6 | mittel | `leistungen/index.html:325–326` | „Wer in diesen Antworten nicht vorkommt, verliert Anfragen. … MaxContentSEO löst alle drei Probleme aus einer Hand.“ | „Wer in diesen Antworten nicht vorkommt, wird bei diesen Suchen leicht übersehen. … MaxContentSEO bearbeitet alle drei Themen aus einer Hand.“ |
| A7 | mittel | `index.html:432` | „Wer dort nicht als Quelle auftaucht, existiert für diese Suchen nicht.“ | „Wer dort nicht als Quelle auftaucht, wird bei diesen Suchen nicht empfohlen.“ |
| A8 | mittel | `index.html:582`; `index.html:525` | „SEO-Basis für nachhaltiges Ranking geschaffen“ · „auf Ergebnisse fokussiert“ | „SEO-Basis für bessere Auffindbarkeit gelegt“ · „Klar strukturiert und transparent.“ |
| A9 | mittel | Wirkzeiten widersprüchlich: `index.html:670` („3-6 Monaten“), `seo-muenchen/index.html:419` („Neue Inhalte brauchen meist 6 bis 12 Wochen“), `branchen/kosmetikstudios.html` FAQ („oft nach 4 bis 8 Wochen messbar … 3 bis 6 Monate“) | siehe links | Eine Formulierung überall: „Technische Korrekturen zeigen sich oft nach einigen Wochen, neue Inhalte brauchen meist drei bis sechs Monate. Garantieren kann das niemand.“ |
| A10 | niedrig | `leistungen/index.html:324` | „Sie fragen ChatGPT und Perplexity …“ | Gemessen werden ChatGPT und Gemini: „Sie fragen ChatGPT und Gemini …“ |
| A11 | niedrig | `index.html:567` | „TCM-Praxis · SEO-Analyse + Content-Strategie“ (LingQi) | LingQi ist ein TCM Head Spa; „Praxis“ legt Heilbehandlung nahe (HWG-Nähe): „TCM Head Spa · SEO-Analyse + Content-Strategie“. |
| A12 | niedrig | `index.html:573–574` | „Platz 1 · KI-Empfehlung bei ‚TCM Kopfmassage München‘ … (historische Einzelmessung, Juni 2026)“ | Gekennzeichnet, aber vier Monate alt und Einzelmessung. Entweder neu messen und Datum setzen oder Kachel ersetzen durch „Fallstudie mit offenen Ausgangswerten“. |
| A13 | niedrig | Gedankenstrich-Ersatz „ - “: `ki-sichtbarkeit/index.html:122` (JSON-LD), `:532` | „GEO steht für Generative Engine Optimization - die Optimierung …“ | „GEO steht für Generative Engine Optimization, also die Optimierung …“ |
| A14 | niedrig | `ki-sichtbarkeit/index.html:514` | „Referenz aus München - LingQi TCM Head Spa“ | „Referenz aus München: LingQi TCM Head Spa“ |
| A15 | niedrig | `ki-sichtbarkeit/index.html:515` | „LingQi TCM Head Spa München - KI-Sichtbarkeits-Grundlagen implementiert: …“ | „LingQi TCM Head Spa München: KI-Sichtbarkeits-Grundlagen umgesetzt: …“ |
| A16 | niedrig | `blog/google-bewertung-loeschen.html:12, 22, 192` | „Google Bewertung löschen lassen im Kosmetikstudio - MaxContentSEO“ | „Google Bewertung löschen lassen im Kosmetikstudio \| MaxContentSEO“ (wie die übrigen Titel). |
| A17 | niedrig | `stimme/index.html:6, 12` | „Stimme hinterlassen - MaxContentSEO“ | „Stimme hinterlassen \| MaxContentSEO“ |
| A18 | Hinweis | `index.html:598` und JSON-LD `review` | „… betreut er die technische Seite und das SEO – zuverlässig …“ | Einziger echter Gedankenstrich im sichtbaren Text, aber wörtliches Zitat aus der Google-Rezension. **Nicht ändern** (Zitattreue). |

„Als Einziger“ / „einzigartig“ / „konkurrenzlos“: **kein Treffer** (einzige Fundstelle `index.html:597` „Bislang die einzige Bewertung …“ ist eine ehrliche Einschränkung). Heilversprechen: keine gefunden, die Fundstellen sind Verneinungen oder Warnhinweise.

### J · Strukturierte Daten (über K1/K2 hinaus)

| # | Prio | Datei:Zeile | Befund | Vorschlag |
|---|---|---|---|---|
| J1 | mittel | `index.html:21` (Organization → `review`) | Rezension der eigenen Firma auf dem eigenen Unternehmensknoten. Google wertet solche „self-serving reviews“ für LocalBusiness/Organization nicht aus und kann sie als Richtlinienverstoß behandeln. | `review`-Block aus dem JSON-LD entfernen; das sichtbare Zitat auf der Seite bleibt. |
| J2 | niedrig | Person `#georg`: `url` uneinheitlich (`/ueber-mich/` auf Start/Leistungen, `/` in `blog/lingqi-haarausfall.html:33`, `/impressum.html` in `:243`); `jobTitle` uneinheitlich („SEO-Berater“ vs. „SEO-Berater und Inhaber von MaxContentSEO“) | Mit gleicher `@id` werden die Angaben zusammengeführt, widersprüchliche `url` schwächen die Zuordnung. | Überall `"url": "https://maxcontentseo.de/ueber-mich/"` und ein `jobTitle`. |
| J3 | niedrig | Kein Unternehmensknoten auf `beratung-bafa/`, `blog/index.html`, `ki-transparenz/`, `impressum.html`, `datenschutz.html`, `stimme/` | Nicht falsch, nur ohne Verbindung zur Entität. | Mindestens auf `impressum.html` einen schlanken Knoten `{"@type":["Organization","ProfessionalService"],"@id":"https://maxcontentseo.de/#organization"}` mit Adresse ergänzen. |
| J4 | niedrig | `index.html` FAQ-JSON-LD | Antworten zu Mindestlaufzeit und Umsetzung (siehe P3, P4) | Beim Umformulieren JSON-LD und sichtbaren Text gleichzeitig ändern. |

### T · Technik und Meta

| # | Prio | Datei | Befund | Vorschlag |
|---|---|---|---|---|
| T1 | niedrig | `impressum.html`, `datenschutz.html` | kein `og:url`, kein `og:description` | `og:url` = canonical-URL, `og:description` = Meta-Beschreibung. |
| T2 | niedrig | `danke.html`, `danke-muster.html`, `404.html`, `stimme/aufnahme.html` | kein `og:url`/`og:description` | Unkritisch (noindex). Optional. |
| T3 | Hinweis | externe Links | 21 von 24 antworten mit 200. `pmc.ncbi.nlm.nih.gov` (2×), `brightlocal.com` liefern bei Skriptabruf keine Antwort, `indiehackers.com` 403, LinkedIn 999: typische Bot-Sperren, im Browser kurz von Hand prüfen. | — |

### M · Handy (statisch aus CSS beurteilt)

| # | Prio | Datei | Befund | Vorschlag |
|---|---|---|---|---|
| M1 | mittel | `index.html`, `fuer-agenturen/index.html`, `beratung-bafa/index.html`, `404.html`, `stimme/index.html`, `stimme/aufnahme.html`, `audit-beispiel-maxcontentseo.html` | binden `/assets/tap-targets.css` nicht ein. Fußzeilen-Links dort ohne Mindesthöhe (z. B. `fuer-agenturen` `.footer-links` 0,7 rem ohne Innenabstand ≈ 17 px Zielhöhe, Startseite Fußzeile `a.h0` ohne `min-height`). Unter den empfohlenen 44 px (Apple) bzw. 48 px (Google). | `<link rel="stylesheet" href="/assets/tap-targets.css">` in den `<head>` dieser Seiten (andere Seiten haben es bereits). |
| M2 | niedrig | `index.html:318, 336, 345, 424, 427` | Etiketten in `0.62rem` (≈ 9,9 px), Großbuchstaben-Monospace | auf mindestens `0.72rem` (≈ 11,5 px) anheben. |
| M3 | niedrig | `blog/lingqi-haarausfall.html` (2 Regeln mit 10 px), `blog/google-bewertung-loeschen.html` (0,66 rem) | Kleinschrift unter 11 px | auf ≥ 0,72 rem anheben. |
| M4 | Hinweis | alle Seiten | Menü-Pfeile in 0,55/0,6 rem sind `aria-hidden`-Zeichen, kein Lesetext: kein Handlungsbedarf. Tabellen im Blog werden unter 720 px per `display:block; overflow-x:auto` scrollbar; Bilder mit großen `width`-Attributen sind per `max-width:100%` bzw. Inline-Breite begrenzt. Kein Hinweis auf horizontales Scrollen der Seite gefunden. | Bei Gelegenheit einmal echter Lauf bei 360 px Breite. |

---

## 3. Zählung

| Kategorie | korrigiert | Vorschläge |
|---|---|---|
| T Technik/Meta, Links, Sitemap, robots, llms | 1 (K3, 11 URLs) | 3 (T1–T3) |
| J Strukturierte Daten | 2 (K1, K2; 15 Knoten in 13 Dateien) | 4 (J1–J4) |
| M Handy | 0 | 4 (M1–M4) |
| P Preise/Leistungsumfang | 0 | 12 (P1–P12) |
| A Aussagen/Recht/Gedankenstriche | 0 | 18 (A1–A18) |
