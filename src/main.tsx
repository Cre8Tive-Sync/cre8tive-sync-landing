import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "./App.tsx";
import { ServiceQuote } from "./components/ServiceQuote";
import { ProjectPlanning } from "./components/ProjectPlanning";
import Portfolio from "./components/Portfolio";
import ProjectDetail from "./components/ProjectDetail";
import "./index.css";
import "./App.css";

// On every route change scroll to the top — or, when navigating to a hash
// (e.g. /#contact from another page), scroll that section into view.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:slug" element={<ProjectDetail />} />
      <Route path="/service-quota" element={<ServiceQuote />} />
      <Route path="/project-planning" element={<ProjectPlanning />} />
    </Routes>
  </BrowserRouter>
);
