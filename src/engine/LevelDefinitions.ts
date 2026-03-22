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
  {
    id: 'L1', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 1,
    title: 'Fila Central',
    objective: 'Ubicá los dedos en la fila central. F y J son tus anclas.',
    targetUnitKind: 'home_row',
    content: ['f', 'j', 'f', 'j', 'fj', 'jf', 'ff', 'jj', 'fjf', 'jfj', 'df', 'jk', 'fd', 'kj', 'sd', 'lk', 'asdf', 'jkl;', 'fdsa', ';lkj', 'fds', 'jkl', 'asd', 'fj', 'dk', 'sl'],
    minAccuracy: 0.80, minInputs: 40,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.2 — Fila superior
  // Resaltar fila superior, dedos correctos.
  {
    id: 'L2', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 2,
    title: 'Fila Superior',
    objective: 'Subí a la fila de arriba sin perder las anclas.',
    targetUnitKind: 'home_row',
    content: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'qw', 'we', 'er', 'rt', 'ty', 'yu', 'ui', 'io', 'op', 'qwer', 'tyui', 'wert', 'yuio', 'qwe', 'rty', 'uio', 'rew', 'poi'],
    minAccuracy: 0.78, minInputs: 40,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.3 — Fila inferior
  // Resaltar fila inferior, dedos correctos.
  {
    id: 'L3', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 3,
    title: 'Fila Inferior',
    objective: 'Bajá a la fila inferior con control.',
    targetUnitKind: 'home_row',
    content: ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'zx', 'xc', 'cv', 'vb', 'bn', 'nm', 'zxc', 'cvb', 'bnm', 'zxcv', 'vbnm', 'xcv', 'bnm', 'zxcvb', 'mnb', 'vcx'],
    minAccuracy: 0.78, minInputs: 35,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
    // ← Completar L3 desbloquea F2
  },

  // F1.4 — Mano izquierda
  // Recorrido columnas mano izquierda.
  {
    id: 'L4', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 4,
    title: 'Mano Izquierda',
    objective: 'Columnas verticales solo con mano izquierda.',
    targetUnitKind: 'home_row',
    content: ['qaz', 'wsx', 'edc', 'rfv', 'tgb', 'zaq', 'xsw', 'cde', 'vfr', 'bgt', 'qa', 'ws', 'ed', 'rf', 'tg', 'az', 'sx', 'dc', 'fv', 'gb'],
    minAccuracy: 0.80, minInputs: 40,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.5 — Mano derecha
  // Recorrido columnas mano derecha.
  {
    id: 'L5', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 5,
    title: 'Mano Derecha',
    objective: 'Columnas verticales solo con mano derecha.',
    targetUnitKind: 'home_row',
    content: ['yhn', 'ujm', 'ik', 'ol', 'p;', 'nhy', 'mju', 'ki', 'lo', ';p', 'yh', 'uj', 'ik', 'ol', 'hn', 'jm', 'yhnuj', 'ikolp'],
    minAccuracy: 0.80, minInputs: 35,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.6 — Arriba / centro / abajo
  // Movimiento por columnas cruzando filas.
  {
    id: 'L6', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 6,
    title: 'Recorridos Guiados',
    objective: 'Subí, bajá, volvé al centro. Recorridos verticales.',
    targetUnitKind: 'home_row',
    content: ['qas', 'wsd', 'edf', 'rfv', 'yhn', 'ujm', 'qaz', 'wsx', 'edc', 'saq', 'dsw', 'fde', 'vfr', 'nhy', 'mju', 'zaq', 'xsw', 'cde', 'aqz', 'swx', 'dec'],
    minAccuracy: 0.82, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.7 — Espejo / alternancia izquierda-derecha
  // Simetría entre manos.
  {
    id: 'L7', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 7,
    title: 'Espejo',
    objective: 'Alternancia izquierda-derecha. Simetría entre manos.',
    targetUnitKind: 'home_row',
    content: ['fj', 'dk', 'sl', 'a;', 'fjdk', 'sla;', 'fjfj', 'dkdk', 'slsl', 'jf', 'kd', 'ls', ';a', 'dkfj', ';asl', 'jfjf', 'kdkd', 'lsls', 'fjsl', 'dka;', 'sldk', 'a;fj'],
    minAccuracy: 0.83, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.8 — Random simple
  // Combinaciones ya aprendidas (no caótico). Patrones reconocibles.
  {
    id: 'L8', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 8,
    title: 'Mezcla Guiada',
    objective: 'Combinaciones de todo lo aprendido. Sin caos, con lógica.',
    targetUnitKind: 'home_row',
    content: ['asdf', 'qwer', 'zxcv', 'jkl;', 'tyui', 'bnm', 'qaz', 'wsx', 'fj', 'dk', 'fdsa', ';lkj', 'rewq', 'vcxz', 'iuyt', 'mnb', 'zaq', 'xsw', 'sl', 'a;', 'edc', 'rfv', 'yhn', 'ujm', 'fjdk', 'sla;'],
    minAccuracy: 0.84, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.9 — Velocidad
  // Mismo contenido ya dominado, más ritmo, más presión.
  {
    id: 'L9', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 9,
    title: 'Velocidad',
    objective: 'Todo lo que sabés, pero más rápido. Ritmo sostenido.',
    targetUnitKind: 'home_row',
    content: ['asdf', 'jkl;', 'qwer', 'zxcv', 'fj', 'dk', 'sl', 'a;', 'qaz', 'yhn', 'fjdk', 'sla;', 'fdsa', ';lkj', 'rewq', 'vcxz', 'ujm', 'edc', 'rfv', 'wsx', 'tgb', 'ik', 'ol', 'p;', 'dkfj', ';asl', 'mnb', 'tyui'],
    minAccuracy: 0.86, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l1-nest.svg',
    colorTheme: 'emerald', mechanic: 'tutorial'
  },

  // F1.10 — Mastery motriz
  // Mezcla de filas, manos y patrones. Cierre del mapa del teclado.
  {
    id: 'L10', familyId: 1, familyTitle: 'Nido de Inicio', sublevel: 10,
    title: 'Mastery Motriz',
    objective: 'Todo el teclado. Precisión alta. Cierre del mapa.',
    targetUnitKind: 'home_row',
    content: ['qaz', 'wsx', 'edc', 'rfv', 'tgb', 'yhn', 'ujm', 'ik', 'ol', 'p;', 'asdf', 'jkl;', 'qwer', 'zxcv', 'fjdk', 'sla;', 'zaq', 'xsw', 'cde', 'vfr', 'bgt', 'nhy', 'mju', 'ki', 'lo', ';p', 'fdsa', ';lkj', 'rewq', 'vcxz', 'dkfj', ';asl', 'tyui', 'bnm'],
    minAccuracy: 0.88, minInputs: 75,
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
  {
    id: 'L11', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 1,
    title: 'Una Hoja',
    objective: 'Una letra cae lento. Tipeala antes de tocar el suelo.',
    targetUnitKind: 'letter',
    content: ['a', 's', 'd', 'f', 'j', 'k', 'l', 'e', 'i', 'o', 'n', 'r', 't', 'q', 'w', 'u', 'p', 'g', 'h', 'z', 'x', 'c', 'v', 'b', 'm', 'y'],
    minAccuracy: 0.80, minInputs: 35,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 8
  },

  // F2.2 — Lluvia de 2 letras (bigramas)
  {
    id: 'L12', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 2,
    title: 'Pares',
    objective: 'Bigramas cayendo. Dos letras, un golpe.',
    targetUnitKind: 'bigram',
    content: ['la', 'mi', 'tu', 'ca', 'de', 'no', 'si', 'el', 'un', 'lo', 'me', 'pa', 'te', 'su', 'ni', 'va', 'di', 'co', 'ra', 'vo', 'se', 'en', 'es', 'al', 'os', 'as', 'le', 'da', 'ha', 'ma'],
    minAccuracy: 0.80, minInputs: 40,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 7.5
  },

  // F2.3 — Lluvia de 3 letras
  {
    id: 'L13', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 3,
    title: 'Tríos',
    objective: 'Tres letras cayendo. Más rápido, más ritmo.',
    targetUnitKind: 'sequence',
    content: ['sol', 'pan', 'rio', 'mar', 'luz', 'sal', 'fin', 'red', 'ojo', 'pie', 'oro', 'dos', 'mes', 'rey', 'ley', 'sur', 'voz', 'ver', 'ser', 'dar', 'tos', 'gas', 'col', 'miel', 'pez', 'sed', 'hoy', 'ven', 'don'],
    minAccuracy: 0.80, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 7
    // ← Completar L13 desbloquea F3
  },

  // F2.4 — Lluvia de 4 letras
  {
    id: 'L14', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 4,
    title: 'Cuartetos',
    objective: 'Palabras de 4 letras cayendo.',
    targetUnitKind: 'word_build',
    content: ['casa', 'luna', 'mesa', 'dato', 'vida', 'mano', 'ruta', 'nube', 'flor', 'plan', 'nota', 'idea', 'paso', 'meta', 'cama', 'dama', 'palo', 'gato', 'lago', 'rama', 'hoja', 'tela', 'cola', 'isla'],
    minAccuracy: 0.82, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 6.5
  },

  // F2.5 — Lluvia de 5 letras
  {
    id: 'L15', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 5,
    title: 'Cinco Hojas',
    objective: 'Palabras de 5 letras. Más largo, más recompensa.',
    targetUnitKind: 'word_build',
    content: ['manos', 'notas', 'ideas', 'pasos', 'datos', 'rutas', 'nubes', 'luces', 'metas', 'casas', 'lunas', 'mesas', 'vidas', 'hojas', 'telas', 'gatos', 'lagos', 'islas', 'colas', 'ramas', 'pisos', 'rocas', 'leyes', 'voces'],
    minAccuracy: 0.82, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 6
  },

  // F2.6 — Más velocidad
  {
    id: 'L16', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 6,
    title: 'Brisa Rápida',
    objective: 'Lo mismo que sabés, pero caen más rápido.',
    targetUnitKind: 'word_build',
    content: ['casa', 'luna', 'sol', 'pan', 'mano', 'idea', 'dato', 'nota', 'paso', 'nube', 'flor', 'gato', 'lago', 'isla', 'roca', 'meta', 'plan', 'cama', 'vida', 'hoja', 'tela', 'rama', 'cola', 'palo'],
    minAccuracy: 0.82, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 4.5
  },

  // F2.7 — Más simultaneidad (más unidades en pantalla)
  {
    id: 'L17', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 7,
    title: 'Lluvia Densa',
    objective: 'Más hojas al mismo tiempo. Priorizá bien.',
    targetUnitKind: 'word_build',
    content: ['sol', 'rio', 'mar', 'luz', 'casa', 'mesa', 'vida', 'mano', 'dato', 'nota', 'idea', 'paso', 'fin', 'red', 'ojo', 'flor', 'nube', 'plan', 'meta', 'gato', 'lago', 'isla', 'hoja', 'roca', 'tela', 'rama'],
    minAccuracy: 0.80, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 4
  },

  // F2.8 — Enemigo roba una unidad
  {
    id: 'L18', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 8,
    title: 'Pájaro Ladrón',
    objective: 'El pájaro roba hojas. Tipeá rápido o las pierde.',
    targetUnitKind: 'word_build',
    content: ['flor', 'nube', 'luna', 'mesa', 'dato', 'plan', 'idea', 'meta', 'paso', 'clave', 'gato', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'cola', 'piso', 'vela', 'rana', 'sopa', 'boca', 'miel'],
    minAccuracy: 0.80, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 3.8
  },

  // F2.9 — Recuperación por combo
  {
    id: 'L19', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 9,
    title: 'Combo de Hojas',
    objective: 'Los combos recuperan vidas. Mantené la racha.',
    targetUnitKind: 'word_build',
    content: ['manos', 'notas', 'pasos', 'datos', 'casa', 'luna', 'vida', 'idea', 'sol', 'luz', 'rutas', 'nubes', 'luces', 'metas', 'hojas', 'telas', 'gatos', 'lagos', 'islas', 'flor', 'roca', 'vela', 'piso', 'sopa'],
    minAccuracy: 0.82, minInputs: 70,
    backgroundUrl: '/src/assets/backgrounds/l2-forest.svg',
    colorTheme: 'sky', mechanic: 'falling', fallDurationSec: 3.5
  },

  // F2.10 — Tormenta mastery
  {
    id: 'L20', familyId: 2, familyTitle: 'Lluvia de Hojas', sublevel: 10,
    title: 'Tormenta',
    objective: 'Todo junto: velocidad, variedad, presión. Mastery.',
    targetUnitKind: 'word_build',
    content: [
      'a', 'la', 'sol', 'casa', 'manos',
      'e', 'mi', 'pan', 'luna', 'notas',
      'o', 'tu', 'rio', 'mesa', 'ideas',
      'i', 'de', 'mar', 'dato', 'pasos',
      'u', 'no', 'luz', 'vida', 'rutas',
      's', 'el', 'fin', 'mano', 'luces',
      'n', 'si', 'red', 'flor', 'metas'
    ],
    minAccuracy: 0.82, minInputs: 80,
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
  {
    id: 'L21', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 1,
    title: 'Primer Sendero',
    objective: 'Seguí el camino. Cada nodo se ilumina al tipear.',
    targetUnitKind: 'sequence',
    content: ['asdf', 'jkl;', 'qwer', 'tyui', 'zxcv', 'bnm', 'fdsa', ';lkj', 'rewq', 'iuyt', 'vcxz', 'mnb', 'asd', 'jkl', 'qwe', 'tyu', 'zxc', 'fds', 'lkj', 'wer'],
    minAccuracy: 0.80, minInputs: 40,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.2 — Secuencias alternadas (izquierda/derecha)
  {
    id: 'L22', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 2,
    title: 'Alternancia',
    objective: 'El sendero alterna entre manos. Izquierda, derecha.',
    targetUnitKind: 'sequence',
    content: ['fjfj', 'dkdk', 'slsl', 'fjdk', 'sla;', 'dksl', 'jfjf', 'kdkd', 'lsls', 'dkfj', ';asl', 'sldk', 'a;fj', 'fjsl', 'dka;', 'jfdk', 'kdfj', 'slfjdk'],
    minAccuracy: 0.82, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.3 — Secuencias verticales (columnas)
  {
    id: 'L23', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 3,
    title: 'Columnas',
    objective: 'Senderos verticales. Subí y bajá por columnas.',
    targetUnitKind: 'sequence',
    content: ['qaz', 'wsx', 'edc', 'rfv', 'tgb', 'yhn', 'ujm', 'zaq', 'xsw', 'cde', 'vfr', 'bgt', 'nhy', 'mju', 'qa', 'ws', 'ed', 'rf', 'yh', 'uj', 'ik', 'ol'],
    minAccuracy: 0.82, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
    // ← Completar L23 desbloquea F4
  },

  // F3.4 — Secuencias de 2 letras
  {
    id: 'L24', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 4,
    title: 'Pares de Luz',
    objective: 'Bigramas en el sendero. Dos nodos por unidad.',
    targetUnitKind: 'bigram',
    content: ['la', 'mi', 'tu', 'ca', 'de', 'no', 'si', 'el', 'un', 'lo', 'me', 'pa', 'te', 'su', 'ra', 'vo', 'ni', 'se', 'en', 'es', 'al', 'da', 'ha', 'ma', 'le', 'os'],
    minAccuracy: 0.82, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.5 — Secuencias de 3 letras
  {
    id: 'L25', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 5,
    title: 'Tríos de Luz',
    objective: 'Tres nodos por unidad. El sendero se alarga.',
    targetUnitKind: 'sequence',
    content: ['sol', 'pan', 'rio', 'mar', 'luz', 'sal', 'fin', 'red', 'ojo', 'pie', 'oro', 'dos', 'mes', 'rey', 'ley', 'sur', 'voz', 'ver', 'ser', 'dar', 'pez', 'sed', 'hoy', 'don', 'ven'],
    minAccuracy: 0.83, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.6 — Secuencias pronunciables
  {
    id: 'L26', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 6,
    title: 'Sendero Fonético',
    objective: 'Secuencias que se pueden pronunciar. Sentí el ritmo.',
    targetUnitKind: 'bigram',
    content: ['ta', 'ma', 'na', 'ra', 'pa', 'sa', 'la', 'da', 'fa', 'va', 'to', 'po', 'co', 'ro', 'mo', 'no', 'lo', 'do', 'ti', 'mi', 'ni', 'li', 'di', 'ri', 'pi', 'si', 'te', 'me', 'ne', 'le'],
    minAccuracy: 0.83, minInputs: 50,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.7 — Palabras cortas en sendero
  {
    id: 'L27', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 7,
    title: 'Camino de Palabras',
    objective: 'Palabras cortas iluminan el sendero.',
    targetUnitKind: 'word_build',
    content: ['casa', 'luna', 'mesa', 'dato', 'palo', 'vida', 'flor', 'nube', 'plan', 'nota', 'idea', 'meta', 'paso', 'gato', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'vela', 'sopa', 'rana', 'boca'],
    minAccuracy: 0.83, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.8 — Palabras medias
  {
    id: 'L28', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 8,
    title: 'Sendero Largo',
    objective: 'Palabras más largas. El sendero crece.',
    targetUnitKind: 'word_build',
    content: ['camino', 'puente', 'destino', 'ventana', 'naranja', 'teclado', 'sendero', 'estrella', 'latidos', 'palabra', 'rescate', 'bosque', 'jardin', 'piedra', 'ritmo', 'noche', 'fuente', 'colina', 'brillo'],
    minAccuracy: 0.84, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.9 — Patrones largos
  {
    id: 'L29', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 9,
    title: 'Sendero Extendido',
    objective: 'Secuencias largas. Mantené el ritmo todo el camino.',
    targetUnitKind: 'word_build',
    content: ['memoria', 'latidos', 'palabra', 'rescate', 'constante', 'precision', 'horizonte', 'aventura', 'universo', 'santuario', 'sendero', 'estrella', 'brillante', 'sincero', 'corriente', 'esfuerzo', 'comienzo'],
    minAccuracy: 0.84, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l3-sky.svg',
    colorTheme: 'indigo', mechanic: 'trail'
  },

  // F3.10 — Mastery de ritmo
  {
    id: 'L30', familyId: 3, familyTitle: 'Sendero de Luz', sublevel: 10,
    title: 'Mastery de Ritmo',
    objective: 'Mezcla de todo: patrones, sílabas, palabras. Ritmo puro.',
    targetUnitKind: 'word_build',
    content: ['fj', 'sol', 'casa', 'camino', 'memoria', 'dk', 'pan', 'luna', 'puente', 'teclado', 'sl', 'mar', 'dato', 'sendero', 'latidos', 'a;', 'luz', 'vida', 'estrella', 'aventura', 'rio', 'nota', 'destino', 'horizonte'],
    minAccuracy: 0.85, minInputs: 70,
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
  {
    id: 'L31', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 1,
    title: 'Sílabas en el Río',
    objective: 'Sílabas simples flotando. Rescatalas a tiempo.',
    targetUnitKind: 'bigram',
    content: ['la', 'mi', 'tu', 'ca', 'de', 'no', 'si', 'el', 'un', 'lo', 'me', 'pa', 'te', 'su', 'ni', 'va', 'di', 'co', 'ra', 'se', 'en', 'es', 'al', 'da', 'ha', 'ma'],
    minAccuracy: 0.78, minInputs: 35,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 9
  },

  // F4.2 — Rescate de pares útiles
  {
    id: 'L32', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 2,
    title: 'Pares Útiles',
    objective: 'Bigramas con sentido. Más largo, más recompensa.',
    targetUnitKind: 'bigram',
    content: ['me', 'pa', 'te', 'su', 'ra', 'vo', 'ni', 'sa', 'pe', 'di', 'ma', 'co', 'le', 'da', 'ha', 'se', 'en', 'al', 'os', 'as', 'es', 'do', 'ta', 'na', 'fa', 've'],
    minAccuracy: 0.80, minInputs: 40,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 8.5
  },

  // F4.3 — Rescate de 3 letras
  {
    id: 'L33', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 3,
    title: 'Tríos en el Río',
    objective: 'Tres letras flotando. Rescatá antes de perderlas.',
    targetUnitKind: 'sequence',
    content: ['sol', 'pan', 'rio', 'mar', 'luz', 'sal', 'fin', 'red', 'ojo', 'pie', 'oro', 'dos', 'mes', 'rey', 'ley', 'sur', 'voz', 'ver', 'ser', 'dar', 'pez', 'sed', 'hoy', 'don', 'ven', 'tos'],
    minAccuracy: 0.80, minInputs: 45,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 8
    // ← Completar L33 desbloquea F5
  },

  // F4.4 — Construcción de palabra corta
  {
    id: 'L34', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 4,
    title: 'Palabras Cortas',
    objective: 'Palabras de 4 letras flotando en el río.',
    targetUnitKind: 'word_build',
    content: ['casa', 'luna', 'mesa', 'dato', 'vida', 'mano', 'ruta', 'nube', 'flor', 'plan', 'nota', 'idea', 'meta', 'gato', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'vela', 'sopa', 'rana', 'boca', 'piso'],
    minAccuracy: 0.82, minInputs: 55,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 7.5
  },

  // F4.5 — Construcción de palabra media
  {
    id: 'L35', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 5,
    title: 'Palabras Medias',
    objective: 'Palabras más largas. El río no espera.',
    targetUnitKind: 'word_build',
    content: ['camino', 'puente', 'destino', 'ventana', 'naranja', 'teclado', 'memoria', 'sendero', 'estrella', 'latidos', 'palabra', 'rescate', 'bosque', 'jardin', 'piedra', 'fuente', 'colina', 'brillo'],
    minAccuracy: 0.82, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 7
  },

  // F4.6 — Variantes válidas
  {
    id: 'L36', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 6,
    title: 'Variantes',
    objective: 'Palabras similares. Cuidado con confundirlas.',
    targetUnitKind: 'word_build',
    content: ['mesa', 'meta', 'mano', 'mapa', 'dato', 'dama', 'paso', 'palo', 'casa', 'cama', 'nota', 'nube', 'ruta', 'rana', 'vela', 'vida', 'cola', 'cosa', 'boca', 'bola', 'isla', 'idea', 'sopa', 'sala', 'tela', 'tema'],
    minAccuracy: 0.83, minInputs: 60,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 6.5
  },

  // F4.7 — Distractores
  {
    id: 'L37', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 7,
    title: 'Corriente Cruzada',
    objective: 'Más unidades, más presión. Elegí bien.',
    targetUnitKind: 'word_build',
    content: ['nota', 'nube', 'idea', 'paso', 'clave', 'dato', 'plan', 'meta', 'vida', 'ruta', 'mano', 'flor', 'gato', 'lago', 'isla', 'roca', 'hoja', 'tela', 'rama', 'vela', 'sopa', 'rana', 'boca', 'piso', 'luna', 'mesa', 'casa'],
    minAccuracy: 0.82, minInputs: 65,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 5.5
  },

  // F4.8 — Más velocidad
  {
    id: 'L38', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 8,
    title: 'Rápidos',
    objective: 'Río rápido. Sin margen de error.',
    targetUnitKind: 'word_build',
    content: ['camino', 'puente', 'rescate', 'ventana', 'destino', 'memoria', 'teclado', 'latidos', 'sendero', 'estrella', 'bosque', 'jardin', 'piedra', 'fuente', 'colina', 'brillo', 'naranja', 'palabra'],
    minAccuracy: 0.82, minInputs: 70,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 4.5
  },

  // F4.9 — Corriente fuerte
  {
    id: 'L39', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 9,
    title: 'Corriente Fuerte',
    objective: 'Construcciones largas a máxima velocidad.',
    targetUnitKind: 'word_build',
    content: ['aprendizaje', 'santuario', 'precision', 'constante', 'brillante', 'sincero', 'horizonte', 'aventura', 'universo', 'corriente', 'esfuerzo', 'comienzo', 'estructura', 'naturaleza', 'movimiento', 'equilibrio'],
    minAccuracy: 0.82, minInputs: 75,
    backgroundUrl: '/src/assets/backgrounds/l4-river.svg',
    colorTheme: 'violet', mechanic: 'rescue', fallDurationSec: 4
  },

  // F4.10 — Mastery de construcción
  {
    id: 'L40', familyId: 4, familyTitle: 'Rescate en el Río', sublevel: 10,
    title: 'Mastery del Río',
    objective: 'Todo junto: sílabas, palabras, construcciones. Río maestro.',
    targetUnitKind: 'word_build',
    content: ['la', 'sol', 'casa', 'camino', 'memoria', 'mi', 'pan', 'luna', 'puente', 'precision', 'de', 'mar', 'dato', 'sendero', 'aventura', 'el', 'luz', 'vida', 'destino', 'universo', 'tu', 'rio', 'flor', 'estrella', 'horizonte'],
    minAccuracy: 0.84, minInputs: 80,
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
