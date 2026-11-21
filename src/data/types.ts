export type Src = string[]
export interface RefDoc { id: string; short: string; title: string; tip?: string; issued?: string | null; issuedLabel?: string; summary?: string }
export interface EventItem { date: string; endDate?: string; time: string; title: string; detail: string; go: "before" | "weeks" | "life"; s: Src }
export interface Fact { t: string; s?: Src }
export type Block =
  | { k: "p"; t: string; s?: Src }
  | { k: "ul"; items: Fact[] }
  | { k: "table"; head?: string[]; rows: string[][]; s?: Src }
  | { k: "note"; t: string; tone?: "info"; s?: Src }
  | { k: "links"; items: { label: string; url: string; s?: Src }[] }
  | { k: "accordion"; title: string; sub?: string; blocks: Block[] }
  | { k: "books" }
export interface TimelineDay { id: string; from: string; to: string; label: string; title: string; items: Fact[] }
export interface PackItem { id: string; t: string; s?: Src }
export interface PackGroup { id: string; label: string; items: PackItem[] }
export interface Step { id: string; title: string; when: string; deadline?: string; deadlines?: string[]; blocks: Block[] }
export interface Priced { t: string; p: number; q?: number }
export interface MtGroup { id: string; name: string; total: number; items: Priced[]; cce: Priced; stationery: Priced[]; stationeryTotal: number }
export interface Vendor { name: string; role: string; phones: string[]; whatsapp?: string; email?: string; web?: string; person?: string; note?: string; s?: Src }
export interface Content {
  meta: { title: string; updated: string; timezone: string; firstDay: string }
  refDocs: RefDoc[]
  events: EventItem[]
  keyTimes: { label: string; value: string; s: Src }[]
  weeks: {
    intro: string
    timeline: TimelineDay[]
    pack: { intro: string; groups: PackGroup[]; after: string }
    extras: Extract<Block, { k: "accordion" }>[] | { k: string; title: string; blocks: Block[] }[]
  }
  before: { intro: string; steps: Step[] }
  booklist: {
    note: string; s: Src
    common: { name: string; items: Priced[]; total?: number }[]
    mt: MtGroup[]
    stationeryCommon: Priced[]; stationeryCommonTotal: number
    art: Priced[]; artTotal: number
    optional: Priced[]; optionalTotal: number
  }
  life: { intro: string; sections: { title: string; blocks: Block[] }[] }
  contacts: {
    school: { name: string; address: string; phone: string; email: string; web: string; facebook: string; instagram: string; hours: string; s: Src }
    vendors: Vendor[]
    care: { name: string; t: string; s: Src }[]
    staff: { group: string; rows: string[][] }[]
    staffNote: string
    staffSrc: Src
  }
}
