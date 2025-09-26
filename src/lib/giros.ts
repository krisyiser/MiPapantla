// Slugs que usarás en tus rutas / secciones
export type SectionSlug =
  | 'hospedaje'           // Hotel
  | 'restaurantes'        // Restaurante
  | 'turismo'             // Agencia de Turismo
  | 'experiencias'        // Experiencias
  | 'vida-nocturna'       // Vida Nocturna (Bar, Terraza, etc)
  | 'vainilla'            // Vainilla
  | 'mercados'            // Locales (Mercados)
  | 'servicios'           // Servicios profesionales
  | 'salud'               // Salud
  | 'abarrotes'           // Abarrotes

// Mapeo “texto del formulario (normalizado)” -> slug de sección
const GIRO_TO_SECTION: Record<string, SectionSlug> = {
  'hotel': 'hospedaje',
  'restaurante': 'restaurantes',
  'agencia de turismo': 'turismo',
  'experiencias': 'experiencias',
  'vida nocturna (bar, terraza, etc)': 'vida-nocturna',
  'vainilla': 'vainilla',
  'locales (mercados)': 'mercados',
  'servicios profesionales': 'servicios',
  'salud': 'salud',
  'abarrotes': 'abarrotes',
};

// Normaliza a minúsculas y quita espacios dobles
export function normGiroLabel(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

// Dado un giro (ya normalizado en fetch), devuelve su slug de sección
export function giroToSectionSlug(giro: string): SectionSlug | null {
  const key = normGiroLabel(giro)
  return GIRO_TO_SECTION[key] ?? null
}

// ¿Un negocio pertenece a la sección X?
import type { Business } from '@/lib/fetchBusinesses'
export function businessInSection(b: Business, section: SectionSlug) {
  return b.giros.some((g) => giroToSectionSlug(g) === section)
}

// Agrupa por sección (útil si quieres precargar todo y repartir)
export function groupBySection(businesses: Business[]) {
  const map: Record<SectionSlug, Business[]> = {
    'hospedaje': [],
    'restaurantes': [],
    'turismo': [],
    'experiencias': [],
    'vida-nocturna': [],
    'vainilla': [],
    'mercados': [],
    'servicios': [],
    'salud': [],
    'abarrotes': [],
  }
  for (const b of businesses) {
    for (const g of b.giros) {
      const s = giroToSectionSlug(g)
      if (s) map[s].push(b)
    }
  }
  return map
}
