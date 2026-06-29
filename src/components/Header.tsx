import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  /** True once the loading screen has finished (landing page). */
  loaded?: boolean;
  /** Reveal immediately with no entrance delay (used on routed pages). */
  instant?: boolean;
}

const Header: React.FC<Props> = ({ loaded = true, instant = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [revealed, setRevealed] = useState(instant);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (instant) {
      setRevealed(true);
      return;
    }
    if (!loaded) return;
    const t = setTimeout(() => setRevealed(true), 3200);
    return () => clearTimeout(t);
  }, [loaded, instant]);

  const closeMenu = () => setMenuOpen(false);

  // Section anchors live on the landing page; from other routes we send the
  // browser back home with the hash so it scrolls to the right section.
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const goToSection = (id: string) => {
    closeMenu();
    if (isHome) return; // plain anchor handles in-page scroll
    navigate(`/#${id}`);
  };

  return (
    <header className={`header${revealed ? " header--revealed" : ""}`}>
      <nav>
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/Cre8tiveSyncLogo.svg" alt="Cre8tive Sync Logo" />
          Creative Sync
        </Link>

        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><a href={sectionHref("values")} onClick={() => goToSection("values")}>Values</a></li>
          <li><a href={sectionHref("contact")} onClick={() => goToSection("contact")}>Contact</a></li>
        </ul>

        <a href={sectionHref("contact")} className="header-cta" onClick={() => goToSection("contact")}>
          Start Project
        </a>

        <button
          className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-nav">
          <ul>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/portfolio" onClick={closeMenu}>Portfolio</Link></li>
            <li><a href={sectionHref("values")} onClick={() => goToSection("values")}>Values</a></li>
            <li><a href={sectionHref("contact")} onClick={() => goToSection("contact")}>Contact</a></li>
          </ul>
          <a href={sectionHref("contact")} className="mobile-cta" onClick={() => goToSection("contact")}>Start Project</a>
        </div>
      )}
    </header>
  );
};

export default Header;
