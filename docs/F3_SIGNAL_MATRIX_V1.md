# Typing Foundations — F3 Signal Matrix v1

**Familia:** F3 — Sendero de Luz (L21-L30)
**Mecánica:** trail — nodos horizontales, se iluminan al tipear
**Objetivo humano:** Secuencia, ritmo y continuidad

---

## Clasificación de Señales F3

| Señal F3 | Qué enseña al sistema | Clase | Capability posible |
|---|---|---|---|
| `f3.chunk_length_mean` | Longitud promedio de chunks fluidos | observabilidad | `chunking_capacity_v1` |
| `f3.rhythm_stability` | Consistencia del tempo al tipear | observabilidad | `rhythm_profile_v1` |
| `f3.pause_at_boundary` | Pausas en límites de palabra/chunk | apoyo | `boundary_detection_v1` |
| `f3.sequencing_error_rate` | Error en secuencias predecibles | apoyo | `sequence_prediction_v1` |
| `f3.flow_break_count` | Cantidad de rupturas de flujo | apoyo | `flow_state_indicator_v1` |
| `f3.anticipation_latency` | Latencia menor en patrones conocidos | promoción | `pattern_recognition_speed_v1` |
| `f3.chunking_efficiency` | Eficiencia de agrupamiento mental | promoción | `cognitive_chunking_v1` |
| `f3.continuity_score` | Puntuación de continuidad sin pausas | promoción | `sustained_attention_v1` |
| `f3.predictive_acceleration` | Aceleración en secuencias predecibles | apoyo | `motor_prediction_v1` |
| `f3.recovery_after_break` | Recuperación tras ruptura de flujo | apoyo | `flow_recovery_v1` |

---

## Prioridad de implementación F3

1. `f3.chunk_length_mean` — Capacidad de chunking
2. `f3.rhythm_stability` — Estabilidad de tempo
3. `f3.chunking_efficiency` — Eficiencia de agrupamiento
4. `f3.continuity_score` — Atención sostenida

---

## Eventos Runtime F3

| Evento | Señales que dispara |
|--------|---------------------|
| `KEY_VALIDATED` (secuencia) | `f3.chunk_length_mean`, `f3.rhythm_stability` |
| `UNIT_COMPLETE` | `f3.pause_at_boundary`, `f3.chunking_efficiency` |
| `LEVEL_COMPLETED` | `f3.continuity_score`, `f3.flow_break_count` |

---

## Reglas de Promoción F3

**Criterios para candidate promotion:**
- Mínimo 5 runs en F3
- `chunk_length_mean` >= 3 caracteres
- `rhythm_stability` > 0.7 (coeficiente de variación < 0.3)

**Capabilities promovibles:**
- `cognitive_chunking_v1`
- `sustained_attention_v1`
- `pattern_recognition_speed_v1`

---

## Diferencias F2 vs F3

| Dimensión | F2 (Lluvia) | F3 (Sendero) |
|-----------|-------------|--------------|
| Foco | Reacción | Ritmo y continuidad |
| Señal primaria | `pressure_error_rate` | `chunk_length_mean` |
| Tiempo | Presión externa | Tempo interno |
| Promoción | Balance bajo presión | Eficiencia de chunking |
