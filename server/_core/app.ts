import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";


function applySecurityHeaders(app: Express) {
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https:;"
    );
    next();
  });
}

export function createApp() {
  const app = express();
  applySecurityHeaders(app);
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  app.get("/api/health", (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get("/api/health/app", async (_req, res) => {
    try {
      const { appRouter } = await import("../routers");
      const { createContext } = await import("./context");
      if (!appRouter || !createContext) throw new Error("Missing modules");
      if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) throw new Error("Missing configuration");
      res.status(200).json({ ok: true });
    } catch {
      res.status(500).json({ ok: false, error: "application_not_ready" });
    }
  });

  registerStorageProxy(app);
  registerOAuthRoutes(app);


  return app;
}

export const app = createApp();
