# Quellen: ki-sichtbarkeit-einzelne-abfrage

Alle Seiten am 23.10.2026 im Original abgerufen (WebFetch, curl, PDF-Text). Zitate wörtlich aus der jeweiligen Quelle, englische Zitate im Original.

## 1. SparkToro (Rand Fishkin), mit Gumshoe.ai
URL: https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/
Stand laut Seite: sichtbar „27 Jan 2026“, Metadaten 2026-01-28T06:49 UTC (Änderungsdatum 28.06.2026). Im Artikel 27.01.2026.
- 12 Prompts, je 60 bis 100 Durchläufe, ChatGPT, Claude, Google AI Overviews/AI Mode, „a combined 2,961 times“.
- Gleiche Liste: „<1 in 100“; gleiche Reihenfolge: „<1 in 1,000 runs“.
- „visibility % across dozens to hundreds of prompts run multiple times is a reasonable metric“; Ranking-Tools „full of baloney“.
- Beispiel City of Hope: 69 von 71 ChatGPT-Antworten, nur 25 Mal an erster Stelle.
- Interessenkonflikt offengelegt (Gumshoe verkauft Tracking), nicht begutachtet.
Bericht: Search Engine Journal, Matt G. Southern, 30.01.2026, https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/566242/
Im Artikel: Kurz gesagt, Befund 1, Befund 4, Messplan, FAQ 1 und 3.

## 2. arXiv 2610.15382 (Vorabdruck)
URL: https://arxiv.org/abs/2610.15382 (HTML: https://arxiv.org/html/2610.15382)
Titel: „Understanding ChatGPT Citations: Evidence from Production Web Search Across Model Generations“, Jiang, Zhang, Xing, Chang, Xiao; eingereicht 11.10.2026.
- „recover only 28.3% and 26.2% of the cited URLs“ (GPT-5.3 / GPT-5.5 Instant, Google ∪ Responses-API-Kandidaten), Hostnamen: „50.3% and 48.7%“.
- Tabelle 4(a): API allein 22,9 % / 22,5 %; Google allein 9,4 % / 6,4 % (URL-Recall).
- „44.5% of chatgpt-5.5-instant URL candidates appear in only one run“ (von 20).
Bericht: Search Engine Journal, 18.10.2026, https://www.searchenginejournal.com/openais-api-only-partly-matched-chatgpts-citations-paper-finds/593304/ (80 Fragen, 40 Englisch/40 Chinesisch, Erhebung 29.03. bis 29.07.2026, Autoren NUS und Xi'an Jiaotong University).
Hinweis zum Auftrag: Die Meldung „API-Abfragen finden nur 26,2 %“ ist ungenau. 26,2 % ist der Wert für Google-Ergebnisse und API ZUSAMMEN; die API allein kam auf 22,5 %. Im Artikel so korrigiert.

## 3. OpenAI Help Center: Searching the web with ChatGPT
URL: https://help.openai.com/en/articles/9237897-chatgpt-search (per curl gelesen, WebFetch 403)
- „ChatGPT may use an approximate location based on your IP address to provide relevant local results. Device location sharing is optional and off by default.“
- „A VPN or network location may affect the approximate location inferred from your IP address. If memory is enabled, saved location information may also influence search results.“

## 4. Google Unternehmensprofil-Hilfe: Ranking in lokalen Suchergebnissen verbessern
URL: https://support.google.com/business/answer/7091?hl=de
- „Lokale Suchergebnisse basieren hauptsächlich auf Relevanz, Entfernung und Beliebtheit.“
- „Wenn ein Kunde seinen Standort nicht teilt, verwendet Google die Informationen, die über seinen Standort bekannt sind.“

## Als Einschätzung gekennzeichnet
- Lokale Fragen schwanken ähnlich stark (Vermutung, gestützt auf eigene Messungen an maxcontentseo.de, siehe /blog/ranking-und-ki-nennung.html).
- „Zehn Durchläufe zeigen eine Richtung“ (eigene Erfahrung, keine Norm).
