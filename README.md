# Trading Journal PWA

Persoenliches Trading-Journal als Progressive Web App. Kein Backend, keine Accounts - alle Daten bleiben lokal im Browser (IndexedDB).

## Features

- Trades erfassen: Long/Short, Hebel, Entry/Exit, Stop Loss, Take Profit, Gebuehren, Notizen
- Dashboard mit Equity-Kurve und monatlichem P&L-Balkendiagramm
- Statistiken nach Asset und Strategie (Win-Rate, Profit Factor, R:R)
- Offene Positionen tracken
- JSON-Export und Import (Backup)
- Offline-faehig via Service Worker
- Installierbar als App (Android/iOS/Desktop)

## Deployment auf GitHub Pages

1. Repo auf GitHub erstellen (public oder private mit Pages aktiviert)
2. Alle Dateien pushen
3. In den Repo-Settings unter **Pages** -> Source: **GitHub Actions** auswaehlen
4. Der Workflow unter `.github/workflows/deploy.yml` deployed automatisch bei jedem Push auf `main`

## Lokaler Start

Einfach `index.html` in einem lokalen HTTP-Server oeffnen:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Dann im Browser: `http://localhost:8080`

**Hinweis:** Direkt als `file://` oeffnen funktioniert wegen Service Worker und IndexedDB-Restriktionen nicht zuverlaessig - immer einen HTTP-Server nutzen.

## Datensicherung

Ueber den **Export**-Button laedt sich eine `.json`-Datei herunter. Diese kann mit **Import** in einer anderen Instanz oder nach einem Geraetewechsel wieder eingelesen werden.

## Technologie

- React 18 (via CDN, kein Build-Tool)
- Recharts 2 fuer Charts
- Babel Standalone fuer JSX-Transformation im Browser
- IndexedDB fuer persistente lokale Datenhaltung
- Service Worker fuer Offline-Support und PWA-Installation
