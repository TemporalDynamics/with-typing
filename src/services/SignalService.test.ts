import assert from 'node:assert/strict';
import {test} from 'node:test';

import {SignalService} from './SignalService';
import type {B1Signal, GameEvent} from '../types/game';

function event(overrides: Partial<GameEvent>): GameEvent {
  return {
    type: 'LEVEL_COMPLETED',
    levelId: 'L51',
    runId: 'run-test',
    sessionId: 'session-test',
    payload: {},
    timestamp: 1,
    ...overrides,
  };
}

function findAction(signals: B1Signal[], action: string): B1Signal | undefined {
  return signals.find((signal) => signal.payload.action === action);
}

test('F6 level completion emits passed choice and creative phrase signals', () => {
  const signals = SignalService.getInstance().mapEventToSignals(event({
    payload: {
      accuracy: 1,
      passed: true,
      sublevel: 1,
      completedPhrase: 'un hogar cálido',
    },
  }));

  const expressiveChoice = findAction(signals, 'f6.expressive_choice_completion');
  const creativePhrase = findAction(signals, 'f6.creative_phrase_completion');
  const resolution = signals.find((signal) => signal.signal_type === 'feature.resolution_kind_usage');

  assert.ok(expressiveChoice);
  assert.equal(expressiveChoice.payload.passed, true);
  assert.equal(expressiveChoice.payload.sublevel, 1);
  assert.equal(expressiveChoice.payload.signal_class, 'promocion');
  assert.equal(expressiveChoice.payload.promotion_eligible, true);

  assert.ok(creativePhrase);
  assert.equal(creativePhrase.payload.phraseLength, 'un hogar cálido'.length);
  assert.equal(creativePhrase.payload.signal_class, 'apoyo');
  assert.equal(creativePhrase.payload.promotion_eligible, false);

  assert.ok(resolution);
});

test('F6 level completion keeps passed false and withholds creative phrase signal on failure', () => {
  const signals = SignalService.getInstance().mapEventToSignals(event({
    payload: {
      accuracy: 0.25,
      passed: false,
      sublevel: 2,
      completedPhrase: 'muchas ventanas',
    },
  }));

  const expressiveChoice = findAction(signals, 'f6.expressive_choice_completion');

  assert.ok(expressiveChoice);
  assert.equal(expressiveChoice.payload.passed, false);
  assert.equal(expressiveChoice.payload.sublevel, 2);
  assert.equal(findAction(signals, 'f6.creative_phrase_completion'), undefined);
  assert.equal(signals.some((signal) => signal.signal_type === 'feature.resolution_kind_usage'), false);
});

test('F6 session signal preserves criterion-following passed state', () => {
  const signals = SignalService.getInstance().mapEventToSignals(event({
    type: 'SESSION_COMPLETED',
    payload: {
      turn_count_total: 14,
      insufficient_evidence_count: 0,
      fallback_used: false,
      passed: true,
    },
  }));

  const criterion = findAction(signals, 'f6.criterion_following_accuracy');

  assert.ok(criterion);
  assert.equal(criterion.payload.passed, true);
  assert.equal(criterion.payload.signal_class, 'promocion');
  assert.equal(criterion.payload.promotion_eligible, true);
});

test('F2 speed-accuracy signal prefers comboAfter over legacy combo', () => {
  const signals = SignalService.getInstance().mapEventToSignals(event({
    type: 'KEY_VALIDATED',
    levelId: 'L11',
    payload: {
      key: 'a',
      isCorrect: true,
      latencyMs: 120,
      combo: 2,
      comboAfter: 7,
    },
  }));

  const speedAccuracy = findAction(signals, 'f2.speed_accuracy_tradeoff');

  assert.ok(speedAccuracy);
  assert.equal(speedAccuracy.payload.combo, 7);
  assert.equal(speedAccuracy.payload.signal_class, 'promocion');
  assert.equal(speedAccuracy.payload.promotion_eligible, true);
});
