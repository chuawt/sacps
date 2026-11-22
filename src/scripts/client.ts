/* Client-side date logic and checklists. All dates are in Asia/Singapore time. */
const TZ = "Asia/Singapore"
const DAY = 86400000
const PACK_KEY = "sacps-pack-v1"
const DONE_KEY = "sacps-done-v1"
const MT_KEY = "sacps-mt-v1"

function store(key: string, val?: unknown): any {
  try {
    if (val === undefined) return JSON.parse(localStorage.getItem(key) || "null")
    localStorage.setItem(key, JSON.stringify(val))
  } catch {
    /* storage may be blocked */
  }
  return null
}

const root = document.documentElement
const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)
const override = new URLSearchParams(location.search).get("today")
const useOverride = isLocal && !!override && /^\d{4}-\d{2}-\d{2}$/.test(override)
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

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
/** "Tue 5 Jan" */
function shortDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  return new Intl.DateTimeFormat("en-SG", { timeZone: "UTC", weekday: "short", day: "numeric", month: "short" })
    .format(new Date(Date.UTC(y, m - 1, d)))
    .replace(/,/g, "")
}
const today = sgToday()
const t = dayNum(today)
const phase = root.dataset.phase || "before"

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

/* the first-weeks day that covers today, from the timeline copy on the homepage or the timeline itself */
interface Day { id: string; title: string; first: string }
function todayDay(): Day | null {
  const src = document.querySelector("[data-tl-copy]")
  if (src) {
    for (const li of Array.from(src.querySelectorAll<HTMLElement>("[data-tl-from]"))) {
      if (dayNum(li.dataset.tlFrom!) <= t && t <= dayNum(li.dataset.tlTo!)) {
        return {
          id: li.dataset.tlId || "",
          title: li.querySelector("h3")?.textContent || "",
          first: li.querySelector("[data-tl-first]")?.textContent?.trim() || "",
        }
      }
    }
    return null
  }
  for (const li of Array.from(document.querySelectorAll<HTMLElement>("[data-from]"))) {
    if (dayNum(li.dataset.from!) <= t && t <= dayNum(li.dataset.to!)) {
      return { id: li.id, title: li.querySelector("h3")?.textContent || "", first: "" }
    }
  }
  return null
}
/** pack group for today: that day's own group, else the daily one */
function packIdFor(ids: string[]): string {
  const [, m, d] = today.split("-")
  const own = `pack-${m}${d}`
  return ids.includes(own) ? own : "pack-daily"
}

/* ---------- coming up: drop past items, grouped timeline, next-up card ---------- */
const list = document.getElementById("ev-list")
if (list) {
  const items = Array.from(list.querySelectorAll<HTMLElement>("[data-event]"))
  let upcoming: HTMLElement[] = []
  items.forEach((li) => {
    const end = li.dataset.end || li.dataset.date!
    if (dayNum(end) < t) li.hidden = true
    else upcoming.push(li)
  })
  upcoming.forEach((li) => {
    const c = li.querySelector<HTMLElement>("[data-countdown]")
    if (c) paint(c, countdown(li.dataset.date!, li.dataset.end))
  })
  const empty = document.getElementById("ev-empty")
  if (empty) empty.hidden = upcoming.length > 0
  const card = document.getElementById("next-up")
  if (card) {
    const set = (sel: string, txt: string) => {
      const el = card.querySelector<HTMLElement>(sel)
      if (el) el.textContent = txt
    }
    const link = card.querySelector<HTMLAnchorElement>("[data-next-link]")
    const day = phase === "weeks" ? todayDay() : null
    if (day) {
      /* first weeks: the card shows today's plan, so the list keeps every event */
      set("[data-next-eyebrow]", `Today, ${shortDate(today)}`)
      set("[data-next-title]", day.title)
      set("[data-next-count]", "")
      set("[data-next-when]", day.first)
      if (link) {
        link.setAttribute("href", `/first-weeks/#${day.id}`)
        link.textContent = "See today's plan"
      }
      card.hidden = false
    } else if (upcoming.length) {
      const li = upcoming[0]
      set("[data-next-count]", li.querySelector<HTMLElement>("[data-countdown]")?.textContent?.split(" · ")[0] || "")
      set("[data-next-title]", li.querySelector("h3")?.textContent || "")
      set("[data-next-when]", li.querySelector(".when")?.textContent?.trim() || "")
      const go = li.querySelector<HTMLAnchorElement>(".btn-row a")
      if (link && go) link.setAttribute("href", go.getAttribute("href") || "/")
      card.hidden = false
      /* the card already shows this item, so the list starts after it */
      li.hidden = true
      upcoming = upcoming.slice(1)
    }
  }
  /* groups: hide empty ones, keep "Rest of 2027" behind one row until the dates are wanted */
  list.querySelectorAll<HTMLElement>("[data-ev-group]").forEach((g) => {
    const visible = Array.from(g.querySelectorAll<HTMLElement>("[data-event]")).filter((li) => !li.hidden)
    g.hidden = visible.length === 0
    if (!visible.length) return
    if (g.dataset.evGroup !== "rest" || phase === "after") {
      /* show the first 3 upcoming items, with one button for the rest of the group */
      const extra = visible.slice(3)
      if (!extra.length) return
      extra.forEach((li) => (li.hidden = true))
      const more = document.createElement("button")
      more.type = "button"
      more.className = "btn small ghost ev-more"
      more.setAttribute("aria-expanded", "false")
      more.textContent = `Show ${extra.length} more`
      g.appendChild(more)
      more.addEventListener("click", () => {
        more.setAttribute("aria-expanded", "true")
        extra.forEach((li) => {
          li.hidden = false
          if (!reduced) li.classList.add("ev-in")
        })
        more.hidden = true
        extra[0].querySelector<HTMLElement>("a")?.focus({ preventScroll: true })
      })
      return
    }
    const row = g.querySelector<HTMLElement>("[data-ev-collapsed]")
    const btn = g.querySelector<HTMLButtonElement>("[data-show-all]")
    const count = g.querySelector<HTMLElement>("[data-ev-rest-count]")
    if (!row || !btn) return
    if (count) count.textContent = String(visible.length)
    visible.forEach((li) => (li.hidden = true))
    g.classList.add("is-collapsed")
    row.hidden = false
    btn.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "true")
      g.classList.remove("is-collapsed")
      visible.forEach((li) => {
        li.hidden = false
        if (!reduced) li.classList.add("ev-in")
      })
      row.hidden = true
      visible[0].querySelector<HTMLElement>("a")?.focus({ preventScroll: true })
    })
  })
}

