export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
}

const WEEKDAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatRelativeDate(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) {
    return `Heute, ${date.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })}`;
  }
  if (isSameDay(date, yesterday)) {
    return "Gestern";
  }

  const diffDays = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays >= 0 && diffDays < 7) {
    return WEEKDAYS[date.getDay()];
  }

  return `${date.getDate()}. ${MONTHS[date.getMonth()]}${
    date.getFullYear() !== now.getFullYear() ? " " + date.getFullYear() : ""
  }`;
}

export function formatFullDate(iso: string): string {
  const date = new Date(iso);
  return `${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function greetingForNow(now: Date = new Date()): string {
  const hour = now.getHours();
  if (hour < 5) return "Guten Abend";
  if (hour < 11) return "Guten Morgen";
  if (hour < 18) return "Guten Tag";
  return "Guten Abend";
}
