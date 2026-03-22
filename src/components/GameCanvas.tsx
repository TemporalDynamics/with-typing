/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LevelId, LevelScore } from '../types/game';
import { LEVELS } from '../engine/LevelDefinitions';
import { motion } from 'motion/react';
import { Play, Lock, Star } from 'lucide-react';

interface LevelSelectorProps {
  unlockedLevels: LevelId[];
  levelScores: Partial<Record<LevelId, LevelScore>>;
  onSelect: (levelId: LevelId) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ unlockedLevels, levelScores, onSelect }) => {
  const levelFamilies = LEVELS.reduce<Record<number, typeof LEVELS>>((acc, level) => {
    if (!acc[level.familyId]) {
      acc[level.familyId] = [];
    }
    acc[level.familyId].push(level);
    return acc;
  }, {});

  const orderedFamilyIds = Object.keys(levelFamilies)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="flex flex-col items-start min-h-full py-12 text-slate-800">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-16 w-full shrink-0"
      >
        <h1 className="text-7xl font-sans font-black tracking-tighter mb-4">
          Typing <span className="text-emerald-500">Foundations</span>
        </h1>
        <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">Sanctuary Edition • v1.2</p>
      </motion.div>

      <div className="w-full max-w-7xl pb-10 space-y-8 shrink-0">
        {orderedFamilyIds.map((familyId) => {
          const familyLevels = levelFamilies[familyId].sort((a, b) => a.sublevel - b.sublevel);
          const familyTitle = familyLevels[0]?.familyTitle ?? `Familia ${familyId}`;
          const isCompact = familyLevels.length > 6;

          return (
            <section key={`family-${familyId}`} className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-black tracking-tight text-slate-700">
                  Familia {familyId} · {familyTitle}
                </h2>
                <span className="text-[10px] font-black tracking-[0.24em] uppercase opacity-50">
                  {familyLevels.length} subniveles
                </span>
              </div>

              {isCompact ? (
                /* Compact chip layout for families with many sublevels */
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3">
                  {familyLevels.map((level, i) => {
                    const isUnlocked = unlockedLevels.includes(level.id);
                    const score = levelScores[level.id];
                    const stars = score?.stars ?? 0;

                    return (
                      <motion.button
                        key={level.id}
                        initial={{ scale: 0.96, y: 12, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        whileHover={isUnlocked ? { scale: 1.03, y: -2 } : {}}
                        whileTap={isUnlocked ? { scale: 0.97 } : {}}
                        onClick={() => isUnlocked && onSelect(level.id)}
                        disabled={!isUnlocked}
                        className={`
                          relative px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-3
                          ${isUnlocked
                            ? 'bg-white/65 border-white/45 hover:bg-white/80 cursor-pointer shadow-md'
                            : 'bg-slate-200/50 border-transparent opacity-40 cursor-not-allowed'}
                        `}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isUnlocked ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-400'}`}>
                          {isUnlocked ? <Play fill="currentColor" className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        </div>
                        <div className="flex flex-col items-start min-w-0">
                          <span className="text-[9px] uppercase tracking-[0.15em] font-black opacity-40">
                            F{level.familyId}.{level.sublevel}
                          </span>
                          <span className="text-xs font-black leading-tight text-slate-800 truncate w-full">
                            {level.title}
                          </span>
                          {stars > 0 && (
                            <div className="flex gap-0.5 mt-0.5">
                              {[1, 2, 3].map(s => (
                                <Star
                                  key={s}
                                  fill={s <= stars ? 'currentColor' : 'none'}
                                  className={`w-2.5 h-2.5 ${s <= stars ? 'text-amber-400' : 'text-slate-300'}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        {score && (
                          <span className="text-[8px] font-bold text-slate-400 ml-auto shrink-0">
                            {Math.round(score.bestAccuracy * 100)}%
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                /* Full card layout for families with few sublevels */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {familyLevels.map((level, i) => {
                    const isUnlocked = unlockedLevels.includes(level.id);
                    const score = levelScores[level.id];
                    const stars = score?.stars ?? 0;

                    return (
                      <motion.button
                        key={level.id}
                        initial={{ scale: 0.96, y: 24, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={isUnlocked ? { scale: 1.02, y: -3 } : {}}
                        whileTap={isUnlocked ? { scale: 0.98 } : {}}
                        onClick={() => isUnlocked && onSelect(level.id)}
                        disabled={!isUnlocked}
                        className={`
                          relative p-6 rounded-[2rem] border-4 transition-all duration-300 flex flex-col items-center text-center min-h-72
                          ${isUnlocked
                            ? 'bg-white/65 border-white/45 hover:bg-white/80 cursor-pointer shadow-xl'
                            : 'bg-slate-200/50 border-transparent opacity-40 cursor-not-allowed'}
                        `}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg ${isUnlocked ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-400'}`}>
                          {isUnlocked ? <Play fill="currentColor" className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                        </div>

                        <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 mb-2">
                          F{level.familyId}.{level.sublevel}
                        </span>
                        <h3 className="text-lg font-black mb-2 leading-tight text-slate-800">{level.title}</h3>
                        <p className="text-[10px] opacity-60 font-bold leading-relaxed">{level.objective}</p>

                        {/* Star display */}
                        {stars > 0 && (
                          <div className="flex gap-1 mt-3">
                            {[1, 2, 3].map(s => (
                              <Star
                                key={s}
                                fill={s <= stars ? 'currentColor' : 'none'}
                                className={`w-4 h-4 ${s <= stars ? 'text-amber-400' : 'text-slate-300'}`}
                              />
                            ))}
                          </div>
                        )}

                        {score && (
                          <div className="mt-2 text-[9px] font-bold text-slate-400">
                            {Math.round(score.bestAccuracy * 100)}% · {Math.round(score.bestWpm)} WPM
                          </div>
                        )}

                        {isUnlocked && !score && (
                          <div className="absolute -top-3 -right-3 bg-amber-400 p-2 rounded-full shadow-lg border-4 border-white">
                            <Star fill="white" className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

interface KeyboardVisualProps {
  targetChar: string;
  inputChar: string;
  mechanic: 'tutorial' | 'falling' | 'trail' | 'rescue' | 'garden';
  shaking?: boolean;
}

export const KeyboardVisual: React.FC<KeyboardVisualProps> = ({ targetChar, inputChar, mechanic, shaking }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-800 relative z-20">
      <div className="relative">
        <motion.div
          key={targetChar}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            x: shaking ? [0, -5, 5, -5, 5, 0] : 0
          }}
          transition={{
            x: shaking ? { repeat: Infinity, duration: 0.2 } : undefined
          }}
          className="text-9xl font-mono font-black tracking-tighter mb-12 flex bg-white/60 backdrop-blur-3xl px-16 py-10 rounded-[3rem] border-4 border-white/40 shadow-2xl"
        >
          <span className="text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">{inputChar}</span>
          <span className="opacity-10">{targetChar.slice(inputChar.length)}</span>
        </motion.div>

        {/* Visual feedback for correct/incorrect */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 opacity-40 text-[10px] uppercase tracking-[0.3em] font-black">
          <span>Presiona <span className="text-emerald-600 font-black px-3 py-1 bg-emerald-100 rounded-full">{targetChar[inputChar.length] || 'Espacio'}</span></span>
        </div>
      </div>
    </div>
  );
};
