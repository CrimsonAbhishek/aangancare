import { useEffect } from "react";

const DEFAULT_TITLE = "Aangan Care — Funeral & Cremation Assistance";
const DEFAULT_DESCRIPTION =
  "Aangan Care is a calm starting point for funeral and cremation assistance requests, service information, and family resources.";

/**
 * Sets the page `<title>` and `<meta name="description">` for the current
 * route. Values reset to defaults when the component unmounts.
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaEl = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const prevDesc = metaEl?.content ?? "";

    document.title = title ? `${title} — Aangan Care` : DEFAULT_TITLE;
    if (metaEl) metaEl.content = description ?? DEFAULT_DESCRIPTION;

    return () => {
      document.title = prevTitle;
      if (metaEl) metaEl.content = prevDesc;
    };
  }, [title, description]);
}
