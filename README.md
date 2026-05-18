# FrostEvents – Student Event Registration Dashboard

A responsive and interactive Student Event Registration Dashboard built using HTML5, Tailwind CSS, and Vanilla JavaScript.

This project was developed as part of a Frontend Web Development assignment focused on:

- HTML5 structure
- Tailwind CSS responsive design
- JavaScript Arrays & Objects
- DOM Manipulation
- Local Storage
- Git and GitHub deployment

The application simulates a real-world school or conference event registration system where users can:

- View available events
- Register students
- Cancel registrations
- Add new events dynamically
- Search events instantly
- Persist data using Local Storage

---

# Features

## Responsive User Interface

The dashboard is fully responsive and optimized for:

- Mobile phones
- Tablets
- Desktop devices

---

## Winter Chill UI Theme

The project uses a custom “Winter Chill” design system featuring:

- Deep Frost Navy background
- Frosted glass cards
- Glacial Cyan accents
- Arctic Mint success indicators
- Smooth hover transitions
- Rounded containers
- Soft ambient shadows

---

# Core Functionalities

## Navbar

- Responsive navigation
- Search input
- System branding

---

## Hero Section

- Dashboard introduction
- Modern responsive layout
- Gradient styling

---

## Statistics Dashboard

Dynamic statistics showing:

- Total Events
- Registered Students
- Remaining Seats

Statistics update automatically whenever users:

- Register
- Cancel
- Add new events

---

## Event Management

Each event card displays:

- Event Title
- Category
- Total Seats
- Registered Students
- Remaining Seats
- Registration Status

Users can:

- Register for events
- Cancel registrations

The system prevents:

- Over-registration
- Negative cancellations

---

## Add Event Form

Users can dynamically create new events by providing:

- Event Title
- Event Category
- Number of Seats

Validation prevents:

- Empty event names
- Empty categories
- Invalid seat numbers

---

## Search Functionality

The dashboard includes real-time event searching using:

- Event title matching
- Category matching

Filtering updates instantly while typing.

---

## Local Storage Persistence

All event data is saved using browser Local Storage.

Data persists even after:

- Page refresh
- Browser restart

Stored information includes:

- Event titles
- Categories
- Seat counts
- Registration counts

---

# Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| Tailwind CSS | Styling and responsiveness |
| JavaScript | Interactivity and logic |
| DOM Manipulation | Dynamic UI updates |
| Local Storage | Data persistence |
| Git and GitHub | Version control |
| Vercel/GitHub Pages | Deployment |

---

# Project Structure

```text
student-event-registration-dashboard/
│
├── index.html
├── script.js
├── README.md
└── .gitattributes
```

---

# JavaScript Concepts Used

This project demonstrates practical usage of:

## Arrays and Objects

```javascript
const event = {
  id: 1,
  title: "AI Bootcamp",
  category: "Technology",
  seats: 30,
  registered: 12
};
```

---

## Array Methods

| Method | Purpose |
|---|---|
| push() | Add new events |
| find() | Locate event by ID |
| filter() | Search functionality |
| map() | Render event cards |
| reduce() | Calculate statistics |

---

## DOM Manipulation

The project uses:

- getElementById()
- querySelector()
- createElement()
- appendChild()
- innerHTML
- addEventListener()

---

# How to Run the Project

## Option 1 – Open Locally

1. Clone the repository:

```bash
git clone <repository-link>
```

2. Open the project folder:

```bash
cd student-event-registration-dashboard
```

3. Open `index.html` in your browser.

---

## Option 2 – VS Code Live Server

1. Install the Live Server extension.
2. Right-click `index.html`
3. Click:

```text
Open with Live Server
```

---

# Deployment

The project can be deployed using:

- GitHub Pages
- Vercel

---

# Git Commit Timeline

Example professional commit flow:

```bash
Initialize project structure
Build responsive navbar and hero section
Create statistics dashboard
Design event cards and forms
Implement DOM rendering
Add register and cancel functionality
Implement form validation
Add Local Storage persistence
Improve responsive UI and polish design
Deploy project to Vercel
```

---

# UI Design Highlights

- Frosted glass containers
- Dynamic event cards
- Animated hover effects
- Responsive grid layout
- Modern dashboard statistics
- Clean typography
- Winter-inspired aesthetic

---

# Validation Rules

The system prevents:

- Empty submissions
- Invalid seat numbers
- Over-registration
- Negative registration counts

---

# Future Improvements

Potential future enhancements include:

- Authentication system
- Admin dashboard
- Event editing
- Event deletion
- Dark/Light mode toggle
- Backend integration
- API support
- Database storage
- Attendance tracking

---

# Author

Developed by:

Honore Peter Joy Ndayishimiye

Frontend Web Development Assignment Project

---

# License

This project is for educational and learning purposes.