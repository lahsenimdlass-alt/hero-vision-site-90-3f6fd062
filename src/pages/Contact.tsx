import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useSiteImage } from "@/hooks/useSiteImage";
import { useLanguage } from "@/contexts/LanguageContext";
import officeImage from "@/assets/business-woman-office.jpg";

const Contact = () => {
  const { data: contactImage } = useSiteImage("contact_image");
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageLabel = language === 'en' ? 'New contact message' : 'Nouveau message de contact';
    const nameLabel = language === 'en' ? 'Name' : 'Nom';
    const phoneLabel = language === 'en' ? 'Phone' : 'Téléphone';
    const companyLabel = language === 'en' ? 'Company' : 'Entreprise';
    const subjectLabel = language === 'en' ? 'Subject' : 'Sujet';
    const messageText = language === 'en' ? 'Message' : 'Message';
    const notProvided = language === 'en' ? 'Not provided' : 'Non renseigné';

    const message = `*${messageLabel}*%0A%0A*${nameLabel}:* ${formData.name}%0A*Email:* ${formData.email}%0A*${phoneLabel}:* ${formData.phone || notProvided}%0A*${companyLabel}:* ${formData.company || notProvided}%0A*${subjectLabel}:* ${formData.subject}%0A%0A*${messageText}:*%0A${formData.message}`;
    
    const whatsappUrl = `https://wa.me/212701221464?text=${message}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: t('contact.whatsapp_redirect'),
      description: t('contact.whatsapp_message'),
    });

    setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={contactImage?.image_url || officeImage} alt={contactImage?.alt_text || ""} className="w-full h-full object-cover" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-white font-medium uppercase tracking-wide mb-4">{t('contact.label')}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('contact.title')}</h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">{t('contact.description')}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">{t('contact.info_title')}</h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('contact.address')}</h3>
                    <p className="text-muted-foreground">Ang Bd Zerktouni, 7 Rue Sebta Res Rami,<br />2ème étage N° 8, Casablanca, Maroc</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('contact.phone')}</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+212701221464" className="hover:text-accent transition-colors">+212 701 221 464</a><br />
                      <a href="tel:+212645813631" className="hover:text-accent transition-colors">+212 645 813 631</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('contact.email')}</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:k.bouhaji@cabinetgeneraldeconsulting.ma" className="hover:text-accent transition-colors">k.bouhaji@cabinetgeneraldeconsulting.ma</a><br />
                      <a href="mailto:cgdeconsulting@gmail.com" className="hover:text-accent transition-colors">cgdeconsulting@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('contact.hours')}</h3>
                    <p className="text-muted-foreground">{t('contact.hours_weekday')}<br />{t('contact.hours_saturday')}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-64">
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3323.8837418872736!2d-7.6204415243035655!3d33.58236767333758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM0JzU2LjUiTiA3wrAzNycwNC4zIlc!5e0!3m2!1sfr!2sfr!4v1767560569886!5m2!1sfr!2sfr" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localisation Cabinet Général de Consulting" />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="bg-card rounded-2xl border border-border p-8 lg:p-10">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">{t('contact.form_title')}</h2>
                <p className="text-muted-foreground mb-8">{t('contact.form_subtitle')}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">{t('contact.full_name')} *</label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder={t('contact.your_name')} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">{t('contact.email')} *</label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder={t('contact.your_email')} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">{t('contact.phone')}</label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+212 XXX XXX XXX" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">{t('contact.company')}</label>
                      <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder={t('contact.company_name')} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">{t('contact.subject')} *</label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder={t('contact.subject_placeholder')} />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">{t('contact.message')} *</label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder={t('contact.message_placeholder')} />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full btn-primary">
                    {isSubmitting ? t('contact.sending') : (<>{t('contact.send')}<Send className="ml-2 w-4 h-4" /></>)}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
