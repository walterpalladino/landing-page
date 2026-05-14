import { Routes, Route } from "react-router-dom";
import { Navbar, Footer, ScrollToTop } from "./components/common";
import {
  HomePage, AppointmentPage, ServiceDetailPage,
  ClientDetailPage, AboutPage, AdminRoot,
} from "./pages";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* ── Public routes — with Navbar / Footer ── */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/"               element={<HomePage />}          />
                <Route path="/about"          element={<AboutPage />}         />
                <Route path="/appointment"    element={<AppointmentPage />}   />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/clients/:slug"  element={<ClientDetailPage />}  />

                {/* ── Admin — no Navbar / Footer ── */}
                <Route path="/admin" element={<AdminRoot />} />

              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}
