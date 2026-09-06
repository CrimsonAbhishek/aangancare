import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import RequestPage from "@/pages/Request";
import AdminPage from "@/pages/Admin";
import LegalPage from "@/pages/Legal";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteShell from "./components/SiteShell";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return <SiteShell><Switch>
    <Route path="/" component={Home} />
    <Route path="/services" component={Home} />
    <Route path="/resources" component={Home} />
    <Route path="/contact" component={Home} />
    <Route path="/request" component={RequestPage} />
    <Route path="/admin" component={AdminPage} />
    <Route path="/privacy"><LegalPage kind="privacy" /></Route>
    <Route path="/terms"><LegalPage kind="terms" /></Route>
    <Route path="/refunds"><LegalPage kind="refunds" /></Route>
    <Route path="/cookies"><LegalPage kind="cookies" /></Route>
    <Route path="/cookie-policy"><LegalPage kind="cookies" /></Route>
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></SiteShell>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
