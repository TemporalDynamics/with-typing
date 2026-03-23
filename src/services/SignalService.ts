/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameEvent, B1Signal, B1SignalType, F1SignalClass, DifficultyMode } from '../types/game';
import { LEVELS } from '../engine/LevelDefinitions';
import { KEYBOARD_ROWS, getKeyMapping } from '../engine/KeyboardMap';

const APP_VERSION = '1.0.0';

type SignalClass = 'observabilidad' | 'apoyo' | 'promocion';

export class SignalService {
  private static instance: SignalService;
  private runtimeMode: 'local_strict' | 'hybrid' = 'local_strict';
  private keyCoords: ReadonlyMap<string, { row: number; col: number }>;
  private basePatternSet: ReadonlySet<string>;
  private verticalPatternSet: ReadonlySet<string>;
  private mirrorPatternSet: ReadonlySet<string>;
  private lowFrequencyKeySet: ReadonlySet<string>;
  private f1SignalClassMap: ReadonlyMap<string, F1SignalClass>;
  private f2SignalClassMap: ReadonlyMap<string, SignalClass>;
  private f3SignalClassMap: ReadonlyMap<string, SignalClass>;
  private f4SignalClassMap: ReadonlyMap<string, SignalClass>;
  private f5SignalClassMap: ReadonlyMap<string, SignalClass>;

  private constructor() {
    this.keyCoords = this.buildKeyCoords();
    this.basePatternSet = new Set(['asdf', 'qwer', 'zxcv', 'jkl;', 'fdsa', ';lkj', 'rewq', 'vcxz']);
    this.verticalPatternSet = new Set(['qaz', 'wsx', 'edc', 'rfv', 'tgb', 'yhn', 'ujm', 'zaq', 'xsw', 'cde', 'vfr', 'bgt', 'nhy', 'mju']);
    this.mirrorPatternSet = new Set(['fj', 'jf', 'dk', 'kd', 'sl', 'ls', 'a;', ';a', 'fjdk', 'dkfj', 'sla;', ';asl']);
    this.lowFrequencyKeySet = new Set(['q', 'w', 'x', 'z', 'p', ';']);
    this.f1SignalClassMap = new Map<string, F1SignalClass>([
      ['f1.key_error_by_key', 'observabilidad'],
      ['f1.key_error_by_row', 'observabilidad'],
      ['f1.key_error_by_hand', 'observabilidad'],
      ['f1.finger_hint_mismatch', 'apoyo'],
      ['f1.base_pattern_mastery', 'apoyo'],
      ['f1.transition_break', 'promocion'],
      ['f1.neighbor_confusion', 'promocion'],
      ['f1.vertical_column_friction', 'apoyo'],
      ['f1.bilateral_mirror_friction', 'apoyo'],
      ['f1.time_to_first_success', 'observabilidad'],
      ['f1.repetitions_to_mastery', 'apoyo'],
      ['f1.life_loss_by_unit_kind', 'apoyo'],
      ['f1.run_completion_rate', 'observabilidad'],
      ['f1.run_improvement_delta', 'promocion'],
      ['f1.alphabet_order_success', 'apoyo'],
      ['f1.low_frequency_key_friction', 'observabilidad'],
      ['f1.error_recovery_pattern', 'apoyo'],
      ['f1.population_consistency', 'promocion']
    ]);
    this.f2SignalClassMap = new Map<string, SignalClass>([
      ['f2.reaction_latency_ms', 'observabilidad'],
      ['f2.pressure_error_rate', 'observabilidad'],
      ['f2.drop_pattern', 'apoyo'],
      ['f2.multi_target_priority', 'apoyo'],
      ['f2.combo_recovery_rate', 'apoyo'],
      ['f2.speed_accuracy_tradeoff', 'promocion'],
      ['f2.panic_backspace_rate', 'promocion'],
      ['f2.late_commit_rate', 'promocion'],
      ['f2.streak_sustain_time', 'apoyo'],
      ['f2.cascade_failure_count', 'promocion']
    ]);
    this.f3SignalClassMap = new Map<string, SignalClass>([
      ['f3.chunk_length_mean', 'observabilidad'],
      ['f3.rhythm_stability', 'observabilidad'],
      ['f3.pause_at_boundary', 'apoyo'],
      ['f3.sequencing_error_rate', 'apoyo'],
      ['f3.flow_break_count', 'apoyo'],
      ['f3.anticipation_latency', 'promocion'],
      ['f3.chunking_efficiency', 'promocion'],
      ['f3.continuity_score', 'promocion'],
      ['f3.predictive_acceleration', 'apoyo'],
      ['f3.recovery_after_break', 'apoyo']
    ]);
    this.f4SignalClassMap = new Map<string, SignalClass>([
      ['f4.build_pressure_rate', 'observabilidad'],
      ['f4.partial_completion_rate', 'observabilidad'],
      ['f4.word_assembly_time', 'apoyo'],
      ['f4.salvage_decision_time', 'apoyo'],
      ['f4.abandon_rate', 'apoyo'],
      ['f4.recovery_from_near_loss', 'promocion'],
      ['f4.multi_word_juggle', 'promocion'],
      ['f4.priority_selection_accuracy', 'promocion'],
      ['f4.flow_under_pressure', 'apoyo'],
      ['f4.strategic_abandon_count', 'promocion']
    ]);
    this.f5SignalClassMap = new Map<string, SignalClass>([
      ['f5.semantic_completion_rate', 'observabilidad'],
      ['f5.word_length_tolerance', 'observabilidad'],
      ['f5.phrase_coherence_score', 'apoyo'],
      ['f5.space_handling_accuracy', 'apoyo'],
      ['f5.meaningful_vs_nonsense', 'apoyo'],
      ['f5.expressive_choice_consistency', 'promocion'],
      ['f5.context_switch_cost', 'promocion'],
      ['f5.intentional_typing_score', 'promocion'],
      ['f5.association_strength', 'apoyo'],
      ['f5.fluency_with_meaning', 'promocion']
    ]);
  }

