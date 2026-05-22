import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import TrustedBy from "./components/TrustedBy";
import About from "./components/About";
import Process from "./components/Process";
import Projects from "./components/Projects";
import FAQ from "./components/FAQ";
import WhyWebsite from "./components/WhyWebsite";
import CTABanner from "./components/CTABanner";
import ContactPage from "./components/ContactPage";
import CaseStudy from "./components/CaseStudy";
import WhatsAppButton from "./components/WhatsAppButton";
import ExitIntent from "./components/ExitIntent";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import {
  trackPageView,
  trackEvent,
  startEngagementTimer,
  bindAutoTracking,
} from "./utils/tracking";

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
};

export default function App() {
  const [page, setPage] = useState(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/landing") {
      return "landing";
    }
    return "home";
  });
  const [caseSlug, setCaseSlug] = useState(null);
  const [pendingScroll, setPendingScroll] = useState(null);

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

  useEffect(() => {
    trackPageView();
    startEngagementTimer();
    bindAutoTracking();

    const onPop = () => {
      setPage(window.location.pathname === "/landing" ? "landing" : "home");
      setCaseSlug(null);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const desired = page === "landing" ? "/landing" : "/";
    if (window.location.pathname !== desired) {
      window.history.pushState({}, "", desired);
    }
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page === "contact") trackEvent("viewed_contact_page");
    if (page === "case" && caseSlug) trackEvent("viewed_case_study", { slug: caseSlug });
    if (page === "landing") trackEvent("viewed_landing_page");
  }, [page, caseSlug]);

  useEffect(() => {
    if (page !== "home" || !pendingScroll) return;
    const id = pendingScroll;
    setPendingScroll(null);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
    }, 280);
  }, [page, pendingScroll]);

  const pageKey = page === "case" ? `case-${caseSlug}` : page;

  return (
    <div>
      <div className="grain" aria-hidden="true" />
      {page !== "landing" && <Navbar page={page} setPage={navigate} />}

      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.main key="home" {...pageTransition}>
            <Hero setPage={navigate} />
            <Stats />
            <TrustedBy />
            <About setPage={navigate} />
            <Process />
            <Projects setPage={navigate} navigate={navigate} />
            <WhyWebsite setPage={navigate} />
            <FAQ setPage={navigate} />
            <CTABanner setPage={navigate} />
          </motion.main>
        )}

        {page === "landing" && (
          <motion.main key="landing" {...pageTransition}>
            <LandingPage />
          </motion.main>
        )}

        {page === "contact" && (
          <motion.div key="contact" {...pageTransition}>
            <ContactPage />
          </motion.div>
        )}

        {page === "case" && (
          <motion.div key={pageKey} {...pageTransition}>
            <CaseStudy slug={caseSlug} navigate={navigate} />
          </motion.div>
        )}
      </AnimatePresence>

      {page !== "landing" && <Footer setPage={navigate} />}

      {page !== "landing" && <WhatsAppButton />}
      {page !== "landing" && <ExitIntent setPage={navigate} />}
    </div>
  );
}
