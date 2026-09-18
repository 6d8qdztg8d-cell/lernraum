# CLAUDE.md — Schul-Datenablage / Unterrichtsmaterialien

## 1. Deine Rolle

Du bist gleichzeitig:

- Senior Product Designer
- Senior UX/UI Designer
- Senior Frontend Engineer
- Design-System-Architekt
- Accessibility-Spezialist

Deine Aufgabe ist es, eine **außergewöhnlich hochwertige, moderne und extrem benutzerfreundliche Web-App für eine Schule** zu entwerfen und umzusetzen.

Die Anwendung dient als zentrale **Datenablage für Unterrichtsmaterialien**.

Lehrpersonen können Materialien hochladen, organisieren und für Schülerinnen und Schüler bereitstellen. Schülerinnen und Schüler sollen Materialien ohne Erklärung sofort finden, ansehen und herunterladen können.

Der wichtigste Teil dieses Projekts ist das **Design und die User Experience**.

Die Website soll sich so durchdacht, ruhig, präzise und hochwertig anfühlen wie eine sehr gute Apple-Anwendung.

WICHTIG:

> Nicht einfach eine gewöhnliche Schulplattform bauen.
>
> Die Oberfläche soll sich wie ein hochwertiges digitales Produkt anfühlen, das speziell für diese Schule entwickelt wurde.

---

# 2. Hauptziel

Baue eine Schul-Datenablage, die folgende Eigenschaften verbindet:

1. **Extrem einfache Bedienung**
2. **Apple-inspirierte visuelle Qualität**
3. **Sehr gute Übersicht**
4. **Schnelles Finden von Unterrichtsmaterialien**
5. **Einfacher Upload für Lehrpersonen**
6. **Perfekte Darstellung auf Desktop, Tablet und Smartphone**
7. **Ruhiges, professionelles und modernes Erscheinungsbild**
8. **Keine unnötige Komplexität**

Jede Designentscheidung muss sich daran messen lassen:

> Kann ein Schüler oder Lehrer innerhalb von wenigen Sekunden verstehen, was er hier tun kann?

---

# 3. Produktidee

Die Plattform ist eine digitale Materialbibliothek der Schule.

## Lehrer können

- Dateien hochladen
- mehrere Dateien gleichzeitig hochladen
- Materialien bestimmten Klassen zuweisen
- Materialien bestimmten Fächern zuweisen
- Ordner oder Themen erstellen
- Titel und Beschreibung hinzufügen
- Uploads bearbeiten
- Dateien ersetzen
- Materialien löschen
- Materialien als wichtig markieren
- neue Materialien hervorheben
- Veröffentlichungsdatum festlegen
- optional Ablaufdatum festlegen
- Sichtbarkeit steuern
- Materialien per Drag & Drop hochladen
- PDF, Word, PowerPoint, Excel, Bilder, ZIP und weitere übliche Dateiformate verwalten

## Schüler können

- ihre Klasse auswählen bzw. automatisch sehen
- Fächer öffnen
- aktuelle Materialien sehen
- Dateien suchen
- nach Fach, Lehrer, Datum oder Dateityp filtern
- Dateien direkt herunterladen
- PDFs wenn möglich direkt in der App ansehen
- wichtige Materialien schnell erkennen
- zuletzt hochgeladene Materialien sehen

---

# 4. Design-Prinzipien

Das Design ist die höchste Priorität.

Orientiere dich qualitativ an modernen Apple-Produkten wie:

- macOS
- iCloud
- Apple Settings
- Apple Notes
- Apple Files
- Apple Music / Apple TV Navigation
- Apple Developer Website
- visionOS-artigen Layern und Materialien, jedoch sehr dezent

Es soll **Apple-inspiriert**, aber kein billiger Apple-Klon sein.

## Visuelle Grundregeln

Die Oberfläche soll:

- hell
- ruhig
- hochwertig
- weich
- präzise
- aufgeräumt
- großzügig
- vertrauenswürdig
- modern

wirken.

Vermeide:

- aggressive Farben
- übermäßig viele Karten
- dicke Borders
- grelle Gradients
- Neon-Effekte
- Gamer-UI
- übertriebene Glassmorphism-Effekte
- riesige Schatten
- zu viele Icons
- unnötige Linien
- überladene Dashboards
- klassische Bootstrap-Optik
- Admin-Template-Look
- Tabellenwüsten

---

# 5. Apple-inspirierte Design-Sprache

## 5.1 Typografie

Nutze bevorzugt einen System-Font-Stack:

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Display",
  "SF Pro Text",
  "Segoe UI",
  sans-serif;
