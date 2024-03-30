---
title: The missing Link of the Minecraft Server in the Kinderzimmer
tags: ["mindcraft"]
description: "Minecraft als Familienspiel" 
---

## tl;dr 

Minecraft als Familienspiel: Vor wenigen Tagen berichtet [Ralf Stockman](https://chaos.social/@rstockm) in [Episode FS276 der Freakshow](https://freakshow.fm/fs276-remember-we-are-in-the-eighties-so-dress-accordingly) über Minecraft als Familienspie - und verweist auf [seine umfassende Zusammenfassung zur Installation und Setup](https://pad.wolkenbar.de/s/minecraft). Hier werden einige "missing Links" ergänzt, insbesondere, wenn der  Server selbst in Docker gehostet wird.  

## Hintergrund

![DALL·E 3 generiertes Bild, Prompt: Hacker Dad, der mit seinem Sohn Minecraft spielt und viel Spaß dabei hat.](/img/2024-03-29-hacker-dad-minecraft.jpg)

Mein (jetzt) 6-jähriger Sohn liegt mir schon seit geraumer Zeit in den Ohren, dass er Minecraft spielen möchte. Wir sind so verblieben, dass ich vorschlug es zu kaufen wenn das Spiel im Sonderangebot zu haben sei. Seither kommt täglich die Frage, ob Minecraft im Sonderangebot ist. Ok, selbst schuld. Warum ich es bisher hinausgezögert habe, ist die geringe Kontrolle im gesamten Ökosystem. Da kam der Bericht bzw. der Zusammenschreib von Ralf Stockman gerade recht. Am Ende hat es mich ein Abend und ein Vormittag gekostet alles aufzusetzen. Und 100€ für Lizenzen auf zwei Plattformen als auch den Gebühren für Nintendo Online und XBOX Live. Danke der Anleitung von Ralf hat es mich nur 5% der Nerven gekostet, die so ein Unterfangen sonst hätte - mit zwei kleinen Kindern im Haushalt. Betroffene wissen sehr wohl, wovon ich rede. 

## Setup

Das hier zugrundeliegende Setup unterscheidet sich leicht von Ralfs Setup - vorrangig auf Serverseite, daher empfiehlt es sich zunächst die Seite von Ralf durchzuarbeiten. 

Das Setup hier:

- Minecraft auf PC (via Windows Store)
- Minecraft auf Nintendo Switch 
- Minecraft auf Xbox
- **Bedrock Minecraft Server auf einem eigene Server via Docker, Docker Compose, provisioniert mit Ansible**

### Bedrock Server als Container  

Das Images [itzg/minecraft-bedrock-server](https://hub.docker.com/r/itzg/minecraft-bedrock-server) hat in meinem Fall ohne Probleme funktioniert. Allerdings hat die Dokumentation einige Schwächen. Die ansonst zügige Installation wurde durch unnötige Recherche etwas (ca. 2h) in die Länge gezogen.

Grund hierfür war, daß alles via Docker Compose gestartet werden sollte. Einige Parameter sind nur für die Kommandozeile erläutert. Der Link zur Compose-Datei läuft erst einmal auf einen 404-Fehler - bis man realisiert hat, dass es sich dabei ja um einen [Ordner](https://github.com/itzg/docker-minecraft-bedrock-server/tree/master/examples) bzw. eine [Datei](https://github.com/itzg/docker-minecraft-bedrock-server/blob/master/examples/docker-compose.yml) auf der [GitHub Seite](https://github.com/itzg/docker-minecraft-bedrock-server) handelt.

### Docker Compose 

Die `docker-compose.yml` ist überwiegend dem Beispiel entliehen. 
Nur um dem Fall vorzugreifen, dass wir später weitere Spieler auf den Server holen, ist `DEFAULT_PLAYER_PERMISSION_LEVEL` in unserem Fall "member". Die Operators regeln wir gleich im Anschluss. 

Weiterhin gab es Änderungen bzgl. der Whitelist. Diese lässt sich nun via `ALLOW_LIST: "true"` aktivieren. Die Liste der zugelassenen Spieler selbst wird über `ALLOW_LIST_USERS: "gamertag1,gamertag22345"`geregelt. Die List der User sind keine xuid-Einträge, sondern die echten XBOX-Gamertags. Achtung: Bei meinem Gamertag (aheil) handelt es sich um eines der erste Gamertags, die auch genau so in die Liste aufgenommen werden. Neuere Gamertags erhalten alle ein Suffix. So wird der Gamertag `gamertag2#2345` in die Liste mit `gamertag22345` aufgenommen. Mehr zu den Gamertags Suffixen gibt es in der [Gamertag FAQ]([gamertag22345](https://support.xbox.com/en-US/help/account-profile/profile/gamertag-update-faq)). Ansonsten verwende ich standardmäßig das [local-persist Volume Plugin](https://github.com/MatchbookLab/local-persist) für Docker. 


```docker
version: '3.4'

services:
  bds:
    image: itzg/minecraft-bedrock-server
    environment:
      SERVER_NAME: "MeinCraftServer"
      EULA: "TRUE"
      GAMEMODE: survival
      DIFFICULTY: peaceful
      ALLOW_CHEATS: "true"
      ONLINE_MODE: "true"
      DEFAULT_PLAYER_PERMISSION_LEVEL: "member"
      ALLOW_NETHER: "true"
      ALLOW_LIST: "true"
      ALLOW_LIST_USERS: "gamertag1,gamertag2gamertag22345"
    ports:
      - 19132:19132/udp
    volumes:
      - minecraft-storage:/data
    stdin_open: true
    tty: true

volumes:
  minecraft-storage:
    driver: local-persist
    driver_opts:
      mountpoint: /srv/minecraft

```

### Ansible Skript 

Die Provisionierung findet auf meinem Server via Ansible statt. Schließlich halte ich eine DevOps-Vorlesung. Das muss daher automatisiert sein. Das ganze ist eher unspektakulär und entspricht 90% meiner restlichen Skripte.

```ansible
- name: Make sure install dir is present
  file:
    path: "{{ MINECRAFT_INSTALL_DIR }}"
    state: directory
  tags:
    - minecraft

- name: Make sure data dir is present
  file:
    path: "{{ MINECRAFT_DATA_DIR }}"
    state: directory
  tags:
    - minecraft

- name: Copy the required files
  copy: 
    src: files/
    dest: "{{ MINECRAFT_INSTALL_DIR }}"
    force: yes
  tags:
    - minecraft

- name: Pull docker images and start containers 
  docker_service:
    project_src: "{{ MINECRAFT_INSTALL_DIR }}"
    build: no
    remove_orphans: yes
    state: present
    restarted: yes
  tags:
    - minecraft
```
Die kopierten Files (im vorliegen Fall die `docker-compose.yml`) und die Daten liegen bei mir getrennt. 

```yml
MINECRAFT_INSTALL_DIR: /opt/minecraft
MINECRAFT_DATA_DIR: /srv/minecraft
```

Ich führe täglich ein Backup des `srv`-Ordners durch, dadurch ist auch mein gesamter Minecraft Server tagesaktuell im Backup.

> Kein Backup, kein Mitleid!

Das Vorgehen macht weniger Kopfschmerzen, z.B. wenn die Whitelist eingespielt wird, wird per Ansible das Skript neu ausgeführt, dadurch die neue `docker-compose.yml` auf den Server kopiert und dieser mit der neuen Whitelist gestartet. Das ganze dauert ca. 10 Sekunden. 


# Operators 

Das einzige, was nicht via Docker Compose zu setzen war. Sollte eigentlich via `OPS: "gamertag1"` oder `OPS: "xuid"` [funktionieren](https://containers.fan/posts/setup-minecraft-server-on-docker/). Tut es aber nicht. Von daher ist das per Fuß zu erledigen. 

Dazu muss man einen Blick in das Datenverzeichnis (bei mir `/srv/minecraft`) werfen und die `permissions.json` anpassen.

![Datenverzeichnis eines Minecraft Servers](/img/2024-03-29-srv-dir.png)

Die Datei sieht dann so aus: 

![Inhalt einer Minecraft Server permissions.json](/img/2024-03-29-permissions-json.png)

Wenig spektakulär und ohne Geheimnisse kann man die _xuid_ z.B. [hier](https://www.cxkes.me/xbox/xuid) abfragen und bekommt damit folgende Ausgabe für mein Gamertag:

![Graphische Darstellung einer XBOX User ID (xuid)](/img/2024-03-29-xuid.png)

Im Gegensatz zur Docker-Compose muss hier tatsächlich die _xuid_ (Xbox user ID oder Xbox service ID, Microsoft ist da eher ambivalent was den eigentlich Namen angeht) eingegeben werden. 

### DNS Einträge

Die DNS-Einträge sind wir von Ralf beschrieben vorzunehmen. 

- Primärer DNS: `104.238.130.180`
- Sekundärer DNS: `1.1.1.1` oder `8.8.8.8`

Woher stammt die ominöse IP-Adresse? Es handelt sich dabei um einen [BedrockConnect Server](https://github.com/Pugmatt/BedrockConnect): 

> BedrockConnect is an easy to use solution for Minecraft Bedrock Edition players on Xbox One, Nintendo Switch, PS4/PS5 to join any server IP, while also having access to a serverlist that allows you to manage a list of servers. It doesn't require any downloads, just a few changes to settings.

Neben der `104.238.130.180` gibt es noch weiter IPs bzw. Server, die verwendet werden können. Vermutlich ist der Server eine der ersten Sollbruchstellen im gesamten Setup.

**Nicht Vergessen die XBOX neu zu starten**

Nach dem Ändern der DNS Einträge sollte unbedingt die XBOX durchgestartet werden. Die geänderten DNS-Einträge werden bei der XBOX augenscheinlich nicht direkt gezogen. Bei der Switch wurde der primäre DNS-Server bei mir ohne Neustart problemlos übernommen.

## Hive Server

Was mich tatsächlich mehrere Stunden an der Xbox gekostet hat, war die Verbindung zum meinem Server. Das war in allen Videos (und auf im Artikel von Ralf) nicht beschrieben. 

Grundsätzlich muss ein Server ausgewählt werden, der selbst eine Liste von Minecraft Servern anbiete. 

![Switch Screennshot - Minecraft Serverauswahl](/img/2024-03-29-hive.jpeg)

Hier taucht der magische Bildschirm auf, in dem der eigene Server ausgewählt bzw. in die Liste eingetragen werden kann. Einmal eingetragen, kann man den Server dort immer wieder finden.

![Switch Screenshot - Minecraft ServerList ](/img/2024-03-29-serverlist.md)

Tatsächlich habe ich es ca. 2h mit einem anderen Server versucht, der diese Option nicht anbiete. Den entscheidenden Hinweis habe ich [diesem Video](https://youtu.be/MBj3NuCjyFo?si=mVWZs5u56xK90Ctq) von [Cove Wolf](https://www.youtube.com/@CoveWolf/) erhalten.

<iframe width="560" height="315" src="https://www.youtube.com/embed/MBj3NuCjyFo?si=_TYanp_ETajN18Zo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Hinweis:** Der Eintrag muss auf jedem Gerät entsprechend vorgenommen werden.

## Backups 

Optional wäre der [kaiede/minecraft-bedrock-backup](https://hub.docker.com/r/kaiede/minecraft-bedrock-backup) Backup-Container noch eine Möglichkeit den Minecraft Server zu backupen. Ich selbst habe es nicht getestet, da die Backups über meine bereits existierende Lösung zum Nulltarif mitkommen. Erfahrungsberichte gerne an [mich](https://chaos.social/@aheil). 

## Links 
- Ralf Stockmann auf Mastodon: [https://chaos.social/@rstockm](https://chaos.social/@rstockm) 
- Minecraft in der Familie mit jüngeren Kindern spielen - Wege zum Ziel: 
[https://pad.wolkenbar.de/s/minecraft](https://pad.wolkenbar.de/s/minecraft)
- BedrockConnect auf GitHub: [https://github.com/Pugmatt/BedrockConnect](https://github.com/Pugmatt/BedrockConnect) 
- itzg/minecraft-bedrock-server auf DockerHub: [https://hub.docker.com/r/itzg/minecraft-bedrock-server](https://hub.docker.com/r/itzg/minecraft-bedrock-server)
- Geoff Bourne`s docker-minecraft-bedrock-server auf GitHub: [https://github.com/itzg/docker-minecraft-bedrock-server](https://github.com/itzg/docker-minecraft-bedrock-server)
- Gamertag FAQ: (https://support.xbox.com/en-US/help/account-profile/profile/gamertag-update-faq)[https://support.xbox.com/en-US/help/account-profile/profile/gamertag-update-faq]
- Local Persist Volume Plugin for Docker: [https://github.com/MatchbookLab/local-persist](https://github.com/MatchbookLab/local-persist)
- https://www.cxkes.me/xbox/xuid [https://www.cxkes.me/xbox/xuid](https://www.cxkes.me/xbox/xuid)

