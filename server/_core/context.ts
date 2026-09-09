import type { IncomingMessage, ServerResponse } from "node:http";
import type { User } from "../../drizzle/schema";

export type TrpcContext = {
  req: IncomingMessage;
  res: ServerResponse;
  user: User | null;
};

type ContextOptions = {
  req: IncomingMessage;
  res: ServerResponse;
};

export async function createContext({ req, res }: ContextOptions): Promise<TrpcContext> {
  let user = null;

  const cookieHeader = req.headers.cookie;

  if (cookieHeader) {
    const { sdk } = await import("./sdk");

    try {
      user = await sdk.authenticateRequest(req);
    } catch {
      user = null;
    }
  }

  return { req, res, user };
}
