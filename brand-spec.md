# Aangan Care — Brand and trust specification

## Design read

Aangan Care is a public-facing funeral and cremation assistance request platform for Indian families who may be under significant emotional stress. The visual language is quiet editorial hospitality: warm ivory, deep ink, muted sage, and a restrained marigold action color. The public experience is intentionally calm and information-light, while the request flow uses progressive disclosure and visible progress to reduce cognitive load.

## Tokens and accessibility

The primary ink is `#181817`, the body secondary is `#5C5A54`, the accessible marigold text token is `#915B13`, and the sage token is `#435642`. The marigold text token was darkened from the initial concept colour after contrast checking; it now clears 4.5:1 against the ivory background. Focus indicators remain visible and the request form supports keyboard navigation, labelled fields, `aria-current`, pressed states, error alerts, and reduced-motion preferences.

## Assets and copyright posture

The public hero now uses the clean white-flower asset at `/manus-storage/aangan-white-flower-clean_70e638c2.webp`, with the requested editorial note and care seal rendered as live HTML for responsive layout and accessibility. Confirm its usage rights or replace it with an owned/licensed equivalent before production launch. The favicon and PWA icons are generated from the Aangan mark. No third-party maps, chat widgets, social embeds, video players, ad pixels, or external font files are loaded by the current production document.

## Privacy and tracking posture

The current document head does not load the Umami analytics script. The public build uses no optional analytics or advertising storage. Essential authentication cookies may be used for the protected operations area. Development-only Manus diagnostics are injected only by the development Vite plugin and are not part of production output. Authenticated user profile data is no longer copied to localStorage by the client hook.

## Legal and operational posture

The site includes connected privacy, terms, refund/cancellation, and cookie policy routes. These pages deliberately identify the legal entity, business contacts, retention schedule, service areas, pricing, partner responsibilities, and complaint contacts as configuration requirements rather than fabricating them. The final content still requires review by an India-qualified lawyer and confirmation by the operating business before public launch.
