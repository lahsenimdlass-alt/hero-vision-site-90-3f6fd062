import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import LocationSection from "./LocationSection";
import WhatsAppFloat from "../ui/WhatsAppFloat";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <LocationSection />
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;