```

Falls SF Pro nicht vorhanden ist, darf **keine Font-Datei extern vorausgesetzt werden**. Das Design muss mit Systemfonts weiterhin hochwertig aussehen.

### Typografische Hierarchie

Große Seitentitel:

- 32–40 px Desktop
- 28–32 px Tablet
- 24–28 px Mobile
- Gewicht: 650–700
- leicht negatives Letter Spacing

Abschnittstitel:

- 20–24 px
- Gewicht: 600–650

Body:

- 15–17 px
- gute Lesbarkeit
- line-height ca. 1.45–1.6

Secondary Text:

- 13–15 px
- reduzierte Deckkraft
- niemals zu kontrastarm

Labels:

- 12–13 px
- medium / semibold
- kein übermäßiges Uppercase

---

# 6. Farben

Die Website soll zunächst als hochwertige Light-Mode-Anwendung gestaltet werden.

Optional kann zusätzlich Dark Mode implementiert werden.

## Grundpalette

Hintergrund:

```css
#F5F5F7
```

Primäre Flächen:

```css
#FFFFFF
```

Primärer Text:

```css
#1D1D1F
```

Sekundärer Text:

```css
#6E6E73
```

Dezente Trennlinien:

```css
rgba(0,0,0,0.08)
```

Apple-artiges Blau für primäre Interaktionen:

```css
#0071E3
```

Hover:

```css
#0077ED
```

Nutze Statusfarben sparsam:

- Grün = erfolgreich/verfügbar
- Orange = Hinweis
- Rot = kritisch/löschen
- Blau = primäre Aktion / aktive Auswahl

Farben sollen Funktion kommunizieren und nicht zur Dekoration verwendet werden.

---

# 7. Layout-System

## Desktop

Nutze ein App-Shell-Layout:

```text
┌──────────────────────────────────────────────────────┐
│ Sidebar │             Hauptinhalt                    │
│         │                                            │
│         │                                            │
│         │                                            │
└──────────────────────────────────────────────────────┘
```

### Sidebar

Breite ungefähr:

```text
240–280 px
```

Die Sidebar soll ruhig und elegant sein.

Sie enthält beispielsweise:

- Schul-Logo / Schulname
- Übersicht
- Materialien
- Fächer
- Klassen
- Favoriten / Wichtig
- Uploads
- Lehrerbereich
- Einstellungen

Nur relevante Navigation anzeigen.

Schüler sehen keine Lehrer-Adminfunktionen.

Aktiver Menüpunkt:

- leicht getönter Hintergrund
- kleine Akzentfarbe
- kein aggressiver Balken
- abgerundete Form
- klare Textgewichtung

### Hauptbereich

Maximale Inhaltsbreite verwenden, aber Lesbarkeit schützen.

Großzügige Innenabstände:

```text
Desktop: 32–48 px
Tablet: 24–32 px
Mobile: 16–20 px
```

---

# 8. Navigation

Die Navigation muss so einfach sein, dass keine Anleitung notwendig ist.

## Desktop

Sidebar + obere Utility-Leiste.

## Mobile

Keine permanente Sidebar.

Stattdessen:

- kompakte obere Navigation
- optional Bottom Navigation
- Sheet / Drawer für weitere Punkte

Mobile Navigation könnte enthalten:

- Start
- Materialien
- Fächer
- Suche
- Profil

---

# 9. Startseite / Dashboard für Schüler

Die Startseite darf nicht wie ein kompliziertes Analytics-Dashboard wirken.

Sie soll eher eine persönliche Materialübersicht sein.

## Header

Beispiel:

```text
Guten Morgen, Luca.
Hier findest du die neuesten Materialien für deine Klasse.
```

Darunter eine große, elegante Suche:

```text
Materialien, Fächer oder Dateien suchen …
```

Die Suchleiste soll Apple-Spotlight-artig wirken:

- großzügige Höhe
- Search Icon
- weicher Hintergrund
- subtiler Fokuszustand
- keine harte Border

---

# 10. Dashboard-Bereiche

## Neu für dich

Zeige neue Materialien der letzten Tage.

Beispiel:

```text
Neu für dich

Mathematik
Arbeitsblatt – Lineare Funktionen
Heute · PDF · 2.4 MB
```

## Deine Fächer

Fächer als ruhige visuelle Elemente.

Nicht zehn bunte Karten.

Jedes Fach kann eine sehr subtile eigene Akzentfarbe besitzen.

Beispiel:

```text
Mathematik
12 neue Materialien

Deutsch
3 neue Materialien

