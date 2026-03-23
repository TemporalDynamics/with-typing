/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameEvent, GameProgress, LevelId, DifficultyMode } from '../types/game';
import { B1Signal } from '../types/game';

const DEBUG_GAME_EVENTS = import.meta.env.VITE_DEBUG_GAME_EVENTS === 'true';
const STORAGE_KEY = 'typing-foundations-progress';
const DIFFICULTY_KEY = 'typing-foundations-difficulty';

export interface GameHostAdapter {
  getInitialState(): Promise<{
    playerHandle: string;
    unlockedLevels: LevelId[];
    lastProgress?: GameProgress;
    difficultyMode?: DifficultyMode;
  }>;
  onGameEvent(event: GameEvent): void;
  onProgressUpdate(progress: GameProgress): Promise<void>;
  getLeaderboard(): Promise<any[]>;
  saveDifficulty(mode: DifficultyMode): Promise<void>;
}

export interface GameEventEmitter {
  emitSignal(signal: B1Signal): void;
}

/**
 * Mock implementation for standalone mode — persists to localStorage.
 */
export class MockHostAdapter implements GameHostAdapter {
  private progress: GameProgress;
  private difficulty: DifficultyMode = 'easy';

  constructor() {
    this.progress = MockHostAdapter.loadFromStorage();
    this.difficulty = MockHostAdapter.loadDifficulty();
  }

  private static loadFromStorage(): GameProgress {
    // DEV MODE: Always unlock all levels for testing/analysis
    const allLevelIds: LevelId[] = Array.from({ length: 50 }, (_, i) => `L${i + 1}` as LevelId);
    return { unlockedLevels: allLevelIds, levelScores: {}, totalAccuracy: 0 };
    /*
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as GameProgress;
        if (parsed.unlockedLevels?.length) return parsed;
      }
    } catch {
      // ignore corrupt data
    }
    return { unlockedLevels: ['L1'], levelScores: {}, totalAccuracy: 0 };
    */
  }

  private static loadDifficulty(): DifficultyMode {
    try {
      const raw = localStorage.getItem(DIFFICULTY_KEY);
      if (raw && (raw === 'easy' || raw === 'normal' || raw === 'hard')) {
        return raw as DifficultyMode;
      }
    } catch {
      // ignore corrupt data
    }
    return 'easy';
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch { /* quota exceeded — best effort */ }
  }

  async getInitialState() {
    return {
      playerHandle: 'Player_One',
      unlockedLevels: this.progress.unlockedLevels,
      lastProgress: this.progress,
      difficultyMode: this.difficulty
    };
  }

  async saveDifficulty(mode: DifficultyMode) {
    this.difficulty = mode;
    try {
      localStorage.setItem(DIFFICULTY_KEY, mode);
    } catch { /* quota exceeded — best effort */ }
  }

  onGameEvent(event: GameEvent) {
    if (DEBUG_GAME_EVENTS) {
      console.log('[MockHost] Event:', event.type, event.payload);
    }
  }

  async onProgressUpdate(progress: GameProgress) {
    this.progress = progress;
    this.saveToStorage();
    if (DEBUG_GAME_EVENTS) {
      console.log('[MockHost] Progress updated:', progress);
    }
  }

  async getLeaderboard() {
    return [
      { playerHandle: 'Player_One', score: 1200, rank: 1 },
      { playerHandle: 'Typist_X', score: 1100, rank: 2 },
      { playerHandle: 'Key_Master', score: 950, rank: 3 }
    ];
  }
}

export class ConsoleEventEmitter implements GameEventEmitter {
  emitSignal(signal: B1Signal) {
    if (DEBUG_GAME_EVENTS) {
      console.log('[ConsoleEmitter] Signal Emitted:', signal.signal_type, signal.payload);
    }
  }
}
