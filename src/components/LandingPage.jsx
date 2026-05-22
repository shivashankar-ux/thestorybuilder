import LandingHero from "./LandingHero";
import Stats from "./Stats";
import TrustedBy from "./TrustedBy";
import Process from "./Process";
import Projects from "./Projects";
import FAQ from "./FAQ";
import CTABanner from "./CTABanner";

export default function LandingPage({ navigate }) {
  return (
    <>
      <LandingHero />
      <Stats />
      <TrustedBy />
      <Process />
      <Projects setPage={navigate} navigate={navigate} />
      <FAQ setPage={navigate} />
      <CTABanner setPage={navigate} />
    </>
  );
}
