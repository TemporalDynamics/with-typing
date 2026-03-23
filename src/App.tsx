/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useCallback, useState } from 'react';
import { useTypingGame } from './hooks/useTypingGame';
import { LevelBackground, HUD } from './components/HUD';
import { LevelSelector, KeyboardVisual } from './components/GameCanvas';
import { HandGuide, FallingLetter, TutorialOverlay } from './components/game/Mechanics';
import { FullKeyboard } from './components/game/FullKeyboard';
import { TrailMechanic } from './components/game/TrailMechanic';
import { RescueMechanic } from './components/game/RescueMechanic';
import { GardenMechanic } from './components/game/GardenMechanic';
import { HostCharacter, EnemyActor, ComboBurst } from './components/characters/Characters';
import { StarSVG } from './components/icons/Icons';
import { LEVELS } from './engine/LevelDefinitions';
import { GameHostAdapter, GameEventEmitter } from './adapters';
import { HostMood } from './types/game';
import { motion, AnimatePresence } from 'motion/react';

interface AppProps {
  hostAdapter?: GameHostAdapter;
  eventEmitter?: GameEventEmitter;
  standalone?: boolean;
}

export default function App({ hostAdapter, eventEmitter, standalone = false }: AppProps) {
  const {
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
    engine
  } = useTypingGame(hostAdapter, eventEmitter);

  const [hostMood, setHostMood] = useState<HostMood>('neutral');
  const [hostMessage, setHostMessage] = useState<string | undefined>("¡Hola! Soy tu guía Koala. ¿Listo para aprender?");
  const [showSparkle, setShowSparkle] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && gameState.status !== 'LOBBY') {
      goToLobby();
      return;
    }

    if (gameState.status === 'PLAYING' && !showTutorial) {
      if (e.key === ' ') e.preventDefault();
      
      // Handle Enter key for normal/hard modes
      if (e.key === 'Enter' && difficultyMode !== 'easy') {
        e.preventDefault();
        handleEnter();
        return;
      }
      
      if (e.key.length === 1) {
        handleKeyPress(e.key);
      }
    }
  }, [gameState.status, goToLobby, handleKeyPress, handleEnter, difficultyMode, showTutorial]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Show tutorial overlay for F1.1 only
  useEffect(() => {
    const level = LEVELS.find(l => l.id === gameState.currentLevelId);
    if (level?.familyId === 1 && level.sublevel === 1 && gameState.status === 'PLAYING') {
      setShowTutorial(true);
      setHostMood('thinking');
    } else {
      setShowTutorial(false);
    }
  }, [gameState.currentLevelId, gameState.status]);

  // Handle combo feedback
  useEffect(() => {
    if (gameState.combo > 0 && gameState.combo % 5 === 0) {
      if (gameState.combo % 10 === 0) {
        setIsCelebrating(true);
        setHostMessage(`¡Increíble! ¡${gameState.combo} aciertos seguidos!`);
        const timer = setTimeout(() => {
          setIsCelebrating(false);
          setHostMessage(undefined);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        setShowSparkle(true);
        const timer = setTimeout(() => setShowSparkle(false), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState.combo]);

  // React to game state changes for host character
  useEffect(() => {
    if (gameState.status === 'LEVEL_COMPLETE') {
      setHostMood('excited');
      setHostMessage("¡Increíble! Has completado el nivel con maestría.");
    } else if (gameState.status === 'LOBBY') {
      setHostMood('neutral');
      setHostMessage("¡Hola! Soy tu guía Koala. ¿Listo para aprender?");
    } else if (gameState.lives < 5 && gameState.lives > 0) {
      setHostMood('neutral');
      setHostMessage("¡Cuidado! Mantén la calma y sigue el ritmo.");
    } else if (gameState.lives === 0) {
      setHostMood('sad');
      setHostMessage("Oh no... ¡Pero no te rindas! Intentémoslo de nuevo.");
    } else if (gameState.combo > 0) {
      setHostMood('happy');
    }
  }, [gameState.status, gameState.lives, gameState.combo]);

  const currentLevel = LEVELS.find(l => l.id === gameState.currentLevelId);
  const fallingDuration = currentLevel?.fallDurationSec ?? 5;
  const getNextLevelId = () => {
    if (!gameState.currentLevelId) return null;
    const currentIndex = LEVELS.findIndex(l => l.id === gameState.currentLevelId);
    const next = LEVELS[currentIndex + 1];
    if (!next) return null;
    return unlockedLevels.includes(next.id) ? next.id : null;
  };
  const nextLevelId = getNextLevelId();

  return (
    <div className={`relative w-full h-screen overflow-hidden flex flex-col font-sans selection:bg-emerald-400 selection:text-emerald-900 ${standalone ? 'bg-emerald-900' : 'bg-transparent'} ${lifeLost ? 'animate-life-lost' : ''}`}>
      {/* Life-loss red flash */}
      {lifeLost && (
        <div className="fixed inset-0 bg-red-500/20 z-[200] pointer-events-none animate-flash-out" />
      )}
      <LevelBackground levelId={gameState.currentLevelId} />
      
      <HUD 
        accuracy={gameState.accuracy} 
        progress={gameState.progress} 
        playerHandle={gameState.playerHandle}
        levelTitle={currentLevel ? `F${currentLevel.familyId}.${currentLevel.sublevel} · ${currentLevel.title}` : undefined}
        lives={gameState.lives}
        combo={gameState.combo}
        score={gameState.score}
      />

      <main className="flex-1 flex flex-col items-center justify-center relative">
        {gameState.status !== 'LOBBY' && (
          <button
            onClick={goToLobby}
            className="absolute top-6 right-8 z-40 px-4 py-2 rounded-xl bg-white/70 hover:bg-white text-slate-700 text-xs font-black tracking-widest uppercase border border-white/60 shadow-lg"
          >
            Niveles (Esc)
          </button>
        )}

        <ComboBurst combo={gameState.combo} />

        <AnimatePresence>
          {showTutorial && (
            <TutorialOverlay onClose={() => setShowTutorial(false)} />
          )}
        </AnimatePresence>

        {gameState.status === 'LOBBY' && (
          <div className="absolute inset-0 overflow-y-auto">
            <LevelSelector
              unlockedLevels={unlockedLevels}
              levelScores={levelScores}
              onSelect={startLevel}
              difficultyMode={difficultyMode}
              onDifficultyChange={setDifficultyMode}
            />
          </div>
        )}

        {gameState.status === 'PLAYING' && engine && currentLevel && (() => {
          const target = engine.getTarget();
          const input = engine.getInput();
          const nextKey = target[input.length] || '';
          const typedChars = input.split('');

          return (
            <div className="flex flex-col items-center w-full">
              {currentLevel.mechanic === 'tutorial' && (
                <>
                  <KeyboardVisual
                    targetChar={target}
                    inputChar={input}
                    mechanic={currentLevel.mechanic}
                    shaking={gameState.combo > 10}
                  />
                  <FullKeyboard
                    targetKey={nextKey}
                    typedKeys={typedChars}
                    showPattern={target}
                  />
                  <HandGuide targetKey={nextKey} />
                </>
              )}

              {currentLevel.mechanic === 'falling' && (
                <div className="relative w-full h-screen max-h-[600px]">
                  <FallingLetter
                    key={`fall-${target}-${gameState.progress}`}
                    char={target}
                    input={input}
                    onFail={failUnit}
                    speed={fallingDuration}
                    shaking={gameState.combo > 10}
                  />
                </div>
              )}

              {currentLevel.mechanic === 'trail' && (
                <>
                  <TrailMechanic
                    target={target}
                    input={input}
                    shaking={gameState.combo > 10}
                  />
                  <FullKeyboard
                    targetKey={nextKey}
                    typedKeys={typedChars}
                    showFingerGuide={true}
                  />
                </>
              )}

              {currentLevel.mechanic === 'rescue' && (
                <div className="relative w-full h-screen max-h-[600px] flex items-center">
                  <RescueMechanic
                    key={`rescue-${target}-${gameState.progress}`}
                    target={target}
                    input={input}
                    onFail={failUnit}
                    speed={fallingDuration || 6}
                    shaking={gameState.combo > 10}
                  />
                </div>
              )}

              {currentLevel.mechanic === 'garden' && (
                <>
                  <GardenMechanic
                    target={target}
                    input={input}
                    shaking={gameState.combo > 10}
                    wilting={wilting}
                  />
                  <FullKeyboard
                    targetKey={nextKey}
                    typedKeys={typedChars}
                    showFingerGuide={true}
                  />
                </>
              )}
            </div>
          );
        })()}

        <AnimatePresence>
          {gameState.status === 'LEVEL_COMPLETE' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex flex-col items-center justify-center p-16 text-white bg-white/10 backdrop-blur-3xl rounded-[60px] border-8 border-emerald-400/30 shadow-[0_0_100px_rgba(52,211,153,0.3)] z-50"
            >
              <div className="mb-8">
                <StarSVG className="w-32 h-32 text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]" />
              </div>
              <h2 className="text-6xl font-black mb-4 tracking-tighter">¡Nivel Superado!</h2>
              <p className="text-2xl opacity-70 mb-12 font-medium">Precisión: <span className="text-emerald-400 font-black">{(gameState.accuracy * 100).toFixed(1)}%</span></p>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    if (nextLevelId) {
                      startLevel(nextLevelId);
                    } else {
                      startLevel(gameState.currentLevelId!);
                    }
                  }}
                  className="px-10 py-4 bg-emerald-400 hover:bg-emerald-500 text-emerald-900 rounded-full text-xl font-black transition-all hover:scale-105 active:scale-95 shadow-2xl"
                >
                  {nextLevelId ? 'Siguiente Nivel' : 'Repetir Nivel'}
                </button>
                <button
                  onClick={goToLobby}
                  className="px-10 py-4 bg-white/80 hover:bg-white text-slate-700 rounded-full text-xl font-black transition-all hover:scale-105 active:scale-95 border border-white/70 shadow-2xl"
                >
                  Volver a Niveles
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <HostCharacter 
        mood={hostMood} 
        message={hostMessage} 
        sparkle={showSparkle} 
        celebrating={isCelebrating}
      />
      <EnemyActor type="bird" active={gameState.combo > 10} />

      {standalone && (
        <footer className="p-8 text-center text-white/20 text-sm uppercase tracking-[0.2em] font-black relative z-30">
          Typing Foundations • Sanctuary Edition
        </footer>
      )}
    </div>
  );
}