  public static getInstance(): SignalService {
    if (!SignalService.instance) {
      SignalService.instance = new SignalService();
    }
    return SignalService.instance;
  }

  public mapEventToSignals(event: GameEvent): B1Signal[] {
    const signals: B1Signal[] = [];
    const level = this.getLevel(event.levelId);
    const familyId = level?.familyId ?? 1;

    switch (event.type) {
      case 'TUTORIAL_COMPLETED':
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: `game.typing_foundations.f${familyId}.tutorial_completed`
        }));
        break;

      case 'KEY_SUBMITTED':
        // B1 no emite señal para key_submitted (solo evento runtime local).
        break;

      case 'KEY_VALIDATED':
        const { isCorrect, latencyMs } = event.payload;
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: `game.typing_foundations.f${familyId}.${isCorrect ? 'key_correct' : 'key_incorrect'}`
        }));
        signals.push(this.createSignal('interaction.response_latency_ms', {
          value: latencyMs
        }));
        // Map family-specific signals
        if (familyId === 1) this.mapF1KeyValidatedSignals(event, signals);
        if (familyId === 2) this.mapF2KeyValidatedSignals(event, signals);
        if (familyId === 3) this.mapF3KeyValidatedSignals(event, signals);
        if (familyId === 4) this.mapF4KeyValidatedSignals(event, signals);
        if (familyId === 5) this.mapF5KeyValidatedSignals(event, signals);
        break;

      case 'LEVEL_COMPLETED':
        if (event.payload.passed) {
          signals.push(this.createSignal('feature.resolution_kind_usage', {
            resolutionKind: 'alphabet_sequence_candidate'
          }));
        }
        // Map family-specific level completed signals
        if (familyId === 1) this.mapF1LevelCompletedSignals(event, signals);
        if (familyId === 2) this.mapF2LevelCompletedSignals(event, signals);
        if (familyId === 3) this.mapF3LevelCompletedSignals(event, signals);
        if (familyId === 4) this.mapF4LevelCompletedSignals(event, signals);
        if (familyId === 5) this.mapF5LevelCompletedSignals(event, signals);
        break;

      case 'UNIT_FAILED':
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: `game.typing_foundations.f${familyId}.unit_failed`
        }));
        // Map family-specific unit failed signals
        if (familyId === 1) this.mapF1UnitFailedSignals(event, signals);
        if (familyId === 2) this.mapF2UnitFailedSignals(event, signals);
        if (familyId === 4) this.mapF4UnitFailedSignals(event, signals);
        break;

      case 'SESSION_COMPLETED':
        signals.push(this.createSignal('interaction.session_turn_count', {
          value: event.payload.turn_count_total
        }));
        signals.push(this.createSignal('reliability.insufficient_evidence_count', {
          value: event.payload.insufficient_evidence_count ?? 0
        }));
        signals.push(this.createSignal('reliability.fallback_path_used', {
          used: Boolean(event.payload.fallback_used)
        }));
        signals.push(this.createSignal('feature.resolver_id_usage', {
          resolverId: 'game.typing_foundations'
        }));
        // Map family-specific session signals
        if (familyId === 1) this.mapF1SessionSignals(event, signals);
        if (familyId === 2) this.mapF2SessionSignals(event, signals);
        if (familyId === 3) this.mapF3SessionSignals(event, signals);
        if (familyId === 4) this.mapF4SessionSignals(event, signals);
        if (familyId === 5) this.mapF5SessionSignals(event, signals);
        break;
    }

    return signals;
  }

  private mapF1KeyValidatedSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    const expected = String(payload.expectedChar ?? '').toLowerCase();
    const typed = String(payload.key ?? '').toLowerCase();
    const target = String(payload.target ?? '').toLowerCase();
    const inputBefore = String(payload.inputBefore ?? '');
    const isCorrect = Boolean(payload.isCorrect);
    const livesBefore = Number(payload.livesBefore ?? 0);
    const livesAfter = Number(payload.livesAfter ?? 0);
    const unitAttempts = typeof payload.unitAttempts === 'number' ? payload.unitAttempts : null;
    const wasRecovery = Boolean(payload.wasRecovery);
    const latencyMs = Number(payload.latencyMs ?? 0);

    if (!isCorrect && expected) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f1.key_error_by_key',
        expected,
        typed
      }, true));

      const keyMapping = getKeyMapping(expected);
      if (keyMapping) {
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.key_error_by_row',
          row: keyMapping.row
        }, true));
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.key_error_by_hand',
          hand: keyMapping.hand
        }, true));
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.finger_hint_mismatch',
          finger: keyMapping.finger
        }, true));
      }

      if (this.isNeighborKey(expected, typed)) {
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.neighbor_confusion',
          expected,
          typed
        }, true));
      }

      if (inputBefore.length > 0) {
        const fromChar = target[inputBefore.length - 1] ?? null;
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.transition_break',
          from: fromChar,
          to: expected
        }, true));
      }

      if (this.verticalPatternSet.has(target)) {
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.vertical_column_friction',
          pattern: target
        }, true));
      }

      if (this.mirrorPatternSet.has(target)) {
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.bilateral_mirror_friction',
          pattern: target
        }, true));
      }

      if (this.lowFrequencyKeySet.has(expected)) {
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.low_frequency_key_friction',
          key: expected
        }, true));
      }
    }

    if (isCorrect && inputBefore.length === 0 && Number.isFinite(latencyMs)) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f1.time_to_first_success',
        latencyMs
      }, true));
    }

    if (event.payload?.isUnitComplete && unitAttempts != null) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f1.repetitions_to_mastery',
        unitAttempts
      }, true));
      if (this.basePatternSet.has(target)) {
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'f1.base_pattern_mastery',
          pattern: target
        }, true));
      }
    }

    if (livesAfter < livesBefore) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f1.life_loss_by_unit_kind',
        unitKind: event.payload?.targetUnitKind ?? 'home_row',
        reason: 'key_error'
      }, true));
    }

    if (wasRecovery) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f1.error_recovery_pattern'
      }, true));
    }
  }

  private mapF1LevelCompletedSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    const passed = Boolean(payload.passed);
    const accuracy = Number(payload.accuracy ?? 0);
    const delta = payload.improvementDelta;

    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f1.run_completion_rate',
      passed,
      accuracy
    }, true));

    if (typeof delta === 'number' && Number.isFinite(delta)) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f1.run_improvement_delta',
        improvementDelta: delta
      }, true));
    }

    if (passed) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f1.alphabet_order_success',
        sublevel: payload.sublevel ?? null
      }, true));
    }
  }

  private mapF1UnitFailedSignals(event: GameEvent, signals: B1Signal[]) {
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f1.life_loss_by_unit_kind',
      unitKind: event.payload?.targetUnitKind ?? 'home_row',
      reason: event.payload?.reason ?? 'timeout'
    }, true));
  }

  private mapF1SessionSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    const topPairs = Array.isArray(payload.top_confusion_pairs) ? payload.top_confusion_pairs : [];

    if (topPairs.length > 0) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f1.population_consistency',
        topPairs
      }, true));
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // F2 SIGNALS — Lluvia de Hojas (Pressure/Reaction)
  // ═══════════════════════════════════════════════════════════════════════

  private mapF2KeyValidatedSignals(event: GameEvent, signals: B1Signal[]) {
    const { isCorrect, latencyMs, combo } = event.payload;
    
    // f2.reaction_latency_ms
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f2.reaction_latency_ms',
      latency: latencyMs,
      isCorrect
    }, true));

    // f2.speed_accuracy_tradeoff
    if (isCorrect) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f2.speed_accuracy_tradeoff',
        latency: latencyMs,
        combo
      }, true));
    }
  }

  private mapF2LevelCompletedSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    const passed = Boolean(payload.passed);
    const accuracy = Number(payload.accuracy ?? 0);

    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f2.streak_sustain_time',
      passed,
      accuracy
    }, true));

    if (passed) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f2.cascade_failure_count',
        sublevel: payload.sublevel ?? null
      }, true));
    }
  }

  private mapF2UnitFailedSignals(event: GameEvent, signals: B1Signal[]) {
    // f2.pressure_error_rate
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f2.pressure_error_rate',
      reason: event.payload?.reason ?? 'timeout',
      mechanic: 'falling'
    }, true));

    // f2.drop_pattern
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f2.drop_pattern',
      target: event.payload?.target ?? null
    }, true));
  }

  private mapF2SessionSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f2.panic_backspace_rate',
      turnCount: payload.turn_count_total ?? 0
    }, true));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // F3 SIGNALS — Sendero de Luz (Rhythm/Chunking)
  // ═══════════════════════════════════════════════════════════════════════

  private mapF3KeyValidatedSignals(event: GameEvent, signals: B1Signal[]) {
    const { isCorrect, latencyMs } = event.payload;

    // f3.rhythm_stability
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f3.rhythm_stability',
      latency: latencyMs,
      isCorrect
    }, true));
  }

  private mapF3LevelCompletedSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    const passed = Boolean(payload.passed);
    const accuracy = Number(payload.accuracy ?? 0);

    // f3.continuity_score
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f3.continuity_score',
      passed,
      accuracy
    }, true));

    // f3.chunking_efficiency
    if (passed) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f3.chunking_efficiency',
        sublevel: payload.sublevel ?? null
      }, true));
    }
  }

  private mapF3SessionSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f3.flow_break_count',
      turnCount: payload.turn_count_total ?? 0
    }, true));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // F4 SIGNALS — Rescate en el Río (Construction under Pressure)
  // ═══════════════════════════════════════════════════════════════════════

  private mapF4KeyValidatedSignals(event: GameEvent, signals: B1Signal[]) {
    const { isCorrect, latencyMs } = event.payload;

    // f4.word_assembly_time
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f4.word_assembly_time',
      latency: latencyMs,
      isCorrect
    }, true));

    // f4.flow_under_pressure
    if (isCorrect) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f4.flow_under_pressure',
        latency: latencyMs
      }, true));
    }
  }

  private mapF4LevelCompletedSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    const passed = Boolean(payload.passed);
    const accuracy = Number(payload.accuracy ?? 0);

    // f4.recovery_from_near_loss
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f4.recovery_from_near_loss',
      passed,
      accuracy
    }, true));

    // f4.priority_selection_accuracy
    if (passed) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f4.priority_selection_accuracy',
        sublevel: payload.sublevel ?? null
      }, true));
    }
  }

  private mapF4UnitFailedSignals(event: GameEvent, signals: B1Signal[]) {
    // f4.build_pressure_rate
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f4.build_pressure_rate',
      reason: event.payload?.reason ?? 'timeout',
      mechanic: 'rescue'
    }, true));

    // f4.partial_completion_rate
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f4.partial_completion_rate',
      target: event.payload?.target ?? null
    }, true));
  }

  private mapF4SessionSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f4.strategic_abandon_count',
      turnCount: payload.turn_count_total ?? 0
    }, true));
  }

  // ═══════════════════════════════════════════════════════════════════════
  // F5 SIGNALS — Jardín de Palabras (Semantic/Expressive)
  // ═══════════════════════════════════════════════════════════════════════

  private mapF5KeyValidatedSignals(event: GameEvent, signals: B1Signal[]) {
    const { isCorrect, latencyMs } = event.payload;

    // f5.semantic_completion_rate
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f5.semantic_completion_rate',
      latency: latencyMs,
      isCorrect
    }, true));

    // f5.word_length_tolerance
    const target = event.payload?.target ?? '';
    if (isCorrect && target.length > 5) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f5.word_length_tolerance',
        wordLength: target.length
      }, true));
    }
  }

  private mapF5LevelCompletedSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    const passed = Boolean(payload.passed);
    const accuracy = Number(payload.accuracy ?? 0);

    // f5.phrase_coherence_score
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f5.phrase_coherence_score',
      passed,
      accuracy
    }, true));

    // f5.expressive_choice_consistency
    if (passed) {
      signals.push(this.createSignal('feature.action_bar_action_usage', {
        action: 'f5.expressive_choice_consistency',
        sublevel: payload.sublevel ?? null
      }, true));
    }
  }

  private mapF5SessionSignals(event: GameEvent, signals: B1Signal[]) {
    const payload = event.payload ?? {};
    
    // f5.context_switch_cost
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f5.context_switch_cost',
      turnCount: payload.turn_count_total ?? 0
    }, true));

    // f5.intentional_typing_score
    signals.push(this.createSignal('feature.action_bar_action_usage', {
      action: 'f5.intentional_typing_score',
      passed: payload.passed ?? false
    }, true));
  }

  private getLevel(levelId: string | null | undefined) {
    if (!levelId) return null;
    return LEVELS.find((level) => level.id === levelId) ?? null;
  }

  private buildKeyCoords(): ReadonlyMap<string, { row: number; col: number }> {
    const map = new Map<string, { row: number; col: number }>();
    KEYBOARD_ROWS.forEach((row, rowIndex) => {
      row.forEach((keyMapping, colIndex) => {
        map.set(keyMapping.key, { row: rowIndex, col: colIndex });
      });
    });
    return map;
  }

  private isNeighborKey(expected: string, typed: string): boolean {
    if (!expected || !typed || expected === typed) return false;
    const a = this.keyCoords.get(expected);
    const b = this.keyCoords.get(typed);
    if (!a || !b) return false;
    return Math.abs(a.row - b.row) <= 1 && Math.abs(a.col - b.col) <= 1;
  }

  private getF1SignalClass(action: string): F1SignalClass {
    return this.f1SignalClassMap.get(action) ?? 'observabilidad';
  }

  private createSignal(type: B1SignalType, payload: Record<string, any>, enrichF1Class = false): B1Signal {
    let nextPayload = payload;
    if (enrichF1Class && typeof payload.action === 'string' && payload.action.startsWith('f1.')) {
      const signalClass = this.getF1SignalClass(payload.action);
      nextPayload = {
        ...payload,
        signal_class: signalClass,
        promotion_eligible: signalClass === 'promocion'
      };
    }
    // Also enrich F2-F5 signals with class info
    if (enrichF1Class && typeof payload.action === 'string') {
      const action = payload.action as string;
      if (action.startsWith('f2.')) {
        const signalClass = this.f2SignalClassMap.get(action) ?? 'observabilidad';
        nextPayload = {
          ...nextPayload,
          signal_class: signalClass,
          promotion_eligible: signalClass === 'promocion'
        };
      } else if (action.startsWith('f3.')) {
        const signalClass = this.f3SignalClassMap.get(action) ?? 'observabilidad';
        nextPayload = {
          ...nextPayload,
          signal_class: signalClass,
          promotion_eligible: signalClass === 'promocion'
        };
      } else if (action.startsWith('f4.')) {
        const signalClass = this.f4SignalClassMap.get(action) ?? 'observabilidad';
        nextPayload = {
          ...nextPayload,
          signal_class: signalClass,
          promotion_eligible: signalClass === 'promocion'
        };
      } else if (action.startsWith('f5.')) {
        const signalClass = this.f5SignalClassMap.get(action) ?? 'observabilidad';
        nextPayload = {
          ...nextPayload,
          signal_class: signalClass,
          promotion_eligible: signalClass === 'promocion'
        };
      }
    }
    
    const signal: B1Signal = {
      signal_id: crypto.randomUUID(),
      signal_type: type,
      schema_version: 'v1',
      payload: nextPayload,
      runtime_mode: this.runtimeMode,
      app_version: APP_VERSION,
      emitted_at: new Date().toISOString()
    };

    // Dev mode logging for signal verification
    if (typeof window !== 'undefined' && (window as any).DEBUG_SIGNALS) {
      console.log('[SignalService] Signal emitted:', {
        type: signal.signal_type,
        action: (signal.payload as any).action,
        class: (signal.payload as any).signal_class,
        promotion_eligible: (signal.payload as any).promotion_eligible
      });
    }

    return signal;
  }
}
