# Typing Foundations - Progresión por Familias v1

Estado: diseño canónico de progresión (pre-implementación completa)  
Objetivo: escalar el juego sin perder foco pedagógico ni trazabilidad de señales.

Documento complementario:
- `docs/LEARNING_CAPABILITY_MATRIX_V1.md` (qué aprende el humano vs qué gana el sistema por familia).
- `docs/F1_SIGNAL_MATRIX_V1.md` (tabla canónica de señales F1: observabilidad/apoyo/promoción).

Manifiestos ejecutables:
- `docs/manifests/LEVEL_MANIFEST_V1.json`
- `docs/manifests/ENEMY_MECHANICS_V1.json`
- `docs/manifests/CAPABILITY_PROMOTION_MAP_V1.json`
- `docs/manifests/F1_SIGNAL_MANIFEST_V1.json`

## Estado implementado (snapshot actual)

- 50 niveles jugables en total.
- Familias activas:
  - F1 `Nido de Inicio` (10 subniveles)
  - F2 `Lluvia de Hojas` (10 subniveles)
  - F3 `Sendero de Luz` (10 subniveles)
  - F4 `Rescate en el Río` (10 subniveles)
  - F5 `Jardín de Palabras` (10 subniveles)
- El selector ya muestra `Familia + Subnivel` (`F#.##`) y permite volver a cualquier nivel desbloqueado.

## 1) Principio rector

Primero aprende el humano, después aprende el sistema.

Regla de enfoque por bloques:
- F1–F2 enseñan teclado.
- F3–F4 enseñan estructura.
- F5 enseña fluidez y relaciones.

Secuencia obligatoria de adquisición:

1. letras sueltas  
2. secuencias  
3. sílabas  
4. palabras  
5. frases

No se invierte este orden.

---

## 2) Familias canónicas

## Familia 1 — Nido de Inicio

**Objetivo humano:** dominio básico del teclado (F/J, home row, recorrido completo).  
**Mecánica principal:** target guiado + dedo sugerido + precisión.  
**Reward loop:** combo base, feedback visual claro, mastery.

**Subniveles (1.1–1.10):**
- 1.1 índices en F/J
- 1.2 home row izquierda
- 1.3 home row derecha
- 1.4 teclas vecinas
- 1.5 recorrido completo básico
- 1.6 velocidad baja
- 1.7 velocidad media
- 1.8 recuperación de error
- 1.9 combo básico
- 1.10 mastery

## Familia 2 — Lluvia de Letras

**Objetivo humano:** reacción visual + ubicación de letras bajo presión.  
**Mecánica principal:** caída vertical con variación real de posición/velocidad.  
**Reward loop:** supervivencia + bonus por racha + control de vidas.

**Subniveles (2.1–2.10):**
- 2.1 caída lenta, pocas posiciones
- 2.2 caída lenta, más posiciones
- 2.3 más letras simultáneas
- 2.4 velocidad media
- 2.5 enemigos suaves (comen letras)
- 2.6 bonus por racha
- 2.7 recuperación de vida por combo
- 2.8 velocidad alta
- 2.9 lluvia mixta
- 2.10 mastery

## Familia 3 — Secuencias

**Objetivo humano:** continuidad y orden de patrones útiles.  
**Mecánica principal:** cadenas de teclas/segmentos con dificultad creciente.  
**Reward loop:** precisión sostenida + velocidad controlada.

**Subniveles (3.1–3.10):**
- 3.1 alfabéticas simples
- 3.2 bloques por zonas del teclado
- 3.3 patrones repetitivos útiles
- 3.4 alternancia izquierda/derecha
- 3.5 secuencias con salto
- 3.6 secuencias largas
- 3.7 presión temporal media
- 3.8 presión temporal alta
- 3.9 patrones mixtos
- 3.10 mastery

## Familia 4 — Sílabas y Construcción

**Objetivo humano:** combinar piezas y formar opciones válidas (ej: CA + SA + TA).  
**Mecánica principal:** selección/composición de sílabas.  
**Reward loop:** más de una solución posible, puntaje por calidad.

**Subniveles (4.1–4.10):**
- 4.1 combinaciones simples de 2 sílabas
- 4.2 combinaciones con distractores
- 4.3 dos salidas válidas
- 4.4 tres salidas válidas
- 4.5 presión de tiempo suave
- 4.6 presión de tiempo media
- 4.7 cadenas de construcción
- 4.8 rescate de sílabas (enemigo)
- 4.9 composición mixta
- 4.10 mastery

## Familia 5 — Jardín de Palabras

**Objetivo humano:** escritura estable de palabras con menor repetición tonta.  
**Mecánica principal:** pools amplios + longitud variable + ritmo.  
**Reward loop:** progresión de dificultad visible por longitud/estructura.

**Subniveles (5.1–5.10):**
- 5.1 palabras cortas frecuentes
- 5.2 palabras cortas variadas
- 5.3 palabras medias
- 5.4 palabras medias + distractores
- 5.5 control de errores
- 5.6 velocidad media
- 5.7 velocidad alta
- 5.8 rescate de palabras (enemigo)
- 5.9 mezcla completa
- 5.10 mastery

## Nota de roadmap

El tramo "Frases y Rescate" no está modelado como familia separada en el runtime actual.
Su progresión vive en F5 (`L41..L50`) y puede separarse como F6 en una etapa posterior.

---

## 3) Señales por familia (B1/B2-ready)

Todas las familias emiten señales allowlisted (sin texto privado crudo).

- `feature.action_bar_action_usage`
- `interaction.response_latency_ms` (observabilidad, no promoción B1)
- `interaction.session_turn_count`
- `feature.resolution_kind_usage`
- `reliability.insufficient_evidence_count`
- `reliability.fallback_path_used`

**Regla de diseño:** velocidad puede mejorar experiencia de usuario, pero no domina sola la promoción de capability.

---

## 4) Curva de dificultad (regla general)

Cada subnivel solo sube 1–2 variables:

- velocidad
- simultaneidad
- longitud
- variabilidad
- tensión (enemigos)

Evitar subir todo junto.

---

## 5) Cierre de etapa (Definition of Done)

Se considera cerrada esta etapa de diseño cuando:

- existe mapa completo 6 familias x 10 subniveles
- cada familia declara objetivo humano + mecánica + reward loop
- cada familia tiene salida de señales definida
- existe plan de implementación por lotes (no codificación aleatoria)

---

## 6) Plan de implementación recomendado

### Fase A (rápida, impacto alto)
- completar Familia 1 y 2 con subniveles reales
- ajustar caída (posiciones + velocidad) y vidas/combos
- reducir repetición de contenido

### Fase B
- Familia 3 y 4 completas
- introducir composición (sílabas con múltiples salidas)

### Fase C
- Familia 5 y 6
- frases + mecánicas de rescate/enemigos

### Fase D
- tuning de balance + telemetría
- congelar v1 jugable y empezar B2