Englisch
5 neue Materialien
```

## Wichtig

Vom Lehrer als wichtig markierte Dateien.

## Zuletzt geöffnet

Materialien, die der Schüler zuletzt angesehen hat.

---

# 11. Materialbibliothek

Dies ist die wichtigste Seite.

Sie muss extrem gut gestaltet sein.

## Header

```text
Materialien
Alle Unterrichtsmaterialien deiner Klasse.
```

Rechts oder darunter:

- Suche
- Filter
- Sortierung

## Filter

Filter dürfen die Seite nicht überladen.

Nutze kleine elegante Filter-Chips oder ein Filter-Popover.

Mögliche Filter:

- Fach
- Lehrer
- Dateityp
- Zeitraum
- Neu
- Wichtig

Beispiel:

```text
[ Alle Fächer ▾ ] [ Dateityp ▾ ] [ Neueste ▾ ]
```

Auf Mobile als Bottom Sheet.

---

# 12. Darstellung von Dateien

Unterrichtsmaterialien sollen nicht wie rohe Serverdateien aussehen.

Jede Datei erhält eine hochwertige Darstellung.

## Desktop-Variante

Eine moderne Liste ist bevorzugt.

Beispiel:

```text
[PDF Icon]  Lineare Funktionen – Arbeitsblatt
            Mathematik · Herr Müller
            Heute, 09:42 · 2.4 MB

                                  [Download]
```

Zusätzliche Informationen nur wenn relevant.

## Dateityp-Icons

Verwende konsistente, hochwertige Icons.

Zum Beispiel:

- PDF
- DOCX
- PPTX
- XLSX
- ZIP
- Bild
- Video

Keine bunten Clipart-Symbole.

Icons dürfen eine dezente Typfarbe besitzen.

---

# 13. Datei-Detailansicht

Beim Öffnen eines Materials:

```text
← Mathematik

Lineare Funktionen – Arbeitsblatt

Herr Müller
Hochgeladen am 9. September 2026

[ PDF Vorschau ]

[ Herunterladen ]
```

Zusätzlich:

- Beschreibung
- Dateigröße
- Dateityp
- Fach
- Klasse
- ggf. weitere Anhänge

Die Download-Aktion muss sofort sichtbar sein.

---

# 14. PDF Preview

Wenn eine PDF geöffnet wird, soll sie wenn technisch sinnvoll direkt in der Website angezeigt werden.

Desktop:

```text
┌──────────────────────────────┬───────────────┐
│                              │ Dateiinfos    │
│          PDF Preview         │               │
│                              │ Download      │
│                              │               │
└──────────────────────────────┴───────────────┘
```

Mobile:

PDF Preview über volle Breite, Informationen darunter.

---

# 15. Lehrer-Dashboard

Lehrer brauchen eine klare Arbeitsoberfläche.

Kein klassisches kompliziertes Adminpanel.

Startbereich:

```text
Materialien verwalten

[ + Material hochladen ]

Zuletzt hochgeladen
...
```

Zusätzlich:

- Meine Materialien
- Entwürfe
- Geplant
- Klassen
- Fächer

---

# 16. Upload Experience

Der Upload muss eine der besten Interaktionen der gesamten Plattform sein.

## Upload öffnen

Primärer Button:

```text
+ Material hochladen
```

Danach öffnet sich eine große Modal-Ansicht oder eigene Upload-Seite.

## Drag & Drop

Große Upload-Zone:

```text
Dateien hier ablegen

oder

[ Dateien auswählen ]

PDF, Word, PowerPoint, Excel, Bilder und ZIP
```

Die Zone darf nicht billig gestrichelt aussehen.

Apple-artige Umsetzung:

- sehr heller Hintergrund
- weiche Kontur
- großer File/Upload Icon
- klare Typografie
- beim Dragover subtile blaue Hervorhebung
- leichte Scale- oder Glow-Reaktion

---

# 17. Upload-Formular

Nach Dateiauswahl:

```text
Datei
Arbeitsblatt-Lineare-Funktionen.pdf

Titel
[ Lineare Funktionen – Arbeitsblatt ]

Beschreibung
[ Optionale Beschreibung … ]

Fach
[ Mathematik ▾ ]

Klasse
[ 3A ▾ ]

Ordner / Thema
[ Lineare Funktionen ▾ ]

☐ Als wichtig markieren

