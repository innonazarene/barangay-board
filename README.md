# Barangay Bulletin Board

A community bulletin board web application for Butuan City barangays. Built with **Laravel**, **Inertia.js**, **React**, and **Tailwind CSS**, featuring a school bulletin board / corkboard visual theme.

---

## Features

- **Community Posts** — Create announcements, report issues, share events, lost & found, and help requests
- **Bulletin Board Theme** — Cards look like paper notes pinned to a corkboard with push pins, subtle rotations, and paper textures
- **Photo Uploads** — Attach photos to posts; displayed prominently on each card
- **OpenStreetMap Integration** — Pin event locations on an interactive map (Leaflet/OpenStreetMap)
- **Map on Feed** — Collapsible map on the main feed shows all geotagged posts with markers
- **Map on Post Detail** — Individual post pages show a zoomed-in map if coordinates are set
- **Voting & Comments** — Upvote posts and leave comments
- **Barangay Filtering** — Filter posts by barangay, category, or search keywords
- **Admin Tools** — Pin/unpin posts, change issue statuses, delete posts
- **Responsive** — Works on mobile (375px+), tablet, and desktop

---

## Requirements

- PHP >= 8.4
- Composer
- Node.js >= 18
- MySQL / MariaDB / SQLite
- Laravel 11+

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd barangay-board
```

### 2. Install PHP dependencies

```bash
composer install
```

### 3. Install Node.js dependencies

```bash
npm install
```

### 4. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` and configure your database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=barangay_board
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Run migrations

```bash
php artisan migrate
```

This creates all tables including the `posts` table with `latitude` and `longitude` columns for map coordinates.

### 6. Create storage link

```bash
php artisan storage:link
```

This is required for uploaded photos to be publicly accessible.

### 7. Build frontend assets

```bash
npm run build
```

Or for development with hot reload:

```bash
npm run dev
```

### 8. Start the server

```bash
php artisan serve
```

Visit `http://localhost:8000` in your browser.

---

## Usage Guide

### Creating a Post

1. **Register/Login** — Click "Register" to create an account (select your barangay during registration) or "Log In" if you already have one
2. **Click "Create Post"** — Button is in the header bar
3. **Fill in the form:**
   - **Title** — A clear, descriptive title
   - **Category** — Choose from: Announcement, Issue, Event, Lost & Found, Help Request
   - **Description** — Detailed text about the post
   - **Location description** (optional) — Text like "Near the covered court, Brgy. Agusan Pequeño"
   - **Pin on Map** (optional) — Click anywhere on the map to drop a pin at the exact location where the event happened. Click "Clear pin" to remove it
   - **Photo** (optional) — Upload a JPEG, PNG, WebP, or GIF image (max 2MB). A preview is shown before submitting
4. **Click "Publish Post"**

### Viewing the Map

- On the **main feed page**, click the **"Butuan City Map"** bar to expand the map
- All posts that have map coordinates will appear as **markers** on the map
- Click any marker to see a **popup** with the post's photo, title, barangay, and a link to view it
- On a **post detail page**, if the post has coordinates, a zoomed-in map shows the exact location

### Uploading Photos

- Photos are accepted in JPEG, PNG, WebP, and GIF formats (max 2MB)
- When creating a post, click the file input under "Photo" to select an image
- A preview of the selected image is shown before submitting
- Photos appear as a **full-width banner** at the top of each post card on the feed
- On post detail pages, photos show as a full-width hero image

### Voting & Comments

- Click the **upvote arrow** on any post to vote (requires login)
- Scroll down on a post detail page to see and leave **comments**

### Filtering Posts

- **Barangay filter** — Select a specific barangay to see only its posts
- **Category tabs** — Filter by Announcements, Issues, Events, etc.
- **Search** — Type keywords to search titles and descriptions
- **Sort** — Sort by Latest or Most Voted

### Admin Features

Admins can:
- **Pin/Unpin posts** — Pinned posts always appear at the top of the feed
- **Change issue status** — Set issues to Open, In Progress, or Resolved
- **Delete any post**

---

## Project Structure

```
resources/js/
├── Components/
│   ├── BarangayMap.jsx      # OpenStreetMap display (feed & detail)
│   ├── MapPicker.jsx        # Click-to-pin map for post creation form
│   ├── PostCard.jsx         # Bulletin board note card with photo, pin, rotation
│   ├── PostForm.jsx         # Create/edit form with map picker & photo upload
│   ├── CategoryBadge.jsx    # Category label badges
│   ├── StatusBadge.jsx      # Issue status badges
│   ├── VoteButton.jsx       # Upvote button
│   ├── CommentSection.jsx   # Comment list and form
│   ├── BarangayFilter.jsx   # Barangay dropdown filter
│   └── FilterBar.jsx        # Category tabs, search, sort controls
├── Layouts/
│   ├── AuthenticatedLayout.jsx  # Wood-textured navbar for logged-in users
│   └── GuestLayout.jsx         # Corkboard background for login/register
├── Pages/
│   ├── Posts/
│   │   ├── Index.jsx        # Main feed with map, filters, 3-column card grid
│   │   ├── Show.jsx         # Post detail with map and comments
│   │   ├── Create.jsx       # Create post page
│   │   └── Edit.jsx         # Edit post page
│   └── Auth/
│       ├── Login.jsx        # Bulletin board themed login
│       └── Register.jsx     # Bulletin board themed registration
└── utils/
    └── relativeTime.js      # "2 hours ago" time formatting

resources/css/
└── app.css                  # Corkboard texture, wood nav, paper-note, push-pin styles

app/
├── Models/Post.php          # Post model with latitude/longitude
├── Http/
│   ├── Controllers/PostController.php
│   └── Requests/
│       ├── StorePostRequest.php   # Validation including lat/lng
│       └── UpdatePostRequest.php
└── Enums/
    ├── PostCategory.php
    └── PostStatus.php
```

---

## Tech Stack

- **Backend:** Laravel 11, PHP 8.4
- **Frontend:** React 18, Inertia.js, Tailwind CSS
- **Maps:** Leaflet + react-leaflet (OpenStreetMap tiles)
- **Build:** Vite
- **Theme:** Custom corkboard/bulletin board CSS (no external images)

---

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
