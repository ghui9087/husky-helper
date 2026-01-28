import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import uwCampusHero from "@/assets/uw-campus-hero.jpg";
import uwSuzzalloLibrary from "@/assets/uw-suzzallo-library.jpg";
import uwRedSquare from "@/assets/uw-red-square.jpg";

const CampusCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const campusImages = [
    {
      src: uwCampusHero,
      title: t("carousel.cherryBlossom"),
      description: t("carousel.cherryDesc")
    },
    {
      src: uwSuzzalloLibrary,
      title: t("carousel.library"),
      description: t("carousel.libraryDesc")
    },
    {
      src: uwRedSquare,
      title: t("carousel.fountain"),
      description: t("carousel.fountainDesc")
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campusImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [campusImages.length]);

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            {t("carousel.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("carousel.subtitle")}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            {campusImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">
                    {image.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {campusImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusCarousel;
