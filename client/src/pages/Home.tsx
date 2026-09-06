import { ArrowRight, Check, ChevronRight, CircleHelp, FileText, HeartHandshake, MapPin, MessageCircle, Package, PhoneCall, ShieldCheck, Sparkles, Truck, UserRound } from "lucide-react";
import { Link, useLocation } from "wouter";

const services = [
  { icon: HeartHandshake, title: "Immediate arrangements", text: "A steady coordinator for the first calls, documents, timings, and decisions." },
  { icon: Truck, title: "Transport & movement", text: "Support with hearse, inter-city, airport, or freezer box coordination where available." },
  { icon: Sparkles, title: "Ceremony support", text: "Materials, flowers, priest coordination, and the practical details around a farewell." },
  { icon: Package, title: "After-care arrangements", text: "A thoughtful hand for Asthi Visarjan, Shraddh, Chautha, Terahvi, and beyond." },
];

const faqs = [
  ["What should I do first after a death?", "Start by ensuring the family is together and the immediate legal or medical steps are underway. Our guide helps you understand the next practical decisions without overwhelm."],
  ["Can someone coordinate from another city?", "Yes. The request flow is designed for family members arranging support remotely. Share the current location and preferred contact; a coordinator can clarify what is possible."],
  ["Do you cover my city?", "Coverage is configured location by location. Share your city in a request and we’ll confirm availability rather than making assumptions."],
];

export default function Home() {
  const [location] = useLocation();
  const isServices = location === "/services";
  const isResources = location === "/resources";
  const isContact = location === "/contact";

  if (isServices) return <ServicesPage />;
  if (isResources) return <ResourcesPage />;
  if (isContact) return <ContactPage />;

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Funeral & cremation assistance</p>
          <h1>When the day feels impossible, <em>we make the next step clear.</em></h1>
          <p className="hero-lede">Aangan Care helps families arrange a respectful farewell with a calm coordinator, clear information, and practical support — from the first call to the days after.</p>
          <div className="hero-actions"><Link href="/request" className="button button-dark">Request assistance <ArrowRight size={16} /></Link><Link href="/#process" className="text-link">See how it works <ChevronRight size={16} /></Link></div>
          <div className="hero-reassurance"><span><Check size={14} /> No obligation</span><span><Check size={14} /> One clear next step</span><span><Check size={14} /> Details kept private</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><img src="/manus-storage/sa1s1Rs2n3KL_5c9fcda6.jpg" alt="White jasmine flowers in soft morning light" /><div className="image-wash" /></div>
          <div className="hero-note"><span className="note-kicker">A quieter way through</span><span>“You don’t have to know what to ask for yet.”</span></div>
          <div className="hero-seal"><span>With</span><strong>care</strong><span>at every step</span></div>
        </div>
      </section>

      <section className="trust-strip"><div className="shell trust-grid"><div className="trust-intro"><span className="eyebrow-line" /><span>Designed for the moments that need steadiness</span></div><div className="trust-item"><ShieldCheck size={19} /><span><strong>Clear, private requests</strong><small>Only the details needed to help</small></span></div><div className="trust-item"><MapPin size={19} /><span><strong>Location-aware support</strong><small>Availability confirmed, never assumed</small></span></div><div className="trust-item"><MessageCircle size={19} /><span><strong>Human guidance</strong><small>One person to help orient you</small></span></div></div></section>

      <section className="section shell" id="services"><div className="section-heading"><div><p className="eyebrow">What we can help with</p><h2>Practical care, <em>thoughtfully arranged.</em></h2></div><Link href="/services" className="text-link">View all support areas <ArrowRight size={15} /></Link></div><div className="service-grid">{services.map(({ icon: Icon, title, text }, index) => <article className="service-card" key={title}><div className="service-index">0{index + 1}</div><Icon size={23} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p><Link href="/request" aria-label={`Request help with ${title}`}><ArrowRight size={17} /></Link></article>)}</div></section>

      <section className="process-section" id="process"><div className="shell process-layout"><div className="process-intro"><p className="eyebrow">A simple beginning</p><h2>One conversation.<br /><em>Three clear steps.</em></h2><p>In a difficult moment, you should not have to compare ten options or repeat your story. We keep the first interaction focused and human.</p><Link href="/request" className="button button-outline">Begin privately <ArrowRight size={15} /></Link></div><div className="steps"><div className="step"><span className="step-number">01</span><div><h3>Tell us what’s needed</h3><p>Choose immediate or planned support and share the essentials. It takes about two minutes.</p></div></div><div className="step"><span className="step-number">02</span><div><h3>We confirm what’s possible</h3><p>A coordinator checks location, timing, and service availability before making a promise.</p></div></div><div className="step"><span className="step-number">03</span><div><h3>Move forward together</h3><p>Receive a private reference number and a clear next action for your family.</p></div></div></div></div></section>

      <section className="split-section shell" id="about"><div className="split-visual"><div className="monogram-large">A</div><span className="split-caption">Aangan means the space that holds a home.</span></div><div className="split-copy"><p className="eyebrow">Why Aangan</p><h2>Support that respects the family, <em>not just the checklist.</em></h2><p>Good arrangements are practical. Good care is also attentive to the people making them. Our platform is built to help families move with clarity while leaving room for their own customs, choices, and pace.</p><div className="principle-list"><span><Check size={16} /> No assumed rituals or affiliations</span><span><Check size={16} /> Configurable services and coverage</span><span><Check size={16} /> Transparent placeholders until details are verified</span></div><Link href="/resources" className="text-link">Read the family guide <ArrowRight size={15} /></Link></div></section>

      <section className="resource-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">A little more certainty</p><h2>Resources for <em>the questions around it.</em></h2></div><Link href="/resources" className="text-link">Visit the guide <ArrowRight size={15} /></Link></div><div className="resource-grid"><article className="resource-feature"><div className="resource-art"><span>01</span><FileText size={29} strokeWidth={1.4} /></div><div><p className="resource-type">Immediate guide · 6 min read</p><h3>What to do in the first few hours</h3><p>A grounded starting point for documents, calls, transport, and the decisions that can wait.</p><Link href="/resources" className="text-link">Read this guide <ArrowRight size={15} /></Link></div></article><article className="resource-small"><CircleHelp size={21} /><div><p className="resource-type">FAQ</p><h3>What information will I need?</h3><Link href="/resources">See answers <ArrowRight size={14} /></Link></div></article><article className="resource-small"><MapPin size={21} /><div><p className="resource-type">Locations</p><h3>Check service availability</h3><Link href="/request">Share your city <ArrowRight size={14} /></Link></div></article></div></div></section>

      <section className="faq-section shell"><div className="faq-intro"><p className="eyebrow">Frequently asked</p><h2>Questions deserve <em>gentle answers.</em></h2><p>If yours isn’t here, send a request and we’ll help you find the right next question.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronRight size={17} /></summary><p>{answer}</p></details>)}</div></section>

      <section className="cta-section shell"><div className="cta-card"><div><p className="eyebrow">Whenever you’re ready</p><h2>Let’s take the <em>next step together.</em></h2><p>Start with what you know. We’ll help with what comes next.</p></div><Link href="/request" className="button button-light">Request assistance <ArrowUpRightIcon /></Link></div></section>
    </>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={16} />; }

