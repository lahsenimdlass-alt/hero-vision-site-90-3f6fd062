import { MapPin } from "lucide-react";

const LocationSection = () => {
  // GPS coordinates for the embedded Google Maps
  const gpsCoordinates = "33.582361,-7.617861"; // 33°34'56.5"N 7°37'04.3"W converted to decimal
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-7.617861!3d33.582361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM0JzU2LjUiTiA3wrAzNycwNC4zIlc!5e0!3m2!1sfr!2sma!4v1610000000000!5m2!1sfr!2sma`;

  return (
    <section className="bg-muted py-12">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Notre Localisation
          </h3>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-sm md:text-base">
              Ang Bd Zerktouni, 7 Rue Sebta Res Rami, 2ème étage N° 8, Casablanca
            </span>
          </div>
          <p className="text-muted-foreground/70 text-sm mt-1">
            33°34'56.5"N 7°37'04.3"W
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-border">
          <iframe
            src={mapUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Notre Localisation - Cabinet CGC"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
