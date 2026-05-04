import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestCatalystSection from "@/components/TestCatalystSection";
import AcademySection from "@/components/AcademySection";
import HowWeWork from "@/components/HowWeWork";
import MetricsSection from "@/components/MetricsSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection />
<ServicesSection />
        <TestCatalystSection />
        <AcademySection />
        <HowWeWork />
        <MetricsSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
