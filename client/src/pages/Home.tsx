import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Phone, Mail, MapPin, Clock, Shield, Users, Zap, Award, Loader } from "lucide-react";
import { useState } from "react";
import { useInstagramPosts } from "@/hooks/useInstagramPosts";

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const { posts: instagramPosts, isLoading: instagramLoading } = useInstagramPosts(12);

  const [reviews] = useState([
    {
      id: 1,
      author: "Carlos M.",
      rating: 5,
      text: "Excelente servicio! Muy profesionales y eficientes.",
      verified: true,
    },
    {
      id: 2,
      author: "Maria R.",
      rating: 5,
      text: "Great service! Very professional and punctual.",
      verified: true,
    },
    {
      id: 3,
      author: "Juan P.",
      rating: 5,
      text: "Highly recommended. Best plumbing service in Miami.",
      verified: true,
    },
  ]);

  const services = [
    {
      id: 1,
      icon: "🔧",
      nameEn: "Plumbing",
      nameEs: "Plomería",
      descEn: "Repairs and installations of plumbing systems",
      descEs: "Reparaciones e instalaciones de sistemas de plomería",
    },
    {
      id: 2,
      icon: "🎨",
      nameEn: "Painting",
      nameEs: "Pintura",
      descEn: "Residential and commercial painting services",
      descEs: "Servicios de pintura residencial y comercial",
    },
    {
      id: 3,
      icon: "🔨",
      nameEn: "General Maintenance",
      nameEs: "Mantenimiento General",
      descEn: "Repairs and maintenance for your home",
      descEs: "Reparaciones y mantenimiento para tu hogar",
    },
  ];

  const whyUs = [
    {
      icon: Users,
      labelEn: "Experience",
      labelEs: "Experiencia",
      descEn: "Years of expertise in the industry",
      descEs: "Años de experiencia en la industria",
    },
    {
      icon: Clock,
      labelEn: "24/7 Support",
      labelEs: "Atención 24/7",
      descEn: "Always available when you need us",
      descEs: "Siempre disponibles cuando nos necesitas",
    },
    {
      icon: Zap,
      labelEn: "Competitive Prices",
      labelEs: "Precios Competitivos",
      descEn: "Best value for your money",
      descEs: "El mejor valor por tu dinero",
    },
    {
      icon: Award,
      labelEn: "Warranty",
      labelEs: "Garantía",
      descEn: "Quality guaranteed on all services",
      descEs: "Calidad garantizada en todos los servicios",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              HSF
            </div>
            <span className="font-bold text-lg text-gray-800">Home Services</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition">
              {t("nav.services")}
            </a>
            <a href="#gallery" className="text-gray-600 hover:text-blue-600 transition">
              {t("nav.gallery")}
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">
              {t("nav.testimonials")}
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">
              {t("nav.contact")}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded transition ${
                  language === "en"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`px-3 py-1 rounded transition ${
                  language === "es"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ES
              </button>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              {t("nav.requestQuote")}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{t("hero.title")}</h1>
            <p className="text-xl mb-8 text-blue-100">{t("hero.subtitle")}</p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              {t("hero.cta")}
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {t("services.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle>
                    {language === "en" ? service.nameEn : service.nameEs}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">
                    {language === "en" ? service.descEn : service.descEs}
                  </p>
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    {t("services.moreInfo")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {t("whyTrustUs.title")}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {whyUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <Icon className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800">
                    {language === "en" ? item.labelEn : item.labelEs}
                  </h3>
                  <p className="text-gray-600">
                    {language === "en" ? item.descEn : item.descEs}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="testimonials" className="py-20 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t("reviews.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-blue-700 border-blue-600">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-4">{review.text}</p>
                  <p className="font-bold text-white">{review.author}</p>
                  {review.verified && (
                    <p className="text-sm text-blue-300">✓ {t("reviews.rating")}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="border-white text-white hover:bg-blue-700">
              {t("reviews.viewMore")}
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {t("gallery.title")}
          </h2>
          {instagramLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : instagramPosts && instagramPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {instagramPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.permalink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group relative"
                  >
                    <img
                      src={post.mediaUrl}
                      alt={post.caption || "Instagram post"}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    {post.caption && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-4">
                        <p className="text-white text-sm text-center line-clamp-3">
                          {post.caption}
                        </p>
                      </div>
                    )}
                  </a>
                ))}
              </div>
              <div className="text-center">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    {t("gallery.followUs")}
                  </Button>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No Instagram posts available yet</p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  {t("gallery.followUs")}
                </Button>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {t("contact.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder={t("contact.name")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
                <input
                  type="email"
                  placeholder={t("contact.email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
                <input
                  type="tel"
                  placeholder={t("contact.phone")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
                <textarea
                  placeholder={t("contact.message")}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                ></textarea>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  {t("contact.send")}
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <p className="font-bold text-gray-800">{t("contact.phone_label")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <p className="font-bold text-gray-800">{t("contact.email_label")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <p className="font-bold text-gray-800">{t("contact.address_label")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <p className="font-bold text-gray-800">{t("contact.hours_label")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{t("footer.company")}</h3>
              <p className="text-gray-400">Expert maintenance solutions in Florida</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">{t("footer.followUs")}</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-gray-400">(305) 123-4567</p>
              <p className="text-gray-400">info@homeservicesflorida.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 {t("footer.company")}. {t("footer.rights")}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
