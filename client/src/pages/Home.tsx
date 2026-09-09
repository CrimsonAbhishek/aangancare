import { ArrowRight, Check, ChevronRight, CircleHelp, FileText, HeartHandshake, MapPin, MessageCircle, Package, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export const services = [
  { icon: HeartHandshake, title: "Immediate arrangements", text: "A clear starting point for the first calls, documents, timings, and decisions." },
  { icon: Truck, title: "Transport & movement", text: "Ask about transport, inter-city movement, airport coordination, or freezer box needs where configured." },
  { icon: Sparkles, title: "Ceremony support", text: "Ask about materials, flowers, priest coordination, and practical details where configured." },
  { icon: Package, title: "After-care arrangements", text: "Ask about Asthi Visarjan, Shraddh, Chautha, Terahvi, and related arrangements where configured." },
];

export const faqs = [
  ["What should I do first after a death?", "Start by ensuring the family is together and the immediate legal or medical steps are underway. Our guide is a general orientation, not a substitute for local authority or professional advice."],
  ["Can someone coordinate from another city?", "The request flow is designed for family members arranging support remotely. Share the current location and preferred contact; a coordinator can clarify what is possible."],
  ["Do you cover my city?", "Coverage is configured location by location. Share your city in a request and availability can be checked rather than assumed."],
];

export default function Home() {
  usePageMeta(
    undefined,
    "Aangan Care is a calm starting point for Indian families seeking funeral and cremation assistance. Immediate arrangements, transport, ceremony support, and after-care — all in one clear request. No payment collected upfront.",
    "/"
  );

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Funeral & cremation assistance
          </p>
          <h1>When the day feels impossible, <em>we make the next step clear.</em></h1>
          <p className="hero-lede">
            Aangan Care is a calm starting point for families seeking information, a request reference, and a clearer next conversation about funeral and cremation support.
          </p>
          <div className="hero-actions">
            <Link href="/request" className="button button-dark">
              Request assistance <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/process" className="text-link">
              See how it works <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="hero-reassurance">
            <span><Check size={14} aria-hidden="true" /> No payment collected</span>
            <span><Check size={14} aria-hidden="true" /> One clear next step</span>
            <span><Check size={14} aria-hidden="true" /> Details kept minimal</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img src="/aangan-white-flower-clean.webp" alt="White flowers in soft natural light" />
            <div className="image-wash" />
          </div>
          <div className="hero-note">
            <span className="note-kicker">A quieter way through</span>
            <span>“You don’t have to know what to ask for yet.”</span>
          </div>
          <div className="hero-seal">
            <span>With</span>
            <strong>care</strong>
            <span>at every step</span>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          <div className="trust-intro">
            <span className="eyebrow-line" />
            <span>Designed for the moments that need steadiness</span>
          </div>
          <div className="trust-item">
            <ShieldCheck size={18} strokeWidth={1.2} aria-hidden="true" />
            <span>
              <strong>Clear request details</strong>
              <small>Only the information needed to begin</small>
            </span>
          </div>
          <div className="trust-item">
            <MapPin size={18} strokeWidth={1.2} aria-hidden="true" />
            <span>
              <strong>Coverage checked first</strong>
              <small>Availability is not assumed</small>
            </span>
          </div>
          <div className="trust-item">
            <MessageCircle size={18} strokeWidth={1.2} aria-hidden="true" />
            <span>
              <strong>One place to return to</strong>
              <small>Keep your request reference</small>
            </span>
          </div>
        </div>
      </section>

      <section className="section shell" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we can help you ask about</p>
            <h2>Practical care, <em>thoughtfully arranged.</em></h2>
          </div>
          <Link href="/services" className="text-link">
            View support areas <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="service-grid">
          {services.map(({ icon: Icon, title, text }, index) => (
            <article className="service-card" key={title}>
              <div className="service-index">0{index + 1}</div>
              <Icon size={20} strokeWidth={1.2} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href="/request" aria-label={`Ask about ${title}`}>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="shell process-layout">
          <div className="process-intro">
            <p className="eyebrow">A simple beginning</p>
            <h2>One conversation.<br /><em>Three clear steps.</em></h2>
            <p>
              In a difficult moment, you should not have to compare ten options or repeat your story. The first interaction stays focused and human.
            </p>
            <Link href="/process" className="button button-outline">
              Begin a request <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step-number">01</span>
              <div>
                <h3>Tell us what’s needed</h3>
                <p>Choose immediate or planned support and share the essentials. It takes about two minutes.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">02</span>
              <div>
                <h3>Check what’s possible</h3>
                <p>A coordinator can check location, timing, and configured support before you rely on an answer.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">03</span>
              <div>
                <h3>Keep the next step clear</h3>
                <p>Receive a private request reference and a clear next action for your family.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="split-section shell" id="about">
        <div className="split-visual">
          <div className="monogram-large" aria-hidden="true">A</div>
          <span className="split-caption">Aangan means the space that holds a home.</span>
        </div>
        <div className="split-copy">
          <p className="eyebrow">Why Aangan</p>
          <h2>Support that respects the family, <em>not just the checklist.</em></h2>
          <p>
            This product is designed to help families move with clarity while leaving room for their own customs, choices, and pace. It does not assume a ritual, affiliation, provider, or location is available.
          </p>
          <div className="principle-list">
            <span><Check size={15} strokeWidth={1.5} aria-hidden="true" /> No assumed rituals or affiliations</span>
            <span><Check size={15} strokeWidth={1.5} aria-hidden="true" /> Configurable services and coverage</span>
            <span><Check size={15} strokeWidth={1.5} aria-hidden="true" /> Transparent status before confirmation</span>
          </div>
          <Link href="/resources" className="text-link">
            Read the family guide <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="resource-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A little more certainty</p>
              <h2>Resources for <em>the questions around it.</em></h2>
            </div>
            <Link href="/resources" className="text-link">
              Visit the guide <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="resource-grid">
            <article className="resource-feature">
              <div className="resource-art">
                <span>01</span>
                <FileText size={24} strokeWidth={1.2} aria-hidden="true" />
              </div>
              <div>
                <p className="resource-type">Immediate guide</p>
                <h3>What to do in the first few hours</h3>
                <p>A grounded starting point for documents, calls, transport, and the decisions that can wait.</p>
                <Link href="/resources" className="text-link">
                  Read this guide <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
            <article className="resource-small">
              <CircleHelp size={20} strokeWidth={1.2} aria-hidden="true" />
              <div>
                <p className="resource-type">FAQ</p>
                <h3>What information will I need?</h3>
                <Link href="/resources">
                  See answers <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
            <article className="resource-small">
              <MapPin size={20} strokeWidth={1.2} aria-hidden="true" />
              <div>
                <p className="resource-type">Locations</p>
                <h3>Check service availability</h3>
                <Link href="/request">
                  Share your city <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="faq-section shell">
        <div className="faq-intro">
          <p className="eyebrow">Frequently asked</p>
          <h2>Questions deserve <em>gentle answers.</em></h2>
          <p>If yours isn’t here, send a request and we’ll help you find the right next question.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
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

      <section className="cta-section shell">
        <div className="cta-card">
          <div>
            <p className="eyebrow">Whenever you’re ready</p>
            <h2>Let’s take the <em>next step together.</em></h2>
            <p>Start with what you know. We’ll help make the next question clearer.</p>
          </div>
          <Link href="/request" className="button button-light">
            Request assistance <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
