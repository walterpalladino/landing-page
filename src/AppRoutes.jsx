import { Routes, Route } from "react-router-dom";
import { Navbar, Footer, ScrollToTop } from "./components/common";
import { HomePage, AppointmentPage, ServiceDetailPage, ClientDetailPage, AboutPage } from "./pages";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"                 element={<HomePage />}          />
        <Route path="/about"            element={<AboutPage />}         />
        <Route path="/appointment"      element={<AppointmentPage />}   />
        <Route path="/services/:slug"   element={<ServiceDetailPage />} />
        <Route path="/clients/:slug"    element={<ClientDetailPage />}  />
      </Routes>
      <Footer />
    </>
  );
}
