/**
 * Internationalization (i18n) configuration
 * Centralized translations for English and Spanish
 */

export type Language = "en" | "es";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      services: "Services",
      gallery: "Gallery",
      testimonials: "Testimonials",
      aboutUs: "About Us",
      contact: "Contact",
      requestQuote: "Request Quote",
    },
    // Hero Section
    hero: {
      title: "Expert Maintenance Solutions for Your Home and Business in Florida",
      subtitle: "Plumbing, Painting and General Maintenance with Quality and Confidence",
      cta: "View Services",
    },
    // Services Section
    services: {
      title: "Our Services",
      plumbing: {
        name: "Plumbing",
        description: "Repairs and installations of plumbing systems",
      },
      painting: {
        name: "Painting",
        description: "Residential and commercial painting services",
      },
      maintenance: {
        name: "General Maintenance",
        description: "Repairs and maintenance for your home",
      },
      moreInfo: "More Information",
    },
    // Why Trust Us Section
    whyTrustUs: {
      title: "Why Trust Us?",
      experience: {
        label: "Experience",
        description: "Years of expertise in the industry",
      },
      support247: {
        label: "24/7 Support",
        description: "Always available when you need us",
      },
      competitive: {
        label: "Competitive Prices",
        description: "Best value for your money",
      },
      warranty: {
        label: "Warranty",
        description: "Quality guaranteed on all services",
      },
    },
    // Reviews Section
    reviews: {
      title: "What Our Customers Say",
      viewMore: "View More Reviews",
      rating: "Rating",
    },
    // Gallery Section
    gallery: {
      title: "Our Recent Work",
      followUs: "Follow Us on Instagram",
    },
    // Contact Section
    contact: {
      title: "Need Immediate Help? Contact Us.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      send: "Send",
      phone_label: "Phone: (305) 123-4567",
      email_label: "Email: info@homeservicesflorida.com",
      address_label: "Address: 1234 Calle 8, Pinecrest, FL",
      hours_label: "Hours: 8:00 AM - 5:00 PM",
    },
    // Footer
    footer: {
      company: "Home Services Florida",
      rights: "All rights reserved",
      followUs: "Follow Us",
    },
    // Admin
    admin: {
      dashboard: "Admin Dashboard",
      contentManagement: "Content Management",
      mediaUpload: "Media Upload",
      settings: "Settings",
      logout: "Logout",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      loading: "Loading...",
      success: "Success!",
      error: "Error",
    },
  },
  es: {
    // Navegación
    nav: {
      home: "Inicio",
      services: "Servicios",
      gallery: "Galería",
      testimonials: "Testimonios",
      aboutUs: "Sobre Nosotros",
      contact: "Contacto",
      requestQuote: "Solicitar Presupuesto",
    },
    // Sección Hero
    hero: {
      title: "Soluciones Expertas en Mantenimiento para tu Hogar y Negocio en Florida",
      subtitle: "Plomería, Pintura y Mantenimiento General con Calidad y Confianza",
      cta: "Ver Servicios",
    },
    // Sección de Servicios
    services: {
      title: "Nuestros Servicios",
      plumbing: {
        name: "Plomería",
        description: "Reparaciones e instalaciones de sistemas de plomería",
      },
      painting: {
        name: "Pintura",
        description: "Servicios de pintura residencial y comercial",
      },
      maintenance: {
        name: "Mantenimiento General",
        description: "Reparaciones y mantenimiento para tu hogar",
      },
      moreInfo: "Más Información",
    },
    // Sección ¿Por Qué Confiar en Nosotros?
    whyTrustUs: {
      title: "¿Por Qué Confiar en Nosotros?",
      experience: {
        label: "Experiencia",
        description: "Años de experiencia en la industria",
      },
      support247: {
        label: "Atención 24/7",
        description: "Siempre disponibles cuando nos necesitas",
      },
      competitive: {
        label: "Precios Competitivos",
        description: "El mejor valor por tu dinero",
      },
      warranty: {
        label: "Garantía",
        description: "Calidad garantizada en todos los servicios",
      },
    },
    // Sección de Reseñas
    reviews: {
      title: "Lo que Dicen Nuestros Clientes",
      viewMore: "Ver Más Opiniones",
      rating: "Calificación",
    },
    // Sección de Galería
    gallery: {
      title: "Nuestros Trabajos Recientes",
      followUs: "Síguenos en Instagram",
    },
    // Sección de Contacto
    contact: {
      title: "¿Necesitas Ayuda Inmediata? Contáctanos.",
      name: "Nombre",
      email: "Correo Electrónico",
      phone: "Teléfono",
      message: "Mensaje",
      send: "Enviar",
      phone_label: "Teléfono: (305) 123-4567",
      email_label: "Correo: info@homeservicesflorida.com",
      address_label: "Dirección: 1234 Calle 8, Pinecrest, FL",
      hours_label: "Horario: 8:00 AM - 5:00 PM",
    },
    // Pie de Página
    footer: {
      company: "Home Services Florida",
      rights: "Todos los derechos reservados",
      followUs: "Síguenos",
    },
    // Admin
    admin: {
      dashboard: "Panel de Administración",
      contentManagement: "Gestión de Contenido",
      mediaUpload: "Carga de Medios",
      settings: "Configuración",
      logout: "Cerrar Sesión",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      add: "Agregar",
      loading: "Cargando...",
      success: "¡Éxito!",
      error: "Error",
    },
  },
};

/**
 * Get translation by key and language
 * Supports nested keys with dot notation (e.g., "nav.home")
 */
export function t(key: string, language: Language): string {
  const keys = key.split(".");
  let value: any = translations[language];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key} (${language})`);
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

/**
 * Get all translations for a language
 */
export function getTranslations(language: Language) {
  return translations[language];
}
