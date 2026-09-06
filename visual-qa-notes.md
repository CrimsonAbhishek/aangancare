# Visual QA notes — compliance hardening pass

Desktop and mobile screenshots were captured for `/`, `/request`, `/privacy`, `/cookies`, and `/admin` at 1280×720 and 375×812.

The homepage remains visually coherent after replacing the former temporary photograph with original CSS botanical artwork. The request page shows a clear three-step progress rail on desktop and a compact progress bar on mobile. Policy pages are readable at both widths, and the cookie policy explains that the current production build has no optional analytics or third-party embeds. The operations preview is navigable and its queue export control is connected.

The mobile request screenshot confirms that the primary hierarchy, back link, urgent details note, step list, and progress bar fit the viewport without horizontal overflow. The mobile legal pages stack the policy card beneath the introduction as intended.

The admin screenshot revealed rows created by automated request tests in the shared project database. These are test records, not user submissions, and must be removed before delivery so the operations preview does not expose fixture data.
