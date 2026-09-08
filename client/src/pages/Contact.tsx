import { ArrowRight, FileText, HeartHandshake, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Contact() {
  usePageMeta(
    "Contact Aangan Care",
    "Get in touch with Aangan Care. Start a private funeral or cremation assistance request, read our privacy policy, or ask a policy question. We're here to help families move through a difficult day with clarity.",
    "/contact"
  );

  return (
    <div className="inner-page shell contact-page">
      <div className="contact-copy">
        <p className="eyebrow">Contact Aangan</p>
        <h1>Tell us what would make <em>today lighter.</em></h1>
        <p className="inner-lede">
          Business phone, email, service hours, address, and WhatsApp details have not been supplied yet, so this site does not fabricate them. Use the request channel for a private starting point, or ask a policy question through the legal pages.
        </p>
        <div className="contact-options">
          <Link href="/request">
            <HeartHandshake size={19} aria-hidden="true" />
            <span>
              <strong>Start a request</strong>
              <small>Share only what you’re comfortable sharing</small>
            </span>
          </Link>
          <Link href="/privacy">
            <ShieldCheck size={19} aria-hidden="true" />
            <span>
              <strong>Read privacy details</strong>
              <small>See what the current form collects</small>
            </span>
          </Link>
          <Link href="/cookies">
            <FileText size={19} aria-hidden="true" />
            <span>
              <strong>Read cookie policy</strong>
              <small>No optional tracking in the current build</small>
            </span>
          </Link>
          <Link href="/terms">
            <UserRound size={19} aria-hidden="true" />
            <span>
              <strong>Review the terms</strong>
              <small>Understand what a request reference means</small>
            </span>
          </Link>
        </div>
      </div>
      <div className="contact-card">
        <span className="contact-card-mark">
          <ShieldCheck size={30} aria-hidden="true" />
        </span>
        <p className="eyebrow">Business details required</p>
        <h3>Add the legal entity and verified contact channels before launch.</h3>
        <p>
          Use the administrative layer to connect the approved business name, registered address, service areas, hours, support channel, and complaint contact. Do not publish placeholders as if they were live contacts.
        </p>
        <Link href="/request" className="button button-dark">
          Start a request <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
