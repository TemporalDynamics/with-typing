# Typing Foundations — F1 Signal Matrix v1

Estado: canónico (F1 = `L1..L10`)  
Objetivo: capturar señales pequeñas pero trazables, separando **observabilidad** vs **apoyo** vs **promoción**.

## Clasificación

- **observabilidad**: se guarda para diagnóstico/aprendizaje del proceso; no promueve sola.
- **apoyo**: aporta evidencia para candidatos; requiere combinación y consistencia.
- **promoción**: puede participar en promoción de capability cuando cumpla umbrales.

## Tabla F1

| Señal F1 | Qué enseña al sistema | Clase | Capability posible |
|---|---|---|---|
| `f1.key_error_by_key` | fricción por tecla específica | observabilidad | `key_difficulty_map_v1` |
| `f1.key_error_by_row` | dificultad por fila (top/home/bottom) | observabilidad | `row_difficulty_profile_v1` |
| `f1.key_error_by_hand` | asimetría motriz izquierda/derecha | observabilidad | `hand_asymmetry_profile_v1` |
| `f1.finger_hint_mismatch` | cuando la digitación sugerida falla | apoyo | `finger_mapping_stability_v1` |
| `f1.base_pattern_mastery` | dominio de patrones base (`asdf`, `qwer`, `zxcv`) | apoyo | `base_pattern_mastery_v1` |
| `f1.transition_break` | punto de quiebre entre teclas consecutivas | promoción | `keyboard_transition_breaks_v1` |
| `f1.neighbor_confusion` | sustitución por vecindad física del teclado | promoción | `keyboard_neighbor_confusion_map_v1` |
| `f1.vertical_column_friction` | fricción en recorridos verticales (`qaz`, `wsx`, etc.) | apoyo | `vertical_motion_profile_v1` |
| `f1.bilateral_mirror_friction` | dificultad en alternancia espejo (izq/der) | apoyo | `bilateral_symmetry_profile_v1` |
| `f1.time_to_first_success` | costo inicial para acertar unidad nueva | observabilidad | `onboarding_friction_profile_v1` |
| `f1.repetitions_to_mastery` | repeticiones necesarias hasta consolidar unidad | apoyo | `motor_consolidation_curve_v1` |
| `f1.life_loss_by_unit_kind` | dónde se pierden vidas por tipo de unidad | apoyo | `failure_pressure_profile_v1` |
| `f1.run_completion_rate` | estabilidad por run/subnivel | observabilidad | `level_stability_index_v1` |
| `f1.run_improvement_delta` | mejora entre runs del mismo subnivel | promoción | `short_term_learning_gain_v1` |
| `f1.alphabet_order_success` | dominio de secuencia guiada (orden base) | apoyo | `alphabet_sequence_basic_v1` |
| `f1.low_frequency_key_friction` | fricción en teclas de baja frecuencia | observabilidad | `low_frequency_key_profile_v1` |
| `f1.error_recovery_pattern` | patrón de recuperación tras error | apoyo | `error_recovery_pattern_v1` |
| `f1.population_consistency` | si la fricción es individual o colectiva | promoción | `population_keyboard_friction_v1` |

## Prioridad de implementación (recomendada)

1. `f1.neighbor_confusion`
2. `f1.transition_break`
3. `f1.run_improvement_delta`
4. `f1.population_consistency`

Estas cuatro dan la mejor base para trazabilidad + consolidación posterior.

## Regla de gobernanza

- No usar velocidad cruda como criterio de promoción en F1.
- Señales de F1 pueden ser numerosas, pero cada una debe declarar:
  - qué enseña,
  - su clase (`observabilidad` / `apoyo` / `promoción`),
  - y a qué capability podría alimentar.
- Si una señal no responde ninguna pregunta de aprendizaje, no entra.

