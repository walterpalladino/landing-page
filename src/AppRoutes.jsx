import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/common";
import { HomePage, AppointmentPage } from "./pages";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage />}        />
        <Route path="/appointment" element={<AppointmentPage />} />
      </Routes>
      <Footer />
    </>
  );
}
