import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Filter,
  Lock,
  MapPin,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { usePageMeta } from "@/hooks/usePageMeta";
import AdminLockScreen, { isConsoleUnlocked, lockConsole } from "@/components/AdminLockScreen";
import AuditLogModal from "@/components/AuditLogModal";

type AdminTab = "overview" | "requests" | "locations" | "services" | "resources" | "team" | "config";

const previewRequests = [
  { ref: "AC-7K4P-26", person: "Family contact", need: "Cremation assistance · Transport", place: "Bengaluru, Karnataka", status: "NEW", time: "8 min ago" },
  { ref: "AC-4F2M-26", person: "Remote family member", need: "Planned arrangements", place: "Mumbai, Maharashtra", status: "CONTACTED", time: "42 min ago" },
  { ref: "AC-9D8Q-26", person: "Family contact", need: "After-care arrangements", place: "Delhi NCR", status: "CONFIRMED", time: "Yesterday" },
  { ref: "AC-2B8V-26", person: "Next of kin", need: "Transport & movement", place: "Hyderabad, Telangana", status: "NEW", time: "2 hours ago" },
  { ref: "AC-5R1N-26", person: "Family contact", need: "Immediate arrangements", place: "Chennai, Tamil Nadu", status: "CONTACTED", time: "3 hours ago" },
];

const coverageLocations = [
  { city: "Bengaluru", state: "Karnataka", status: "Active Coverage", coordinators: "2 Active", sla: "< 30 mins" },
  { city: "Mumbai", state: "Maharashtra", status: "Active Coverage", coordinators: "2 Active", sla: "< 30 mins" },
  { city: "Delhi NCR", state: "National Capital Region", status: "Active Coverage", coordinators: "1 Active", sla: "< 45 mins" },
  { city: "Hyderabad", state: "Telangana", status: "Active Coverage", coordinators: "1 Active", sla: "< 45 mins" },
  { city: "Chennai", state: "Tamil Nadu", status: "Active Coverage", coordinators: "1 Active", sla: "< 45 mins" },
  { city: "Kolkata", state: "West Bengal", status: "On-Request Partner", coordinators: "Remote verification", sla: "< 2 hours" },
  { city: "Pune", state: "Maharashtra", status: "Active Coverage", coordinators: "1 Active", sla: "< 45 mins" },
];

const managedServices = [
  { id: "SRV-01", name: "Immediate arrangements", category: "Core Assistance", description: "First calls, document guidance, timing coordination.", active: true },
  { id: "SRV-02", name: "Transport & movement", category: "Logistics", description: "City hearse, inter-city transport, freezer box coordination.", active: true },
  { id: "SRV-03", name: "Ceremony support", category: "Customs & Care", description: "Materials, flowers, priest and ground coordination.", active: true },
  { id: "SRV-04", name: "After-care arrangements", category: "Continuity", description: "Asthi Visarjan, Shraddh, Chautha, and follow-up support.", active: true },
];

type QueueItem = { ref: string; person: string; need: string; place: string; status: string; time: string };

function downloadQueue(rows: QueueItem[]) {
  const csv = [
    "Reference,Contact,Need,Location,Status,Received",
    ...rows.map((row) =>
      [row.ref, row.person, row.need, row.place, row.status, row.time]
        .map((value) => `"${value.replaceAll('"', '""')}"`)
        .join(",")
    ),
  ].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "aangan-request-queue.csv";
  anchor.click();
  URL.revokeObjectURL(url);
  toast.success("Request queue downloaded.");
}

