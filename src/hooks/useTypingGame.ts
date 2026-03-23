/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { TypingEngine } from '../engine/TypingEngine';
import { LEVELS } from '../engine/LevelDefinitions';
import { GameHostAdapter, GameEventEmitter, MockHostAdapter, ConsoleEventEmitter } from '../adapters';
import { GameState, GameProgress, GameEvent, LevelId, LevelScore, DifficultyMode } from '../types/game';
import { SignalService } from '../services/SignalService';
import { soundService } from '../services/soundService';

const MAX_LIVES = 5;
const DEFAULT_DIFFICULTY: DifficultyMode = 'easy';

/** Cross-family unlock gates.
 *  Key = familyId that becomes accessible, Value = level that triggers the unlock.
 *  When the user completes the gate level, they unlock:
 *  - All remaining levels in the current family
 *  - The first level of the next family
 */
const FAMILY_UNLOCK_GATES: Record<number, LevelId> = {
  2: 'L3',   // Complete F1.3 → unlock rest of F1 (L4-L10) + F2 (L11)
  3: 'L13',  // Complete F2.3 → unlock rest of F2 (L14-L20) + F3 (L21)
  4: 'L23',  // Complete F3.3 → unlock rest of F3 (L24-L30) + F4 (L31)
  5: 'L33',  // Complete F4.3 → unlock rest of F4 (L34-L40) + F5 (L41)
};

/** Get all levels belonging to a family */
function getLevelsByFamily(familyId: number): LevelId[] {
  return LEVELS.filter(l => l.familyId === familyId).map(l => l.id);
}

/** Get the familyId of a given level */
function getFamilyOfLevel(levelId: LevelId): number | null {
  const level = LEVELS.find(l => l.id === levelId);
  return level?.familyId ?? null;
}

function computeStars(accuracy: number, minAccuracy: number): 0 | 1 | 2 | 3 {
  if (accuracy < minAccuracy) return 0;
  if (accuracy >= 0.95) return 3;
  if (accuracy >= 0.90) return 2;
  return 1;
}

function getFirstLevelOfFamily(familyId: number): LevelId | null {
  const level = LEVELS.find(l => l.familyId === familyId);
  return level?.id ?? null;
}

