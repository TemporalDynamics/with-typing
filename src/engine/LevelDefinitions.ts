/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelDefinition } from '../types/game';

export const LEVELS: LevelDefinition[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // F1 — NIDO DE INICIO (L1–L10)
  //   Objetivo humano: orientación motriz y mapa del teclado.
  //   Mecánica: tutorial — teclado completo visible, highlight de tecla,
  //             highlight de dedo, highlight de mano, guía visual clara.
  //   Regla: la etapa atómica existe, es breve, clara y lógica.
  //   Gate: completar L1+L2+L3 desbloquea F2.
  // ═══════════════════════════════════════════════════════════════════════

  // F1.1 — Fila central
  // Resaltar fila central, dedo correcto. Ejercicios simples.
  // REINFORCEMENT: P appears early (pa, ap, pe, po)
  {
    id: 'L1', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 1,
    title: 'Fila Central',
    objective: 'Ubicá los dedos en la fila central. F y J son tus anclas.',
    targetUnitKind: 'home_row',
    content: ['f', 'j', 'f', 'j', 'fj', 'jf', 'ff', 'jj', 'fjf', 'jfj', 'df', 'jk', 'fd', 'kj', 'sd', 'lk', 'asdf', 'jkl;', 'fdsa', ';lkj', 'fds', 'jkl', 'asd', 'fj', 'dk', 'sl', 'pa', 'ap', 'pe', 'po'],
    minAccuracy: 0.80, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.2 — Fila superior
  // Resaltar fila superior, dedos correctos.
  // REINFORCEMENT: P is in top row - emphasize heavily
  {
    id: 'L2', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 2,
    title: 'Fila Superior',
    objective: 'Subí a la fila de arriba sin perder las anclas.',
    targetUnitKind: 'home_row',
    content: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'qw', 'we', 'er', 'rt', 'ty', 'yu', 'ui', 'io', 'op', 'qwer', 'tyui', 'wert', 'yuio', 'qwe', 'rty', 'uio', 'rew', 'poi', 'p', 'pa', 'pe', 'pi', 'po', 'pu', 'apa', 'epe', 'ipi', 'opo', 'upu'],
    minAccuracy: 0.78, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.3 — Fila inferior
  // Resaltar fila inferior, dedos correctos.
  // REINFORCEMENT: G and H appear early (ga, go, ha, he)
  {
    id: 'L3', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 3,
    title: 'Fila Inferior',
    objective: 'Bajá a la fila inferior con control.',
    targetUnitKind: 'home_row',
    content: ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'zx', 'xc', 'cv', 'vb', 'bn', 'nm', 'zxc', 'cvb', 'bnm', 'zxcv', 'vbnm', 'xcv', 'bnm', 'zxcvb', 'mnb', 'vcx', 'g', 'h', 'ga', 'go', 'ha', 'he', 'ho', 'gato', 'hola'],
    minAccuracy: 0.78, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
    // ← Completar L3 desbloquea F2
  },

  // F1.4 — Mano izquierda
  // Recorrido columnas mano izquierda.
  // REINFORCEMENT: P and G with left hand
  {
    id: 'L4', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 4,
    title: 'Mano Izquierda',
    objective: 'Columnas verticales solo con mano izquierda.',
    targetUnitKind: 'home_row',
    content: ['qaz', 'wsx', 'edc', 'rfv', 'tgb', 'zaq', 'xsw', 'cde', 'vfr', 'bgt', 'qa', 'ws', 'ed', 'rf', 'tg', 'az', 'sx', 'dc', 'fv', 'gb', 'pa', 'pe', 'ga', 'go', 'que', 'las', 'los', 'tu'],
    minAccuracy: 0.80, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.5 — Mano derecha
  // Recorrido columnas mano derecha.
  // REINFORCEMENT: H and K with right hand
  {
    id: 'L5', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 5,
    title: 'Mano Derecha',
    objective: 'Columnas verticales solo con mano derecha.',
    targetUnitKind: 'home_row',
    content: ['yhn', 'ujm', 'ik', 'ol', 'p;', 'nhy', 'mju', 'ki', 'lo', ';p', 'yh', 'uj', 'ik', 'ol', 'hn', 'jm', 'yhnuj', 'ikolp', 'ha', 'he', 'hi', 'ki', 'ko', 'ku', 'kilo', 'hola'],
    minAccuracy: 0.80, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.6 — Arriba / centro / abajo
  // Movimiento por columnas cruzando filas.
  // REINFORCEMENT: P/G/H/K in vertical patterns
  {
    id: 'L6', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 6,
    title: 'Recorridos Guiados',
    objective: 'Subí, bajá, volvé al centro. Recorridos verticales.',
    targetUnitKind: 'home_row',
    content: ['qas', 'wsd', 'edf', 'rfv', 'yhn', 'ujm', 'qaz', 'wsx', 'edc', 'saq', 'dsw', 'fde', 'vfr', 'nhy', 'mju', 'zaq', 'xsw', 'cde', 'aqz', 'swx', 'dec', 'pag', 'hog', 'kap', 'gol', 'hal', 'que', 'las', 'por'],
    minAccuracy: 0.82, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.7 — Espejo / alternancia izquierda-derecha
  // Simetría entre manos.
  // REINFORCEMENT: P/G/H/K mirror patterns
  {
    id: 'L7', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 7,
    title: 'Espejo',
    objective: 'Alternancia izquierda-derecha. Simetría entre manos.',
    targetUnitKind: 'home_row',
    content: ['fj', 'dk', 'sl', 'a;', 'fjdk', 'sla;', 'fjfj', 'dkdk', 'slsl', 'jf', 'kd', 'ls', ';a', 'dkfj', ';asl', 'jfjf', 'kdkd', 'lsls', 'fjsl', 'dka;', 'sldk', 'a;fj', 'pg', 'hk', 'ph', 'gk', 'hp', 'kg', 'que', 'las', 'los'],
    minAccuracy: 0.83, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.8 — Random simple
  // Combinaciones ya aprendidas (no caótico). Patrones reconocibles.
  // REINFORCEMENT: P/G/H/K + frequent vocabulary
  {
    id: 'L8', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 8,
    title: 'Mezcla Guiada',
    objective: 'Combinaciones de todo lo aprendido. Sin caos, con lógica.',
    targetUnitKind: 'home_row',
    content: ['asdf', 'qwer', 'zxcv', 'jkl;', 'tyui', 'bnm', 'qaz', 'wsx', 'fj', 'dk', 'fdsa', ';lkj', 'rewq', 'vcxz', 'iuyt', 'mnb', 'zaq', 'xsw', 'sl', 'a;', 'edc', 'rfv', 'yhn', 'ujm', 'fjdk', 'sla;', 'pato', 'gato', 'hola', 'kilo', 'papa', 'mama', 'que', 'las', 'los', 'tu', 'por', 'para'],
    minAccuracy: 0.84, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.9 — Velocidad
  // Mismo contenido ya dominado, más ritmo, más presión.
  // REINFORCEMENT: P/G/H/K under pressure
  {
    id: 'L9', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 9,
    title: 'Velocidad',
    objective: 'Todo lo que sabés, pero más rápido. Ritmo sostenido.',
    targetUnitKind: 'home_row',
    content: ['asdf', 'jkl;', 'qwer', 'zxcv', 'fj', 'dk', 'sl', 'a;', 'qaz', 'yhn', 'fjdk', 'sla;', 'fdsa', ';lkj', 'rewq', 'vcxz', 'ujm', 'edc', 'rfv', 'wsx', 'tgb', 'ik', 'ol', 'p;', 'dkfj', ';asl', 'mnb', 'tyui', 'pato', 'gato', 'hola', 'kilo', 'papa', 'tapa', 'soga', 'hogar', 'kiosco', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.86, minInputs: 75,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.10 — Mastery motriz
  // Mezcla de filas, manos y patrones. Cierre del mapa del teclado.
  // REINFORCEMENT: Full P/G/H/K integration + frequent vocabulary
  {
    id: 'L10', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 10,
    title: 'Mastery Motriz',
    objective: 'Todo el teclado. Precisión alta. Cierre del mapa.',
    targetUnitKind: 'home_row',
    content: ['qaz', 'wsx', 'edc', 'rfv', 'tgb', 'yhn', 'ujm', 'ik', 'ol', 'p;', 'asdf', 'jkl;', 'qwer', 'zxcv', 'fjdk', 'sla;', 'zaq', 'xsw', 'cde', 'vfr', 'bgt', 'nhy', 'mju', 'ki', 'lo', ';p', 'fdsa', ';lkj', 'rewq', 'vcxz', 'dkfj', ';asl', 'tyui', 'bnm', 'pato', 'gato', 'hola', 'kilo', 'papa', 'tapa', 'soga', 'hogar', 'kiosco', 'koala', 'kayak', 'que', 'las', 'los', 'tu', 'por', 'para', 'con', 'sin', 'del'],
    minAccuracy: 0.88, minInputs: 85,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // ═══════════════════════════════════════════════════════════════════════
  // F2 — LLUVIA DE HOJAS (L11–L20)
  //   Objetivo humano: reacción y escritura bajo presión.
  //   Mecánica: falling — unidad cae, tipeá antes de perderla.
  //   Progresión: 1 letra → 2 letras → 3 → 4 → 5 → velocidad →
  //               simultaneidad → enemigo → combo → mastery.
  //   Gate: completar L13 desbloquea F3.
  // ═══════════════════════════════════════════════════════════════════════

  // F2.1 — Lluvia de 1 letra (lentas, pocas)
  // REINFORCEMENT: P/G/H/K weighted higher than other letters
  {
    id: 'L11', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 1,
    title: 'Una Hoja',
    objective: 'Una letra cae lento. Tipeala antes de tocar el suelo.',
    targetUnitKind: 'letter',
    content: ['p', 'p', 'p', 'g', 'g', 'h', 'h', 'k', 'a', 's', 'd', 'f', 'j', 'k', 'l', 'e', 'i', 'o', 'n', 'r', 't', 'q', 'w', 'u', 'z', 'x', 'c', 'v', 'b', 'm', 'y'],
    minAccuracy: 0.80, minInputs: 40,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 8
  },

  // F2.2 — Lluvia de 2 letras (bigramas)
  // REINFORCEMENT: PA/PE/PI/PO, GA/GO/GE/GI, HA/HE/HO, KA/KE/KI/KO
  {
    id: 'L12', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 2,
    title: 'Pares',
    objective: 'Bigramas cayendo. Dos letras, un golpe.',
    targetUnitKind: 'bigram',
    content: ['pa', 'pe', 'pi', 'po', 'pu', 'ga', 'go', 'ge', 'gi', 'ha', 'he', 'hi', 'ho', 'ka', 'ke', 'ki', 'ko', 'la', 'mi', 'tu', 'ca', 'de', 'no', 'si', 'el', 'un', 'lo', 'me', 'te', 'su', 'ni', 'va', 'di', 'co', 'ra', 'vo', 'se', 'en', 'es', 'al', 'que', 'las', 'los'],
    minAccuracy: 0.80, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 7.5
  },

  // F2.3 — Lluvia de 3 letras
  // REINFORCEMENT: Words with P/G/H/K
  {
    id: 'L13', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 3,
    title: 'Tríos',
    objective: 'Tres letras cayendo. Más rápido, más ritmo.',
    targetUnitKind: 'sequence',
    content: ['pan', 'pez', 'piso', 'palo', 'papa', 'tapa', 'sopa', 'gato', 'goma', 'gola', 'hola', 'hilo', 'hueso', 'kilo', 'kiosco', 'sol', 'rio', 'mar', 'luz', 'sal', 'fin', 'red', 'ojo', 'pie', 'oro', 'dos', 'mes', 'rey', 'ley', 'sur', 'voz', 'ver', 'ser', 'dar', 'tos', 'gas', 'col', 'miel', 'sed', 'hoy', 'ven', 'don'],
    minAccuracy: 0.80, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 7
    // ← Completar L13 desbloquea F3
  },

  // F2.4 — Lluvia de 4 letras
  // REINFORCEMENT: P/G/H/K words prominent
  {
    id: 'L14', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 4,
    title: 'Cuartetos',
    objective: 'Palabras de 4 letras cayendo.',
    targetUnitKind: 'word_build',
    content: ['pato', 'papa', 'tapa', 'sopa', 'piso', 'palo', 'peine', 'gato', 'goma', 'gota', 'gorra', 'hola', 'higo', 'hueso', 'kilo', 'kayak', 'casa', 'luna', 'mesa', 'dato', 'vida', 'mano', 'ruta', 'nube', 'flor', 'plan', 'nota', 'idea', 'paso', 'meta', 'cama', 'dama', 'lago', 'rama', 'hoja', 'tela', 'isla', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.82, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 6.5
  },

  // F2.5 — Lluvia de 5 letras
  // REINFORCEMENT: P/G/H/K 5-letter words
  {
    id: 'L15', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 5,
    title: 'Cinco Hojas',
    objective: 'Palabras de 5 letras. Más largo, más recompensa.',
    targetUnitKind: 'word_build',
    content: ['papas', 'pasos', 'pintas', 'pesas', 'gatos', 'gomas', 'gotas', 'horas', 'hilos', 'kilos', 'manos', 'notas', 'ideas', 'datos', 'rutas', 'nubes', 'luces', 'metas', 'casas', 'lunas', 'mesas', 'vidas', 'hojas', 'telas', 'gatos', 'lagos', 'islas', 'colas', 'ramas', 'pisos', 'rocas', 'leyes', 'voces', 'que', 'las', 'los', 'por', 'para'],
    minAccuracy: 0.82, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 6
  },

  // F2.6 — Más velocidad
  // REINFORCEMENT: P/G/H/K under speed pressure
  {
    id: 'L16', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 6,
    title: 'Brisa Rápida',
    objective: 'Lo mismo que sabés, pero caen más rápido.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'hola', 'kilo', 'papa', 'tapa', 'sopa', 'goma', 'hilo', 'kayak', 'casa', 'luna', 'sol', 'pan', 'mano', 'idea', 'dato', 'nota', 'paso', 'nube', 'flor', 'lago', 'isla', 'roca', 'meta', 'plan', 'cama', 'vida', 'hoja', 'tela', 'rama', 'cola', 'palo', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.82, minInputs: 70,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 4.5
  },

  // F2.7 — Más simultaneidad (más unidades en pantalla)
  // REINFORCEMENT: P/G/H/K priority targets
  {
    id: 'L17', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 7,
    title: 'Lluvia Densa',
    objective: 'Más hojas al mismo tiempo. Priorizá bien.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'hola', 'kilo', 'papa', 'tapa', 'sopa', 'goma', 'hilo', 'kayak', 'sol', 'rio', 'mar', 'luz', 'casa', 'mesa', 'vida', 'mano', 'dato', 'nota', 'idea', 'paso', 'fin', 'red', 'ojo', 'flor', 'nube', 'plan', 'meta', 'lago', 'isla', 'hoja', 'roca', 'tela', 'rama', 'que', 'las', 'los'],
    minAccuracy: 0.80, minInputs: 75,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 4
  },

  // F2.8 — Enemigo roba una unidad
  // REINFORCEMENT: P/G/H/K words are "stolen" faster
  {
    id: 'L18', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 8,
    title: 'Pájaro Ladrón',
    objective: 'El pájaro roba hojas. Tipeá rápido o las pierde.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'hola', 'kilo', 'papa', 'tapa', 'sopa', 'goma', 'hilo', 'kayak', 'flor', 'nube', 'luna', 'mesa', 'dato', 'plan', 'idea', 'meta', 'paso', 'clave', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'cola', 'piso', 'vela', 'rana', 'boca', 'miel', 'que', 'las', 'por'],
    minAccuracy: 0.80, minInputs: 75,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 3.8
  },

  // F2.9 — Recuperación por combo
  // REINFORCEMENT: P/G/H/K + frequent vocabulary
  {
    id: 'L19', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 9,
    title: 'Combo de Hojas',
    objective: 'Los combos recuperan vidas. Mantené la racha.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'hola', 'kilo', 'papas', 'pasos', 'gatos', 'gom as', 'hilos', 'kilos', 'casa', 'luna', 'vida', 'idea', 'sol', 'luz', 'rutas', 'nubes', 'luces', 'metas', 'hojas', 'telas', 'lagos', 'islas', 'flor', 'roca', 'vela', 'piso', 'sopa', 'que', 'las', 'los', 'por', 'para'],
    minAccuracy: 0.82, minInputs: 80,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 3.5
  },

  // F2.10 — Tormenta mastery
  // REINFORCEMENT: Full P/G/H/K integration + frequent vocabulary
  {
    id: 'L20', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 10,
    title: 'Tormenta',
    objective: 'Todo junto: velocidad, variedad, presión. Mastery.',
    targetUnitKind: 'word_build',
    content: [
      'p', 'g', 'h', 'k', 'pato', 'gato',
      'e', 'mi', 'pan', 'hola', 'kilo',
      'o', 'tu', 'rio', 'mesa', 'papas',
      'i', 'de', 'mar', 'dato', 'pasos',
      'u', 'no', 'luz', 'vida', 'rutas',
      's', 'el', 'fin', 'mano', 'luces',
      'n', 'si', 'red', 'flor', 'metas',
      'que', 'las', 'los', 'por', 'para', 'con'
    ],
    minAccuracy: 0.82, minInputs: 90,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 3
  },

  // ═══════════════════════════════════════════════════════════════════════
  // F3 — SENDERO DE LUZ (L21–L30)
  //   Objetivo humano: secuencia, ritmo y continuidad.
  //   Mecánica: trail — nodos horizontales, se iluminan al tipear.
  //   No debe sentirse como lluvia. Debe sentirse como seguir un camino.
  //   Progresión: secuencias simples → alternadas → verticales →
  //               2 letras → 3 letras → pronunciables → palabras →
  //               medias → largos → mastery.
  //   Gate: completar L23 desbloquea F4.
  // ═══════════════════════════════════════════════════════════════════════

  // F3.1 — Secuencias simples (caminos visibles de fila)
  // REINFORCEMENT: P/G/H/K + frequent vocabulary (QUE, LAS, LOS)
  {
    id: 'L21', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 1,
    title: 'Primer Sendero',
    objective: 'Seguí el camino. Cada nodo se ilumina al tipear.',
    targetUnitKind: 'sequence',
    content: ['asdf', 'jkl;', 'qwer', 'tyui', 'zxcv', 'bnm', 'fdsa', ';lkj', 'rewq', 'iuyt', 'vcxz', 'mnb', 'asd', 'jkl', 'qwe', 'tyu', 'zxc', 'fds', 'lkj', 'wer', 'pato', 'gato', 'hola', 'kilo', 'que', 'las', 'los'],
    minAccuracy: 0.80, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.2 — Secuencias alternadas (izquierda/derecha)
  // REINFORCEMENT: PG/HK mirror patterns + vocabulary
  {
    id: 'L22', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 2,
    title: 'Alternancia',
    objective: 'El sendero alterna entre manos. Izquierda, derecha.',
    targetUnitKind: 'sequence',
    content: ['fjfj', 'dkdk', 'slsl', 'fjdk', 'sla;', 'dksl', 'jfjf', 'kdkd', 'lsls', 'dkfj', ';asl', 'sldk', 'a;fj', 'fjsl', 'dka;', 'jfdk', 'kdfj', 'slfjdk', 'pg', 'hk', 'ph', 'gk', 'pato', 'gato', 'que', 'las', 'por'],
    minAccuracy: 0.82, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.3 — Secuencias verticales (columnas)
  // REINFORCEMENT: Vertical patterns with P/G/H/K
  {
    id: 'L23', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 3,
    title: 'Columnas',
    objective: 'Senderos verticales. Subí y bajá por columnas.',
    targetUnitKind: 'sequence',
    content: ['qaz', 'wsx', 'edc', 'rfv', 'tgb', 'yhn', 'ujm', 'zaq', 'xsw', 'cde', 'vfr', 'bgt', 'nhy', 'mju', 'qa', 'ws', 'ed', 'rf', 'yh', 'uj', 'ik', 'ol', 'pag', 'hog', 'kap', 'kilo', 'hola', 'gato', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.82, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
    // ← Completar L23 desbloquea F4
  },

  // F3.4 — Secuencias de 2 letras
  // REINFORCEMENT: PA/PE/PI/PO, GA/GO/GE/GI, HA/HE/HO, KA/KE/KI/KO
  {
    id: 'L24', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 4,
    title: 'Pares de Luz',
    objective: 'Bigramas en el sendero. Dos nodos por unidad.',
    targetUnitKind: 'bigram',
    content: ['pa', 'pe', 'pi', 'po', 'pu', 'ga', 'go', 'ge', 'gi', 'gu', 'ha', 'he', 'hi', 'ho', 'hu', 'ka', 'ke', 'ki', 'ko', 'ku', 'la', 'mi', 'tu', 'ca', 'de', 'no', 'si', 'el', 'un', 'lo', 'me', 'te', 'su', 'ni', 'va', 'di', 'co', 'ra', 'vo', 'se', 'en', 'es', 'al', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.82, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.5 — Secuencias de 3 letras
  // REINFORCEMENT: Words with P/G/H/K prominent
  {
    id: 'L25', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 5,
    title: 'Tríos de Luz',
    objective: 'Tres nodos por unidad. El sendero se alarga.',
    targetUnitKind: 'sequence',
    content: ['pan', 'pez', 'palo', 'papa', 'tapa', 'sopa', 'gato', 'goma', 'gota', 'hola', 'hilo', 'higo', 'kilo', 'kayak', 'sol', 'rio', 'mar', 'luz', 'sal', 'fin', 'red', 'ojo', 'pie', 'oro', 'dos', 'mes', 'rey', 'ley', 'sur', 'voz', 'ver', 'ser', 'dar', 'tos', 'gas', 'col', 'miel', 'sed', 'hoy', 'ven', 'don', 'que', 'las', 'los'],
    minAccuracy: 0.83, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.6 — Secuencias pronunciables
  // REINFORCEMENT: PA/PE/PI/PO, GA/GO, HA/HE/HO phonetic patterns
  {
    id: 'L26', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 6,
    title: 'Sendero Fonético',
    objective: 'Secuencias que se pueden pronunciar. Sentí el ritmo.',
    targetUnitKind: 'bigram',
    content: ['pa', 'pe', 'pi', 'po', 'pu', 'ga', 'go', 'ge', 'gi', 'gu', 'ha', 'he', 'hi', 'ho', 'hu', 'ka', 'ke', 'ki', 'ko', 'ku', 'ta', 'ma', 'na', 'ra', 'sa', 'la', 'da', 'fa', 'va', 'to', 'co', 'ro', 'mo', 'no', 'lo', 'do', 'ti', 'mi', 'ni', 'li', 'di', 'ri', 'si', 'te', 'me', 'ne', 'le', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.83, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.7 — Palabras cortas en sendero
  // REINFORCEMENT: P/G/H/K words + frequent vocabulary
  {
    id: 'L27', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 7,
    title: 'Camino de Palabras',
    objective: 'Palabras cortas iluminan el sendero.',
    targetUnitKind: 'word_build',
    content: ['pato', 'papa', 'tapa', 'sopa', 'piso', 'palo', 'gato', 'goma', 'gota', 'hola', 'hilo', 'higo', 'kilo', 'kayak', 'casa', 'luna', 'mesa', 'dato', 'vida', 'mano', 'ruta', 'nube', 'flor', 'plan', 'nota', 'idea', 'paso', 'meta', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'vela', 'boca', 'que', 'las', 'los', 'tu', 'por', 'para'],
    minAccuracy: 0.83, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.8 — Palabras medias
  // REINFORCEMENT: P/G/H/K in longer words
  {
    id: 'L28', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 8,
    title: 'Sendero Largo',
    objective: 'Palabras más largas. El sendero crece.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'hola', 'kilo', 'papas', 'gatos', 'hilos', 'kilos', 'camino', 'puente', 'destino', 'ventana', 'naranja', 'teclado', 'sendero', 'estrella', 'latidos', 'palabra', 'rescate', 'bosque', 'jardin', 'piedra', 'ritmo', 'noche', 'fuente', 'colina', 'brillo', 'que', 'las', 'los', 'por', 'para', 'con'],
    minAccuracy: 0.84, minInputs: 70,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.9 — Patrones largos
  // REINFORCEMENT: P/G/H/K in long patterns + vocabulary
  {
    id: 'L29', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 9,
    title: 'Sendero Extendido',
    objective: 'Secuencias largas. Mantené el ritmo todo el camino.',
    targetUnitKind: 'word_build',
    content: ['memoria', 'latidos', 'palabra', 'rescate', 'constante', 'precision', 'horizonte', 'aventura', 'universo', 'santuario', 'sendero', 'estrella', 'brillante', 'sincero', 'corriente', 'esfuerzo', 'comienzo', 'pato', 'gato', 'hola', 'kilo', 'que', 'las', 'los', 'por', 'para', 'con', 'sin'],
    minAccuracy: 0.84, minInputs: 75,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.10 — Mastery de ritmo
  // REINFORCEMENT: Full P/G/H/K integration + all frequent vocabulary
  {
    id: 'L30', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 10,
    title: 'Mastery de Ritmo',
    objective: 'Mezcla de todo: patrones, sílabas, palabras. Ritmo puro.',
    targetUnitKind: 'word_build',
    content: ['fj', 'sol', 'casa', 'camino', 'memoria', 'dk', 'pan', 'luna', 'puente', 'teclado', 'sl', 'mar', 'dato', 'sendero', 'latidos', 'a;', 'luz', 'vida', 'estrella', 'aventura', 'rio', 'nota', 'destino', 'horizonte', 'pato', 'gato', 'hola', 'kilo', 'papas', 'gatos', 'hilos', 'que', 'las', 'los', 'tu', 'por', 'para', 'con', 'sin', 'del', 'de'],
    minAccuracy: 0.85, minInputs: 80,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // ═══════════════════════════════════════════════════════════════════════
  // F4 — RESCATE EN EL RÍO (L31–L40)
  //   Objetivo humano: construcción bajo presión.
  //   Mecánica: rescue — unidad flota horizontal (derecha→izquierda).
  //   La gracia no es solo tipear rápido, es armar algo correcto antes
  //   de perderlo.
  //   Progresión: sílabas → pares útiles → 3 letras → palabra corta →
  //               media → variantes → distractores → velocidad →
  //               corriente fuerte → mastery.
  //   Gate: completar L33 desbloquea F5.
  // ═══════════════════════════════════════════════════════════════════════

  // F4.1 — Rescate de sílabas
  // REINFORCEMENT: PA/PE/PI/PO, GA/GO/GE/GI, HA/HE/HO, KA/KE/KI/KO
  {
    id: 'L31', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 1,
    title: 'Sílabas en el Río',
    objective: 'Sílabas simples flotando. Rescatalas a tiempo.',
    targetUnitKind: 'bigram',
    content: ['pa', 'pe', 'pi', 'po', 'pu', 'ga', 'go', 'ge', 'gi', 'gu', 'ha', 'he', 'hi', 'ho', 'hu', 'ka', 'ke', 'ki', 'ko', 'ku', 'la', 'mi', 'tu', 'ca', 'de', 'no', 'si', 'el', 'un', 'lo', 'me', 'te', 'su', 'ni', 'va', 'di', 'co', 'ra', 'se', 'en', 'es', 'al', 'que', 'las', 'los'],
    minAccuracy: 0.78, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 9
  },

  // F4.2 — Rescate de pares útiles
  // REINFORCEMENT: P/G/H/K pairs prominent
  {
    id: 'L32', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 2,
    title: 'Pares Útiles',
    objective: 'Bigramas con sentido. Más largo, más recompensa.',
    targetUnitKind: 'bigram',
    content: ['pa', 'pe', 'pi', 'po', 'ga', 'go', 'ge', 'gi', 'ha', 'he', 'ho', 'ka', 'ke', 'ki', 'ko', 'me', 'te', 'su', 'ra', 'vo', 'ni', 'sa', 'di', 'ma', 'co', 'le', 'da', 'se', 'en', 'al', 'os', 'as', 'es', 'do', 'ta', 'na', 'fa', 've', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.80, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 8.5
  },

  // F4.3 — Rescate de 3 letras
  // REINFORCEMENT: Words with P/G/H/K
  {
    id: 'L33', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 3,
    title: 'Tríos en el Río',
    objective: 'Tres letras flotando. Rescatá antes de perderlas.',
    targetUnitKind: 'sequence',
    content: ['pan', 'pez', 'palo', 'papa', 'tapa', 'sopa', 'gato', 'goma', 'gota', 'hola', 'hilo', 'higo', 'kilo', 'kayak', 'sol', 'rio', 'mar', 'luz', 'sal', 'fin', 'red', 'ojo', 'pie', 'oro', 'dos', 'mes', 'rey', 'ley', 'sur', 'voz', 'ver', 'ser', 'dar', 'tos', 'gas', 'col', 'miel', 'sed', 'hoy', 'ven', 'don', 'que', 'las', 'los'],
    minAccuracy: 0.80, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 8
    // ← Completar L33 desbloquea F5
  },

  // F4.4 — Construcción de palabra corta
  // REINFORCEMENT: P/G/H/K 4-letter words
  {
    id: 'L34', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 4,
    title: 'Palabras Cortas',
    objective: 'Palabras de 4 letras flotando en el río.',
    targetUnitKind: 'word_build',
    content: ['pato', 'papa', 'tapa', 'sopa', 'piso', 'palo', 'peine', 'gato', 'goma', 'gota', 'gorra', 'hola', 'higo', 'hueso', 'kilo', 'kayak', 'casa', 'luna', 'mesa', 'dato', 'vida', 'mano', 'ruta', 'nube', 'flor', 'plan', 'nota', 'idea', 'paso', 'meta', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'vela', 'boca', 'que', 'las', 'los', 'tu', 'por'],
    minAccuracy: 0.82, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 7.5
  },

  // F4.5 — Construcción de palabra media
  // REINFORCEMENT: P/G/H/K in longer words + vocabulary
  {
    id: 'L35', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 5,
    title: 'Palabras Medias',
    objective: 'Palabras más largas. El río no espera.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'hola', 'kilo', 'papas', 'gatos', 'hilos', 'kilos', 'camino', 'puente', 'destino', 'ventana', 'naranja', 'teclado', 'memoria', 'sendero', 'estrella', 'latidos', 'palabra', 'rescate', 'bosque', 'jardin', 'piedra', 'fuente', 'colina', 'brillo', 'que', 'las', 'los', 'por', 'para', 'con'],
    minAccuracy: 0.82, minInputs: 70,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 7
  },

  // F4.6 — Variantes válidas
  // REINFORCEMENT: P/G/H/K minimal pairs
  {
    id: 'L36', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 6,
    title: 'Variantes',
    objective: 'Palabras similares. Cuidado con confundirlas.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'paso', 'palo', 'papa', 'tapa', 'sopa', 'goma', 'hola', 'hilo', 'kilo', 'mesa', 'meta', 'mano', 'mapa', 'dato', 'dama', 'casa', 'cama', 'nota', 'nube', 'ruta', 'rana', 'vela', 'vida', 'cola', 'cosa', 'boca', 'bola', 'isla', 'idea', 'sopa', 'sala', 'tela', 'tema', 'que', 'las', 'por'],
    minAccuracy: 0.83, minInputs: 70,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 6.5
  },

  // F4.7 — Distractores
  // REINFORCEMENT: P/G/H/K priority targets under pressure
  {
    id: 'L37', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 7,
    title: 'Corriente Cruzada',
    objective: 'Más unidades, más presión. Elegí bien.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'hola', 'kilo', 'papa', 'tapa', 'sopa', 'goma', 'hilo', 'kayak', 'nota', 'nube', 'idea', 'paso', 'clave', 'dato', 'plan', 'meta', 'vida', 'ruta', 'mano', 'flor', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'vela', 'boca', 'piso', 'luna', 'mesa', 'casa', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.82, minInputs: 75,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 5.5
  },

  // F4.8 — Más velocidad
  // REINFORCEMENT: P/G/H/K under speed pressure
  {
    id: 'L38', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 8,
    title: 'Rápidos',
    objective: 'Río rápido. Sin margen de error.',
    targetUnitKind: 'word_build',
    content: ['pato', 'gato', 'hola', 'kilo', 'papas', 'gatos', 'hilos', 'kilos', 'camino', 'puente', 'rescate', 'ventana', 'destino', 'memoria', 'teclado', 'latidos', 'sendero', 'estrella', 'bosque', 'jardin', 'piedra', 'fuente', 'colina', 'brillo', 'naranja', 'palabra', 'que', 'las', 'los', 'por', 'para'],
    minAccuracy: 0.82, minInputs: 80,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 4.5
  },

  // F4.9 — Corriente fuerte
  // REINFORCEMENT: Long words with P/G/H/K
  {
    id: 'L39', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 9,
    title: 'Corriente Fuerte',
    objective: 'Construcciones largas a máxima velocidad.',
    targetUnitKind: 'word_build',
    content: ['aprendizaje', 'santuario', 'precision', 'constante', 'brillante', 'sincero', 'horizonte', 'aventura', 'universo', 'corriente', 'esfuerzo', 'comienzo', 'estructura', 'naturaleza', 'movimiento', 'equilibrio', 'pato', 'gato', 'hola', 'kilo', 'que', 'las', 'los', 'por'],
    minAccuracy: 0.82, minInputs: 85,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 4
  },

  // F4.10 — Mastery de construcción
  // REINFORCEMENT: Full P/G/H/K + all frequent vocabulary
  {
    id: 'L40', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 10,
    title: 'Mastery del Río',
    objective: 'Todo junto: sílabas, palabras, construcciones. Río maestro.',
    targetUnitKind: 'word_build',
    content: ['pa', 'sol', 'casa', 'camino', 'memoria', 'mi', 'pan', 'luna', 'puente', 'precision', 'de', 'mar', 'dato', 'sendero', 'aventura', 'el', 'luz', 'vida', 'destino', 'universo', 'tu', 'rio', 'flor', 'estrella', 'horizonte', 'pato', 'gato', 'hola', 'kilo', 'papas', 'gatos', 'hilos', 'que', 'las', 'los', 'por', 'para', 'con', 'sin', 'del'],
    minAccuracy: 0.84, minInputs: 90,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 3.5
  },

  // ═══════════════════════════════════════════════════════════════════════
  // F5 — JARDÍN DE PALABRAS (L41–L50)
  //   Objetivo humano: palabras, frases y sentido.
  //   Mecánica: garden — planta crece con cada caracter correcto.
  //   Acá empieza el puente real hacia el sistema.
  //   No es solo longitud — tiene que aparecer significado.
  //   Progresión: palabras útiles → frecuentes → largas → frases de 2 →
  //               frases de 3 → paralelas → útiles → con intención →
  //               asociación simple → mastery.
  // ═══════════════════════════════════════════════════════════════════════

  // F5.1 — Palabras útiles
  {
    id: 'L41', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 1,
    title: 'Semillas',
    objective: 'Palabras útiles. Cada letra hace crecer la planta.',
    targetUnitKind: 'word_build',
    content: ['casa', 'vida', 'mesa', 'dato', 'nota', 'plan', 'idea', 'meta', 'paso', 'clave', 'gato', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'vela', 'sopa', 'rana', 'boca', 'piso', 'luna', 'flor', 'nube'],
    minAccuracy: 0.80, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.2 — Palabras frecuentes
  {
    id: 'L42', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 2,
    title: 'Brotes',
    objective: 'Palabras que usamos todos los días.',
    targetUnitKind: 'word_build',
    content: ['bueno', 'nuevo', 'mejor', 'mismo', 'mucho', 'donde', 'ahora', 'antes', 'luego', 'nunca', 'siempre', 'pronto', 'cerca', 'lejos', 'fuera', 'junto', 'claro', 'justo', 'lento', 'suave'],
    minAccuracy: 0.82, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.3 — Palabras más largas
  {
    id: 'L43', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 3,
    title: 'Raíces',
    objective: 'Palabras más largas. La planta crece más.',
    targetUnitKind: 'word_build',
    content: ['camino', 'puente', 'destino', 'memoria', 'ventana', 'teclado', 'naranja', 'sendero', 'estrella', 'latidos', 'palabra', 'rescate', 'bosque', 'jardin', 'piedra', 'fuente', 'colina', 'brillo', 'ritmo', 'noche'],
    minAccuracy: 0.82, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.4 — Frases de 2 palabras
  {
    id: 'L44', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 4,
    title: 'Dos Ramas',
    objective: 'Frases de dos palabras. Espacios incluidos.',
    targetUnitKind: 'word_build',
    content: ['mi casa', 'tu vida', 'su meta', 'mi plan', 'una idea', 'un paso', 'la clave', 'el dato', 'mi nota', 'tu ruta', 'su flor', 'un gato', 'la luna', 'el lago', 'mi isla', 'tu mano', 'un plan', 'la mesa', 'el piso', 'su rama'],
    minAccuracy: 0.82, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.5 — Frases de 3 palabras
  {
    id: 'L45', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 5,
    title: 'Tres Ramas',
    objective: 'Frases de tres palabras. La planta florece.',
    targetUnitKind: 'word_build',
    content: ['mi nueva casa', 'tu mejor idea', 'su primer paso', 'un buen plan', 'la misma meta', 'una gran vida', 'el mejor dato', 'mi propia ruta', 'tu nueva nota', 'su clara idea', 'un largo camino', 'la misma luna', 'el primer brillo'],
    minAccuracy: 0.82, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.6 — Frases paralelas
  {
    id: 'L46', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 6,
    title: 'Frases Paralelas',
    objective: 'Frases con estructura similar. Sentí el patrón.',
    targetUnitKind: 'word_build',
    content: [
      'busco mi camino', 'sigo mi destino', 'elijo mi rumbo',
      'abro una puerta', 'cierro una etapa', 'creo una idea',
      'tomo mi tiempo', 'dejo una huella', 'planto una semilla',
      'miro el sendero', 'siento el ritmo', 'guardo mi fuerza',
      'cuido mi jardin', 'sigo el impulso', 'hago mi parte'
    ],
    minAccuracy: 0.83, minInputs: 70,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.7 — Frases útiles
  {
    id: 'L47', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 7,
    title: 'Frases Útiles',
    objective: 'Frases que podrías escribir en el día a día.',
    targetUnitKind: 'word_build',
    content: [
      'tomar una nota', 'guardar un dato', 'hacer un plan',
      'seguir el paso', 'buscar la clave', 'abrir la puerta',
      'cerrar la tapa', 'mover la mesa', 'leer una idea',
      'poner la meta', 'sacar la foto', 'dar un abrazo',
      'ver el camino', 'ser mas claro', 'ir con calma'
    ],
    minAccuracy: 0.83, minInputs: 75,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.8 — Frases con intención
  {
    id: 'L48', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 8,
    title: 'Frases con Intención',
    objective: 'Frases que significan algo. Cada palabra importa.',
    targetUnitKind: 'word_build',
    content: [
      'escribo sin mirar', 'mantengo el ritmo', 'cada tecla cuenta',
      'mi memoria mejora', 'juego con enfoque', 'confio en mis manos',
      'no miro el teclado', 'sigo sin parar', 'mejoro cada dia',
      'mis dedos recuerdan', 'el ritmo me guia', 'practico y avanzo',
      'la constancia suma', 'todo tiene sentido', 'no me detengo'
    ],
    minAccuracy: 0.84, minInputs: 80,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.9 — Asociación simple entre frases
  {
    id: 'L49', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 9,
    title: 'Asociaciones',
    objective: 'Frases que se conectan entre sí. Puente al sistema.',
    targetUnitKind: 'word_build',
    content: [
      'tengo una idea', 'la idea es buena',
      'hago un plan', 'el plan funciona',
      'doy un paso', 'el paso me acerca',
      'busco una clave', 'la clave aparece',
      'planto una semilla', 'la semilla crece',
      'abro un camino', 'el camino me lleva',
      'elijo una meta', 'la meta me mueve'
    ],
    minAccuracy: 0.84, minInputs: 85,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  },

  // F5.10 — Mastery de frase
  {
    id: 'L50', familyId: 5, familyTitle: 'Jardín de Palabras', sublevel: 10,
    title: 'Santuario',
    objective: 'Todo junto. Palabras, frases, intención. Jardín maestro.',
    targetUnitKind: 'word_build',
    content: [
      'casa', 'mi nueva casa', 'busco mi camino',
      'idea', 'una buena idea', 'escribo sin mirar',
      'paso', 'el primer paso', 'cada tecla cuenta',
      'vida', 'tu mejor vida', 'mantengo el ritmo',
      'meta', 'la misma meta', 'confio en mis manos',
      'luna', 'una clara luna', 'mi memoria mejora',
      'plan', 'un buen plan', 'sigo sin parar'
    ],
    minAccuracy: 0.86, minInputs: 95,
    backgroundUrl: '/src/assets/backgrounds/l5-garden.svg',
    colorTheme: 'rose', mechanic: 'garden'
  }
];
