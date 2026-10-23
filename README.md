# Voyage Vista - Luxury Worldwide Travel Website

A modern, fast, static travel website with custom Tailwind CSS v4 styling, Font Awesome 6 icons, and interactive client-side booking and authentication modules.

---

## 🚀 Running with Bun (Static Server)

The project includes a high-performance static file server implemented in [index.ts](file:///d:/projects/static-websites/index.ts) using `Bun.serve()` and `Bun.file()` with automatic MIME detection, clean URL resolution, directory traversal protection, and fallback routing.

### Start the Server
```bash
# Using Bun inside WSL or terminal:
bun run start
# or:
bun run dev      # with auto-restart on file change
# or:
bun run index.ts
```
The site will be immediately live at:
👉 **`http://localhost:3000`**

To specify a custom port:
```bash
PORT=8080 bun run start
```

---

## 🌐 Running with Apache (XAMPP / WAMP / Linux Apache)

This website is built with 100% relative paths and self-contained static assets, meaning it works out of the box on **any Apache HTTP Server** without any build step or node runtime needed on the production host.

### 1. Copy Files to Apache Web Root
- **XAMPP (Windows):** Copy the project folder into `C:\xampp\htdocs\static-websites\` or directly into `C:\xampp\htdocs\`
- **WAMP (Windows):** Copy into `C:\wamp64\www\static-websites\`
- **Linux (Ubuntu/Debian):** Copy into `/var/www/html/`

### 2. Built-in [.htaccess](file:///d:/projects/static-websites/.htaccess)
The included [.htaccess](file:///d:/projects/static-websites/.htaccess) file automatically configures:
- **DirectoryIndex**: Automatically routes `/` to `index.html`
- **MIME Types**: Explicit support for `.webp`, `.css`, `.js`, `.json`, `.svg`, `.woff2`
- **Compression**: Enables `mod_deflate` Gzip for HTML, CSS, JS, and JSON
- **Browser Caching**: Enables `mod_expires` for high-speed repeated page loads
- **Clean URLs**: Automatically rewrites `/pages/packages` to `/pages/packages.html` if accessed without extension
- **Root Image Alias**: Automatically maps `/img/*` to `/pages/img/*`
- **Security**: Disables directory listing (`Options -Indexes`) and sets `X-Content-Type-Options: nosniff`

---

## 🎨 Compiling Tailwind CSS with Bun

Whenever you modify Tailwind utility classes in any HTML or JS file, recompile [output.css](file:///d:/projects/static-websites/output.css):

```bash
# One-time minified production build:
bun run build:css

# Live watch mode during editing:
bun run watch:css
```

---

## 📁 Project Structure

```
├── .htaccess                 # Apache web server configuration
├── index.html                # Homepage with hero search, destination tabs, reviews
├── index.ts                  # Bun static server (Bun.serve)
├── input.css                 # Tailwind CSS v4 input file
├── output.css                # Compiled minified Tailwind CSS
├── package.json              # Bun dependencies & scripts
├── js/
│   └── main.js               # Shared authentication, toast notifications, modals
└── pages/
    ├── about.html            # Company mission, stats, leadership
    ├── blog.html             # Travel articles with interactive reading modal
    ├── booking.html          # Dynamic trip planner with pricing calculator
    ├── contact.html          # Contact form with inquiry toaster
    ├── faq.html              # Searchable accordion FAQ with topic filter tabs
    ├── gallery.html          # Worldwide photo gallery with full-screen lightbox
    ├── login.html            # Member sign-in with 1-click test demo login
    ├── packages.html         # Holiday packages with filter tabs & itineraries
    ├── signup.html           # Free member registration
    ├── ToS_and_Privacy.html  # Terms of service and privacy policy
    ├── destinations/
    │   ├── dest.html         # Continents directory
    │   ├── africa.html       # Cairo, Cape Town, Dubai guides
    │   ├── america.html      # New York, Machu Picchu, Rio guides
    │   ├── asia.html         # Kyoto, Bali, Bangkok, Maldives guides
    │   ├── europe.html       # Paris, Rome, Venice, Santorini guides
    │   └── oceania.html      # Sydney, Great Barrier Reef, New Zealand guides
    └── img/                  # High-resolution optimized WebP images
```
