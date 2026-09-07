import { ArrowRight, Flower2 } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found", "The page you are looking for does not exist or has been moved.");

  return (
    <div className="not-found-page shell">
      <div className="not-found-mark" aria-hidden="true">
        <Flower2 size={30} strokeWidth={1.5} />
      </div>
      <p className="eyebrow">404 — Page not found</p>
      <h1>
        This page doesn't seem to <em>exist.</em>
      </h1>
      <p className="inner-lede">
        The page you're looking for may have been moved, removed, or doesn't
        exist yet. Let's get you somewhere useful.
      </p>
      <div className="not-found-actions">
        <Link href="/" className="button button-dark">
          Return home <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link href="/request" className="text-link">
          Request assistance <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
