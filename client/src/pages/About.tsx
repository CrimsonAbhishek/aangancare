import {
  ArrowRight,
  Check,
  ChevronRight,
  Flower2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

const principles = [
  {
    icon: HeartHandshake,
    title: "No assumed rituals or affiliations",
    body:
      "Aangan Care does not presume a caste, religion, region, or ritual. Every family is met where they are, with the support they ask for — not the support someone else decided they should want.",
  },
  {
    icon: MapPin,
    title: "Coverage is verified, not assumed",
    body:
      "Every area, every service type, and every partner is checked before it is offered. Saying 'we can do this' when we don't know is not a calm response — it is a promise that breaks at the worst moment.",
  },
  {
    icon: ShieldCheck,
    title: "Minimal information, handled carefully",
    body:
      "The request form collects only what a coordinator needs to begin. No identity documents, no Aadhaar, no payment details at the request stage. Every field has a reason.",
  },
  {
    icon: Sparkles,
    title: "Pace set by the family",
    body:
      "Some families need immediate support. Others need time to decide. The process is designed to hold both without pressure — immediate requests and planned requests are treated with the same seriousness.",
  },
  {
    icon: Users,
    title: "Designed for remote coordination",
    body:
      "Many families face the added weight of organising from another city or country. The request flow is built for that reality: a contact at the location, a coordinator who can check what is possible, and a single reference that keeps everyone aligned.",
  },
];

const milestones = [
  { year: "The name", text: "\"Aangan\" is the Hindi word for a courtyard — the open, sheltered space at the centre of a home where life gathers. The name holds the intention: a steady place to come to, not a transaction to complete." },
  { year: "The design", text: "The visual language is quiet editorial hospitality — warm ivory, deep ink, muted sage, and a restrained marigold for moments that need attention. Nothing competes with the family's focus." },
  { year: "The form", text: "Every field in the request form was weighed: does a coordinator actually need this to respond? If not, it was removed. The result is a two-minute form that collects just enough and nothing more." },
  { year: "The posture", text: "The site never fabricates contact details, availability, pricing, or partner information. Empty configuration slots say 'not yet configured' — because a false answer at this moment is worse than no answer." },
];

export default function AboutPage() {
  usePageMeta(
    "About Aangan Care",
    "Aangan means the space that holds a home. Learn why Aangan Care was designed the way it was — calm, honest, and built around the needs of Indian families navigating a difficult day.",
    "/about"
  );

  return (
    <div className="about-page">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="inner-page shell about-hero">
        <p className="eyebrow">
          <span className="eyebrow-line" /> Why Aangan
        </p>
        <h1>
          Support that respects the family,{" "}
          <em>not just the checklist.</em>
        </h1>
        <p className="inner-lede">
          Aangan Care is designed to help families move with clarity while leaving room for their own customs, choices, and pace. It does not assume a ritual, affiliation, provider, or location is available.
        </p>
        <div className="about-hero-actions">
          <Link href="/request" className="button button-dark">
            Start a request <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/process" className="text-link">
            See how the process works <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ── Name meaning ─────────────────────────────────────────── */}
      <section className="about-meaning shell">
        <div className="about-meaning-visual">
          <div className="about-monogram" aria-hidden="true">
            <Flower2 size={48} strokeWidth={1.2} />
          </div>
          <div className="about-meaning-quote">
            <blockquote>
              "You don't have to know what to ask for yet."
            </blockquote>
            <cite>— The request is the first step</cite>
          </div>
        </div>
        <div className="about-meaning-copy">
          <p className="eyebrow">What the name means</p>
          <h2>
            Aangan is the space <em>that holds a home.</em>
          </h2>
          <p>
            In Hindi, <strong>aangan</strong> is the open courtyard at the centre of a traditional home — the place where life gathers, where the family comes together, where things that matter happen in the open. It is sheltered but not closed, familiar but not exclusive.
          </p>
          <p>
            That is the intention behind Aangan Care: a steady, open space for families in a moment of weight. Not a transaction, not a process to be optimised — a place to come to and find a clearer next step.
          </p>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────────────── */}
      <section className="about-principles">
        <div className="shell">
          <p className="eyebrow">How we think</p>
          <h2>
            Five principles that <em>shape every decision.</em>
          </h2>
          <div className="principles-grid">
            {principles.map(({ icon: Icon, title, body }) => (
              <article className="principle-card" key={title}>
                <div className="principle-card-icon">
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design decisions ─────────────────────────────────────── */}
      <section className="about-design shell">
        <div className="about-design-intro">
          <p className="eyebrow">The thinking behind the product</p>
          <h2>
            Every detail has <em>a reason.</em>
          </h2>
          <p>
            Aangan Care is not the result of a template. Each aspect of the name, the visual language, the form, and the communication posture was a considered choice.
          </p>
        </div>
        <div className="about-design-timeline">
          {milestones.map(({ year, text }) => (
            <div className="design-milestone" key={year}>
              <span className="milestone-label">{year}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What hasn't changed ──────────────────────────────────── */}
      <section className="about-constants shell">
        <p className="eyebrow">What doesn't change</p>
        <h2>
          Three things that hold <em>at every step.</em>
        </h2>
        <div className="about-constants-grid">
          <div className="about-constant">
            <Check size={16} aria-hidden="true" />
            <div>
              <strong>No assumed availability</strong>
              <p>A request is not a confirmation. Coverage is checked — not assumed — before anything is offered.</p>
            </div>
          </div>
          <div className="about-constant">
            <Check size={16} aria-hidden="true" />
            <div>
              <strong>No fabricated details</strong>
              <p>Contact information, pricing, partner names, and service areas are not invented. Configuration gaps are stated clearly.</p>
            </div>
          </div>
          <div className="about-constant">
            <Check size={16} aria-hidden="true" />
            <div>
              <strong>No payment collected at request stage</strong>
              <p>A request reference is a tracked enquiry — not a booking, not a charge, not a commitment on either side.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="cta-section shell">
        <div className="cta-card">
          <div>
            <p className="eyebrow">Whenever you're ready</p>
            <h2>
              Let's take the <em>next step together.</em>
            </h2>
            <p>Start with what you know. We'll help make the next question clearer.</p>
          </div>
          <Link href="/request" className="button button-light">
            Request assistance <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
