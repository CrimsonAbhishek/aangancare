# Aangan Care — compliance and launch risk review

**Review date:** 7 September 2026  
**Scope:** Public website, request form, operations preview, privacy/cookie controls, third-party assets, accessibility, and service-provider risk.  
**Prepared by:** Manus AI  

> This review is general product-risk information, not legal advice. The operating business should have an India-qualified lawyer review the final policies, contracts, service model, and launch locations.

## Executive conclusion

The website is now configured as a **request and information channel**, not as a confirmed booking, payment, crematorium, medical, legal, or government service. The current build collects a limited set of enquiry fields, records explicit processing and terms acknowledgements, does not load optional analytics or advertising, does not use third-party embeds, and provides connected privacy, terms, refund, and cookie policy routes.

The largest remaining launch blockers are operational rather than visual. The business must add its legal entity name, registered or principal address, verified customer-care and grievance channels, service hours, coverage locations, pricing or price methodology, provider identities, and approved service/refund terms. The business must also verify each crematorium, transport, ceremony, or after-care partner against the applicable municipal, public-health, environmental, fire, transport, and state/local requirements. A website cannot safely imply that a listed provider is authorised merely because it appears in a directory.

India’s Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 have staged commencement under the official November 2025 notification. The core operational duties should be treated as a design target now, but the exact commencement position must be rechecked before launch and before May 2027. Consumer-protection and e-commerce controls remain immediate concerns if the website accepts payment, facilitates bookings, or acts as a marketplace.

## What changed in this pass

| Area | Change | Current posture |
|---|---|---|
| Request workflow | Converted to three steps with progress rail, mobile progress bar, validation, and clear next/back controls. | Implemented |
| Form consent | Added separate unchecked consent for request processing and terms acknowledgement. Stored consent flags, policy versions, and consent timestamp. | Implemented |
| Data minimisation | Removed optional profile persistence from the auth hook. The request form does not ask for Aadhaar, identity documents, medical records, payment details, or precise location. | Implemented |
| Analytics and embeds | Removed the analytics script and external Google Fonts from the production document head. No social, map, video, chat, or advertising embed is loaded. | Implemented |
| Cookies | Added a connected cookie policy. The current production build uses only essential authentication cookies when the protected operations area is used. | Implemented; re-review if optional tools are added |
| Legal pages | Added connected privacy, terms, refund/cancellation, and cookie routes. | Implemented as clearly labelled drafts requiring business/legal configuration |
| Accessibility | Added labelled inputs, visible focus support, `role=alert` errors, `aria-current`, `aria-pressed`, keyboard-friendly controls, alt-equivalent text for the abstract hero art, and contrast adjustments. | Implemented; run a specialist audit before launch |
| Assets | Removed the temporary watermarked hero photograph and replaced it with original CSS artwork. | Implemented |
| Test data | Isolated request unit tests from the shared database and removed automated fixture rows. | Verified: request table count is 0 |

## Applicable risk areas

### 1. Privacy and digital personal data

The request flow collects names, phone numbers, optional email, city or locality, timing, selected service areas, and free-text notes. In a funeral context, even ordinary contact information can reveal a person’s bereavement, family relationship, location, or religious/customary preference. The website should therefore treat this data as high-care information and avoid sending it to analytics, ad platforms, crash logs, public URLs, or unapproved WhatsApp groups.

The privacy notice should identify the legal entity, purposes, categories of recipients, retention periods, security controls, grievance contact, rights or request process, and any overseas processing. It should be presented at the collection point in clear language. The business should publish English and relevant regional-language versions where practical.

The current database stores an explicit processing flag, a terms acknowledgement flag, the policy versions, and a consent timestamp. It does not currently store an IP address, browser fingerprint, identity document, or precise location. That is intentional data minimisation.

### 2. Cookies, analytics, and consent

No standalone Indian cookie-banner rule requiring one specific banner was identified in the official material reviewed. That does not make optional tracking risk-free. Cookies, SDKs, pixels, and device identifiers may form part of digital personal-data processing and should be disclosed and controlled.

The current production build uses no optional analytics or advertising. It uses only essential authentication cookies for the protected operations area. A disruptive cookie banner is therefore not required for the current configuration. If analytics, maps, chat, reCAPTCHA, social widgets, video players, session replay, or advertising are later added, they should be blocked until an appropriate choice is recorded, documented in a vendor inventory, and made withdrawable through a persistent preference route. Accept, reject, and manage choices should be equally clear.

Development-only Manus diagnostics are injected by the Vite development plugin and are not part of the production build. The team should not enable those diagnostics on a public deployment without a separate privacy review.

### 3. Consumer, e-commerce, and refund risk

If Aangan Care accepts payment, facilitates a booking, or acts as a marketplace or referral service, the Consumer Protection Act, 2019 and Consumer Protection (E-Commerce) Rules, 2020 should be treated as immediate design constraints. The business should disclose its legal identity, address, customer-care and grievance contacts, the actual service provider, material service terms, total price and taxes or fees, availability assumptions, cancellation rules, refund method and timing, and the entity responsible for performance.

The website should use clear affirmative acceptance rather than pre-ticked boxes. A request reference must not be described as a booking, availability confirmation, price quote, government approval, or guaranteed outcome. Refunds and cancellation charges must be aligned with the actual payment and partner model. A blanket “no refunds” promise should not be published without legal review.

The current website does not collect a payment or booking fee. Its refund page accurately states that the request creates an enquiry record only. Any future payment flow requires a policy update before money is accepted.

### 4. Local and funeral-service regulation

