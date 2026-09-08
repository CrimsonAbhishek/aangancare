import { useEffect } from "react";

const SITE_NAME = "Aangan Care";
const BASE_URL = "https://aangancare.com";
const DEFAULT_TITLE = "Aangan Care — Funeral & Cremation Assistance for Indian Families";
const DEFAULT_DESCRIPTION =
  "Aangan Care is a calm starting point for Indian families seeking funeral and cremation assistance. Get a clear request reference, transport support, ceremony coordination, and after-care arrangements — with no payment collected upfront.";

/**
 * Sets the page <title>, <meta name="description">, <link rel="canonical">,
 * and Open Graph / Twitter Card tags for the current route.
 * All values reset to defaults when the component unmounts.
 */
export function usePageMeta(title?: string, description?: string, canonicalPath?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
    const fullDescription = description ?? DEFAULT_DESCRIPTION;
    const canonicalHref = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL + "/";

    // ── title ──────────────────────────────────────────────────────────────
    const prevTitle = document.title;
    document.title = fullTitle;

    // ── meta description ───────────────────────────────────────────────────
    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = descEl?.content ?? "";
    if (descEl) descEl.content = fullDescription;

    // ── canonical link ─────────────────────────────────────────────────────
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonicalEl?.href ?? "";
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.rel = "canonical";
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonicalHref;

    // ── Open Graph tags ────────────────────────────────────────────────────
    const ogTags: Record<string, string> = {
      "og:title": fullTitle,
      "og:description": fullDescription,
      "og:url": canonicalHref,
    };
    const prevOg: Record<string, string> = {};
    for (const [property, value] of Object.entries(ogTags)) {
      const el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (el) {
        prevOg[property] = el.content;
        el.content = value;
      }
    }

    // ── Twitter Card tags ──────────────────────────────────────────────────
    const twitterTags: Record<string, string> = {
      "twitter:title": fullTitle,
      "twitter:description": fullDescription,
    };
    const prevTwitter: Record<string, string> = {};
    for (const [name, value] of Object.entries(twitterTags)) {
      const el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (el) {
        prevTwitter[name] = el.content;
        el.content = value;
      }
    }

    // ── cleanup ────────────────────────────────────────────────────────────
    return () => {
      document.title = prevTitle;
      if (descEl) descEl.content = prevDesc;
      if (canonicalEl) canonicalEl.href = prevCanonical;
      for (const [property, value] of Object.entries(prevOg)) {
        const el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
        if (el) el.content = value;
      }
      for (const [name, value] of Object.entries(prevTwitter)) {
        const el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
        if (el) el.content = value;
      }
    };
  }, [title, description, canonicalPath]);
}
