import { ArrowLeft, ArrowRight, Check, Clock3, HeartHandshake, MapPin, Phone, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { usePageMeta } from "@/hooks/usePageMeta";
import { trackEvent } from "@/lib/analytics";

type RequestForm = {
  urgency: "immediate" | "planned";
  services: string[];
  city: string;
  timing: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  consentToProcess: boolean;
  termsAcknowledged: boolean;
};

const steps = ["Your need", "Where & when", "Your contact"];
const serviceOptions = ["Cremation assistance", "Transport", "Funeral materials", "Priest / ceremony", "After-care arrangements"];

export default function RequestPage() {
  usePageMeta("Request assistance", "Submit a private request for funeral and cremation assistance. Only essential details are collected.");
  const params = new URLSearchParams(window.location.search);
  const initialUrgency = params.get("urgency") === "immediate" ? "immediate" : "planned";
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState<RequestForm>({
    urgency: initialUrgency,
    services: ["Cremation assistance"],
    city: "",
    timing: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    consentToProcess: false,
    termsAcknowledged: false,
  });

  const createRequest = trpc.requests.create.useMutation({
    onSuccess: (data) => {
      setErrorMessage("");
      setSubmitted(data.referenceNumber);
    },
    onError: (error) => setErrorMessage(error.message || "We could not create the request. Please try again."),
  });

  const update = <K extends keyof RequestForm>(key: K, value: RequestForm[K]) => {
    setErrorMessage("");
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleService = (service: string) => update("services", form.services.includes(service) ? form.services.filter((item) => item !== service) : [...form.services, service]);

  const validateStep = (currentStep: number) => {
    if (currentStep === 0 && form.services.length === 0) {
      setErrorMessage("Choose at least one support area so we know where to start.");
      return false;
    }
    if (currentStep === 1 && (!form.city.trim() || !form.timing)) {
      setErrorMessage("Add a city or locality and choose a preferred timing to continue.");
      return false;
    }
    if (currentStep === 2 && (!form.name.trim() || !form.phone.trim() || (form.email && !/^\S+@\S+\.\S+$/.test(form.email)))) {
      setErrorMessage("Add your name and phone number, and check the email format if you provided one.");
      return false;
    }
    return true;
  };

  const goToStep = (nextStep: number) => {
    if (nextStep <= step || validateStep(step)) {
      setErrorMessage("");
      setStep(nextStep);
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    if (honeypot) return; // silent rejection for bots
    if (!validateStep(2)) return;
    if (!form.consentToProcess || !form.termsAcknowledged) {
      setErrorMessage("Please confirm the privacy and terms checkboxes before creating the request.");
      return;
    }
    trackEvent("request_submitted", { urgency: form.urgency });
    createRequest.mutate({ ...form, consentToProcess: true, termsAcknowledged: true });
  };

  if (submitted) return <div className="request-page shell request-success"><div className="success-mark" aria-hidden="true"><Check size={34} /></div><p className="eyebrow">Request received</p><h1>A calm next step is <em>on its way.</em></h1><p className="inner-lede">Your private reference number is below. Keep it handy if you need to follow up. A coordinator will contact you using the details you shared. This reference is not a booking or confirmation of availability.</p><div className="reference-card"><span>Reference number</span><strong>{submitted}</strong><small>We have not confirmed availability yet. That happens in the next conversation.</small></div><div className="success-actions"><Link href="/" className="button button-dark">Return home <ArrowRight size={15} /></Link><Link href="/contact" className="text-link"><Phone size={15} /> View contact options</Link></div></div>;

  return <div className="request-page shell"><div className="request-top"><Link href="/" className="text-link"><ArrowLeft size={15} /> Back to Aangan</Link><span><ShieldCheck size={15} aria-hidden="true" /> Only necessary request details</span></div><div className="request-layout"><aside className="request-sidebar"><p className="eyebrow">Request support</p><h1>Start with <em>what you know.</em></h1><p>It’s okay if some details are still unclear. We’ll use this to orient the first conversation, not to make assumptions.</p><ol className="step-list" aria-label="Request progress">{steps.map((label, index) => <li className={step === index ? "active" : step > index ? "done" : ""} key={label}><button type="button" onClick={() => goToStep(index)} disabled={index > step} aria-current={step === index ? "step" : undefined}><span aria-hidden="true">{step > index ? <Check size={14} /> : `0${index + 1}`}</span><strong>{label}</strong></button></li>)}</ol><div className="request-help"><HeartHandshake size={19} aria-hidden="true" /><span><strong>Need a human first?</strong><small>Use the contact options if you would rather ask a question before submitting a request.</small></span></div></aside><form className="request-form" onSubmit={submit} noValidate><input type="text" name="website_url" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" className="sr-only" /><div className="progress-mobile"><span>Step {String(step + 1).padStart(2, "0")} of {steps.length}</span><strong>{steps[step]}</strong><div className="progress-bar" aria-hidden="true"><span style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div></div>{errorMessage && <div className="form-error" role="alert">{errorMessage}</div>}{step === 0 && <><div className="form-heading"><span className="form-step">Step 01 / 03</span><h2>What kind of support do you need?</h2><p>Choose the closest fit. You can add more than one.</p></div><fieldset className="fieldset-reset"><legend className="sr-only">Urgency</legend><div className="urgency-grid"><button type="button" className={form.urgency === "immediate" ? "urgency-card selected" : "urgency-card"} aria-pressed={form.urgency === "immediate"} onClick={() => update("urgency", "immediate")}><Clock3 size={22} aria-hidden="true" /><span><strong>Immediate help</strong><small>Something needs arranging now or today.</small></span></button><button type="button" className={form.urgency === "planned" ? "urgency-card selected" : "urgency-card"} aria-pressed={form.urgency === "planned"} onClick={() => update("urgency", "planned")}><MapPin size={22} aria-hidden="true" /><span><strong>Planned arrangements</strong><small>You’re preparing ahead or arranging for a later date.</small></span></button></div></fieldset><fieldset className="fieldset-reset"><legend className="field-label">Support areas <span className="visually-muted">Choose at least one</span></legend><div className="service-pills">{serviceOptions.map((service) => <button type="button" key={service} className={form.services.includes(service) ? "pill selected" : "pill"} aria-pressed={form.services.includes(service)} onClick={() => toggleService(service)}>{form.services.includes(service) && <Check size={13} aria-hidden="true" />}{service}</button>)}</div></fieldset><button type="button" className="button button-dark form-next" onClick={() => goToStep(1)}>Continue to location <ArrowRight size={15} aria-hidden="true" /></button></>}{step === 1 && <><div className="form-heading"><span className="form-step">Step 02 / 03</span><h2>Where and when should we plan for?</h2><p>Availability depends on location. A city is enough to begin.</p></div><label className="field" htmlFor="request-city"><span>Current city or locality <b aria-hidden="true">*</b></span><input id="request-city" name="city" autoComplete="address-level2" required value={form.city} onChange={(event) => update("city", event.target.value)} placeholder="e.g. Bengaluru, Karnataka" /></label><label className="field" htmlFor="request-timing"><span>Preferred timing <b aria-hidden="true">*</b></span><select id="request-timing" name="timing" autoComplete="off" value={form.timing} onChange={(event) => update("timing", event.target.value)} required><option value="" disabled>Select one</option><option value="As soon as possible">As soon as possible</option><option value="Today">Today</option><option value="Tomorrow">Tomorrow</option><option value="A future date">A future date</option><option value="I’m not sure yet">I’m not sure yet</option></select></label><div className="form-note"><MapPin size={17} aria-hidden="true" /><span>Coverage and facility details are verified by a coordinator. The website does not imply availability before confirmation.</span></div><div className="form-actions"><button type="button" className="button button-ghost" onClick={() => setStep(0)}><ArrowLeft size={15} aria-hidden="true" /> Back</button><button type="button" className="button button-dark" onClick={() => goToStep(2)}>Continue to contact <ArrowRight size={15} aria-hidden="true" /></button></div></>}{step === 2 && <><div className="form-heading"><span className="form-step">Step 03 / 03</span><h2>Where should we send the next step?</h2><p>Only the best way to reach you. Email is optional.</p></div><label className="field" htmlFor="request-name"><span>Your name <b aria-hidden="true">*</b></span><input id="request-name" name="name" autoComplete="name" required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Name of the family contact" /></label><label className="field" htmlFor="request-phone"><span>Phone number <b aria-hidden="true">*</b></span><input id="request-phone" name="phone" autoComplete="tel" required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="10-digit mobile number" /></label><label className="field" htmlFor="request-email"><span>Email <small>optional</small></span><input id="request-email" name="email" autoComplete="email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" /></label><label className="field" htmlFor="request-notes"><span>Anything else we should know? <small>optional</small></span><textarea id="request-notes" name="notes" rows={4} value={form.notes} onChange={(event) => update("notes", event.target.value)} placeholder="A preferred language, a time to call, or a detail that would help us orient the conversation." /></label><fieldset className="consent-group"><legend className="sr-only">Request consent</legend><label className="consent-row"><input type="checkbox" name="consentToProcess" checked={form.consentToProcess} onChange={(event) => update("consentToProcess", event.target.checked)} /><span>I agree that Aangan Care may use these details to respond to this request and coordinate the next step. <Link href="/privacy">Read the privacy policy</Link>.</span></label><label className="consent-row"><input type="checkbox" name="termsAcknowledged" checked={form.termsAcknowledged} onChange={(event) => update("termsAcknowledged", event.target.checked)} /><span>I have read and accept the <Link href="/terms">terms and conditions</Link>. I understand this request is not a booking or confirmation.</span></label></fieldset><div className="form-note"><ShieldCheck size={17} aria-hidden="true" /><span>We do not request payment details, identity documents, Aadhaar numbers, medical records, or precise location in this form. See the <Link href="/cookies">cookie policy</Link> for essential storage details.</span></div><div className="form-actions"><button type="button" className="button button-ghost" onClick={() => setStep(1)}><ArrowLeft size={15} aria-hidden="true" /> Back</button><button type="submit" className="button button-dark" disabled={createRequest.isPending}>{createRequest.isPending ? "Creating request…" : "Create private request"} <ArrowRight size={15} aria-hidden="true" /></button></div></>}</form></div></div>;
}
