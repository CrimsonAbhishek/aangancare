import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitEntries = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 120;

function getClientKey(req: Request) {
  const forwarded = req.headers["x-forwarded-for"];
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return (firstForwarded || req.ip || "unknown").trim();
}

function apiRateLimit(req: Request, res: Response, next: NextFunction) {
  const now = Date.now();
  const key = getClientKey(req);
  const existing = rateLimitEntries.get(key);
  const entry = !existing || existing.resetAt <= now
    ? { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }
    : existing;

  entry.count += 1;
  rateLimitEntries.set(key, entry);

  if (rateLimitEntries.size > 5000) {
    rateLimitEntries.forEach((storedEntry, storedKey) => {
      if (storedEntry.resetAt <= now) rateLimitEntries.delete(storedKey);
    });
  }

  res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX_REQUESTS);
  res.setHeader("X-RateLimit-Remaining", Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count));

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    res.setHeader("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
    res.status(429).json({ error: "Too many requests. Please try again shortly." });
    return;
  }

  next();
}

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

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  app.use("/api/trpc", apiRateLimit, createExpressMiddleware({
    router: appRouter,
    createContext,
  }));

  return app;
}

export const app = createApp();
