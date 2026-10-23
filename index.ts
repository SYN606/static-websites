import { serve } from "bun";

const PORT = Number(process.env.PORT) || 3000;

const server = Bun.serve({
  port: PORT,
  development: process.env.NODE_ENV !== "production",
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    // Prevent directory traversal attacks
    if (pathname.includes("..")) {
      return new Response("Forbidden", { status: 403 });
    }

    // Normalize root and directory requests to index.html
    if (pathname === "/" || pathname.endsWith("/")) {
      pathname += "index.html";
    }

    // Try serving the exact file requested
    let file = Bun.file("." + pathname);
    if (await file.exists()) {
      return new Response(file);
    }

    // Check clean URLs (e.g. /pages/menu -> /pages/menu.html)
    if (!pathname.includes(".")) {
      const htmlFile = Bun.file("." + pathname + ".html");
      if (await htmlFile.exists()) {
        return new Response(htmlFile);
      }
      const dirIndex = Bun.file("." + pathname + "/index.html");
      if (await dirIndex.exists()) {
        return new Response(dirIndex);
      }
    }

    // Return friendly 404 page
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Dish Not Found | Savoria</title>
  <link rel="stylesheet" href="/output.css">
</head>
<body class="bg-stone-50 flex items-center justify-center min-h-screen text-center p-6">
  <div class="max-w-md bg-white p-8 rounded-3xl shadow-xl border border-stone-200">
    <h1 class="text-6xl font-black text-amber-600 mb-2">404</h1>
    <h2 class="text-xl font-bold text-stone-800 mb-2">Dish Not on the Menu</h2>
    <p class="text-xs text-stone-500 mb-6">The page or culinary feast you requested does not exist or has moved.</p>
    <a href="/index.html" class="px-5 py-2.5 bg-amber-500 text-stone-950 text-xs font-bold rounded-xl shadow hover:bg-amber-600 transition">Return to Kitchen</a>
  </div>
</body>
</html>`,
      {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
});

console.log(`🚀 Savoria Food Delivery server running at http://localhost:${server.port}`);
