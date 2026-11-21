import type { Content } from "./types"

/*
  All site content lives here. To update the site, edit this file only.
  Source references use the form "docId:page" (for example "booklet:4").
  Block kinds: p, ul, table, kv, note, links, accordion, books.
  Dates are ISO 8601 in Singapore time. No semicolons in visible English copy.
*/
export const data = {
  meta: {
    title: "P1 2027 SACPS Hub",
    updated: "2026-11-21",
    timezone: "Asia/Singapore",
    firstDay: "2027-01-04"
  },

  /* School documents. Source chips show them as plain labels (nothing links to a file). The About page lists them by title and date. */
  refDocs: [
    {
      id: "details",
      short: "Letter",
      title: "School letter of 11 Nov 2026, sent to each family",
      issued: "2026-11-11",
      issuedLabel: "11 November 2026",
      tip: "School letter of 11 Nov 2026, sent to each family"
    },
    {
      id: "booklet",
      short: "Booklet",
      title: "P1 Information Booklet for Parents",
      issued: "2026-11-13",
      issuedLabel: "13 November 2026",
      summary: "The practical guide to school days: first day, school hours, gates, dismissal, uniform, buses, safety, communication and good habits."
    },
    {
      id: "slides",
      short: "Slides",
      title: "P1 Orientation for Parents (briefing slides)",
      issued: "2026-11-13",
      issuedLabel: "13 November 2026",
      summary: "Slides from the parents' briefing: school leaders, values, how P1 works, assessment, first days, and tips for supporting your daughter."
    },
    {
      id: "booklist",
      short: "Booklist",
      title: "P1 2027 Booklist",
      issued: null,
      issuedLabel: "No issue date printed",
      summary: "Textbooks, workbooks and stationery with prices, plus Pacific Bookstores ordering, delivery and self-collection dates."
    }
  ],

  /* Dated items for the Coming up page. Past items drop off automatically. */
  events: [
    {
      date: "2026-11-23",
      time: "9.00 am to 3.00 pm",
      title: "Walk-in sale of books and uniform in school",
      detail: "For P1 2027 students only. Online orders of P1 books can also be collected on this day.",
      go: "before",
      s: ["details:2", "booklist:3", "booklet:16"]
    },
    {
      date: "2026-11-26",
      time: "9.00 am to 3.00 pm",
      title: "Book self-collection for P1 to P3",
      detail: "For books ordered online from Pacific Bookstores. Collection is also open on 30 November for P1 to P3.",
      go: "before",
      s: ["booklist:3"]
    },
    {
      date: "2026-11-30",
      time: "",
      title: "Order iron-on nametags by this date for delivery in January",
      detail: "Orders in by this date reach your daughter through her Form Teacher in January 2027. Book self-collection for P1 to P3 is also open on this date.",
      go: "before",
      s: ["booklist:2", "booklist:3"]
    },
    {
      date: "2026-12-11",
      time: "",
      title: "Deadline to sign up for GIRO and Edusave standing orders",
      detail: "Sign up through the Services tab in the Parents Gateway app.",
      go: "before",
      s: ["details:3", "details:4"]
    },
    {
      date: "2026-12-12",
      time: "",
      title: "Pacific Bookstores website closes",
      detail: "Subject to slot availability, so order early.",
      go: "before",
      s: ["booklist:3", "booklet:16"]
    },
    {
      date: "2026-12-14",
      time: "",
      title: "Order iron-on nametags by this date for delivery in February",
      detail: "Orders in by this date reach your daughter through her Form Teacher in February 2027.",
      go: "before",
      s: ["booklist:2"]
    },
    {
      date: "2026-12-16",
      time: "9.00 am to 3.00 pm",
      title: "Last listed day for book self-collection",
      detail: "Open to all levels. See the full list of collection dates under Before school starts.",
      go: "before",
      s: ["booklist:3"]
    },
    {
      date: "2027-01-04",
      time: "9.00 am to 12.00 noon",
      title: "First day of school (P1 only)",
      detail: "Arrive between 8.45 am and 8.55 am. Parents are encouraged to bring their daughter and stay for the Parent Engagement Session.",
      go: "weeks",
      s: ["booklet:2", "booklet:3", "slides:43"]
    },
    {
      date: "2027-01-05",
      endDate: "2027-01-15",
      time: "Dismissal at 1.20 pm",
      title: "P1 early dismissal",
      detail: "From Tuesday 5 January, school runs from 7.25 am. P1 is dismissed at 1.20 pm until 15 January to ease parent traffic. Your daughter's class timetable arrives by 5 January.",
      go: "weeks",
      s: ["slides:46", "booklet:9", "booklet:10"]
    },
    {
      date: "2027-01-05",
      endDate: "2027-01-07",
      time: "At recess",
      title: "P4 buddy looks after your daughter at recess",
      detail: "Tuesday to Thursday, three school days.",
      go: "weeks",
      s: ["booklet:9", "slides:46"]
    },
    {
      date: "2027-01-08",
      time: "",
      title: "From this date, pack the school bag by the class timetable",
      detail: "Friday 8 January onwards.",
      go: "weeks",
      s: ["booklet:10"]
    },
    {
      date: "2027-03-12",
      time: "",
      title: "Term 1 ends",
      detail: "Last day of Term 1.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-03-13",
      endDate: "2027-03-21",
      time: "",
      title: "March school holidays",
      detail: "Term 2 starts on Monday 22 March.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-03-22",
      time: "",
      title: "Term 2 starts",
      detail: "",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-05-28",
      time: "",
      title: "Term 2 ends",
      detail: "Last day of Term 2.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-05-29",
      endDate: "2027-06-27",
      time: "",
      title: "June school holidays",
      detail: "Term 3 starts on Monday 28 June.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-06-28",
      time: "",
      title: "Term 3 starts",
      detail: "",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-07-05",
      time: "",
      title: "School holiday (Youth Day)",
      detail: "Youth Day falls on Sunday 4 July, so Monday 5 July is a school holiday.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-08-10",
      time: "",
      title: "School holiday (day after National Day)",
      detail: "",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-09-03",
      time: "",
      title: "Term 3 ends (Teachers' Day)",
      detail: "Last day of Term 3 and a school holiday for Teachers' Day.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-09-04",
      endDate: "2027-09-12",
      time: "",
      title: "September school holidays",
      detail: "Term 4 starts on Monday 13 September.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-09-13",
      time: "",
      title: "Term 4 starts",
      detail: "",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-10-08",
      time: "",
      title: "School holiday (Children's Day)",
      detail: "Primary schools only.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-11-19",
      time: "",
      title: "Term 4 ends",
      detail: "Last day of the 2027 school year.",
      go: "life",
      s: ["moe:2027"]
    },
    {
      date: "2027-11-20",
      endDate: "2027-12-31",
      time: "",
      title: "Year-end school holidays",
      detail: "",
      go: "life",
      s: ["moe:2027"]
    }
  ],

  keyTimes: [
    { label: "Arrive", value: "7.00 to 7.25 am", s: ["booklet:9"] },
    { label: "Lessons begin", value: "7.40 am", s: ["booklet:4"] },
    { label: "P1 recess", value: "9.40 to 10.10 am", s: ["booklet:4"] },
    { label: "Dismissal", value: "1.30 pm (P1: 1.20 pm until 15 Jan)", s: ["booklet:4", "slides:46"] }
  ],

  /* ---------- FIRST WEEKS ---------- */
  weeks: {
    intro: "A short run of days where the routine is different. Parents may only come into school on the first day.",
    timeline: [
      {
        id: "d0104",
        from: "2027-01-04",
        to: "2027-01-04",
        label: "Mon 4 Jan",
        title: "First day of school",
        items: [
          { t: "Only P1 students report to school. Hours are 9.00 am to 12.00 noon.", s: ["booklet:2", "booklet:3", "slides:43"] },
          { t: "Arrive between 8.45 am and 8.55 am.", s: ["booklet:3", "slides:43"] },
          { t: "Enter by St Raphael Gate or St Michael Gate. Signs and teachers on duty will guide you.", s: ["booklet:3"] },
          { t: "9.00 to 11.00 am: Parent Engagement Session with the Principal and HODs. Your daughter has games, literacy and numeracy activities.", s: ["booklet:2", "slides:45"] },
          { t: "11.00 am to 12.00 noon: Parent-Daughter recess and bonding activity. You can have recess with her in the canteen or pack food for her, especially if she has a special dietary requirement.", s: ["booklet:2", "booklet:3"] },
          { t: "Everyone is dismissed at 12 noon. Parents are not allowed into the classrooms.", s: ["booklet:3", "slides:44"] },
          { t: "If she goes to the school-based Student Care (YMCA) or the one opposite the school (Morning Star) at 12 noon, the Student Care staff will take her there.", s: ["booklet:3"] },
          { t: "All girls must be in full school uniform with white school shoes and socks. Hair must be tied neatly.", s: ["slides:44"] },
          { t: "She gets a temporary plastic nametag. Be ready to fill in her dismissal pick-up point and bus number if any.", s: ["booklet:7", "booklet:8"] },
          { t: "This is the only day parents are allowed into the school during curriculum time.", s: ["booklet:3"] }
        ]
      },
      {
        id: "d0105",
        from: "2027-01-05",
        to: "2027-01-05",
        label: "Tue 5 Jan",
        title: "Term 1 Week 1 begins",
        items: [
          { t: "All P1 to P6 students report to school. Hours are 7.25 am to 1.30 pm.", s: ["booklet:9", "slides:46"] },
          { t: "Arrive only between 7.00 am and 7.25 am. Teachers or prefects lead your daughter to class. Parents do not enter the school.", s: ["booklet:9"] },
          { t: "Start It Right (orientation) programme runs in the first days.", s: ["slides:46"] },
          { t: "P1 is dismissed at 1.20 pm until 15 January. Be at the gate by 1.20 pm if collecting at St Raphael Gate or St Joan Gate.", s: ["slides:46", "booklet:9"] },
          { t: "Your daughter's class timetable arrives by today.", s: ["booklet:10"] },
          { t: "Her P4 buddy meets her at recess, today to Thursday.", s: ["booklet:9", "slides:46"] }
        ]
      },
      {
        id: "d0106",
        from: "2027-01-06",
        to: "2027-01-06",
        label: "Wed 6 Jan",
        title: "Day 3",
        items: [
          { t: "Same hours as Tuesday. 7.25 am to 1.30 pm, P1 dismissed at 1.20 pm.", s: ["booklet:9", "slides:46"] },
          { t: "P4 buddy at recess.", s: ["booklet:9"] }
        ]
      },
      {
        id: "d0107",
        from: "2027-01-07",
        to: "2027-01-07",
        label: "Thu 7 Jan",
        title: "Last day of the P4 buddy",
        items: [
          { t: "Last of the three days with a P4 buddy at recess.", s: ["booklet:9", "slides:46"] },
          { t: "From tomorrow your daughter packs her bag by her class timetable.", s: ["booklet:10"] }
        ]
      },
      {
        id: "d0108",
        from: "2027-01-08",
        to: "2027-01-14",
        label: "Fri 8 to Thu 14 Jan",
        title: "Pack by the timetable",
        items: [
          { t: "Pack the school bag according to her class timetable, with only the necessary stationery.", s: ["booklet:10", "slides:26"] },
          { t: "P1 is still dismissed at 1.20 pm.", s: ["slides:46"] },
          { t: "Keep the same dismissal mode and pick-up point each day. Avoid unnecessary or last-minute changes.", s: ["slides:40", "booklet:7"] }
        ]
      },
      {
        id: "d0115",
        from: "2027-01-15",
        to: "2027-01-15",
        label: "Fri 15 Jan",
        title: "Last day of 1.20 pm P1 dismissal",
        items: [
          { t: "P1 students are dismissed at 1.20 pm until 15 Jan. From 18 Jan, P1 dismissal is at 1.30 pm.", s: ["slides:46", "booklet:4"] },
          { t: "Girls stay in their orientation groups until the end of January, then move into their form classes.", s: ["details:1"] }
        ]
      }
    ],

    pack: {
      intro: "Tick items as you pack them. Ticks are saved on this device only.",
      groups: [
        {
          id: "pack-0104",
          label: "Mon 4 Jan, first day",
          items: [
            { id: "p0104-uniform", t: "Full school uniform with white school shoes and white socks", s: ["slides:44"] },
            { id: "p0104-water", t: "Water bottle filled with water only (no sweet drinks)", s: ["booklet:3"] },
            { id: "p0104-snack", t: "A light snack", s: ["booklet:2"] },
            { id: "p0104-pencilbox", t: "Pencil box with 2 to 3 pencils, a sharpener, an eraser and a ruler", s: ["booklet:3"] },
            { id: "p0104-colour", t: "Coloured pencils, box of 12", s: ["booklet:3"] },
            { id: "p0104-hair", t: "Hair neatly tied, with simple black, blue or white accessories", s: ["slides:44"] }
          ]
        },
        {
          id: "pack-daily",
          label: "Every school day from Tue 5 Jan",
          items: [
            { id: "pd-planner", t: "SACPS Student Planner", s: ["booklet:9"] },
            { id: "pd-pencilbox", t: "Pencil box and coloured pencils (box of 12)", s: ["booklet:9"] },
            { id: "pd-water", t: "Water bottle filled with water only", s: ["booklet:9"] },
            { id: "pd-snack", t: "A dry, easy-to-eat snack for the 10-minute snack break in class (for example fruit or a sandwich)", s: ["booklet:4", "booklet:9"] },
            { id: "pd-folder", t: "SACPS Homework Folder (transparent L-shaped file labelled with her name and class)", s: ["booklet:9"] },
            { id: "pd-story", t: "A storybook for silent reading", s: ["booklet:4", "booklet:12"] },
            { id: "pd-money", t: "Packed recess food or pocket money in a labelled purse ($3.00 to $4.00 suggested)", s: ["booklet:9", "booklet:21"] },
            { id: "pd-hair", t: "Spare hair accessories (white, blue or black)", s: ["booklet:13"] },
            { id: "pd-tag", t: "Temporary nametag worn daily for one month, with the dismissal pick-up point and bus number written on it", s: ["booklet:7", "booklet:8"] },
            { id: "pd-label", t: "Everything labelled with her name and class, including both shoes", s: ["booklet:10", "booklet:22"] }
          ]
        },
        {
          id: "pack-0105",
          label: "Tue 5 Jan",
          items: [
            { id: "p0105-1", t: "Maths Textbook 1A", s: ["booklet:10"] },
            { id: "p0105-2", t: "Maths Activity Book 1A (also called Practice Book 1A)", s: ["booklet:10", "booklist:1"] },
            { id: "p0105-3", t: "English File (pink) and 1 packet of sheet protectors (10 pieces)", s: ["booklet:10"] },
            { id: "p0105-4", t: "Maths File (blue) and 1 packet of sheet protectors (10 pieces)", s: ["booklet:10"] },
            { id: "p0105-5", t: "Jotter book with lines (for English lessons)", s: ["booklet:10"] }
          ]
        },
        {
          id: "pack-0106",
          label: "Wed 6 Jan",
          items: [
            { id: "p0106-1", t: "Mother Tongue Textbook 1A", s: ["booklet:10"] },
            { id: "p0106-2", t: "Mother Tongue Activity Book 1A", s: ["booklet:10"] },
            { id: "p0106-3", t: "Mother Tongue Writing Exercise Book 1A (Chinese)", s: ["booklet:10"] },
            { id: "p0106-4", t: "CCE Activity Book", s: ["booklet:10"] },
            { id: "p0106-5", t: "Mother Tongue Language File: Chinese is purple, Malay is yellow, Tamil is orange", s: ["booklet:10"] },
            { id: "p0106-6", t: "Jotter book with lines (for Malay and Tamil students only)", s: ["booklet:10"] }
          ]
        },
        {
          id: "pack-0107",
          label: "Thu 7 Jan",
          items: [
            { id: "p0107-1", t: "P1 Character and Citizenship Education (Form Teacher Guidance Period) book", s: ["booklet:10"] },
            { id: "p0107-2", t: "Social Studies Activity Book", s: ["booklet:10"] },
            { id: "p0107-3", t: "My Physical Education Journal P1", s: ["booklet:10"] },
            { id: "p0107-4", t: "A4 Art Journal", s: ["booklet:10"] },
            { id: "p0107-5", t: "SACPS Report Book", s: ["booklet:10"] },
            { id: "p0107-6", t: "Plastic hard-card case, whiteboard marker and whiteboard eraser", s: ["booklet:10"] }
          ]
        }
      ],
      after: "From Friday 8 January, pack by the class timetable. Girls remove their shoes in special rooms for Music and PAL lessons, so label the soles or the inside of both shoes."
    },

    extras: [
      {
        k: "accordion",
        title: "Temporary nametag",
        blocks: [
          { k: "ul", items: [
            { t: "A temporary plastic nametag is given on the first day. Staff use it to see her class, her school bus and the gate she goes to at dismissal.", s: ["booklet:8"] },
            { t: "She wears it daily for one month.", s: ["booklet:8"] },
            { t: "Write the dismissal pick-up point on it. If she takes a school bus, write the bus number (for example SACPS 13).", s: ["booklet:7", "booklet:9"] },
            { t: "Form teachers paste coloured stickers on it as visual cues for staff.", s: ["booklet:8"] },
            { t: "If she meets an older sibling, remind her to meet in the canteen by the piano.", s: ["booklet:8"] }
          ] }
        ]
      },
      {
        k: "accordion",
        title: "Class timetable acronyms",
        blocks: [
          { k: "table", head: ["Subject", "Short form"], rows: [
            ["English Language", "EL"],
            ["Mathematics", "MA"],
            ["Mother Tongue (Chinese, Malay or Tamil)", "CL / ML / TL"],
            ["Physical Education", "PE"],
            ["Form Teacher Guidance Period", "FTGP"],
            ["Visual Art", "ART"],
            ["Music", "MU"],
            ["Pastoral Care", "PC"],
            ["Programme for Active Learning", "PAL"],
            ["Social Studies", "SS"],
            ["Canossians Connect", "CC"]
          ], s: ["booklet:11"] },
          { k: "p", t: "Science starts from P3. FTGP and CC lessons build teacher-student and student-student relationships and social and emotional skills.", s: ["booklet:11"] }
        ]
      }
    ]
  },

  /* ---------- BEFORE SCHOOL STARTS ---------- */
  before: {
    intro: "One-off jobs, roughly in date order. Dates are in Singapore time.",
    steps: [
      {
        id: "pg",
        title: "Set up Parents Gateway",
        when: "Before school starts",
        blocks: [
          { k: "ul", items: [
            { t: "Parents Gateway (PG) is the one-stop MOE and GovTech app for school announcements and online consent forms. It is on the Apple App Store and Google Play.", s: ["booklet:19", "slides:49"] },
            { t: "After logging in, check that you can see your child's initials on the Home screen, and turn on notification alerts.", s: ["slides:49"] },
            { t: "You also need PG for the GIRO and Edusave sign-up, for the termly Parents' Connection newsletter, and for submitting medical certificates.", s: ["details:4", "booklet:19", "booklet:12"] }
          ] }
        ]
      },
      {
        id: "books",
        title: "Order books and stationery",
        when: "Website open from 11 Nov, closes 12 Dec",
        deadline: "2026-12-12",
        blocks: [
          { k: "ul", items: [
            { t: "The school bookshop is run by Pacific Bookstores Pte Ltd. Order online at pacificbookstores.com. Register for an account first if you are a new user (top-right of the website).", s: ["details:2", "booklet:16", "booklist:3"] },
            { t: "Website opened on 11 November 2026 and closes on 12 December 2026, subject to slot availability.", s: ["booklist:3", "booklet:16"] },
            { t: "Payment is taken at order by Visa, Mastercard, debit card or PayNow.", s: ["booklist:3"] },
            { t: "Home delivery: delivery charge of $15.80 applies.", s: ["booklist:3"] },
            { t: "Self-collection in school: pre-ordering is strongly encouraged to avoid queues. See the collection dates below.", s: ["booklist:3"] },
            { t: "A one-time packaging fee applies to all orders ($0.10 for plastic or $0.90 for reusable) unless you bring your own bag.", s: ["booklist:3"] },
            { t: "Parents are strongly encouraged to buy online so that the correct edition of each book is supplied.", s: ["booklist:1"] },
            { t: "Textbooks are sold only in schools.", s: ["booklist:3"] }
          ] },
          { k: "accordion", title: "Self-collection dates (9 am to 3 pm, closed Saturday)", blocks: [
            { k: "table", head: ["Date", "Who may collect"], rows: [
              ["Mon 23 Nov 2026", "Online P1 orders only"],
              ["Thu 26 Nov 2026", "P1 to P3"],
              ["Fri 27 Nov 2026", "P4 to P6"],
              ["Mon 30 Nov 2026", "P1 to P3"],
              ["Tue 1 Dec 2026", "P4 to P6"],
              ["Wed 2 Dec 2026", "All levels"],
              ["Fri 4 Dec 2026", "All levels"],
              ["Tue 8 Dec 2026", "All levels"],
              ["Wed 9 Dec 2026", "All levels"],
              ["Fri 11 Dec 2026", "All levels"],
              ["Tue 15 Dec 2026", "All levels"],
              ["Wed 16 Dec 2026", "All levels"]
            ], s: ["booklist:3"] },
            { k: "note", t: "Pacific Bookstores operating hours on collection days are Monday to Friday 9 am to 3 pm, with lunch from 12 noon to 1 pm. Saturday is closed.", s: ["booklist:3"] }
          ] },
          { k: "note", tone: "info", t: "If you miss the walk-in day, order online and choose self-collection in school (school books only) or home delivery (school books and uniform or PE attire).", s: ["booklet:16"] },
          { k: "note", t: "Items bought are non-refundable. To exchange, go to the school bookshop within 1 week of purchase with the booklist and the official receipt. Items must be in original condition.", s: ["booklist:1"] },
          { k: "books" }
        ]
      },
      {
        id: "walkin",
        title: "Walk-in sale in school",
        when: "Mon 23 Nov 2026, 9 am to 3 pm",
        deadline: "2026-11-23",
        blocks: [
          { k: "ul", items: [
            { t: "Walk-in purchase of books and uniform is on Monday 23 November 2026, from 9.00 am to 3.00 pm, for P1 2027 students only.", s: ["details:2", "booklet:16"] },
            { t: "This is the only walk-in date.", s: ["booklet:16"] }
          ] }
        ]
      },
      {
        id: "uniform",
        title: "Buy school uniform and PE attire",
        when: "Online all year, or walk-in 23 Nov",
        blocks: [
          { k: "ul", items: [
            { t: "The uniform supplier is Magdalene Sewing Centre Pte Ltd. Order online at magdalene.com.sg (the website is available year-round) or walk in on 23 November.", s: ["details:2", "booklet:16"] },
            { t: "The school recommends 3 sets of uniform (blouse and pinafore) and 3 sets of PE attire.", s: ["booklet:16"] },
            { t: "Home delivery covers books and uniform or PE attire. Self-collection in school is for school books only.", s: ["booklet:16"] },
            { t: "Regular days: white blouse and pinafore at knee length. PE days: school PE t-shirt, school shorts and pinafore. White shoes and socks.", s: ["booklet:13"] }
          ] },
          { k: "note", t: "If you are applying for the MOE Financial Assistance Scheme (FAS), the school asks you not to buy any books or uniform. Apply and wait for MOE or the school to tell you the outcome.", s: ["details:2"] }
        ]
      },
      {
        id: "nametags",
        title: "Order iron-on nametags",
        when: "30 Nov for January, 14 Dec for February",
        deadlines: ["2026-11-30", "2026-12-14"],
        blocks: [
          { k: "ul", items: [
            { t: "SACPS iron-on nametags come in a set of 5 for $6.60. They are ordered from Pacific Bookstores.", s: ["booklist:2", "details:2"] },
            { t: "The school recommends at least 5 pieces, for the pinafore and the PE t-shirt.", s: ["details:2"] },
            { t: "Order by 30 November 2026 and your daughter receives them from her Form Teacher in January 2027.", s: ["booklist:2"] },
            { t: "Order by 14 December 2026 and she receives them from her Form Teacher in February 2027.", s: ["booklist:2"] },
            { t: "The nametag goes below the badge on the pinafore and the PE t-shirt.", s: ["slides:51"] }
          ] }
        ]
      },
      {
        id: "giro",
        title: "Set up GIRO and Edusave standing orders",
        when: "By Fri 11 Dec 2026",
        deadline: "2026-12-11",
        blocks: [
          { k: "ul", items: [
            { t: "Sign up in the Parents Gateway app under the Services tab. It sends you to the right application page.", s: ["details:3", "details:4", "details:5"] },
            { t: "Singapore Citizen students get an Edusave account and a yearly contribution automatically. The Edusave standing order lets you use Edusave funds for miscellaneous fees and enrichment programmes.", s: ["details:4"] },
            { t: "The school strongly encourages all parents to join the MOE GIRO scheme. It covers school charges that Edusave cannot be used for, and enrichment programmes when Edusave funds run short. It also helps with refunds and disbursements.", s: ["details:4"] },
            { t: "Non-Singapore Citizen students: GIRO standing order only.", s: ["details:5"] },
            { t: "If you already submitted a GIRO application earlier, do not submit another.", s: ["details:4", "details:5"] },
            { t: "Parents with no access to online forms can ask the school for help.", s: ["details:3"] }
          ] },
          { k: "accordion", title: "Banks that support eGIRO", blocks: [
            { k: "ul", items: [
              { t: "Bank of China (BOC), CIMB, Citibank Singapore, DBS and POSB, ICBC (use the 11-digit account number), OCBC, Standard Chartered (SCB), HSBC, MariBank, UOB.", s: ["details:4", "details:5"] },
              { t: "Maybank (MAY) is also supported for Singapore Citizen students but not for non-Singapore Citizen students.", s: ["details:4", "details:5"] }
            ] },
            { k: "p", t: "Joint accounts with 2 signatories, corporate accounts, OCBC joint accounts and accounts from banks not listed may ask the school for a hardcopy GIRO form. Trust Bank accounts cannot be used for GIRO. For Singapore Citizen students, all applications using Child Development Account (CDA) and other hardcopy GIRO application forms will be rejected. For non-Singapore Citizen students, all other hardcopy GIRO application forms will be rejected.", s: ["details:4", "details:5"] }
          ] },
          { k: "links", items: [
            { label: "MOE Report to School page", url: "https://www.moe.gov.sg/primary/p1-registration/report-to-school", s: ["details:3"] }
          ] }
        ]
      },
      {
        id: "fas",
        title: "MOE Financial Assistance Scheme (FAS)",
        when: "Only if you are applying",
        blocks: [
          { k: "ul", items: [
            { t: "Apply through the MOE Student Finance Scheme page. Do not buy books or uniform while an application is pending.", s: ["details:2"] }
          ] },
          { k: "links", items: [
            { label: "MOE Student Finance Scheme page", url: "https://studentfinance.moe.gov.sg/sfs", s: ["details:2"] }
          ] }
        ]
      },
      {
        id: "dismissal-choice",
        title: "Choose a dismissal mode and pick-up point",
        when: "Before 4 Jan",
        blocks: [
          { k: "ul", items: [
            { t: "Decide how your daughter goes home and write the pick-up point on her temporary nametag. Keep it consistent.", s: ["booklet:7", "slides:40"] },
            { t: "Please do not make unnecessary or last-minute changes.", s: ["slides:40"] },
            { t: "See School life for every pick-up point, gate time and the school bus areas.", s: ["booklet:7"] }
          ] }
        ]
      },
      {
        id: "prep",
        title: "Label things and practise independence",
        when: "Any time before term",
        blocks: [
          { k: "ul", items: [
            { t: "Label pinafore, shoes, water bottle, snack boxes, planner, files and stationery with her name and class.", s: ["booklet:22"] },
            { t: "Write her name on the soles or inside both shoes. She takes her shoes off before entering special rooms.", s: ["booklet:22"] },
            { t: "Practise: putting on and removing the pinafore and shoes, using the toilet and managing hygiene, tying her own hair and shoelaces.", s: ["booklet:22"] },
            { t: "Other skills the school suggests: packing her own bag, buying food and managing money, knowing her full name, class and teachers, and asking an adult for help.", s: ["slides:26", "slides:59"] },
            { t: "Aim for a steady pre-bedtime routine and at least 9 hours of sleep.", s: ["slides:26"] },
            { t: "Optional: sign up for a free NLB library membership and myLibrary ID.", s: ["slides:24"] }
          ] },
          { k: "links", items: [
            { label: "NLB mobile app and myLibrary ID (go.gov.sg)", url: "https://go.gov.sg/nlb-mobile", s: ["slides:24"] },
            { label: "First week of school schoolbag guide (go.gov.sg)", url: "https://go.gov.sg/ace-first-week-of-school-schoolbag", s: ["slides:25"] }
          ] }
        ]
      }
    ]
  },

  /* ---------- BOOKLIST (rendered by the "books" block) ---------- */
  booklist: {
    note: "Prices include GST. They may change, so check the Pacific Bookstores website when you order. An asterisk (*) means this is the final year MOE uses the book.",
    s: ["booklist:1"],
    common: [
      { name: "English Language", items: [
        { t: "No English textbook or workbook to be purchased. A set of SACPS worksheets is printed in-house.", p: 0 }
      ] },
      { name: "Mathematics", items: [
        { t: "Primary Mathematics Textbook 1A (Star Pub)", p: 4.80 },
        { t: "Primary Mathematics Textbook 1B (Star Pub)", p: 4.60 },
        { t: "Primary Mathematics Practice Book 1A (Star Pub)", p: 5.20 },
        { t: "Primary Mathematics Practice Book 1B (Star Pub)", p: 4.75 }
      ], total: 19.35 },
      { name: "Social Studies", items: [
        { t: "Social Studies Primary 1 Activity Book * (Marshall C)", p: 2.00 }
      ], total: 2.00 },
      { name: "Physical Education", items: [
        { t: "My Physical Education Journal P1 (Marshall C)", p: 2.60 }
      ], total: 2.60 },
      { name: "FTGP", items: [
        { t: "Character and Citizenship Education (Form Teacher Guidance Period) P1 (Marshall C)", p: 3.15 }
      ], total: 3.15 }
    ],
    mt: [
      {
        id: "cl",
        name: "Chinese Language (CL)",
        total: 85.20,
        items: [
          { t: "Chinese Language For Pri Schools (欢乐伙伴2.0) Textbook P1A", p: 4.10 },
          { t: "Chinese Language For Pri Schools (欢乐伙伴2.0) Textbook P1B", p: 3.60 },
          { t: "Chinese Language For Pri Schools (欢乐伙伴2.0) Activity Book P1A", p: 3.90 },
          { t: "Chinese Language For Pri Schools (欢乐伙伴2.0) Activity Book P1B", p: 3.70 },
          { t: "Chinese Language For Pri Schools (欢乐伙伴2.0) Writing Exercise Book P1A", p: 2.00 },
          { t: "Chinese Language For Pri Schools (欢乐伙伴2.0) Writing Exercise Book P1B", p: 2.00 },
          { t: "Chinese Language / Higher Chinese (欢乐伙伴2.0) Character Cards P1A (Small)", p: 8.10 },
          { t: "Chinese Language / Higher Chinese (欢乐伙伴2.0) Character Cards P1B (Small)", p: 8.70 },
          { t: "Chinese Language / Higher Chinese Supplementary Readers and Reading Passport Bundle P1A (Book 1 to 14)", p: 24.55 },
          { t: "Chinese Language / Higher Chinese Supplementary Readers and Reading Passport Bundle P1B (Book 15 to 28)", p: 24.55 }
        ],
        cce: { t: "Character and Citizenship Education P1 (Chinese) (Star Pub)", p: 5.45 },
        stationery: [
          { t: "SACPS T82D Subject File (Purple) - Chinese", q: 1, p: 4.20 }
        ],
        stationeryTotal: 4.20
      },
      {
        id: "ml",
        name: "Malay Language (ML)",
        total: 25.50,
        items: [
          { t: "Malay Language For Pri Schools (Cita) Textbook P1A", p: 3.10 },
          { t: "Malay Language For Pri Schools (Cita) Textbook P1B", p: 3.10 },
          { t: "Malay Language For Pri Schools (Cita) Activity Book P1A", p: 2.55 },
          { t: "Malay Language For Pri Schools (Cita) Activity Book P1B", p: 2.55 },
          { t: "Malay Language For Pri Schools (Cita) Small Reader and Reading Passport Bundle P1A (Book 1 to 4)", p: 7.10 },
          { t: "Malay Language For Pri Schools (Cita) Small Reader and Reading Passport Bundle P1B (Book 5 to 8)", p: 7.10 }
        ],
        cce: { t: "Character and Citizenship Education P1 (Malay) (Star Pub)", p: 5.45 },
        stationery: [
          { t: "SACPS Jotter Book with Line", q: 2, p: 1.00 },
          { t: "SACPS T82D Subject File (Yellow) - Malay", q: 1, p: 4.20 }
        ],
        stationeryTotal: 6.20
      },
      {
        id: "tl",
        name: "Tamil Language (TL)",
        total: 36.50,
        items: [
          { t: "Tamil Language For Pri Schools (Inbathamizh) Penmanship P1A", p: 2.55 },
          { t: "Tamil Language For Pri Schools (Inbathamizh) Penmanship P1B", p: 2.55 },
          { t: "Tamil Language For Pri Schools (Inbathamizh) Textbook P1A", p: 4.15 },
          { t: "Tamil Language For Pri Schools (Inbathamizh) Textbook P1B", p: 4.25 },
          { t: "Tamil Language For Pri Schools (Inbathamizh) Activity Book P1A", p: 4.15 },
          { t: "Tamil Language For Pri Schools (Inbathamizh) Activity Book P1B", p: 4.15 },
          { t: "Tamil Language For Pri Schools (Inbathamizh) Student Reader and Reading Passport Bundle P1A (Book 1 to 3)", p: 7.35 },
          { t: "Tamil Language For Pri Schools (Inbathamizh) Student Reader and Reading Passport Bundle P1B (Book 1 to 3)", p: 7.35 }
        ],
        cce: { t: "Character and Citizenship Education P1 (Tamil) (Star Pub)", p: 5.45 },
        stationery: [
          { t: "SACPS Jotter Book with Line", q: 2, p: 1.00 },
          { t: "SACPS T82D Subject File (Orange) - Tamil", q: 1, p: 4.20 }
        ],
        stationeryTotal: 6.20
      },
      {
        id: "el",
        name: "Exempted from Mother Tongue, or taking NTIL or a Foreign Language",
        total: 0,
        items: [],
        cce: { t: "Character and Citizenship Education P1 (English) (Star Pub)", p: 5.45 },
        stationery: [],
        stationeryTotal: 0
      }
    ],
    stationeryCommon: [
      { t: "SACPS Jotter Book with Line (EL)", q: 2, p: 1.00 },
      { t: "SACPS T82D Subject File (Pink) - English (EL)", q: 1, p: 4.20 },
      { t: "SACPS T82D Subject File (Blue) - Mathematics (MATH)", q: 1, p: 4.20 },
      { t: "A4 11-Hole Sheet Protector 10's (EL)", q: 1, p: 1.40 },
      { t: "A4 11-Hole Sheet Protector 10's (MATH)", q: 1, p: 1.40 },
      { t: "SACPS L-Shape Folder - Homework", q: 2, p: 1.20 },
      { t: "SACPS A4 Report Book (compulsory)", q: 1, p: 11.00 },
      { t: "Deli Glue Stick 15G (pack of 2)", q: 1, p: 1.90 },
      { t: "Pentel Maxiflo Whiteboard Marker Bullet Black", q: 1, p: 1.60 },
      { t: "Deli White Board Eraser", q: 1, p: 1.30 },
      { t: "A4 Hard Card Case (in lieu of whiteboard)", q: 1, p: 1.80 },
      { t: "SACPS Iron-on Name Tags (set of 5)", q: 1, p: 6.60 }
    ],
    stationeryCommonTotal: 39.80,
    art: [
      { t: "SACPS A4 Art Journal", q: 1, p: 3.50 },
      { t: "Apron (Maroon)", q: 1, p: 6.90 },
      { t: "Staedtler Noris Club Dual Tip Magic Pen, 12 colours (usual price $6.20)", q: 1, p: 5.20 }
    ],
    artTotal: 15.60,
    optional: [
      { t: "Pilot Rexgrip mechanical pencil with free 2X lead", q: 1, p: 1.65 },
      { t: "Deli U001 Whiteboard Marker, 4 colour set (usual price $4.00)", q: 1, p: 3.00 },
      { t: "Staedtler Luna Permanent Colour Pencil (free 2B pencil, sharpener and eraser)", q: 1, p: 7.60 },
      { t: "Staedtler Luna Brite Highlighter, 4 pack", q: 1, p: 4.50 },
      { t: "PP Book Cover 79 (small reader cover)", q: 4, p: 0.80 },
      { t: "PP Jotter Book Cover", q: 2, p: 0.90 },
      { t: "PP Book Cover 118 A4 (A4 single-line exercise book)", q: 2, p: 0.90 },
      { t: "PVC Book Wrapper Roll 13.5 inch x 10 m", q: 1, p: 6.00 },
      { t: "Textbook and Workbook Cover Set for Primary 1/2", q: 1, p: 12.00 }
    ],
    optionalTotal: 41.55
  },

  /* ---------- SCHOOL LIFE ---------- */
  life: {
    intro: "Long-term reference for how a normal school day works.",
    sections: [
      {
        title: "School day and hours",
        blocks: [
          { k: "table", head: ["Time", "What happens"], rows: [
            ["6.45 am", "Gates open (see Gates and arrival)"],
            ["7.00 to 7.25 am", "Arrival in school. Gather at the School Hall. Bring a storybook daily."],
            ["7.25 to 7.40 am", "Centering, prayers and announcements, national anthem and pledge, Form Teacher time"],
            ["7.40 am", "Lessons begin"],
            ["9.40 to 10.10 am", "Primary 1 recess (30 minutes)"],
            ["10.10 am to 1.30 pm", "Lessons, with a 10-minute snack break in class between 12.00 and 12.30 pm"],
            ["1.30 pm", "Dismissal. P1 is dismissed at 1.30 pm from 18 Jan (1.20 pm until 15 Jan). Staggered dismissals begin at 1.30 pm."],
            ["6.00 pm", "School closes every day"]
          ], s: ["booklet:4", "slides:32"] },
          { k: "note", t: "Students must be seated at the assembly area by 7.25 am. Flag raising is at 7.30 am.", s: ["slides:32", "booklet:4"] },
          { k: "p", t: "SACPS is a single-session school. About 1,200 girls arrive between 7.00 and 7.25 am and leave at staggered times in the afternoon. The secondary school next door has about another 1,200 girls arriving in the morning. The school asks for patience and graciousness at all times.", s: ["slides:33"] }
        ]
      },
      {
        title: "2027 school terms and holidays",
        blocks: [
          { k: "table", head: ["Term", "Dates"], rows: [
            ["Term 1", "Mon 4 Jan to Fri 12 Mar 2027"],
            ["Term 2", "Mon 22 Mar to Fri 28 May 2027"],
            ["Term 3", "Mon 28 Jun to Fri 3 Sep 2027"],
            ["Term 4", "Mon 13 Sep to Fri 19 Nov 2027"]
          ], s: ["moe:2027"] },
          { k: "table", head: ["School holidays", "Dates"], rows: [
            ["March holidays", "Sat 13 Mar to Sun 21 Mar"],
            ["June holidays", "Sat 29 May to Sun 27 Jun"],
            ["September holidays", "Sat 4 Sep to Sun 12 Sep"],
            ["Year-end holidays", "Sat 20 Nov to Fri 31 Dec"]
          ], s: ["moe:2027"] },
          { k: "ul", items: [
            { t: "Extra school holidays: Mon 5 Jul (Youth Day falls on Sunday, so the next day is a holiday), Tue 10 Aug (day after National Day), Fri 3 Sep (Teachers' Day) and Fri 8 Oct (Children's Day, for primary schools).", s: ["moe:2027"] },
            { t: "Also no school on Mon 8 Feb (Chinese New Year), Tue 9 Feb (day off), Mon 3 May (day off) and Mon 27 Dec (day off).", s: ["moe:2027"] },
            { t: "Primary 1 starts on Mon 4 Jan 2027. Primary 2 to 6 start on Tue 5 Jan.", s: ["moe:2027"] }
          ] },
          { k: "links", items: [
            { label: "MOE: school terms and holidays for 2027", url: "https://www.moe.gov.sg/news/press-releases/20260714-school-terms-and-holidays-for-2027" }
          ] }
        ]
      },
      {
        title: "Gates and arrival",
        blocks: [
          { k: "table", head: ["Gate", "For", "Arrival", "Dismissal"], rows: [
            ["St Gabriel Gate (Bedok North Ave 4)", "Vehicles only, in-gate", "Mon to Fri 6.45 to 7.30 am (7.35 am in wet weather)", "Mon to Fri 1.50 to 2.15 pm (cars enter only after school buses leave)"],
            ["St Michael Gate (Bedok North Ave 4)", "Vehicles out-gate, plus walk-in for students and visitors", "Vehicles Mon to Fri 6.45 to 7.30 am (7.35 am in wet weather)", "Vehicles Mon to Fri 1.50 to 2.15 pm (exit only after school buses leave)"],
            ["St Michael Gate, walk-in", "Students and visitors", "6.45 am to 6.00 pm, except during dismissal 1.20 to 1.50 pm", "Same"],
            ["St Raphael Gate (HDB drop-off gate)", "Students only", "Mon to Fri 6.45 to 7.30 am", "Mon to Fri 1.30 to 2.15 pm"],
            ["St Joan Gate (gate at the bus stop in front of school)", "Students only", "Mon to Fri 6.45 to 7.30 am", "Mon to Fri 1.30 to 2.15 pm"]
          ], s: ["booklet:5", "slides:34"] },
          { k: "ul", items: [
            { t: "St Raphael Gate: parents can drop students off at the car park next to HDB blocks 98 to 100.", s: ["booklet:5", "slides:34"] },
            { t: "St Joan Gate is the gate at the bus stop in front of the school. Students taking SBS bus services 17, 17A and 18 use it at arrival and dismissal. This gate belongs to the secondary school.", s: ["booklet:5", "slides:34"] },
            { t: "St Raphael Gate and St Gabriel Gate close at 7.30 am.", s: ["booklet:4"] },
            { t: "Parents do not enter the school with their daughter on normal days. Teachers or prefects lead her to class.", s: ["booklet:9"] },
            { t: "A video of the gates is on the school website under For Parents, then Useful videos.", s: ["slides:39", "booklet:7"] }
          ] },
          { k: "accordion", title: "Driving and parking", blocks: [
            { k: "ul", items: [
              { t: "No parking inside the school grounds. Park at the HDB car parks at blocks 98 to 100, or at blocks 94 to 96 across the road.", s: ["booklet:17", "details:2"] },
              { t: "Keep to 15 km/h on school premises and do not speed in the school zone.", s: ["slides:42"] },
              { t: "Have your daughter ready to get out of the car quickly. At the Guardian Angel Bay drop-off area, move forward as far as possible.", s: ["slides:42", "slides:47"] }
            ] }
          ] }
        ]
      },
      {
        title: "Dismissal and pick-up points",
        blocks: [
          { k: "ul", items: [
            { t: "P1 students are led to their school buses and dismissal points for the first two weeks.", s: ["slides:40"] },
            { t: "Write her daily mode of dismissal and pick-up point on the temporary nametag. Keep it consistent and teach her the name of the pick-up point.", s: ["slides:40", "booklet:7"] },
            { t: "If anything changes unexpectedly, contact the school before 11.00 am.", s: ["booklet:7"] },
            { t: "Be patient. Dismissal takes longer in the first few weeks, especially on rainy days.", s: ["slides:47"] }
          ] },
          { k: "table", head: ["Mode", "Where"], rows: [
            ["School bus", "Bus Bay. Bus drivers lead her to the bus. Make sure the bus number (for example SACPS 13) is on her nametag."],
            ["Parent drives and collects at the gate", "St Raphael Gate. Arrive by 1.20 pm."],
            ["Walks home", "St Raphael Gate, or St Michael Gate if she needs to cross the road at the traffic light"],
            ["Public bus from the stop in front of school", "St Joan Gate"],
            ["Public bus from the stop opposite the school", "St Michael Gate"],
            ["Parent drives into school", "Guardian Angel Bay by the canteen. Enter through St Gabriel Gate and exit through St Michael Gate. Cars may enter only after all school buses have left (about 1.45 pm)."],
            ["School-based student care (YMCA)", "Students walk to the YMCA centre."],
            ["Student care opposite the school (Morning Star)", "Students meet the Morning Star officers at the main foyer next to the General Office. The officers lead them across the road."]
          ], s: ["booklet:7", "booklet:9", "slides:40"] }
        ]
      },
      {
        title: "Uniform, PE attire and appearance",
        blocks: [
          { k: "ul", items: [
            { t: "Students must enter and leave school in a pinafore with either a blouse or the school PE t-shirt.", s: ["booklet:13"] },
            { t: "Regular days: white blouse and pinafore at knee length.", s: ["booklet:13"] },
            { t: "PE days: school PE t-shirt, school shorts and pinafore.", s: ["booklet:13"] },
            { t: "Footwear: white shoes and socks. White socks without 'SACPS' on them are acceptable.", s: ["booklet:13"] },
            { t: "Hair must be neat. Short hair stays above the collar. Long hair, or any hair reaching below chin level, is tied up.", s: ["booklet:13", "slides:51"] },
            { t: "Hair accessories are simple and only white, blue or black. Long fringes are held back with a hairband or clips. Bring spare accessories.", s: ["booklet:13", "slides:51"] },
            { t: "Sew or iron on her name tag below the badge on the pinafore and PE t-shirt.", s: ["slides:51", "booklist:2"] }
          ] }
        ]
      },
      {
        title: "Recess, snacks and canteen",
        blocks: [
          { k: "ul", items: [
            { t: "P1 recess is 30 minutes, from 9.40 to 10.10 am, in the canteen.", s: ["booklet:4", "booklet:9"] },
            { t: "A 10-minute snack break happens in class between 12.00 and 12.30 pm. Pack a healthy, easy-to-eat, dry snack such as fruit or a sandwich.", s: ["booklet:4"] },
            { t: "Students may not go to the canteen during the snack break.", s: ["booklet:4"] },
            { t: "You can pack food for recess or give her money to buy food.", s: ["booklet:9"] },
            { t: "The canteen offers halal and non-halal options. Menus and prices are on the school website. Food prices range from $0.50 to $2.50.", s: ["booklet:20"] },
            { t: "Choose what works, not what costs more. Light, practical, easy-to-use items are enough.", s: ["slides:52"] },
            { t: "Bring water in the bottle, with no sweet drinks.", s: ["booklet:9"] }
          ] }
        ]
      },
      {
        title: "Pocket money and POSB Smart Buddy",
        blocks: [
          { k: "ul", items: [
            { t: "Keep pocket money to a minimum. $3.00 to $4.00 per day is suggested. Teach her to count money and receive change.", s: ["booklet:21", "slides:56"] },
            { t: "Her purse must be labelled with her name and class and small enough to fit in her pocket.", s: ["booklet:21", "slides:56"] },
            { t: "Canteen stalls have POSB Smart Buddy terminals for students with the Smart Buddy Watch or a stored-value Student Concession Card.", s: ["booklet:21", "slides:56"] },
            { t: "Using the POSB Smart Buddy Watch is not compulsory.", s: ["booklet:21", "slides:56"] }
          ] }
        ]
      },
      {
        title: "Attendance, health and safety",
        blocks: [
          { k: "ul", items: [
            { t: "Attendance is compulsory on all school days, events and activities. Be in school by 7.25 am. If she is late, still send her.", s: ["booklet:12"] },
            { t: "Do not take her on holidays or leave the country during term time.", s: ["booklet:12", "slides:50"] },
            { t: "If she is unwell, keep her at home and see a doctor. Submit the Medical Certificate through Parents Gateway so her Form Teachers know.", s: ["booklet:12", "slides:50"] },
            { t: "Staff do not give any medication, oral or otherwise, in line with MOE guidelines.", s: ["booklet:12", "slides:50"] },
            { t: "Subject teachers keep the work she missed and guide her when she returns.", s: ["booklet:12"] },
            { t: "If she becomes unwell at school, the school calls you. Report to the security post first, then go to the General Office. If you drive, you are allowed into the school compound to collect her.", s: ["booklet:18"] },
            { t: "MOE provides Group Personal Accident insurance at no cost. It covers her in school, at school activities wherever they are, and while commuting between home and school.", s: ["booklet:17"] },
            { t: "School dental clinic is run by the Health Promotion Board (HPB). Call 9111 0760 to book an appointment.", s: ["booklet:18"] }
          ] }
        ]
      },
      {
        title: "Visitors and security",
        blocks: [
          { k: "ul", items: [
            { t: "Parents are not allowed into the school without a prior appointment.", s: ["booklet:17"] },
            { t: "For an appointment with a teacher or staff, enter only through St Michael Gate and sign in at the security post. The teacher or staff meets you there. Do not go to the classroom.", s: ["booklet:17"] },
            { t: "Expect security screening when you visit or drop her off at the gates.", s: ["booklet:17"] },
            { t: "If she forgets books or items, do not make a special trip. Office staff will not accept items from parents. For urgent items, her teachers will contact you.", s: ["booklet:18"] },
            { t: "Do not send birthday cakes, food or goodie bags to school, for the safety of students with food allergies and dietary restrictions.", s: ["booklet:18"] }
          ] }
        ]
      },
      {
        title: "Devices",
        blocks: [
          { k: "ul", items: [
            { t: "Personal digital devices, including smartphones and smartwatches, are not encouraged during school hours, including recess, CCA and after-school programmes.", s: ["slides:55"] },
            { t: "A student who needs to bring one must seek permission and keep it in her school bag, powered off, before school starts.", s: ["slides:55"] },
            { t: "She is responsible for keeping the device safe.", s: ["slides:55"] },
            { t: "Devices may be used only at dismissal points, to contact parents or guardians after school hours.", s: ["slides:55"] }
          ] }
        ]
      },
      {
        title: "Learning and assessment in P1",
        blocks: [
          { k: "ul", items: [
            { t: "No weighted assessments at Primary 1 and 2.", s: ["slides:18"] },
            { t: "No mid-year exams for all levels, and no end-of-year exams until the end of Primary 3.", s: ["slides:18"] },
            { t: "Assessment is for learning, through bite-size review quizzes or tasks and qualitative feedback for improvement.", s: ["slides:18"] },
            { t: "P1 focus: building literacy and numeracy foundations, soft skills and self-help skills, learning dispositions such as curiosity and confidence, and age-appropriate digital literacy.", s: ["slides:16"] },
            { t: "The school's aims for P1 students: settle in with confidence, build friendships and teamwork, develop positive learning habits and independence, enjoy school and feel safe, and grow at their own pace.", s: ["slides:19"] },
            { t: "Subjects in the class timetable are listed under First weeks.", s: ["booklet:11"] }
          ] },
          { k: "accordion", title: "What most children are expected to bring to P1", blocks: [
            { k: "ul", items: [
              { t: "English: listen and speak for enjoyment, read with enjoyment, and communicate ideas using writing, symbols or letter-like shapes.", s: ["slides:17"] },
              { t: "Mathematics: basic understanding of numbers up to 10, comparing quantities within 10, recognising simple patterns.", s: ["slides:17"] },
              { t: "Mother Tongue: enjoy and show interest in learning, listening and speaking, with awareness of local ethnic culture.", s: ["slides:17"] },
              { t: "Values and social-emotional skills: understand self, manage behaviour, build caring relationships and take responsibility for actions.", s: ["slides:17"] },
              { t: "Art, Music and PE: enjoy taking part, express ideas and feelings, and show coordination and awareness of healthy habits and safety.", s: ["slides:17"] }
            ] },
            { k: "p", t: "These are examples of professionally determined expectations for what most children should be equipped with at the start of P1.", s: ["slides:17"] }
          ] }
        ]
      },
      {
        title: "Character formation and pastoral care",
        blocks: [
          { k: "ul", items: [
            { t: "The school is a Catholic Mission-Aided convent school with 147 years of history. Its sister schools in Singapore are Canossa Catholic Primary School and St. Anthony's Canossian Secondary School.", s: ["slides:4"] },
            { t: "School values: Faith, Charity, Humility, Forgiveness.", s: ["details:1", "slides:8"] },
            { t: "Vision: every SACPS girl a confident and curious learner who serves with commitment, compassion and cheerfulness.", s: ["details:1", "slides:7"] },
            { t: "Mission: nurturing each one in her own way by forming hearts, enlightening minds and empowering spirits to live in The Way, The Truth and The Life.", s: ["details:1", "slides:7"] },
            { t: "Morning and end-of-day prayers happen daily.", s: ["slides:11"] },
            { t: "Catholic girls attend PC Catechism, which does not replace Catechism classes in church. It can be an opt-in choice for non-Catholic girls, who otherwise attend PC values-based lessons.", s: ["slides:11"] },
            { t: "Character formation includes values lessons in Mother Tongue CCE periods, Form Teacher Guidance Period, Canossians Connect class conversations, assembly sessions, student leadership, Values-in-Action, a Lifeskills Programme, National Education, level activities, and celebrations including school masses and paraliturgies.", s: ["slides:10"] },
            { t: "Form classes are named Steadfast, Courage, Piety, Justice, Prudence and Temperance. Girls stay in orientation groups until the end of January before moving into their form classes.", s: ["slides:22", "details:1"] }
          ] }
        ]
      },
      {
        title: "Communicating with the school",
        blocks: [
          { k: "ul", items: [
            { t: "Parents Gateway (PG): announcements and online consent forms. Turn on notifications.", s: ["booklet:19", "slides:49"] },
            { t: "Parents' Connection: a termly information sheet sent to all through PG, with upcoming events, programmes and home news.", s: ["booklet:19"] },
            { t: "School website: www.stanthonyscanossianpri.moe.edu.sg. Teachers' emails can be found there.", s: ["booklet:19"] },
            { t: "Phone: call the general line 6449 2239 and staff transfer the call. Teachers return the call if unavailable.", s: ["booklet:19"] },
            { t: "Student Planner: write a note to the teacher and teach her to show it.", s: ["booklet:19"] },
            { t: "Teachers may not reply the same day if they are in lessons or busy after school. For urgent matters, contact the General Office on 6449 2239.", s: ["slides:28"] },
            { t: "Please keep communication respectful. The school says there is no need to start or join chat groups with other parents.", s: ["slides:28"] },
            { t: "Tell the teacher about any learning or behaviour concerns so you can work together.", s: ["slides:29", "slides:27"] }
          ] }
        ]
      },
      {
        title: "Helping your daughter settle in",
        blocks: [
          { k: "ul", items: [
            { t: "Be patient. There will be good and bad days, and the more anxious you are, the harder it is for her.", s: ["slides:29"] },
            { t: "Support and encourage her, affirm small successes, ease her into new routines and acknowledge her feelings (the school's SAFE tips).", s: ["slides:23"] },
            { t: "Build friendly manners: polite phrases, taking turns and respectful interactions.", s: ["slides:25"] },
            { t: "Encourage reading and learning from mistakes. If she says she cannot do it, remind her that she cannot do it yet.", s: ["slides:24", "slides:27", "slides:60"] },
            { t: "Things she can practise to manage by herself: dressing, hand washing, taking her temperature with a thermometer, packing her bag by the timetable, buying food, making healthy choices, and knowing when and how to ask for help.", s: ["slides:26"] },
            { t: "Check her school bag daily using the timetable, and set up a home routine for worksheets that need to be completed or signed.", s: ["booklet:22"] },
            { t: "Work with her on friendships and resolving conflicts.", s: ["slides:47"] }
          ] },
          { k: "p", t: "There is a Parent-Child Activity Book with practical tips.", s: ["slides:57", "slides:58"] }
        ]
      },
      {
        title: "School bus service",
        blocks: [
          { k: "ul", items: [
            { t: "RAE Transport Services LLP provides routine trips (morning home to school, afternoon school to home) and single-trip services.", s: ["booklet:15"] },
            { t: "Single-trip services are payable per ride for students staying back for extra lessons or CCAs. Buses leave at 4.30 pm and 5.40 pm.", s: ["booklet:15"] },
            { t: "Write the bus number (for example SACPS 13) on the nametag.", s: ["booklet:9"] },
            { t: "Contact details are under Contacts.", s: ["booklet:15"] }
          ] },
          { k: "accordion", title: "Bus operating areas", blocks: [
            { k: "ul", items: [
              { t: "Bayshore/Siglap, Bedok North/Town/Central, Bedok Reservoir Road, Bedok Reservoir View, Bedok Ria/Eastwood Estate/Kew Estate, Bedok South, Chai Chee Road/Chai Chee Dr, Elias Green, Flora Estate/Compass Green.", s: ["booklet:15"] },
              { t: "Marine Parade/Katong, Pasir Ris HDB/private estate, Simei, Sunbird/Sea Breeze/Changi Green/Changi Court, Tampines, Tanah Merah Kechil Road/Simpang Bedok, Kembangan/Eunos/Geylang.", s: ["booklet:15"] },
              { t: "Parts of Hougang/Sengkang/Punggol. There is no bus service for after-school activities to these areas.", s: ["booklet:15"] }
            ] },
            { k: "note", t: "Ask the bus vendor whether your address is covered.", s: ["booklet:15"] }
          ] }
        ]
      }
    ]
  },

  /* ---------- CONTACTS ---------- */
  contacts: {
    school: {
      name: "St Anthony's Canossian Primary School (General Office)",
      address: "1602 Bedok North Ave 4, Singapore 469701",
      phone: "6449 2239",
      email: "sacps@moe.edu.sg",
      web: "https://www.stanthonyscanossianpri.moe.edu.sg/",
      facebook: "https://www.facebook.com/SACPS.OFFICIAL/",
      instagram: "https://www.instagram.com/sacps.official/",
      hours: "",
      s: ["details:1", "slides:28"]
    },
    vendors: [
      {
        name: "Pacific Bookstores Pte Ltd",
        role: "School bookshop. Books, stationery and iron-on nametags.",
        phones: ["6929 8012", "9091 9267"],
        email: "sales@pacificbookstores.com",
        web: "https://pacificbookstores.com/",
        note: "Collection days run Monday to Friday 9 am to 3 pm, lunch 12 noon to 1 pm.",
        s: ["details:2", "booklet:16", "booklist:3"]
      },
      {
        name: "Magdalene Sewing Centre Pte Ltd",
        role: "School uniform and PE attire supplier.",
        phones: ["6293 5840"],
        whatsapp: "8683 6993",
        email: "info@magdalene.com.sg",
        web: "https://www.magdalene.com.sg/",
        note: "The 8683 6993 number is WhatsApp only. The website is available year-round.",
        s: ["details:2", "booklet:16"]
      },
      {
        name: "RAE Transport Services LLP",
        role: "School bus service (bus vendor).",
        phones: ["8606 0845"],
        note: "Bus vendor contact.",
        s: ["booklet:15"]
      },
      {
        name: "School dental clinic (Health Promotion Board)",
        role: "Dental clinic in the school.",
        phones: ["9111 0760"],
        note: "Call to request an appointment.",
        s: ["booklet:18"]
      }
    ],
    care: [
      {
        name: "YMCA School-based Student Care Centre @ SACPS",
        t: "The school-based student care. Students walk to the YMCA centre. Open Monday to Friday 10.00 am to 7.00 pm and in school holidays 7.30 am to 7.00 pm. Closed on Saturdays, Sundays and public holidays.",
        phones: ["6282 8893"],
        email: "scscc@ymca.edu.sg",
        web: "https://www.ymca.org.sg/",
        s: ["booklet:7", "booklet:3"]
      },
      {
        name: "Morning Star Community Services (Primavera)",
        t: "The student care opposite the school. Students meet the officers at the main foyer next to the General Office.",
        phones: ["8691 8592"],
        web: "https://www.morningstar.org.sg/",
        note: "Blk 95 Bedok North Ave 4, #01-1415, Singapore 460095.",
        s: ["booklet:7", "booklet:3"]
      }
    ],
    staff: [
      { group: "School leaders", rows: [
        ["Mrs Sharon Clarissa Foo", "Principal"],
        ["Ms Sharon Thia", "Vice-Principal"],
        ["Ms Shawna Lim", "Vice-Principal"],
        ["Mr Dickson Kuak", "Vice-Principal (Admin)"]
      ] },
      { group: "Year Head", rows: [
        ["Mrs Angela Tan", "Year Head (P1/P2)"]
      ] }
    ],
    staffNote: "Key roles only.",
    staffSrc: ["slides:2"]
  }
} as unknown as Content
