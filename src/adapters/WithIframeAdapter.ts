/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { GameProgress, LevelId, DifficultyMode, GameEvent } from '../types/game';

const STORAGE_KEY = 'typing-foundations-progress';
const DIFFICULTY_KEY = 'typing-foundations-difficulty';

/**
 * Host adapter para modo embedded en Universo WITH.
 * Usa localStorage como fallback, pero prioriza comunicación por postMessage.
 */
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

export class WithIframeAdapter implements GameHostAdapter {
  private progress: GameProgress;
  private difficulty: DifficultyMode = 'easy';
  private hostOrigin: string | null = null;

  constructor() {
    this.progress = WithIframeAdapter.loadFromStorage();
    this.difficulty = WithIframeAdapter.loadDifficulty();
    this.listenForHostContext();
  }

  private static loadFromStorage(): GameProgress {
    const allLevelIds: LevelId[] = Array.from({ length: 60 }, (_, i) => `L${i + 1}` as LevelId);
    return { unlockedLevels: allLevelIds, levelScores: {}, totalAccuracy: 0 };
  }

  private static loadDifficulty(): DifficultyMode {
    try {
      const raw = localStorage.getItem(DIFFICULTY_KEY);
      if (raw && (raw === 'easy' || raw === 'normal' || raw === 'hard')) {
        return raw as DifficultyMode;
      }
    } catch { /* ignore */ }
    return 'easy';
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch { /* quota exceeded */ }
  }

  /** Escucha with:host_context del host para validar origin */
  private listenForHostContext() {
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'with:host_context') {
        this.hostOrigin = event.origin;
        console.log('[WithIframeAdapter] Host context received from:', event.origin);
      }
    });
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
    } catch { /* quota exceeded */ }
  }

  onGameEvent(event: GameEvent) {
    // Solo logging local en modo embedded - las señales van por emitSignal
    console.log('[WithIframeAdapter] Game event:', event.type);
  }

  async onProgressUpdate(progress: GameProgress) {
    this.progress = progress;
    this.saveToStorage();
    
    // Opcional: notificar al host si hay progreso significativo
    if (this.hostOrigin) {
      window.parent.postMessage(
        { 
          type: 'with-typing:progress_update', 
          payload: { progress } 
        },
        this.hostOrigin || '*'
      );
    }
  }

  async getLeaderboard() {
    // TODO: Implementar cuando el host provea leaderboard real
    return [
      { playerHandle: 'Player_One', score: 1200, rank: 1 },
      { playerHandle: 'Typist_X', score: 1100, rank: 2 },
      { playerHandle: 'Key_Master', score: 950, rank: 3 }
    ];
  }
}
