# OTB Chess Tracker

Offline / over-the-board (OTB) chess tracker for analyzing game results and visualizing patterns in your local collection of PGN games. Built with Next.js, React and Chart.js.

## Features

- Import a PGN file and visualize wins/losses by colour, quarter, and ECO codes.
- Interactive charts using Chart.js and react-chartjs-2.
- Lightweight data processing in `app/lib/dataProcessing.js` for parsing and aggregating PGN data.

## Quick Start

Requirements: Node.js (18+), npm.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
npm run start
```

Linting:

```bash
npm run lint
```

## Docker

Build and run with Docker (image exposes the app on port 3000):

```bash
docker build -t otb-chess-tracker .
docker run -p 3000:3000 otb-chess-tracker
```

## Project Structure

- `app/` — Next.js application (routes, global styles, layout).
- `app/lib/dataProcessing.js` — PGN parsing and aggregation utilities.
- `app/lib/tempData/tempGames.pgn` — example/imported PGN file used for quick testing.
- `app/ui/` — React UI components (e.g. GameTable, InputFileSelect, chart components).
- `public/` — static assets.

See these files directly:

- [app/page.tsx](app/page.tsx)
- [app/lib/dataProcessing.js](app/lib/dataProcessing.js)
- [app/lib/tempData/tempGames.pgn](app/lib/tempData/tempGames.pgn)
- [app/ui/GameTable.tsx](app/ui/GameTable.tsx)
- [app/ui/InputFileSelect.tsx](app/ui/InputFileSelect.tsx)

## Development notes

- PGN parsing is handled with the `pgn-parser` dependency; aggregated datasets are produced in `app/lib/dataProcessing.js` and consumed by chart components in `app/ui`.
- If you add large PGN files during development, keep them outside version control or add them to `.gitignore`.

## Available Scripts

From the project root, these npm scripts are available:

- `dev` — runs the Next.js dev server.
- `build` — builds the production bundle.
- `start` — starts the built production server.
- `lint` — runs Next.js linting.

## Contributing

Feel free to open issues or pull requests. For small improvements (typos, docs, minor UI fixes) create a branch and submit a PR.

## License

This repository does not include a license file. Add one if you'd like to make the project open source.
