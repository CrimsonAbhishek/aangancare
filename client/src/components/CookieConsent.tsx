import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ShieldCheck, X } from "lucide-react";

const STORAGE_KEY = "aangan_cookie_ack";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private browsing, etc.)
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="status" aria-live="polite">
      <div className="shell cookie-inner">
        <ShieldCheck size={18} aria-hidden="true" />
        <p>
          This site uses only <strong>essential cookies</strong> for
          authentication. No tracking, analytics, or advertising cookies are
          used.{" "}
          <Link href="/cookies" className="cookie-link">
            Read cookie policy
          </Link>
        </p>
        <button
          type="button"
          className="cookie-dismiss"
          onClick={dismiss}
          aria-label="Dismiss cookie notice"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