/* ---------- homepage quick answers ---------- */
const quick = document.querySelector<HTMLElement>(".home-quick")
if (quick) {
  const total = Number(quick.dataset.jobsTotal) || 0
  const doneNow: Record<string, boolean> = store(DONE_KEY) || {}
  const n = Math.min(Object.keys(doneNow).filter((k) => doneNow[k]).length, total)
  quick.querySelectorAll<HTMLElement>("[data-tile-jobs] [data-tile-sub]").forEach((el) => (el.textContent = `${n} of ${total} done`))
  const day = todayDay()
  if (phase === "weeks" && day) {
    quick.querySelectorAll<HTMLAnchorElement>("[data-tile-plan]").forEach((a) => a.setAttribute("href", `/first-weeks/#${day.id}`))
    let map: Record<string, string[]> = {}
    try {
      map = JSON.parse(quick.dataset.packs || "{}")
    } catch {
      /* ignore */
    }
    const pid = packIdFor(Object.keys(map))
    const boxes = map[pid] || []
    const ticks: Record<string, boolean> = store(PACK_KEY) || {}
    const k = boxes.filter((id) => ticks[id]).length
    quick.querySelectorAll<HTMLAnchorElement>("[data-tile-pack]").forEach((a) => {
      a.setAttribute("href", `/first-weeks/#${pid}`)
      const sub = a.querySelector<HTMLElement>("[data-tile-sub]")
      if (sub && boxes.length) {
        sub.textContent = `${k} of ${boxes.length} ticked`
        sub.hidden = false
      }
    })
  }
}

/* ---------- first weeks: highlight today, fold past days, today banner ---------- */
const days = Array.from(document.querySelectorAll<HTMLElement>("[data-from]"))
days.forEach((li) => {
  const from = dayNum(li.dataset.from!)
  const to = dayNum(li.dataset.to!)
  const on = from <= t && t <= to
  li.classList.toggle("today", on)
  const flag = li.querySelector<HTMLElement>("[data-today-flag]")
  if (flag) flag.hidden = !on
  const d = li.querySelector<HTMLDetailsElement>("details.day")
  if (d) d.open = !(to < t)
})
const banner = document.querySelector<HTMLElement>("[data-today-banner]")
if (banner && days.length) {
  const firstIso = days[0].dataset.from!
  const lastIso = days[days.length - 1].dataset.to!
  const link = (label: string, href: string, ghost = false) => {
    const a = document.createElement("a")
    a.className = ghost ? "btn small ghost" : "btn small"
    a.href = href
    a.textContent = label
    return a
  }
  const box = document.createElement("div")
  box.className = "today-banner"
  const eyebrow = document.createElement("p")
  eyebrow.className = "tb-eyebrow"
  const title = document.createElement("p")
  title.className = "tb-title"
  const row = document.createElement("div")
  row.className = "btn-row"
  let show = true
  if (t < dayNum(firstIso)) {
    const n = dayNum(firstIso) - t
    eyebrow.textContent = shortDate(firstIso)
    title.textContent = n === 1 ? "Starts tomorrow" : `Starts in ${n} days`
    row.append(link("See the first day", `#${days[0].id}`), link("What to pack", "#pack", true))
  } else if (t <= dayNum(lastIso)) {
    const day = todayDay()
    const ids = Array.from(document.querySelectorAll("[data-pack-group]")).map((g) => g.id)
    eyebrow.textContent = `Today, ${shortDate(today)}`
    title.textContent = day?.title || ""
    row.append(link("Today's plan", `#${day?.id || "day-by-day"}`), link("Pack for today", `#${packIdFor(ids)}`, true))
  } else show = false
  if (show) {
    box.append(eyebrow, title, row)
    banner.append(box)
    banner.hidden = false
  }
}

