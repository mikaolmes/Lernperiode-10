# Lern-Periode 10

25.4.2025 bis 27.6.2025

## Grob-Planung

1. Welche Programmiersprache möchten Sie verwenden? Was denken Sie, wo Ihre Zeit und Übung am sinnvollsten ist?
  - C#
  - js
3. Welche Datenbank-Technologie möchten Sie üben? Fühlen Sie sich sicher mit SQL und möchten etwas Neues ausprobieren; oder möchten Sie sich weiter mit SQL beschäftigen?
  - SQL Datenbank
4. Was wäre ein geeignetes Abschluss-Projekt?
  - MotoLog
  - Webseite wo man seine Motorräder hinzufügen kann oder wann die letzte Wartung war.

## 25.4

Welche 3 *features* sind die wichtigsten Ihres Projektes? Wie können Sie die Machbarkeit dieser in jeweils 45' am einfachsten beweisen?

- [ ] *make or break feature* 1: Man soll seine Motorräder hinzufügen können, also die CRUD Operationen verwenden (Create, Read, Update, Delete)
- [ ] *make or break feature* 2: Man soll einen Service Eintrag zu seinem Motorrad machen können, also wann der letzte Ölwechsel oder Reifenwechsel war, Kilometerstand und Beschreibung zum Motorrad.
- [ ] *make or break feature* 3: Man soll einen Account erstellen können und sich danach anmelden können. Und wenn man sich wieder anmeldet sollen alle Motorräder die letztes mal hinzugefügt wurden wieder aufrufen können.


