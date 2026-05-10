import {
  HeroSection,
  ServicesSection,
  ClientsSection,
  ContactSection,
} from "./sections";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <ClientsSection />
      <ContactSection />
    </main>
  );
}
