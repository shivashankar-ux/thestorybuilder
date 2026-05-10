import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import TrustedBy from "./components/TrustedBy";
import About from "./components/About";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import WhyWebsite from "./components/WhyWebsite";
import { ContactSection } from "./components/ContactPage";
import ContactPage from "./components/ContactPage";
import CaseStudy from "./components/CaseStudy";
import WhatsAppButton from "./components/WhatsAppButton";
import ExitIntent from "./components/ExitIntent";
import Footer from "./components/Footer";
import {
  trackPageView,
  trackEvent,
  startEngagementTimer,
  bindAutoTracking,
} from "./utils/tracking";

export default function App() {
  /* page = "home" | "contact" | "case"
     caseSlug = which case study (when page === "case") */
  const [page, setPage] = useState("home");
  const [caseSlug, setCaseSlug] = useState(null);
  const [pendingScroll, setPendingScroll] = useState(null);

  // Compatibility: old setPage("contact"|"home") still works
  const navigate = (dest) => {
    if (typeof dest === "string") {
      setPage(dest);
      setCaseSlug(null);
      return;
    }
    if (dest && typeof dest === "object") {
      if (dest.page === "case" && dest.caseSlug) {
        setCaseSlug(dest.caseSlug);
        setPage("case");
      } else if (dest.page) {
        setPage(dest.page);
        setCaseSlug(null);
        if (dest.scrollTo) setPendingScroll(dest.scrollTo);
      }
    }
  };

  // Tracker boot
  useEffect(() => {
    trackPageView();
    startEngagementTimer();
    bindAutoTracking();
  }, []);

  // Scroll behavior + per-page event
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page === "contact") trackEvent("viewed_contact_page");
    if (page === "case" && caseSlug) trackEvent("viewed_case_study", { slug: caseSlug });
  }, [page, caseSlug]);

  // After landing on home, scroll to a section if requested
  useEffect(() => {
    if (page !== "home" || !pendingScroll) return;
    const id = pendingScroll;
    setPendingScroll(null);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
    }, 120);
  }, [page, pendingScroll]);

  return (
    <div>
      <div className="grain" aria-hidden="true" />
      <Navbar page={page} setPage={navigate} />

      {page === "home" && (
        <main>
          <Hero setPage={navigate} />
          <Stats />
          <TrustedBy />
          <About setPage={navigate} />
          <Process />
          <Projects setPage={navigate} navigate={navigate} />
          <Testimonials />
          <Pricing setPage={navigate} />
          <WhyWebsite setPage={navigate} />
          <ContactSection setPage={navigate} />
        </main>
      )}

      {page === "contact" && <ContactPage />}
      {page === "case" && <CaseStudy slug={caseSlug} navigate={navigate} />}

      <Footer setPage={navigate} />

      <WhatsAppButton />
      <ExitIntent setPage={navigate} />
    </div>
  );
}