There is no single nationwide approval that can be assumed for every crematorium, funeral provider, transport service, or city. Requirements may involve the relevant municipal or local body, crematorium authority, State Pollution Control Board, fire and public-health authorities, land-use or trade registration, transport rules, and state-specific processes. Cross-border transport of human remains introduces additional airport health, consular, airline, customs, packaging, and destination-country requirements.

The business should maintain a provider register with the legal identity, facility address, approval or licence scope, expiry date, insurance, pricing, service area, complaint history, accessibility information, and renewal owner for each partner. The public website should say “availability to be confirmed” unless a current, documented service arrangement exists.

### 5. Advertising and claims

The site should not use unsupported claims such as “government approved,” “official,” “24/7,” “same-day guaranteed,” “lowest price,” “pan-India,” “pollution-free,” “all-inclusive,” “religiously authentic,” or “guaranteed cremation.” Every objective claim should have dated substantiation and a geographic or service-scope qualifier where necessary.

The current copy avoids fake reviews, fabricated customer counts, comparative claims, and guaranteed availability. The remaining business copy must be reviewed whenever real providers, prices, testimonials, or service metrics are added. Testimonial names, voices, photographs, and memorial stories require written permission and careful handling of living family members’ privacy and publicity rights.

### 6. Copyright and third-party assets

The former temporary watermarked research photograph was removed from the public hero. The replacement uses original CSS-rendered artwork. The favicon and brand assets are local project assets.

Every future photograph, illustration, map, font, music track, video, logo, review, and AI or stock asset should have a rights record. Retain the licence or assignment, permitted media and territory, duration, attribution requirements, model or property release, and takedown contact. Do not copy an image from search results, social media, a competitor, or a municipal page merely because it is publicly visible.

### 7. Accessibility and dignity

The current form includes semantic labels, visible focus states, keyboard-friendly buttons and checkboxes, clear error messages, progress state, contrast improvements, and an accessible description for the original hero artwork. The site avoids relying on colour alone for service selection and status.

A specialist audit should still test keyboard-only navigation, screen readers, reflow at 200% zoom, browser text enlargement, reduced motion, Hindi or other target-language content, accessible PDFs if added, and third-party widgets. Provide a phone or human alternative for people who cannot use the web form. The Rights of Persons with Disabilities Act and government accessibility guidance make accessibility a material risk area, even where the exact applicability to a private website depends on the business model and contracts.

## Launch checklist

| Priority | Launch condition | Owner |
|---|---|---|
| Blocker | Add legal entity name, address, customer-care contact, grievance contact, and service hours. | Business / counsel |
| Blocker | Decide whether the website is a direct provider, marketplace, agent, or lead-generation service. Reflect that role consistently in terms, privacy, pricing, and provider listings. | Business / counsel |
| Blocker | Verify every live provider and location with current approvals, insurance, scope, and renewal dates. | Operations |
| Blocker | Approve and publish final privacy, terms, refund, and cookie policies; replace `2026-09-07-draft` policy versions. | Counsel / business |
| Blocker | Define the retention, deletion, access, correction, withdrawal, and complaint workflow. | Privacy / operations |
| High | If payment is introduced, implement the complete payment, invoice, refund, chargeback, and cancellation flow before accepting money. | Product / finance |
| High | If optional analytics or embeds are introduced, add consent management, vendor inventory, preference withdrawal, and data-minimised configurations. | Product / privacy |
| High | Run an independent accessibility audit and remediate issues. | Product / accessibility reviewer |
| High | Store licences and releases for every image, font, logo, review, testimonial, and media asset. | Brand / legal |
| High | Review all claims and partner copy for substantiation and grief-sensitive advertising. | Marketing / counsel |
| Medium | Add route-level code splitting if bundle size or traffic justifies it. The current production JavaScript bundle is approximately 797 KB before compression. | Engineering |

## Official references

[1]: https://www.meity.gov.in/static/uploads/2024/06/2bf1e0e9f04e6fb4fef35e82c42aa5.pdf "Digital Personal Data Protection Act, 2023"
[2]: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf "Digital Personal Data Protection Rules, 2025"
[3]: https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf "G.S.R. 843(E), Digital Personal Data Protection Act commencement notification, 13 November 2025"
[4]: https://consumeraffairs.gov.in/public/upload/files/E%20commerce%20rules_1732703966.pdf "Consumer Protection (E-Commerce) Rules, 2020"
[5]: https://consumeraffairs.nic.in/public/upload/files/CCPA_Notification_1732707665.pdf "Guidelines for Prevention of Misleading Advertisements and Endorsements for Misleading Advertisements, 2022"
[6]: https://consumeraffairs.nic.in/public/upload/files/The%20Guidelines%20for%20Prevention%20and%20Regulation%20of%20Dark%20Patterns,%202023_1732707717.pdf "Guidelines for Prevention and Regulation of Dark Patterns, 2023"
[7]: https://consumerhelpline.gov.in/ "National Consumer Helpline"
[8]: https://www.cert-in.org.in/ "CERT-In official repository and cyber incident guidance"
[9]: https://depwd.gov.in/en/faqs-4/ "Department of Empowerment of Persons with Disabilities accessibility FAQ"
[10]: https://guidelines.india.gov.in/guidelines/ "Government of India Guidelines for Indian Government Websites and Apps"
[11]: https://copyright.gov.in/documents/handbook.html "Copyright Office handbook of copyright law"
[12]: https://cpcb.nic.in/cpcb-technical-guidelines-sops/ "Central Pollution Control Board technical guidelines and SOPs"
[13]: https://ihpoe.mohfw.gov.in/humanremains.php "Airport Health Organization guidance on health clearance of human remains"
[14]: https://www.trai.gov.in/advice-to-senders "TRAI advice to senders and telemarketers"
