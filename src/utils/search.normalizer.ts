/*export function normalizeSearchText(text: string): string {
  if (!text) {
    return '';
  }

  // Convertir a minúsculas y eliminar espacios al inicio/final
  const trimmedAndLower = text.trim().toLowerCase();

  // Reemplazar múltiples espacios por uno solo
  const singleSpaced = trimmedAndLower.replace(/\s+/g, ' ');

  // Normalizar para separar caracteres base de diacríticos (ej. á -> a + ´)
  // y luego eliminar los diacríticos, excepto para la ñ.
  // La ñ (U+00F1) se descompone en n (U+006E) y tilde (U+0303).
  // La expresión regular /[^\u006E\u0303]/g asegura que no se elimine la tilde de la n.
  const normalized = singleSpaced.normalize('NFD').replace(/[\u0300-\u0302\u0304-\u036f]/g, '');

  return normalized;
}*/
export function normalizeSearchText(text: string): string {
  if (!text) {
    return '';
  }

  // 1. Limpieza inicial: Recortar espacios y convertir a minúsculas
  let normalizedText = text.trim().toLowerCase();

  // 2. Reemplazar múltiples espacios por uno solo
  normalizedText = normalizedText.replace(/\s+/g, ' ');

  // --- PASO CRUCIAL 1: QUITAR TILDES Y DIÉRESIS DE LA ENTRADA ---
  // Usamos reemplazos explícitos para asegurar que 'ó' se convierta en 'o', 'ü' en 'u', etc.
  /*normalizedText = normalizedText.replace(/[ÅåáÁàÀâÂ ÁáÀàÂâÄäÃãÅåĀāĂăǍǎȦȧ]/g, 'a');
  normalizedText = normalizedText.replace(/[ëe̊éÉèÈêÊ ÉéÈèÊêËëĒēĔĕĚěĖė]/g, 'e');
  normalizedText = normalizedText.replace(/[íÍìÌîÎ ÍíÌìÎîÏïĨĩĪīĬĭǏǐİi̇]/g, 'i');
  normalizedText = normalizedText.replace(/[óÓòÒôÔ ÓóÒòÔôÖöÕõŌōŎŏǑǒȮȯ]/g, 'o');
  normalizedText = normalizedText.replace(/[úÚùÙûÛüÜ ÚúÙùÛûÜüŨũŮůŪūŬŭǓǔU̇u̇]/g, 'u');*/

  normalizedText = normalizedText.replace(/[ÁáÀàÂâÄäÃãÅåĀāĂăǍǎȦȧ]/gu, 'a');
  normalizedText = normalizedText.replace(/[ÉéÈèÊêËëĒēĔĕĚěĖė]/gu, 'e');
  normalizedText = normalizedText.replace(/[ÍíÌìÎîÏïĨĩĪīĬĭǏǐ]/gu, 'i');
  normalizedText = normalizedText.replace(/[ÓóÒòÔôÖöÕõŌōŎŏǑǒȮȯ]/gu, 'o');
  normalizedText = normalizedText.replace(/[ÚúÙùÛûÜüŨũŮůŪūŬŭǓǔU̇u̇]/gu, 'u');
  // Si necesitas manejar la ñ, puedes añadir:
  // normalizedText = normalizedText.replace(/ñ/g, 'n');

  // 3. CREAR EL PATRÓN DE BÚSQUEDA FLEXIBLE
  // Ahora que la entrada está limpia ('reparacion'), creamos el patrón que buscará las tildes.
  normalizedText = normalizedText.replace(/a/g, '(?:a|á|ä|à)');
  normalizedText = normalizedText.replace(/e/g, '(?:e|é|ë|è)');
  normalizedText = normalizedText.replace(/i/g, '(?:i|í|ï|ì)');
  normalizedText = normalizedText.replace(/o/g, '(?:o|ó|ö|ò)');
  normalizedText = normalizedText.replace(/u/g, '(?:u|ú|ü|ù)');

  // 4. Se asegura de recomponer la cadena si es necesario
  return normalizedText.normalize('NFC');
}

export function normalizeForHistory(text: string): string {
  if (!text) {
    return '';
  }

  // 1. Convertir a minúsculas y limpiar espacios
  let normalized = text.trim().toLowerCase();

  // 2. Reemplazar múltiples espacios por uno solo
  normalized = normalized.replace(/\s+/g, ' ');

  // 3. Eliminar acentos y diéresis
  normalized = normalized.replace(/[ÁáÀàÂâÄäÃãÅåĀāĂăǍǎȦȧ]/g, 'a');
  normalized = normalized.replace(/[ÉéÈèÊêËëĒēĔĕĚěĖė]/g, 'e');
  normalized = normalized.replace(/[ÍíÌìÎîÏïĨĩĪīĬĭǏǐ]/g, 'i');
  normalized = normalized.replace(/[ÓóÒòÔôÖöÕõŌōŎŏǑǒȮȯ]/g, 'o');
  normalized = normalized.replace(/[ÚúÙùÛûÜüŨũŮůŪūŬŭǓǔ]/g, 'u');

  // Mantener la ñ como ñ (no convertir a n)
  // Si quieres convertir ñ → n, descomenta la siguiente línea:
  // normalized = normalized.replace(/ñ/g, 'n');

  return normalized;
}

/**
 * Genera variaciones de singular/plural de un término de búsqueda
 * Ejemplos:
 * - "muro" → ["muro", "muros"]
 * - "muros" → ["muros", "muro"]
 * - "exterior" → ["exterior", "exteriores"]
 * - "exteriores" → ["exteriores", "exterior"]
 */
export function generatePluralVariations(text: string): string[] {
  if (!text) {
    return [];
  }

  const normalized = text.trim().toLowerCase();
  const variations = [normalized];

  // Caso 1: Termina en "es" (ej: exteriores, interiores)
  if (normalized.endsWith('es') && normalized.length > 3) {
    // Quitar "es" → exterior
    variations.push(normalized.slice(0, -2));

    // También intentar quitar solo la "s" → exteriore (poco común pero por si acaso)
    if (!variations.includes(normalized.slice(0, -1))) {
      variations.push(normalized.slice(0, -1));
    }
  }
  // Caso 2: Termina en "s" pero no en "es" (ej: muros, pisos)
  else if (normalized.endsWith('s') && normalized.length > 2) {
    // Quitar "s" → muro, piso
    variations.push(normalized.slice(0, -1));
  }
  // Caso 3: No termina en "s" (es singular)
  else {
    // Agregar "s" → muros
    variations.push(normalized + 's');

    // Agregar "es" para palabras que terminan en consonante que no sea "s"
    // (ej: exterior → exteriores)
    const lastChar = normalized.charAt(normalized.length - 1);
    const consonants = 'bcdfghjklmnpqrstvwxyz';

    if (consonants.includes(lastChar)) {
      variations.push(normalized + 'es');
    }
  }

  // Eliminar duplicados
  return [...new Set(variations)];
}
