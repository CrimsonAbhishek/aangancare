import { useState } from "react";
import { Download, FileText, Filter, Search, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

export interface AuditEntry {
  id: string;
  timestamp: string;
  category: "Security" | "Privacy" | "Operations" | "System";
  event: string;
  actor: string;
  details: string;
  ip: string;
}

const DEFAULT_AUDIT_LOGS: AuditEntry[] = [];

interface AuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditLogModal({ isOpen, onClose }: AuditLogModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!isOpen) return null;

  const filteredLogs = DEFAULT_AUDIT_LOGS.filter((entry) => {
    const matchesCategory = selectedCategory === "All" || entry.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      entry.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const downloadAuditCSV = () => {
    const headers = ["Log ID,Timestamp,Category,Event,Actor,Details,IP"];
    const rows = filteredLogs.map((l) =>
      [l.id, l.timestamp, l.category, l.event, l.actor, l.details, l.ip]
        .map((val) => `"${val.replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[...headers, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aangan-audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Audit log exported to CSV.");
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="audit-modal-title">
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
          </div>
          <div className="audit-filter-wrap">
            <Filter size={15} aria-hidden="true" />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Security">Security</option>
              <option value="Privacy">Privacy</option>
              <option value="Operations">Operations</option>
              <option value="System">System</option>
            </select>
          </div>
          <button type="button" className="button button-outline button-small" onClick={downloadAuditCSV}>
            <Download size={14} aria-hidden="true" /> Export Log
          </button>
        </div>

        <div className="audit-log-table-container">
          <table className="audit-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Timestamp</th>
                <th>Category</th>
                <th>Event</th>
                <th>Actor / Origin</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td><code>{log.id}</code></td>
                    <td><small>{log.timestamp}</small></td>
                    <td>
                      <span className={`audit-badge audit-badge-${log.category.toLowerCase()}`}>
                        {log.category}
                      </span>
                    </td>
                    <td><strong>{log.event}</strong></td>
                    <td><small>{log.actor}</small></td>
                    <td><span>{log.details}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "32px", color: "var(--ink-400)" }}>
                    No audit records match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="audit-modal-footer">
          <span>Showing {filteredLogs.length} events · Log retention: 180 days</span>
          <button type="button" className="button button-dark button-small" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
