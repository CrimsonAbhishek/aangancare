import { useState, useEffect, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, KeyRound, Lock, ShieldAlert, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const VALID_KEYS = ["aangan77", "aangan", "admin2026", "secret"];
const STORAGE_KEY = "aangan_admin_unlocked";

export function isConsoleUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "true";
}

export function lockConsole(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

interface AdminLockScreenProps {
  onUnlock: () => void;
}

export default function AdminLockScreen({ onUnlock }: AdminLockScreenProps) {
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  // Check URL query parameters on load for address bar command auto-unlock:
  // e.g. /admin?cmd=unlock&key=aangan77 OR /admin?key=aangan77 OR /admin?access=aangan
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const key = params.get("key") || params.get("access") || params.get("pass");
      if (key && VALID_KEYS.includes(key.toLowerCase().trim())) {
        sessionStorage.setItem(STORAGE_KEY, "true");
        onUnlock();
      }
    } catch {
      // ignore
    }
  }, [onUnlock]);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (VALID_KEYS.includes(passcode.trim().toLowerCase())) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="admin-lock-screen shell">
      <div className="admin-lock-card">
        <div className="admin-lock-header">
          <div className="admin-lock-badge">
            <ShieldAlert size={16} aria-hidden="true" />
            <span>Restricted Area</span>
          </div>
          <div className="admin-lock-icon" aria-hidden="true">
            <Lock size={32} strokeWidth={1.5} />
          </div>
          <h1>Operations Console <em>Locked</em></h1>
          <p className="inner-lede">
            This surface is not intended for public access. Authorized coordinators may unlock this view using the passkey below or via address bar command.
          </p>
        </div>

        <form onSubmit={handleUnlock} className="admin-lock-form">
          <label className="field" htmlFor="admin-passkey">
            <span>Administrative Passkey</span>
            <div className="admin-lock-input-wrap">
              <input
                id="admin-passkey"
                type={showPassword ? "text" : "password"}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Enter passkey (e.g. aangan77)"
                autoFocus
                required
              />
              <button
                type="button"
                className="admin-lock-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide passkey" : "Show passkey"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error && (
            <div className="form-error" role="alert">
              Invalid passkey. Use the authorized key (e.g. <code>aangan77</code>) or address bar command.
            </div>
          )}

          <div className="admin-lock-actions">
            <button type="submit" className="button button-dark admin-lock-btn">
              Unlock Console <ArrowRight size={15} aria-hidden="true" />
            </button>
            <Link href="/" className="text-link">
              <ArrowLeft size={15} aria-hidden="true" /> Return to public site
            </Link>
          </div>
        </form>

        <div className="admin-lock-hint">
          <KeyRound size={16} aria-hidden="true" />
          <div>
            <strong>Address bar shortcut:</strong>
            <p>
              You can also unlock automatically by appending <code>?key=aangan77</code> to the URL in your browser’s address bar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
