/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LevelId } from '../types/game';
import { LEVELS } from '../engine/LevelDefinitions';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trophy, Zap, User } from 'lucide-react';

interface HUDProps {
  accuracy: number;
  progress: number;
  playerHandle: string;
  levelTitle?: string;
  lives: number;
  combo: number;
  score: number;
}

export const HUD: React.FC<HUDProps> = ({ accuracy, progress, playerHandle, levelTitle, lives, combo, score }) => {
  return (
    <div className="flex justify-between items-start p-8 text-slate-800 font-sans relative z-30">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/40 shadow-lg">
          <User className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-black uppercase tracking-widest opacity-70">{playerHandle}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: i < lives ? 1 : 0.8, opacity: i < lives ? 1 : 0.2 }}
              className="text-rose-500"
            >
              <Heart fill={i < lives ? "currentColor" : "none"} className="w-6 h-6" />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-white/60 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/40 shadow-lg mb-4">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40">{levelTitle || 'Santuario'}</span>
        </div>
        <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden border border-white/40 shadow-inner">
          <motion.div 
            className="h-full bg-emerald-500"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>
      </div>

      <div className="flex flex-col items-end space-y-4">
        <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/40 shadow-lg">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-xl font-mono font-black tracking-tighter">{score.toLocaleString()}</span>
        </div>

        <AnimatePresence>
          {combo > 1 && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 5 }}
              exit={{ scale: 0 }}
              className="flex items-center space-x-2 bg-emerald-500 px-4 py-2 rounded-xl shadow-lg text-white"
            >
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Combo x{combo}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface LevelBackgroundProps {
  levelId: LevelId | null;
}

export const LevelBackground: React.FC<LevelBackgroundProps> = ({ levelId }) => {
  const level = LEVELS.find(l => l.id === levelId);
  const backgroundUrl = level?.backgroundUrl || '/src/assets/backgrounds/l1-nest.svg';

  return (
    <div className="fixed inset-0 z-[-1] transition-all duration-1000 ease-in-out bg-slate-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={backgroundUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={backgroundUrl}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 pattern-dots" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
    </div>
  );
};
