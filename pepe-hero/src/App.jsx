import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.jsx";
import MentionsLegales from "./pages/MentionsLegales.jsx";
import ScrollTop from "./ScrollTop.jsx";
import { LangProvider } from "./LangContext.jsx";
import { ContactProvider } from "./ContactContext.jsx";
import SideNav from "./SideNav.jsx";
import Footer from "./Footer.jsx";

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ContactProvider>
        <ScrollTop />
        <SideNav />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apropos" element={<Navigate to="/#apropos" replace />} />
            <Route path="/parcours" element={<Navigate to="/#parcours" replace />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
        </ContactProvider>
      </BrowserRouter>
    </LangProvider>
  );
}
