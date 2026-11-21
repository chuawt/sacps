# sacps

> A mobile-first hub that gives P1 2027 parents at St Anthony's Canossian Primary School one calm place for dates, to-dos and school routines.

Live demo: not deployed yet (planned as the Cloudflare Worker `sacps`) · Repository: local only · Status: in development

This is an unofficial site run by a parent. It is for every parent whose child starts Primary 1 at St Anthony's Canossian Primary School (SACPS), Singapore, in 2027. It turns four school PDFs into a short "what is next" view, a first-weeks checklist, a before-school to-do list, school reference notes and contacts. It is not run or endorsed by the school.

## Table of Contents

* [Project Description](#project-description)
  * [Purpose](#purpose)
  * [Features](#features)
  * [Tech Stack](#tech-stack)
  * [Screenshots/Outputs](#screenshotsoutputs)
  * [Project Structure](#project-structure)
* [Deployment](#deployment)
  * [Prerequisites](#prerequisites)
  * [Setup](#setup)
  * [Deploy](#deploy)
  * [Configuration](#configuration)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Acknowledgements](#acknowledgements)
* [License](#license)

## Project Description

### Purpose

The school shares its P1 information across a letter, a booklet, a slide deck and a booklist. Parents have to cross-check them to find the next deadline. This site puts the same facts into one phone-friendly page, each with a page reference to the school document, so parents can act on time without hunting.

### Features

* See the next dated items with countdowns in Singapore time. Past items drop off by themselves.
* Follow the first-weeks timeline (4 to 15 January 2027) and tick off a day-by-day packing list that is saved on the device.
* Work through the before-school jobs: books, uniform, nametags, GIRO and Edusave, Parents Gateway. Mark each as done.
* Read the booklist with all Mother Tongue variants and prices.
* Look up school hours, gates, dismissal points, uniform rules, food, devices and assessment.
* Tap to call, email or open a map for the school and its suppliers.
* See which school document and page each fact comes from.
* Light and dark mode.

### Tech Stack

| Area | Choice |
|---|---|
| Language / framework | Plain HTML, CSS and JavaScript, no build step |
| Build / tooling | None. All content is data in `site/data.js` |
| Hosting | Cloudflare Workers static assets (not deployed yet) |
| Data / services | No server. Browser `localStorage` for ticks only |

### Screenshots/Outputs

No screenshots yet. Run the site locally to see it (see [Usage](#usage)).

### Project Structure

```text
site/            the static site (index.html, styles.css, app.js, data.js, robots.txt)
made/            working files, not part of the site
wrangler.jsonc   Worker config, static assets from ./site
.claude/         local preview config
```

## Deployment

### Prerequisites

* Python 3 for the local preview
* Node.js for the syntax check, and Wrangler for deployment

### Setup

```bash
cd sacps
```

### Deploy

Deployment has not been done. When it is time:

```bash
npx wrangler deploy
```

### Configuration

No environment variables or secrets. `wrangler.jsonc` sets the Worker name `sacps` and serves `./site`.

## Usage

1. Start a local server:

```bash
python3 -m http.server 8787 --directory site
```

2. Open http://localhost:8787 on a phone-sized window.
3. To test a date, add `?today=2026-12-01` to the address.
4. To update content, edit `site/data.js` and refresh. Keep a source reference on every fact.

```bash
node --check site/app.js
```

## Roadmap

* Add screenshots.
* Review again when the school issues new documents or a timetable.
* Confirm the open questions listed in the vault project page with the school.

## Acknowledgements

* All facts come from four documents issued by St Anthony's Canossian Primary School. The school owns them, so they are not in this repository. Parents can find them in Parents Gateway.
* No school logo or crest is used.

## License

Not yet chosen. Code by [@chuawt](https://chuawt.github.io)
