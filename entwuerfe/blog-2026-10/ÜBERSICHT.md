# Blog-Vorrat Oktober 2026: Übersicht

Zweig: `cloud/blog-vorrat-2026-10` (von `origin/main` a0f7dd2). Nichts in `blog/index.html`, `sitemap.xml` oder `llms.txt` eingetragen.
Stand: 23.10.2026. Sechs Artikel, alle Quellen am 23.10.2026 im Original geöffnet (Ausnahmen je Artikel in `quellen.md` unter OFFEN).

Je Ordner: `<slug>.html` (fertige Seite im Gerüst von `blog/eine-seite-je-behandlung.html`, Schema BlogPosting + BreadcrumbList + FAQPage, FAQ-Schema automatisch wortgleich aus dem sichtbaren Text erzeugt), `quellen.md`, `eintrag-index.html`, `eintrag-sitemap.xml`, `eintrag-llms.txt`, `ableitung-social.md`, `sol.out` (eine Prüfrunde Codex gpt-6.1-sol, Denktiefe medium; alle Befunde eingearbeitet).

Wortzahl: „Fließtext“ = sichtbarer Text im `<main>` ohne Tabellen und ohne Quellenliste; „gesamt“ = ganzer `<main>`-Text.

| Nr. | Titel (H1) | Slug | Fließtext / gesamt | Meta-Description (Zeichen) | geplantes Datum im Schema |
|---|---|---|---|---|---|
| 1 | KI-Sichtbarkeit richtig messen: Warum eine einzelne Abfrage nichts beweist | ki-sichtbarkeit-einzelne-abfrage | 1.509 / 1.799 | Warum eine einzelne ChatGPT-Abfrage über Ihr Studio nichts beweist: was Studien zu Wiederholung, App und Schnittstelle zeigen, und wie Sie selbst messen. (153) | 2026-11-06 |
| 2 | Google-Bewertungen für Studios: was erlaubt ist und was wirkt | google-bewertungen-studio-regeln | 1.466 / 1.735 | Google-Bewertungen fürs Studio: wie Sie regelkonform bitten, was Google und UWG verbieten und wie Sie ohne Gesundheitsdaten antworten. Mit Tabelle. (147) | 2026-11-20 |
| 3 | Online-Buchung: Wo Kundinnen abspringen und wie Sie den Weg kürzer machen | online-buchung-abbrueche | 1.473 / 1.628 | Wo Kundinnen bei der Online-Buchung abspringen können: Ladezeit, Schritte, Kontopflicht, Anzahlung, Handy, Plattform. Mit Selbsttest in zehn Minuten. (149) | 2026-12-04 |
| 4 | Neu eröffnet: Die ersten 90 Tage bei Google und in KI-Antworten | neu-eroeffnet-erste-90-tage | 1.286 / 1.598 | Für frisch eröffnete Studios: Google-Profil mit Eröffnungsdatum, erste Bewertungen, eine Seite je Leistung und einheitliche Angaben. Mit 90-Tage-Plan. (150) | 2026-12-18 |
| 5 | Kosmetik, Wellness, Heilpraktiker: Zahlen zum Markt 2026 | markt-zahlen-kosmetik-heilpraktiker-2026 | 1.437 / 1.791 | 81.021 Kosmetikbetriebe Ende 2025, mehr als Friseure: Zahlen zu Kosmetik, Heilpraktikern und KI-Nutzung mit Quelle, Stand und Lücken. (133) | 2027-01-08 |
| 6 | KI-Texte und Kennzeichnung: Was kleine Betriebe zum AI Act wissen sollten | ki-texte-kennzeichnung-ai-act | 1.456 / 1.811 | Müssen Studios KI-Texte, KI-Bilder oder einen Chatbot kennzeichnen? Was Art. 50 AI Act seit August 2026 verlangt, Stand Oktober 2026. Keine Rechtsberatung. (155) | 2027-01-22 |

Geprüft per Skript: keine Gedankenstriche (– —) in allen Dateien, Meta-Description ≤ 155, alle internen Links zeigen auf vorhandene Dateien, HTML-Tags ausgeglichen, JSON-LD gültig, Social-Längen (LinkedIn ≤ 1.300, Google-Profil ≤ 900).

## Offene Punkte

1. **Datum beim Veröffentlichen setzen.** `datePublished`/`dateModified` (Schema) und `lastmod` (eintrag-sitemap.xml) tragen die oben geplanten Termine. Sol hat zu Recht angemerkt: Google rät von Zukunftsdaten ab. Beim Einbau auf den echten Veröffentlichungstag setzen.
2. **Reihenfolge Artikel 6.** Der AI-Act-Artikel ist zeitgebunden („Stand 23.10.2026“). Empfehlung: früher bringen (zum Beispiel an Stelle 2) oder vor Veröffentlichung Stand prüfen.
3. **Zahl „53 % Online-Buchung (Anbieter-Stichprobe Okt. 2026)“ nicht gefunden** (Websuche und eigene Berichte). Steht im Datenartikel als Lücke. Wenn Georg die Quelle kennt: Original prüfen, als Anbieterangabe nachtragen.
4. **Heilpraktiker „ca. 47.000 laut Verband 2017“ nicht belegbar.** Ersetzt durch: BMG-Gutachten (Hochrechnung 67.387 Personen mit Erlaubnis 2022, 60.454 für 2017), AOK 47.000 (2018, ohne Quelle), Bayerischer Landtag 46.000 (Bezugsjahr offen).
5. **Meldung vom 18.10.2026 korrigiert.** Nicht „API-Abfragen finden 26,2 %“, sondern Google-Ergebnisse und API **zusammen** 26,2 % (GPT-5.5 Instant); API allein 22,5 %. So im Artikel.
6. **ZDH 2025 und Nagelstudios.** Seit 09.04.2025 zählen Nagelstudios zum Kosmetikerhandwerk (§ 18 Abs. 2 HwO, IHK Chemnitz). Im Datenartikel als Einschränkung der Vergleichbarkeit vermerkt.
7. **Nicht selbst im Original geöffnet** (im Artikel nur, wo nötig, und so gekennzeichnet): amtliche BGH-Entscheidung VI ZR 225/17 (nur Sekundärquellen; dieselbe Entscheidung steht schon im veröffentlichten Löschartikel), EUR-Lex-Seite der Verordnung 2026/1744 (Text über PDF-Kopie mit Amtsblattkopf gelesen), ARD/ZDF-Originaltabellen (über t3n), OpenAI-Hilfe (per curl, WebFetch 403).
8. **Querverweise nach Veröffentlichung.** Die neuen Artikel verlinken nur bereits veröffentlichte Seiten. Nach Veröffentlichung sinnvoll: Nr. 4 → Nr. 2 (erste Bewertungen) und Nr. 3, Nr. 5 → Nr. 3 (Online-Buchung), Nr. 1 ↔ Nr. 6.
9. **Prüfkette.** Je Artikel eine Runde Sol medium (`sol.out`), alle Befunde eingearbeitet; keine zweite Runde auf die korrigierte Fassung und keine Astra-Runde. Wenn die übliche Kette (Astra light + Sol medium) gewünscht ist, vor dem Einbau nachholen.
10. **Kartenbild.** Alle Einträge nutzen wie die vorhandenen Karten `og-logo`; kein eigenes Artikelbild.
