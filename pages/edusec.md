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

var _year2018Opacity = 0.4;
var _year2019Opacity = 0.4;
var _year2022Opacity = 0.5;
var _year2021Opacity = 0.5;
var _year2022Opacity = 0.7;
var _year2023Opacity = 1.0;

var map = L.map('map').setView([51.00, 10.00], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

<!-- - Vorfälle 2018 ---> 

var marker_uniulm = L.marker([48.42663630237683, 9.954956005537442]).addTo(map);
marker_uniulm.bindPopup("<b>Universität Ulm</b><br>26.09.2019<br>https://www.uni-ulm.de/en/forschung/forschung-aktuell-details/article/hackerangriff-an-der-universitaet-offenbar-keine-daten-manipuliert-oder-missbraucht/").setOpacity(_year2018Opacity);

<!-- - Vorfälle 2019 ---> 

var marker_medhanover = L.marker([52.384706507048335, 9.804138466565322]).addTo(map);
marker_medhanover.bindPopup("<b>Medizinische Hochschule Hannover</b><br>26.09.2019<br>https://www.heise.de/newsticker/meldung/Emotet-befaellt-Medizinische-Hochschule-Hannover-4541189.html").setOpacity(_year2019Opacity);

var marker_giessen = L.marker([50.58073525472247, 8.677098435280982]).addTo(map);
marker_giessen.bindPopup("<b>Universität Gießen</b><br>09.12.2019<br>https://www.heise.de/newsticker/meldung/Uni-Giessen-offline-und-lahmgelegt-Cyber-Ermittler-eingeschaltet-4608662.html").setOpacity(_year2019Opacity);

var marker_kathfr = L.marker([48.00400789691404, 7.857480726868274]).addTo(map);
marker_kathfr.bindPopup("<b>Katholische Hochschule Freiburg</b><br>19.12.2019<br>https://www.heise.de/newsticker/meldung/Shutdown-der-IT-Infrastruktur-Malware-befaellt-Katholische-Hochschule-Freiburg-4620194.html").setOpacity(_year2019Opacity);

<!-- - Vorfälle 2021 ---> 

var marker_tuberlin = L.marker([52.51259746641021, 13.32691241005908]).addTo(map);
marker_tuberlin.bindPopup("<b>TU Berlin</b><br>21.06.2021<br>https://www.heise.de/news/Cyberangriff-TU-Berlin-rechnet-mit-monatelangen-IT-Einschraenkungen-6061688.html").setOpacity(_year2021Opacity);

<!-- - Vorfälle 2022 ---> 

var marker_neuenburg= L.marker([46.99400854661084, 6.938703098338694]).addTo(map);
marker_neuenburg.bindPopup("<b>Universität Neuenburg (Neuchâtel-Université)</b><br>18.02.2022<br>https://www.fm1today.ch/schweiz/universitaet-neuenburg-von-hackern-angegriffen-145512415").setOpacity(_year2022Opacity);

var marker_phfreiburg= L.marker([47.980912680971144, 7.892471353691278]).addTo(map);
marker_phfreiburg.bindPopup("<b>PH Freiburg</b><br>10.06.2022<br>https://www.swr.de/swraktuell/baden-wuerttemberg/suedbaden/ph-freiburg-von-cyberangriff-betroffen-100.html").setOpacity(_year2022Opacity);

var marker_fhmuenster = L.marker([51.97194944789303, 7.595442493833062]).addTo(map);
marker_fhmuenster.bindPopup("<b>Fachhochschule Münster</b><br>23.06.2022<br>https://www1.wdr.de/nachrichten/westfalen-lippe/hackerangriff-fachhochschule-muenster-fh-100.html").setOpacity(_year2022Opacity);

var marker_bergischeuni = L.marker([51.24516944577138, 7.149426966813448]).addTo(map);
marker_bergischeuni.bindPopup("<b>Bergische Universität Wuppertal</b><br>26.07.2022<br>https://www1.wdr.de/nachrichten/rheinland/hackerangriff-auf-wuppertaler-universitaet-100.html").setOpacity(_year2022Opacity);

var marker_ansbach = L.marker([49.31287462029946, 10.5672619284774]).addTo(map);
marker_ansbach.bindPopup("<b>Hochschule Ansbach</b><br>20.10.2022<br>https://www.sueddeutsche.de/bayern/hackerangriff-hochschule-ansbach-lka-cyberattacke-1.5678669").setOpacity(_year2022Opacity);

var marker_hhn = L.marker([49.12188926543984, 9.211406858124464]).addTo(map);
marker_hhn.bindPopup("<b>Hochschule Heilbronn</b><br>3.11.2022<br>https://www.swr.de/swraktuell/baden-wuerttemberg/heilbronn/cyberangriff-durch-hacker-bestaetigt-hochschule-heilbronn-100.html").setOpacity(_year2022Opacity);

var marker_due = L.marker([48.40855602073308, 9.998293112505305]).addTo(map);
marker_due.bindPopup("<b>Technische Hochschule Ulm</b><br>12.11.2022<br>https://www.augsburger-allgemeine.de/neu-ulm/ulm-cyberangriff-auf-die-hochschule-ulm-id64650131.html").setOpacity(_year2022Opacity);

var marker_due1 = L.marker([51.43337049989403, 6.802082052295569]).addTo(map);
marker_due1.bindPopup("<b>Universität Duisburg-Essen</b><br>28.11.2022<br>https://www1.wdr.de/nachrichten/ruhrgebiet/universitaet-duisburg-essen-stoerung-100.html").setOpacity(_year2022Opacity);

var marker_due2 = L.marker([51.466315380571494, 7.016386593717399]).addTo(map);
marker_due2.bindPopup("<b>Universität Duisburg-Essen</b><br>28.11.2022<br>https://www1.wdr.de/nachrichten/ruhrgebiet/universitaet-duisburg-essen-stoerung-100.html").setOpacity(_year2022Opacity);

var marker_due2 = L.marker([51.4277224735187, 6.79900813012635]).addTo(map);
marker_due2.bindPopup("<b>Universität Duisburg-Essen</b><br>28.11.2022<br>https://www.t-online.de/region/essen/id_100097744/uni-duisburg-essen-erneut-opfer-eines-hackerangriffs.html").setOpacity(_year2022Opacity);

var marker_zwickau22 = L.marker([50.713909859787854, 12.49777140782187]).addTo(map);
marker_zwickau22.bindPopup("<b>Westsächsische Hochschule Zwickau</b><br>30.12.2022<br>https://www.mdr.de/nachrichten/sachsen/chemnitz/zwickau/hackerangriff-cyberangriff-cyberattacke-westsaechsische-hochschule-100.html").setOpacity(_year2022Opacity);

<!-- - Vorfälle 2023 ---> 

var marker_hh = L.marker([53.55487009539829, 10.020802615688522]).addTo(map);
marker_hh.bindPopup("<b>Hochschule für Angewandte Wissenschaften Hamburg</b><br>05.01.2023<br>https://www.heise.de/news/Hochschule-fuer-Angewandte-Wissenschaften-Hamburg-hart-von-Cyberattacke-getroffen-7449611.html");

var marker_uniinsbruck23 = L.marker([47.263601750201886, 11.383864972893273]).addTo(map);
marker_uniinsbruck23.bindPopup("<b>Universität Innsbruck</b><br>16.01.2023<br>https://www.derstandard.de/story/2000142607899/cyberangriff-auf-it-der-universitaet-innsbruck");

var marker_tufreiberg23 = L.marker([50.91832830564631, 13.340937204373903]).addTo(map);
marker_tufreiberg23.bindPopup("<b>TU Bergakademie Freiberg</b><br>19.01.2023<br>https://www.forschung-und-lehre.de/management/tu-freiberg-komplett-offline-5334").openPopup();

import incidents from '../assets/incidents.json' assert { type: 'JSON' };
console.log(data);


</script>



