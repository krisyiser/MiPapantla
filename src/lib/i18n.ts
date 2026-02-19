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

        // Common
        "loading": "Loading...",
        "error": "An error occurred",
        "back": "Back"
    }
}