[ Veröffentlichen ]
```

Claude soll Formulare besonders hochwertig gestalten.

Formfelder:

- großzügige Höhe
- angenehme Rundung
- dezenter Hintergrund
- keine schweren Borders
- sehr deutliche Fokuszustände
- gute Labels
- verständliche Fehlermeldungen

---

# 18. Upload Fortschritt

Der Upload soll sichtbar reagieren.

Beispiel:

```text
Arbeitsblatt.pdf
████████████████░░░░ 82 %
```

Nach Erfolg:

```text
✓ Material veröffentlicht
```

Nutze dezente Success-Animation.

Keine übertriebene Confetti-Animation.

---

# 19. Suche

Die Suche ist zentral.

Sie soll schnell wirken.

Sobald der Nutzer tippt, sollen passende Ergebnisse erscheinen.

Suche in:

- Dateiname
- Titel
- Beschreibung
- Fach
- Lehrer
- Klasse
- Ordner / Thema

## Empty Search

```text
Keine Materialien für „Photosynthese“ gefunden.

Versuche einen anderen Suchbegriff oder entferne einen Filter.
```

---

# 20. Fächer

Fächerseite:

```text
Fächer

Mathematik
Deutsch
Englisch
Biologie
Geschichte
...
```

Jedes Fach hat:

- Name
- optional Fach-Icon
- Anzahl Materialien
- Anzahl neuer Materialien

Keine starken Farbflächen.

Subtile Farbcodes sind erlaubt.

---

# 21. Fach-Detailseite

Beispiel:

```text
Mathematik

Herr Müller
Klasse 3A

[ Suche in Mathematik ]

Neu
Lineare Funktionen – Arbeitsblatt
...

Themen

Lineare Funktionen
12 Materialien

Geometrie
8 Materialien

Wahrscheinlichkeitsrechnung
6 Materialien
```

---

# 22. Klassen

Lehrer können Materialien einer oder mehreren Klassen zuordnen.

Beispiel:

```text
Klassen

3A
28 Schüler · 92 Materialien

3B
25 Schüler · 81 Materialien
```

---

# 23. Empty States

Empty States müssen bewusst gestaltet werden.

Keine leeren weißen Flächen.

Beispiel Lehrer:

```text
Noch keine Materialien

Lade dein erstes Unterrichtsmaterial hoch und stelle es deiner Klasse zur Verfügung.

[ Material hochladen ]
```

Beispiel Schüler:

```text
Hier ist noch nichts.

Sobald deine Lehrperson neues Material hochlädt, erscheint es hier.
```

Nutze kleine, stilvolle Illustrationen oder Icons, wenn passend.

---

# 24. Loading States

Verwende Skeleton Loading.

Beispiel:

- Text-Skeletons
- Datei-Zeilen-Skeletons
- kleine Avatar-Skeletons

Kein großer Spinner mitten auf jeder Seite.

Spinner nur für kurze direkte Aktionen.

---

# 25. Microinteractions

Microinteractions sind wichtig für die wahrgenommene Qualität.

Nutze sie sehr subtil.

Beispiele:

### Buttons

Hover:

```text
leichte Helligkeitsänderung
translateY(-1px)
```

Pressed:

```text
scale(0.98)
```

### Karten / Dateizeilen

Hover:

- Hintergrund minimal verändern
- Action Buttons sichtbar machen
- Schatten minimal erhöhen

### Modals

- opacity fade
- kleine scale transition
- 180–240 ms

### Dropdowns

- sanftes Einblenden
- leichte vertikale Bewegung

---

# 26. Border Radius

Apple-inspirierte Rundungen.

Empfehlung:

```text
kleine Controls: 8–10 px
Inputs: 10–12 px
Buttons: 10–12 px
Cards: 14–18 px
große Panels / Modal: 18–24 px
```

Nicht jede Komponente benötigt extreme Rundungen.

---

# 27. Shadows

Schatten nur sehr dezent.

Beispiel:

```css
box-shadow:
  0 1px 2px rgba(0,0,0,.04),
  0 8px 24px rgba(0,0,0,.06);
