/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * CANONICAL VOCABULARY LISTS
 * 
 * RULE: These tokens appear persistently across ALL levels as reinforcement.
 * They are not tied to specific levels but should be present throughout.
 */

/**
 * High-frequency tokens (20-40 words)
 * These appear from L1 onwards as "persistent background reinforcement"
 */
export const FREQUENT_TOKENS = [
  // Articles + determiners
  'EL', 'LA', 'LOS', 'LAS', 'UN', 'UNA', 'UNOS', 'UNAS',
  // Pronouns
  'TU', 'TE', 'SE', 'LO', 'LA', 'LE', 'LES', 'LOS', 'LAS',
  // Prepositions + conjunctions
  'DE', 'DEL', 'A', 'AL', 'EN', 'CON', 'SIN', 'POR', 'PARA',
  // Common words
  'QUE', 'NO', 'SI', 'ES', 'SON', 'MUY', 'MAS', 'O', 'Y',
  // Possessives
  'MIS', 'TUS', 'SUS', 'MIO', 'TUYO',
  // Other ultra-common
  'COMO', 'PERO', 'ESTE', 'ESTA', 'ESO', 'ESA', 'TODO', 'NADA'
];

/**
 * Secondary frequent tokens (appear from L21 onwards)
 */
export const SECONDARY_FREQUENT_TOKENS = [
  'PARA', 'TAMBIEN', 'DESDE', 'HASTA', 'CUANDO', 'DONDE',
  'QUE', 'QUIEN', 'CUAL', 'CUALES', 'CUANTO', 'CUANTA'
];

/**
 * P-FORCED WORDS (15-20% coverage in L1-L40)
 */
export const P_FORCED_WORDS = [
  // P inicial
  'PALA', 'PASO', 'PIPA', 'PELOTA', 'PAPEL', 'PATO', 'PAPA', 'POLO',
  'PESO', 'PILA', 'POCO', 'PALO', 'PISO', 'PEINE', 'PUÑO', 'PAÑO',
  // P media
  'CAPA', 'LAPA', 'SOPA', 'LOPEZ', 'CEPEDA', 'TAPIA', 'ESPEJO',
  'ESPADA', 'APITO', 'CEPILLO', 'COPIA', 'RAPIDO', 'MAPA',
  // P final
  'PAN', 'FIN', 'CON', 'TEN', 'VEN', 'SAL', 'RED', 'TOS',
  // Palabras comunes con P
  'POR', 'PARA', 'PUEDO', 'PONER', 'PASAR', 'PEDIR', 'PEGAR',
  'PINTAR', 'PENSAR', 'PROBAR', 'PRESTAR', 'PREGUNTAR'
];

/**
 * G-FORCED WORDS (10-15% coverage in L1-L40)
 */
export const G_FORCED_WORDS = [
  // G inicial
  'GATO', 'GOMA', 'GESTO', 'GOLPE', 'GUSANO', 'GALLO', 'GANSO',
  'GOTA', 'GULA', 'GAFAS', 'GOMA', 'GORRO', 'GRITO', 'GRITO',
  // G media
  'AGUA', 'HOGAR', 'LUGAR', 'PAGAR', 'JUGAR', 'SANGRE', 'DIGNO',
  'SIGNO', 'MAGIA', 'LOGICA', 'REGALO', 'AGUJA', 'CIGARRO',
  // G final (poco común en español, forzar igual)
  'GAG', 'HOG', 'ZIG', 'ZAG',
  // Palabras comunes con G
  'GRAN', 'GRACIAS', 'GENTE', 'GRANDE', 'GUERRA', 'GUSTAR', 'GANAR'
];

/**
 * H-FORCED WORDS (10-15% coverage in L1-L40)
 */
export const H_FORCED_WORDS = [
  // H inicial
  'HOLA', 'HIELO', 'HUESO', 'HILO', 'HONGO', 'HORMIGA', 'HACHA',
  'HIGO', 'HULA', 'HUEVO', 'HARINA', 'HIERBA', 'HOMBRE', 'HONGO',
  // H media (h muda en dígrafos)
  'ALMOHADA', 'DESDE', 'HECHO', 'CHOCHO', 'LECHE', 'MOCHO',
  // Palabras comunes con H
  'HABER', 'HACER', 'HABLAR', 'HALLAR', 'HUIR', 'HONRAR', 'HUMOR'
];

/**
 * K-FORCED WORDS (5-10% coverage in L1-L40)
 * K es rara en español, hay que forzarla deliberadamente
 */
export const K_FORCED_WORDS = [
  // K inicial
  'KILO', 'KAYAK', 'KIMONO', 'KIOSCO', 'KOALA', 'KARMA', 'KEFIR',
  'KARATE', 'KINDER', 'KIWI', 'KURDO', 'KWAIT', 'KENIA',
  // K media
  'KARATECA', 'KILÓMETRO', 'KIOSQUERO',
  // K final (extranjerismos)
  'PUNK', 'ROCK', 'WOK', 'BIKINI', 'AIKIDO', 'SUDOKU',
  // Palabras con K compuesta
  'KUNG FU', 'KENIANO', 'KERMESSE', 'KETCHUP'
];

/**
 * Combined P/G/H/K words for dedicated levels
 */
export const FRAGILE_CONSONANTS_WORDS = [
  ...P_FORCED_WORDS,
  ...G_FORCED_WORDS,
  ...H_FORCED_WORDS,
  ...K_FORCED_WORDS
];

/**
 * RULE: Coverage requirements per level block (L1-L40)
 * - P: mínimo 15-20% de targets
 * - G: mínimo 10-15% de targets
 * - H: mínimo 10-15% de targets
 * - K: mínimo 5-10% de targets (forzada, no natural)
 */
export const COVERAGE_RULES = {
  P_MIN_PERCENT: 0.15,
  G_MIN_PERCENT: 0.10,
  H_MIN_PERCENT: 0.10,
  K_MIN_PERCENT: 0.05
};