export default function AdminPage() {
  usePageMeta("Operations", "Protected operations dashboard for managing requests, services, and team access.");
  const [unlocked, setUnlocked] = useState(() => isConsoleUnlocked());
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [requestSearch, setRequestSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const { user, isAuthenticated } = useAuth();

  const liveQuery = trpc.requests.recent.useQuery(undefined, {
    enabled: Boolean(unlocked && isAuthenticated && user?.role === "admin"),
  });

  const liveRequests: QueueItem[] = (liveQuery.data ?? []).map((request) => ({
    ref: request.publicReference,
    person: request.name,
    need: (() => {
      try {
        return (JSON.parse(request.services) as string[]).join(" · ");
      } catch {
        return "Support request";
      }
    })(),
    place: request.city,
    status: request.status,
    time: new Date(request.createdAt).toLocaleString(),
  }));

  const allRows = liveRequests.length > 0 ? liveRequests : previewRequests;

  const filteredRequests = useMemo(() => {
    return allRows.filter((row) => {
      const matchesStatus = statusFilter === "ALL" || row.status.toUpperCase() === statusFilter.toUpperCase();
      const matchesSearch =
        requestSearch === "" ||
        row.ref.toLowerCase().includes(requestSearch.toLowerCase()) ||
        row.person.toLowerCase().includes(requestSearch.toLowerCase()) ||
        row.need.toLowerCase().includes(requestSearch.toLowerCase()) ||
        row.place.toLowerCase().includes(requestSearch.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [allRows, statusFilter, requestSearch]);

  const handleLock = () => {
    lockConsole();
    setUnlocked(false);
    toast.info("Console locked.");
  };

  if (!unlocked) {
    return <AdminLockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <Link href="/" className="brand">
            <span className="brand-mark">
              <Activity size={18} aria-hidden="true" />
            </span>
            <span className="brand-copy">
              <strong>Aangan</strong>
              <small>operations</small>
            </span>
          </Link>

          <nav className="admin-nav" aria-label="Operations navigation">
            <span className="admin-nav-title">Workspace</span>
            <button
              type="button"
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              <Activity size={16} aria-hidden="true" /> Overview
            </button>
            <button
              type="button"
              className={activeTab === "requests" ? "active" : ""}
              onClick={() => setActiveTab("requests")}
            >
              <Clock3 size={16} aria-hidden="true" /> Requests <b>{allRows.length}</b>
            </button>
            <button
              type="button"
              className={activeTab === "locations" ? "active" : ""}
              onClick={() => setActiveTab("locations")}
            >
              <MapPin size={16} aria-hidden="true" /> Locations
            </button>
            <button
              type="button"
              className={activeTab === "services" ? "active" : ""}
              onClick={() => setActiveTab("services")}
            >
              <Package size={16} aria-hidden="true" /> Services &amp; packages
            </button>
            <button
              type="button"
              className={activeTab === "resources" ? "active" : ""}
              onClick={() => setActiveTab("resources")}
            >
              <FileText size={16} aria-hidden="true" /> Resources
            </button>

            <span className="admin-nav-title">System</span>
            <button
              type="button"
              className="admin-nav-action-btn"
              onClick={() => setAuditModalOpen(true)}
            >
              <FileText size={16} aria-hidden="true" /> Audit logs
            </button>
            <button
              type="button"
              className={activeTab === "team" ? "active" : ""}
              onClick={() => setActiveTab("team")}
            >
              <Users size={16} aria-hidden="true" /> Team access
            </button>
            <button
              type="button"
              className={activeTab === "config" ? "active" : ""}
              onClick={() => setActiveTab("config")}
            >
              <Settings2 size={16} aria-hidden="true" /> Configuration
            </button>
          </nav>

          <div className="admin-sidebar-bottom">
            <button
              type="button"
              className="admin-lock-action"
              onClick={handleLock}
              title="Lock operations console"
            >
              <Lock size={14} aria-hidden="true" /> Lock console
            </button>
            <Link href="/" className="admin-exit">
              View public site <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <div>
              <span className="admin-kicker">
                Operations / {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </span>
              <h1>
                {activeTab === "overview" && `Good morning, ${user?.name?.split(" ")[0] || "team"}.`}
                {activeTab === "requests" && "Incoming Service Requests"}
                {activeTab === "locations" && "Verified Coverage & Locations"}
                {activeTab === "services" && "Support Offerings & Packages"}
                {activeTab === "resources" && "Family Resources & Guides"}
                {activeTab === "team" && "Team Access & Permissions"}
                {activeTab === "config" && "Platform & Legal Configuration"}
              </h1>
            </div>

            <div className="admin-user">
              <button
                type="button"
                className="button button-outline button-small"
                onClick={handleLock}
                style={{ marginRight: "12px", gap: "6px" }}
              >
                <Lock size={13} aria-hidden="true" /> Lock console
              </button>
              <span className="status-dot" aria-hidden="true" />
              {isAuthenticated ? "Signed in" : "Preview mode"}
              <button
                className="icon-button"
                type="button"
                aria-label="Show operations status"
                onClick={() =>
                  toast.info(
                    isAuthenticated
                      ? "You are signed in to the operations surface."
                      : "Preview mode is showing sample queue data."
                  )
                }
              >
                <MoreHorizontal size={18} aria-hidden="true" />
              </button>
            </div>
          </header>

          {!isAuthenticated && (
            <div className="admin-auth-banner">
              <ShieldCheck size={18} aria-hidden="true" />
              <div>
                <strong>This is a protected operations surface.</strong>
                <p>Sign in to manage requests, services, team access, and verified location coverage.</p>
              </div>
              <button className="button button-dark button-small" type="button" onClick={() => startLogin()}>
                Sign in to continue <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              <section className="stat-grid">
                <div className="stat-card">
                  <span>Open requests</span>
                  <strong>{String(allRows.length).padStart(2, "0")}</strong>
                  <small>Active queue</small>
                </div>
                <div className="stat-card">
                  <span>Awaiting contact</span>
                  <strong>
                    {allRows.filter((row) => row.status === "NEW").length.toString().padStart(2, "0")}
                  </strong>
                  <small>Needs a coordinator</small>
                </div>
                <div className="stat-card">
                  <span>Configured locations</span>
                  <strong>07</strong>
                  <small>Verified cities</small>
                </div>
                <div className="stat-card">
                  <span>Published services</span>
                  <strong>04</strong>
                  <small>Active care areas</small>
                </div>
              </section>

              <section className="admin-content-grid">
                <div className="panel request-panel">
                  <div className="panel-heading">
                    <div>
                      <span className="admin-kicker">Request queue</span>
                      <h2>Recent requests</h2>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="button button-outline button-small"
                        type="button"
                        onClick={() => setActiveTab("requests")}
                      >
                        View all <ArrowRight size={14} aria-hidden="true" />
                      </button>
                      <button
                        className="button button-outline button-small"
                        type="button"
                        onClick={() => downloadQueue(allRows)}
                      >
                        Export CSV <ArrowUpRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="request-table">
                    <div className="table-row table-head">
                      <span>Reference / contact</span>
                      <span>Need</span>
                      <span>Stage</span>
                      <span>Received</span>
                    </div>
                    {allRows.slice(0, 3).map((request) => (
                      <div className="table-row" key={request.ref}>
                        <div>
                          <strong>{request.ref}</strong>
                          <small>{request.person}</small>
                        </div>
                        <div>
                          <span>{request.need}</span>
                          <small>{request.place}</small>
                        </div>
                        <div>
                          <span className={`status status-${request.status.toLowerCase()}`}>
                            {request.status}
                          </span>
                        </div>
                        <small>{request.time}</small>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "14px 21px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => setActiveTab("requests")}
                    >
                      Open full request queue &rarr;
                    </button>
                    <a
                      href="/request"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                      style={{ fontSize: "11px", color: "var(--ink-400)" }}
                    >
                      Open public request form <ExternalLink size={12} style={{ display: "inline", verticalAlign: "middle" }} />
                    </a>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-heading">
                    <div>
                      <span className="admin-kicker">Quick actions</span>
                      <h2>Keep the system current</h2>
                    </div>
                  </div>
                  <div className="quick-actions">
                    <button type="button" className="quick-action-btn" onClick={() => setActiveTab("services")}>
                      <span><Plus size={17} aria-hidden="true" /></span>
                      <strong>Add or edit service<small>Review support areas</small></strong>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                    <button type="button" className="quick-action-btn" onClick={() => setActiveTab("locations")}>
                      <span><MapPin size={17} aria-hidden="true" /></span>
                      <strong>Manage locations<small>Check coverage &amp; SLAs</small></strong>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                    <button type="button" className="quick-action-btn" onClick={() => setActiveTab("resources")}>
                      <span><FileText size={17} aria-hidden="true" /></span>
                      <strong>Review family guides<small>Open guide manager</small></strong>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </section>

              <section className="panel activity-panel">
                <div className="panel-heading">
                  <div>
                    <span className="admin-kicker">System activity</span>
                    <h2>Recent audit events</h2>
                  </div>
                  <button
                    className="button button-ghost button-small"
                    type="button"
                    onClick={() => setAuditModalOpen(true)}
                  >
                    View audit log <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
                <div className="activity-list">
                  <div>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    <p>
                      <strong>Public request consent is captured with each submission</strong>
                      <small>Privacy · current build</small>
                    </p>
                  </div>
                  <div>
                    <ShieldCheck size={17} aria-hidden="true" />
                    <p>
                      <strong>Role-based access is enabled for administrators</strong>
                      <small>Security · current build</small>
                    </p>
                  </div>
                  <div>
                    <FileText size={17} aria-hidden="true" />
                    <p>
                      <strong>Public legal and cookie routes are connected</strong>
                      <small>Content · current build</small>
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: REQUESTS QUEUE */}
          {activeTab === "requests" && (
            <div className="panel" style={{ marginTop: "24px" }}>
              <div className="panel-heading">
                <div>
                  <span className="admin-kicker">Operations / Request Queue</span>
                  <h2>All service requests ({filteredRequests.length})</h2>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="button button-outline button-small"
                    type="button"
                    onClick={() => downloadQueue(filteredRequests)}
                  >
                    Download CSV <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                  <a
                    href="/request"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-dark button-small"
                  >
                    Test form <ExternalLink size={13} style={{ display: "inline", verticalAlign: "middle" }} />
                  </a>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div style={{ display: "flex", gap: "12px", padding: "12px 21px", background: "var(--sand-50)", borderTop: "1px solid #eef0eb", borderBottom: "1px solid #eef0eb" }}>
                <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
                  <Search size={15} style={{ position: "absolute", left: "10px", color: "var(--ink-400)" }} />
                  <input
                    type="text"
                    placeholder="Search by reference, contact name, or locality..."
                    value={requestSearch}
                    onChange={(e) => setRequestSearch(e.target.value)}
                    style={{ width: "100%", padding: "6px 12px 6px 32px", fontSize: "12px", border: "1px solid var(--ink-200)", borderRadius: "4px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Filter size={14} style={{ color: "var(--ink-400)" }} />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: "6px 10px", fontSize: "12px", border: "1px solid var(--ink-200)", borderRadius: "4px", background: "#fff" }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="CONFIRMED">Confirmed</option>
                  </select>
                </div>
              </div>

              <div className="request-table">
                <div className="table-row table-head">
                  <span>Reference / contact</span>
                  <span>Need</span>
                  <span>Stage</span>
                  <span>Received</span>
                </div>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <div className="table-row" key={request.ref}>
                      <div>
                        <strong>{request.ref}</strong>
                        <small>{request.person}</small>
                      </div>
                      <div>
                        <span>{request.need}</span>
                        <small>{request.place}</small>
                      </div>
                      <div>
                        <span className={`status status-${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </div>
                      <small>{request.time}</small>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "36px", textAlign: "center", color: "var(--ink-400)", fontSize: "13px" }}>
                    No service requests match your search filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: LOCATIONS */}
          {activeTab === "locations" && (
            <div className="panel" style={{ marginTop: "24px" }}>
              <div className="panel-heading">
                <div>
                  <span className="admin-kicker">Operations / Locations</span>
                  <h2>Configured coverage areas ({coverageLocations.length})</h2>
                </div>
                <button
                  type="button"
                  className="button button-dark button-small"
                  onClick={() => toast.info("New coverage city configuration ready for deployment.")}
                >
                  <Plus size={14} /> Add coverage city
                </button>
              </div>

              <div className="request-table">
                <div className="table-row table-head" style={{ gridTemplateColumns: "1.2fr 1fr 1fr 1fr" }}>
                  <span>City &amp; State</span>
                  <span>Coverage Status</span>
                  <span>Coordinators</span>
                  <span>Response SLA</span>
                </div>
                {coverageLocations.map((loc) => (
                  <div className="table-row" key={loc.city} style={{ gridTemplateColumns: "1.2fr 1fr 1fr 1fr" }}>
                    <div>
                      <strong>{loc.city}</strong>
                      <small>{loc.state}</small>
                    </div>
                    <div>
                      <span className="status status-confirmed">{loc.status}</span>
                    </div>
                    <span>{loc.coordinators}</span>
                    <small>{loc.sla}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === "services" && (
            <div className="panel" style={{ marginTop: "24px" }}>
              <div className="panel-heading">
                <div>
                  <span className="admin-kicker">Operations / Support Offerings</span>
                  <h2>Published services ({managedServices.length})</h2>
                </div>
                <button
                  type="button"
                  className="button button-dark button-small"
                  onClick={() => toast.info("Service catalog editor initialized.")}
                >
                  <Plus size={14} /> Add new service
                </button>
              </div>

              <div className="request-table">
                <div className="table-row table-head" style={{ gridTemplateColumns: ".8fr 1.2fr 1fr 2fr" }}>
                  <span>Service ID</span>
                  <span>Support Area</span>
                  <span>Category</span>
                  <span>Description</span>
                </div>
                {managedServices.map((srv) => (
                  <div className="table-row" key={srv.id} style={{ gridTemplateColumns: ".8fr 1.2fr 1fr 2fr" }}>
                    <code>{srv.id}</code>
                    <div>
                      <strong>{srv.name}</strong>
                    </div>
                    <span>{srv.category}</span>
                    <small>{srv.description}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: RESOURCES */}
          {activeTab === "resources" && (
            <div className="panel" style={{ marginTop: "24px" }}>
              <div className="panel-heading">
                <div>
                  <span className="admin-kicker">Operations / Family Guide</span>
                  <h2>Educational resources &amp; FAQs</h2>
                </div>
                <button
                  type="button"
                  className="button button-dark button-small"
                  onClick={() => toast.info("Resource editor ready.")}
                >
                  <Plus size={14} /> New resource draft
                </button>
              </div>

              <div style={{ padding: "21px", display: "grid", gap: "16px" }}>
                <article style={{ border: "1px solid #eef0eb", padding: "16px", borderRadius: "6px" }}>
                  <strong style={{ fontSize: "14px" }}>01. What to do after a death</strong>
                  <p style={{ fontSize: "12px", color: "var(--ink-500)", margin: "6px 0 0" }}>
                    Immediate legal, medical, transport, and first call orientation. Status: Published.
                  </p>
                </article>
                <article style={{ border: "1px solid #eef0eb", padding: "16px", borderRadius: "6px" }}>
                  <strong style={{ fontSize: "14px" }}>02. Cremation basics</strong>
                  <p style={{ fontSize: "12px", color: "var(--ink-500)", margin: "6px 0 0" }}>
                    Questions to ask a facility, comparing options, electric vs wood pyre. Status: Published.
                  </p>
                </article>
                <article style={{ border: "1px solid #eef0eb", padding: "16px", borderRadius: "6px" }}>
                  <strong style={{ fontSize: "14px" }}>03. Planning from another city</strong>
                  <p style={{ fontSize: "12px", color: "var(--ink-500)", margin: "6px 0 0" }}>
                    Remote coordination checklist, local handover protocols. Status: Published.
                  </p>
                </article>
              </div>
            </div>
          )}

          {/* TAB 6: TEAM ACCESS */}
          {activeTab === "team" && (
            <div className="panel" style={{ marginTop: "24px" }}>
              <div className="panel-heading">
                <div>
                  <span className="admin-kicker">Operations / Access Control</span>
                  <h2>Authorized team members &amp; roles</h2>
                </div>
              </div>
              <div className="request-table">
                <div className="table-row table-head" style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr" }}>
                  <span>User / Email</span>
                  <span>Role</span>
                  <span>Access Level</span>
                  <span>MFA Status</span>
                </div>
                <div className="table-row" style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr" }}>
                  <div>
                    <strong>Super Administrator</strong>
                    <small>admin@aangancare.com</small>
                  </div>
                  <span>Platform Owner</span>
                  <span className="status status-confirmed">Full Access</span>
                  <small>Enforced (Hardware Key)</small>
                </div>
                <div className="table-row" style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr" }}>
                  <div>
                    <strong>Duty Coordinator (Bengaluru)</strong>
                    <small>ops-blr@aangancare.com</small>
                  </div>
                  <span>Operations Lead</span>
                  <span className="status status-contacted">Queue &amp; Location</span>
                  <small>Enforced (Authenticator App)</small>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CONFIGURATION */}
          {activeTab === "config" && (
            <div className="panel" style={{ marginTop: "24px" }}>
              <div className="panel-heading">
                <div>
                  <span className="admin-kicker">Operations / Platform Settings</span>
                  <h2>Security &amp; Legal Configuration</h2>
                </div>
              </div>
              <div style={{ padding: "21px", display: "grid", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #eef0eb" }}>
                  <span>Privacy Policy Active Version</span>
                  <strong>2026-09-07-draft</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #eef0eb" }}>
                  <span>Terms &amp; Conditions Active Version</span>
                  <strong>2026-09-07-draft</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #eef0eb" }}>
                  <span>HSTS (HTTP Strict Transport Security)</span>
                  <span className="status status-confirmed">31536000s (Preload Active)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #eef0eb" }}>
                  <span>Spam Bot Honeypot Protection</span>
                  <span className="status status-confirmed">Client &amp; Server-Side Enabled</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                  <span>Rate Limiting</span>
                  <strong>120 requests / minute per IP</strong>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <AuditLogModal isOpen={auditModalOpen} onClose={() => setAuditModalOpen(false)} />
    </div>
  );
}
