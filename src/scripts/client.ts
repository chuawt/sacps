/* Client-side date logic and checklists. All dates are in Asia/Singapore time. */
const TZ = "Asia/Singapore"
const DAY = 86400000

function store(key: string, val?: unknown): any {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key) || "null")
    localStorage.setItem(key, JSON.stringify(val))
  } catch {
    /* storage may be blocked */
  }
  return null
}

const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)
const override = new URLSearchParams(location.search).get("today")
const useOverride = isLocal && !!override && /^\d{4}-\d{2}-\d{2}$/.test(override)

function sgToday(): string {
  if (useOverride) return override as string
  const o: Record<string, string> = {}
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(new Date())
    .forEach((p) => (o[p.type] = p.value))
  return `${o.year}-${o.month}-${o.day}`
}
function dayNum(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number)
  return Math.round(Date.UTC(y, m - 1, d) / DAY)
}
const today = sgToday()
const t = dayNum(today)

interface Count { text: string; soon: boolean; past: boolean }
function countdown(date: string, endDate: string | undefined, label = "Passed"): Count {
  const a = dayNum(date) - t
  if (endDate && a <= 0 && dayNum(endDate) >= t) {
    const left = dayNum(endDate) - t
    return { text: left === 0 ? "Last day today" : `On now, ${left} ${left === 1 ? "day" : "days"} left`, soon: true, past: false }
  }
  if (a < 0) return { text: label, soon: false, past: true }
  if (a === 0) return { text: "Today", soon: true, past: false }
  if (a === 1) return { text: "Tomorrow", soon: true, past: false }
  return { text: `In ${a} days`, soon: a <= 7, past: false }
}
function paint(el: HTMLElement, c: Count) {
  el.textContent = c.text
  el.classList.toggle("soon", c.soon)
  el.classList.toggle("past", c.past)
}

/* keep ?today= on internal links while testing on localhost */
if (useOverride) {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
    const u = new URL(a.getAttribute("href") as string, location.origin)
    u.searchParams.set("today", override as string)
    a.setAttribute("href", u.pathname + u.search + u.hash)
  })
}

/* ---------- coming up: drop past items, countdown line, next-up label ---------- */
const list = document.getElementById("ev-list")
if (list) {
  const items = Array.from(list.querySelectorAll<HTMLElement>("[data-event]"))
  const upcoming: HTMLElement[] = []
  items.forEach((li) => {
    const end = li.dataset.end || li.dataset.date!
    if (dayNum(end) < t) li.hidden = true
    else upcoming.push(li)
  })
  upcoming.forEach((li) => {
    const c = li.querySelector<HTMLElement>("[data-countdown]")
    if (c) {
      paint(c, countdown(li.dataset.date!, li.dataset.end))
    }
  })
  const empty = document.getElementById("ev-empty")
  if (empty) empty.hidden = upcoming.length > 0
  if (upcoming.length) upcoming[0].classList.add("is-next")
  const card = document.getElementById("next-up")
  if (card && upcoming.length) {
    const li = upcoming[0]
    const set = (sel: string, txt: string) => {
      const el = card.querySelector<HTMLElement>(sel)
      if (el) el.textContent = txt
    }
    set("[data-next-count]", li.querySelector<HTMLElement>("[data-countdown]")?.textContent?.split(" · ")[0] || "")
    set("[data-next-title]", li.querySelector("h3")?.textContent || "")
    set("[data-next-when]", li.querySelector(".when")?.textContent?.trim() || "")
    const link = card.querySelector<HTMLAnchorElement>("[data-next-link]")
    const go = li.querySelector<HTMLAnchorElement>(".btn-row a")
    if (link && go) link.setAttribute("href", go.getAttribute("href") || "/")
    card.hidden = false
  }
  /* lazy load: show 5 upcoming items, reveal 5 more as the sentinel nears the viewport */
  const BATCH = 5
  const sentinel = document.getElementById("ev-sentinel")
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  let pending = upcoming.slice(BATCH)
  const reveal = () => {
    pending.splice(0, BATCH).forEach((li) => {
      li.hidden = false
      if (!reduced) li.classList.add("ev-in")
    })
    if (!pending.length) done()
  }
  let io: IntersectionObserver | null = null
  function done() {
    io?.disconnect()
    if (sentinel) sentinel.hidden = true
  }
  if (pending.length && sentinel && "IntersectionObserver" in window) {
    pending.forEach((li) => (li.hidden = true))
    sentinel.hidden = false
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && pending.length) {
          reveal()
          /* if the sentinel is still near the viewport after the batch, observe again */
          io?.unobserve(sentinel)
          if (pending.length) requestAnimationFrame(() => io?.observe(sentinel))
        }
      },
      { rootMargin: "0px 0px 240px 0px" },
    )
    io.observe(sentinel)
  }
}

