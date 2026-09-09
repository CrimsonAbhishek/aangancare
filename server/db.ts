import { desc, eq } from "drizzle-orm";
import { InsertUser, InsertServiceRequest, serviceRequests, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let dbInstance: any = null;

export async function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!dbInstance) {
    const { drizzle } = await import("drizzle-orm/mysql2");
    dbInstance = drizzle(process.env.DATABASE_URL);
  }

  return dbInstance;
}
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  const values: InsertUser = {
    openId: user.openId,
    name: user.name ?? null,
    email: user.email ?? null,
    loginMethod: user.loginMethod ?? null,
    role: user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user"),
    lastSignedIn: user.lastSignedIn ?? new Date(),
  };
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: { name: values.name, email: values.email, loginMethod: values.loginMethod, role: values.role, lastSignedIn: values.lastSignedIn } });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function createServiceRequest(request: InsertServiceRequest) {
  const db = await getDb();
  if (!db) return null;
  await db.insert(serviceRequests).values(request);
  const result = await db.select().from(serviceRequests).where(eq(serviceRequests.publicReference, request.publicReference)).limit(1);
  return result[0] ?? null;
}

export async function listRecentRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt)).limit(50);
}
