/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FlashMemoryProps {
  options: string[];
  correctIndex: number;
  displayTime?: number;
  onSelect: (correct: boolean, selectedIndex: number) => void;
}

/**
 * FASE E: Memoria flash
 * Las opciones se muestran brevemente y desaparecen
 * El usuario debe recordar y seleccionar la correcta
 * Señales: memory_decay, commitment_speed, retention_accuracy
 */
export const FlashMemory: React.FC<FlashMemoryProps> = ({
  options,
  correctIndex,
  displayTime = 3000,
  onSelect
}) => {
  const [phase, setPhase] = useState<'display' | 'recall' | 'selected'>('display');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeUntilHide, setTimeUntilHide] = useState(displayTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilHide(prev => {
        if (prev <= 100) {
          clearInterval(timer);
          if (phase === 'display') {
            setPhase('recall');
          }
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [phase]);

  const handleSelect = useCallback((index: number) => {
    if (phase !== 'recall') return;
    
    setSelectedIndex(index);
    setPhase('selected');
    onSelect(index === correctIndex, index);
  }, [phase, correctIndex, onSelect]);

  return (
    <div className="flex flex-col items-center gap-8 p-12 bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-amber-400/20 shadow-2xl max-w-3xl w-full">
      {/* Phase indicator */}
      <div className="flex items-center gap-3">
        {phase === 'display' && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-full"
          >
            <span className="text-sm font-black uppercase tracking-widest">Memorizá</span>
          </motion.div>
        )}
        {phase === 'recall' && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-100 text-emerald-700 rounded-full"
          >
            <span className="text-sm font-black uppercase tracking-widest">Recordá y elegí</span>
          </motion.div>
        )}
        {phase === 'selected' && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full ${
              selectedIndex === correctIndex 
                ? 'bg-emerald-500 text-white' 
                : 'bg-rose-500 text-white'
            }`}
          >
            <span className="text-sm font-black uppercase tracking-widest">
              {selectedIndex === correctIndex ? '¡Correcto!' : 'Incorrecto'}
            </span>
          </motion.div>
        )}
      </div>

      {/* Progress bar for display phase */}
      {phase === 'display' && (
        <div className="w-full max-w-md h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${(timeUntilHide / displayTime) * 100}%` }}
            className="h-full bg-amber-500"
          />
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === correctIndex;
          
          return (
            <motion.button
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: phase === 'display' ? 1 : isSelected || isCorrect ? 1.05 : 0.95,
                opacity: phase === 'display' ? 1 : isSelected || isCorrect ? 1 : 0.4
              }}
              transition={{ delay: index * 0.1 }}
              whileHover={phase === 'recall' ? { scale: 1.05 } : {}}
              whileTap={phase === 'recall' ? { scale: 0.95 } : {}}
              onClick={() => handleSelect(index)}
              disabled={phase !== 'recall'}
              className={`
                relative p-6 rounded-2xl border-4 transition-all duration-200
                ${phase === 'display'
                  ? 'bg-amber-50 border-amber-300'
                  : phase === 'recall'
                    ? 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer'
                    : isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : isSelected
                        ? 'bg-rose-500 text-white border-rose-600'
                        : 'bg-slate-100 border-slate-200 opacity-50'}
              `}
            >
              <AnimatePresence>
                {phase === 'display' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-lg font-bold text-slate-800"
                  >
                    {option}
                  </motion.span>
                )}
                {phase !== 'display' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-lg font-bold ${
                      isCorrect || isSelected ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {phase === 'recall' ? '???' : option}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {phase === 'selected' && isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-300 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xl">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        {phase === 'display' && (
          <>
            <span>Memorizá las opciones</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full" />
            <span>Van a desaparecer</span>
          </>
        )}
        {phase === 'recall' && (
          <>
            <span>Elegí la correcta</span>
            <span className="w-1 h-1 bg-slate-400 rounded-full" />
            <span>Basado en tu memoria</span>
          </>
        )}
        {phase === 'selected' && (
          <span>Continuá para la siguiente</span>
        )}
      </div>
    </div>
  );
};
