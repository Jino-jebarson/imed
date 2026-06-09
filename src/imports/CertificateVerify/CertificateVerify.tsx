import { useEffect, useState } from "react";
import { Award, CheckCircle2, SearchX } from "lucide-react";
import imedLogo from "../Ocha/36b610493eb683f0e81e17848fd143c365f117fd.png";

const API_BASE_URL = import.meta.env.PROD
  ? ((import.meta.env.VITE_PROD_API_BASE_URL as string | undefined) || "")
  : ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "");

type VerifyState =
  | { status: "loading" }
  | { status: "found"; data: { fullName: string; course?: string; centre?: string; batch?: string; batchCommenceDate?: string; certificateNumber: string; certificateIssuedAt?: string } }
  | { status: "missing"; message: string };

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export default function CertificateVerify({ certificateNumber }: { certificateNumber: string }) {
  const [state, setState] = useState<VerifyState>({ status: "loading" });

  useEffect(() => {
    if (!certificateNumber) {
      setState({ status: "missing", message: "Certificate number is missing." });
      return;
    }
    fetch(`${API_BASE_URL}/api/certificates/verify/${encodeURIComponent(certificateNumber)}`)
      .then((response) => response.json())
      .then((result) => {
        if (!result.ok) throw new Error(result.message || "Certificate not found");
        setState({ status: "found", data: result.data });
      })
      .catch((error) => setState({ status: "missing", message: error instanceof Error ? error.message : "Certificate not found" }));
  }, [certificateNumber]);

  return (
    <main className="verify-shell">
      <style>{`
        .verify-shell{min-height:100vh;background:#f4f7fb;display:grid;place-items:center;padding:24px;font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#061633}
        .verify-card{width:min(620px,100%);background:#fff;border:1px solid #dfe6f0;border-radius:16px;padding:28px;box-shadow:0 18px 50px rgba(17,33,61,.08)}
        .verify-brand{display:flex;align-items:center;gap:10px;margin-bottom:22px}
        .verify-brand img{width:42px;height:42px;object-fit:contain}.verify-brand b{font-size:24px;color:#1f3471}.verify-brand strong{font-size:24px;color:#25a88d}
        .verify-status{display:flex;align-items:center;gap:10px;color:#009c73;font-weight:900;margin-bottom:8px}.verify-status.missing{color:#b42318}
        .verify-card h1{font-size:34px;line-height:1.1;margin:0 0 8px;color:#061633}.verify-card p{color:#66728a;margin:0 0 18px}
        .verify-grid{display:grid;gap:12px;margin-top:18px}.verify-row{display:flex;justify-content:space-between;gap:16px;border-top:1px solid #eef2f7;padding-top:12px}.verify-row span{color:#66728a}.verify-row b{text-align:right}
        .verify-btn{border:0;background:#0d6efd;color:#fff;border-radius:10px;padding:12px 16px;font-weight:900;margin-top:20px}
      `}</style>
      <section className="verify-card">
        <div className="verify-brand"><img src={imedLogo} alt="" /><b>iMED</b><strong>Academy</strong></div>
        {state.status === "loading" && <p>Checking certificate...</p>}
        {state.status === "missing" && (
          <>
            <div className="verify-status missing"><SearchX size={20} /> Certificate not verified</div>
            <h1>Certificate not found</h1>
            <p>{state.message}</p>
          </>
        )}
        {state.status === "found" && (
          <>
            <div className="verify-status"><CheckCircle2 size={20} /> Certificate verified</div>
            <h1>{state.data.fullName}</h1>
            <p>This certificate was issued by iMED Academy.</p>
            <div className="verify-grid">
              <div className="verify-row"><span>Certificate No.</span><b>{state.data.certificateNumber}</b></div>
              <div className="verify-row"><span>Course</span><b>{state.data.course || "-"}</b></div>
              <div className="verify-row"><span>Centre</span><b>{state.data.centre || "-"}</b></div>
              <div className="verify-row"><span>Batch</span><b>{state.data.batch || "-"}</b></div>
              <div className="verify-row"><span>Batch Commence</span><b>{formatDate(state.data.batchCommenceDate)}</b></div>
              <div className="verify-row"><span>Issued On</span><b>{formatDate(state.data.certificateIssuedAt)}</b></div>
            </div>
            <button className="verify-btn" onClick={() => (window.location.hash = "")}><Award size={16} /> Back to iMED Academy</button>
          </>
        )}
      </section>
    </main>
  );
}
