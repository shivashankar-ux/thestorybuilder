import { useEffect, useState } from "react";
import FAQ from "./FAQ";

const faqSchemaData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast can you build and launch a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We ship custom, high-converting websites in 7 days from kickoff to launch."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with businesses outside Hyderabad?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we work with founders and growing businesses across India and internationally."
      }
    },
    {
      "@type": "Question",
      "name": "Are ad spend budgets included in performance marketing fees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, ad spend budgets are paid directly to Meta or Google by the client. Our fee covers strategy, creative design, campaign management, and optimization."
      }
    },
    {
      "@type": "Question",
      "name": "Do I own my website code and assets after the build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 100%. Upon final project delivery, you own all code, content, domain registrations, and brand files with zero vendor lock-in."
      }
    }
  ]
};

export default function FAQPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="faq-page-wrapper" style={{ padding: "100px 0 60px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <FAQ setPage={setPage} />
    </main>
  );
}
