# Typing Foundations — F4 Signal Matrix v1

**Familia:** F4 — Rescate en el Río (L31-L40)
**Mecánica:** rescue — unidad flota horizontal, tipeá antes que se pierda
**Objetivo humano:** Construcción bajo presión

---

## Clasificación de Señales F4

| Señal F4 | Qué enseña al sistema | Clase | Capability posible |
|---|---|---|---|
| `f4.build_pressure_rate` | Error rate mientras construye palabra | observabilidad | `construction_under_pressure_v1` |
| `f4.partial_completion_rate` | Completado parcial antes de timeout | observabilidad | `partial_success_pattern_v1` |
| `f4.word_assembly_time` | Tiempo para armar palabra completa | apoyo | `assembly_efficiency_v1` |
| `f4.salvage_decision_time` | Tiempo para decidir qué rescatar | apoyo | `triage_decision_pattern_v1` |
| `f4.abandon_rate` | Tasa de abandono de unidades difíciles | apoyo | `persistence_vs_triage_v1` |
| `f4.recovery_from_near_loss` | Recuperación tras casi perder unidad | promoción | `clutch_performance_v1` |
| `f4.multi_word_juggle` | Manejo de múltiples palabras simultáneas | promoción | `multitask_capacity_v1` |
| `f4.priority_selection_accuracy` | Precisión al priorizar unidades | promoción | `priority_accuracy_v1` |
| `f4.flow_under_pressure` | Flujo mantenido bajo presión alta | apoyo | `pressure_flow_state_v1` |
| `f4.strategic_abandon_count` | Abandonos estratégicos (no por error) | promoción | `strategic_thinking_v1` |

---

## Prioridad de implementación F4

1. `f4.build_pressure_rate` — Construcción bajo presión
2. `f4.word_assembly_time` — Eficiencia de ensamblaje
3. `f4.recovery_from_near_loss` — Rendimiento en situaciones críticas
4. `f4.priority_selection_accuracy` — Precisión en priorización

---

## Eventos Runtime F4

| Evento | Señales que dispara |
|--------|---------------------|
| `UNIT_FAILED` (timeout) | `f4.build_pressure_rate`, `f4.partial_completion_rate` |
| `KEY_VALIDATED` (rescate) | `f4.word_assembly_time`, `f4.flow_under_pressure` |
| `LEVEL_COMPLETED` | `f4.recovery_from_near_loss`, `f4.strategic_abandon_count` |

---

## Reglas de Promoción F4

**Criterios para candidate promotion:**
- Mínimo 5 runs en F4
- `build_pressure_rate` < 0.3 (error rate bajo presión)
- `recovery_from_near_loss` > 0.6 (éxito en clutch)

**Capabilities promovibles:**
- `construction_under_pressure_v1`
- `clutch_performance_v1`
- `priority_accuracy_v1`

---

## Diferencias F3 vs F4

| Dimensión | F3 (Sendero) | F4 (Rescate) |
|-----------|--------------|--------------|
| Foco | Ritmo y continuidad | Construcción bajo presión |
| Señal primaria | `chunk_length_mean` | `build_pressure_rate` |
| Presión | Tempo interno | Timeout externo |
| Promoción | Chunking cognitivo | Rendimiento en clutch |
