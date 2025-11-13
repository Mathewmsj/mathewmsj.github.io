# PROMPTS.md

This file documents all key prompts I used to generate code, debug, or refactor during the development of this personal website project.

## Project Setup

### Prompt 1: Vue Router Setup
**Prompt:** "How do I set up Vue Router 4 in a Vite + Vue 3 project? I need to create routes for Home, About, Skills, Projects, ProjectDetail, Blog, BlogPost, and Links pages."

**Modifications Made:**
- Created `src/router/index.js` with all required routes
- Updated `src/main.js` to use the router
- Used `createWebHistory` for clean URLs
- Added props: true for dynamic routes to pass route params as props

### Prompt 2: Persistent Navigation Bar
**Prompt:** "Create a responsive navigation bar component for Vue 3 that stays at the top, has a mobile hamburger menu, and highlights the active route."

**Modifications Made:**
- Created `src/components/Navbar.vue` with sticky positioning
- Added mobile-responsive hamburger menu with toggle functionality
- Used `router-link-active` class for active route highlighting
- Customized colors to match the site theme (#2c3e50, #42b883)
- Added smooth transitions and hover effects

## Dynamic Content Loading

### Prompt 3: Fetching JSON Data in Vue
**Prompt:** "How do I asynchronously load a local JSON file in Vue 3? I need to fetch projects.json from the public folder and display them in a component."

**Modifications Made:**
- Used `fetch()` API with async/await in `onMounted` lifecycle hook
- Added loading and error states
- Created `Projects.vue` component that fetches from `/data/projects.json`
- Implemented error handling with try-catch blocks
- Added loading indicators for better UX

### Prompt 4: Dynamic Routes with JSON Data
**Prompt:** "How do I create a detail page in Vue Router that loads data from JSON based on the route parameter? I need to show project details when clicking on a project card."

**Modifications Made:**
- Created `ProjectDetail.vue` that uses `useRoute()` to get the ID parameter
- Fetches all projects and filters by ID
- Added error handling for missing projects
- Implemented back button navigation using `useRouter()`
- Used the same JSON file but filtered client-side

## Component Development

### Prompt 5: Skill Bars Animation
**Prompt:** "How can I create animated skill progress bars in Vue 3 that animate when the component mounts?"

**Modifications Made:**
- Created skill bars in `Skills.vue` with CSS transitions
- Used `onMounted` hook to trigger animation
- Set initial width to 0% and animate to target width
- Added `data-level` attribute for dynamic width calculation
- Used CSS `transition` property for smooth animation

### Prompt 6: Responsive Grid Layout
**Prompt:** "How do I create a responsive grid layout in CSS that works on both desktop and mobile? I need to display project cards in a grid."

**Modifications Made:**
- Used CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))`
- Added media queries for mobile (single column)
- Applied to Projects, Blog, and Links pages
- Ensured cards are flexible and maintain aspect ratios

## Styling & Design

### Prompt 7: Modern Card Design
**Prompt:** "Create a modern card component design with hover effects, shadows, and smooth transitions using CSS."

**Modifications Made:**
- Added `box-shadow` for depth
- Implemented `transform: translateY()` on hover
- Used `transition` for smooth animations
- Created gradient backgrounds for visual appeal
- Added border-radius for rounded corners

### Prompt 8: Mobile-First Responsive Design
**Prompt:** "How do I make my Vue website fully responsive for mobile devices? I need breakpoints and mobile-friendly navigation."

**Modifications Made:**
- Added media queries at 768px breakpoint
- Created hamburger menu for mobile navigation
- Adjusted font sizes for mobile (rem units)
- Made buttons and cards stack vertically on mobile
- Ensured touch-friendly button sizes (min 44px)

## Data Structure

### Prompt 9: JSON Data Structure Design
**Prompt:** "What's the best JSON structure for storing project data that includes name, description, technologies, GitHub links, and images?"

**Modifications Made:**
- Created `projects.json` with id, name, role, time, description, technologies array
- Added optional fields: github, demo, video, image, contribution
- Ensured all required fields are present
- Used consistent naming conventions (camelCase)
- Added meaningful descriptions for each project

### Prompt 10: Blog Post JSON Structure
**Prompt:** "Design a JSON structure for blog posts that includes title, date, and content. The content should support multi-paragraph text."

**Modifications Made:**
- Created `blog.json` with id, title, date (ISO format), and content
- Used newline characters (\n) to separate paragraphs
- Implemented date formatting function in `BlogPost.vue`
- Added excerpt generation for list view (first 150 characters)
- Sorted posts by date (newest first)

## Code Optimization

### Prompt 11: Component Reusability
**Prompt:** "How can I avoid code duplication when displaying project cards in both the list and detail views?"

**Modifications Made:**
- Kept separate components (Projects.vue and ProjectDetail.vue) for different layouts
- Shared the same JSON data source
- Created reusable CSS classes for common styles
- Used consistent data structure across components

### Prompt 12: Error Handling Best Practices
**Prompt:** "What's the best way to handle errors when fetching JSON data in Vue components? I need user-friendly error messages."

**Modifications Made:**
- Added try-catch blocks around all fetch operations
- Created error state variables
- Displayed user-friendly error messages
- Added fallback UI for loading and error states
- Logged errors to console for debugging

## Deployment & Configuration

### Prompt 13: GitHub Pages Deployment
**Prompt:** "How do I deploy a Vite + Vue 3 project to GitHub Pages? I need to configure the base path and set up automatic deployment."

**Modifications Made:**
- Created `.github/workflows/deploy.yml` for GitHub Actions
- Configured `vite.config.js` with `base: '/MyWeb/'` (later changed to `/`)
- Changed router from `createWebHistory` to `createWebHashHistory` to avoid 404 errors
- Fixed all asset paths to use `import.meta.env.BASE_URL` for proper GitHub Pages routing
- Set up automatic deployment on push to main branch

### Prompt 14: Fixing Image Paths for GitHub Pages
**Prompt:** "My images are not loading on GitHub Pages. How do I fix image paths to work with the base URL?"

**Modifications Made:**
- Updated all `fetch()` calls to use `${import.meta.env.BASE_URL}data/...`
- Fixed image paths in projects.json by processing them dynamically
- Changed CSS background-image to use Vue computed properties
- Fixed template expressions to avoid `import.meta` in template (used ref/computed instead)

### Prompt 15: Extracting Hardcoded Data to Configuration
**Prompt:** "How can I move all hardcoded personal information from Vue components to a central configuration file?"

**Modifications Made:**
- Created `src/config/site.js` to store all site configuration
- Moved personal info, navigation items, links, skills, awards, education data to config
- Updated all components to import and use `siteConfig`
- Made components more maintainable and data-driven

## Notes

- All prompts were adapted to fit the specific requirements of this project
- Variable names, component structure, and styling were customized to match the project's design
- Code was tested and modified based on actual requirements, not just copy-pasted
- Each component was built incrementally, testing functionality at each step
- Configuration file approach makes it easy to update site content without modifying components

