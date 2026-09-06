import { z } from "zod";
import { customAlphabet } from "nanoid";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createServiceRequest, listRecentRequests } from "./db";

const requestInput = z.object({
  urgency: z.enum(["immediate", "planned"]),
  services: z.array(z.string()).min(1).max(8),
  city: z.string().min(2).max(120),
  timing: z.string().min(2).max(120),
  name: z.string().min(2).max(160),
  phone: z.string().min(7).max(40),
  email: z.string().email().max(320).optional().or(z.literal("")),
  notes: z.string().max(2000).optional(),
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
      await createServiceRequest({ ...input, services: JSON.stringify(input.services), email: input.email || null, notes: input.notes || null, publicReference, status: "NEW" });
      return { referenceNumber: publicReference };
    }),
    recent: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new Error("Admin access required");
      return listRecentRequests();
    }),
  }),
});

export type AppRouter = typeof appRouter;
