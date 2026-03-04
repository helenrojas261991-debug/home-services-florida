import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { content } from "./translation";
import { Link } from "wouter";
import {
  Star,
  Instagram,
  Facebook,
  Music2,
  MessageCircle,
  Phone,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Quote,
  Camera,
  MapPin,
  CheckCircle2,
  Award,
  ArrowRight,
  Trophy,
} from "lucide-react";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [currentBefAft, setCurrentBefAft] = useState(0);

  const services = content[language].services;

  const galleryPreview = [
    { before: "/bf-2.png", after: "/af-2.png" },
    { before: "/bf-1.png", after: "/af-1.png" },
  ];

  const instagramPhotos = [
    "/service1 (1).png",
    "/hero-2.png",
    "/service3.png",
    "/service4.png"
  ];

  const googleReviews = [
    {
      name: "John Miller",
      text: "Exceptional quality. Alex and his team are very clean and fast.",
      stars: 5,
    },

    {
      name: "Sarah T.",
      text: "The kitchen cabinet transformation is incredible. They look brand new!",
      stars: 5,
    },

    {
      name: "Robert Davis",
      text: "Professional, honest, and high-quality work. The best in Clermont.",
      stars: 5,
    },
  ];

  const nextSlide = () => setCurrentBefAft(prev => (prev + 1) % 2);

  const prevSlide = () => setCurrentBefAft(prev => (prev - 1 + 2) % 2);

  return (
    <div className="min-h-screen bg-white font-sans text-[#414042]">
      {/* HEADER - CON BOTÓN AMARILLO Y REDES */}
      <header className="bg-white py-4 border-b-4 border-[#FFC20E] sticky top-0 z-[100] shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 md:h-16 cursor-pointer"
            />
          </Link>

          <nav className="hidden xl:flex gap-8 text-[11px] font-black uppercase tracking-widest text-[#0054A6]">
            <Link href="/">
              <a className="text-[#FFC20E] border-b-2 border-[#FFC20E] cursor-pointer">
                {content[language].nav.home}
              </a>
            </Link>
            <a
              href="#services"
              className="hover:text-[#FFC20E] transition-colors"
            >
              {content[language].nav.services}
            </a>
            <Link href="/about">
              <a className="hover:text-[#FFC20E] transition-colors cursor-pointer">
                {language === "es" ? "Nosotros" : "About Us"}
              </a>
            </Link>
            <Link href="/gallery">
              <a className="hover:text-[#FFC20E] transition-colors cursor-pointer">
                {content[language].nav.gallery}
              </a>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* ICONOS REDES HEADER */}
            <div className="hidden lg:flex gap-2 mr-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Music2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-[#E4405F] text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
            </div>

            {/* BOTÓN LLAMAR AMARILLO */}
            <a
              href="tel:3529891527"
              className="flex items-center gap-2 bg-[#FFC20E] text-[#0054A6] px-5 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#0054A6] hover:text-white transition-all italic shadow-lg"
            >
              <Phone className="w-4 h-4 fill-current" /> 352-989-1527
            </a>

            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 font-black text-[10px]">
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1.5 rounded-lg ${language === "en" ? "bg-[#0054A6] text-white" : "text-slate-400"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`px-4 py-1.5 rounded-lg ${language === "es" ? "bg-[#0054A6] text-white" : "text-slate-400"}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#0054A6] text-white py-12 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-6 text-[#FFC20E] font-black text-[9px] uppercase tracking-widest border border-white/20">
              <ShieldCheck className="w-4 h-4" /> Licensed & Insured • Florida
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] italic uppercase tracking-tighter">
              {content[language].heroTitle}
            </h1>

            <a
              href="tel:3529891527"
              className="inline-flex items-center gap-3 bg-[#FFC20E] text-[#0054A6] px-8 py-4 rounded-2xl font-black uppercase text-lg shadow-2xl hover:scale-105 transition-all italic"
            >
              <Phone className="w-5 h-5 fill-current" /> 352-989-1527
            </a>
          </div>

          <div className="relative">
            <img
              src="/hero-2.png"
              className="rounded-[3rem] border-l-[12px] border-[#FFC20E] w-full h-[450px] object-cover shadow-2xl"
              alt="Professional"
            />
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black uppercase text-[#0054A6] italic tracking-tighter text-center mb-16 underline decoration-[#FFC20E] decoration-8 underline-offset-8">
            {content[language].servicesTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map(s => (
              <div
                key={s.id}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={s.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={s.title}
                  />
                </div>
                <div className="p-8 text-center border-t-4 border-[#FFC20E]">
                  <h3 className="text-xl font-black uppercase text-[#0054A6] italic mb-3">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-bold mb-6 italic italic">
                    "{s.desc}"
                  </p>
                  <a
                    href="tel:3529891527"
                    className="bg-slate-50 text-[#0054A6] py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#FFC20E] transition-colors italic"
                  >
                    {content[language].freeEstimate}{" "}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS (IMAGEN + TEXTO) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center bg-white p-12 rounded-[4rem] shadow-2xl border-b-[15px] border-[#0054A6]">
            <div className="relative">
              <img
                src="/why-us.png"
                className="rounded-[3rem] shadow-2xl border-l-[15px] border-[#FFC20E]"
                alt="Alex Pena"
              />
              <div className="absolute -top-6 -right-6 bg-[#FFC20E] p-8 rounded-[2rem] shadow-xl text-center">
                <Award className="w-10 h-10 text-[#0054A6] mx-auto mb-2" />
                <p className="text-[#0054A6] font-black text-2xl leading-none">
                  15+
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#0054A6] mb-6">
                {content[language].aboutTitle}
              </h2>
              <p className="text-slate-600 font-bold mb-8 italic leading-relaxed text-lg">
                {content[language].aboutText}
              </p>
              <Link href="/about">
                <a className="inline-flex items-center gap-4 bg-[#0054A6] text-white px-8 py-4 rounded-2xl font-black uppercase text-sm shadow-xl hover:bg-[#FFC20E] hover:text-[#0054A6] transition-all italic cursor-pointer">
                  {content[language].aboutHistoryBtn}{" "}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS (ANTES Y DESPUÉS) */}
      <section id="results" className="py-24 bg-white text-center">
        <h2 className="text-5xl font-black uppercase text-[#0054A6] mb-12 italic tracking-tighter">
          EXTREME RESULTS
        </h2>
        <div className="max-w-4xl mx-auto relative px-6">
          <div className="grid md:grid-cols-2 gap-2 rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl h-[400px]">
            <div className="relative h-full">
              <img
                src={galleryPreview[currentBefAft].before}
                className="w-full h-full object-cover grayscale"
                alt="Before"
              />
            </div>
            <div className="relative h-full border-l-4 border-[#FFC20E]">
              <img
                src={galleryPreview[currentBefAft].after}
                className="w-full h-full object-cover"
                alt="After"
              />
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center -translate-x-6 hover:bg-[#FFC20E] transition-all"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center translate-x-6 hover:bg-[#FFC20E] transition-all"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-2">
              <img
                src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
                className="h-6"
                alt="Google"
              />

              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FFC20E] text-[#FFC20E]"
                  />
                ))}
              </div>
            </div>

            <h2 className="text-4xl font-black uppercase text-[#0054A6] italic tracking-tighter">
              {content[language].googleReviewsTitle}
            </h2>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">
              {content[language].googleSatisfaction}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {googleReviews.map((rev, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-100 text-left relative"
              >
                <Quote className="absolute top-6 right-6 text-slate-50 w-10 h-10" />

                <div className="flex gap-0.5 mb-4">
                  {[...Array(rev.stars)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3 h-3 fill-[#FFC20E] text-[#FFC20E]"
                    />
                  ))}
                </div>

                <p className="text-sm font-bold italic text-slate-600 mb-6 leading-relaxed">
                  "{rev.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0054A6] rounded-full flex items-center justify-center text-white text-[9px] font-black italic">
                    G
                  </div>

                  <span className="text-[10px] font-black uppercase text-[#0054A6]">
                    {rev.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM - RESTAURADO */}
      <section className="py-24 bg-white text-center">
        <Instagram className="w-12 h-12 text-[#E4405F] mx-auto mb-4" />
        <h2 className="text-4xl font-black uppercase italic text-[#0054A6] mb-12">
          Follow Our Process
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-6">
          {instagramPhotos.map((photo, i) => (
            <div
              key={i}
              className="aspect-square rounded-[2rem] overflow-hidden shadow-lg border-4 border-slate-50 group"
            >
              <img
                src={photo}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt="Instagram"
              />
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white pt-20 pb-10 border-t-[15px] border-[#0054A6]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <img src="/logo.png" className="h-16 mb-4" alt="Logo" />

              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 italic">
                "In God We Trust"
              </p>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0054A6] mb-4">
                Social Network
              </span>

              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all"
                >
                  <Music2 className="w-5 h-5" />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-[#E4405F] text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all"
                >
                  <Facebook className="w-5 h-5 fill-current" />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <a
                href="tel:3529891527"
                className="text-5xl font-black text-[#0054A6] tracking-tighter italic hover:scale-105 transition-transform"
              >
                352-989-1527
              </a>

              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-[#FFC20E]" />

                <span className="text-[10px] font-black uppercase italic text-slate-400">
                  Clermont, Florida
                </span>
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