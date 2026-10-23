# Savoria - Gourmet Food Delivery Platform

A modern, high-performance static food ordering web platform featuring artisan cuisines, multi-restaurant discovery, real-time cart and coupon checkout, and live simulated GPS delivery tracking. Built with Tailwind CSS v4, Font Awesome 6 icons, vanilla JavaScript client-side state management, and ready to serve with Bun or Apache.

---

## 🚀 Running with Bun (Static Server)

The project includes an ultra-fast static file server implemented in [index.ts](file:///d:/projects/static-websites/index.ts) using `Bun.serve()` and `Bun.file()` with automatic MIME detection, clean URL resolution, directory traversal protection, and fallback routing.

### Start the Server
```bash
# Using Bun inside WSL or terminal:
bun run start
# or with live reloading on file changes:
bun run dev
# or direct script execution:
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

This website is built with 100% relative paths and self-contained static assets, meaning it works out of the box on **any Apache HTTP Server** without requiring any build step or node runtime on the production host.

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
- **Clean URLs**: Automatically rewrites `/pages/menu` to `/pages/menu.html` if accessed without extension
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

## 🍽️ Key Website Features & Pages

- **Interactive Menu & Food Filtering ([pages/menu.html](file:///d:/projects/static-websites/pages/menu.html))**: 18 curated artisan dishes across Italian, Japanese, American, Mexican, Healthy, and Desserts. Category filter pills, dietary filters (Vegetarian, Spicy, Chef's pick), sort by price/rating/popularity, and dish details modal with kitchen preparation notes.
- **Persistent Cart & Checkout ([pages/cart.html](file:///d:/projects/static-websites/pages/cart.html))**: `localStorage`-backed shopping cart with quantity management, tip selector ($0, $3, $5, $8), promo coupon system (`FEAST20` for 20% off), delivery address form, contactless delivery options, and instant order generation.
- **Simulated Live GPS Order Tracker ([pages/order-tracking.html](file:///d:/projects/static-websites/pages/order-tracking.html))**: Real-time 4-stage tracking stepper (Order Confirmed → Sizzling in Kitchen → On The Way → Delivered) with dynamic countdown timer, courier contact card, and animated GPS route map mockup.
- **Kitchen Partner Directory ([pages/restaurants.html](file:///d:/projects/static-websites/pages/restaurants.html))**: Profiles of curated independent culinary partners (Trattoria Bella, Tokyo Drift, The Smokehouse, Cantina Fuego, The Green Bowl Co, Dolce & Crema) with ratings, prep times, and direct menu filters.
- **Brand Story & Ethics ([pages/about.html](file:///d:/projects/static-websites/pages/about.html))**: Savoria origin story, farm-to-table ethics, thermal packaging technology, and hygiene standards.
- **Customer Support & Kitchen Inquiries ([pages/contact.html](file:///d:/projects/static-websites/pages/contact.html))**: 24/7 hotline directory, partner restaurant application form, and instant feedback toast.
- **Food Delivery FAQ ([pages/faq.html](file:///d:/projects/static-websites/pages/faq.html))**: Accordion help center covering delivery speed, 100% Hot Food Guarantee, allergy and dietary safety, and refund policies.
- **Foodie Club Authentication ([pages/login.html](file:///d:/projects/static-websites/pages/login.html), [pages/signup.html](file:///d:/projects/static-websites/pages/signup.html))**: Member sign-in with 1-click test evaluation credentials and loyalty points badge.
- **Food Safety & Terms ([pages/ToS_and_Privacy.html](file:///d:/projects/static-websites/pages/ToS_and_Privacy.html))**: Transparent food handling compliance, hygiene standards, and customer privacy terms.

---

## 📁 Project Structure

```
├── .htaccess                 # Apache web server configuration
├── index.html                # Homepage with cuisine categories, popular dishes, and live tracker teaser
├── index.ts                  # Bun static server (Bun.serve)
├── input.css                 # Tailwind CSS v4 input file
├── output.css                # Compiled minified Tailwind CSS
├── package.json              # Bun dependencies & build scripts
├── js/
│   └── main.js               # Shared FOOD_CART, FOOD_AUTH, toast notifications, mobile drawer
└── pages/
    ├── about.html            # Brand story, thermal packaging tech, hygiene standards
    ├── cart.html             # Persistent cart, promo code (FEAST20), checkout & tip wizard
    ├── contact.html          # Support hotline & restaurant partner inquiry
    ├── faq.html              # Accordion FAQ with topics & search
    ├── login.html            # Foodie rewards login with 1-click demo button
    ├── menu.html             # 18 artisan dishes, category & dietary filters, dish modal
    ├── order-tracking.html   # 4-stage live order tracker simulator with animated courier map
    ├── restaurants.html      # Artisan culinary kitchen partner directory
    ├── signup.html           # Free foodie rewards membership signup
    └── ToS_and_Privacy.html  # Food safety guidelines, terms of service, privacy policy
```
