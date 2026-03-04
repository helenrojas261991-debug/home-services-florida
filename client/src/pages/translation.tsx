import React from "react";

export const content = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      results: "Results",
      gallery: "Gallery",
    },
    heroTitle: (
      <>
        Quality <br /> <span className="text-[#FFC20E]">Painting</span> <br /> &
        Remodeling
      </>
    ),
    servicesTitle: "Our Services",
    services: [
      {
        id: 1,
        title: "Interior & Exterior Painting",
        desc: "Premium finishes for residential and commercial properties.",
        img: "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: 2,
        title: "Cabinet Painting",
        desc: "Factory-smooth finishes to transform your kitchen cabinets.",
        img: "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: 3,
        title: "Paver & Sealer",
        desc: "Protect and enhance your driveways with high-grade sealing.",
        img: "/service3.png",
      },
      {
        id: 4,
        title: "Remodeling",
        desc: "Professional renovation services for every corner of your home.",
        img: "https://images.pexels.com/photos/5691612/pexels-photo-5691612.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: 5,
        title: "Epoxy Garage Floors",
        desc: "Durable and aesthetic flooring solutions for your garage.",
        img: "/service2.png",
      },
      {
        id: 6,
        title: "Pressure Washing",
        desc: "Restore the look of your home with deep exterior cleaning.",
        img: "/service4.png",
      },
    ],
    aboutTitle: "Committed to Perfection.",
    aboutText:
      "At House Painting Services & More LLC, led by Alex Pena, we pride ourselves on delivering more than just a fresh coat of paint. We bring life, protection, and value to your home.",
    aboutFeatures: [
      "Family Owned & Operated",
      "Eco-Friendly Materials",
      "100% Cleanup Guaranteed",
    ],
    // Estas llaves faltaban y por eso daban error en la página About
    aboutPage: {
      title: "Our History",
      subtitle: "Experience & Integrity",
      description:
        "With over 15 years of experience in the Florida market, we have built a reputation for excellence. Alex Pena founded this company with a clear vision: to treat every home as if it were his own.",
      historyTitle: "A Legacy of Quality",
    },
    aboutHistoryBtn: "About Our History",
    missionTitle: "Our Mission",
    missionText:
      "To transform spaces with excellence, providing durable and aesthetic solutions that exceed our clients' expectations.",
    visionTitle: "Our Vision",
    visionText:
      "To be the leading painting and remodeling company in Florida, recognized for our integrity and superior quality.",
    freeEstimate: "Free Estimate",
    resultsTitle: "Extreme Results",
    googleReviewsTitle: "Google Reviews",
    googleSatisfaction: "5.0 Satisfaction Guaranteed",
    followUs: "Follow our process",
    readyToStart: "Ready to start your project?",
    readyToTransform: "Ready to transform your home?",
    yearsExperience: "Years Experience",
    galleryTitle: "Our Work Gallery",
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      results: "Resultados",
      gallery: "Galería",
    },
    heroTitle: (
      <>
        Pintura <br /> <span className="text-[#FFC20E]">de Calidad</span> <br />{" "}
        & Remodelación
      </>
    ),
    servicesTitle: "Nuestros Servicios",
    services: [
      {
        id: 1,
        title: "Pintura Interior y Exterior",
        desc: "Acabados premium para propiedades residenciales y comerciales.",
        img: "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: 2,
        title: "Pintura de Gabinetes",
        desc: "Acabados suaves de fábrica para transformar sus gabinetes de cocina.",
        img: "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: 3,
        title: "Adoquines y Sellado",
        desc: "Proteja y realce sus entradas con sellado de alta calidad.",
        img: "/service3.png",
      },
      {
        id: 4,
        title: "Remodelación",
        desc: "Servicios de renovación profesional para cada rincón de su hogar.",
        img: "https://images.pexels.com/photos/5691612/pexels-photo-5691612.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        id: 5,
        title: "Pisos de Garaje Epoxy",
        desc: "Soluciones de pisos duraderas y estéticas para su garaje.",
        img: "/service2.png",
      },
      {
        id: 6,
        title: "Lavado a Presión",
        desc: "Restaure el aspecto de su hogar con una limpieza exterior profunda.",
        img: "/service4.png",
      },
    ],
    aboutTitle: "Comprometidos con la Perfección.",
    aboutText:
      "En House Painting Services & More LLC, liderado por Alex Pena, nos enorgullecemos de ofrecer más que una simple capa de pintura. Brindamos vida, protección y valor a su hogar.",
    aboutFeatures: [
      "Empresa Familiar",
      "Materiales Ecológicos",
      "Limpieza 100% Garantizada",
    ],
    aboutPage: {
      title: "Nuestra Historia",
      subtitle: "Experiencia e Integridad",
      description:
        "Con más de 15 años de experiencia en el mercado de Florida, hemos construido una reputación de excelencia. Alex Pena fundó esta empresa con una visión clara: tratar cada hogar como si fuera el suyo.",
      historyTitle: "Un Legado de Calidad",
    },
    aboutHistoryBtn: "Nuestra Historia",
    missionTitle: "Nuestra Misión",
    missionText:
      "Transformar espacios con excelencia, brindando soluciones duraderas y estéticas que superen las expectativas de nuestros clientes.",
    visionTitle: "Nuestra Visión",
    visionText:
      "Ser la empresa líder en pintura y remodelación en Florida, reconocida por nuestra integridad y calidad superior.",
    freeEstimate: "Presupuesto Gratis",
    resultsTitle: "Resultados Extremos",
    googleReviewsTitle: "Reseñas de Google",
    googleSatisfaction: "5.0 Satisfacción Garantizada",
    followUs: "Sigue nuestro proceso",
    readyToStart: "¿Listo para empezar tu proyecto?",
    readyToTransform: "¿Listo para transformar tu hogar?",
    yearsExperience: "Años de Experiencia",
    galleryTitle: "Galería de Trabajos",
  },
};
