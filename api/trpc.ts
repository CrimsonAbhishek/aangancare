import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

export default async function handler(req: any, res: any) {
  const rawUrl = typeof req.url === "string" ? req.url : "/api/trpc";
  const parsedUrl = new URL(rawUrl, "https://vercel.local");
  const rawQueryPath = Array.isArray(req.query?.path) ? req.query.path.join("/") : req.query?.path;
  const procedurePath = rawQueryPath || parsedUrl.searchParams.get("path") || parsedUrl.pathname.match(/^\/api\/trpc\/(.+)$/)?.[1];

  if (typeof procedurePath !== "string" || procedurePath.length === 0) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Missing tRPC procedure path" }));
    return;
  }

  await nodeHTTPRequestHandler({
    req,
    res,
    path: procedurePath,
    router: appRouter,
    createContext,
  });
}