/* ---------- checklists: What to pack ---------- */
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
    if ((day && day === today) || (daily && t >= first + 1) || (day === "2027-01-04" && t < first)) g.open = true
  })
  document.getElementById("clear-ticks")?.addEventListener("click", () => {
    if (!confirm("Clear all ticks on this device?")) return
    ticks = {}
    store(PACK_KEY, ticks)
    groups.forEach((g) => g.querySelectorAll<HTMLInputElement>("input[data-pack]").forEach((b) => (b.checked = false)))
    updateAll()
  })
  document.getElementById("print-pack")?.addEventListener("click", () => {
    root.dataset.print = "pack"
    window.print()
  })
}

/* ---------- get ready: deadline pills, mark-done, done or passed group ---------- */
const steps = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-step]"))
if (steps.length) {
  const done: Record<string, boolean> = store(DONE_KEY) || {}
  const jobs = document.querySelector<HTMLElement>("[data-jobs-progress]")
  const doneGroup = document.querySelector<HTMLDetailsElement>("[data-done-group]")
  const doneList = document.querySelector<HTMLElement>("[data-done-list]")
  const doneCount = document.querySelector<HTMLElement>("[data-done-count]")
  const homes = new Map<HTMLElement, Element>()
  steps.forEach((s) => homes.set(s, s.parentElement as Element))
  const deadlinesOf = (s: HTMLElement) => (s.dataset.deadlines || "").split(",").filter(Boolean)
  const isPast = (s: HTMLElement) => {
    const dl = deadlinesOf(s)
    return dl.length > 0 && dl.every((x) => dayNum(x) < t)
  }
  const paintJobs = () => {
    const text = jobs?.querySelector<HTMLElement>("[data-jobs-text]")
    if (!jobs || !text) return
    text.textContent = `${steps.filter((x) => done[x.dataset.step!]).length} of ${steps.length} tasks done`
    jobs.hidden = false
  }
  /* put every step in its group, or in the done group when it is done or its dates have passed */
  const layout = () => {
    let n = 0
    steps.forEach((s) => {
      const gone = !!done[s.dataset.step!] || isPast(s)
      if (gone) n++
      const dest = gone && doneList ? doneList : homes.get(s)
      dest?.appendChild(s)
    })
    if (doneGroup) doneGroup.hidden = n === 0
    if (doneCount) doneCount.textContent = String(n)
    document.querySelectorAll<HTMLElement>("[data-step-group]").forEach((g) => (g.hidden = !g.querySelector("[data-step]")))
  }
  steps.forEach((s) => {
    const id = s.dataset.step!
    const pill = s.querySelector<HTMLElement>("[data-pill]")!
    const btn = s.querySelector<HTMLButtonElement>("[data-done-btn]")!
    const dl = deadlinesOf(s)
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
      paintJobs()
      layout()
      if (done[id] && doneGroup) doneGroup.open = true
      btn.focus({ preventScroll: true })
      s.scrollIntoView({ block: "nearest" })
    })
    render()
  })
  paintJobs()
  layout()
}

/* ---------- booklist: Mother Tongue picker ---------- */
const picker = document.querySelector<HTMLElement>("[data-mt-picker]")
const mtGroups = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-mt-group]"))
let mtChosen: string | null = null
if (picker && mtGroups.length) {
  const hint = document.querySelector<HTMLElement>("[data-mt-hint]")
  const btns = Array.from(picker.querySelectorAll<HTMLButtonElement>("[data-mt]"))
  const apply = (id: string | null, openIt: boolean) => {
    mtChosen = id
    mtGroups.forEach((g) => {
      g.hidden = g.dataset.mtGroup !== id
      if (!g.hidden && openIt) g.open = true
    })
    btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mt === id)))
    if (hint) hint.hidden = !!id
  }
  const saved = store(MT_KEY)
  apply(typeof saved === "string" && mtGroups.some((g) => g.dataset.mtGroup === saved) ? saved : null, false)
  btns.forEach((b) =>
    b.addEventListener("click", () => {
      apply(b.dataset.mt!, true)
      store(MT_KEY, b.dataset.mt)
    }),
  )
}

