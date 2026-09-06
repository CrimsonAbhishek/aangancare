import { app } from "../server/_core/app";

export default function handler(req: any, res: any) {
  const procedurePath = Array.isArray(req.query?.path) ? req.query.path.join("/") : req.query?.path;
  if (typeof procedurePath === "string" && procedurePath.length > 0) {
    const query = new URLSearchParams(req.query as Record<string, string>);
    query.delete("path");
    const queryString = query.toString();
    req.url = `/api/trpc/${procedurePath}${queryString ? `?${queryString}` : ""}`;
  }
  return app(req, res);
}
