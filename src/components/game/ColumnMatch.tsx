/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

interface ColumnMatchProps {
  leftColumn: string[];
  rightColumn: string[];
  pairs: { left: number; right: number }[]; // Correct matches
  timeLimit?: number;
  onComplete: (success: boolean, timeSpent: number) => void;
}

/**
 * FASE E: Unir columnas
 * El usuario debe emparejar elementos de dos columnas antes del tiempo límite
 * Señales: context_switch_cost, priority_selection_accuracy, multitask_capacity
 */
export const ColumnMatch: React.FC<ColumnMatchProps> = ({
  leftColumn,
  rightColumn,
  pairs,
  timeLimit = 60,
  onComplete
}) => {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(false, timeSpent + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete, timeSpent]);

  // Check if all pairs matched
  useEffect(() => {
    if (matchedPairs.size === pairs.length) {
      onComplete(true, timeSpent);
    }
  }, [matchedPairs, pairs.length, onComplete, timeSpent]);

  const handleLeftClick = useCallback((index: number) => {
    if (matchedPairs.has(`L${index}`)) return;
    setSelectedLeft(index);
  }, [matchedPairs]);

  const handleRightClick = useCallback((index: number) => {
    if (matchedPairs.has(`R${index}`)) return;
    
    if (selectedLeft !== null) {
      // Check if this is a correct match
      const correctPair = pairs.find(p => p.left === selectedLeft && p.right === index);
      
      if (correctPair) {
        setMatchedPairs(prev => new Set([...prev, `L${selectedLeft}`, `R${index}`]));
      } else {
        // Wrong match - penalty?
      }
      
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      setSelectedRight(index);
    }
  }, [selectedLeft, pairs, matchedPairs]);

  const isLeftMatched = (index: number) => matchedPairs.has(`L${index}`);
  const isRightMatched = (index: number) => matchedPairs.has(`R${index}`);

  return (
    <div className="flex flex-col items-center gap-6 p-12 bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-indigo-400/20 shadow-2xl max-w-5xl w-full">
      {/* Timer */}
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${(timeRemaining / timeLimit) * 100}%` }}
            className={`h-full transition-colors ${
              timeRemaining > timeLimit * 0.5 ? 'bg-emerald-500' :
              timeRemaining > timeLimit * 0.25 ? 'bg-amber-500' :
              'bg-rose-500'
            }`}
          />
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          timeRemaining > timeLimit * 0.5 ? 'bg-emerald-100 text-emerald-700' :
          timeRemaining > timeLimit * 0.25 ? 'bg-amber-100 text-amber-700' :
          'bg-rose-100 text-rose-700'
        }`}>
          <Zap className={`w-4 h-4 ${timeRemaining <= timeLimit * 0.25 ? 'animate-pulse' : ''}`} />
          <span className="text-lg font-black">{timeRemaining}s</span>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-2 gap-12 w-full">
        {/* Left Column */}
        <div className="space-y-3">
          {leftColumn.map((item, index) => {
            const isSelected = selectedLeft === index;
            const isMatched = isLeftMatched(index);
            
            return (
              <motion.button
                key={`L${index}`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!isMatched ? { scale: 1.02, x: 5 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleLeftClick(index)}
                disabled={isMatched}
                className={`
                  w-full p-4 rounded-xl border-4 transition-all duration-200 text-left
                  ${isMatched 
                    ? 'bg-emerald-500 text-white border-emerald-600 opacity-50' 
                    : isSelected
                      ? 'bg-indigo-500 text-white border-indigo-600 shadow-lg shadow-indigo-500/30'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400'}
                `}
              >
                <span className="text-lg font-bold">{item}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {rightColumn.map((item, index) => {
            const isSelected = selectedRight === index;
            const isMatched = isRightMatched(index);
            
            return (
              <motion.button
                key={`R${index}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!isMatched ? { scale: 1.02, x: -5 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleRightClick(index)}
                disabled={isMatched}
                className={`
                  w-full p-4 rounded-xl border-4 transition-all duration-200 text-left
                  ${isMatched 
                    ? 'bg-emerald-500 text-white border-emerald-600 opacity-50' 
                    : isSelected
                      ? 'bg-indigo-500 text-white border-indigo-600 shadow-lg shadow-indigo-500/30'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400'}
                `}
              >
                <span className="text-lg font-bold">{item}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
        <span>Emparejados: {matchedPairs.size / 2} / {pairs.length}</span>
        <span>Tiempo: {timeSpent}s</span>
      </div>

      {/* Instructions */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <span>1. Seleccioná un elemento</span>
        <span className="w-1 h-1 bg-slate-400 rounded-full" />
        <span>2. Seleccioná su pareja</span>
        <span className="w-1 h-1 bg-slate-400 rounded-full" />
        <span>3. Completá antes del tiempo</span>
      </div>
    </div>
  );
};
