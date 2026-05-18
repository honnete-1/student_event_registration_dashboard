# CampusPulse — Student Event Registration Dashboard

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Local Storage](https://img.shields.io/badge/Local_Storage-4A90E2?style=flat&logo=databricks&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=flat&logo=vercel&logoColor=white)

A responsive, fully interactive Student Event Registration Dashboard built with HTML5, Tailwind CSS v3, and Vanilla JavaScript — featuring a custom **Winter Chill** UI theme.

🔗 **Live Demo:** https://student-event-registration-dashboar-lime.vercel.app/

---

## About the Project

This project was developed as a Frontend Web Development assignment simulating a real-world event management system used in schools, conferences, and training programs. It allows users to view, register for, and manage campus events — with all data persisted across page refreshes using browser Local Storage.

**Assignment Topics Covered:**
- HTML5 semantic structure
- Tailwind CSS responsive design
- JavaScript Arrays & Objects
- DOM Manipulation
- Local Storage
- Git & Deployment

---

## Features

### Winter Chill UI Theme
A premium custom design system built with Tailwind CSS utility classes:

| Token | Value | Usage |
|---|---|---|
| Deep Frost Navy | `#0B192C` | Global background |
| Frosted Card White | `#F0F4F8` | Cards & containers |
| Glacial Cyan | `#008DDA` / `#41C9E2` | Accents & primary controls |
| Arctic Mint | `#10B981` | Success states |
| Frozen Crimson | `#EF4444` | Full / error states |

Visual highlights include frosted glass borders (`border border-white/20`), icy ambient shadows, smooth hover scale transitions, and staggered card entry animations.

---

### Responsive Layout
Fully optimized for mobile phones, tablets, and desktops. The main content area uses a CSS Grid that splits into a sticky form column and a 2-column event card grid on desktop, collapsing to a single stack on mobile.

---

### Sticky Navbar
- Brand logo and title (**CampusPulse**)
- Real-time search input with live event filtering
- Glassmorphism styling (`backdrop-blur-md`)

---

### Hero Section
- Gradient headline: *"Master Your Campus Experience"*
- Ambient background orbs for depth
- Descriptive subtext

---

### Statistics Dashboard
Three KPI cards that update automatically on every user action:

| Stat | Description |
|---|---|
| Total Events | Count of all events in the system |
| Total Registered | Sum of all registered students across events |
| Available Seats | Sum of remaining seats across all events |

Calculated using `.reduce()` and animated with a CSS pop effect on change.

---

### Event Cards
Each card displays:
- Event title and colour-coded **category pill**
- Registered / total seat counter
- Animated **seat capacity progress bar** (green → orange → red as seats fill)
- Remaining seats badge — turns red when seats are low or full
- **Register** button — disabled and labelled *"Full"* when no seats remain
- **Cancel** button — disabled when no registrations exist

---

### Add Event Form
- Event Title, Category (dropdown), and Seats inputs
- Inline validation with a styled error banner (auto-dismisses after 4s)
- Success confirmation banner on valid submission
- Form auto-resets after adding an event

**Validation rules:**
- Title cannot be empty
- Category must be selected
- Seats must be a whole number greater than zero

---

### Search Functionality
Live search filters events by title or category as the user types, using `.filter()` and `.toLowerCase().includes()`. An empty state illustration appears when no results match.

---

### Local Storage Persistence
All event data is saved to `localStorage` on every state change (add, register, cancel). Data is loaded on page init via `JSON.parse`, so events survive page refreshes and browser restarts.

---

## Project Structure

```
campuspulse/
│
├── index.html        # Full semantic layout, Tailwind config, CDN links
├── styles.css        # Tailwind directives + card animations + category pills
├── app.js            # All JavaScript logic (state, DOM, events, storage)
└── README.md
```

---

## JavaScript Concepts

### Data Model
```javascript
{
  id: 1700000001,       // Date.now() timestamp — unique identifier
  title: "AI Bootcamp 2025",
  category: "Technology",
  seats: 30,
  registered: 12
}
```

### Array Methods Used

| Method | Where Applied |
|---|---|
| `.push()` | Appends a new event object to the events array on form submit |
| `.find()` | Locates the correct event by ID when Register or Cancel is clicked |
| `.filter()` | Narrows the visible events list based on the search query |
| `.map()` | Converts each event object into a card DOM node inside `render()` |
| `.forEach()` | Iterates the mapped nodes and appends them to the document fragment |
| `.reduce()` | Calculates total registered students and total available seats for KPIs |

### DOM Methods Used
`getElementById` · `querySelector` · `createElement` · `createDocumentFragment` · `appendChild` · `innerHTML` · `addEventListener` · `closest` · `dataset`

### Local Storage
```javascript
// Save
localStorage.setItem("campuspulse_events", JSON.stringify(events));

// Load
const events = JSON.parse(localStorage.getItem("campuspulse_events"));
```

---

## How to Run Locally

**Option 1 — Direct open**
```bash
git clone <repository-link>
cd campuspulse
# Open index.html in any browser
```

**Option 2 — VS Code Live Server**
1. Install the *Live Server* extension
2. Right-click `index.html` → **Open with Live Server**

> No build step required. Tailwind CSS is loaded via CDN.

---

## Deployment

The project is deployed on **Vercel**. It can also be deployed on **GitHub Pages**:

1. Push to a public GitHub repository
2. Go to **Settings → Pages**
3. Set source to `Deploy from branch → main`
4. Copy the generated live URL

---

## Git Commit Timeline

```bash
git commit -m "init: scaffold project structure with index.html, styles.css, app.js"
git commit -m "feat(ui): build sticky glassmorphism navbar with brand logo and search input"
git commit -m "feat(ui): add hero section with gradient headline and ambient frost orb background"
git commit -m "feat(ui): implement 3-column statistics KPI section with icon badges"
git commit -m "feat(ui): design responsive event card grid and sticky add-event form layout"
git commit -m "feat(js): define events array/objects structure and seed data with 6 default events"
git commit -m "feat(js): implement render() with .filter(), .map(), .forEach() and DOM manipulation"
git commit -m "feat(js): add register/cancel button logic using .find() and event delegation"
git commit -m "feat(js): integrate localStorage with JSON.stringify/parse for full data persistence"
git commit -m "polish: add form validation, error/success banners, empty state, and responsive tweaks"
```

---

## Future Improvements

- Event editing and deletion
- Admin vs. student role separation
- Backend integration with a REST API
- Database storage (replacing Local Storage)
- Authentication system
- Attendance tracking and export
- Dark / Light mode toggle
- Event date and time fields

---

## Author

**Honnete Nishimwe**
Frontend Web Development — Assignment Project

---

## License

This project is for educational and learning purposes.