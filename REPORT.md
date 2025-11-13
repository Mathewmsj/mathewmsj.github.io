# Project Report

## Overview

This is a personal portfolio website built with Vue.js 3 and Vite. The website showcases projects, skills, blog posts, and personal information in a responsive, modern design. All dynamic content is loaded from local JSON files.

## Project Structure

```
/
├── public/
│   ├── data/
│   │   ├── projects.json      # Project data (6 projects)
│   │   ├── blog.json          # Blog posts data (4 posts)
│   │   └── skills.json        # Skills data (optional)
│   └── vite.svg
├── src/
│   ├── assets/                # Static assets
│   ├── components/
│   │   └── Navbar.vue         # Persistent navigation component
│   ├── config/
│   │   └── site.js            # Site configuration (personal info, navigation, etc.)
│   ├── router/
│   │   └── index.js          # Vue Router configuration
│   ├── views/
│   │   ├── Home.vue          # Homepage with welcome message
│   │   ├── About.vue         # Personal introduction page (includes Skills/Resume content)
│   │   ├── Projects.vue      # Projects list page
│   │   ├── ProjectDetail.vue # Individual project detail page
│   │   ├── Blog.vue          # Blog posts list page
│   │   ├── BlogPost.vue      # Individual blog post page
│   │   └── Links.vue         # External links page
│   ├── App.vue               # Root component
│   ├── main.js               # Application entry point
│   └── style.css             # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment workflow
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── PROMPTS.md               # AI prompts documentation
└── REPORT.md                # This file
```

## File Descriptions

### Core Application Files

#### `src/main.js`
- **Purpose:** Application entry point
- **Key Features:**
  - Imports Vue 3 and creates the app instance
  - Imports and registers Vue Router
  - Mounts the app to the DOM
- **Dependencies:** Vue, Vue Router

#### `src/App.vue`
- **Purpose:** Root component that defines the overall layout
- **Key Features:**
  - Contains the persistent Navbar component
  - Provides router-view for page content
  - Includes footer with copyright information
  - Sets up global layout structure (flexbox for sticky footer)
- **Components Used:** Navbar

#### `src/router/index.js`
- **Purpose:** Vue Router configuration
- **Key Features:**
  - Defines all routes: Home, About, Projects, ProjectDetail, Blog, BlogPost, Links
  - Uses `createWebHashHistory` for GitHub Pages compatibility (avoids 404 errors)
  - Enables props for dynamic routes (ProjectDetail, BlogPost)
- **Routes:**
  - `/` → Home
  - `/about` → About (includes Skills/Resume content)
  - `/projects` → Projects (list)
  - `/projects/:id` → ProjectDetail (dynamic)
  - `/blog` → Blog (list)
  - `/blog/:id` → BlogPost (dynamic)
  - `/links` → Links

#### `src/config/site.js`
- **Purpose:** Centralized site configuration file
- **Key Features:**
  - Stores all personal information (name, title, description, avatar)
  - Contains navigation menu items
  - Includes About page content (education, skills, awards, interests)
  - Stores Links page data
  - Contains site meta information
- **Benefits:** Easy to update site content without modifying components

### Components

#### `src/components/Navbar.vue`
- **Purpose:** Persistent navigation bar at the top of every page
- **Key Features:**
  - Sticky positioning (stays at top when scrolling)
  - Responsive hamburger menu for mobile devices
  - Active route highlighting using `router-link-active`
  - Smooth transitions and hover effects
- **Responsive:** Collapses to hamburger menu on screens < 768px

### Views

#### `src/views/Home.vue`
- **Purpose:** Landing page with welcome message and quick links
- **Key Features:**
  - Displays avatar image (GitHub profile picture)
  - Welcome message with name and tagline
  - Quick action buttons linking to Projects, Skills, and About pages
  - Gradient background for visual appeal
- **Data Source:** Static content

#### `src/views/About.vue`
- **Purpose:** Detailed personal introduction, skills, education, and awards
- **Key Features:**
  - Personal aspirations statement
  - Education section (school, period, GPA, courses)
  - Technical skills with animated progress bars
  - Awards & Achievements grid
  - Skills & Interests tags
  - All data loaded from `siteConfig`
- **Data Source:** `src/config/site.js`

#### `src/views/Skills.vue`
- **Purpose:** (Note: Skills content has been integrated into About.vue)
- **Status:** File exists but is not currently used in routing
- **Note:** All skills, education, and awards are now displayed in the About page

#### `src/views/Projects.vue`
- **Purpose:** Display list of all projects in card format
- **Key Features:**
  - Fetches projects from `/data/projects.json` on mount
  - Displays projects in responsive grid layout
  - Each card shows: name, role, time, description, technologies, links
  - Clicking a card navigates to ProjectDetail page
  - Loading and error states
- **Data Source:** `/public/data/projects.json` (async fetch)
- **Navigation:** Routes to `/projects/:id` on card click