```

Keine riesigen schwarzen Schatten.

---

# 28. Glass / Blur

Backdrop Blur darf verwendet werden für:

- Navigation
- Modal Header
- Floating Toolbar

Beispiel:

```css
background: rgba(255,255,255,.78);
backdrop-filter: blur(20px);
```

Nicht die komplette Website in Glassmorphism verwandeln.

---

# 29. Icons

Bevorzugt eine klare moderne Icon Library, z. B.:

- Lucide
- Heroicons

Icons:

- 16–20 px Standard
- 20–24 px Navigation
- stroke ca. 1.7–2

Icons nie unnötig verwenden.

Text bleibt wichtiger als Symbolik.

---

# 30. Buttons

## Primärbutton

Apple Blue.

Beispiel:

```text
Material hochladen
```

- blaue Fläche
- weiße Schrift
- kompakt
- hochwertige Rundung

## Secondary Button

- heller neutraler Hintergrund
- dunkler Text

## Tertiary

- Text / Icon
- kein unnötiger Container

## Destructive

Rot nur für echte destruktive Aktionen.

---

# 31. Tabellen

Wenn Tabellen benötigt werden, z. B. Lehrer-Verwaltung:

Keine klassische harte HTML-Tabelle.

Stattdessen:

- großzügige Zeilen
- sehr dezente Divider
- Hover
- klare Spalten
- Actions rechts
- sticky Header nur wenn sinnvoll

---

# 32. Dateikontextmenü

Lehrer können über `•••` Aktionen öffnen:

```text
Bearbeiten
Datei ersetzen
Herunterladen
Link kopieren
Als wichtig markieren
────────────────
Löschen
```

„Löschen“ klar getrennt und rot.

---

# 33. Bestätigungsdialoge

Keine Browser-Alerts.

Nutze eigene hochwertige Dialoge.

Beispiel:

```text
Material löschen?

„Lineare Funktionen – Arbeitsblatt“ wird für alle Schüler entfernt.

[ Abbrechen ] [ Löschen ]
```

---

# 34. Toast Notifications

Beispiele:

```text
✓ Material erfolgreich hochgeladen
```

```text
✓ Änderungen gespeichert
```

```text
Link kopiert
```

Position:

Desktop rechts oben oder unten rechts.

Mobile unten.

Animation subtil.

---

# 35. Accessibility

Die App muss zugänglich sein.

Mindestens:

- Tastatursteuerung
- sichtbare Focus States
- ausreichender Kontrast
- semantisches HTML
- ARIA nur wo notwendig
- Screenreader-kompatible Labels
- Buttons wirklich als Buttons
- Links wirklich als Links
- keine Information ausschließlich über Farbe
- `prefers-reduced-motion` beachten

---

# 36. Responsive Design

Die Plattform muss von Anfang an responsive entwickelt werden.

Nicht zuerst Desktop bauen und Mobile später reparieren.

## Desktop

- Sidebar
- großzügiger Content
- mehrere Spalten möglich

## Tablet

- kompaktere Sidebar
- weniger Spalten
- größere Touch Targets

## Mobile

- eine Spalte
- Navigation über Header / Bottom Bar
- Filter als Bottom Sheet
- Buttons mindestens ca. 44 px Touchhöhe
- Upload vollständig mobil nutzbar
- keine horizontalen Tabellen

---

# 37. Mobile Materialliste

Beispiel:

```text
┌─────────────────────────────┐
│ PDF  Lineare Funktionen     │
│      Mathematik             │
│      Heute · 2.4 MB         │
│                         ⋯   │
└─────────────────────────────┘
```

Die ganze Zeile darf anklickbar sein.

---

# 38. Informationsarchitektur

Empfohlene Schülerstruktur:

```text
Start
Materialien
Fächer
Wichtig
Suche
Profil
```

Empfohlene Lehrerstruktur:

```text
Start
Materialien
Upload
Klassen
Fächer
Profil / Einstellungen
```

Rollenabhängig anzeigen.

---

# 39. Rollen

Mindestens:

```text
teacher
student
admin
```

## Student

Kann nur freigegebene Materialien sehen.

## Teacher

Kann eigene bzw. zugewiesene Materialien verwalten.

## Admin

Kann Schule, Benutzer, Klassen und globale Einstellungen verwalten.

---

# 40. Technische Architektur

Wenn keine andere Technologie vorgegeben ist, verwende einen modernen Stack.

Empfehlung:

```text
Next.js
TypeScript
Tailwind CSS
React
Lucide Icons
```

Optional:

```text
shadcn/ui
```

ABER:

Falls shadcn/ui verwendet wird, darf es nicht nach Standard-shadcn aussehen.

Alle Komponenten müssen visuell an das individuelle Apple-inspirierte Designsystem angepasst werden.

---

# 41. Komponentenstruktur

Erstelle wiederverwendbare Komponenten.

Beispiel:

```text
components/
  app-shell/
    Sidebar
    MobileNavigation
    TopBar

  materials/
    MaterialRow
    MaterialCard
    MaterialPreview
    MaterialFilters
    MaterialSearch
    FileTypeIcon

  upload/
    UploadDropzone
    UploadProgress
    UploadForm

  ui/
    Button
    Input
    Select
    Modal
    Popover
    Toast
    Badge
    EmptyState
    Skeleton
```

---

# 42. Datenmodell

Mögliche Material-Struktur:

```ts
interface Material {
  id: string
  title: string
  description?: string

