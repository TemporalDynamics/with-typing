/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SCRIPT DE VALIDACIÓN DE CORPUS
 * 
 * Detecta:
 * - Typos y strings mal formadas
 * - Duplicados dentro del mismo nivel
 * - Palabras con separaciones incorrectas
 * - Combinaciones raras o poco naturales
 * - Cobertura de P/G/H/K por nivel
 */

import { LEVELS } from '../src/engine/LevelDefinitions';

// Basic Spanish dictionary for validation (common words)
const SPANISH_DICTIONARY = new Set([
  // Articles + determiners
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'este', 'esta', 'estos', 'estas',
  'ese', 'esa', 'esos', 'esas', 'aquel', 'aquella', 'aquellos', 'aquellas',
  // Pronouns
  'yo', 'tu', 'el', 'ella', 'nosotros', 'vosotros', 'ellos', 'me', 'te', 'se', 'lo', 'le', 'les',
  // Prepositions + conjunctions
  'de', 'del', 'a', 'al', 'en', 'con', 'sin', 'por', 'para', 'sobre', 'entre', 'hasta',
  'desde', 'contra', 'según', 'y', 'e', 'ni', 'que', 'quien', 'cual', 'cuales', 'cuanto',
  // Common words
  'no', 'si', 'es', 'son', 'muy', 'mas', 'o', 'como', 'pero', 'tambien', 'solo', 'ya',
  'bien', 'asi', 'todo', 'nada', 'algo', 'mucho', 'poco', 'mas', 'menos',
  // Verbs common
  'ser', 'estar', 'tener', 'hacer', 'ir', 'venir', 'ver', 'dar', 'saber', 'querer',
  'llegar', 'pasar', 'deber', 'poner', 'parecer', 'quedar', 'creer', 'hablar', 'llevar',
  'dejar', 'seguir', 'encontrar', 'llamar', 'vivir', 'sentir', 'volver', 'salir',
  // Nouns common
  'casa', 'vida', 'tiempo', 'dia', 'noche', 'manana', 'tarde', 'ano', 'vez', 'cosa',
  'hombre', 'mujer', 'nino', 'nina', 'padre', 'madre', 'hijo', 'hija', 'hermano',
  'amigo', 'trabajo', 'parte', 'lugar', 'mundo', 'pais', 'ciudad', 'pueblo',
  'agua', 'luz', 'sol', 'luna', 'tierra', 'mar', 'rio', 'montana', 'camino',
  'mano', 'ojo', 'cara', 'cabeza', 'voz', 'palabra', 'idea', 'pensamiento',
  'amor', 'paz', 'guerra', 'vida', 'muerte', 'salud', 'fuerza', 'energia',
  // Adjectives common
  'bueno', 'malo', 'grande', 'pequeno', 'nuevo', 'viejo', 'joven', 'alto', 'bajo',
  'largo', 'corto', 'ancho', 'estrecho', 'fuerte', 'debil', 'rico', 'pobre',
  'feliz', 'triste', 'contento', 'enojado', 'cansado', 'ocupado', 'libre', 'solo',
  'claro', 'oscuro', 'blanco', 'negro', 'rojo', 'verde', 'azul', 'amarillo',
  // P/G/H/K words that should exist
  'pato', 'gato', 'papa', 'tapa', 'sopa', 'piso', 'palo', 'peine', 'paso', 'plan',
  'gota', 'gorra', 'goma', 'golf', 'gol', 'gas', 'pan', 'pez', 'pilar', 'pintar',
  'hola', 'hilo', 'higo', 'hueso', 'huevo', 'hongo', 'hacha', 'harina', 'hierba',
  'kilo', 'kayak', 'kiosco', 'koala', 'karate', 'karaoke', 'kefir', 'kimono',
  // More common words
  'bueno', 'nuevo', 'mejor', 'mismo', 'mucho', 'donde', 'ahora', 'antes', 'luego',
  'nunca', 'siempre', 'pronto', 'cerca', 'lejos', 'fuera', 'junto', 'claro', 'justo',
  'lento', 'suave', 'camino', 'puente', 'destino', 'memoria', 'ventana', 'teclado',
  'naranja', 'sendero', 'estrella', 'latidos', 'palabra', 'rescate', 'bosque', 'jardin',
  'piedra', 'fuente', 'colina', 'brillo', 'ritmo', 'precision', 'horizonte', 'aventura',
  'universo', 'santuario', 'constante', 'brillante', 'sincero', 'corriente', 'esfuerzo',
  'comienzo', 'estructura', 'naturaleza', 'movimiento', 'equilibrio', 'aprendizaje'
]);