✍️ Heute habe ich mein Projekt gefunden und auch die Exploration bzw. den Prototyp gestartet. Ich habe das Backend aufgesetzt und kann es auch schon starten, jedoch kann ich noch keine CRUD-Operationen verwenden, ich bekomme lediglich einen Fehlercode, diesen muss ich das nächste mal beheben. Den Code habe ich in einem seperaten Branch namens `master` hochgeladen, ich werde es versuchen das nächste mal den Branch `exploration` nennen. (66 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen. Ggf. bietet es sich an, für die Code-Schnipsel einen eigenen Ordner `exploration` zu erstellen.

## 2.5

Ausgehend von Ihren Erfahrungen vom 25.4, welche *features* brauchen noch mehr Recherche? (Sie können auch mehrere AP für ein *feature* aufwenden.)

- [X] Wie repariere ich den Fehlercode (GET-Operationen) --> recherchieren wie ich die CRUD-Operationen richtig implementiere
- [ ] Allgemeines Grundgerüst des Frontends bauen (Header, Footer, Aside...)
- [X] Welche Funktionen soll es noch geben, weitere Features suchen die zur Webseite passen könnten --> Exploration
- [X] Gedanken über das Frontend machen, auf Papier skizieren (📵)

✍️ Heute habe ich Alle Crud Operationen implementiert, dazu gehören die GET, POST, PUT und die DELETE Operation. Diese habe ich auch schon getestet und es hat funktioniert. Und während dem Offline-Arbeitspaket habe ich mir noch gedanken über weitere Features geamcht und ebenfalls für ein Aussehen eines Frontends das zu diesem Backend passen würde, nächstes mal Probiere ich schon die erste Webseite zu bauen. (64 Wörter)

☝️ Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 9.5

Planen Sie nun Ihr Projekt, sodass die *Kern-Funktionalität* in 3 Sitzungen realisiert ist. Schreiben Sie dazu zunächst 3 solche übergeordneten Kern-Funktionalitäten auf: 

1. Kern-Funktionalität: Man soll Motorräder mithilfe der CRUD-Operationen hinzufügen können
2. Kern-Funktionalität: Man soll Service Einträge mithilfe der Crud-Operationen hinzufügen können, diese auch mit einem Motorrad verbinden (Bei welchem Motorrad wurde der Service vorgenommen)
3. Kern-Funktionalität: Login + Regristrierung auf der Webseite.

Diese Kern-Funktionalitäten brechen Sie nun in etwa 4 AP je herunter. Versuchen Sie jetzt bereits, auch die Sitzung vom 16.5 und 23.5 zu planen (im Wissen, dass Sie kleine Anpassungen an Ihrer Planung vornehmen können).

- [X] Allgemeines Grundgerüst der Webseite (Frontend) Aufbauen
- [X] Farben die ich für die Webseite benutzen möchte raussuchen und implementiern in einem passenden Design
- [ ] Login/Regristrierung implementieren
- [ ] Login.html Seite anfangen zu bauen

✍️ Heute habe ich angefangen meine Webseite zu bauen und habe es deshalb geschafft ein kleines Grundgerüst mit Farben aufzubauen. Leider habe ich es nicht geschafft die Funktionen zu implementieren. Also das ich Einträge hinzufügen kann. Dafür habe ich schon ein Grundgerüst für diesen Eintrag ich muss es nur noch mit meiner Datenbank verbinden. 
Als ich den Code hochladen wollte, ist ein Fehler aufgetreten, anscheinend habe ich nichts zu commiten, ich werde es versuchen bis heute Abend (09.05.2025) noch zu machen. (80 Wörter)

☝️  Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 16.5

- [ ] Feature: Motorräder hinzufügen können
- [ ] Feature: Service Entry hinzufügen können
- [ ] Die Einträge sollen in der Datenbank gespeichert werden und beim starten werden alle die schon hinzugefügten Einträge geladen werden
- [ ] Die Webseite hosten --> Github Pages?

✍️ Heute habe ich als aller erstes geschaut wie ich den Code mit git bash hochlade, und dabei hatte ich einen riesen Problem, er wollte es nicht hochladen und es hat etwas länger gebraucht. Danach habe ich probiert die verwaltung der Motorräder und Service Entries. Leider habe ich es nicht ganz geschaft, aber es fehlt nicht mehr viel und dann sollte es funktionieren. Daraufhin habe ich mir schon ein paar gedanken gemacht wie ich am Schluss die Webseite hosten möchte. (80 Wörter)

☝️  Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 23.5

- [X] Feature: Motorräder hinzufügen können
- [ ] Feature: Service Entry hinzufügen können
- [X] Die Einträge sollen in der Datenbank gespeichert werden und beim starten werden alle die schon hinzugefügten Einträge geladen werden
- [ ] Webseite probieren zu hosten

✍️ Heute habe ich es endlich geschafft die Funktion Motorräder hinzuzufügen zu können. Dazu habe ich auch schon die Bearbetîtungs Funktion und Löschen Funktion hinzugefügt, leider ist das Design noch nicht perfekt, aber das ist erstmal zweitrangig. Das nächste mal sollte ich es ziemlich schnell schaffen die ServiceEinträge zu implementieren. (50 Wörter)

☝️  Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 6.6

- [X] Feature: Service Entries hinzufügen können
- [X] Feature: Servie Entries Bearbeiten können
- [X] Feature: Servie Entries Löschen können
- [ ] Webseite Probieren zu hosten

✍️ Heute habe ich es geschafft das ich Service Entries hinzufügen, bearbeiten und löschen kann. Somit habe ich meine Kernfunktionalitäten erfüllt. Das nächste mal muss ich Bilder einfügen und mehr Farben einfügen, damit es ein wenig einladener aussieht. Und wenn noch Zeit ist würde ich gerne noch ein Login machen, aber das ist eher zweitrangig. (55 Wörter)


Ihr Projekt sollte nun alle Funktionalität haben, dass man es benutzen kann. Allerdings gibt es sicher noch Teile, welche "schöner" werden können: Layout, Code, Architektur... beschreiben Sie kurz den Stand Ihres Projekts, und leiten Sie daraus 6 solche "kosmetischen" AP für den 6.6 und den 13.6 ab.

✍️ Mein Code kann Motorräder hinzufügen und diesen dann auch Service Einträge zu bestimmten Motorrädern hinzufügen. Jetzt würde ich gerne die Webseite noch etwas schöner machen indem ich das Layout anpasse, evtl mache ich dazu ein Offline Arbeitspaket.

- [ ] Besseres Layout ausdenken, sodass alle Einträge übersichtlich eingetragen worden sind. (📵 --> Auf Papier)
- [ ] Farben einfügen um die Webseite einladener zu machen
- [ ] Layout umsetzen, dass ich auf Papier gemacht hatte
- [ ] Hintergrundbild einfügen, dass passt, zum beispiel ein Background mit Motorrad (--> Motorcycle) und Garage (--> Service Entries)
- [ ] Animationen machen, evtl das Motorrad bauen lassen.
- [ ] Login Funktion implementieren

✍️ Heute habe ich... (50-100 Wörter)

☝️  Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 13.6

- [X] Besseres Layout ausdenken, sodass alle Einträge übersichtlich eingetragen worden sind. (📵 --> Auf Papier)
- [X] Farben einfügen um die Webseite einladener zu machen

✍️ Heute habe ich mir Gedanken gemacht was oder besser gesagt wie ich meine Webseite gestalten möchte. Ich habe mich dazu entschieden meine Einträge wie bei Youtube darstellen zu lassen. Dazu habe ich noch verschiedene Farben ausprobiert welche ich verwenden könnte, ich schwanke noch zwischen blau, weiss oder eher rötlich. (50-100 Wörter)

☝️  Vergessen Sie nicht, den Code von heute auf github hochzuladen.

## 20.6

Was fehlt Ihrem fertigen Projekt noch, um es auszuliefern? Reicht die Zeit für ein *nice-to-have feature*?

- [X] Layout umsetzen, dass ich auf Papier gemacht hatte
- [ ] Hintergrundbild einfügen, dass passt, zum beispiel ein Background mit Motorrad (--> Motorcycle) und Garage (--> Service Entries)
- [ ] Animationen machen, evtl das Motorrad bauen lassen.
- [ ] Login Funktion implementieren

✍️ Heute habe ich mein Layout fertig umgesetzt, jetzt ist es so wie ich es haben wollte, zudem habe ich noch ein wenuig die Farben angepasst. Ich habe auch versucht mit einem Python script ein Motorrad zu bauen, damit ich dies auf der webseite zu benutzen kann, hat aber nicht so funktioniert wie ich es wollte.

Bereiten Sie in den verbleibenden 2 AP Ihre Präsentation vor

- [X] Materialien der Präsentation vorbereiten
- [X] Präsentation üben

✍️ Heute habe ich ... (50-100 Wörter)

☝️  Vergessen Sie nicht, die Unterlagen für Ihre Präsentation auf github hochzuladen.

## 27.6
