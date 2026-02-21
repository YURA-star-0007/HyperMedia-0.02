import express from "express";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Spotify OAuth Configuration
  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  
  const getRedirectUri = (req: express.Request) => {
    // Use the APP_URL if provided, otherwise fallback to host header (less reliable)
    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    return `${baseUrl}/auth/spotify/callback`;
  };

  // Spotify Auth URL
  app.get("/api/auth/spotify/url", (req, res) => {
    const redirectUri = getRedirectUri(req);
    const scope = "user-read-private user-read-email user-library-read playlist-read-private streaming user-modify-playback-state user-read-playback-state";
    
    const params = new URLSearchParams({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID || "",
      scope: scope,
      redirect_uri: redirectUri,
    });

    res.json({ url: `https://accounts.spotify.com/authorize?${params.toString()}` });
  });

  // Spotify Callback
  app.get("/auth/spotify/callback", async (req, res) => {
    const code = req.query.code as string;
    const redirectUri = getRedirectUri(req);

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
          },
        }
      );

      const { access_token, refresh_token, expires_in } = response.data;

      // Set cookies with SameSite=None and Secure for iframe support
      res.cookie("spotify_access_token", access_token, {
        maxAge: expires_in * 1000,
        httpOnly: false, // Allow client to read for SDK
        sameSite: "none",
        secure: true,
      });
      
      res.cookie("spotify_refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', provider: 'spotify' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error: any) {
      console.error("Spotify Auth Error:", error.response?.data || error.message);
      res.status(500).send("Authentication failed");
    }
  });

  // API to check auth status
  app.get("/api/auth/spotify/status", (req, res) => {
    const token = req.cookies.spotify_access_token;
    res.json({ isAuthenticated: !!token });
  });

  // Fetch Spotify Playlists
  app.get("/api/spotify/playlists", async (req, res) => {
    const token = req.cookies.spotify_access_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${token}` }
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Failed to fetch playlists" });
    }
  });

  // Search Spotify Tracks
  app.get("/api/spotify/search", async (req, res) => {
    const token = req.cookies.spotify_access_token;
    const { q } = req.query;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        params: { q, type: "track", limit: 10 },
        headers: { Authorization: `Bearer ${token}` }
      });
      res.json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: "Search failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
