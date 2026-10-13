[![pages-build-deployment](https://github.com/aheil/aheil.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/aheil/aheil.github.io/actions/workflows/pages/pages-build-deployment)

# aheil.de

Dieses Repository ist die Code-Base für meiner persönlichen Webseite unter [aheil.de](https://aheil.de).

## Voraussetzungen

- WSL (Windows Subsystem for Linux) mit Ubuntu oder Linux-System
- Ruby 3.x
- Bundler

**Hinweis:** Windows PowerShell wird nicht unterstützt. Verwenden Sie WSL Ubuntu.

## Installation & Setup

Im WSL Ubuntu Terminal:

```bash
cd /mnt/c/dev/aheil.github.io
bundle install
```

## Lokale Entwicklung

Server starten für lokale Tests:

```bash
cd /mnt/c/dev/aheil.github.io
bundle exec jekyll serve
```

Die Seite ist dann verfügbar unter `http://localhost:4000`

Der Server wird mit `Ctrl+C` beendet.

## Lokal testen mit Docker (Windows PowerShell)

Alternative ohne lokales Ruby: Jekyll läuft in einem Docker-Container. Alle Dateien liegen im Ordner [`dev-docker/`](dev-docker), der per `exclude` in `_config.yml` nie auf der Webseite veröffentlicht wird.

Voraussetzung: Docker Desktop läuft.

```powershell
.\dev-docker\start.ps1   # startet die Vorschau auf http://localhost:4000 (erster Start dauert wegen der Gems einige Minuten)
.\dev-docker\test.ps1    # Smoke-Test der laufenden Vorschau (Testimonials, Theme-CSS, Ausschluss von dev-docker)
.\dev-docker\stop.ps1    # stoppt den Container (-PurgeGems löscht zusätzlich den Gem-Cache)
```

Hinweise:

- Dateiänderungen werden automatisch neu gebaut, nur `_config.yml`-Änderungen erfordern einen Neustart (`start.ps1`).
- `dev-docker/jekyll.local.yml` ergänzt `_config.yml` nur lokal: Die Seiten `projects`, `lectures` und `hhn_links` sind ausgeblendet, da sie die GitHub-API nutzen und ohne Token ins Rate-Limit laufen. Außerdem wird die veraltete, ignorierte `aheil.css` ausgeschlossen, damit die frisch kompilierte CSS verwendet wird.
- Logs: `docker logs aheil-jekyll`

## Testimonials-Komponente

Auf der Startseite zeigt die Web Component `<student-testimonials>` Stimmen von Studierenden. Die Texte stehen in `assets/js/testimonials-data.js`. Details zu Aufbau und Wartung: [`.github/instructions/testimonials.instructions.md`](.github/instructions/testimonials.instructions.md).

## Build für Deployment

Statische Seite generieren:

```bash
bundle exec jekyll build
```

Die generierten Dateien befinden sich im `_site/` Verzeichnis.
