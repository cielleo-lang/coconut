import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Claude Proxy
  // Note: The user mentioned 'coco' is Claude Code on VPS.
  // We'll provide a placeholder endpoint that the user can map to their VPS.
  app.post("/api/claude/chat", async (req, res) => {
    // This would typically proxy to the user's VPS
    res.json({ 
      content: "This is a response from Coco (Mocked). Connect your VPS in server.ts to enable real chat.",
      tool_calls: [],
      thought_process: "Thinking about the user's request...",
      tokens: 42,
      thinking_time: 1.2
    });
  });

  // API Route: Music Proxy (NetEase Cloud Music)
  app.get("/api/music/search", (req, res) => {
    res.json({ results: [] });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
