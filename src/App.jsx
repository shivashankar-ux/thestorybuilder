import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import WhyWebsite from "./components/WhyWebsite";
import { ContactSection } from "./components/ContactPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
