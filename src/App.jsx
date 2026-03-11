import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import WhyWebsite from "./components/WhyWebsite";
import { ContactSection } from "./components/ContactPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

// 🔑 REACT CONCEPT: This is your "App" — the master controller.
// Instead of two separate HTML files (index.html + contact.html),
// React uses ONE file and swaps content based on state.

export default function App() {
  // 🔑 useState: React's way to remember things that change.
  // Here we track which "page" to show. Default is "home".
  const [page, setPage] = useState("home");

  // 🔑 useEffect: Runs code AFTER the page renders.
  // Here we scroll to top whenever we switch pages.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    // 🔑 JSX: Looks like HTML but it's actually JavaScript.
    // You write <div> tags inside JS — React converts them to real HTML.
    <div>
      {/* The grain overlay — always visible on every "page" */}
      <div className="grain" aria-hidden="true" />

      {/* The custom cursor — always active */}
      <Cursor />

      {/* Navbar gets the current page + a setter so it can navigate */}
      <Navbar page={page} setPage={setPage} />

      {/* 🔑 CONDITIONAL RENDERING: Show different content based on page.
          In old HTML you had TWO files. In React you have ONE app
          that decides what to show. Much cleaner! */}
      {page === "home" ? (
        // Home page: stack all sections vertically
        <main>
          <Hero setPage={setPage} />
          <About setPage={setPage} />
          <Projects setPage={setPage} />
          <WhyWebsite setPage={setPage} />
          <ContactSection setPage={setPage} />
        </main>
      ) : (
        // Contact page: just one component
        <ContactPage />
      )}

      <Footer setPage={setPage} />
    </div>
  );
}