#### `src/views/ProjectDetail.vue`
- **Purpose:** Display detailed information about a single project
- **Key Features:**
  - Fetches all projects and filters by route parameter (id)
  - Shows full project description, technologies, contribution
  - Displays project image (if available)
  - Links to GitHub, demo, and video (if available)
  - Back button to return to projects list
- **Data Source:** `/public/data/projects.json` (async fetch)
- **Route Parameter:** `:id` (project ID)

#### `src/views/Blog.vue`
- **Purpose:** Display list of all blog posts
- **Key Features:**
  - Fetches posts from `/data/blog.json` on mount
  - Displays posts sorted by date (newest first)
  - Shows title, date, and excerpt (first 150 characters)
  - Clicking a post navigates to BlogPost page
  - Loading and error states
- **Data Source:** `/public/data/blog.json` (async fetch)
- **Navigation:** Routes to `/blog/:id` on post click

#### `src/views/BlogPost.vue`
- **Purpose:** Display full blog post content
- **Key Features:**
  - Fetches all posts and filters by route parameter (id)
  - Formats date in readable format
  - Converts newline characters to HTML paragraphs
  - Back button to return to blog list
- **Data Source:** `/public/data/blog.json` (async fetch)
- **Route Parameter:** `:id` (post ID)

#### `src/views/Links.vue`
- **Purpose:** Display external links and resources
- **Key Features:**
  - Displays links in responsive grid layout
  - Each link shows title, description, and arrow indicator
  - Links open in new tab
  - Hover effects with smooth transitions
- **Data Source:** `src/config/site.js` (siteConfig.links)

### Data Files

#### `public/data/projects.json`
- **Purpose:** Store all project information
- **Structure:**
  - Array of project objects
  - Each project has: id, name, role, time, description, technologies (array), github, video, image, contribution
  - 6 projects total
- **Usage:** Fetched by Projects.vue and ProjectDetail.vue

#### `public/data/blog.json`
- **Purpose:** Store all blog posts
- **Structure:**
  - Array of post objects
  - Each post has: id, title, date (ISO format), content (multi-paragraph text with \n)
  - 4 posts total
- **Usage:** Fetched by Blog.vue and BlogPost.vue

#### `public/data/skills.json`
- **Purpose:** Store skills data (optional, currently not used)
- **Structure:**
  - Array of skill objects with name, level, category
- **Note:** Skills are currently hardcoded in Skills.vue, but this file is available for future use

## Key Features

### Responsive Design
- Mobile-first approach with breakpoint at 768px
- Hamburger menu for mobile navigation
- Flexible grid layouts that adapt to screen size
- Touch-friendly button sizes

### Dynamic Content Loading
- Projects and blog posts loaded asynchronously from JSON files
- Loading states while fetching data
- Error handling with user-friendly messages
- No external API dependencies

### Navigation
- Persistent navbar on all pages
- Active route highlighting
- Smooth transitions between pages
- Back buttons on detail pages

### Visual Design
- Modern gradient backgrounds
- Card-based layouts with hover effects
- Animated skill progress bars
- Consistent color scheme (#2c3e50, #42b883, #667eea)

## Technologies Used

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Client-side routing
- **Vite** - Fast build tool and dev server
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Styling with flexbox, grid, transitions
- **JSON** - Data storage format

## Development Workflow

1. **Setup:** Initialize Vite + Vue 3 project
2. **Routing:** Configure Vue Router with all routes
3. **Components:** Build Navbar and all view components
4. **Data:** Create JSON files with project and blog data
5. **Styling:** Add responsive CSS and animations
6. **Testing:** Test all routes and dynamic content loading
7. **Documentation:** Create PROMPTS.md and REPORT.md

## Future Enhancements

- Add image optimization and lazy loading
- Implement search functionality for projects/blog
- Add dark mode toggle
- Create reusable card components
- Add animations using Vue transitions
- Integrate GitHub API for live repository data
- Add contact form
- Implement blog post categories/tags

## Deployment

The website is deployed to **GitHub Pages**:
- **Repository:** https://github.com/Mathewmsj/MyWeb
- **Live URL:** https://mathewmsj.github.io/MyWeb/
- **Deployment Method:** GitHub Actions automatic deployment
- **Workflow:** `.github/workflows/deploy.yml` automatically builds and deploys on push to main branch
- **Configuration:** Uses hash-based routing (`createWebHashHistory`) for GitHub Pages compatibility
- **Asset Paths:** All assets use `import.meta.env.BASE_URL` for proper routing

### Deployment Process:
1. Code is pushed to `main` branch
2. GitHub Actions workflow triggers automatically
3. Builds the project using `npm run build`
4. Deploys `dist/` folder to `gh-pages` branch
5. GitHub Pages serves the site from `gh-pages` branch

Build command: `npm run build`
Output directory: `dist/`

