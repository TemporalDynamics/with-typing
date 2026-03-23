/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PhraseMechanicProps {
  phraseStart: string;
  options: string[];
  correctIndex?: number; // If not provided, any option is valid
  criterion?: 'coherent' | 'funny' | 'absurd' | 'logical';
  onComplete: (completedPhrase: string) => void;
  onFail?: () => void;
}

/**
 * F6 Mecánica: Frases para completar con elección
 * El usuario ve el inicio + opciones, elige una y la tipea
 */
export const PhraseMechanic: React.FC<PhraseMechanicProps> = ({
  phraseStart,
  options,
  correctIndex,
  criterion = 'coherent',
  onComplete,
  onFail
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [typedText, setTypedText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 segundos para elegir

  const selectedOption = selectedIndex !== null ? options[selectedIndex] : null;
  const targetPhrase = selectedOption || '';

  // Timer para presión temporal
  useEffect(() => {
    if (selectedIndex === null) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            onFail?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedIndex, onFail]);

  const handleOptionSelect = useCallback((index: number) => {
    setSelectedIndex(index);
    setTypedText('');
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null || !targetPhrase) return;

    if (e.key === 'Enter' && typedText === targetPhrase) {
      onComplete(`${phraseStart}${targetPhrase}`);
      return;
    }

    if (e.key.length === 1 && typedText.length < targetPhrase.length) {
      const expectedChar = targetPhrase[typedText.length];
      if (e.key.toLowerCase() === expectedChar.toLowerCase()) {
        setTypedText(prev => prev + e.key);
      }
    }

    if (e.key === 'Backspace') {
      setTypedText(prev => prev.slice(0, -1));
    }

    if (e.key === 'Escape') {
      setSelectedIndex(null);
      setTypedText('');
    }
  }, [selectedIndex, typedText, targetPhrase, phraseStart, onComplete]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const criterionColors = {
    coherent: 'emerald',
    funny: 'amber',
    absurd: 'purple',
    logical: 'blue'
  };

  const criterionLabels = {
    coherent: 'Más coherente',
    funny: 'Más graciosa',
    absurd: 'Más absurda',
    logical: 'Más lógica'
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-slate-400/20 shadow-2xl max-w-4xl w-full">
      {/* Criterion + Timer */}
      <div className="flex items-center justify-between w-full">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-${criterionColors[criterion]}-100 text-${criterionColors[criterion]}-700`}>
          <span className="text-xs font-black uppercase tracking-widest">
            {criterionLabels[criterion]}
          </span>
        </div>
        {selectedIndex === null && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            timeRemaining > 15 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}>
            <span className="text-lg font-black">{timeRemaining}s</span>
          </div>
        )}
      </div>

      {/* Phrase start */}
      <div className="text-3xl md:text-4xl font-black text-slate-800 text-center leading-relaxed">
        <span className="text-emerald-600">{phraseStart}</span>
        <span className="text-slate-400">_______</span>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCompleted = isSelected && typedText === option;

          return (
            <motion.button
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={selectedIndex === null ? { scale: 1.02 } : {}}
              whileTap={selectedIndex === null ? { scale: 0.98 } : {}}
              onClick={() => selectedIndex === null && handleOptionSelect(index)}
              disabled={selectedIndex !== null}
              className={`
                relative p-4 rounded-xl border-4 transition-all duration-200
                ${isSelected 
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-xl shadow-emerald-500/30' 
                  : selectedIndex !== null
                    ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-50'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50'}
              `}
            >
              <span className="text-base font-bold">{option}</span>
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xl">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Typing area */}
      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full max-w-2xl"
          >
            <div 
              tabIndex={0}
              className="flex items-center gap-2 p-6 bg-slate-100 rounded-2xl border-2 border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none"
            >
              <span className="text-2xl font-mono text-emerald-600">
                {typedText}
              </span>
              <span className="text-2xl font-mono text-slate-400">
                {selectedOption.slice(typedText.length)}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-0.5 h-8 bg-emerald-500"
              />
            </div>
            <p className="text-center text-xs font-bold text-slate-500 mt-3 uppercase tracking-widest">
              Tipeá la frase y presioná Enter
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
