import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "./translation";
import { Link } from "wouter";
import {
  Phone,
  Music2,
  Instagram,
  Facebook,
  MapPin,
  ArrowLeft,
  Camera,
  MessageCircle,
} from "lucide-react";

export default function Gallery() {
  const { language, setLanguage } = useLanguage();
  const t = content[language];

  const galleryData = t.galleryPage || {
    title: t.nav.gallery || "Gallery",
    subtitle: language === "es" ? "Nuestros Proyectos Recientes" : "Our Recent Projects",
  };

  const projects = [
    { img: "/service1 (1).png", title: "Exterior Painting" },
    { img: "/hero-2.png", title: "Interior Transformation" },
    { img: "/service3.png", title: "Paver Sealing" },
    { img: "/service4.png", title: "Pressure Washing" },
    { img: "/bf-1.png", title: "Kitchen Cabinets" },
    { img: "/af-1.png", title: "Cabinet Finish" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#414042]">
      {/* HEADER - UNIFICADO (BOTÓN AMARILLO) */}
      <header className="bg-white py-4 border-b-4 border-[#FFC20E] sticky top-0 z-[100] shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-12 md:h-14 cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>

          <nav className="hidden xl:flex gap-8 text-[11px] font-black uppercase tracking-widest text-[#0054A6]">
            <Link href="/"><a className="hover:text-[#FFC20E] transition-colors">{t.nav.home}</a></Link>
            <a href="/#services" className="hover:text-[#FFC20E] transition-colors">{t.nav.services}</a>
            <Link href="/about"><a className="hover:text-[#FFC20E] transition-colors">{language === "es" ? "Nosotros" : "About Us"}</a></Link>
            <Link href="/gallery">
              <a className="text-[#FFC20E] border-b-2 border-[#FFC20E] cursor-pointer">{t.nav.gallery}</a>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex gap-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"><Music2 className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#E4405F] text-white flex items-center justify-center hover:scale-110 transition-transform"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform"><Facebook className="w-4 h-4 fill-current" /></a>
            </div>
            <a href="tel:3529891527" className="bg-[#FFC20E] text-[#0054A6] px-4 py-2 rounded-xl font-black uppercase text-[10px] shadow-lg flex items-center gap-2 hover:bg-[#0054A6] hover:text-white transition-all italic">
              <Phone className="w-3 h-3 fill-current" /> 352-989-1527
            </a>
            <div className="flex bg-slate-100 p-1 rounded-xl text-[9px] font-black">
              <button onClick={() => setLanguage("en")} className={`px-3 py-1 rounded-lg ${language === "en" ? "bg-[#0054A6] text-white" : "text-slate-400"}`}>EN</button>
              <button onClick={() => setLanguage("es")} className={`px-3 py-1 rounded-lg ${language === "es" ? "bg-[#0054A6] text-white" : "text-slate-400"}`}>ES</button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO GALLERY - ESTILO MODERNO */}
      <section className="bg-[#0054A6] text-white py-20 md:py-28 relative overflow-hidden text-center">
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-[#FFC20E] font-black uppercase text-[10px] tracking-[0.3em] mb-8 hover:translate-x-[-5px] transition-transform cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> {language === "es" ? "Volver al inicio" : "Back to Home"}
            </a>
          </Link>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
            {galleryData.title}
          </h1>
          <div className="w-24 h-2 bg-[#FFC20E] mx-auto mb-6"></div>
          <p className="text-[#FFC20E] font-black uppercase tracking-[0.4em] text-[10px] md:text-sm">
            {galleryData.subtitle}
          </p>
        </div>
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FFC20E] rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* GRID DE FOTOS MEJORADO */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((item, idx) => (
              <div
                key={idx}
                className="group relative aspect-[4/5] overflow-hidden rounded-[3.5rem] shadow-2xl border-4 border-slate-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[#0054A6]/20"
              >
                <img
                  src={item.img}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={item.title}
                />
                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0054A6] via-[#0054A6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <Camera className="w-10 h-10 text-[#FFC20E] mb-4" />
                    <p className="text-white font-black uppercase italic text-2xl tracking-tighter leading-none">
                      {item.title}
                    </p>
                    <div className="w-12 h-1 bg-[#FFC20E] mt-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - ACTUALIZADO AL ESTILO PREMIUM */}
      <footer className="bg-white pt-20 pb-10 border-t-[15px] border-[#0054A6]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img src="/logo.png" className="h-16 mb-4" alt="Logo" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 italic">"In God We Trust"</p>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0054A6] mb-4">Social Network</span>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all"><Music2 className="w-5 h-5" /></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-[#E4405F] text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all"><Facebook className="w-5 h-5 fill-current" /></a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <a href="tel:3529891527" className="text-5xl font-black text-[#0054A6] tracking-tighter italic hover:scale-105 transition-transform">352-989-1527</a>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#FFC20E]" />
                <span className="text-[10px] font-black uppercase italic text-slate-400">Clermont, Florida</span>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between text-[9px] font-black uppercase tracking-widest text-slate-300">
            <p>© 2024 House Painting Services & More LLC</p>
            <p>Design by AI Partner</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/13529891527"
        target="_blank"
        className="fixed bottom-8 right-8 z-[150] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
}