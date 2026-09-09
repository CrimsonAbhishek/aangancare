import { customAlphabet } from "nanoid";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createServiceRequest, listRecentRequests } from "./db";

export const PRIVACY_POLICY_VERSION = "2026-09-07-draft";
export const TERMS_VERSION = "2026-09-07-draft";

const requestInput = z.object({
  urgency: z.enum(["immediate", "planned"]),
  services: z.array(z.string()).min(1).max(8),
  city: z.string().trim().min(2).max(120),
  timing: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(7).max(40),
  email: z.string().email().max(320).optional().or(z.literal("")),
  notes: z.string().max(2000).optional(),
  consentToProcess: z.literal(true),
  termsAcknowledged: z.literal(true),
  website_url: z.string().optional(),
});

const createReference = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  requests: router({
    create: publicProcedure.input(requestInput).mutation(async ({ input, ctx }) => {
      // 1. Origin and CSRF Protection
      const origin = ctx.req.headers.origin;
      const referer = ctx.req.headers.referer;
      
      if (origin) {
        const allowedOrigins = ["https://aangancare.vercel.app", "http://localhost:3000", "http://localhost:5173"];
        if (!allowedOrigins.includes(origin)) {
          throw new Error("Invalid Origin");
        }
      } else if (referer) {
        if (!referer.startsWith("https://aangancare.vercel.app/") && !referer.startsWith("http://localhost:")) {
          throw new Error("Invalid Referer");
        }
      }

      // Spam protection: silently reject bot submissions that filled the honeypot
      if (input.website_url) {
        return { referenceNumber: `AC-${createReference()}` };
      }

      // 2. Rate Limiting via Vercel KV
      const forwarded = ctx.req.headers["x-forwarded-for"];
      const ip = (Array.isArray(forwarded) ? forwarded[0] : typeof forwarded === "string" ? forwarded.split(",")[0] : null) || "unknown";
      
      try {
        const { kv } = await import("@vercel/kv");
        const key = `rate-limit:request:${ip}`;
        const current = await kv.incr(key);
        if (current === 1) {
          await kv.expire(key, 60); // 1 minute window
        }
        if (current > 5) {
          throw new Error("rate_limit_exceeded");
        }
      } catch (err: any) {
        if (err.message === "rate_limit_exceeded") {
          throw new Error("Too many requests. Please try again shortly.");
        }
        // Fail closed or conservative limit if KV is unavailable
        throw new Error("Service temporarily unavailable. Please try again later.");
      }

      // 3. Database Insert and Idempotency
      const publicReference = `AC-${createReference()}`;
      
      try {
        const requestToInsert = {
          ...input,
          services: JSON.stringify(input.services),
          email: input.email || null,
          notes: input.notes || null,
          consentToProcess: input.consentToProcess ? 1 : 0,
          termsAcknowledged: input.termsAcknowledged ? 1 : 0,
          privacyPolicyVersion: PRIVACY_POLICY_VERSION,
          termsVersion: TERMS_VERSION,
          consentAt: new Date(),
          publicReference,
          status: "NEW" as const,
        };

        const result = await createServiceRequest(requestToInsert);
        if (!result) {
          throw new Error("Database insert failed");
        }
      } catch (err) {
        console.error("[CreateRequest Error]", err);
        throw new Error("Failed to submit request. Please try again.");
      }

      return { referenceNumber: publicReference };
    }),
    recent: adminProcedure.query(async () => {
      return listRecentRequests();
    }),
  }),
});

export type AppRouter = typeof appRouter;
