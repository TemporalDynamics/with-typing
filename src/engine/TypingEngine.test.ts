import assert from 'node:assert/strict';
import {test} from 'node:test';

import {TypingEngine} from './TypingEngine';
import type {LevelDefinition} from '../types/game';

const baseLevel: LevelDefinition = {
  id: 'L1',
  familyId: 1,
  familyTitle: 'Test Family',
  sublevel: 1,
  title: 'Test Level',
  objective: 'Exercise a single target',
  targetUnitKind: 'home_row',
  content: ['ab'],
  minAccuracy: 0.8,
  minInputs: 2,
  backgroundUrl: '',
  colorTheme: 'emerald',
  mechanic: 'tutorial',
  fallDurationSec: 10,
};

test('hard mode starts with fewer lives and applies the extra error penalty', () => {
  const engine = new TypingEngine(baseLevel, 'hard');

  assert.equal(engine.getMaxLives(), 3);
  assert.equal(engine.getLives(), 3);
  assert.equal(engine.getAdjustedFallDuration(), 7);

  const firstMiss = engine.submitKey('x');
  assert.equal(firstMiss.isCorrect, false);
  assert.equal(firstMiss.lives, 1);
  assert.equal(firstMiss.combo, 0);
  assert.equal(firstMiss.requiresEnter, true);

  const secondMiss = engine.submitKey('x');
  assert.equal(secondMiss.lives, 0);
  assert.equal(engine.getLives(), 0);
});

test('hard mode requires Enter after the target is typed before completing the level', () => {
  const engine = new TypingEngine(baseLevel, 'hard');

  const first = engine.submitKey('a');
  const second = engine.submitKey('b');

  assert.equal(first.isUnitComplete, false);
  assert.equal(second.isCorrect, true);
  assert.equal(second.isUnitComplete, false);
  assert.equal(second.isLevelComplete, false);
  assert.equal(second.requiresEnter, true);
  assert.equal(engine.getInput(), 'ab');

  const enter = engine.submitEnter();
  assert.deepEqual(enter, {isUnitComplete: true, isLevelComplete: true});
});

test('external phrase completion records phrase length as successful input and completes the level', () => {
  const engine = new TypingEngine(baseLevel, 'normal');

  const result = engine.completeExternalUnit(4);
  const metrics = engine.getMetrics();

  assert.equal(result.isLevelComplete, true);
  assert.equal(result.combo, 4);
  assert.equal(result.lives, 5);
  assert.equal(metrics.correctCount, 4);
  assert.equal(metrics.totalCount, 4);
  assert.equal(metrics.accuracy, 1);
  assert.equal(engine.getProgress(), 100);
});
