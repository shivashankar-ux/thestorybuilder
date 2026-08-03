const clients = [
  "LEGACY SOLAR",
  "STAR FITNESS",
  "WAFFLESHUB",
  "CHESS ACADEMY",
  "UNBENT",
  "DIGITALWITHCHIRAG",
  "SIOLIM CAFE",
  "SEVACTION",
  "WHITE CLOSET",
  "CHECKVSMATE",
];

export default function TrustedBy() {
  return (
    <section className="trusted-by" aria-label="Trusted by these brands">
      <div className="wrap">
        <p className="trusted-label">Trusted by ambitious brands worldwide</p>
        <div className="trusted-marquee" aria-hidden="true">
          <div className="trusted-track">
            {[...clients, ...clients].map((c, i) => (
              <span className="trusted-logo" key={i}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
