import { HOME_SECTIONS } from "../../services/contentService";
import {
  HeroSection,
  ServicesSection,
  ClientsSection,
  ContactSection,
} from "./sections";

export default function HomePage() {
  return (
    <main>
      {HOME_SECTIONS.hero     && <HeroSection />}
      {HOME_SECTIONS.services && <ServicesSection />}
      {HOME_SECTIONS.clients  && <ClientsSection />}
      {HOME_SECTIONS.contact  && <ContactSection />}
    </main>
  );
}