function ServicesPage() { return <div className="inner-page shell"><p className="eyebrow">Support areas</p><h1>Everything that helps a family <em>move with dignity.</em></h1><p className="inner-lede">Services are configured by location and availability. These are the ways Aangan Care can help — not a promise that every option is active in every area.</p><div className="service-directory">{services.concat([{ icon: PhoneCall, title: "A clear point of contact", text: "A request reference and one place to return to when several decisions are moving at once." }]).map(({ icon: Icon, title, text }, index) => <article key={title}><div className="directory-icon"><Icon size={22} /></div><div><span className="service-index">0{index + 1}</span><h3>{title}</h3><p>{text}</p><Link href="/request" className="text-link">Ask about this support <ArrowRight size={15} /></Link></div></article>)}</div><div className="callout"><span><MapPin size={18} /><strong>Coverage is verified, not assumed.</strong></span><p>Tell us your city and preferred timing in a request. We’ll confirm what is available before you make a decision.</p><Link href="/request" className="button button-dark button-small">Check my location <ArrowRight size={15} /></Link></div></div> }

function ResourcesPage() { return <div className="inner-page shell"><p className="eyebrow">Family guide</p><h1>Useful information for <em>the moments around a farewell.</em></h1><p className="inner-lede">Clear, culturally aware starting points. This content is educational and should be read alongside guidance from local authorities and professionals.</p><div className="guide-grid"><article className="guide-card guide-primary"><span className="guide-number">01</span><FileText size={28} /><p className="resource-type">Immediate procedures</p><h3>What to do after a death</h3><p>A simple orientation to the first calls, documents, transport, and what can wait until tomorrow.</p><Link href="/resources" className="text-link">Open guide <ArrowRight size={15} /></Link></article><article className="guide-card"><span className="guide-number">02</span><h3>Cremation basics</h3><p>Understand the common steps, questions to ask a facility, and how to compare options with care.</p><Link href="/resources" className="text-link">Read overview <ArrowRight size={15} /></Link></article><article className="guide-card"><span className="guide-number">03</span><h3>Planning from another city</h3><p>A checklist for family members coordinating remotely, from information sharing to local handovers.</p><Link href="/resources" className="text-link">Read checklist <ArrowRight size={15} /></Link></article></div><div className="faq-section compact"><div className="faq-intro"><p className="eyebrow">Common questions</p><h2>A steadier place to <em>start asking.</em></h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronRight size={17} /></summary><p>{answer}</p></details>)}</div></div></div> }

function ContactPage() { return <div className="inner-page shell contact-page"><div className="contact-copy"><p className="eyebrow">Contact Aangan</p><h1>Tell us what would make <em>today lighter.</em></h1><p className="inner-lede">For immediate support, use the request form so we can understand the situation. For general questions, the contact points below are configurable placeholders until the business details are connected.</p><div className="contact-options"><a href="tel:+910000000000"><PhoneCall size={19} /><span><strong>Phone</strong><small>Phone number placeholder</small></span></a><a href="mailto:hello@example.com"><MessageCircle size={19} /><span><strong>Email</strong><small>hello@example.com</small></span></a><Link href="/request"><UserRound size={19} /><span><strong>Request a callback</strong><small>Share only what you’re comfortable sharing</small></span></Link></div></div><div className="contact-card"><span className="contact-card-mark"><HeartHandshake size={30} /></span><p className="eyebrow">A note on privacy</p><h3>We ask for enough to help, not everything about you.</h3><p>Personal details entered into the request flow are intended for service coordination. Connect your production privacy policy and retention settings before launch.</p><Link href="/request" className="button button-dark">Start a request <ArrowRight size={15} /></Link></div></div> }