export function useTypingGame(
  hostAdapter?: GameHostAdapter,
  eventEmitter?: GameEventEmitter
) {
  const resolvedHostAdapter = useMemo(
    () => hostAdapter ?? new MockHostAdapter(),
    [hostAdapter]
  );
  const resolvedEventEmitter = useMemo(
    () => eventEmitter ?? new ConsoleEventEmitter(),
    [eventEmitter]
  );

  const [gameState, setGameState] = useState<GameState>({
    currentLevelId: null,
    status: 'LOBBY',
    score: 0,
    accuracy: 0,
    progress: 0,
    playerHandle: 'Player',
    lives: 5,
    combo: 0,
    difficultyMode: DEFAULT_DIFFICULTY
  });

  const [unlockedLevels, setUnlockedLevels] = useState<LevelId[]>(['L1']);
  const [levelScores, setLevelScores] = useState<Partial<Record<LevelId, LevelScore>>>({});
  const [wilting, setWilting] = useState(false);
  const [lifeLost, setLifeLost] = useState(false);
  const [difficultyMode, setDifficultyMode] = useState<DifficultyMode>(DEFAULT_DIFFICULTY);
  const engineRef = useRef<TypingEngine | null>(null);
  const sessionId = useRef<string>(crypto.randomUUID());
  const runId = useRef<string>(crypto.randomUUID());
  const sessionTurnCountRef = useRef<number>(0);
  const unitAttemptCountRef = useRef<number>(0);
  const previousWasErrorRef = useRef<boolean>(false);
  const runConfusionPairsRef = useRef<Record<string, number>>({});
  const signalService = SignalService.getInstance();

  /** Persist progress to storage */
  const persistProgress = useCallback((scores: typeof levelScores, unlocks: typeof unlockedLevels, accuracy: number) => {
    const progress: GameProgress = {
      unlockedLevels: unlocks,
      levelScores: scores,
      totalAccuracy: accuracy
    };
    resolvedHostAdapter.onProgressUpdate(progress).catch(() => {
      // Best-effort progress persistence.
    });
  }, [resolvedHostAdapter]);

  useEffect(() => {
    const init = async () => {
      const initialState = await resolvedHostAdapter.getInitialState();
      setGameState(prev => ({ ...prev, playerHandle: initialState.playerHandle }));
      setUnlockedLevels(initialState.unlockedLevels);
      if (initialState.lastProgress?.levelScores) {
        setLevelScores(initialState.lastProgress.levelScores);
      }
      if (initialState.difficultyMode) {
        setDifficultyMode(initialState.difficultyMode);
      }
    };
    init();
  }, [resolvedHostAdapter]);

  // Persist difficulty when it changes
  useEffect(() => {
    resolvedHostAdapter.saveDifficulty(difficultyMode).catch(() => {
      // Best-effort persistence
    });
  }, [difficultyMode, resolvedHostAdapter]);

  const emitSignals = useCallback((event: GameEvent) => {
    const signals = signalService.mapEventToSignals(event);
    signals.forEach(s => resolvedEventEmitter.emitSignal(s));
  }, [resolvedEventEmitter, signalService]);

  const startLevel = useCallback((levelId: LevelId) => {
    const level = LEVELS.find(l => l.id === levelId)!;
    engineRef.current = new TypingEngine(level, difficultyMode);
    runId.current = crypto.randomUUID();
    sessionTurnCountRef.current = 0;
    unitAttemptCountRef.current = 0;
    previousWasErrorRef.current = false;
    runConfusionPairsRef.current = {};
    setWilting(false);
    setGameState(prev => ({
      ...prev,
      currentLevelId: levelId,
      status: 'PLAYING',
      score: 0,
      accuracy: 0,
      progress: 0,
      lives: MAX_LIVES,
      combo: 0,
      difficultyMode
    }));
  }, [difficultyMode]);

  const goToLobby = useCallback(() => {
    setWilting(false);
    setGameState(prev => ({
      ...prev,
      currentLevelId: null,
      status: 'LOBBY',
      progress: 0,
      combo: 0,
      lives: MAX_LIVES,
    }));
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (!engineRef.current || gameState.status !== 'PLAYING') return;

    const submitEvent: GameEvent = {
      type: 'KEY_SUBMITTED',
      levelId: gameState.currentLevelId!,
      runId: runId.current,
      sessionId: sessionId.current,
      payload: { key },
      timestamp: Date.now()
    };
    resolvedHostAdapter.onGameEvent(submitEvent);
    emitSignals(submitEvent);
    sessionTurnCountRef.current += 1;

    const result = engineRef.current.submitKey(key);
    const metrics = engineRef.current.getMetrics();
    const currentLevelDef = LEVELS.find(l => l.id === gameState.currentLevelId);
    unitAttemptCountRef.current += 1;

    // Play key press sounds
    if (result.isCorrect) {
      soundService.playCorrectKey();
      if (result.combo > 0 && result.combo % 5 === 0) {
        soundService.playComboMilestone();
      }
    } else {
      soundService.playIncorrectKey();
      // Wilt garden on error
      if (currentLevelDef?.mechanic === 'garden') {
        setWilting(true);
        setTimeout(() => setWilting(false), 800);
        soundService.playWilt();
      }
    }

    // Trail: play node-complete sound when a unit finishes
    if (result.isUnitComplete && currentLevelDef?.mechanic === 'trail') {
      soundService.playNodeComplete();
    }

    let nextLives = result.lives;
    const lifeRecovered = result.isCorrect && result.combo > 0 && result.combo % engineRef.current.getComboLifeRecovery() === 0 && result.lives < MAX_LIVES;
    if (lifeRecovered) {
      nextLives = engineRef.current.rewardLife(MAX_LIVES);
      soundService.playComboMilestone();
    }

    // Life-loss feedback: flash + sound when a life is lost
    if (nextLives < gameState.lives && !result.isCorrect) {
      soundService.playLifeLoss();
      setLifeLost(true);
      setTimeout(() => setLifeLost(false), 400);
    }

    const event: GameEvent = {
      type: 'KEY_VALIDATED',
      levelId: gameState.currentLevelId!,
      runId: runId.current,
      sessionId: sessionId.current,
      payload: {
        key,
        isCorrect: result.isCorrect,
        latencyMs: result.latencyMs,
        lifeRecovered,
        livesBefore: gameState.lives,
        livesAfter: nextLives,
        comboBefore: gameState.combo,
        comboAfter: result.combo,
        expectedChar: result.expectedChar,
        target: result.target,
        inputBefore: result.inputBefore,
        inputAfter: result.inputAfter,
        unitAttempts: result.isUnitComplete ? unitAttemptCountRef.current : null,
        wasRecovery: previousWasErrorRef.current && result.isCorrect,
        familyId: currentLevelDef?.familyId ?? null,
        sublevel: currentLevelDef?.sublevel ?? null,
        targetUnitKind: currentLevelDef?.targetUnitKind ?? null,
        mechanic: currentLevelDef?.mechanic ?? null
      },
      timestamp: Date.now()
    };

    if (!result.isCorrect) {
      const expected = result.expectedChar?.toLowerCase?.() ?? '';
      const actual = key.toLowerCase();
      if (expected && actual) {
        const pair = `${expected}->${actual}`;
        runConfusionPairsRef.current[pair] = (runConfusionPairsRef.current[pair] ?? 0) + 1;
      }
    }

    if (result.isUnitComplete) {
      unitAttemptCountRef.current = 0;
    }
    previousWasErrorRef.current = !result.isCorrect;

    resolvedHostAdapter.onGameEvent(event);
    emitSignals(event);

    if (result.isUnitComplete && currentLevelDef?.familyId === 1 && engineRef.current.getProgress() < 20) {
      const tutorialEvent: GameEvent = {
        type: 'TUTORIAL_COMPLETED',
        levelId: gameState.currentLevelId!,
        runId: runId.current,
        sessionId: sessionId.current,
        payload: { completed: true },
        timestamp: Date.now()
      };
      resolvedHostAdapter.onGameEvent(tutorialEvent);
      emitSignals(tutorialEvent);
    }

    if (result.isLevelComplete || nextLives === 0) {
      const level = LEVELS.find(l => l.id === gameState.currentLevelId)!;
      const passed = metrics.accuracy >= level.minAccuracy && nextLives > 0;

      if (passed) {
        soundService.playLevelComplete();
      }

      setGameState(prev => ({
        ...prev,
        status: passed ? 'LEVEL_COMPLETE' : 'LOBBY',
        accuracy: metrics.accuracy,
        progress: passed ? 100 : engineRef.current?.getProgress() ?? prev.progress,
        lives: nextLives,
        combo: result.combo,
        score: prev.score + (passed ? 1000 : 0)
      }));

      if (passed) {
        const stars = computeStars(metrics.accuracy, level.minAccuracy);
        const newScore: LevelScore = { bestAccuracy: metrics.accuracy, bestWpm: metrics.wpm, stars };

        // Update level scores and persist immediately
        setLevelScores(prev => {
          const existing = prev[level.id];
          // Keep best values
          const merged: LevelScore = existing
            ? {
                bestAccuracy: Math.max(existing.bestAccuracy, metrics.accuracy),
                bestWpm: Math.max(existing.bestWpm, metrics.wpm),
                stars: Math.max(existing.stars, stars) as 0 | 1 | 2 | 3,
              }
            : newScore;
          
          const updatedScores = { ...prev, [level.id]: merged };
          
          // Persist scores immediately after update
          persistProgress(updatedScores, unlockedLevels, metrics.accuracy);
          
          return updatedScores;
        });

        // Unlock next sequential level
        const currentIndex = LEVELS.findIndex(l => l.id === gameState.currentLevelId);
        const newUnlocks: LevelId[] = [];
        if (currentIndex < LEVELS.length - 1) {
          newUnlocks.push(LEVELS[currentIndex + 1].id);
        }

        // Unlock family gates: completing a gate level unlocks:
        // 1. All remaining levels in the current family
        // 2. The first level of the next family
        for (const [nextFamilyIdStr, gateLevelId] of Object.entries(FAMILY_UNLOCK_GATES)) {
          if (gameState.currentLevelId === gateLevelId) {
            const nextFamilyId = Number(nextFamilyIdStr);
            const currentFamilyId = getFamilyOfLevel(gameState.currentLevelId!);

            // Unlock all remaining levels in current family
            if (currentFamilyId) {
              const currentFamilyLevels = getLevelsByFamily(currentFamilyId);
              const unlockedInCurrentFamily = currentFamilyLevels.filter(id =>
                LEVELS.find(l => l.id === id)!.sublevel <= level.sublevel
              );
              const remainingLevels = currentFamilyLevels.filter(
                id => !unlockedInCurrentFamily.includes(id)
              );
              newUnlocks.push(...remainingLevels);
            }

            // Unlock first level of next family
            const firstLevel = getFirstLevelOfFamily(nextFamilyId);
            if (firstLevel) newUnlocks.push(firstLevel);
          }
        }

        if (newUnlocks.length > 0) {
          setUnlockedLevels(prev => {
            const updatedUnlocks = Array.from(new Set([...prev, ...newUnlocks]));
            // Persist unlocks immediately after update
            persistProgress(levelScores, updatedUnlocks, metrics.accuracy);
            return updatedUnlocks;
          });
        }
      }

      const endEvent: GameEvent = {
        type: 'LEVEL_COMPLETED',
        levelId: gameState.currentLevelId!,
        runId: runId.current,
        sessionId: sessionId.current,
        payload: {
          accuracy: metrics.accuracy,
          passed,
          score: gameState.score + (passed ? 1000 : 0),
          previousBestAccuracy: levelScores[level.id]?.bestAccuracy ?? null,
          improvementDelta:
            levelScores[level.id]?.bestAccuracy != null
              ? metrics.accuracy - levelScores[level.id]!.bestAccuracy
              : null,
          familyId: level.familyId,
          sublevel: level.sublevel,
          targetUnitKind: level.targetUnitKind,
          mechanic: level.mechanic
        },
        timestamp: Date.now()
      };

      resolvedHostAdapter.onGameEvent(endEvent);
      emitSignals(endEvent);

      const sessionEvent: GameEvent = {
        type: 'SESSION_COMPLETED',
        levelId: gameState.currentLevelId!,
        runId: runId.current,
        sessionId: sessionId.current,
        payload: {
          turn_count_total: sessionTurnCountRef.current,
          insufficient_evidence_count: 0,
          fallback_used: false,
          familyId: level.familyId,
          top_confusion_pairs: Object.entries(runConfusionPairsRef.current)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([pair, count]) => ({ pair, count }))
        },
        timestamp: Date.now()
      };
      resolvedHostAdapter.onGameEvent(sessionEvent);
      emitSignals(sessionEvent);
    } else {
      setGameState(prev => ({
        ...prev,
        accuracy: metrics.accuracy,
        progress: engineRef.current!.getProgress(),
        lives: nextLives,
        combo: result.combo,
        score: prev.score + (result.isCorrect ? 10 * (1 + Math.floor(result.combo / 5)) : 0)
      }));
    }
  }, [gameState.status, gameState.currentLevelId, gameState.score, levelScores, resolvedHostAdapter, emitSignals]);

  /** Handle Enter key for normal/hard difficulty modes */
  const handleEnter = useCallback(() => {
    if (!engineRef.current || gameState.status !== 'PLAYING') return;
    if (difficultyMode === 'easy') return; // Enter not required in easy mode

    const result = engineRef.current.submitEnter();
    const metrics = engineRef.current.getMetrics();
    const currentLevelDef = LEVELS.find(l => l.id === gameState.currentLevelId);

    // Play node-complete sound for trail mechanic
    if (result.isUnitComplete && currentLevelDef?.mechanic === 'trail') {
      soundService.playNodeComplete();
    }

    if (result.isLevelComplete) {
      const level = LEVELS.find(l => l.id === gameState.currentLevelId)!;
      const passed = metrics.accuracy >= level.minAccuracy && gameState.lives > 0;

      if (passed) {
        soundService.playLevelComplete();
      }

      setGameState(prev => ({
        ...prev,
        status: passed ? 'LEVEL_COMPLETE' : 'LOBBY',
        accuracy: metrics.accuracy,
        progress: passed ? 100 : engineRef.current?.getProgress() ?? prev.progress,
        combo: metrics.combo
      }));

      if (passed) {
        const stars = computeStars(metrics.accuracy, level.minAccuracy);
        const newScore: LevelScore = { bestAccuracy: metrics.accuracy, bestWpm: metrics.wpm, stars };

        setLevelScores(prev => {
          const existing = prev[level.id];
          const merged: LevelScore = existing
            ? {
                bestAccuracy: Math.max(existing.bestAccuracy, metrics.accuracy),
                bestWpm: Math.max(existing.bestWpm, metrics.wpm),
                stars: Math.max(existing.stars, stars) as 0 | 1 | 2 | 3,
              }
            : newScore;

          const updatedScores = { ...prev, [level.id]: merged };
          persistProgress(updatedScores, unlockedLevels, metrics.accuracy);

          return updatedScores;
        });

        // Unlock next levels (same logic as handleKeyPress)
        const currentIndex = LEVELS.findIndex(l => l.id === gameState.currentLevelId);
        const newUnlocks: LevelId[] = [];
        if (currentIndex < LEVELS.length - 1) {
          newUnlocks.push(LEVELS[currentIndex + 1].id);
        }

        for (const [nextFamilyIdStr, gateLevelId] of Object.entries(FAMILY_UNLOCK_GATES)) {
          if (gameState.currentLevelId === gateLevelId) {
            const nextFamilyId = Number(nextFamilyIdStr);
            const currentFamilyId = getFamilyOfLevel(gameState.currentLevelId!);

            if (currentFamilyId) {
              const currentFamilyLevels = getLevelsByFamily(currentFamilyId);
              const unlockedInCurrentFamily = currentFamilyLevels.filter(id =>
                LEVELS.find(l => l.id === id)!.sublevel <= level.sublevel
              );
              const remainingLevels = currentFamilyLevels.filter(
                id => !unlockedInCurrentFamily.includes(id)
              );
              newUnlocks.push(...remainingLevels);
            }

            const firstLevel = getFirstLevelOfFamily(nextFamilyId);
            if (firstLevel) newUnlocks.push(firstLevel);
          }
        }

        if (newUnlocks.length > 0) {
          setUnlockedLevels(prev => {
            const updatedUnlocks = Array.from(new Set([...prev, ...newUnlocks]));
            persistProgress(levelScores, updatedUnlocks, metrics.accuracy);
            return updatedUnlocks;
          });
        }
      }
    }
  }, [gameState.status, gameState.currentLevelId, gameState.lives, levelScores, unlockedLevels, difficultyMode, resolvedHostAdapter, emitSignals]);

  useEffect(() => {
    if (gameState.status === 'PLAYING') {
      return;
    }

    const progress: GameProgress = {
      unlockedLevels,
      levelScores,
      totalAccuracy: gameState.accuracy
    };
    resolvedHostAdapter.onProgressUpdate(progress).catch(() => {
      // Best-effort progress persistence.
    });
  }, [unlockedLevels, levelScores, gameState.status, resolvedHostAdapter, gameState.accuracy]);

  const failUnit = useCallback(() => {
    if (!engineRef.current || !gameState.currentLevelId) return;

    const level = LEVELS.find((item) => item.id === gameState.currentLevelId);
    const targetBeforeFail = engineRef.current.getTarget();
    const livesBefore = engineRef.current.getLives();

    engineRef.current.failUnit();
    const metrics = engineRef.current.getMetrics();

    const failEvent: GameEvent = {
      type: 'UNIT_FAILED',
      levelId: gameState.currentLevelId,
      runId: runId.current,
      sessionId: sessionId.current,
      payload: {
        reason: 'timeout',
        target: targetBeforeFail,
        livesBefore,
        livesAfter: metrics.lives,
        familyId: level?.familyId ?? null,
        sublevel: level?.sublevel ?? null,
        targetUnitKind: level?.targetUnitKind ?? null,
        mechanic: level?.mechanic ?? null
      },
      timestamp: Date.now()
    };

    resolvedHostAdapter.onGameEvent(failEvent);
    emitSignals(failEvent);

    setGameState(prev => ({
      ...prev,
      lives: metrics.lives,
      combo: 0,
      progress: engineRef.current!.getProgress()
    }));
  }, [emitSignals, gameState.currentLevelId, resolvedHostAdapter]);

  return {
    gameState,
    unlockedLevels,
    levelScores,
    wilting,
    lifeLost,
    difficultyMode,
    setDifficultyMode,
    startLevel,
    goToLobby,
    handleKeyPress,
    handleEnter,
    failUnit,
    engine: engineRef.current
  };
}
