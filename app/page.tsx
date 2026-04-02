import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import GiftExperience from "@/components/GiftExperience";
import HowItWorks from "@/components/HowItWorks";
import Concierge from "@/components/Concierge";
import BrandShowcase from "@/components/BrandShowcase";
import AIParsing from "@/components/AIParsing";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <GiftExperience />
        <HowItWorks />
        <Concierge />
        <BrandShowcase />
        <AIParsing />
        <Features />
        <UseCases />
        <Comparison />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
