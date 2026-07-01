import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import "./Designs.css";

interface Design {
  src: string;
  title: string;
}

const Designs: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    // The manifest is generated from public/designs/ before dev & build.
    fetch("/designs/designs.json")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Design[]) => setDesigns(Array.isArray(data) ? data : []))
      .catch(() => setDesigns([]))
      .finally(() => setLoading(false));
  }, []);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % designs.length)),
    [designs.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + designs.length) % designs.length)),
    [designs.length]
  );

  // Keyboard navigation for the lightbox.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <main className="designs-page">
      <header className="designs-topbar">
        <Link to="/" className="designs-back">
          <ArrowLeft size={18} />
          <span>Cre8tive Sync</span>
        </Link>
        <Link to="/portfolio" className="designs-topbar__link">
          Portfolio
        </Link>
      </header>

      <div className="designs-intro">
        <p className="designs-intro__eyebrow">Gallery</p>
        <h1 className="designs-intro__title">Designs</h1>
        <p className="designs-intro__subtitle">
          A living collection of the visual work we craft at Cre8tive Sync —
          brands, interfaces, and everything in between.
        </p>
      </div>

      {loading ? (
        <div className="designs-state">Loading designs…</div>
      ) : designs.length === 0 ? (
        <div className="designs-state">
          No designs yet. Drop images into <code>/public/designs/</code>.
        </div>
      ) : (
        <section className="designs-masonry">
          {designs.map((design, i) => (
            <button
              key={design.src}
              className="designs-item"
              onClick={() => setActive(i)}
              aria-label={`View ${design.title}`}
            >
              <img
                src={design.src}
                alt={design.title}
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
              />
            </button>
          ))}
        </section>
      )}

      {active !== null && designs[active] && (
        <div className="designs-lightbox" onClick={close}>
          <button className="designs-lightbox__close" onClick={close} aria-label="Close">
            <X size={24} />
          </button>
          <button
            className="designs-lightbox__nav designs-lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>
          <figure className="designs-lightbox__figure" onClick={(e) => e.stopPropagation()}>
            <img src={designs[active].src} alt={designs[active].title} />
          </figure>
          <button
            className="designs-lightbox__nav designs-lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </main>
  );
};

export default Designs;
