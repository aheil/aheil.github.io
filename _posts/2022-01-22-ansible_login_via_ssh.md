---
title: Ansible Login via SSH schlägt fehl
tags: [Automatisierung]
description: Warum nur liefert Ansible immer *"Failed to connect to the host via ssh*. Der Fehler liegt in den wenigsten Fällen an Ansible selbst. 
---

## tl;dr 

Liefert Ansible trotz korrekter Einstellungen und SSH-Konfiguration den Fehler *"Failed to connect to the host via ssh*, liegt es vermutlich am Nutzer. 

## Der Fehler 

Angenommen Ihr könnt Euch via SSH problemlos auf einen Rechner verbinden aber Ansible liefert trotzdem folgenden Fehler, artet die Fehlersuche schnell in einer Aufgabe epischen Ausmaße aus. Lösungsvorschläge gibt es im Nutz viele, funktionieren werden nur die wenigsten. 

```bash 
ASK [Gathering Facts] *************************************************************************************************
fatal: [192.168.1.1]: UNREACHABLE! => {"changed": false, "msg": "Failed to connect to the host via ssh: root@192.168.1.1: Permission denied (publickey).", "unreachable": true}
```

## Vorabcheck 

Zunächst gilt es zu prüfen, ob der korrekte private SSH-Schlüssel gezogen wird. Sollte eine SSH-Verbindung zum betroffenen Server möglich sein, sollte sich ein ähnlicher Eintrag wie folgt in der Datei `~/.ssh/config` finden.

```
Host 192.168.1.1
    User root
    IdentityFile ~/.ssh/id_ed25519
```
D.h. bei einer SSH-Verbindung zum Server mit der IP 192.168.1.1 wird für den Login mit dem User `root` (ob das grundlegend eine gute Idee ist, gilt es an anderer Stelle zu diskutieren ) der private Schlüssel aus `~/.ssh/id_ed25519` genutzt.
 
Beim Aufruf von `ssh 192.168.1.1` sollte nach dem Passwort gefragt werden:

```bash
Enter passphrase for key '/home/andreas/.ssh/id_ed25519':
```

Sofern dies bekannt ist und korrekt eingegeben wurde sollte der Verbindungsaufbau nach der Eingabe ohne Probleme möglich sein. 

## Versuch 1 - Passwort 

Ansible bietet die Möglichkeit nach dem SSH-Passwort beim Start eines Playbooks via `--ask-key` oder `-k` zu fragen. 

Sollte hierbei folgende Meldung erscheinen gilt es zunächst das Paket `sshpass`zu installieren. 

```bash
TASK [Gathering Facts] *************************************************************************************************
fatal: [192.168.1.1]: FAILED! => {"msg": "to use the 'ssh' connection type with passwords, you must install the sshpass program"}
```

Danach sollte Ansible nach dem Aufruf des Playbooks nüchtern nach dem Passwort fragen: 

```bash
SSH password:
```

## Versuche 2 - Keyfile

Resultiert das Ausführen des Playbooks noch immer im ursprüngliche Fehler kann auch noch das entsprechende Keyfile spezifiziert werden. In diesem Fall werden die Einstellungen aus `~/.ssh/config` ignoriert. 

```bash
 sudo ansible-playbook playbook.yml -i hosts --ask-key --key-file "~/.ssh/id_ed25519"
```
Dieses Mal sollte Ansible mit einer aussagekräftigeren Fehlermeldung protestieren: 

```bash
TASK [Gathering Facts] *************************************************************************************************
fatal: [192.168.1.1]: UNREACHABLE! => {"changed": false, "msg": "Failed to connect to the host via ssh: no such identity: /root/.ssh/id_25519: No such file or directory\r\nroot@192.168.1.1: Permission denied (publickey).", "unreachable": true}
```

Das Problem scheint also darin zu liegen, dass Ansible die Datei für den privaten Schlüssel in dem Home-Verzeichnis des Users sucht, mit dem man sich versucht einzuloggen (im vorliegenden Fall `root`).

Mit einer kleinen Änderung des Pfades lässt sich das Problem nun beheben:

```bash
 sudo ansible-playbook playbook.yml -i hosts --ask-key --key-file "/home/andreas/.ssh/id_ed25519"
```

## Fazit 

Der Fehler muss nicht immer an der Software liegen, sondern kann auch gänzlich andern Ursprungs sein. Problematisch im vorliegen Fall ist bzw. war jedoch, dass das Verhalten auf zwei unterschiedlichen Maschinen gänzlich unterschiedlich ist. 

## Systemkonfiguration 

- Windows 11 Pro (10.0.22000 Build 22000)
- WSL 2.0 
- Ubuntu 20.04
- Ansible 2.9.6
- Python 3.8.10 

