/**
 * app.js — CampusPulse Student Event Registration Dashboard
 * ─────────────────────────────────────────────────────────
 * Covers:
 *   ✓ Arrays & Objects  (.push, .find, .filter, .map, .reduce)
 *   ✓ DOM Manipulation  (createElement, innerHTML, addEventListener)
 *   ✓ Form Validation   (.trim(), error states)
 *   ✓ Local Storage     (JSON.stringify / JSON.parse)
 *   ✓ Live Search       (real-time event filtering)
 *   ✓ Stats KPIs        (dynamic counters with reduce)
 */

"use strict";

/* ═══════════════════════════════════════════════════════════
   1. DEFAULT SEED DATA
═══════════════════════════════════════════════════════════ */
const DEFAULT_EVENTS = [
  {
    id: 1700000001,
    title: "AI Bootcamp 2025",
    category: "Technology",
    seats: 30,
    registered: 12
  },
  {
    id: 1700000002,
    title: "Photography Masterclass",
    category: "Arts",
    seats: 20,
    registered: 20         // full — demonstrates the "Full" disabled state
  },
  {
    id: 1700000003,
    title: "Startup Pitch Day",
    category: "Business",
    seats: 50,
    registered: 38
  },
  {
    id: 1700000004,
    title: "Mental Health & Wellness Talk",
    category: "Health",
    seats: 40,
    registered: 5
  },
  {
    id: 1700000005,
    title: "Inter-Campus 5K Run",
    category: "Sports",
    seats: 100,
    registered: 67
  },
  {
    id: 1700000006,
    title: "Quantum Computing 101",
    category: "Science",
    seats: 25,
    registered: 18
  }
];

/* ═══════════════════════════════════════════════════════════
   2. LOCAL STORAGE — LOAD / SAVE
═══════════════════════════════════════════════════════════ */
const STORAGE_KEY = "campuspulse_events";

/**
 * Retrieve stored events; fall back to seed data on first load.
 * Uses JSON.parse to deserialise the stored JSON string.
 */
function loadEvents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);         // ← JSON.parse
    } catch {
      return DEFAULT_EVENTS.slice();     // corrupted data → reset
    }
  }
  return DEFAULT_EVENTS.slice();
}

/**
 * Persist the current events array to localStorage.
 * Uses JSON.stringify to serialise the array.
 */
function saveEvents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); // ← JSON.stringify
}

/* ═══════════════════════════════════════════════════════════
   3. APPLICATION STATE
═══════════════════════════════════════════════════════════ */
let events = loadEvents();       // master array of event objects
let searchQuery = "";            // current navbar search string

/* ═══════════════════════════════════════════════════════════
   4. DOM REFERENCES
═══════════════════════════════════════════════════════════ */
const eventsGrid         = document.getElementById("eventsGrid");
const emptyState         = document.getElementById("emptyState");
const eventsCountBadge   = document.getElementById("eventsCountBadge");

const statTotalEvents    = document.getElementById("statTotalEvents");
const statTotalRegistered= document.getElementById("statTotalRegistered");
const statAvailableSeats = document.getElementById("statAvailableSeats");

const addEventForm       = document.getElementById("addEventForm");
const inputTitle         = document.getElementById("inputTitle");
const inputCategory      = document.getElementById("inputCategory");
const inputSeats         = document.getElementById("inputSeats");
const formError          = document.getElementById("formError");
const formErrorMsg       = document.getElementById("formErrorMsg");
const formSuccess        = document.getElementById("formSuccess");

const searchInput        = document.getElementById("searchInput");

/* ═══════════════════════════════════════════════════════════
   5. STATISTICS — updated with .reduce()
═══════════════════════════════════════════════════════════ */
function updateStats() {
  const totalEvents = events.length;

  // .reduce() — sum up all registered students
  const totalRegistered = events.reduce((acc, ev) => acc + ev.registered, 0);

  // .reduce() — sum up all remaining (available) seats
  const totalAvailable = events.reduce((acc, ev) => {
    const remaining = ev.seats - ev.registered;
    return acc + (remaining > 0 ? remaining : 0);
  }, 0);

  animateStat(statTotalEvents,    totalEvents);
  animateStat(statTotalRegistered, totalRegistered);
  animateStat(statAvailableSeats, totalAvailable);
}

/** Apply the CSS pop animation when a stat value changes */
function animateStat(el, value) {
  el.textContent = value;
  el.classList.remove("stat-pop");
  // Force reflow so the class re-triggers
  void el.offsetWidth;
  el.classList.add("stat-pop");
}

