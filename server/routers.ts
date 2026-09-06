import { customAlphabet } from "nanoid";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
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
    create: publicProcedure.input(requestInput).mutation(async ({ input }) => {
      const publicReference = `AC-${createReference()}`;
      await createServiceRequest({
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
        status: "NEW",
      });
      return { referenceNumber: publicReference };
    }),
    recent: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Admin access required");
      return listRecentRequests();
    }),
  }),
});

export type AppRouter = typeof appRouter;
