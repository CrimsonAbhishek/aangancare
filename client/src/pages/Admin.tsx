import { Activity, ArrowRight, ArrowUpRight, CheckCircle2, Clock3, FileText, MapPin, MoreHorizontal, Package, Plus, Settings2, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";

const previewRequests = [
  { ref: "AC-7K4P-26", person: "Family contact", need: "Cremation assistance · Transport", place: "Location pending", status: "NEW", time: "8 min ago" },
  { ref: "AC-4F2M-26", person: "Remote family member", need: "Planned arrangements", place: "City pending", status: "CONTACTED", time: "42 min ago" },
  { ref: "AC-9D8Q-26", person: "Family contact", need: "After-care arrangements", place: "Location pending", status: "CONFIRMED", time: "Yesterday" },
];

type QueueItem = { ref: string; person: string; need: string; place: string; status: string; time: string };

function downloadQueue(rows: QueueItem[]) {
  const csv = ["Reference,Contact,Need,Location,Status,Received", ...rows.map((row) => [row.ref, row.person, row.need, row.place, row.status, row.time].map((value) => `"${value.replaceAll('"', '""')}"`).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "aangan-request-queue.csv";
  anchor.click();
  URL.revokeObjectURL(url);
  toast.success("Request queue downloaded.");
}

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();
  const liveQuery = trpc.requests.recent.useQuery(undefined, { enabled: Boolean(isAuthenticated && user?.role === "admin") });
  const liveRequests: QueueItem[] = (liveQuery.data ?? []).map((request) => ({
    ref: request.publicReference,
    person: request.name,
    need: (() => { try { return (JSON.parse(request.services) as string[]).join(" · "); } catch { return "Support request"; } })(),
    place: request.city,
    status: request.status,
    time: new Date(request.createdAt).toLocaleString(),
  }));
  const rows = liveRequests.length > 0 ? liveRequests : previewRequests;

  return <div className="admin-page"><div className="admin-shell"><aside className="admin-sidebar"><Link href="/" className="brand"><span className="brand-mark"><Activity size={18} aria-hidden="true" /></span><span className="brand-copy"><strong>Aangan</strong><small>operations</small></span></Link><nav className="admin-nav" aria-label="Operations navigation"><span className="admin-nav-title">Workspace</span><Link href="/admin" className="active"><Activity size={16} aria-hidden="true" /> Overview</Link><Link href="/request"><Clock3 size={16} aria-hidden="true" /> Requests <b>{rows.length}</b></Link><Link href="/request"><MapPin size={16} aria-hidden="true" /> Locations</Link><Link href="/services"><Package size={16} aria-hidden="true" /> Services &amp; packages</Link><Link href="/resources"><FileText size={16} aria-hidden="true" /> Resources</Link><span className="admin-nav-title">System</span><Link href="/admin"><Users size={16} aria-hidden="true" /> Team access</Link><Link href="/privacy"><Settings2 size={16} aria-hidden="true" /> Configuration</Link></nav><Link href="/" className="admin-exit">View public site <ArrowUpRight size={14} aria-hidden="true" /></Link></aside><main className="admin-main"><header className="admin-header"><div><span className="admin-kicker">Operations / Overview</span><h1>Good morning, {user?.name?.split(" ")[0] || "team"}.</h1></div><div className="admin-user"><span className="status-dot" aria-hidden="true" />{isAuthenticated ? "Signed in" : "Preview mode"}<button className="icon-button" type="button" aria-label="Show operations status" onClick={() => toast.info(isAuthenticated ? "You are signed in to the operations preview." : "Preview mode is showing sample queue data.")}><MoreHorizontal size={18} aria-hidden="true" /></button></div></header>{!isAuthenticated && <div className="admin-auth-banner"><ShieldCheck size={18} aria-hidden="true" /><div><strong>This is a protected operations surface.</strong><p>Sign in to manage requests, services, team access, and verified location coverage.</p></div><button className="button button-dark button-small" type="button" onClick={() => startLogin()}>Sign in to continue <ArrowUpRight size={14} aria-hidden="true" /></button></div>}{liveQuery.isError && <div className="admin-auth-banner"><ShieldCheck size={18} aria-hidden="true" /><div><strong>Showing preview queue data.</strong><p>Live request data is available only to an authenticated administrator.</p></div></div>}<section className="stat-grid"><div className="stat-card"><span>Open requests</span><strong>{String(rows.length).padStart(2, "0")}</strong><small>Sample or live queue</small></div><div className="stat-card"><span>Awaiting contact</span><strong>{rows.filter((row) => row.status === "NEW").length.toString().padStart(2, "0")}</strong><small>Needs a coordinator</small></div><div className="stat-card"><span>Configured locations</span><strong>—</strong><small>Connect verified coverage</small></div><div className="stat-card"><span>Published services</span><strong>04</strong><small>Content to verify</small></div></section><section className="admin-content-grid"><div className="panel request-panel"><div className="panel-heading"><div><span className="admin-kicker">Request queue</span><h2>Service requests</h2></div><button className="button button-outline button-small" type="button" onClick={() => downloadQueue(rows)}>Download CSV <ArrowUpRight size={14} aria-hidden="true" /></button></div><div className="request-table"><div className="table-row table-head"><span>Reference / contact</span><span>Need</span><span>Stage</span><span>Received</span></div>{rows.map((request) => <div className="table-row" key={request.ref}><div><strong>{request.ref}</strong><small>{request.person}</small></div><div><span>{request.need}</span><small>{request.place}</small></div><div><span className={`status status-${request.status.toLowerCase()}`}>{request.status}</span></div><small>{request.time}</small></div>)}</div><Link href="/request" className="text-link panel-link">Open request form <ArrowRight size={15} aria-hidden="true" /></Link></div><div className="panel"><div className="panel-heading"><div><span className="admin-kicker">Quick actions</span><h2>Keep the system current</h2></div></div><div className="quick-actions"><Link href="/services"><span><Plus size={17} aria-hidden="true" /></span><strong>Add a service<small>Review support areas</small></strong><ArrowUpRight size={15} aria-hidden="true" /></Link><Link href="/request"><span><MapPin size={17} aria-hidden="true" /></span><strong>Verify a location<small>Start a coverage check</small></strong><ArrowUpRight size={15} aria-hidden="true" /></Link><Link href="/resources"><span><FileText size={17} aria-hidden="true" /></span><strong>Draft a resource<small>Open the family guide</small></strong><ArrowUpRight size={15} aria-hidden="true" /></Link></div></div></section><section className="panel activity-panel"><div className="panel-heading"><div><span className="admin-kicker">System activity</span><h2>Recent changes</h2></div><button className="button button-ghost button-small" type="button" onClick={() => toast.info("Audit log is not connected to the public preview yet.")}>View audit log <ArrowUpRight size={14} aria-hidden="true" /></button></div><div className="activity-list"><div><CheckCircle2 size={17} aria-hidden="true" /><p><strong>Public request consent is captured with each submission</strong><small>Privacy · current build</small></p></div><div><ShieldCheck size={17} aria-hidden="true" /><p><strong>Role-based access is enabled for administrators</strong><small>Security · current build</small></p></div><div><FileText size={17} aria-hidden="true" /><p><strong>Public legal and cookie routes are connected</strong><small>Content · current build</small></p></div></div></section></main></div></div>;
}
