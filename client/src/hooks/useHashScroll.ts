import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Automatically scrolls to target element when URL contains a hash fragment
 * (e.g. `/#process`, `/#about`), both on initial page load and on route/hash changes.
 */
export function useHashScroll() {
  const [location] = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      if (!id) return;

      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 80);

      return () => clearTimeout(timer);
    };

    const cleanup = scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [location]);
}
