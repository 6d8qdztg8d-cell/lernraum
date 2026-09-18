import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT_ROOT = path.join(process.cwd(), "public", "materials");

/** @type {{subjectSlug: string, fileSlug: string, title: string, kicker: string, lines: string[]}[]} */
const docs = [
  {
    subjectSlug: "mathematik",
    fileSlug: "lineare-funktionen-arbeitsblatt",
    title: "Lineare Funktionen – Arbeitsblatt",
    kicker: "Mathematik · Lineare Funktionen",
    lines: [
      "Aufgabe 1: Bestimme die Steigung m und den y-Achsenabschnitt b der Funktion",
      "f(x) = 2x + 3 und skizziere den Graphen im Koordinatensystem.",
      "",
      "Aufgabe 2: Zwei Punkte P(1|4) und Q(3|10) liegen auf einer Geraden.",
      "Bestimme die Funktionsgleichung der Geraden durch P und Q.",
      "",
      "Aufgabe 3: Eine Telefonrechnung setzt sich aus einer Grundgebuehr von",
      "CHF 12.- und CHF 0.15 pro Gespraechsminute zusammen. Stelle die",
      "Kostenfunktion auf und berechne die Kosten für 45 Minuten.",
      "",
      "Aufgabe 4: Untersuche, ob die Punkte A(0|1), B(2|5) und C(5|11) auf",
      "derselben Geraden liegen.",
    ],
  },
  {
    subjectSlug: "mathematik",
    fileSlug: "pruefungsvorbereitung-kapitel-4",
    title: "Prüfungsvorbereitung Kapitel 4",
    kicker: "Mathematik · Lineare Funktionen",
    lines: [
      "Diese Zusammenfassung bereitet dich auf die Prüfung zu Kapitel 4 vor.",
      "",
      "Wichtige Begriffe: Steigung, y-Achsenabschnitt, Nullstelle,",
      "Proportionalität, Steigungsdreieck.",
      "",
      "Prüfungsrelevante Formen:",
      "  f(x) = m·x + b   (allgemeine Form)",
      "  m = (y2 - y1) / (x2 - x1)   (Steigung aus zwei Punkten)",
      "",
      "Übe zusätzlich die Aufgaben 1–12 auf Seite 84–87 im Lehrmittel.",
      "Taschenrechner und Formelsammlung sind an der Prüfung erlaubt.",
    ],
  },
  {
    subjectSlug: "mathematik",
    fileSlug: "hausaufgabe-woche-12",
    title: "Hausaufgabe Woche 12",
    kicker: "Mathematik · Geometrie",
    lines: [
      "Bitte bis nächste Woche selbstständig lösen und mitbringen.",
      "",
      "1. Berechne den Flächeninhalt und Umfang eines Trapezes mit",
      "   a = 8 cm, c = 5 cm, h = 4 cm.",
      "2. Konstruiere ein Dreieck ABC mit a = 6 cm, b = 5 cm, c = 7 cm.",
      "3. Bestimme den Winkel alpha mithilfe des Kosinussatzes.",
    ],
  },
  {
    subjectSlug: "deutsch",
    fileSlug: "pruefungsvorbereitung-kapitel-4",
    title: "Prüfungsvorbereitung Kapitel 4",
    kicker: "Deutsch · Grammatik",
    lines: [
      "Themen der nächsten Prüfung:",
      "",
      "  • Aktiv und Passiv unterscheiden und bilden",
      "  • Konjunktiv I in der indirekten Rede",
      "  • Satzglieder bestimmen (Subjekt, Prädikat, Objekt, Adverbiale)",
      "",
      "Übungsblätter dazu findest du im Ordner „Grammatik“.",
      "Bringe dein Grammatikheft zur Prüfung mit.",
    ],
  },
  {
    subjectSlug: "deutsch",
    fileSlug: "interpretation-kurzgeschichte",
    title: "Interpretation einer Kurzgeschichte",
    kicker: "Deutsch · Literatur",
    lines: [
      "Leitfaden zur Interpretation einer Kurzgeschichte:",
      "",
      "1. Einleitung: Autor, Titel, Erscheinungsjahr, Textsorte, Thema",
      "2. Inhaltsangabe: kurz und im Präsens",
      "3. Aufbau und Sprache: Erzählperspektive, Stilmittel, Wendepunkt",
      "4. Interpretation: zentrale Aussage, Deutungsansätze",
      "5. Schluss: eigene Stellungnahme",
      "",
      "Abgabetermin siehe Klassenkalender.",
    ],
  },
  {
    subjectSlug: "englisch",
    fileSlug: "vokabelliste-unit-6",
    title: "Vokabelliste Unit 6",
    kicker: "Englisch · Unit 6",
    lines: [
      "achievement – die Errungenschaft",
      "to accomplish – erreichen, vollbringen",
      "ambitious – ehrgeizig",
      "challenge – die Herausforderung",
      "determined – entschlossen",
      "to encourage – ermutigen",
      "goal – das Ziel",
      "opportunity – die Gelegenheit",
      "to overcome – überwinden",
      "persistent – beharrlich",
      "",
      "Lernkontrolle am Freitag – bitte alle Wörter samt Beispielsatz üben.",
    ],
  },
  {
    subjectSlug: "englisch",
    fileSlug: "reading-comprehension-worksheet",
    title: "Reading Comprehension Worksheet",
    kicker: "Englisch · Unit 6",
    lines: [
      "Read the article handed out in class and answer the following",
      "questions in full sentences:",
      "",
      "1. What is the main challenge the author describes?",
      "2. Find two examples of persistence in the text.",
      "3. Summarise the last paragraph in your own words (2–3 sentences).",
      "4. Do you agree with the author's conclusion? Explain why.",
    ],
  },
  {
    subjectSlug: "biologie",
    fileSlug: "photosynthese-zusammenfassung",
    title: "Photosynthese – Zusammenfassung",
    kicker: "Biologie · Stoffwechsel der Pflanzen",
    lines: [
      "Photosynthese: Umwandlung von Lichtenergie in chemische Energie.",
      "",
      "Reaktionsgleichung:",
      "  6 CO2 + 6 H2O + Lichtenergie -> C6H12O6 + 6 O2",
      "",
      "Ablauf in zwei Phasen:",
      "  • Lichtreaktion (in den Thylakoiden): Wasserspaltung, ATP- und",
      "    NADPH-Bildung, Freisetzung von Sauerstoff",
      "  • Dunkelreaktion / Calvin-Zyklus (im Stroma): CO2-Fixierung,",
      "    Bildung von Traubenzucker",
      "",
      "Bedeutung: Grundlage fast aller Nahrungsketten und der",
      "Sauerstoffproduktion auf der Erde.",
    ],
  },
  {
    subjectSlug: "biologie",
    fileSlug: "zellaufbau-arbeitsblatt",
    title: "Zellaufbau – Arbeitsblatt",
    kicker: "Biologie · Zellbiologie",
    lines: [
      "Beschrifte die folgenden Zellbestandteile und notiere ihre Funktion:",
      "",
      "  Zellkern · Mitochondrien · Zellmembran · Zellwand ·",
      "  endoplasmatisches Retikulum · Golgi-Apparat · Vakuole ·",
      "  Chloroplasten · Ribosomen",
      "",
      "Vergleiche anschliessend tierische und pflanzliche Zellen und",
      "notiere mindestens drei Unterschiede.",
    ],
  },
];

