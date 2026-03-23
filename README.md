# Project Tracker Website

![Weside Screenshot](https://github.com/anmol2438x-lab/Project-Tracker/blob/main/public/Screenshot%202026-03-23%20103545.png)

# Project Tracker UI

A fully functional multi-view project management tool built using React + TypeScript.
This application demonstrates advanced frontend engineering concepts including custom drag-and-drop, virtual scrolling, and simulated real-time collaboration.

---

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/anmol2438x-lab

2. Navigate to project:
   cd project-tracker-ui

3. Install dependencies:
   npm install

4. Start development server:
   npm run dev

5. Open in browser:
   http://localhost:5173

---

## State Management (Why Zustand?)

Zustand is used for global state management due to its simplicity and performance.
It avoids boilerplate code compared to Redux and allows direct state updates.

All task data is stored in a global store and shared across:

- Kanban View
- List View
- Timeline View

This ensures instant view switching without re-fetching or duplicating state.

---

## Features Implemented

### 1. Kanban Board View

- Four columns: To Do, In Progress, In Review, Done
- Tasks displayed as cards
- Column-wise task count
- Card includes:
  - Title
  - Assignee avatar (initials-based)
  - Priority badge (color-coded)
  - Due date with overdue highlighting
- Independent column scrolling
- Custom drag-and-drop between columns

---

### 2. List View

- Flat table of all tasks
- Sortable columns:
  - Title (A–Z)
  - Priority (Critical → Low)
  - Due Date (earliest first)
- Clickable headers toggle sorting direction
- Inline status update via dropdown

---

### 3. Timeline / Gantt View

- Tasks plotted on horizontal timeline
- Bars represent duration (start → due date)
- Color-coded by priority
- Today marked with vertical red line
- Tasks without start date shown as single-day marker
- Horizontal scroll enabled

---

## Custom Drag-and-Drop Implementation

Drag-and-drop is implemented using native browser APIs:

- `draggable`
- `onDragStart`
- `onDragOver`
- `onDrop`

Key Features:

- Dragged card follows cursor with opacity and shadow
- Placeholder maintains layout stability
- Drop zones highlight when dragging over
- Snap-back behavior when dropped outside valid area
- No external libraries used

---

## Virtual Scrolling Implementation

Virtual scrolling is built manually to handle large datasets (500+ tasks).

Approach:

- Fixed row height
- Calculate visible range using `scrollTop`
- Render only visible rows + buffer (5 above & below)
- Use absolute positioning inside a container with full height

Benefits:

- Smooth scrolling
- No DOM overload
- No flickering or blank gaps

---

## Live Collaboration Simulation

Simulated real-time users using interval-based updates:

- 2–4 mock users move randomly across tasks
- Each user shown as colored avatar
- Multiple users stack on same task
- Avatar count displayed at top

---

## Filters & URL State

- Filter by:
  - Status (multi-select)
  - Priority (multi-select)
  - Assignee
  - Due date range
- Filters apply instantly
- URL query params reflect filter state
- Supports back navigation
- Clear filters button appears dynamically

---

## Lighthouse Performance

The application achieves a Lighthouse performance score above 85.

- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Screenshot included in project folder.

---

## Constraints Followed

- No drag-and-drop libraries used
- No virtual scrolling libraries used
- No UI component libraries used
- Fully built with TypeScript (no plain JS)
- Custom components only

---

## Explanation (UI Challenge)

The most challenging part of this project was implementing a custom drag-and-drop system without causing layout shifts. When a card is dragged, removing it from the DOM can cause surrounding elements to collapse. To prevent this, a placeholder element with the same height is rendered in place of the dragged card. This ensures layout stability and smooth interaction.

Another challenge was synchronizing drag visuals with user interaction while maintaining performance. Native browser drag events were used to keep the implementation lightweight and efficient.

If given more time, I would improve the virtual scrolling logic to support dynamic row heights instead of fixed heights. Additionally, I would enhance the timeline view with zooming capabilities and dependency mapping between tasks.

---

## Live Demo

https://project-tracker-phi-ten.vercel.app/

---

## Tech Stack

- React + TypeScript
- Zustand (State Management)
- Tailwind CSS
- Vite

---

## Author

Anmol Kumar
