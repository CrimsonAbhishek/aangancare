import { app } from "../server/_core/app";

export default function handler(req: any, res: any) {
  const rawUrl = typeof req.url === "string" ? req.url : "/api/trpc";
  const parsedUrl = new URL(rawUrl, "https://vercel.local");
  const rawQueryPath = Array.isArray(req.query?.path) ? req.query.path.join("/") : req.query?.path;
  const procedurePath = rawQueryPath || parsedUrl.searchParams.get("path") || parsedUrl.pathname.match(/^\/api\/trpc\/(.+)$/)?.[1];
  if (typeof procedurePath === "string" && procedurePath.length > 0) {
    const query = new URLSearchParams(parsedUrl.searchParams);
    query.delete("path");
    const queryString = query.toString();
    req.url = `/api/trpc/${procedurePath}${queryString ? `?${queryString}` : ""}`;
  }
  return app(req, res);
}
