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

## Build für Deployment

Statische Seite generieren:

```bash
bundle exec jekyll build
```

Die generierten Dateien befinden sich im `_site/` Verzeichnis.