/* ---------- first weeks: highlight today ---------- */
document.querySelectorAll<HTMLElement>("[data-from]").forEach((li) => {
  const from = dayNum(li.dataset.from!)
  const to = dayNum(li.dataset.to!)
  const on = from <= t && t <= to
  li.classList.toggle("today", on)
  const flag = li.querySelector<HTMLElement>("[data-today-flag]")
  if (flag) flag.hidden = !on
})

/* ---------- checklists: What to pack ---------- */
const PACK_KEY = "sacps-pack-v1"
const groups = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-pack-group]"))
if (groups.length) {
  let ticks: Record<string, boolean> = store(PACK_KEY) || {}
  const updateAll = () =>
    groups.forEach((g) => {
      const boxes = g.querySelectorAll<HTMLInputElement>("input[data-pack]")
      let n = 0
      boxes.forEach((b) => b.checked && n++)
      const p = g.querySelector<HTMLElement>("[data-progress]")
      if (p) p.textContent = `${n} of ${boxes.length}`
    })
  groups.forEach((g) =>
    g.querySelectorAll<HTMLInputElement>("input[data-pack]").forEach((b) => {
      b.checked = !!ticks[b.id]
      b.addEventListener("change", () => {
        if (b.checked) ticks[b.id] = true
        else delete ticks[b.id]
        store(PACK_KEY, ticks)
        updateAll()
      })
    }),
  )
  updateAll()
  const first = dayNum("2027-01-04")
  groups.forEach((g) => {
    const day = g.dataset.day
    const daily = g.dataset.daily !== undefined
    const todayIso = today
    if ((day && day === todayIso) || (daily && t >= first + 1) || (day === "2027-01-04" && t < first)) g.open = true
  })
  document.getElementById("clear-ticks")?.addEventListener("click", () => {
    if (!confirm("Clear all ticks on this device?")) return
    ticks = {}
    store(PACK_KEY, ticks)
    groups.forEach((g) => g.querySelectorAll<HTMLInputElement>("input[data-pack]").forEach((b) => (b.checked = false)))
    updateAll()
  })
}

/* ---------- before school: deadline pills and mark-done ---------- */
const DONE_KEY = "sacps-done-v1"
const steps = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-step]"))
if (steps.length) {
  const done: Record<string, boolean> = store(DONE_KEY) || {}
  steps.forEach((s) => {
    const id = s.dataset.step!
    const pill = s.querySelector<HTMLElement>("[data-pill]")!
    const btn = s.querySelector<HTMLButtonElement>("[data-done-btn]")!
    const dl = (s.dataset.deadlines || "").split(",").filter(Boolean)
    const render = () => {
      pill.hidden = false
      pill.className = "pill"
      if (done[id]) {
        pill.classList.add("done")
        pill.textContent = "Done"
      } else if (dl.length) {
        const open = dl.filter((x) => dayNum(x) >= t)
        const c = countdown(open.length ? open[0] : dl[dl.length - 1], undefined, "Deadline passed")
        paint(pill, c)
        pill.classList.add("pill")
      } else {
        pill.classList.add("past")
        pill.textContent = "No deadline"
      }
      btn.setAttribute("aria-pressed", String(!!done[id]))
      btn.textContent = done[id] ? "Marked done (tap to undo)" : "Mark this as done"
    }
    btn.addEventListener("click", () => {
      if (done[id]) delete done[id]
      else done[id] = true
      store(DONE_KEY, done)
      render()
    })
    render()
  })
}

/* ---------- open the section a link points to ---------- */
function openHash() {
  if (!location.hash) return
  let node: Element | null = null
  try {
    node = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  } catch {
    /* bad hash */
  }
  for (let n: Element | null = node; n; n = n.parentElement) if (n instanceof HTMLDetailsElement) n.open = true
  node?.scrollIntoView()
}
openHash()
window.addEventListener("hashchange", openHash)

/* ---------- mobile menu: button with aria-expanded, Escape closes ---------- */
const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement | null
const menuPanel = document.getElementById("menu-panel")
if (menuBtn && menuPanel) {
  const setMenu = (open: boolean) => {
    menuPanel.classList.toggle("open", open)
    menuBtn.setAttribute("aria-expanded", String(open))
  }
  menuBtn.addEventListener("click", () => setMenu(!menuPanel.classList.contains("open")))
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuPanel.classList.contains("open")) {
      setMenu(false)
      menuBtn.focus()
    }
  })
  setMenu(false)
}