// Suspicious patterns that might indicate typos or bad data
const SUSPICIOUS_PATTERNS = [
  /\s{2,}/,           // Multiple spaces
  /^[A-Z]{2,}$/,      // All caps words (except single letters)
  /[aeiou]{3,}/,      // 3+ consecutive vowels (usually wrong)
  /[bcdfghjklmnpqrstvwxyz]{4,}/i, // 4+ consecutive consonants
  /\s\w\s/,           // Single letter surrounded by spaces (probably typo)
];

// Words that look like accidental combinations
const SUSPICIOUS_COMBINATIONS = [
  'pato gato',
  'hola kilo',
  'pato y gato',
  'gato hola',
  'kilo papas',
  'papas gatos',
  'gatos hilos',
  'hilos kilos',
];

interface ValidationResult {
  levelId: string;
  issues: Issue[];
}

interface Issue {
  type: 'typo' | 'duplicate' | 'suspicious' | 'coverage' | 'malformed';
  severity: 'error' | 'warning' | 'info';
  message: string;
  value?: string;
}

// Levels where duplicates are intentional for pedagogical repetition
const ALLOWED_DUPLICATE_LEVELS = new Set(['L1', 'L2', 'L3', 'L5', 'L11']);

function validateLevel(level: typeof LEVELS[0]): ValidationResult {
  const issues: Issue[] = [];
  const content = level.content;
  const seen = new Map<string, number>(); // Track first occurrence index

  // Check each item in content
  content.forEach((item, index) => {
    const normalized = item.toLowerCase().trim();

    // Check for duplicates (skip allowed levels)
    if (seen.has(normalized) && !ALLOWED_DUPLICATE_LEVELS.has(level.id)) {
      issues.push({
        type: 'duplicate',
        severity: 'error',
        message: `Duplicado en índice ${index} (primera vez en índice ${seen.get(normalized)})`,
        value: item
      });
    }
    if (!seen.has(normalized)) {
      seen.set(normalized, index);
    }

    // Check for malformed strings
    if (normalized.includes('  ')) {
      issues.push({
        type: 'malformed',
        severity: 'error',
        message: `Múltiples espacios consecutivos`,
        value: item
      });
    }

    // Check for suspicious patterns
    SUSPICIOUS_PATTERNS.forEach(pattern => {
      if (pattern.test(normalized)) {
        issues.push({
          type: 'suspicious',
          severity: 'warning',
          message: `Patrón sospechoso detectado`,
          value: item
        });
      }
    });

    // Check for suspicious combinations
    SUSPICIOUS_COMBINATIONS.forEach(combo => {
      if (normalized.includes(combo)) {
        issues.push({
          type: 'suspicious',
          severity: 'warning',
          message: `Combinación poco natural`,
          value: item
        });
      }
    });

    // Check if single word exists in dictionary (skip phrases)
    if (!normalized.includes(' ') && normalized.length > 1) {
      // Remove common punctuation
      const cleanWord = normalized.replace(/[;:,.\'\"¡!¿?]/g, '');
      if (!SPANISH_DICTIONARY.has(cleanWord) && cleanWord.length < 15) {
        // Only flag if it's not obviously a P/G/H/K reinforcement word
        const hasPGHK = /[pghk]/.test(cleanWord);
        if (!hasPGHK) {
          issues.push({
            type: 'typo',
            severity: 'info',
            message: `Palabra no está en diccionario básico`,
            value: item
          });
        }
      }
    }
  });

  // Check P/G/H/K coverage for levels L1-L40
  if (level.id.match(/^L([1-9]|[1-3][0-9]|40)$/)) {
    const pCount = content.filter(item => item.toLowerCase().includes('p')).length;
    const gCount = content.filter(item => item.toLowerCase().includes('g')).length;
    const hCount = content.filter(item => item.toLowerCase().includes('h')).length;
    const kCount = content.filter(item => item.toLowerCase().includes('k')).length;
    const total = content.length;

    const pPercent = pCount / total;
    const gPercent = gCount / total;
    const hPercent = hCount / total;
    const kPercent = kCount / total;

    if (pPercent < 0.10) {
      issues.push({
        type: 'coverage',
        severity: 'warning',
        message: `Cobertura P baja: ${(pPercent * 100).toFixed(1)}% (mínimo recomendado: 15%)`,
        value: `${pCount}/${total}`
      });
    }
    if (gPercent < 0.07) {
      issues.push({
        type: 'coverage',
        severity: 'warning',
        message: `Cobertura G baja: ${(gPercent * 100).toFixed(1)}% (mínimo recomendado: 10%)`,
        value: `${gCount}/${total}`
      });
    }
    if (hPercent < 0.07) {
      issues.push({
        type: 'coverage',
        severity: 'warning',
        message: `Cobertura H baja: ${(hPercent * 100).toFixed(1)}% (mínimo recomendado: 10%)`,
        value: `${hCount}/${total}`
      });
    }
    if (kPercent < 0.03) {
      issues.push({
        type: 'coverage',
        severity: 'info',
        message: `Cobertura K baja: ${(kPercent * 100).toFixed(1)}% (mínimo recomendado: 5%)`,
        value: `${kCount}/${total}`
      });
    }
  }

  return { levelId: level.id, issues };
}

function validateAllLevels(): void {
  console.log('🔍 Validando corpus de niveles...\n');
  
  const results: ValidationResult[] = LEVELS.map(validateLevel);
  
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalInfos = 0;

  results.forEach(result => {
    const errors = result.issues.filter(i => i.severity === 'error');
    const warnings = result.issues.filter(i => i.severity === 'warning');
    const infos = result.issues.filter(i => i.severity === 'info');

    if (errors.length > 0 || warnings.length > 0) {
      console.log(`\n📋 ${result.levelId}:`);
      
      if (errors.length > 0) {
        console.log(`   ❌ ${errors.length} errores:`);
        errors.forEach(issue => {
          console.log(`      - [${issue.type}] ${issue.message}${issue.value ? `: "${issue.value}"` : ''}`);
        });
        totalErrors += errors.length;
      }
      
      if (warnings.length > 0) {
        console.log(`   ⚠️  ${warnings.length} advertencias:`);
        warnings.forEach(issue => {
          console.log(`      - [${issue.type}] ${issue.message}${issue.value ? `: "${issue.value}"` : ''}`);
        });
        totalWarnings += warnings.length;
      }
      
      if (infos.length > 0 && process.env.VERBOSE === 'true') {
        console.log(`   ℹ️  ${infos.length} informaciones:`);
        infos.forEach(issue => {
          console.log(`      - [${issue.type}] ${issue.message}${issue.value ? `: "${issue.value}"` : ''}`);
        });
      }
      totalInfos += infos.length;
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN:');
  console.log(`   ❌ Errores: ${totalErrors}`);
  console.log(`   ⚠️  Advertencias: ${totalWarnings}`);
  console.log(`   ℹ️  Informaciones: ${totalInfos}`);
  console.log('='.repeat(60));

  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('\n✅ ¡Corpus limpio! No se encontraron problemas.\n');
  } else if (totalErrors === 0) {
    console.log('\n⚠️  Solo hay advertencias. Revisar antes de testing.\n');
  } else {
    console.log('\n❌ Hay errores críticos. Corregir antes de testing.\n');
    process.exit(1);
  }
}

// Run validation
validateAllLevels();
