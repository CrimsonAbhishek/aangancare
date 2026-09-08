import { ChevronRight, FileText } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export const resourceFaqs = [
  ["What should I do first after a death?", "Start by ensuring the family is together and the immediate legal or medical steps are underway. Our guide is a general orientation, not a substitute for local authority or professional advice."],
  ["Can someone coordinate from another city?", "The request flow is designed for family members arranging support remotely. Share the current location and preferred contact; a coordinator can clarify what is possible."],
  ["Do you cover my city?", "Coverage is configured location by location. Share your city in a request and availability can be checked rather than assumed."],
];

export default function Resources() {
  usePageMeta(
    "Family Funeral Guide &amp; Bereavement Resources",
    "Clear, culturally aware starting points for Indian families navigating a difficult day. Guides covering what to do after a death, cremation basics, planning from another city, and common questions answered.",
    "/resources"
  );

  return (
    <div className="inner-page shell">
      <p className="eyebrow">Family guide</p>
      <h1>Useful information for <em>the moments around a farewell.</em></h1>
      <p className="inner-lede">
        Clear, culturally aware starting points. This content is educational and should be read alongside guidance from local authorities and professionals.
      </p>
      <div className="guide-grid">
        <article className="guide-card guide-primary" id="immediate">
          <span className="guide-number">01</span>
          <FileText size={28} aria-hidden="true" />
          <p className="resource-type">Immediate procedures</p>
          <h3>What to do after a death</h3>
          <p>A simple orientation to the first calls, documents, transport, and what can wait until tomorrow.</p>
          <Link href="/request" className="text-link">
            Request immediate assistance &rarr;
          </Link>
        </article>
        <article className="guide-card">
          <span className="guide-number">02</span>
          <h3>Cremation basics</h3>
          <p>Understand common questions to ask a facility and how to compare options with care.</p>
          <Link href="/request" className="text-link">
            Ask about facilities &rarr;
          </Link>
        </article>
        <article className="guide-card">
          <span className="guide-number">03</span>
          <h3>Planning from another city</h3>
          <p>A checklist for family members coordinating remotely, from information sharing to local handovers.</p>
          <Link href="/request" className="text-link">
            Start remote request &rarr;
          </Link>
        </article>
      </div>
      <div className="faq-section compact">
        <div className="faq-intro">
          <p className="eyebrow">Common questions</p>
          <h2>A steadier place to <em>start asking.</em></h2>
        </div>
        <div className="faq-list">
          {resourceFaqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronRight size={17} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
