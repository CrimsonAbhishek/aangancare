import { ArrowRight, BookOpen, FileText, HeartHandshake, Home, LockKeyhole, Mail, Map, RotateCcw, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const siteMap = [
  {
    group: "Main pages",
    items: [
      {
        icon: Home,
        label: "Home",
        path: "/",
        description: "The calm starting point for families seeking funeral and cremation assistance.",
      },
      {
        icon: HeartHandshake,
        label: "Services",
        path: "/services",
        description: "Immediate arrangements, transport, ceremony support, and after-care — explore what Aangan Care can help you ask about.",
      },
      {
        icon: Map,
        label: "Request assistance",
        path: "/request",
        description: "Submit a private request. Choose immediate or planned support, share your city, and receive a clear reference number.",
      },
      {
        icon: BookOpen,
        label: "Family guide & resources",
        path: "/resources",
        description: "Practical, culturally aware guides covering what to do after a death, cremation basics, and planning from another city.",
      },
      {
        icon: Mail,
        label: "Contact",
        path: "/contact",
        description: "Find contact options and start a private conversation about your needs.",
      },
    ],
  },
  {
    group: "Legal & trust",
    items: [
      {
        icon: ShieldCheck,
        label: "Privacy policy",
        path: "/privacy",
        description: "What information the current website collects when you submit a request, and why.",
      },
      {
        icon: FileText,
        label: "Terms & conditions",
        path: "/terms",
        description: "The practical boundaries around using Aangan Care — what a request reference is and is not.",
      },
      {
        icon: RotateCcw,
        label: "Refund & cancellation",
        path: "/refunds",
        description: "The current site does not collect payments. Understand what a future payment policy must cover.",
      },
      {
        icon: LockKeyhole,
        label: "Cookie policy",
        path: "/cookies",
        description: "Only essential authentication cookies are in use. No optional analytics or tracking in production.",
      },
    ],
  },
];

export default function SitemapPage() {
  usePageMeta(
    "Site Map — All Pages",
    "A complete overview of every page on the Aangan Care website — services, resources, the assistance request form, legal policies, and more.",
    "/sitemap"
  );

  return (
    <div className="inner-page shell sitemap-page">
      <p className="eyebrow">Site map</p>
      <h1>
        Every page on <em>Aangan Care.</em>
      </h1>
      <p className="inner-lede">
        A clear overview of everything available on this site — from the assistance request form to legal policies.
      </p>

      <div className="sitemap-body">
        {siteMap.map((section) => (
          <div className="sitemap-group" key={section.group}>
            <p className="footer-label sitemap-group-label">{section.group}</p>
            <div className="sitemap-list">
              {section.items.map(({ icon: Icon, label, path, description }) => (
                <Link href={path} className="sitemap-item" key={path}>
                  <span className="sitemap-item-icon">
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="sitemap-item-copy">
                    <strong>{label}</strong>
                    <small>{description}</small>
                  </span>
                  <ArrowRight size={16} className="sitemap-item-arrow" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="callout" style={{ marginTop: "var(--sp-10)" }}>
        <span>
          <ShieldCheck size={18} aria-hidden="true" />
          <strong>XML sitemap for search engines</strong>
        </span>
        <p>
          The machine-readable sitemap is available at{" "}
          <a href="/sitemap.xml" className="text-link" rel="noopener">
            /sitemap.xml
          </a>{" "}
          and is referenced in robots.txt.
        </p>
      </div>
    </div>
  );
}
