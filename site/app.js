(function () {
  "use strict"
  var D = window.SACPS_DATA
  var TZ = D.meta.timezone
  var DOCS = {}
  D.refDocs.forEach(function (d) { DOCS[d.id] = d })

  /* ---------- helpers ---------- */
  function el(tag, attrs) {
    var n = document.createElement(tag)
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k]
        if (v === null || v === undefined || v === false) return
        if (k === "class") n.className = v
        else if (k === "text") n.textContent = v
        else if (typeof v === "function") n.addEventListener(k.replace(/^on/, ""), v)
        else n.setAttribute(k, v === true ? "" : v)
      })
    }
    for (var i = 2; i < arguments.length; i++) add(n, arguments[i])
    return n
  }
  function add(parent, child) {
    if (child === null || child === undefined || child === false) return
    if (Array.isArray(child)) { child.forEach(function (c) { add(parent, c) }); return }
    if (typeof child === "string") parent.appendChild(document.createTextNode(child))
    else parent.appendChild(child)
  }
  function rich(text) {
    var frag = document.createDocumentFragment()
    String(text).split("**").forEach(function (part, i) {
      if (!part) return
      if (i % 2 === 1) frag.appendChild(el("strong", { text: part }))
      else frag.appendChild(document.createTextNode(part))
    })
    return frag
  }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || "null")
      localStorage.setItem(key, JSON.stringify(val))
    } catch (e) { /* storage may be blocked */ }
    return null
  }
  function money(n) { return "$" + n.toFixed(2) }

  /* ---------- dates (Singapore time) ---------- */
  function sgToday() {
    var q = new URLSearchParams(location.search).get("today")
    if (q && (location.hostname === "localhost" || location.hostname === "127.0.0.1") && /^\d{4}-\d{2}-\d{2}$/.test(q)) return q
    var parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date())
    var o = {}
    parts.forEach(function (p) { o[p.type] = p.value })
    return o.year + "-" + o.month + "-" + o.day
  }
  function dayNum(iso) {
    var p = iso.split("-")
    return Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000)
  }
  function fmt(iso, opts) {
    var p = iso.split("-")
    return new Intl.DateTimeFormat("en-SG", Object.assign({ timeZone: "UTC" }, opts)).format(new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])))
  }
  function longDate(iso) { return fmt(iso, { weekday: "short", day: "numeric", month: "short", year: "numeric" }) }
  function countdown(date, endDate, today) {
    var a = dayNum(date) - dayNum(today)
    if (endDate && a <= 0 && dayNum(endDate) >= dayNum(today)) {
      var left = dayNum(endDate) - dayNum(today)
      return { text: left === 0 ? "Last day today" : "On now, " + left + (left === 1 ? " day" : " days") + " left", cls: "soon", n: 0 }
    }
    if (a < 0) return { text: "Passed", cls: "past", n: a }
    if (a === 0) return { text: "Today", cls: "soon", n: 0 }
    if (a === 1) return { text: "Tomorrow", cls: "soon", n: 1 }
    return { text: "In " + a + " days", cls: a <= 7 ? "soon" : "", n: a }
  }

  /* ---------- source chips ---------- */
  function chips(list) {
    if (!list || !list.length) return null
    var wrap = el("span", { class: "src" })
    list.forEach(function (ref) {
      var bits = ref.split(":")
      var d = DOCS[bits[0]]
      if (!d) return
      var label = d.short + " p" + bits[1]
      wrap.appendChild(el("span", { class: "chip", title: d.tip || d.title, text: label }))
    })
    return wrap
  }

  /* ---------- generic blocks ---------- */
  function table(b) {
    var cols = b.head || []
    var t = el("table", { class: "stack" })
    if (cols.length) t.appendChild(el("thead", null, el("tr", null, cols.map(function (c) { return el("th", { scope: "col", text: c }) }))))
    var tb = el("tbody")
    b.rows.forEach(function (r) {
      tb.appendChild(el("tr", null, r.map(function (c, i) { return el("td", { "data-label": cols[i] || "" }, rich(c)) })))
    })
    t.appendChild(tb)
    var w = el("div", { class: "table-wrap" }, t)
    if (b.s) return el("div", null, w, el("p", { class: "chip-row" }, chips(b.s)))
    return w
  }
  function accordion(b, open) {
    var d = el("details", { class: "acc", open: open })
    d.appendChild(el("summary", null, el("span", { class: "sum-main" }, el("span", { text: b.title }), b.sub ? el("span", { class: "sum-sub", text: b.sub }) : null)))
    d.appendChild(el("div", { class: "acc-body" }, renderBlocks(b.blocks)))
    return d
  }
  function linkBtn(label, url, kind) {
    var icon = kind === "tel"
      ? '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>'
      : kind === "mail"
        ? '<path d="M3 6h18v12H3zM3 7l9 7 9-7"/>'
        : kind === "map"
          ? '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>'
          : '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>'
    var a = el("a", { class: "btn ghost small", href: url })
    if (kind === "web" || kind === "map") { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener") }
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("viewBox", "0 0 24 24")
    svg.setAttribute("aria-hidden", "true")
    svg.innerHTML = icon
    a.appendChild(svg)
    a.appendChild(document.createTextNode(label))
    return a
  }
  function renderBlocks(blocks) {
    var out = []
    blocks.forEach(function (b) {
      if (b.k === "p") out.push(el("p", null, rich(b.t), chips(b.s)))
      else if (b.k === "ul") {
        out.push(el("ul", { class: "facts" }, b.items.map(function (it) { return el("li", null, rich(it.t), chips(it.s)) })))
      } else if (b.k === "table") out.push(table(b))
      else if (b.k === "note") out.push(el("div", { class: "note" + (b.tone === "info" ? " info" : "") }, el("p", null, rich(b.t), chips(b.s))))
      else if (b.k === "accordion") out.push(accordion(b, false))
      else if (b.k === "links") {
        out.push(el("div", { class: "links" }, b.items.map(function (l) {
          return el("div", null, linkBtn(l.label, l.url, "web"), chips(l.s))
        })))
      } else if (b.k === "books") out.push(books())
    })
    return out
  }

  /* ---------- booklist ---------- */
  function bookRows(items, withQty) {
    return items.map(function (it) {
      var row = [it.t]
      if (withQty) row.push(String(it.q))
      row.push(it.p === 0 ? "No charge" : money(it.p * (withQty ? it.q : 1)))
      return row
    })
  }
  function priceTable(head, rows, totalLabel, total) {
    var cols = head
    var t = el("table", { class: "price" })
    t.appendChild(el("thead", null, el("tr", null, cols.map(function (c, i) { return el("th", { scope: "col", class: i === cols.length - 1 ? "num" : "", text: c }) }))))
    var tb = el("tbody")
    rows.forEach(function (r) {
      tb.appendChild(el("tr", null, r.map(function (c, i) { return el("td", { class: i === r.length - 1 ? "num" : "", "data-label": cols[i] }, c) })))
    })
    if (totalLabel) {
      var tr = el("tr", null, el("td", { "data-label": cols[0] }, el("strong", { text: totalLabel })))
      for (var i = 1; i < cols.length - 1; i++) tr.appendChild(el("td", { "data-label": cols[i] }))
      tr.appendChild(el("td", { class: "num", "data-label": cols[cols.length - 1] }, el("strong", { text: money(total) })))
      tb.appendChild(tr)
    }
    t.appendChild(tb)
    return el("div", { class: "table-wrap" }, t)
  }
  function books() {
    var B = D.booklist
    var wrap = el("div", { class: "books" })
    wrap.appendChild(el("h4", { text: "Booklist" }))
    wrap.appendChild(el("div", { class: "note info" }, el("p", null, B.note, chips(B.s))))

    // Section A common
    var common = []
    B.common.forEach(function (g) {
      g.items.forEach(function (it, i) { common.push([i === 0 ? g.name : "", it.t, it.p === 0 ? "No charge" : money(it.p)]) })
    })
    wrap.appendChild(accordion({
      title: "A. Textbooks and workbooks (all students)",
      sub: "English, Maths, Social Studies, PE, FTGP",
      blocks: [{ k: "p", t: "Subtotals as printed: Maths $19.35, Social Studies $2.00, PE $2.60, FTGP $3.15." }]
    }, false))
    var firstAcc = wrap.lastChild
    firstAcc.querySelector(".acc-body").insertBefore(priceTable(["Subject", "Title", "Price"], common), firstAcc.querySelector(".acc-body").firstChild)
    firstAcc.querySelector(".acc-body").appendChild(el("p", { class: "chip-row" }, chips(["booklist:1"])))

    // Mother Tongue variants
    wrap.appendChild(el("h4", { text: "Mother Tongue books and Character and Citizenship Education book" }))
    wrap.appendChild(el("p", { class: "lead", text: "These differ by language. Open the one that applies." }))
    B.mt.forEach(function (m) {
      var rows = m.items.map(function (it) { return [it.t, money(it.p)] })
      var det = el("details", { class: "acc" })
      var subBits = []
      if (m.items.length) subBits.push("Books " + money(m.total))
      subBits.push("CCE book " + money(m.cce.p))
      if (m.stationery.length) subBits.push("Language stationery " + money(m.stationeryTotal))
      det.appendChild(el("summary", null, el("span", { class: "sum-main" }, el("span", { text: m.name }), el("span", { class: "sum-sub", text: subBits.join(", ") }))))
      var body = el("div", { class: "acc-body" })
      if (rows.length) body.appendChild(priceTable(["Book", "Price"], rows, "Subtotal", m.total))
      body.appendChild(el("h4", { text: "Character and Citizenship Education book" }))
      body.appendChild(priceTable(["Book", "Price"], [[m.cce.t, money(m.cce.p)]]))
      if (m.stationery.length) {
        body.appendChild(el("h4", { text: "Language stationery (section B)" }))
        body.appendChild(priceTable(["Item", "Qty", "Price"], bookRows(m.stationery, true), "Subtotal", m.stationeryTotal))
      } else {
        body.appendChild(el("p", { text: "No language-specific stationery is listed for this group." }))
      }
      body.appendChild(el("p", { class: "chip-row" }, chips(["booklist:1", "booklist:2"])))
      det.appendChild(body)
      wrap.appendChild(det)
    })
    wrap.appendChild(el("div", { class: "note" }, el("p", null, "Check with the school if you are unsure which group applies to your daughter. Higher Chinese is mentioned on the booklist next to some Chinese items, so ask the school if that matters to you.", chips(["booklist:1"]))))

    // Section B
    var bBody = []
    bBody.push(priceTable(["Item", "Qty", "Price"], bookRows(B.stationeryCommon, true), "Subtotal as printed", B.stationeryCommonTotal))
    bBody.push(el("h4", { text: "Art materials (compulsory)" }))
    bBody.push(priceTable(["Item", "Qty", "Price"], bookRows(B.art, true), "Subtotal", B.artTotal))
    bBody.push(el("p", { class: "chip-row" }, chips(["booklist:2"])))
    var accB = accordion({ title: "B. Exercise books and stationery (compulsory)", sub: "Common items and art materials", blocks: [] }, false)
    bBody.forEach(function (n) { accB.querySelector(".acc-body").appendChild(n) })
    wrap.appendChild(accB)

    // Section C
    var accC = accordion({ title: "C. Optional items", sub: "Not compulsory", blocks: [] }, false)
    accC.querySelector(".acc-body").appendChild(priceTable(["Item", "Qty", "Price"], bookRows(B.optional, true), "Total for all optional items", B.optionalTotal))
    accC.querySelector(".acc-body").appendChild(el("p", { class: "chip-row" }, chips(["booklist:2"])))
    wrap.appendChild(accC)
    return wrap
  }

  /* ---------- panels ---------- */
  function head(id, title, lead) {
    return [el("h2", { id: "h-" + id, tabindex: "-1", text: title }), lead ? el("p", { class: "lead", text: lead }) : null]
  }

  function renderNow(root, today) {
    root.textContent = ""
    add(root, head("now", "Now and coming up", "Dates are counted in Singapore time. Items drop off after they pass."))
    add(root, el("div", { class: "note info" },
      el("p", null, rich("**Unofficial site.** Run by a parent, not by the school. Check **Parents Gateway** and school announcements for updates, and use the school documents under Documents when in doubt."))))

    var upcoming = D.events.filter(function (e) { return dayNum(e.endDate || e.date) >= dayNum(today) })
      .sort(function (a, b) { return dayNum(a.date) - dayNum(b.date) })
    if (!upcoming.length) {
      add(root, el("div", { class: "card empty" }, "All the dated items in the school documents have passed. Use School life for day-to-day reference."))
    } else {
      var first = upcoming[0]
      var c0 = countdown(first.date, first.endDate, today)
      add(root, el("div", { class: "hero" },
        el("p", { class: "label", text: "Next up" }),
        el("p", { class: "when", text: c0.text }),
        el("h3", { text: first.title }),
        el("p", { text: longDate(first.date) + (first.endDate ? " to " + longDate(first.endDate) : "") + (first.time ? ", " + first.time : "") }),
        el("p", { text: first.detail }),
        el("p", { class: "chip-row" }, chips(first.s)),
        el("div", { class: "btn-row" }, el("a", { class: "btn small ghost", style: "color:inherit;border-color:currentColor", href: "#" + first.go }, "See the details"))
      ))
      add(root, el("h3", { text: "After that" }))
      var list = el("div", { id: "ev-list" })
      var rest = upcoming.slice(1)
      function paint(all) {
        list.textContent = ""
        var shown = all ? rest : rest.slice(0, 4)
        shown.forEach(function (e) {
          var c = countdown(e.date, e.endDate, today)
          list.appendChild(el("article", { class: "card ev" },
            el("div", { class: "date", "aria-hidden": "true" }, el("span", { class: "d", text: fmt(e.date, { day: "numeric" }) }), el("span", { class: "m", text: fmt(e.date, { month: "short" }) })),
            el("div", null,
              el("div", { class: "meta" }, el("span", { class: "pill " + c.cls, text: c.text }), e.endDate ? el("span", { class: "chip", text: "to " + fmt(e.endDate, { day: "numeric", month: "short" }) }) : null),
              el("h3", null, e.title),
              el("p", { text: longDate(e.date) + (e.time ? ", " + e.time : "") }),
              el("p", { text: e.detail }),
              el("p", { class: "chip-row" }, chips(e.s), " ", el("a", { class: "chip", href: "#" + e.go, text: "Open section" }))
            )))
        })
        if (rest.length > 4) {
          list.appendChild(el("div", { class: "btn-row" }, el("button", {
            class: "btn ghost small", type: "button", "aria-expanded": all ? "true" : "false",
            onclick: function () { paint(!all) }
          }, all ? "Show fewer" : "Show all " + rest.length + " more upcoming items")))
        }
      }
      paint(false)
      add(root, list)
    }

    add(root, el("h3", { text: "A normal school day, at a glance" }))
    add(root, el("div", { class: "times" }, D.keyTimes.map(function (k) {
      return el("div", { class: "time-tile" }, el("b", { text: k.label }), el("span", { text: k.value }), el("div", { class: "chip-row" }, chips(k.s)))
    })))
    add(root, el("p", { class: "lead" }, "More in ", el("a", { href: "#life", text: "School life" }), ". Phone and address are under ", el("a", { href: "#contacts", text: "Contacts" }), "."))
  }

  function renderWeeks(root, today) {
    root.textContent = ""
    var W = D.weeks
    add(root, head("weeks", "First weeks", W.intro))
    add(root, el("h3", { text: "Day by day" }))
    var tl = el("ol", { class: "timeline" })
    W.timeline.forEach(function (d) {
      var isToday = dayNum(d.from) <= dayNum(today) && dayNum(today) <= dayNum(d.to)
      tl.appendChild(el("li", { class: isToday ? "today" : "" },
        el("div", { class: "card" },
          el("p", { class: "tl-date", text: d.label + (isToday ? " (today)" : "") }),
          el("h4", { text: d.title }),
          el("ul", { class: "facts" }, d.items.map(function (it) { return el("li", null, rich(it.t), chips(it.s)) })))))
    })
    add(root, tl)

    add(root, el("h3", { id: "pack", text: "What to pack" }))
    add(root, el("p", { class: "lead", text: W.pack.intro }))
    var ticks = store("sacps-pack-v1") || {}
    var groups = []
    W.pack.groups.forEach(function (g) {
      var det = el("details", { class: "acc" })
      var prog = el("span", { class: "progress" })
      function update() {
        var n = 0
        g.items.forEach(function (it) { if (ticks[it.id]) n++ })
        prog.textContent = n + " of " + g.items.length
      }
      det.appendChild(el("summary", null, el("span", { text: g.label }), prog))
      var body = el("div", { class: "acc-body" })
      g.items.forEach(function (it) {
        var cb = el("input", { type: "checkbox", id: it.id })
        cb.checked = !!ticks[it.id]
        cb.addEventListener("change", function () {
          if (cb.checked) ticks[it.id] = true; else delete ticks[it.id]
          store("sacps-pack-v1", ticks)
          update()
        })
        body.appendChild(el("label", { class: "check", for: it.id }, cb, el("span", null, rich(it.t), chips(it.s))))
      })
      det.appendChild(body)
      update()
      groups.push({ det: det, g: g, update: update })
      root.appendChild(det)
    })
    // open the group that matches today
    var map = { "2027-01-04": "pack-0104", "2027-01-05": "pack-0105", "2027-01-06": "pack-0106", "2027-01-07": "pack-0107" }
    var openId = map[today] || (dayNum(today) < dayNum("2027-01-04") ? "pack-0104" : "pack-daily")
    groups.forEach(function (x) { if (x.g.id === openId || (x.g.id === "pack-daily" && dayNum(today) >= dayNum("2027-01-05"))) x.det.open = true })
    add(root, el("p", null, rich(W.pack.after)))
    add(root, el("div", { class: "btn-row" }, el("button", {
      class: "btn ghost small", type: "button",
      onclick: function () {
        if (!confirm("Clear all ticks on this device?")) return
        ticks = {}
        store("sacps-pack-v1", ticks)
        groups.forEach(function (x) { x.det.querySelectorAll("input").forEach(function (i) { i.checked = false }); x.update() })
      }
    }, "Clear all ticks")))

    add(root, el("h3", { text: "Handy to know" }))
    add(root, renderBlocks(W.extras))
  }

  function renderBefore(root, today) {
    root.textContent = ""
    var B = D.before
    add(root, head("before", "Before school starts", B.intro))
    var done = store("sacps-done-v1") || {}
    B.steps.forEach(function (s) {
      var det = el("details", { class: "acc", id: "step-" + s.id })
      var pill = el("span", { class: "pill" })
      function paintPill() {
        if (done[s.id]) { pill.className = "pill done"; pill.textContent = "Done"; return }
        var dl = s.deadlines || (s.deadline ? [s.deadline] : [])
        if (dl.length) {
          var open = dl.filter(function (x) { return dayNum(x) >= dayNum(today) })
          var c = countdown(open.length ? open[0] : dl[dl.length - 1], null, today)
          pill.className = "pill " + c.cls
          pill.textContent = c.text === "Passed" ? "Deadline passed" : c.text
        } else { pill.className = "pill past"; pill.textContent = "No deadline" }
      }
      paintPill()
      det.appendChild(el("summary", null,
        el("span", { class: "sum-main" }, el("span", { text: s.title }), el("span", { class: "sum-sub", text: s.when })),
        pill))
      var body = el("div", { class: "acc-body" }, renderBlocks(s.blocks))
      var btn = el("button", { class: "btn ghost small", type: "button", "aria-pressed": done[s.id] ? "true" : "false" }, done[s.id] ? "Marked done (tap to undo)" : "Mark this as done")
      btn.addEventListener("click", function () {
        if (done[s.id]) delete done[s.id]; else done[s.id] = true
        store("sacps-done-v1", done)
        btn.setAttribute("aria-pressed", done[s.id] ? "true" : "false")
        btn.textContent = done[s.id] ? "Marked done (tap to undo)" : "Mark this as done"
        paintPill()
      })
      body.appendChild(el("div", { class: "btn-row" }, btn, el("span", { class: "sum-sub", style: "align-self:center", text: "Saved on this device only." })))
      det.appendChild(body)
      root.appendChild(det)
    })
  }

  function renderLife(root) {
    root.textContent = ""
    add(root, head("life", "School life", D.life.intro))
    D.life.sections.forEach(function (s) {
      var det = el("details", { class: "acc" })
      det.appendChild(el("summary", null, el("span", { text: s.title })))
      det.appendChild(el("div", { class: "acc-body" }, renderBlocks(s.blocks)))
      root.appendChild(det)
    })
  }

  function telHref(num) { return "tel:+65" + num.replace(/\s+/g, "") }
  function waHref(num) { return "https://wa.me/65" + num.replace(/\s+/g, "") }

  function renderContacts(root) {
    root.textContent = ""
    var C = D.contacts
    add(root, head("contacts", "Contacts", "Tap a number to call or an address to open it. Only business and school contacts printed in the documents are listed."))
    var s = C.school
    var mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.address)
    add(root, el("article", { class: "card contact" },
      el("h3", { text: s.name }),
      el("p", { class: "role" }, s.address),
      el("div", { class: "links" },
        linkBtn("Call " + s.phone, telHref(s.phone), "tel"),
        linkBtn(s.email, "mailto:" + s.email, "mail"),
        linkBtn("Open map", mapUrl, "map"),
        linkBtn("School website", s.web, "web"),
        linkBtn("Facebook", s.facebook, "web"),
        linkBtn("Instagram", s.instagram, "web")),
      el("p", { style: "margin-top:12px" }, s.hours),
      el("p", null, "For urgent matters, contact the General Office. Teachers may not reply on the same day."),
      el("p", { class: "chip-row" }, chips(s.s))))

    add(root, el("h3", { text: "Suppliers and services" }))
    C.vendors.forEach(function (v) {
      var links = []
      v.phones.forEach(function (p) { links.push(linkBtn("Call " + p, telHref(p), "tel")) })
      if (v.whatsapp) links.push(linkBtn("WhatsApp " + v.whatsapp, waHref(v.whatsapp), "web"))
      if (v.email) links.push(linkBtn(v.email, "mailto:" + v.email, "mail"))
      if (v.web) links.push(linkBtn("Website", v.web, "web"))
      add(root, el("article", { class: "card contact" },
        el("h3", { text: v.name }),
        el("p", { class: "role" }, v.role),
        v.person ? el("p", { text: v.person }) : null,
        v.note ? el("p", { text: v.note }) : null,
        el("div", { class: "links" }, links),
        el("p", { class: "chip-row" }, chips(v.s))))
    })

    add(root, el("h3", { text: "Student care" }))
    C.care.forEach(function (c) {
      add(root, el("article", { class: "card contact" }, el("h3", { text: c.name }), el("p", null, c.t, chips(c.s))))
    })

    add(root, el("h3", { text: "Staff and roles" }))
    add(root, el("p", { class: "lead" }, C.staffNote, " ", chips(C.staffSrc)))
    C.staff.forEach(function (g) {
      var det = el("details", { class: "acc" })
      det.appendChild(el("summary", null, el("span", { text: g.group })))
      det.appendChild(el("div", { class: "acc-body" }, table({ head: ["Name", "Role"], rows: g.rows })))
      root.appendChild(det)
    })
  }

  function renderDocs(root) {
    root.textContent = ""
    add(root, head("docs", "Documents", "These are the documents the school gave P1 2027 parents. Find them in Parents Gateway or ask the school office."))
    D.refDocs.filter(function (d) { return d.summary }).forEach(function (d) {
      add(root, el("article", { class: "card doc" },
        el("h3", { text: d.title }),
        el("p", { class: "issued", text: d.issued ? "Issued " + d.issuedLabel : d.issuedLabel }),
        el("p", { text: d.summary })))
    })
    add(root, el("div", { class: "note info" }, el("p", null, "The 11 Nov 2026 letter was sent to each family individually, so it is not posted here.")))
    add(root, el("div", { class: "note info" }, el("p", null, rich("Source labels on this site, such as **Booklet p4**, give the page number in that document. The booklist has no printed issue date, so it is called the P1 2027 Booklist. The school's letter also links to an online form for orientation attendance, which closed on 12 November 2026."))))
  }

  /* ---------- routing ---------- */
  var TABS = ["now", "weeks", "before", "life", "contacts", "docs"]
  var TITLES = { now: "Now", weeks: "First weeks", before: "Before school starts", life: "School life", contacts: "Contacts", docs: "Documents" }
  var rendered = {}
  var today = sgToday()

  function ensure(tab) {
    if (rendered[tab]) return
    var root = document.getElementById("panel-" + tab)
    try {
      if (tab === "now") renderNow(root, today)
      else if (tab === "weeks") renderWeeks(root, today)
      else if (tab === "before") renderBefore(root, today)
      else if (tab === "life") renderLife(root)
      else if (tab === "contacts") renderContacts(root)
      else if (tab === "docs") renderDocs(root)
      rendered[tab] = true
    } catch (e) {
      root.textContent = "Sorry, this section failed to load. Please check Parents Gateway or ask the school office."
      if (window.console) console.error(e)
    }
  }

  function route(initial) {
    var h = (location.hash || "#now").replace("#", "")
    var anchor = null
    if (h === "pack") { anchor = "pack"; h = "weeks" }
    if (h.indexOf("step-") === 0) { anchor = h; h = "before" }
    if (TABS.indexOf(h) < 0) h = "now"
    ensure(h)
    TABS.forEach(function (t) {
      document.getElementById("panel-" + t).hidden = t !== h
    })
    document.querySelectorAll("#tabs a").forEach(function (a) {
      if (a.getAttribute("data-tab") === h) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current")
    })
    document.title = TITLES[h] + " | " + D.meta.title
    if (anchor) {
      var t = document.getElementById(anchor)
      if (t) { if (t.tagName === "DETAILS") t.open = true; t.scrollIntoView() }
    } else if (!initial) {
      window.scrollTo(0, 0)
      var hd = document.getElementById("h-" + h)
      if (hd) hd.focus({ preventScroll: true })
    }
  }
  window.addEventListener("hashchange", function () { route(false) })

  /* ---------- theme ---------- */
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t)
  }
  applyTheme(store("sacps-theme"))
  document.getElementById("theme-btn").addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme")
    if (!cur) cur = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    var next = cur === "dark" ? "light" : "dark"
    applyTheme(next)
    store("sacps-theme", next)
  })

  document.getElementById("updated").textContent = "Last updated " + fmt(D.meta.updated, { day: "numeric", month: "long", year: "numeric" }) + "."
  route(true)
})()
