# Buttons with a Brain

A small React + JavaScript interaction demo demonstrating how a button can communicate its complete lifecycle through state and intentional motion.

## What This Project Demonstrates

The project contains a reusable `SmartButton` with the following states:

* Idle
* Hover / Focus
* Loading
* Success
* Error

The button prevents repeated submissions while loading and supports retry after failure.

## Deterministic Demo Controls

The page includes:

* **Force Success** — reliably demonstrates the loading → success flow.
* **Force Error** — reliably demonstrates the loading → error flow.

These controls are provided so reviewers can reproduce both outcomes on demand.

## Accessibility

The button is implemented using a native HTML button and supports keyboard interaction with a visible focus state.

State information is exposed through accessible status feedback, and the interface does not depend on color alone to communicate success or failure.

The project also respects `prefers-reduced-motion` by reducing non-essential animation while preserving state feedback.

## Motion

State transitions use a **280ms** duration with the easing:

```css
cubic-bezier(.22, .8, .2, 1)
```

The implementation focuses on transform and opacity-based motion where possible to keep transitions responsive.

More detail is available in [`MOTION_NOTES.md`](./MOTION_NOTES.md).

## Technology

* React
* JavaScript
* Vite
* CSS

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
│   └── SmartButton.jsx
├── App.jsx
├── App.css
└── index.css
```

## AI Assistance

GitHub Copilot Agent was used as a development assistant for the initial implementation and verification of the button lifecycle, accessibility behavior, motion system, and deterministic success/error controls.

The AI-generated implementation was manually reviewed and tested before completion.

## Manual Review

After AI implementation, the application was manually reviewed and tested for:

* Success and error flows
* Retry behavior
* Rapid clicking
* Keyboard activation
* Visible focus
* Reduced-motion behavior
* General UI responsiveness
