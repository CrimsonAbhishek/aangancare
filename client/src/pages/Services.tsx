import { ArrowRight, HeartHandshake, MapPin, MessageCircle, Package, Sparkles, Truck } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export const serviceItems = [
  { icon: HeartHandshake, title: "Immediate arrangements", text: "A clear starting point for the first calls, documents, timings, and decisions." },
  { icon: Truck, title: "Transport & movement", text: "Ask about transport, inter-city movement, airport coordination, or freezer box needs where configured." },
  { icon: Sparkles, title: "Ceremony support", text: "Ask about materials, flowers, priest coordination, and practical details where configured." },
  { icon: Package, title: "After-care arrangements", text: "Ask about Asthi Visarjan, Shraddh, Chautha, Terahvi, and related arrangements where configured." },
];

export default function Services() {
  usePageMeta("Services", "Explore funeral, cremation, transport, ceremony, and after-care support areas available through Aangan Care.");

  const allServices = serviceItems.concat([
    { icon: MessageCircle, title: "A clear point of contact", text: "A request reference and one place to return to when several decisions are moving at once." },
  ]);

  return (
    <div className="inner-page shell">
      <p className="eyebrow">Support areas</p>
      <h1>Everything that helps a family <em>move with dignity.</em></h1>
      <p className="inner-lede">
        Services are configured by location and availability. These are the ways a request may be oriented — not a promise that every option is active in every area.
      </p>
      <div className="service-directory">
        {allServices.map(({ icon: Icon, title, text }, index) => (
          <article key={title}>
            <div className="directory-icon">
              <Icon size={22} aria-hidden="true" />
            </div>
            <div>
              <span className="service-index">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <Link href="/request" className="text-link">
                Ask about this support <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="callout">
        <span>
          <MapPin size={18} aria-hidden="true" />
          <strong>Coverage is verified, not assumed.</strong>
        </span>
        <p>
          Tell us your city and preferred timing in a request. A coordinator can confirm what is available before you make a decision.
        </p>
        <Link href="/request" className="button button-dark button-small">
          Check my location <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
