import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CoreServicesGrid from "./components/CoreServicesGrid";
import ScrollUnscramble from "./components/ScrollUnscramble";
import Stats from "./components/Stats";
import TrustedBy from "./components/TrustedBy";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Projects from "./components/Projects";

import FAQ from "./components/FAQ";
import CTABanner from "./components/CTABanner";
import ContactPage from "./components/ContactPage";
import CaseStudy from "./components/CaseStudy";
import WhatsAppButton from "./components/WhatsAppButton";
import ExitIntent from "./components/ExitIntent";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ServicesPage from "./components/ServicesPage";
import PricingPage from "./components/PricingPage";

// New Route Components
import PrivacyPage from "./components/legal/PrivacyPage";
import TermsPage from "./components/legal/TermsPage";
import CookiesPage from "./components/legal/CookiesPage";
import DisclaimerPage from "./components/legal/DisclaimerPage";
import RefundPage from "./components/legal/RefundPage";
import WebDevPage from "./components/services/WebDevPage";
import PerformanceMarketingPage from "./components/services/PerformanceMarketingPage";
import SocialMediaPage from "./components/services/SocialMediaPage";
import BrandingPage from "./components/services/BrandingPage";
import SeoServicesPage from "./components/services/SeoServicesPage";
import GoogleAdsPage from "./components/services/GoogleAdsPage";
import FAQPage from "./components/FAQPage";
import BlogPage from "./components/BlogPage";
import NotFoundPage from "./components/NotFoundPage";
import CookieConsent from "./components/CookieConsent";

import {
  trackPageView,
  trackEvent,
  startEngagementTimer,
  bindAutoTracking,
} from "./utils/tracking";
import { captureUTMParams } from "./utils/utm";

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
};

