const { join } = require("path");

const PORT = 3000;

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;
    
    if (filePath === "/" || filePath === "") {
      filePath = "/index.html";
    }
    
    // Resolve path inside the workspace
    const absolutePath = join(process.cwd(), filePath);
    
    try {
      const file = Bun.file(absolutePath);
      if (await file.exists()) {
        return new Response(file);
      }
    } catch (e) {
      // Serve error or 404
    }
    
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Dev server running at http://localhost:${PORT}`);