const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const MARGIN = 64;

async function build() {
  for (const doc of docs) {
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const regular = await pdf.embedFont(StandardFonts.Helvetica);

    const accent = rgb(0 / 255, 113 / 255, 227 / 255);
    const textDark = rgb(0x1d / 255, 0x1d / 255, 0x1f / 255);
    const textSecondary = rgb(0x6e / 255, 0x6e / 255, 0x73 / 255);

    let y = PAGE_HEIGHT - MARGIN;

    page.drawText(doc.kicker.toUpperCase(), {
      x: MARGIN,
      y,
      size: 10,
      font: bold,
      color: accent,
      characterSpacing: 0.6,
    });
    y -= 28;

    const titleLines = wrapText(doc.title, bold, 24, PAGE_WIDTH - MARGIN * 2);
    for (const line of titleLines) {
      page.drawText(line, { x: MARGIN, y, size: 24, font: bold, color: textDark });
      y -= 30;
    }

    y -= 8;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_WIDTH - MARGIN, y },
      thickness: 1,
      color: rgb(0.88, 0.88, 0.89),
    });
    y -= 32;

    for (const rawLine of doc.lines) {
      if (rawLine === "") {
        y -= 12;
        continue;
      }
      const wrapped = wrapText(rawLine, regular, 12, PAGE_WIDTH - MARGIN * 2);
      for (const line of wrapped) {
        page.drawText(line, { x: MARGIN, y, size: 12, font: regular, color: textDark });
        y -= 19;
      }
    }

    page.drawText("Lernraum · Unterrichtsmaterial", {
      x: MARGIN,
      y: MARGIN - 20,
      size: 9,
      font: regular,
      color: textSecondary,
    });

    const bytes = await pdf.save();
    const outDir = path.join(OUT_ROOT, doc.subjectSlug);
    await mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, `${doc.fileSlug}.pdf`);
    await writeFile(outPath, bytes);
    console.log("wrote", outPath, bytes.length, "bytes");
  }
}

function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
