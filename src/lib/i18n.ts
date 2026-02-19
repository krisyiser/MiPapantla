export type Language = 'es' | 'en'

export type Translations = {
    [key in Language]: {
        [key: string]: string
    }
}

export const translations: Translations = {
    es: {
        // General
        "app.title": "MiPapantla",
        "app.subtitle": "Donde la tradición cobra vida",
        "btn.language": "ENG",

        // Navigation (Bottom)
        "nav.turismo": "TURISMO",
        "nav.seguridad": "SEGURIDAD",
        "nav.mapa": "MAPA",
        "nav.transporte": "TRANSPORTE",
        "nav.contacto": "CONTACTO",

        // Home Grid (Mosaic)
        "grid.eventos": "EVENTOS",
        "grid.visitame": "¡VISÍTAME!",
        "grid.hospedaje": "HOSPEDAJE",
        "grid.restaurantes": "RESTAURANTES",
        "grid.mercados": "MERCADOS",
        "grid.salud": "SALUD",
        "grid.profesionales": "SERVICIOS PROFESIONALES",
        "grid.experiencias": "EXPERIENCIAS",
        "grid.agencias": "AGENCIAS DE TURISMO",
        "grid.playas": "PLAYAS",
        "grid.vainilla": "VAINILLA",

        // Heros (Page Titles)
        "hero.salud.title": "Salud y Bienestar",
        "hero.salud.subtitle": "Directorio médico y servicios de salud en Papantla",
        "hero.hoteles.title": "Hospedaje en Papantla",
        "hero.hoteles.subtitle": "Encuentra el lugar perfecto para descansar",
        "hero.restaurantes.title": "Gastronomía de Papantla",
        "hero.restaurantes.subtitle": "Sabores tradicionales, café aromático y sazón local",
        "hero.servicios.title": "Servicios Profesionales",
        "hero.servicios.subtitle": "Expertos locales a tu disposición",
        "hero.mercados.title": "Mercados de Papantla",
        "hero.mercados.subtitle": "Tradición, sabor y productos locales",
        "hero.experiencias.title": "Experiencias",
        "hero.experiencias.subtitle": "Vive Papantla con todos los sentidos",
        "hero.agencias.title": "Agencias de Turismo",
        "hero.agencias.subtitle": "Aventura y naturaleza te esperan",
        "hero.playas.title": "Playas",
        "hero.playas.subtitle": "Sol, arena y mar cerca de ti",
        "hero.vainilla.title": "Vainilla de Papantla",
        "hero.vainilla.subtitle": "El aroma que conquista al mundo",

        // Business Card Actions & Labels
        "btn.call": "Llamar",
        "btn.whatsapp": "WhatsApp",
        "btn.howToGet": "Cómo llegar",
        "btn.menu": "Ver Menú",
        "btn.menuPdf": "Menú (PDF)",
        "btn.web": "Redes / Sitio",
        "btn.details": "Ver detalles",
        "label.schedule": "Horario",
        "label.prices": "Precios",
        "label.languages": "Idiomas",
        "label.special": "Especial",
        "label.services": "Servicios / Productos",
        "msg.noPhoto": "Sin foto",

        // Common
        "loading": "Cargando...",
        "error": "Ocurrió un error",
        "back": "Volver"
    },
    en: {
        // General
        "app.title": "MiPapantla",
        "app.subtitle": "Where tradition comes to life",
        "btn.language": "ESP",

        // Navigation (Bottom)
        "nav.turismo": "TOURISM",
        "nav.seguridad": "SECURITY",
        "nav.mapa": "MAP",
        "nav.transporte": "TRANSPORT",
        "nav.contacto": "CONTACT",

        // Home Grid (Mosaic)
        "grid.eventos": "EVENTS",
        "grid.visitame": "VISIT ME!",
        "grid.hospedaje": "LODGING",
        "grid.restaurantes": "RESTAURANTS",
        "grid.mercados": "MARKETS",
        "grid.salud": "HEALTH",
        "grid.profesionales": "PROFESSIONAL SERVICES",
        "grid.experiencias": "EXPERIENCES",
        "grid.agencias": "TOUR AGENCIES",
        "grid.playas": "BEACHES",
        "grid.vainilla": "VANILLA",

        // Heros (Page Titles)
        "hero.salud.title": "Health & Wellness",
        "hero.salud.subtitle": "Medical directory and health services in Papantla",
        "hero.hoteles.title": "Lodging in Papantla",
        "hero.hoteles.subtitle": "Find the perfect place to rest",
        "hero.restaurantes.title": "Papantla Gastronomy",
        "hero.restaurantes.subtitle": "Traditional flavors, aromatic coffee and local seasoning",
        "hero.servicios.title": "Professional Services",
        "hero.servicios.subtitle": "Local experts at your disposal",
        "hero.mercados.title": "Papantla Markets",
        "hero.mercados.subtitle": "Tradition, flavor and local products",
        "hero.experiencias.title": "Experiences",
        "hero.experiencias.subtitle": "Live Papantla with all your senses",
        "hero.agencias.title": "Tour Agencies",
        "hero.agencias.subtitle": "Adventure and nature await you",
        "hero.playas.title": "Beaches",
        "hero.playas.subtitle": "Sun, sand and sea near you",
        "hero.vainilla.title": "Papantla Vanilla",
        "hero.vainilla.subtitle": "The aroma that conquers the world",

        // Business Card Actions & Labels
        "btn.call": "Call",
        "btn.whatsapp": "WhatsApp",
        "btn.howToGet": "Directions",
        "btn.menu": "View Menu",
        "btn.menuPdf": "Menu (PDF)",
        "btn.web": "Website / Social",
        "btn.details": "View details",
        "label.schedule": "Schedule",
        "label.prices": "Prices",
        "label.languages": "Languages",
        "label.special": "Specialty",
        "label.services": "Services / Products",
        "msg.noPhoto": "No photo",

        // Common
        "loading": "Loading...",
        "error": "An error occurred",
        "back": "Back"
    }
}
