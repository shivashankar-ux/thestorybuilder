import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import WhyWebsite from "./components/WhyWebsite";
import { ContactSection } from "./components/ContactPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import {
  trackPageView,
  trackEvent,
  startEngagementTimer,
  bindAutoTracking,
} from "./utils/tracking";

export default function App() {
  const [page, setPage] = useState("home");

  // First load: log pageview, start 30s engagement timer, bind data-track clicks
  useEffect(() => {
    trackPageView();
    startEngagementTimer();
    bindAutoTracking();
  }, []);

  // Internal page changes (home <-> contact) also log + alert on contact view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page === "contact") {
      trackEvent("viewed_contact_page");
    }
  }, [page]);

  return (
    <div>
      <div className="grain" aria-hidden="true" />
      <Navbar page={page} setPage={setPage} />
      {page === "home" ? (
        <main>
          <Hero setPage={setPage} />
          <About setPage={setPage} />
          <Projects setPage={setPage} />
          <WhyWebsite setPage={setPage} />
          <ContactSection setPage={setPage} />
        </main>
      ) : (
        <ContactPage />
      )}
      <Footer setPage={setPage} />
    </div>
  );
}
