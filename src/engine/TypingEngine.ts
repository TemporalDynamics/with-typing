/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LevelDefinition, TargetUnitKind, DifficultyMode } from '../types/game';

export interface TypingMetrics {
  accuracy: number;
  wpm: number;
  latencyMs: number;
  correctCount: number;
  totalCount: number;
  combo: number;
  lives: number;
}

export class TypingEngine {
  private currentLevel: LevelDefinition;
  private difficultyMode: DifficultyMode = 'easy';
  private currentContentIndex: number = 0;
  private currentTarget: string = '';
  private currentInput: string = '';
  private startTime: number = 0;
  private lastInputTime: number = 0;
  private correctCount: number = 0;
  private totalCount: number = 0;
  private latencies: number[] = [];
  private combo: number = 0;
  private lives: number = 5;
  /** Shuffled queue of targets, recycled until minInputs is met. */
  private targetQueue: string[] = [];
  private queueIndex: number = 0;

  constructor(level: LevelDefinition, difficultyMode: DifficultyMode = 'easy') {
    this.currentLevel = level;
    this.difficultyMode = difficultyMode;
    this.reset();
  }

  /** Fisher-Yates shuffle (non-mutating). */
  private static shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /**
   * Build a target queue long enough to require at least minInputs keystrokes.
   * For single-char content each item = 1 keystroke; for multi-char, each item
   * = item.length keystrokes.  We repeat+shuffle the content pool until we have
   * enough, so the user sees varied order each run.
   */
  private buildQueue(): string[] {
    const pool = this.currentLevel.content;
    const minInputs = this.currentLevel.minInputs;
    const queue: string[] = [];
    let totalKeystrokes = 0;
    while (totalKeystrokes < minInputs) {
      const batch = TypingEngine.shuffle(pool);
      for (const item of batch) {
        queue.push(item);
        totalKeystrokes += item.length;
        if (totalKeystrokes >= minInputs) break;
      }
    }
    return queue;
  }

  public reset() {
    this.targetQueue = this.buildQueue();
    this.queueIndex = 0;
    this.currentContentIndex = 0;
    this.currentTarget = this.targetQueue[0];
    this.currentInput = '';
    this.startTime = Date.now();
    this.lastInputTime = Date.now();
    this.correctCount = 0;
    this.totalCount = 0;
    this.latencies = [];
    this.combo = 0;
    this.lives = 5;
  }

  public submitKey(key: string): {
    isCorrect: boolean;
    latencyMs: number;
    isUnitComplete: boolean;
    isLevelComplete: boolean;
    lives: number;
    combo: number;
    expectedChar: string;
    target: string;
    inputBefore: string;
    inputAfter: string;
    requiresEnter: boolean;
  } {
    const now = Date.now();
    const latencyMs = now - this.lastInputTime;
    this.lastInputTime = now;

    const targetBefore = this.currentTarget;
    const inputBefore = this.currentInput;
    const expectedChar = this.currentTarget[this.currentInput.length];
    const isCorrect = key === expectedChar;

    this.totalCount++;
    if (isCorrect) {
      this.correctCount++;
      this.currentInput += key;
      this.combo++;
      this.latencies.push(latencyMs);
    } else {
      this.combo = 0;
      this.lives = Math.max(0, this.lives - 1);
    }

    const isUnitComplete = this.currentInput === this.currentTarget;
    let isLevelComplete = false;
    
    // In easy mode, unit completes automatically
    // In normal/hard mode, user must press Enter
    const requiresEnter = this.difficultyMode !== 'easy';
    const shouldCompleteUnit = isUnitComplete && (!requiresEnter);

    if (shouldCompleteUnit) {
      this.queueIndex++;
      this.currentContentIndex++;
      if (this.queueIndex < this.targetQueue.length) {
        this.currentTarget = this.targetQueue[this.queueIndex];
        this.currentInput = '';
      } else {
        isLevelComplete = true;
      }
    }

    return {
      isCorrect,
      latencyMs,
      isUnitComplete: shouldCompleteUnit,
      isLevelComplete,
      lives: this.lives,
      combo: this.combo,
      expectedChar,
      target: targetBefore,
      inputBefore,
      inputAfter: this.currentInput,
      requiresEnter
    };
  }

  /** Submit unit completion with Enter key (for normal/hard modes) */
  public submitEnter(): {
    isUnitComplete: boolean;
    isLevelComplete: boolean;
  } {
    const isUnitComplete = this.currentInput === this.currentTarget;
    let isLevelComplete = false;

    if (isUnitComplete) {
      this.queueIndex++;
      this.currentContentIndex++;
      if (this.queueIndex < this.targetQueue.length) {
        this.currentTarget = this.targetQueue[this.queueIndex];
        this.currentInput = '';
      } else {
        isLevelComplete = true;
      }
    }

    return { isUnitComplete, isLevelComplete };
  }

  public failUnit() {
    this.lives = Math.max(0, this.lives - 1);
    this.combo = 0;
    this.queueIndex++;
    this.currentContentIndex++;
    if (this.queueIndex < this.targetQueue.length) {
      this.currentTarget = this.targetQueue[this.queueIndex];
      this.currentInput = '';
    }
  }

  public getMetrics(): TypingMetrics {
    const accuracy = this.totalCount > 0 ? this.correctCount / this.totalCount : 1;
    const avgLatency = this.latencies.length > 0 ? this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length : 0;
    const timeInMinutes = (Date.now() - this.startTime) / 60000;
    const wpm = timeInMinutes > 0 ? (this.correctCount / 5) / timeInMinutes : 0;

    return {
      accuracy,
      wpm,
      latencyMs: avgLatency,
      correctCount: this.correctCount,
      totalCount: this.totalCount,
      combo: this.combo,
      lives: this.lives
    };
  }

  public getTarget() { return this.currentTarget; }
  public getInput() { return this.currentInput; }
  public getProgress() { return (this.queueIndex / this.targetQueue.length) * 100; }
  public getLives() { return this.lives; }
  public getCombo() { return this.combo; }

  public rewardLife(maxLives: number = 5) {
    this.lives = Math.min(maxLives, this.lives + 1);
    return this.lives;
  }
}