/* ---------- school life: section list, open all, highlight the section in view ---------- */
const lifeNav = document.querySelector<HTMLElement>("[data-life-nav]")
if (lifeNav) {
  const sections = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-life-section]"))
  const wide = window.matchMedia("(min-width: 1040px)")
  if (wide.matches) sections.forEach((s) => (s.open = true))
  const toggle = document.querySelector<HTMLButtonElement>("[data-open-all]")
  const label = () => {
    if (!toggle) return
    const all = sections.every((s) => s.open)
    toggle.textContent = all ? "Close all" : "Open all"
    toggle.setAttribute("aria-pressed", String(all))
  }
  sections.forEach((s) => s.addEventListener("toggle", label))
  toggle?.addEventListener("click", () => {
    const open = !sections.every((s) => s.open)
    sections.forEach((s) => (s.open = open))
    label()
  })
  label()
  const links = Array.from(lifeNav.querySelectorAll<HTMLAnchorElement>("a"))
  let ticking = false
  let current = "-"
  const mark = () => {
    ticking = false
    const probe = 140
    let active: HTMLElement | null = null
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= probe) active = s
    })
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = sections[sections.length - 1]
    const id = active ? (active as HTMLElement).id : ""
    if (id === current) return
    current = id
    const gid = active ? (active as HTMLElement).closest<HTMLElement>("[data-life-group]")?.id || "" : ""
    links.forEach((a) => {
      const on = !!id && (a.dataset.navSection === id || a.dataset.navGroup === gid)
      if (on) a.setAttribute("aria-current", "location")
      else a.removeAttribute("aria-current")
    })
    if (!id) return
    const chip = lifeNav.querySelector<HTMLElement>(`[data-nav-group="${gid}"]`)
    if (chip && lifeNav.scrollWidth > lifeNav.clientWidth + 2 && getComputedStyle(lifeNav).overflowX !== "visible") {
      lifeNav.scrollTo({ left: chip.offsetLeft - (lifeNav.clientWidth - chip.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" })
    }
    const sec = lifeNav.querySelector<HTMLElement>(`[data-nav-section="${id}"]`)
    if (sec && lifeNav.scrollHeight > lifeNav.clientHeight + 2 && getComputedStyle(lifeNav).overflowY !== "visible") {
      const top = sec.offsetTop
      if (top < lifeNav.scrollTop || top + sec.offsetHeight > lifeNav.scrollTop + lifeNav.clientHeight) lifeNav.scrollTop = top - lifeNav.clientHeight / 3
    }
  }
  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(mark)
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll)
  mark()
}

/* ---------- open the section a link points to ---------- */
/* anchors that moved to another page */
const MOVED: Record<string, string> = { "/school-life/": "communicating-with-the-school" }
function openHash(initial = false) {
  if (!location.hash) return
  const here = location.pathname.replace(/\/?$/, "/")
  if (MOVED[here] && location.hash.slice(1) === MOVED[here]) {
    location.replace("/contacts/" + location.search + location.hash)
    return
  }
  let node: Element | null = null
  try {
    node = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  } catch {
    /* bad hash */
  }
  for (let n: Element | null = node; n; n = n.parentElement) if (n instanceof HTMLDetailsElement) n.open = true
  node?.scrollIntoView(initial ? { behavior: "instant" as ScrollBehavior } : undefined)
}
openHash(true)
window.addEventListener("hashchange", () => openHash())

/* ---------- print: open every details element, then put them back ---------- */
window.addEventListener("beforeprint", () => {
  document.querySelectorAll<HTMLDetailsElement>("details").forEach((d) => {
    if (!d.open) {
      d.dataset.printClosed = ""
      d.open = true
    }
  })
  /* no Mother Tongue chosen: print every group */
  if (picker && !mtChosen) {
    mtGroups.forEach((g) => {
      g.dataset.printHidden = ""
      g.hidden = false
    })
  }
})
window.addEventListener("afterprint", () => {
  document.querySelectorAll<HTMLDetailsElement>("details[data-print-closed]").forEach((d) => {
    d.open = false
    delete d.dataset.printClosed
  })
  mtGroups.forEach((g) => {
    if (g.dataset.printHidden !== undefined) {
      g.hidden = true
      delete g.dataset.printHidden
    }
  })
  delete root.dataset.print
})

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

/* ---------- keep ?today= on internal links while testing on localhost ---------- */
if (useOverride) {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
    const u = new URL(a.getAttribute("href") as string, location.origin)
    u.searchParams.set("today", override as string)
    a.setAttribute("href", u.pathname + u.search + u.hash)
  })
}
