import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  MdArrowBack,
  MdArrowForward,
  MdArrowOutward,
  MdCheck,
  MdClose,
  MdContentCopy,
  MdFileDownload,
  MdVerified,
  MdZoomIn,
} from "react-icons/md";
import { certifications, Certification } from "../data/portfolioData";
import { smoother } from "./Navbar";
import "./styles/Certifications.css";

const categories = ["All", ...Array.from(new Set(certifications.map((c) => c.category)))];
const featured = certifications.find((c) => c.featured);

const tilt = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
  el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
};

const resetTilt = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

const CertActions = ({ cert, onView }: { cert: Certification; onView: () => void }) => (
  <div className="cert-actions">
    <button type="button" className="cert-btn cert-btn-main" onClick={onView} data-cursor="disable">
      <MdZoomIn /> View
    </button>
    {cert.verifyUrl && (
      <a className="cert-btn" href={cert.verifyUrl} target="_blank" rel="noreferrer" data-cursor="disable">
        <MdVerified /> Verify
      </a>
    )}
    {cert.file && (
      <a className="cert-btn" href={cert.file} target="_blank" rel="noreferrer" data-cursor="disable">
        <MdFileDownload /> PDF
      </a>
    )}
  </div>
);

const Lightbox = ({
  index,
  onClose,
  onMove,
}: {
  index: number;
  onClose: () => void;
  onMove: (step: number) => void;
}) => {
  const cert = certifications[index];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    smoother?.paused(true);
    document.body.classList.add("lightbox-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      smoother?.paused(false);
      document.body.classList.remove("lightbox-open");
    };
  }, [onClose, onMove]);

  const copyId = () => {
    if (!cert.credentialId) return;
    navigator.clipboard?.writeText(cert.credentialId).then(() => setCopied(true));
  };

  return createPortal(
    <div className="cert-lightbox" role="dialog" aria-modal="true" aria-label={cert.title} onClick={onClose}>
      <div className="cert-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lb-close" onClick={onClose} aria-label="Close">
          <MdClose />
        </button>
        <div className="lb-image" key={cert.image}>
          <img src={cert.image} alt={`${cert.title} certificate`} />
        </div>
        <aside className="lb-info">
          <span className="lb-count">
            {String(index + 1).padStart(2, "0")} / {String(certifications.length).padStart(2, "0")}
          </span>
          <span className="cert-issuer" style={{ "--accent": cert.accent } as React.CSSProperties}>
            {cert.issuer}
          </span>
          <h3>{cert.title}</h3>
          <p className="lb-date">{cert.date}</p>
          <p>{cert.description}</p>
          <div className="chip-row">
            {cert.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          {cert.credentialId && (
            <button type="button" className="lb-id" onClick={copyId} title="Copy credential ID">
              <small>Credential ID</small>
              <code>{cert.credentialId}</code>
              {copied ? <MdCheck /> : <MdContentCopy />}
            </button>
          )}
          <div className="lb-links">
            {cert.verifyUrl && (
              <a className="btn-solid" href={cert.verifyUrl} target="_blank" rel="noreferrer">
                Verify credential <MdArrowOutward />
              </a>
            )}
            {cert.file && (
              <a className="btn-line" href={cert.file} target="_blank" rel="noreferrer">
                Open PDF <MdFileDownload />
              </a>
            )}
          </div>
          <div className="lb-nav">
            <button type="button" onClick={() => onMove(-1)} aria-label="Previous certificate">
              <MdArrowBack />
            </button>
            <button type="button" onClick={() => onMove(1)} aria-label="Next certificate">
              <MdArrowForward />
            </button>
          </div>
        </aside>
      </div>
    </div>,
    document.body
  );
};

const Certifications = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      certifications.filter((c) =>
        filter === "All" ? !c.featured : c.category === filter
      ),
    [filter]
  );

  const view = (cert: Certification) => setOpen(certifications.indexOf(cert));
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (step: number) =>
      setOpen((i) => (i === null ? i : (i + step + certifications.length) % certifications.length)),
    []
  );

  return (
    <section className="certs-section section-container" id="certifications">
      <div className="sec-head certs-head reveal">
        <div>
          <p className="sec-kicker">Credentials</p>
          <h2 className="sec-title">
            Certified. <span>Verified.</span>
          </h2>
        </div>
        <p className="certs-sub">
          {certifications.length} credentials across system design, Spring Boot, DSA and SQL — click any
          certificate to inspect it full-size.
        </p>
      </div>

      {featured && (
        <article className="cert-featured reveal">
          <div
            className="cert-featured-media tilt"
            onMouseMove={tilt}
            onMouseLeave={resetTilt}
            onClick={() => view(featured)}
            data-cursor="disable"
          >
            <img src={featured.image} alt={`${featured.title} certificate`} loading="lazy" />
            <i className="tilt-glare" />
          </div>
          <div className="cert-featured-body">
            <span className="cert-badge">
              <MdVerified /> Featured credential
            </span>
            <span className="cert-issuer" style={{ "--accent": featured.accent } as React.CSSProperties}>
              {featured.issuer}
            </span>
            <h3>{featured.title}</h3>
            <p className="cert-date">{featured.date}</p>
            <p>{featured.description}</p>
            <div className="chip-row">
              {featured.skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <CertActions cert={featured} onView={() => view(featured)} />
          </div>
        </article>
      )}

      <div className="cert-filters reveal" role="tablist">
        {categories.map((c) => {
          const count =
            c === "All" ? certifications.length : certifications.filter((x) => x.category === c).length;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={filter === c}
              className={filter === c ? "active" : ""}
              onClick={() => setFilter(c)}
              key={c}
              data-cursor="disable"
            >
              {c}
              <small>{count}</small>
            </button>
          );
        })}
      </div>

      <div className="cert-grid">
        {visible.map((cert, i) => (
          <article className="cert-card" key={`${filter}-${cert.title}`} style={{ animationDelay: `${i * 70}ms` }}>
            <div
              className="cert-media tilt"
              onMouseMove={tilt}
              onMouseLeave={resetTilt}
              onClick={() => view(cert)}
              data-cursor="disable"
            >
              <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" />
              <i className="tilt-glare" />
              <span className="cert-zoom">
                <MdZoomIn />
              </span>
            </div>
            <div className="cert-body">
              <div className="cert-meta">
                <span className="cert-issuer" style={{ "--accent": cert.accent } as React.CSSProperties}>
                  {cert.issuer}
                </span>
                <span className="cert-date">{cert.date}</span>
              </div>
              <h3>{cert.title}</h3>
              <div className="chip-row">
                {cert.skills.slice(0, 3).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <CertActions cert={cert} onView={() => view(cert)} />
            </div>
          </article>
        ))}
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onMove={move} />}
    </section>
  );
};

export default Certifications;
