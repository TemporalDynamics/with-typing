# Typing Foundations — F5 Signal Matrix v1

**Familia:** F5 — Jardín de Palabras (L41-L50)
**Mecánica:** garden — planta crece con cada caracter correcto
**Objetivo humano:** Palabras, frases y sentido

---

## Clasificación de Señales F5

| Señal F5 | Qué enseña al sistema | Clase | Capability posible |
|---|---|---|---|
| `f5.semantic_completion_rate` | Completado de palabras con significado | observabilidad | `semantic_processing_v1` |
| `f5.word_length_tolerance` | Tolerancia a palabras largas | observabilidad | `length_endurance_v1` |
| `f5.phrase_coherence_score` | Coherencia al tipear frases | apoyo | `phrase_maintenance_v1` |
| `f5.space_handling_accuracy` | Precisión en espacios entre palabras | apoyo | `word_boundary_awareness_v1` |
| `f5.meaningful_vs_nonsense` | Diferencia entre palabras reales vs inventadas | apoyo | `semantic_recognition_v1` |
| `f5.expressive_choice_consistency` | Consistencia en elecciones expresivas | promoción | `expressive_style_v1` |
| `f5.context_switch_cost` | Costo al cambiar de tema/contexto | promoción | `cognitive_flexibility_v1` |
| `f5.intentional_typing_score` | Puntuación de tipeo intencional | promoción | `intentionality_profile_v1` |
| `f5.association_strength` | Fortaleza en asociaciones palabra-concepto | apoyo | `semantic_association_v1` |
| `f5.fluency_with_meaning` | Fluidez manteniendo significado | promoción | `semantic_fluency_v1` |

---

## Prioridad de implementación F5

1. `f5.semantic_completion_rate` — Procesamiento semántico
2. `f5.phrase_coherence_score` — Mantenimiento de frases
3. `f5.expressive_choice_consistency` — Estilo expresivo
4. `f5.context_switch_cost` — Flexibilidad cognitiva

---

## Eventos Runtime F5

| Evento | Señales que dispara |
|--------|---------------------|
| `KEY_VALIDATED` (palabra) | `f5.semantic_completion_rate`, `f5.word_length_tolerance` |
| `UNIT_COMPLETE` (frase) | `f5.phrase_coherence_score`, `f5.space_handling_accuracy` |
| `LEVEL_COMPLETED` | `f5.expressive_choice_consistency`, `f5.intentional_typing_score` |

---

## Reglas de Promoción F5

**Criterios para candidate promotion:**
- Mínimo 5 runs en F5
- `semantic_completion_rate` > 0.85
- `phrase_coherence_score` > 0.7 en frases de 3+ palabras

**Capabilities promovibles:**
- `semantic_processing_v1`
- `expressive_style_v1`
- `cognitive_flexibility_v1`
- `intentionality_profile_v1`

---

## Diferencias F4 vs F5

| Dimensión | F4 (Rescate) | F5 (Jardín) |
|-----------|--------------|-------------|
| Foco | Construcción bajo presión | Palabras con significado |
| Señal primaria | `build_pressure_rate` | `semantic_completion_rate` |
| Unidad | Sílaba/palabra | Palabra/frase |
| Promoción | Rendimiento en clutch | Estilo expresivo + flexibilidad |

---

## Integración con Hemisferio Global

F5 es la familia más importante para integración con WIT porque:

1. **Procesa significado**, no solo mecánica
2. **Captura estilo expresivo**, no solo precisión
3. **Mide flexibilidad cognitiva** mediante context switch
4. **Evalúa intencionalidad**, no solo ejecución

Las señales de F5 pueden alimentar directamente:
- `semantic_processing_capability`
- `expressive_writing_profile`
- `cognitive_flexibility_index`
- `intentional_action_pattern`
