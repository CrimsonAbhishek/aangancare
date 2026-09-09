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
import AuditLogModal from "@/components/AuditLogModal";

type AdminTab = "overview" | "requests" | "locations" | "services" | "resources" | "team" | "config";

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
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [requestSearch, setRequestSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Checking administrator access…</div>;
  }

  if (!isAuthenticated) {
    return (
      <button type="button" onClick={() => startLogin()}>
        Sign in to continue
      </button>
    );
  }

  if (user?.role !== "admin") {
    return <div>Administrator access required.</div>;
  }

  const isAdmin = true;

  const liveQuery = trpc.requests.recent.useQuery(undefined, {
    enabled: Boolean(isAdmin),
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

  const allRows = liveRequests;

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
              <span className="status-dot" aria-hidden="true" />
              {isAuthenticated ? "Signed in" : "Anonymous"}
              <button
                className="icon-button"
                type="button"
                aria-label="Show operations status"
                onClick={() =>
                  toast.info(
                    isAuthenticated
                      ? "You are signed in to the operations surface."
                      : "You must sign in to access this page."
                  )
                }
              >
                <MoreHorizontal size={18} aria-hidden="true" />
              </button>
            </div>
          </header>

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
                  <strong>0</strong>
                  <small>Verified cities</small>
                </div>
                <div className="stat-card">
                  <span>Published services</span>
                  <strong>0</strong>
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
                  <div style={{ padding: "36px", textAlign: "center", color: "var(--ink-400)", fontSize: "13px" }}>
                    No recent system activity.
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
                  <h2>Configured coverage areas</h2>
                </div>
                <button
                  type="button"
                  className="button button-dark button-small"
                  onClick={() => toast.info("New coverage city configuration ready for deployment.")}
                >
                  <Plus size={14} /> Add coverage city
                </button>
              </div>

              <div style={{ padding: "36px", textAlign: "center", color: "var(--ink-400)", fontSize: "13px" }}>
                No active locations configured.
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === "services" && (
            <div className="panel" style={{ marginTop: "24px" }}>
              <div className="panel-heading">
                <div>
                  <span className="admin-kicker">Operations / Support Offerings</span>
                  <h2>Published services</h2>
                </div>
                <button
                  type="button"
                  className="button button-dark button-small"
                  onClick={() => toast.info("Service catalog editor initialized.")}
                >
                  <Plus size={14} /> Add new service
                </button>
              </div>

              <div style={{ padding: "36px", textAlign: "center", color: "var(--ink-400)", fontSize: "13px" }}>
                No services configured.
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

              <div style={{ padding: "36px", textAlign: "center", color: "var(--ink-400)", fontSize: "13px" }}>
                No active configuration displayed.
              </div>
            </div>
          )}
        </main>
      </div>

      <AuditLogModal isOpen={auditModalOpen} onClose={() => setAuditModalOpen(false)} />
    </div>
  );
}
