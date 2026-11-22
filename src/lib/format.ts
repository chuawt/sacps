export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}
/** Escape, then turn **bold** into <strong> and [label](/path, #id or https url) into links. */
export function rich(text: string): string {
  return esc(text)
    .replace(/\[([^\]]+)\]\(((?:\/|#|https:\/\/)[^)\s]+)\)/g, (_m, label: string, href: string) =>
      href.startsWith("https://") ? `<a href="${href}" target="_blank" rel="noopener">${label}</a>` : `<a href="${href}">${label}</a>`,
    )
    .split("**")
    .map((part, i) => (i % 2 === 1 ? `<strong>${part}</strong>` : part))
    .join("")
}
export function money(n: number): string {
  return "$" + n.toFixed(2)
}
export function telHref(num: string): string {
  return "tel:+65" + num.replace(/\s+/g, "")
}
export function waHref(num: string): string {
  return "https://wa.me/65" + num.replace(/\s+/g, "")
}
export function fmt(iso: string, opts: Intl.DateTimeFormatOptions): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Intl.DateTimeFormat("en-SG", { timeZone: "UTC", ...opts }).format(new Date(Date.UTC(y, m - 1, d)))
}
export function longDate(iso: string): string {
  return fmt(iso, { weekday: "short", day: "numeric", month: "short", year: "numeric" })
}
