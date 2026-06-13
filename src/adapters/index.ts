/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameEvent, GameProgress, LevelId, DifficultyMode } from '../types/game';
import { B1Signal } from '../types/game';
import type { GameHostAdapter } from './WithIframeAdapter';
import type { GameEventEmitter } from './WithSignalEmitter';
import { WithIframeAdapter } from './WithIframeAdapter';
import { WithIframeSignalEmitter } from './WithSignalEmitter';

const DEBUG_GAME_EVENTS = import.meta.env.VITE_DEBUG_GAME_EVENTS === 'true';
const STORAGE_KEY = 'typing-foundations-progress';
const DIFFICULTY_KEY = 'typing-foundations-difficulty';

// Re-export interfaces desde los archivos individuales
export type { GameHostAdapter } from './WithIframeAdapter';
export type { GameEventEmitter } from './WithSignalEmitter';

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
    const allLevelIds: LevelId[] = Array.from({ length: 60 }, (_, i) => `L${i + 1}` as LevelId);
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

// Re-export adapters para modo embedded
export { WithIframeAdapter } from './WithIframeAdapter';
export { WithIframeSignalEmitter } from './WithSignalEmitter';

/**
 * Resultado de la factory de adapters.
 */
export interface AdapterPair {
  hostAdapter: GameHostAdapter;
  eventEmitter: GameEventEmitter;
}

/**
 * Factory para detectar modo de ejecución y crear adapters apropiados.
 * Detecta surface=universo_with en query params para usar el adapter de iframe.
 */
export function createAdaptersForSurface(): AdapterPair {
  const urlParams = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search) 
    : null;
  
  const surface = urlParams?.get('surface');
  
  if (surface === 'universo_with') {
    // Modo embedded: usar adapters reales de iframe
    console.log('[createAdaptersForSurface] Detected embedded mode (surface=universo_with)');
    return {
      hostAdapter: new WithIframeAdapter(),
      eventEmitter: new WithIframeSignalEmitter()
    };
  }
  
  // Modo standalone: usar mocks/console
  console.log('[createAdaptersForSurface] Detected standalone mode');
  return {
    hostAdapter: new MockHostAdapter(),
    eventEmitter: new ConsoleEventEmitter()
  };
}
