import { ArrowLeft, ArrowRight, Check, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

type LegalKind = "privacy" | "terms" | "refunds" | "cookies";

const pages: Record<LegalKind, { eyebrow: string; title: string; intro: string; sections: Array<{ title: string; body: string }> }> = {
  privacy: {
    eyebrow: "Privacy policy",
    title: "A clear promise about the details you share.",
    intro: "This draft explains what the current website collects and why. Replace the business name, address, privacy contact, retention periods, and approved legal wording before accepting live requests.",
    sections: [
      { title: "What the current site collects", body: "If you submit a service request, the current form asks for your support need, city or locality, timing, name, phone number, and optionally email and notes. The server stores the request, a non-sequential reference number, consent flags, policy versions, status, and timestamps. The site does not ask for identity documents, payment details, Aadhaar numbers, medical records, or precise location." },
      { title: "Why we use it", body: "The information is used only to understand and respond to a request, check whether a coordinator can confirm the requested support, maintain a reference for follow-up, and protect the service from misuse. The current site does not run advertising pixels, optional analytics, social embeds, or third-party lead enrichment." },
      { title: "Sharing and retention", body: "Do not publish or promise specific sharing or retention practices until the operating business decides who may access requests, which service partners receive information, how long records are kept, and how deletion or correction requests are handled. Connect those details here and in the operations process before launch." },
      { title: "Your choices", body: "A production privacy contact, grievance channel, and process for access, correction, deletion, withdrawal, and complaints must be added before launch. A request may not be withdrawn from operational records where retention is required by law or necessary to resolve a dispute; the final policy should state the applicable basis and limits." },
    ],
  },
  terms: {
    eyebrow: "Terms & conditions",
    title: "The practical boundaries around using Aangan Care.",
    intro: "These draft terms describe the current website as an information and enquiry channel, not as a promise that a service, facility, date, price, or outcome is available.",
    sections: [
      { title: "Information is not confirmation", body: "The website provides general information and a request channel. A request reference is not a booking, acceptance, price quote, medical direction, legal advice, or confirmation of facility availability. A coordinator must confirm scope, timing, location, price, and any third-party arrangements in writing before the family relies on them." },
      { title: "User responsibilities", body: "Please provide information you are comfortable sharing and that is accurate enough for a coordinator to respond. Do not submit another person’s sensitive information unless you are authorised to do so. Do not use the website for unlawful, abusive, fraudulent, or harmful purposes." },
      { title: "Third-party services", body: "Where a request involves a crematorium, transport provider, priest, facility, or other partner, the final business terms should explain which party contracts with the family, who is responsible for pricing and performance, and how complaints are handled." },
      { title: "Governing details", body: "Add the legal entity name, registered address, customer-care contact, jurisdiction, dispute process, service hours, and approved limitation language here before launch. Have an Indian lawyer review this page and the operational contract flow." },
    ],
  },
  refunds: {
    eyebrow: "Refund & cancellation",
    title: "Clarity when plans change.",
    intro: "The current website does not collect online payments, deposits, or booking fees. No refund promise should be implied until a real payment flow and service-specific policy are approved.",
    sections: [
      { title: "Current state", body: "Submitting the request form creates an enquiry record only. It does not charge a fee, reserve a facility, or create a paid booking. If the business later adds payments, this page must be updated before payment collection begins." },
      { title: "What the production policy must cover", body: "Specify whether deposits, third-party charges, transport costs, materials, ceremonies, or cancellation fees are refundable; when a cancellation is effective; how refunds are calculated; the expected method and timing; and which charges are outside the business’s control." },
      { title: "Complaints and exceptions", body: "Add a named support channel, escalation path, response times, and any statutory consumer remedies. Do not use ‘no refunds’ wording without legal review, especially for consumer-facing services and advance payments." },
    ],
  },
  cookies: {
    eyebrow: "Cookie policy",
    title: "Only the storage needed to make the site work.",
    intro: "The current production document head has no optional analytics, advertising, social, map, video, or chat embeds. The current site uses only essential authentication cookies when an administrator signs in, plus short-lived browser storage used by the authentication runtime.",
    sections: [
      { title: "Essential cookies", body: "The authentication flow may use the app_session_id session cookie to keep an administrator signed in and the short-lived __Host-oauth_state cookie to protect the OAuth sign-in handoff. These are strictly necessary for the protected operations area and are not used for advertising or behavioural profiling." },
      { title: "No optional tracking by default", body: "The public site does not load the configured Umami analytics script, Google Fonts, advertising pixels, or third-party embeds. Development-only Manus diagnostics may appear in the private preview environment; they are not part of the production build and must not be enabled on a public deployment without an approved privacy and consent review." },
      { title: "Consent choice", body: "Because the current production build uses only necessary storage, a disruptive cookie banner is not required for the current configuration. If optional analytics, marketing, maps, chat, reCAPTCHA, or embedded media are added, block them until a user makes a valid choice, document the vendors and purposes, and provide a way to change or withdraw that choice." },
      { title: "Browser controls", body: "You can manage or delete cookies through your browser. Blocking essential cookies may prevent administrator sign-in. Add the business’s policy contact and effective date before launch." },
    ],
  },
};

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const page = pages[kind];
  usePageMeta(page.eyebrow, page.intro.slice(0, 160));
  return <div className="inner-page shell legal-page"><Link href="/" className="text-link"><ArrowLeft size={15} /> Back to Aangan</Link><div className="legal-hero"><div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="inner-lede">{page.intro}</p><div className="legal-hero-actions"><Link href="/request" className="button button-dark">Start a request <ArrowRight size={15} /></Link><Link href="/contact" className="text-link">Ask a policy question <ArrowRight size={15} /></Link></div></div><div className="legal-card"><span><ShieldCheck size={22} /></span><h3>Draft for configuration</h3><p>Connect the operating entity, policy contact, retention schedule, and approved legal review before public launch.</p><div className="legal-card-foot"><FileText size={15} /> Version: 2026-09-07-draft</div></div></div><div className="legal-sections">{page.sections.map((section) => <section key={section.title}><div className="legal-section-icon"><LockKeyhole size={17} /></div><div><h2>{section.title}</h2><p>{section.body}</p></div></section>)}</div><div className="legal-checklist"><p className="eyebrow">Before launch</p><h2>Make the details <em>real and reviewable.</em></h2><ul><li><Check size={15} /> Add the legal entity and registered contact details.</li><li><Check size={15} /> Confirm retention, access, deletion, and complaint handling.</li><li><Check size={15} /> Have an Indian lawyer review the final policy and service terms.</li></ul></div></div>;
}