/* ═══════════════════════════════════════════════════════════
   6. CATEGORY HELPERS
═══════════════════════════════════════════════════════════ */
/** Returns a CSS class name for the coloured category pill */
function getCategoryClass(category) {
  const map = {
    Technology: "cat-Technology",
    Science:    "cat-Science",
    Arts:       "cat-Arts",
    Sports:     "cat-Sports",
    Business:   "cat-Business",
    Health:     "cat-Health",
    Music:      "cat-Music",
    Other:      "cat-Other",
  };
  return map[category] || "cat-Other";
}

/** Returns a percentage for the seat capacity bar */
function getSeatPercent(event) {
  return Math.min(100, Math.round((event.registered / event.seats) * 100));
}

/* ═══════════════════════════════════════════════════════════
   7. EVENT CARD BUILDER
═══════════════════════════════════════════════════════════ */
/**
 * Build a single event card DOM element.
 * Called inside render() via .map() iteration.
 */
function buildCard(event) {
  const remaining = event.seats - event.registered;
  const isFull    = remaining <= 0;
  const isLow     = !isFull && remaining <= Math.ceil(event.seats * 0.2); // ≤20% left = low
  const pct       = getSeatPercent(event);

  // Seat badge colour: red if full/low, green if available
  const seatBadgeClass = isFull
    ? "bg-red-100 text-red-600 border-red-200"
    : isLow
      ? "bg-orange-100 text-orange-600 border-orange-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  const seatBadgeText = isFull
    ? "Full"
    : isLow
      ? `${remaining} left — Low!`
      : `${remaining} available`;

  // Bar colour shifts from green → orange → red as seats fill up
  const barColour = pct >= 100 ? "bg-red-400" : pct >= 80 ? "bg-orange-400" : "bg-emerald-400";

  // Register button — disabled & styled differently when full
  const registerBtn = `
    <button
      data-action="register"
      data-id="${event.id}"
      ${isFull ? "disabled" : ""}
      class="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200
             ${isFull
               ? "bg-slate-100 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed"
               : "bg-gradient-to-r from-[#008DDA] to-[#41C9E2] text-white hover:shadow-[0_4px_16px_rgb(65,201,226,0.35)] hover:scale-[1.02] active:scale-[0.98]"
             }"
    >
      ${isFull ? "Full" : "Register"}
    </button>`;

  const cancelBtn = `
    <button
      data-action="cancel"
      data-id="${event.id}"
      ${event.registered === 0 ? "disabled" : ""}
      class="flex-1 py-2 rounded-xl text-sm font-semibold border transition-all duration-200
             ${event.registered === 0
               ? "bg-slate-50 text-slate-300 border-slate-200 opacity-60 cursor-not-allowed"
               : "bg-white text-slate-600 border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200 active:scale-[0.98]"
             }"
    >
      Cancel
    </button>`;

  // Assemble card via innerHTML template literal
  const card = document.createElement("div");
  card.className = `event-card rounded-2xl bg-[#F0F4F8]/90 border border-white/20
                    shadow-[0_8px_30px_rgb(65,201,226,0.1)]
                    hover:scale-[1.01] hover:bg-[#E2E8F0]
                    transition-all duration-200 p-5 flex flex-col gap-4`;

  card.innerHTML = `
    <!-- Card Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <h3 class="font-display text-base text-[#1E293B] leading-tight truncate"
            title="${escapeHtml(event.title)}">
          ${escapeHtml(event.title)}
        </h3>
      </div>
      <span class="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border
                   ${getCategoryClass(event.category)}">
        ${escapeHtml(event.category)}
      </span>
    </div>

    <!-- Seat Info Row -->
    <div class="flex items-center justify-between text-xs text-[#64748B]">
      <span>
        <span class="font-semibold text-[#1E293B]">${event.registered}</span>
        / ${event.seats} registered
      </span>
      <span class="px-2.5 py-1 rounded-full border text-xs font-semibold ${seatBadgeClass}">
        ${seatBadgeText}
      </span>
    </div>

    <!-- Progress Bar -->
    <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
      <div class="seat-bar-fill h-1.5 rounded-full ${barColour}"
           style="width: ${pct}%"></div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2 mt-1">
      ${registerBtn}
      ${cancelBtn}
    </div>
  `;

  return card;
}

/* ═══════════════════════════════════════════════════════════
   8. RENDER — central DOM update function
═══════════════════════════════════════════════════════════ */
/**
 * render() clears the grid and rebuilds it from the current state.
 * Uses .filter() to apply the search query,
 * then .map() to convert each event object into a DOM node.
 */
