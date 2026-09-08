import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const steps = [
  {
    number: "01",
    title: "Tell us what's needed",
    summary: "Choose your urgency and share only the essentials.",
    detail:
      "Select whether you need immediate support right now, or are planning ahead. You will be asked for the type of support needed, your city or locality, your preferred timing, and a contact name and phone number. Nothing more. The form takes about two minutes to complete and can be filled in by any family member — including someone coordinating from another city.",
    items: [
      "Immediate or planned support",
      "Service type and city",
      "Contact details only — no identity documents",
      "About two minutes from start to submit",
    ],
    icon: HeartHandshake,
  },
  {
    number: "02",
    title: "A coordinator checks what's possible",
    summary: "Coverage and timing are verified before you rely on any answer.",
    detail:
      "Once a request is received, a coordinator reviews the location, the timing, and what support is currently configured for that area. This step exists so that no assumption is made about availability. You will not be told something is available until it has been checked. If a particular service is not configured for your area, that will be stated clearly.",
    items: [
      "Location and timing verified first",
      "No assumed availability",
      "Configured services confirmed",
      "Honest scope — nothing fabricated",
    ],
    icon: MapPin,
  },
  {
    number: "03",
    title: "Receive a clear reference and next action",
    summary: "One private reference number. One clear next step.",
    detail:
      "After submission you receive a private request reference number. This is not a booking, a quote, or a promise — it is a tracked starting point that allows you and a coordinator to return to the same conversation without repeating your story. From here, the next action is always stated clearly: what has been confirmed, what is still being checked, and what the family should do next.",
    items: [
      "A unique private reference number",
      "Clear next action stated in writing",
      "One place to return to",
      "No repeat of your story required",
    ],
    icon: MessageCircle,
  },
];

const processFaqs = [
  [
    "How long does the initial request take?",
    "About two minutes. You choose your support type, share your city and timing, and add a contact name and phone number. Nothing more is required to begin.",
  ],
  [
    "What happens after I submit?",
    "A coordinator reviews your request and checks what is available in your location. You receive a private reference number immediately. A coordinator will follow up on the contact number you provide.",
  ],
  [
    "Does submitting a request cost anything?",
    "No. The current website does not collect any payment. Submitting a request is free and creates a tracked enquiry — not a booking or a charge.",
  ],
  [
    "Can I submit on behalf of another family member?",
    "Yes. Many requests are made by someone coordinating from a different city. Share the location where support is needed and the contact who will be available there.",
  ],
  [
    "What if the service I need isn't available in my area?",
    "A coordinator will tell you clearly what is and is not configured for your location. No assumption is made about availability.",
  ],
];

export default function ProcessPage() {
  usePageMeta(
    "How It Works — The Request Process",
    "Understand exactly how Aangan Care works. A two-minute request, a coordinator who checks availability honestly, and a private reference number so you never have to repeat your story.",
    "/process"
  );

  return (
    <div className="process-page">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="inner-page shell process-hero">
        <p className="eyebrow">
          <span className="eyebrow-line" /> How it works
        </p>
        <h1>
          One conversation. <em>Three clear steps.</em>
        </h1>
        <p className="inner-lede">
          In a difficult moment, you should not have to compare ten options or repeat your story. The first interaction stays focused and human — and ends with a clear next action, not more uncertainty.
        </p>
        <div className="process-hero-actions">
          <Link href="/request" className="button button-dark">
            Begin a request <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/services" className="text-link">
            See what we can help with <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ── Steps ────────────────────────────────────────────────── */}
      <div className="shell process-steps-section">
        {steps.map(({ number, title, summary, detail, items, icon: Icon }) => (
          <article className="process-step-card" key={number}>
            <div className="process-step-aside">
              <span className="process-step-number">{number}</span>
              <div className="process-step-icon">
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="process-step-connector" aria-hidden="true" />
            </div>
            <div className="process-step-body">
              <h2>{title}</h2>
              <p className="process-step-summary">{summary}</p>
              <p className="process-step-detail">{detail}</p>
              <ul className="process-step-items">
                {items.map((item) => (
                  <li key={item}>
                    <Check size={14} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* ── Trust strip ──────────────────────────────────────────── */}
      <section className="process-trust shell">
        <p className="eyebrow">Built around the hardest moments</p>
        <h2>
          What doesn't change, <em>no matter what step you're on.</em>
        </h2>
        <div className="process-trust-grid">
          <div className="process-trust-item">
            <ShieldCheck size={21} aria-hidden="true" />
            <strong>No payment at any step</strong>
            <p>Submitting a request does not create a charge, a deposit, or a booking. It creates a tracked enquiry.</p>
          </div>
          <div className="process-trust-item">
            <Clock3 size={21} aria-hidden="true" />
            <strong>Available when you need it</strong>
            <p>The request form is available at any hour. A coordinator will follow up on the contact details you provide.</p>
          </div>
          <div className="process-trust-item">
            <FileText size={21} aria-hidden="true" />
            <strong>Only what's necessary</strong>
            <p>No identity documents, no payment details, no medical information. Only what helps a coordinator begin.</p>
          </div>
          <div className="process-trust-item">
            <MessageCircle size={21} aria-hidden="true" />
            <strong>One reference, no repetition</strong>
            <p>Your request reference means you never have to explain your situation from scratch to a second person.</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="faq-section shell process-faq">
        <div className="faq-intro">
          <p className="eyebrow">Common questions</p>
          <h2>
            About the <em>request process.</em>
          </h2>
          <p>If your question isn't here, start a request and a coordinator can clarify from there.</p>
        </div>
        <div className="faq-list">
          {processFaqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronRight size={17} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="cta-section shell">
        <div className="cta-card">
          <div>
            <p className="eyebrow">Whenever you're ready</p>
            <h2>
              Start with what <em>you know.</em>
            </h2>
            <p>You don't need to have all the answers before you begin. That's what the process is for.</p>
          </div>
          <Link href="/request" className="button button-light">
            Begin a request <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
