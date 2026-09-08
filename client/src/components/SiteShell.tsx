import { ArrowUpRight, Clock3, Flower2, Menu, Phone, ShieldCheck, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useHashScroll } from "@/hooks/useHashScroll";

const navItems = [
  { label: "How we help", href: "/services" },
  { label: "The process", href: "/#process" },
  { label: "Resources", href: "/resources" },
  { label: "About Aangan", href: "/#about" },
];

export default function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  // Enable smooth anchor scrolling when URL contains #process or #about
  useHashScroll();

  return (
    <div className="site-root">
      <div className="notice-bar">
        <div className="shell notice-inner">
          <span className="notice-dot" aria-hidden="true" />
          <span>Here when you need a steady hand.</span>
          <span className="notice-divider" aria-hidden="true" />
          <span>Public site: request channel only</span>
        </div>
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" className="brand" aria-label="Aangan Care home">
            <span className="brand-mark">
              <Flower2 size={19} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span className="brand-copy">
              <strong>Aangan</strong>
              <small>care &amp; arrangements</small>
            </span>
          </Link>

          <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={location === item.href ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/contact" className="header-phone">
              <Phone size={15} aria-hidden="true" /> <span>Contact options</span>
            </Link>
            <Link href="/request" className="button button-small button-dark">
              Request assistance <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <button
            className="mobile-menu"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <aside className="urgent-rail" aria-label="Urgent assistance">
        <div className="shell urgent-inner">
          <div className="urgent-copy">
            <span className="urgent-icon">
              <Clock3 size={16} aria-hidden="true" />
            </span>
            <span>
              <strong>Need help right now?</strong>
              <small>Share a few details. We’ll guide the next step.</small>
            </span>
          </div>
          <Link href="/request?urgency=immediate" className="button button-light button-small">
            Start an urgent request <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <Link href="/" className="brand footer-brand">
              <span className="brand-mark">
                <Flower2 size={19} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="brand-copy">
                <strong>Aangan</strong>
                <small>care &amp; arrangements</small>
              </span>
            </Link>
            <p className="footer-note">A calm starting point for families navigating a difficult day.</p>
          </div>

          <div>
            <p className="footer-label">Explore</p>
            <Link href="/services">Services</Link>
            <Link href="/resources">Funeral guide</Link>
            <Link href="/#about">About us</Link>
            <Link href="/#process">The process</Link>
          </div>

          <div>
            <p className="footer-label">Assistance</p>
            <Link href="/contact">Contact options</Link>
            <Link href="/request">Request assistance</Link>
            <Link href="/request?urgency=immediate">Immediate support</Link>
          </div>

          <div>
            <p className="footer-label">Standards &amp; Trust</p>
            <span className="footer-muted">
              <ShieldCheck size={14} aria-hidden="true" /> No payments collected
            </span>
            <span className="footer-muted">
              <ShieldCheck size={14} aria-hidden="true" /> Minimal data storage
            </span>
            <span className="footer-muted">
              <ShieldCheck size={14} aria-hidden="true" /> Respectful, calm guidance
            </span>
          </div>
        </div>

        <div className="shell footer-bottom">
          <span>© 2026 Aangan Care. Business details pending configuration.</span>
          <span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refunds">Refunds</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/sitemap">Site map</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
