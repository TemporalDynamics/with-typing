/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameEvent, B1Signal, B1SignalType, F1SignalClass } from '../types/game';
import { LEVELS } from '../engine/LevelDefinitions';
import { KEYBOARD_ROWS, getKeyMapping } from '../engine/KeyboardMap';

const APP_VERSION = '1.0.0';

export class SignalService {
  private static instance: SignalService;
  private runtimeMode: 'local_strict' | 'hybrid' = 'local_strict';
  private keyCoords: ReadonlyMap<string, { row: number; col: number }>;
  private basePatternSet: ReadonlySet<string>;
  private verticalPatternSet: ReadonlySet<string>;
  private mirrorPatternSet: ReadonlySet<string>;
  private lowFrequencyKeySet: ReadonlySet<string>;
  private f1SignalClassMap: ReadonlyMap<string, F1SignalClass>;

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
    const isF1Level = level?.familyId === 1;

    switch (event.type) {
      case 'TUTORIAL_COMPLETED':
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: 'game.typing_foundations.l1.tutorial_completed'
        }));
        break;

      case 'KEY_SUBMITTED':
        // B1 no emite señal para key_submitted (solo evento runtime local).
        break;

      case 'KEY_VALIDATED':
        const { isCorrect, latencyMs } = event.payload;
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: `game.typing_foundations.${String(event.levelId).toLowerCase()}.${isCorrect ? 'key_correct' : 'key_incorrect'}`
        }));
        signals.push(this.createSignal('interaction.response_latency_ms', {
          value: latencyMs
        }));
        if (isF1Level) {
          this.mapF1KeyValidatedSignals(event, signals);
        }
        break;

      case 'LEVEL_COMPLETED':
        if (event.payload.passed) {
          signals.push(this.createSignal('feature.resolution_kind_usage', {
            resolutionKind: 'alphabet_sequence_candidate'
          }));
        }
        if (isF1Level) {
          this.mapF1LevelCompletedSignals(event, signals);
        }
        break;

      case 'UNIT_FAILED':
        signals.push(this.createSignal('feature.action_bar_action_usage', {
          action: `game.typing_foundations.${String(event.levelId).toLowerCase()}.unit_failed`
        }));
        if (isF1Level) {
          this.mapF1UnitFailedSignals(event, signals);
        }
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
        if (isF1Level) {
          this.mapF1SessionSignals(event, signals);
        }
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
    return {
      signal_id: crypto.randomUUID(),
      signal_type: type,
      schema_version: 'v1',
      payload: nextPayload,
      runtime_mode: this.runtimeMode,
      app_version: APP_VERSION,
      emitted_at: new Date().toISOString()
    };
  }
}