function render() {
  // ── Filter by search query ──────────────────────────
  const query = searchQuery.toLowerCase().trim();
  const visible = events.filter(ev => {           // ← .filter()
    return (
      ev.title.toLowerCase().includes(query) ||
      ev.category.toLowerCase().includes(query)
    );
  });

  // ── Clear the grid ──────────────────────────────────
  eventsGrid.innerHTML = "";

  // ── Toggle empty state ──────────────────────────────
  if (visible.length === 0) {
    emptyState.classList.remove("hidden");
    eventsGrid.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    eventsGrid.classList.remove("hidden");
  }

  // ── Build and insert cards using .map() ─────────────
  const fragment = document.createDocumentFragment();
  visible
    .map(ev => buildCard(ev))              // ← .map() returns array of DOM nodes
    .forEach(node => fragment.appendChild(node)); // ← .forEach() to append each
  eventsGrid.appendChild(fragment);

  // ── Update count badge ──────────────────────────────
  eventsCountBadge.textContent = visible.length;

  // ── Refresh stats ───────────────────────────────────
  updateStats();
}

/* ═══════════════════════════════════════════════════════════
   9. FORM VALIDATION HELPERS
═══════════════════════════════════════════════════════════ */
function showError(msg) {
  formErrorMsg.textContent = msg;
  formError.classList.remove("hidden");
  formSuccess.classList.add("hidden");
  // Auto-hide after 4 s
  setTimeout(() => formError.classList.add("hidden"), 4000);
}

function showSuccess() {
  formSuccess.classList.remove("hidden");
  formError.classList.add("hidden");
  setTimeout(() => formSuccess.classList.add("hidden"), 3000);
}

/* ═══════════════════════════════════════════════════════════
   10. ADD EVENT — form submit handler
═══════════════════════════════════════════════════════════ */
addEventForm.addEventListener("submit", function (e) {
  e.preventDefault();                            // ← preventDefault

  const title    = inputTitle.value.trim();      // ← .trim()
  const category = inputCategory.value.trim();
  const seats    = parseInt(inputSeats.value, 10);

  // ── Validation ──────────────────────────────────────
  if (!title) {
    showError("Event title cannot be empty.");
    inputTitle.focus();
    return;
  }
  if (!category) {
    showError("Please select a category.");
    inputCategory.focus();
    return;
  }
  if (!inputSeats.value.trim() || isNaN(seats) || seats <= 0) {
    showError("Please enter a valid seat count (must be 1 or more).");
    inputSeats.focus();
    return;
  }

  // ── Create new event object ──────────────────────────
  const newEvent = {
    id:         Date.now(),   // unique timestamp-based ID
    title:      title,
    category:   category,
    seats:      seats,
    registered: 0
  };

  // ── Push to array ────────────────────────────────────
  events.push(newEvent);     // ← .push()

  // ── Persist & re-render ──────────────────────────────
  saveEvents();
  render();
  showSuccess();

  // ── Reset form ───────────────────────────────────────
  addEventForm.reset();
});

/* ═══════════════════════════════════════════════════════════
   11. REGISTER / CANCEL — event delegation on grid
═══════════════════════════════════════════════════════════ */
eventsGrid.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-action]");
  if (!btn || btn.disabled) return;

  const action = btn.dataset.action;
  const id     = Number(btn.dataset.id);

  // ── Find the target event using .find() ──────────────
  const event = events.find(ev => ev.id === id);  // ← .find()
  if (!event) return;

  if (action === "register") {
    if (event.registered < event.seats) {
      event.registered++;                          // mutate state
    }
  } else if (action === "cancel") {
    if (event.registered > 0) {
      event.registered--;
    }
  }

  // ── Persist & re-render ──────────────────────────────
  saveEvents();
  render();
});

/* ═══════════════════════════════════════════════════════════
   12. SEARCH — navbar input handler
═══════════════════════════════════════════════════════════ */
searchInput.addEventListener("input", function () {
  searchQuery = this.value;  // update global search state
  render();                  // re-render filtered results
});

/* ═══════════════════════════════════════════════════════════
   13. UTILITY — XSS-safe HTML escaping
═══════════════════════════════════════════════════════════ */
function escapeHtml(str) {
  const el = document.createElement("div");
  el.appendChild(document.createTextNode(str));
  return el.innerHTML;
}

/* ═══════════════════════════════════════════════════════════
   14. INITIALISE — run on page load
═══════════════════════════════════════════════════════════ */
render();