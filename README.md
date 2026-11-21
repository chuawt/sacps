# sacps

> A phone-friendly hub that gives P1 2027 parents at St Anthony's Canossian Primary School one calm place for dates, to-dos and school routines.

Live site: [sacps.mugenno.com](https://sacps.mugenno.com) · [Repository](https://github.com/chuawt/sacps) · Status: live (v0.1.x)

The P1 2027 SACPS Hub is run by a parent. It is for every parent whose child starts Primary 1 at St Anthony's Canossian Primary School (SACPS), Singapore, in 2027. It turns the school's P1 documents into a short "what is next" view, a first-weeks guide, a before-school to-do list, school reference notes and contacts. It is not run or endorsed by the school.

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

The school shares its P1 information across a letter, a booklet, a slide deck and a booklist. Parents have to cross-check them to find the next deadline. This site puts the same facts into one easy-to-read website, so parents can act on time without hunting. The school documents themselves are not included in this repository or on the site.

### Features

* See the next dated items with countdowns in Singapore time. Past items drop off by themselves.
* Follow the first-weeks timeline (4 to 15 January 2027) and tick off a day-by-day packing list that is saved on the device.
* Work through the before-school jobs: books, uniform, nametags, GIRO and Edusave, Parents Gateway. Mark each as done.
* Read the booklist with all Mother Tongue variants and prices.
* Look up school hours, gates, dismissal points, uniform rules, food, devices and assessment.
* Tap to call, email or open a map for the school and its suppliers.
* Use it on a phone or a computer. A simple header menu links the sections.

### Tech Stack

| Area | Choice |
|---|---|
| Language / framework | Astro 5 (static output), TypeScript, plain CSS, small vanilla script |
| Build / tooling | npm, `astro check` |
| Hosting | Cloudflare Workers static assets (not deployed yet) |
| Data / services | No server. All content is data in `src/data/content.ts`. Browser `localStorage` for checklist ticks only |

### Screenshots/Outputs

No screenshots yet. Run the site locally to see it (see [Usage](#usage)).

### Project Structure

```text
src/data/        all content as structured data (content.ts) and its types
src/pages/       one file per route: /, /first-weeks, /before-school, /school-life, /contacts, /about
src/components/  tables, booklist, link buttons
src/layouts/     page shell with header, menu and footer
src/scripts/     client script for Singapore-time countdowns, checklists and the menu
src/styles/      global CSS with the SACPS colour palette
public/          favicon, apple touch icon, robots.txt
wrangler.jsonc   Worker config, static assets from ./dist
```

## Deployment

### Prerequisites

* Node.js 20 or later and npm
* A Cloudflare account (only to deploy)

### Setup

```bash
git clone https://github.com/chuawt/sacps.git
cd sacps
npm install
```

### Deploy

```bash
npm run build
```

```bash
npm run deploy
```

`npm run deploy` runs `astro build` and then `wrangler deploy`.

### Configuration

No environment variables or secrets. `wrangler.jsonc` sets the Worker name `sacps` and serves `./dist`.

## Usage

1. Start the dev server and open http://localhost:4330 in a phone-sized window:

```bash
npm run dev
```

2. To test a date, add `?today=2026-12-01` to the address. This override works on localhost only.
3. To update content, edit `src/data/content.ts`. Keep a source reference on every fact.
4. Check types and build before deploying:

```bash
npm run build
```

## Roadmap

* Add screenshots.
* Review again when the school issues new documents or a timetable.
* Confirm the open questions in the project notes with the school.

## Acknowledgements

* The facts come from documents issued by St Anthony's Canossian Primary School: a letter, the P1 Information Booklet for Parents, the P1 Orientation for Parents slides and the P1 2027 Booklist. They belong to the school and are not included here. The project licence does not cover them.
* No school logo or crest is used.
* Built with [Astro](https://astro.build) and hosted with [Cloudflare Workers](https://workers.cloudflare.com).

## License

Not yet chosen. Code by [@chuawt](https://chuawt.github.io)
