import { ArrowLeft, ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const copy = {
  privacy: { eyebrow: "Privacy policy", title: "A clear promise about the details you share.", body: "This page is a production-ready content placeholder. Before launch, connect the business’s approved privacy policy, data retention periods, lawful basis, contact details, and user rights process." },
  terms: { eyebrow: "Terms & conditions", title: "The practical boundaries around using Aangan Care.", body: "This page is a production-ready content placeholder. Before launch, connect the approved terms covering service scope, availability confirmation, third-party facility information, user responsibilities, and governing law." },
  refunds: { eyebrow: "Refund & cancellation", title: "Clarity when plans change.", body: "This page is a production-ready content placeholder. Before launch, connect the approved policy for cancellations, deposits, refunds, third-party charges, and any service-specific exceptions." },
} as const;

type LegalKind = keyof typeof copy;
export default function LegalPage({ kind }: { kind: LegalKind }) {
  const content = copy[kind];
  return <div className="inner-page shell legal-page"><Link href="/" className="text-link"><ArrowLeft size={15} /> Back to Aangan</Link><div className="legal-layout"><div><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p className="inner-lede">{content.body}</p><Link href="/contact" className="button button-dark">Ask about this policy <ArrowRight size={15} /></Link></div><div className="legal-card"><span><ShieldCheck size={22} /></span><h3>Designed for a verified launch</h3><p>Keep this route in the information architecture now, then replace the placeholder copy with approved business and legal details before collecting live requests.</p><div className="legal-card-foot"><FileText size={15} /> Last updated: configurable</div></div></div></div>;
}
