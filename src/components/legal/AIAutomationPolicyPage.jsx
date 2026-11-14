import { useEffect } from "react";

export default function AIAutomationPolicyPage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="legal-page-wrapper"
      style={{
        padding: "120px 24px 80px",
        maxWidth: 920,
        margin: "0 auto",
        color: "var(--text, #1A1208)",
        fontFamily: "var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
      }}
    >
      <button
        onClick={() => setPage && setPage("home")}
        className="btn btn-ghost"
        style={{
          marginBottom: 32,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid var(--border, rgba(0,0,0,0.1))",
          background: "transparent",
        }}
      >
        ← Back to Homepage
      </button>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <span
          className="tag"
          style={{
            display: "inline-flex",
            padding: "4px 12px",
            background: "rgba(217, 119, 6, 0.12)",
            color: "var(--gold, #D97706)",
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          Meta Ads & AI Automation Compliance
        </span>
        <span
          style={{
            display: "inline-flex",
            padding: "4px 12px",
            background: "rgba(16, 185, 129, 0.12)",
            color: "#059669",
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          Official Policy
        </span>
      </div>

      <h1
        style={{
          fontSize: "clamp(2.1rem, 4.5vw, 3.1rem)",
          fontFamily: "var(--fd, inherit)",
          fontWeight: 800,
          color: "var(--text, #1A1208)",
          marginBottom: 16,
          lineHeight: 1.15,
        }}
      >
        AI Automation Solutions Privacy Policy & Service Terms
      </h1>

      <p style={{ color: "var(--muted, #665843)", fontSize: 14, marginBottom: 28, fontWeight: 500 }}>
        Last updated: November 14, 2026 | Effective Date: November 14, 2026 | Applicable to: Meta Lead Ads, Automation Inquiries & AI Client Solutions
      </p>

      {/* META ADS COMPLIANCE CALLOUT BOX */}
      <div
        style={{
          background: "rgba(217, 119, 6, 0.06)",
          border: "1.5px solid rgba(217, 119, 6, 0.3)",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 40,
          lineHeight: 1.6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 20 }}>📋</span>
          <strong style={{ color: "var(--text, #1A1208)", fontSize: 16 }}>
            Notice for Meta Advertising Platforms & Lead Form Applicants
          </strong>
        </div>
        <p style={{ color: "var(--muted, #4a4031)", fontSize: 14, margin: 0 }}>
          This policy satisfies Meta's Lead Ads Policy requirements and governs information submitted through our{" "}
          <strong>"Automation Solution Inquiry Form"</strong> (titled <em>"Simplify Your Business with Automation"</em>)
          and all related AI Automation campaigns (including WhatsApp AI Assistants, AI Voice Receptionists, Lead Management,
          and Business Workflow Automations) conducted by <strong>The Story Builder</strong>.
        </p>
      </div>

      <div className="legal-content" style={{ lineHeight: 1.8, fontSize: 15, color: "var(--text, #1A1208)" }}>
        
        {/* 1. OVERVIEW & SCOPE */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            1. Overview & Service Scope
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12 }}>
            <strong>The Story Builder</strong> ("we", "us", or "our") operates the official website at{" "}
            <a href="https://thestorybuilder.in/" style={{ color: "var(--gold, #D97706)", textDecoration: "underline" }}>
              https://thestorybuilder.in/
            </a>
            , headquartered in Hyderabad, Telangana, India. We architect, build, and deploy enterprise AI automations, conversational agents, automated workflows, and digital growth infrastructure for businesses across Hyderabad, India, and internationally.
          </p>
          <p style={{ color: "var(--muted, #4a4031)" }}>
            This Privacy Policy & Service Governance disclosure outlines how we collect, process, safeguard, and utilize data provided by business leaders and inquiries who interact with our AI automation campaigns, Meta instant lead forms, website consultation funnels, and automated customer communication systems.
          </p>
        </section>

        {/* 2. INFORMATION WE COLLECT VIA META LEAD ADS */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            2. Information We Collect from Inquiry Forms & Meta Lead Ads
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12 }}>
            When you complete our <strong>"Automation Solution Inquiry Form"</strong> on Meta (Facebook / Instagram) or on our website, we collect the following business and contact details:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16, color: "var(--muted, #4a4031)" }}>
            <li>
              <strong>Full Name:</strong> To address you professionally and personalize your automation consultation.
            </li>
            <li>
              <strong>Business / Work Email Address:</strong> To deliver solution scopes, automation architecture diagrams, pricing proposals, and calendar invites.
            </li>
            <li>
              <strong>Company / Business Name:</strong> To assess your industry, operational volume, and qualification criteria for automation implementation.
            </li>
            <li>
              <strong>"What automation solutions are you looking for?" (Inquiry Context):</strong> Your designated operational focus, such as WhatsApp bots, lead routing, voice agents, appointment booking, or workflow integrations.
            </li>
            <li>
              <strong>Phone / WhatsApp Number (When Provided):</strong> To follow up on your requested consultation, demonstrate live voice or WhatsApp automations, and coordinate project schedules.
            </li>
            <li>
              <strong>Campaign & Technical Attribution Data:</strong> Meta Campaign ID, Form ID, Ad Set ID, submission timestamp, browser type, and IP address for anti-abuse and conversion verification.
            </li>
          </ul>
        </section>

        {/* 3. HOW WE USE YOUR INFORMATION */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            3. How We Use Your Information & Zero-Spam Guarantee
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12 }}>
            Your submitted inquiry data is processed strictly for legitimate business relationship purposes:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 16, color: "var(--muted, #4a4031)" }}>
            <li>Reviewing your business operational bottlenecks and assessing automation feasibility.</li>
            <li>Preparing a tailored demonstration of our AI tools (e.g., mock WhatsApp flow, sample AI voice call, or CRM pipeline test).</li>
            <li>Contacting you via WhatsApp, Phone, or Email to schedule a 1-on-1 strategy and demonstration call.</li>
            <li>Providing technical proposals, deliverables checklists, and commercial quotes.</li>
          </ul>
          <p style={{ color: "var(--text, #1A1208)", fontWeight: 600, background: "rgba(0,0,0,0.03)", padding: "10px 14px", borderRadius: 8 }}>
            🔒 <strong>Zero Third-Party Data Brokerage:</strong> We never sell, rent, lease, or monetize your company or personal contact data to external data brokers, marketers, or unrelated third parties.
          </p>
        </section>

        {/* 4. AI AUTOMATION SERVICES SPECIFICATION */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            4. Scope of AI Automation Services & Architecture
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 14 }}>
            Our automation solutions referenced across our promotional materials cover five core pillars:
          </p>

          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ padding: 14, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.7)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>1. WhatsApp AI Assistant:</strong>
              <p style={{ margin: "4px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                Instant 24/7 conversational agents integrated with the official Meta WhatsApp Business Cloud API. Automates responses to incoming inquiries, FAQs, product catalog queries, and routes high-intent prospects directly to human sales representatives.
              </p>
            </div>

            <div style={{ padding: 14, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.7)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>2. Automated Lead Management:</strong>
              <p style={{ margin: "4px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                Real-time capture of leads from Meta Ads, website forms, and social channels directly into your CRM (HubSpot, Zoho, Pipedrive, Google Sheets, or custom database) with instant automated notifications via Telegram, WhatsApp, or Slack to your sales team.
              </p>
            </div>

            <div style={{ padding: 14, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.7)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>3. Appointment Automation:</strong>
              <p style={{ margin: "4px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                Direct synchronization with calendar platforms (Google Calendar, Calendly, Cal.com), automated self-booking links, instant booking confirmations, and multi-channel reminder sequences to eliminate no-shows.
              </p>
            </div>

            <div style={{ padding: 14, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.7)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>4. AI Voice Receptionist:</strong>
              <p style={{ margin: "4px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                Automated voice telephony agents utilizing natural language processing, speech recognition, and low-latency voice synthesis to answer inbound business phone inquiries, record messages, pre-qualify caller needs, and handle after-hours inquiries.
              </p>
            </div>

            <div style={{ padding: 14, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.7)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>5. Custom Business Workflows:</strong>
              <p style={{ margin: "4px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                Cross-application middleware pipelines (Make.com, Zapier, n8n, custom serverless functions) engineered to eliminate repetitive manual work, streamline invoice alerts, status updates, and synchronize internal team operations.
              </p>
            </div>
          </div>
        </section>

        {/* 5. AI DATA PROCESSING & SUB-PROCESSORS */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            5. AI Technology Providers, Sub-Processors & Data Security
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12 }}>
            To deliver high-availability AI automations, we leverage enterprise cloud infrastructure and verified API sub-processors:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 14, color: "var(--muted, #4a4031)" }}>
            <li>
              <strong>AI & Large Language Model APIs:</strong> Enterprise API tiers provided by providers such as OpenAI, Anthropic, or Google Cloud Vertex AI. <em>Under standard commercial API terms, client data transmitted through these API endpoints is not used to train public foundational AI models.</em>
            </li>
            <li>
              <strong>Messaging & Telephony Infrastructure:</strong> Meta WhatsApp Business Cloud API, Twilio, Exotel, or equivalent licensed telecommunications and VoIP service providers.
            </li>
            <li>
              <strong>Automation Middleware & Cloud Hosting:</strong> Make.com, n8n, Zapier, Vercel, Supabase, and AWS cloud databases.
            </li>
          </ul>
          <p style={{ color: "var(--muted, #4a4031)" }}>
            All data in transit is encrypted using modern TLS 1.3 cryptographic protocols. Access to automation credentials and API tokens is strictly managed through encrypted environment vaults with role-based access control.
          </p>
        </section>

        {/* 6. CRITICAL LIABILITY & DISCLAIMERS (WHAT WE ARE & ARE NOT LIABLE FOR) */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            6. Service Limitations, Disclaimers & What We Are Liable For
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 14 }}>
            In compliance with legal best practices for automated and artificial intelligence systems, the following boundaries of responsibility govern our services:
          </p>

          <div style={{ display: "grid", gap: 14 }}>
            <div style={{ padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 8, borderLeft: "4px solid var(--gold, #D97706)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>A. Probabilistic Nature of Artificial Intelligence:</strong>
              <p style={{ margin: "6px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                AI chatbots and voice receptionists generate responses based on trained knowledge parameters and natural language models. While The Story Builder designs strict guardrails, prompt boundaries, and validation scripts, artificial intelligence outputs are inherently probabilistic. We cannot guarantee 100% deterministic accuracy in every edge-case conversation. AI assistants are deployed as operational productivity aids and do not constitute certified legal, financial, or medical advice.
              </p>
            </div>

            <div style={{ padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 8, borderLeft: "4px solid var(--gold, #D97706)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>B. Client Responsibility for Knowledge Base Accuracy:</strong>
              <p style={{ margin: "6px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                The client business is solely responsible for verifying and maintaining the factual accuracy of their pricing, product details, company policies, and business information supplied to the AI system. The Story Builder is not liable for errors, customer disputes, or commercial concessions made by an AI assistant resulting from inaccurate or outdated client-provided documentation.
              </p>
            </div>

            <div style={{ padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 8, borderLeft: "4px solid var(--gold, #D97706)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>C. Third-Party Platform Outages & Policy Changes:</strong>
              <p style={{ margin: "6px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                Our automations interface with third-party ecosystems including Meta (WhatsApp/Instagram/Facebook), telecommunications carriers, cloud hosts, and AI model providers. The Story Builder is not liable for service interruptions, call drops, message latency, API deprecations, rate limits, or account suspensions imposed by Meta or telecom regulators outside our direct technical control.
              </p>
            </div>

            <div style={{ padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 8, borderLeft: "4px solid var(--gold, #D97706)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>D. Exclusion of Indirect & Consequential Damages:</strong>
              <p style={{ margin: "6px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                To the maximum extent permitted by applicable Indian law, The Story Builder, its directors, developers, and partners shall not be held liable for any indirect, incidental, punitive, consequential, or special damages, including lost profits, loss of business opportunities, customer attrition, or data loss arising from the use or inability to use automated systems.
              </p>
            </div>

            <div style={{ padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 8, borderLeft: "4px solid var(--gold, #D97706)" }}>
              <strong style={{ color: "var(--text, #1A1208)" }}>E. Direct Liability Cap:</strong>
              <p style={{ margin: "6px 0 0", color: "var(--muted, #4a4031)", fontSize: 14 }}>
                In any scenario where direct liability is established under a formal signed service contract, our maximum aggregate cumulative liability shall strictly not exceed the total service fees actually paid by the client to The Story Builder for the specific automation setup in the thirty (30) days preceding the incident.
              </p>
            </div>
          </div>
        </section>

        {/* 7. TELECOM & CONSENT COMPLIANCE */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            7. Communication Consent & TRAI / NDNC Compliance
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12 }}>
            By submitting our <strong>"Automation Solution Inquiry Form"</strong>, you affirmatively grant The Story Builder express permission and consent to contact you at the email address and telephone/WhatsApp number provided regarding your requested business automation solutions.
          </p>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12 }}>
            This consent overrides generic National Do Not Call (NDNC / DND) registrations for the specific purpose of responding to your inquiry, in accordance with Telecom Regulatory Authority of India (TRAI) guidelines.
          </p>
          <p style={{ color: "var(--muted, #4a4031)" }}>
            <strong>Client Responsibility for End-Customer Consent:</strong> Businesses deploying our outbound AI voice or messaging agents must ensure they have obtained lawful, verifiable opt-in consent from their end-consumers prior to initiating outbound outreach campaigns.
          </p>
        </section>

        {/* 8. OPT-OUT & PRIVACY RIGHTS */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            8. Your Data Protection Rights & Easy Opt-Out
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12 }}>
            Under India's Digital Personal Data Protection Act (DPDPA 2023) and global data standards, you possess full sovereignty over your information:
          </p>
          <ul style={{ paddingLeft: 24, marginBottom: 14, color: "var(--muted, #4a4031)" }}>
            <li>
              <strong>Right to Access & Correct:</strong> You may request a summary of the contact information we hold for your business or update your parameters.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You can request complete deletion of your lead submission and inquiry records from our active systems.
            </li>
            <li>
              <strong>Instant Opt-Out:</strong> You may revoke consent at any time by replying <strong>"STOP"</strong> or <strong>"UNSUBSCRIBE"</strong> in any WhatsApp or email interaction, or by messaging our privacy desk directly.
            </li>
          </ul>
        </section>

        {/* 9. GOVERNING LAW */}
        <section style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            9. Governing Law & Dispute Resolution
          </h2>
          <p style={{ color: "var(--muted, #4a4031)" }}>
            This policy and all matters arising out of or related to our AI automation services shall be governed and construed in accordance with the substantive laws of India. Any legal dispute, proceeding, or arbitration shall fall within the exclusive jurisdiction of the competent courts situated in <strong>Hyderabad, Telangana, India</strong>.
          </p>
        </section>

        {/* 10. OFFICIAL CONTACT DETAILS */}
        <section style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontSize: 20,
              fontFamily: "var(--fd, inherit)",
              fontWeight: 700,
              color: "var(--text, #1A1208)",
              marginBottom: 12,
              borderBottom: "1px solid var(--border, rgba(0,0,0,0.08))",
              paddingBottom: 8,
            }}
          >
            10. Contact Us & Privacy Officer
          </h2>
          <p style={{ color: "var(--muted, #4a4031)", marginBottom: 12 }}>
            If you have questions regarding this policy, Meta Lead Ads data processing, or wish to exercise your data rights, contact us directly:
          </p>
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(0,0,0,0.03)",
              borderRadius: 8,
              lineHeight: 1.8,
              fontWeight: 500,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text, #1A1208)", marginBottom: 4 }}>
              The Story Builder — AI Automation & Growth Division
            </div>
            <div>📍 Hyderabad, Telangana, 500081, India</div>
            <div>
              📧 Email:{" "}
              <a href="mailto:hello@thestorybuilder.in" style={{ color: "var(--gold, #D97706)", textDecoration: "underline" }}>
                hello@thestorybuilder.in
              </a>{" "}
              /{" "}
              <a href="mailto:shivashankar.7991@gmail.com" style={{ color: "var(--gold, #D97706)", textDecoration: "underline" }}>
                shivashankar.7991@gmail.com
              </a>
            </div>
            <div>
              📞 Phone / WhatsApp:{" "}
              <a href="tel:+918341928526" style={{ color: "var(--gold, #D97706)", textDecoration: "underline" }}>
                +91 83419 28526
              </a>
            </div>
            <div>
              🌐 Official Website:{" "}
              <a href="https://thestorybuilder.in/" style={{ color: "var(--gold, #D97706)", textDecoration: "underline" }}>
                https://thestorybuilder.in/
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
