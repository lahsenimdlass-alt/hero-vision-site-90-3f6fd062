import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useLanguage } from "@/contexts/LanguageContext";
import fallbackLogo from "@/assets/logo.jpg";

const Footer = () => {
  const { data: logoImage } = useSiteImage("logo");
  const { t } = useLanguage();

  return (
    <footer className="bg-[hsl(212,55%,18%)] text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <img
              src={logoImage?.image_url || fallbackLogo}
              alt={logoImage?.alt_text || "CGC"}
              className="h-16 w-auto bg-primary-foreground p-2 rounded-lg"
            />
            <p className="text-white/80 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/accompagnement" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.consulting')}
                </Link>
              </li>
              <li>
                <Link to="/recrutement" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.recruitment')}
                </Link>
              </li>
              <li>
                <Link to="/formation" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.training')}
                </Link>
              </li>
              <li>
                <Link to="/controle-gestion" className="text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.management_control')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" />
                <span className="text-sm text-white/80">
                  Ang Bd Zerktouni, 7 Rue Sebta Res Rami,<br />
                  2ème étage N° 8, Casablanca
                </span>
              </li>
              <li>
                <a href="tel:+212701221464" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                  <span className="text-sm">+212 701 221 464</span>
                </a>
              </li>
              <li>
                <a href="tel:+212645813631" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                  <span className="text-sm">+212 645 813 631</span>
                </a>
              </li>
              <li>
              <a href="mailto:k.bouhaji@cabinetgeneraldeconsulting.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 text-white" />
                  <span className="text-sm">k.bouhaji@cabinetgeneraldeconsulting.com</span>
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.linkedin.com/in/khadija-b-94624a19a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Cabinet Général de Consulting. {t('footer.rights')}
          </p>
          <p className="text-sm text-white/60">
            www.cabinetgeneraldeconsulting.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
