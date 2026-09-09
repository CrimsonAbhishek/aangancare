import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

export default async function handler(req: any, res: any) {
  const rawPath = req.query?.path;

  const path = Array.isArray(rawPath)
    ? rawPath.join("/")
    : typeof rawPath === "string"
      ? rawPath
      : "";

  if (!path) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Missing tRPC path" }));
    return;
  }

  await nodeHTTPRequestHandler({
    req,
    res,
    path,
    router: appRouter,
    createContext,
  });
}
