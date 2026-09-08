import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteShell from "./components/SiteShell";
import CookieConsent from "./components/CookieConsent";
import { ThemeProvider } from "./contexts/ThemeContext";
import { initAnalytics } from "./lib/analytics";

const ServicesPage = lazy(() => import("@/pages/Services"));
const ResourcesPage = lazy(() => import("@/pages/Resources"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const RequestPage = lazy(() => import("@/pages/Request"));
const AdminPage = lazy(() => import("@/pages/Admin"));
const LegalPage = lazy(() => import("@/pages/Legal"));
const SitemapPage = lazy(() => import("@/pages/Sitemap"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageLoader() {
  return (
    <div className="shell" style={{ paddingTop: "120px", paddingBottom: "120px", textAlign: "center" }}>
      <p style={{ color: "var(--ink-400)", fontSize: "12px" }}>Loading…</p>
    </div>
  );
}

function Router() {
  return (
    <SiteShell>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/resources" component={ResourcesPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/request" component={RequestPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/privacy">{() => <LegalPage kind="privacy" />}</Route>
          <Route path="/terms">{() => <LegalPage kind="terms" />}</Route>
          <Route path="/refunds">{() => <LegalPage kind="refunds" />}</Route>
          <Route path="/cookies">{() => <LegalPage kind="cookies" />}</Route>
          <Route path="/cookie-policy">{() => <LegalPage kind="cookies" />}</Route>
          <Route path="/sitemap" component={SitemapPage} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </SiteShell>
  );
}

export default function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
