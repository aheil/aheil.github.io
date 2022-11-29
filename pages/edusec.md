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

 <script>
var map = L.map('map').setView([51.00, 10.00], 6);



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var marker_hhn = L.marker([49.12188926543984, 9.211406858124464]).addTo(map);
marker_hhn.bindPopup("<b>Hochschule Heilbronn</b><br>3.11.2022<br>https://www.swr.de/swraktuell/baden-wuerttemberg/heilbronn/cyberangriff-durch-hacker-bestaetigt-hochschule-heilbronn-100.html").openPopup();

var marker_due = L.marker([48.40855602073308, 9.998293112505305]).addTo(map);
marker_due.bindPopup("<b>Technische Hochschule Ulm</b><br>12.11.2022<br>https://www.augsburger-allgemeine.de/neu-ulm/ulm-cyberangriff-auf-die-hochschule-ulm-id64650131.html").openPopup();

var marker_due1 = L.marker([51.43337049989403, 6.802082052295569]).addTo(map);
marker_due1.bindPopup("<b>Universität Duisburg-Essen</b><br>28.11.2022<br>https://www1.wdr.de/nachrichten/ruhrgebiet/universitaet-duisburg-essen-stoerung-100.html").openPopup();

var marker_due2 = L.marker([51.466315380571494, 7.016386593717399]).addTo(map);
marker_due2.bindPopup("<b>Universität Duisburg-Essen</b><br>28.11.2022<br>https://www1.wdr.de/nachrichten/ruhrgebiet/universitaet-duisburg-essen-stoerung-100.html").openPopup();

</script>

