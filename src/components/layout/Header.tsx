import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteImage } from "@/hooks/useSiteImage";
import fallbackLogo from "@/assets/logo.svg";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Conseil & Accompagnement", path: "/accompagnement" },
  { label: "Recrutement", path: "/recrutement" },
  { label: "Formation", path: "/formation" },
  { label: "Contrôle de Gestion", path: "/controle-gestion" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data: logoImage } = useSiteImage("logo");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-header shadow-soft" : "bg-header"
        }`}
      >
        <div className="container-custom">
        <div className="flex items-center justify-between h-28 md:h-32">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoImage?.image_url || fallbackLogo}
                alt={logoImage?.alt_text || "CGC - Cabinet Général de Consulting"}
                className="h-24 md:h-28 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-2 transition-colors ${
                    location.pathname === item.path
                      ? "text-navy font-semibold"
                      : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>


            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-navy"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border"
            >
              <nav className="container-custom py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-lg font-medium py-2 transition-colors ${
                      location.pathname === item.path
                        ? "text-accent"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