function getRouteFromPath(pathStr) {
  if (!pathStr || typeof pathStr !== "string") return { page: "home", slug: null };

  // Strip query string and hash parameters so URLs with ?utm_... or ?gclid=... or #hash match correctly
  const cleanPath = pathStr.split("?")[0].split("#")[0].trim();
  const p = (cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`)
    .toLowerCase()
    .replace(/\/$/, "") || "/";

  if (p === "" || p === "/" || p === "/home") return { page: "home", slug: null };
  if (p === "/landing") return { page: "landing", slug: null };
  if (p === "/services") return { page: "services", slug: null };
  if (p === "/services/web-development" || p === "/service-web-dev") return { page: "service-web-dev", slug: null };
  if (p === "/services/performance-marketing" || p === "/service-perf-mktg") return { page: "service-perf-mktg", slug: null };
  if (p === "/services/seo-services-hyderabad" || p === "/service-seo") return { page: "service-seo", slug: null };
  if (p === "/services/google-ads-hyderabad" || p === "/service-google-ads") return { page: "service-google-ads", slug: null };
  if (p === "/services/social-media-marketing" || p === "/service-smm") return { page: "service-smm", slug: null };
  if (p === "/services/branding" || p === "/service-branding") return { page: "service-branding", slug: null };
  if (p === "/pricing") return { page: "pricing", slug: null };
  if (p === "/contact") return { page: "contact", slug: null };
  if (p === "/faq") return { page: "faq", slug: null };
  if (p === "/privacy") return { page: "privacy", slug: null };
  if (p === "/terms") return { page: "terms", slug: null };
  if (p === "/cookies") return { page: "cookies", slug: null };
  if (p === "/disclaimer") return { page: "disclaimer", slug: null };
  if (p === "/refund-cancellation" || p === "/refund") return { page: "refund", slug: null };
  if (p === "/blog" || p === "/resources") return { page: "blog", slug: null };

  if (p.startsWith("/case-studies/")) {
    const slug = p.replace("/case-studies/", "");
    return { page: "case", slug };
  }

  return { page: "not-found", slug: null };
}

function getPathFromRoute(page, slug) {
  if (page === "landing") return "/landing";
  if (page === "services") return "/services";
  if (page === "service-web-dev") return "/services/web-development";
  if (page === "service-perf-mktg") return "/services/performance-marketing";
  if (page === "service-seo") return "/services/seo-services-hyderabad";
  if (page === "service-google-ads") return "/services/google-ads-hyderabad";
  if (page === "service-smm") return "/services/social-media-marketing";
  if (page === "service-branding") return "/services/branding";
  if (page === "pricing") return "/pricing";
  if (page === "contact") return "/contact";
  if (page === "faq") return "/faq";
  if (page === "privacy") return "/privacy";
  if (page === "terms") return "/terms";
  if (page === "cookies") return "/cookies";
  if (page === "disclaimer") return "/disclaimer";
  if (page === "refund") return "/refund-cancellation";
  if (page === "blog") return "/blog";
  if (page === "case" && slug) return `/case-studies/${slug}`;
  if (page === "not-found") return "/404";
  return "/";
}

const pageMetadata = {
  home: {
    title: "Website Design Hyderabad — Web Design & Development Agency | The Story Builder",
    desc: "Website design & web development agency in Hyderabad. Custom websites, performance marketing, and brand strategy shipped in 7 days for businesses across India.",
  },
  landing: {
    title: "Website Design Hyderabad — Live in 7 Days | The Story Builder",
    desc: "Get a custom, high-converting website built in 7 days. Web design, lead generation, and performance marketing in Hyderabad. Free quote.",
  },
  services: {
    title: "Digital Marketing & Web Design Services Hyderabad | The Story Builder",
    desc: "Full-service digital marketing solutions: Website Development, Meta & Google Ads, Social Media Marketing, and Brand Strategy for growing businesses.",
  },
  "service-web-dev": {
    title: "Custom Web Development & Website Design Services | The Story Builder",
    desc: "Mobile-first, lightning-fast custom web development live in 7 days. Lead-capture integration, performance optimization, and custom UI/UX.",
  },
  "service-perf-mktg": {
    title: "Performance Marketing & Meta Ads Agency Hyderabad | The Story Builder",
    desc: "ROI-driven Meta & Google Ads campaigns engineered for qualified lead volume and positive ROAS. Conversion tracking & funnel optimization.",
  },
  "service-seo": {
    title: "SEO Agency Hyderabad — Organic Search Growth & Visibility | The Story Builder",
    desc: "Data-driven Technical & Local SEO services in Hyderabad. Get your business ranking #1 on Google Search & Maps. Claim free SEO audit.",
  },
  "service-google-ads": {
    title: "Google Ads Agency Hyderabad — High-ROAS PPC Campaigns | The Story Builder",
    desc: "Precision Google Search Ads, Display & Performance Max management in Hyderabad. Engineered for qualified B2B & local buyer lead generation.",
  },
  "service-smm": {
    title: "Social Media Marketing & Instagram Management | The Story Builder",
    desc: "Done-for-you Instagram growth, short-form Reels scripts, custom visual content, and brand authority campaigns for business founders.",
  },
  "service-branding": {
    title: "Brand Strategy & Identity Design Studio | The Story Builder",
    desc: "Command authority with logo suites, typography systems, color palettes, and comprehensive brand guidelines built for modern growth.",
  },
  pricing: {
    title: "Transparent Pricing Plans — Websites, Marketing & Branding | The Story Builder",
    desc: "Clear, predictable packages for web development, Instagram management, branding, and performance lead generation. Zero hidden fees.",
  },
  contact: {
    title: "Contact Us — Talk to The Story Builder Digital Agency Hyderabad",
    desc: "Get in touch with The Story Builder. Book a free 30-minute strategy call or request a project quote within 24 hours.",
  },
  faq: {
    title: "Frequently Asked Questions — Web Development & Marketing | The Story Builder",
    desc: "Got questions about project timelines, pricing, ad spend, or website ownership? Read our transparent FAQ breakdown.",
  },
  privacy: {
    title: "Privacy Policy | The Story Builder",
    desc: "Our commitment to data protection, tracking transparency, and user privacy rights at The Story Builder.",
  },
  terms: {
    title: "Terms & Conditions | The Story Builder",
    desc: "Official terms and conditions governing project scope, client rights, and services provided by The Story Builder.",
  },
  cookies: {
    title: "Cookie Policy | The Story Builder",
    desc: "Learn how we use cookies, analytics, and tracking technologies to enhance user experience.",
  },
  disclaimer: {
    title: "Disclaimer | The Story Builder",
    desc: "General disclaimer regarding marketing case study metrics, third-party services, and website information.",
  },
  refund: {
    title: "Refund & Cancellation Policy | The Story Builder",
    desc: "Transparent policies governing project deposits, retainers, and refund processing terms.",
  },
  blog: {
    title: "Growth Guides & Marketing Resources | The Story Builder",
    desc: "Actionable growth insights, case breakdowns, and performance marketing strategies for founders.",
  },
  "not-found": {
    title: "404 Page Not Found | The Story Builder",
    desc: "The requested page could not be found.",
  },
};

export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window !== "undefined") {
      return getRouteFromPath(window.location.pathname);
    }
    return { page: "home", slug: null };
  });

  const [pendingScroll, setPendingScroll] = useState(null);

  const page = route.page;
  const caseSlug = route.slug;

  const navigate = (dest) => {
    if (typeof dest === "string") {
      const parsed = getRouteFromPath(dest);
      setRoute(parsed);
      return;
    }
    if (dest && typeof dest === "object") {
      if (dest.page === "case" && dest.caseSlug) {
        setRoute({ page: "case", slug: dest.caseSlug });
      } else if (dest.page) {
        setRoute(getRouteFromPath(dest.page));
        if (dest.scrollTo) setPendingScroll(dest.scrollTo);
      }
    }
  };

  useEffect(() => {
    captureUTMParams();
    trackPageView();
    startEngagementTimer();
    bindAutoTracking();

    const onPopState = () => {
      setRoute(getRouteFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const desired = getPathFromRoute(page, caseSlug);
    if (window.location.pathname !== desired && desired !== "/404") {
      window.history.pushState({}, "", desired);
    }

    // Dynamic metadata update
    const meta = pageMetadata[page] || pageMetadata.home;
    const title = page === "case" && caseSlug ? `${caseSlug.replace("-", " ").toUpperCase()} Case Study | The Story Builder` : meta.title;
    document.title = title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", meta.desc);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute("href", `https://thestorybuilder.in${desired}`);

    window.scrollTo({ top: 0, behavior: "smooth" });

    trackEvent("viewed_page", { page, path: desired });
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
            <CoreServicesGrid setPage={navigate} />
            <ScrollUnscramble />
            <Stats />
            <TrustedBy />
            <About setPage={navigate} />
            <Services />
            <Process />
            <Projects setPage={navigate} navigate={navigate} />

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
            <ContactPage setPage={navigate} />
          </motion.div>
        )}

        {page === "services" && (
          <motion.div key="services" {...pageTransition}>
            <ServicesPage setPage={navigate} />
          </motion.div>
        )}

        {page === "service-web-dev" && (
          <motion.div key="service-web-dev" {...pageTransition}>
            <WebDevPage setPage={navigate} />
          </motion.div>
        )}

        {page === "service-perf-mktg" && (
          <motion.div key="service-perf-mktg" {...pageTransition}>
            <PerformanceMarketingPage setPage={navigate} />
          </motion.div>
        )}

        {page === "service-seo" && (
          <motion.div key="service-seo" {...pageTransition}>
            <SeoServicesPage setPage={navigate} />
          </motion.div>
        )}

        {page === "service-google-ads" && (
          <motion.div key="service-google-ads" {...pageTransition}>
            <GoogleAdsPage setPage={navigate} />
          </motion.div>
        )}

        {page === "service-smm" && (
          <motion.div key="service-smm" {...pageTransition}>
            <SocialMediaPage setPage={navigate} />
          </motion.div>
        )}

        {page === "service-branding" && (
          <motion.div key="service-branding" {...pageTransition}>
            <BrandingPage setPage={navigate} />
          </motion.div>
        )}

        {page === "pricing" && (
          <motion.div key="pricing" {...pageTransition}>
            <PricingPage setPage={navigate} />
          </motion.div>
        )}

        {page === "faq" && (
          <motion.div key="faq" {...pageTransition}>
            <FAQPage setPage={navigate} />
          </motion.div>
        )}

        {page === "privacy" && (
          <motion.div key="privacy" {...pageTransition}>
            <PrivacyPage setPage={navigate} />
          </motion.div>
        )}

        {page === "terms" && (
          <motion.div key="terms" {...pageTransition}>
            <TermsPage setPage={navigate} />
          </motion.div>
        )}

        {page === "cookies" && (
          <motion.div key="cookies" {...pageTransition}>
            <CookiesPage setPage={navigate} />
          </motion.div>
        )}

        {page === "disclaimer" && (
          <motion.div key="disclaimer" {...pageTransition}>
            <DisclaimerPage setPage={navigate} />
          </motion.div>
        )}

        {page === "refund" && (
          <motion.div key="refund" {...pageTransition}>
            <RefundPage setPage={navigate} />
          </motion.div>
        )}

        {page === "blog" && (
          <motion.div key="blog" {...pageTransition}>
            <BlogPage setPage={navigate} />
          </motion.div>
        )}

        {page === "case" && (
          <motion.div key={pageKey} {...pageTransition}>
            <CaseStudy slug={caseSlug} navigate={navigate} />
          </motion.div>
        )}

        {page === "not-found" && (
          <motion.div key="not-found" {...pageTransition}>
            <NotFoundPage setPage={navigate} />
          </motion.div>
        )}
      </AnimatePresence>

      {page !== "landing" && <Footer setPage={navigate} />}

      {page !== "landing" && <WhatsAppButton />}
      {page !== "landing" && <ExitIntent setPage={navigate} />}
      <CookieConsent setPage={navigate} />
    </div>
  );
}
