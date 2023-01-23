---
layout: leaflet
title: Sicherheitsvorfälle an Hochschulen
permalink: /edusec/
weight: 6
---

# EduSec

## Sicherheitsvorfälle an deutschen Hochschulen

Seit wir selbst an unserer Hochschule von einem Hacker-Angriff betroffen waren, sammle ich auf dieser Seite Informationen zu Vorfällen an deutschen Hochschulen. 

 <div id="map" style="height: 640px;" ></div>

Fehlende Einträge gerne an [chaos.social/@aheil](https://chaos.social/@aheil) melden. Aus OpSec-Gründen werden nur Vorfälle eingetragen, über die es mind. ein öffentliche Mitteilung gibt.
<br /><br />
Die Incident Einträge sind auf <a href="https://github.com/aheil/aheil.github.io/blob/master/assets/incidents.json">GitHub als JSON-Datei</a> verfügbar.

 <script>

var map = L.map('map').setView([51.00, 10.00], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

</script>

<script type="module" src="../assets/incidents.js" />



