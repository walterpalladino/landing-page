import { Routes, Route } from "react-router-dom";
import { Navbar, Footer, ScrollToTop } from "./components/common";
import { HomePage, AppointmentPage, ServiceDetailPage } from "./pages";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"                  element={<HomePage />}           />
        <Route path="/appointment"       element={<AppointmentPage />}    />
        <Route path="/services/:slug"    element={<ServiceDetailPage />}  />
      </Routes>
      <Footer />
    </>
  );
}
