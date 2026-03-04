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
  CheckCircle2,
  Trophy,
  ShieldCheck,
  Star,
  MessageCircle,
} from "lucide-react";

export default function About() {
  const { language, setLanguage } = useLanguage();
  const t = content[language];

  // Datos de seguridad
  const aboutData = t.aboutPage || {
    title: t.aboutTitle,
    subtitle: language === "es" ? "Historia y Valores" : "History & Values",
    description: t.aboutText,
    historyTitle: language === "es" ? "Experiencia Real" : "Real Experience",
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#414042]">
      {/* HEADER - UNIFICADO CON BOTÓN AMARILLO */}
      <header className="bg-white py-4 border-b-4 border-[#FFC20E] sticky top-0 z-[100] shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-12 md:h-14 cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>

          <nav className="hidden xl:flex gap-8 text-[11px] font-black uppercase tracking-widest text-[#0054A6]">
            <Link href="/"><a className="hover:text-[#FFC20E] transition-colors">{t.nav.home}</a></Link>
            <a href="/#services" className="hover:text-[#FFC20E] transition-colors">{t.nav.services}</a>
            <Link href="/about">
              <a className="text-[#FFC20E] border-b-2 border-[#FFC20E] cursor-pointer">
                {language === "es" ? "Nosotros" : "About Us"}
              </a>
            </Link>
            <Link href="/gallery"><a className="hover:text-[#FFC20E] transition-colors">{t.nav.gallery}</a></Link>
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

      {/* HERO ABOUT - MÁS ESTILIZADO */}
      <section className="bg-[#0054A6] text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-[#FFC20E] font-black uppercase text-[10px] tracking-[0.3em] mb-8 hover:translate-x-[-5px] transition-transform cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> {language === "es" ? "Volver al inicio" : "Back to Home"}
            </a>
          </Link>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6">
            {aboutData.title}
          </h1>
          <div className="w-20 h-2 bg-[#FFC20E] mx-auto mb-6"></div>
          <p className="text-[#FFC20E] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
            {aboutData.subtitle}
          </p>
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>

      {/* CONTENIDO - MEJORA DE DISEÑO GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img src="/about-1.png" className="rounded-[3.5rem] shadow-2xl border-l-[15px] border-[#FFC20E] relative z-10 w-full object-cover h-[500px]" alt="Team" />
              <div className="absolute -bottom-8 -right-8 bg-[#0054A6] text-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block z-20 border-b-8 border-[#FFC20E]">
                <Trophy className="w-10 h-10 text-[#FFC20E] mb-3" />
                <p className="font-black italic uppercase leading-none text-xl">Top Rated<br/>Florida</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-[#0054A6] mb-8 tracking-tighter leading-none">
                {aboutData.historyTitle}
              </h2>
              <p className="text-slate-600 font-bold text-lg italic leading-relaxed mb-10 border-l-4 border-slate-100 pl-6">
                {aboutData.description}
              </p>

              <div className="grid sm:grid-cols-1 gap-4">
                {t.aboutFeatures.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border-r-4 border-white hover:border-[#FFC20E] transition-all shadow-sm group">
                    <CheckCircle2 className="w-6 h-6 text-[#0054A6] group-hover:text-[#FFC20E]" />
                    <span className="font-black uppercase text-[11px] tracking-widest text-[#0054A6] italic">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES - CARDS MÁS MODERNAS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: language === "es" ? "Confianza" : "Trust", color: "#0054A6", desc: "Reliable service in every brushstroke." },
              { icon: Star, title: language === "es" ? "Calidad" : "Quality", color: "#FFC20E", desc: "Top-tier materials for lasting results." },
              { icon: MapPin, title: language === "es" ? "Local" : "Local", color: "#0054A6", desc: "Proudly serving Clermont community." }
            ].map((v, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] shadow-xl text-center border-b-[10px] group hover:-translate-y-3 transition-all duration-300" style={{ borderColor: v.color }}>
                <v.icon className="w-14 h-14 mx-auto mb-6 transition-transform group-hover:scale-110" style={{ color: v.color }} />
                <h3 className="font-black uppercase italic text-[#0054A6] text-2xl mb-4">{v.title}</h3>
                <p className="text-slate-400 font-bold italic text-sm">{v.desc}</p>
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
              <a href="tel:3529891527" className="text-5xl font-black text-[#0054A6] tracking-tighter italic hover:scale-105 transition-transform italic">352-989-1527</a>
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
      <a href="https://wa.me/13529891527" target="_blank" className="fixed bottom-8 right-8 z-[150] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
}