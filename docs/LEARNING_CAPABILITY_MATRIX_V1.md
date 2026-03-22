# Typing Foundations - Learning & Capability Matrix v1

Estado: canónico para diseño de niveles y señales (B1/B2).

Objetivo: que cada familia enseñe algo al humano y deje una ganancia explícita para el sistema.

Artefactos machine-readable:
- `docs/manifests/LEVEL_MANIFEST_V1.json`
- `docs/manifests/ENEMY_MECHANICS_V1.json`
- `docs/manifests/CAPABILITY_PROMOTION_MAP_V1.json`
- `docs/manifests/F1_SIGNAL_MANIFEST_V1.json`

Complemento por familia:
- `docs/F1_SIGNAL_MATRIX_V1.md`

---

## Regla rectora

- F1–F2 enseñan teclado.
- F3–F4 enseñan estructura.
- F5 enseña fluidez y relaciones.

Si una familia no declara ganancia para el humano y para el sistema, no está cerrada.

---

## Matriz por familia

| Familia | Humano aprende | Sistema gana | Capabilities candidatas |
|---|---|---|---|
| F1 — Nido de Inicio | ubicación de dedos, F/J, home row, recorrido básico | anclaje mínimo de teclado + secuencia alfabética base | `keyboard_anchor_basic_v1`, `alphabet_sequence_basic_v1` |
| F2 — Lluvia de Letras | reacción, precisión bajo presión, estabilidad visual | robustez sobre símbolo suelto bajo variación | `single_symbol_recall_stable_v1`, `alphabet_sequence_reinforced_v1` |
| F3 — Sendero de Secuencias | continuidad y chunks de patrones | precedencia, orden, chunking | `sequence_chunking_basic_v1`, `ordered_pattern_recall_v1` |
| F4 — Sílabas y Construcción | combinatoria y múltiples salidas válidas | estructura composicional y branching | `syllable_pairing_basic_v1`, `word_construction_branching_v1` |
| F5 — Jardín de Palabras | estabilidad en palabras completas y frases | consolidación de palabra/frase + puente de relaciones | `word_form_recall_v1`, `phrase_transcription_basic_v1`, `query_relatedness_basic_v1` |

---

## Señales útiles por familia (allowlist-safe)

## F1 — Nido de Inicio
- `key_correct` / `key_incorrect` por unidad.
- run completada.
- secuencia correcta/incorrecta.
- recuperación de error.
- combo estable.

Promoción: no usar velocidad como criterio principal.

## F2 — Lluvia de Letras
- acierto/error por símbolo.
- pérdida por suelo/interferencia.
- recuperación por combo.
- completitud de run.
- consistencia entre runs.

## F3 — Sendero de Secuencias
- secuencia correcta/incorrecta.
- longitud completada.
- corte de secuencia.
- alternancia izquierda/derecha.
- consistencia por subnivel.

## F4 — Sílabas y Construcción
- combinación válida/invalidada.
- cantidad de salidas válidas posibles.
- elección de variante.
- calidad de construcción.

## F5 — Jardín de Palabras
- palabra completada.
- palabra rota.
- error interno.
- cobertura de pool.
- repetición dominada.

## F5 — Frases y relaciones (tramo alto)
- frase correcta/incorrecta.
- relación correcta entre opciones.
- elección de distractor.
- consistencia entre runs.
- tiempo de decisión (solo observabilidad al inicio).

---

## Tramo canónico de relaciones (puente al pipeline)

Secuencia propuesta:
- F6.1 transcripción de frase corta.
- F6.2 dos frases, una a una.
- F6.3 frase izquierda ↔ frase derecha.
- F6.4 una frase y dos opciones.
- F6.5 una frase y cuatro opciones.
- F6.6 cuatro frases vs cuatro frases.
- F6.7 distractores fuertes.
- F6.8 presión temporal.
- F6.9 rescate por prioridad.
- F6.10 mastery.

---

## Enemigos como mecánica (no decoración)

- `bird`: roba letras/sílabas antes de suelo (F2/F4).
- `worm`: consume unidades que tocan suelo (F2/F5).
- `fox_raccoon`: rompe combo o roba bonus (F5/F6).
- `koala` (host): guía y feedback; no interfiere.

---

## Regla de dificultad

Cada subnivel sube solo 1–2 variables:
- velocidad,
- simultaneidad,
- longitud,
- variabilidad,
- distractores,
- tensión por enemigo,
- complejidad estructural.

Evitar subir todas a la vez.

---

## Checklist de cierre de etapa

- cada familia tiene objetivo humano explícito.
- cada familia tiene ganancia de sistema explícita.
- cada familia define capabilities candidatas.
- cada familia define señales útiles y señales solo-observabilidad.
- F6 tiene roadmap de 10 subniveles orientado a pipeline.
