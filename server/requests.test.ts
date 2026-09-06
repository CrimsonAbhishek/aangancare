import { describe, expect, it, vi } from "vitest";
import { createServiceRequest } from "./db";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  createServiceRequest: vi.fn().mockResolvedValue(undefined),
  listRecentRequests: vi.fn().mockResolvedValue([]),
}));

type AnonymousContext = Pick<TrpcContext, "req" | "res"> & { user: null };

function createAnonymousContext(): AnonymousContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("requests.create", () => {
  it("returns a non-sequential public reference without requiring an authenticated user", async () => {
    const caller = appRouter.createCaller(createAnonymousContext());
    const result = await caller.requests.create({
      urgency: "immediate",
      services: ["Cremation assistance", "Transport"],
      city: "Bengaluru",
      timing: "Today",
      name: "Family contact",
      phone: "9876543210",
      email: "",
      notes: "Please call after 6pm",
      consentToProcess: true,
      termsAcknowledged: true,
    });

    expect(result.referenceNumber).toMatch(/^AC-[A-Z0-9]{8}$/);
    expect(createServiceRequest).toHaveBeenCalledWith(expect.objectContaining({
      consentToProcess: 1,
      termsAcknowledged: 1,
      privacyPolicyVersion: expect.any(String),
      termsVersion: expect.any(String),
    }));
  });

  it("rejects a request with no selected service area", async () => {
    const caller = appRouter.createCaller(createAnonymousContext());
    await expect(caller.requests.create({
      urgency: "planned",
      services: [],
      city: "Pune",
      timing: "Tomorrow",
      name: "Family contact",
      phone: "9876543210",
      email: "",
      notes: "",
      consentToProcess: true,
      termsAcknowledged: true,
    })).rejects.toThrow();
  });

  it("rejects a request without explicit consent", async () => {
    const caller = appRouter.createCaller(createAnonymousContext());
    await expect(caller.requests.create({
      urgency: "planned",
      services: ["Transport"],
      city: "Pune",
      timing: "Tomorrow",
      name: "Family contact",
      phone: "9876543210",
      email: "",
      notes: "",
      consentToProcess: false,
      termsAcknowledged: true,
    })).rejects.toThrow();
  });
});
