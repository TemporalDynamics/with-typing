# Typing Foundations — F2 Signal Matrix v1

**Familia:** F2 — Lluvia de Hojas (L11-L20)
**Mecánica:** falling — unidad cae, tipeá antes de perderla
**Objetivo humano:** Reacción y escritura bajo presión

---

## Clasificación de Señales F2

| Señal F2 | Qué enseña al sistema | Clase | Capability posible |
|---|---|---|---|
| `f2.reaction_latency_ms` | Tiempo de reacción ante estímulo nuevo | observabilidad | `reaction_time_profile_v1` |
| `f2.pressure_error_rate` | Error rate bajo presión temporal | observabilidad | `pressure_tolerance_v1` |
| `f2.drop_pattern` | Patrón de unidades perdidas | apoyo | `attention_sustain_profile_v1` |
| `f2.multi_target_priority` | Cómo prioriza múltiples objetivos | apoyo | `priority_decision_profile_v1` |
| `f2.combo_recovery_rate` | Recuperación después de perder combo | apoyo | `resilience_profile_v1` |
| `f2.speed_accuracy_tradeoff` | Compensación velocidad vs precisión | promoción | `speed_accuracy_balance_v1` |
| `f2.panic_backspace_rate` | Backspace compulsivo bajo presión | promoción | `panic_response_pattern_v1` |
| `f2.late_commit_rate` | Decisiones en último momento | promoción | `urgency_decision_pattern_v1` |
| `f2.streak_sustain_time` | Tiempo sostenido sin errores | apoyo | `focus_endurance_v1` |
| `f2.cascade_failure_count` | Fallos en cascada tras primer error | promoción | `cascade_failure_pattern_v1` |

---

## Prioridad de implementación F2

1. `f2.pressure_error_rate` — Mide error bajo presión temporal
2. `f2.reaction_latency_ms` — Tiempo de reacción puro
3. `f2.speed_accuracy_tradeoff` — Balance velocidad/precisión
4. `f2.cascade_failure_count` — Detección de tilt/frustración

---

## Eventos Runtime F2

| Evento | Señales que dispara |
|--------|---------------------|
| `UNIT_FAILED` (timeout) | `f2.pressure_error_rate`, `f2.drop_pattern` |
| `KEY_VALIDATED` (bajo tiempo) | `f2.reaction_latency_ms`, `f2.speed_accuracy_tradeoff` |
| `LEVEL_COMPLETED` | `f2.streak_sustain_time`, `f2.panic_backspace_rate` |

---

## Reglas de Promoción F2

**Criterios para candidate promotion:**
- Mínimo 5 runs en F2
- Consistencia en `speed_accuracy_tradeoff` > 0.6
- `cascade_failure_count` < 2 en últimos 3 runs

**Capabilities promovibles:**
- `speed_accuracy_balance_v1`
- `panic_response_pattern_v1`
- `cascade_failure_pattern_v1`

---

## Diferencias F1 vs F2

| Dimensión | F1 (Nido) | F2 (Lluvia) |
|-----------|-----------|-------------|
| Foco | Mapa motriz | Reacción bajo presión |
| Señal primaria | `neighbor_confusion` | `pressure_error_rate` |
| Tiempo | Sin presión | Presión temporal explícita |
| Promoción | Patrones de confusión | Balance velocidad/precisión |