  fileName: string
  fileUrl: string
  fileType: string
  fileSize: number

  subjectId: string
  classIds: string[]
  topicId?: string

  teacherId: string

  isImportant: boolean
  isPublished: boolean

  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

---

# 43. Beispiel-Fächer

Nutze realistische Beispieldaten.

Zum Beispiel:

- Mathematik
- Deutsch
- Englisch
- Biologie
- Chemie
- Physik
- Geschichte
- Geografie
- Informatik
- Wirtschaft
- Sport

Keine Lorem-Ipsum-Demo.

---

# 44. Beispieldateien

Verwende glaubwürdige Namen:

```text
Lineare Funktionen – Arbeitsblatt.pdf
Prüfungsvorbereitung Kapitel 4.pdf
Vokabelliste Unit 6.docx
Präsentation Französische Revolution.pptx
Photosynthese – Zusammenfassung.pdf
Hausaufgabe Woche 12.pdf
```

---

# 45. Beispiel-Lehrer

Verwende neutrale Beispielnamen:

```text
Herr Müller
Frau Schneider
Herr Weber
Frau Keller
```

---

# 46. Dashboard-Beispiel

Schüler:

```text
Guten Morgen, Luca.

Neu für dich

[PDF]
Lineare Funktionen – Arbeitsblatt
Mathematik · Herr Müller
Heute

[PDF]
Prüfungsvorbereitung Kapitel 4
Deutsch · Frau Schneider
Gestern


Deine Fächer

Mathematik     3 neu
Deutsch        1 neu
Englisch       2 neu
Biologie
```

---

# 47. UX-Regeln

Diese Regeln sind streng zu beachten.

## Regel 1

Die primäre Aktion einer Seite muss innerhalb von ungefähr einer Sekunde visuell erkennbar sein.

## Regel 2

Nutzer sollen möglichst wenig Text lesen müssen, um die Oberfläche zu verstehen.

## Regel 3

Komplexe Funktionen werden progressiv gezeigt.

Nicht alles gleichzeitig anzeigen.

## Regel 4

Die häufigsten Aufgaben brauchen möglichst wenige Klicks.

Beispiel:

Material herunterladen:

```text
Startseite → Material → Download
```

oder direkt:

```text
Startseite → Download
```

## Regel 5

Lehrer-Upload muss maximal einfach sein.

Idealer Flow:

```text
Upload
→ Datei auswählen
→ Fach
→ Klasse
→ Veröffentlichen
```

Optionales erst danach.

---

# 48. Design-Details, auf die besonders geachtet werden muss

Claude soll hier besonders viel Zeit investieren.

## Spacing

Nutze ein konsequentes Spacing-System.

Zum Beispiel:

```text
4
8
12
16
20
24
32
40
48
64
```

Keine zufälligen Abstände.

## Alignment

Elemente müssen pixelgenau ausgerichtet sein.

## Hierarchie

Jeder Screen braucht:

1. klaren Seitentitel
2. klaren Kontext
3. klare primäre Aktion
4. sekundäre Inhalte
5. weniger wichtige Metadaten

## Density

Nicht zu viel Information gleichzeitig.

Whitespace ist ausdrücklich erwünscht.

---

# 49. Visuelle Qualität

Bevor eine Seite als fertig gilt, überprüfe:

- Ist das Spacing konsistent?
- Sind alle Schriftgrößen logisch?
- Sind die Karten wirklich nötig?
- Ist die Sidebar ruhig genug?
- Sind Hover States vorhanden?
- Sind Focus States vorhanden?
- Sind Empty States gestaltet?
- Sind Loading States gestaltet?
- Sind Errors gestaltet?
- Ist Mobile vollständig?
- Gibt es visuelle Unruhe?
- Sind zu viele Borders vorhanden?
- Sind zu viele unterschiedliche Farben vorhanden?
- Sind Buttons konsistent?
- Sind Icons konsistent?
- Fühlt sich die Seite hochwertig an?

---

# 50. Apple-Qualitätsmaßstab

Das Interface soll den Eindruck vermitteln:

> Jeder Abstand, jede Schriftgröße, jeder Radius und jeder Zustand wurde bewusst gestaltet.

Nicht:

> Wir haben schnell ein Dashboard aus fertigen Komponenten zusammengesteckt.

Besonders wichtig:

- weniger Elemente
- bessere Elemente
- klare Hierarchie
- hochwertige Typografie
- perfekte Abstände
- sehr subtile Animationen
- hervorragende Responsive-Version

---

# 51. Keine generische KI-Website

Vermeide typische AI-generierte Webdesign-Muster:

- riesiger Gradient Hero
- sechs zufällige Feature Cards
- überall Glass Cards
- lila/blau Neon
- unnötige Badges
- jedes Element in einem Container
- übertriebene Box Shadows
- riesige Überschriften ohne funktionalen Nutzen
- Dashboard mit 15 Statistik-Karten

Es handelt sich um eine produktive Schul-App, nicht um eine SaaS-Landingpage.

---

# 52. Auth / Login

Login schlicht und hochwertig.

Layout:

```text
             Schul-Logo

       Willkommen zurück

       E-Mail-Adresse
       [              ]

       Passwort
       [              ]

       [ Anmelden ]

       Passwort vergessen?
```

Optional links/rechts geteiltes Layout auf Desktop.

Auf Mobile zentriert.

Keine unnötigen Marketingtexte.

---

# 53. Profil

Profilseite:

- Name
- Rolle
- Klasse
- E-Mail
- Passwort ändern
- Benachrichtigungen
- Erscheinungsbild

Für Schüler minimal halten.

---

# 54. Dark Mode

Falls implementiert:

Nicht einfach Farben invertieren.

Empfohlene Richtung:

```text
Background: #000000 / #0B0B0D
Surface: #1C1C1E
Secondary Surface: #2C2C2E
Primary Text: #F5F5F7
Secondary Text: #A1A1A6
```

Borders weiterhin sehr subtil.

---

# 55. Animation

Animationen:

```text
120–250 ms
```

Typische easing:

```css
cubic-bezier(0.2, 0.8, 0.2, 1)
```

Keine langen Animationen.

Produktivität geht vor Show.

---

# 56. Upload Drag State

Wenn eine Datei über die Dropzone gezogen wird:

Normal:

```text
Dateien hier ablegen
```

Drag State:

```text
Loslassen zum Hochladen
```

Visuelle Reaktion:

- Border / Background leicht blau
- Icon animiert minimal
- Content scale maximal ~1.01

---

# 57. Material Status

Mögliche Status:

```text
Neu
Wichtig
Entwurf
Geplant
Veröffentlicht
```

Badges nur verwenden, wenn sie echte Information liefern.

Nicht jede Zeile mit drei Badges dekorieren.

---

# 58. Fehlerfälle

Alle wichtigen Fehlerzustände gestalten.

Beispiele:

```text
Upload fehlgeschlagen
Die Datei konnte nicht hochgeladen werden.

[ Erneut versuchen ]
```

```text
Datei nicht verfügbar
Dieses Material wurde möglicherweise entfernt.
```

```text
Keine Internetverbindung
Bitte überprüfe deine Verbindung.
```

---

# 59. Datenschutz

Da die Plattform für eine Schule gedacht ist:

- keine unnötigen personenbezogenen Daten anzeigen
- Dateirechte serverseitig prüfen
- rollenbasierte Zugriffssteuerung
- sichere Datei-URLs
- keine öffentlichen Dateien ohne explizite Freigabe
- Input Validation
- sichere Upload-Validierung
- Dateigrößenlimit
- MIME-Type prüfen

---

# 60. Performance

Die App soll sich sofort schnell anfühlen.

Achte auf:

- schnelle initiale Ladezeit
- optimierte Icons
- lazy loading
- keine unnötig großen JS-Bundles
- Skeletons
- optimistische UI wo sinnvoll
- Pagination oder Infinite Loading bei vielen Materialien

---

# 61. Beispiel Startscreen Desktop

Visuelle Struktur:

```text
┌─────────────────────────────────────────────────────────────────┐
│  Schule          │  Guten Morgen, Luca.               🔔   LC  │
│                  │                                             │
│  Übersicht       │  Materialien für deine Klasse               │
│  Materialien     │                                             │
│  Fächer          │  [ 🔍 Materialien durchsuchen …           ] │
│  Wichtig         │                                             │
│                  │  Neu für dich                               │
│                  │                                             │
│                  │  PDF  Lineare Funktionen                    │
│                  │       Mathematik · Herr Müller       Heute   │
│                  │  ─────────────────────────────────────────  │
│                  │  PDF  Prüfungsvorbereitung                  │
│                  │       Deutsch · Frau Schneider      Gestern  │
│                  │                                             │
│                  │  Deine Fächer                               │
│                  │                                             │
│                  │  Mathematik         3 neu                    │
│                  │  Deutsch            1 neu                    │
│                  │  Englisch           2 neu                    │
└─────────────────────────────────────────────────────────────────┘
```

Wichtig:

Die echte Umsetzung soll schöner, großzügiger und hochwertiger als dieses ASCII-Beispiel sein.

---

# 62. Beispiel Lehrer-Screen

```text
Materialien

Alle Materialien, die du für deine Klassen bereitgestellt hast.

                                  [ + Material hochladen ]

[ 🔍 Materialien suchen … ]

Alle      Entwürfe      Geplant

PDF   Lineare Funktionen – Arbeitsblatt
      Mathematik · 3A
      Heute 09:42
                                      •••

PPT   Einführung Wahrscheinlichkeitsrechnung
      Mathematik · 3A
      8. September
                                      •••
```

---

# 63. Design System Tokens

Erstelle zentral definierte Tokens.

Beispiel:

```css
:root {
  --background: #f5f5f7;
  --surface: #ffffff;

  --text-primary: #1d1d1f;
  --text-secondary: #6e6e73;

  --accent: #0071e3;
  --accent-hover: #0077ed;

  --border: rgba(0, 0, 0, 0.08);

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 22px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
}
```

---

# 64. Wichtigste Seiten

Mindestens folgende Screens vollständig gestalten:

1. Login
2. Schüler Dashboard
3. Materialbibliothek
4. Material Detail / PDF Vorschau
5. Fachübersicht
6. Fach Detail
7. Lehrer Dashboard
8. Lehrer Materialverwaltung
9. Upload Flow
10. Upload Progress
11. Profil / Settings
12. Empty States
13. Error States
14. Mobile Navigation

---

# 65. Vorgehensweise für Claude

Arbeite nicht einfach sofort Komponenten nacheinander herunter.

## Phase 1 — Produktstruktur

Definiere zuerst:

- Informationsarchitektur
- User Flows
- Rollen
- wichtigste Aktionen
- Navigationsstruktur

## Phase 2 — Designsystem

Definiere:

- Farben
- Typografie
- Abstände
- Radii
- Schatten
- Buttons
- Inputs
- Navigation
- Icons
- Motion

## Phase 3 — App Shell

Baue:

- Sidebar
- Topbar
- Mobile Navigation
- Responsive Layout

## Phase 4 — Kernseiten

Baue zuerst:

- Dashboard
- Materialien
- Upload

## Phase 5 — States

Ergänze:

- Loading
- Empty
- Error
- Success
- Hover
- Focus
- Disabled
- Drag
- Mobile

## Phase 6 — Polish

Gehe anschließend jede Seite erneut durch und verbessere ausschließlich die visuelle Qualität.

Diese Polish-Phase ist verpflichtend.

---

# 66. Verpflichtende Design-Polish-Phase

Bevor du das Projekt als fertig bezeichnest:

Öffne gedanklich jeden Screen erneut und frage:

> Würde diese Oberfläche auf apple.com oder in einer hochwertigen macOS-App visuell negativ auffallen?

Falls ja:

weiter verbessern.

Prüfe besonders:

- Abstände
- Proportionen
- Typografie
- Border-Radius
- Button-Größen
- Alignment
- optisches Gewicht
- Farbhierarchie
- Inhaltsdichte
- Responsiveness

---

# 67. Wichtigste Anweisung

**Design ist keine Nebensache in diesem Projekt.**

Investiere überdurchschnittlich viel Aufwand in:

- UI Details
- UX
- Typografie
- Spacing
- Interaktionszustände
- Mobile
- Animationen
- visuelle Konsistenz

Wenn du zwischen „mehr Features“ und „besserem Design“ wählen musst:

> Bevorzuge besseres Design.

---

# 68. Definition of Done

Das Projekt ist erst fertig, wenn:

- Lehrer Materialien intuitiv hochladen können
- Schüler Dateien sofort finden
- Navigation ohne Erklärung verständlich ist
- Desktop hochwertig aussieht
- Tablet hochwertig aussieht
- Mobile hochwertig aussieht
- Upload Flow vollständig gestaltet ist
- Empty / Loading / Error States existieren
- Accessibility berücksichtigt wurde
- das Interface nicht wie ein Standard-Template aussieht
- alle wichtigen Komponenten konsistent sind
- die gesamte Oberfläche visuell poliert wurde

---

# 69. Finale Qualitätsanforderung

Das Ergebnis soll aussehen wie:

> Eine Schulplattform, die von einem sehr guten Produktdesign-Team mit Apple-inspiriertem Qualitätsanspruch entwickelt wurde.

Nicht wie:

> Ein typisches Schulportal, CMS oder generisches Admin-Dashboard.

Der Benutzer soll beim ersten Öffnen denken:

> „Das ist überraschend modern und extrem einfach.“

