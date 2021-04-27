---
layout: post
title: Hallo Welt - Website Hosting mit Jekyll und GitHub
category: Web
summary: Bloggen via Markdown mit Git und Jekyll
thumbnail: /assets/img/posts/thumbnails/wfh.jpg
permalink: /blog/website-hosting-mit-jekyll-und-gitHub
---

## tl;dr

Bloggen via Markdown mit Git und Jekyll.

## Ausgangspunkt

Fast 17 Jahre ist mein ester Blog-Eintrag her. Nach [Clemens Vasters'](https://twitter.com/clemensv) auf ASP.NET basierende Engine [dasBlog](https://github.com/poppastring/dasblog-core) war seit Jahren WordPress auch meine Wahl für meine Blog. Persönlich wurde ich mit WordPress als Engine für einen technischen Blog nie wirklich glücklich. 

Wer [Immo Landwerth auf Twitter folgt](https://twitter.com/terrajobst), kennt seine Probleme mit WordPress. Die fortwährenden Sticheleinen gipfelten sogar in einem (von einigen Followern erstngenommenen) Aprilscherz.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I’m excited to announce that today is my last day at Microsoft. Tomorrow, I’m going to join WordPress to evangelize their blogging platform.</p>&mdash; Immo Landwerth (@terrajobst) <a href="https://twitter.com/terrajobst/status/1377627947708919821?ref_src=twsrc%5Etfw">April 1, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


Was wären nun jedoch meine eigenen konkreten Anforderungen? 

* Kein PHP
* Statische Seiten
* Schreiben der Blog-Artikel in Markdown
* Nutzung eines Revisionssystem, vorzugsweise Git

## Die Lösung - Jekyll 

[Jekyll](https://jekyllrb.com/), als Engine hinter [GitHub Pages](https://pages.github.io) ermöglicht das Generieren von statischen Web-Seiten und gleichzeitig das Hosting auf GitHub. Da das Deployment über die GutHub Pages nach einem Check-In stattfindet, sind damit im Grund alle vier Anforderungen erfüllt. 

## Theming von GitHub Pages 

GitHub Pages sind durch GitHub gehostete und durch in GitHub eingecheckte Markdown Dateien generiert. GitHub Pages ermöglichen das [Customizing des Layouts](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll) mittels [einiger vorgefertigter und unterstützter Themes](https://pages.github.com/themes/). Ich habe mich allerdings für das Theme [devlopr jekyll](https://devlopr.netlify.app/) von [Sujay Kundu](https://sujaykundu.com/) als Grundlage für meine Seite entschieden und diese manuell in meine Seite eingebunden.

## Custom Domain 

Wird das Repository in GutHub direkt mit der Namen `{githubUser}.github.io` angelegt, ist die Seite direkte erreichbar. Für GitHub Pages kann allerdings auch eine [Custom Domain angelegt werde](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). In meinem Fall habe ich sowohl die Apex Domain `aheil.de` als auch die Subdomain `www.aheil.de`  dafür konfiguriert. 

Folgt man der [Anleitungen auf GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) sollten die DNS Eintrag so bzw. so ähnlich ausschauen.

![](/assets/img/posts/2021-04-27-11-26-47.png)

## SSL

Einer der Vorteile bei der Verwendung von GitHub Pages, SSL Verschlüsselung wird automatisch angeboten, sobald die Domain korrekt konfiguriert wurde. In diesem Fall dauert es einige Minuten bis das Zertifikat ausgestellt und provisioniert wurde. Danach auf jeden Fall `Enforce HTTPS` auswählen, damit die Seite nur via *https* aufgerufen  werden kann. 

![](/assets/img/posts/2021-04-27-11-48-59.png)

In diesem Sinne `Hallo Welt`! 
