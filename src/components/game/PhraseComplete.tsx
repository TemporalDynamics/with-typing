/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PhraseCompleteProps {
  phraseStart: string;
  options: string[];
  onSelect: (option: string) => void;
  criterion?: 'coherent' | 'funny' | 'absurd' | 'logical';
}

/**
 * FASE E: Completar frases
 * El usuario ve el inicio de una frase y debe elegir + tipear el final
 * Señales: expressive_choice_consistency, context_switch_cost, intentional_typing_score
 */
export const PhraseComplete: React.FC<PhraseCompleteProps> = ({
  phraseStart,
  options,
  onSelect,
  criterion = 'coherent'
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [typedText, setTypedText] = useState('');

  const handleOptionSelect = useCallback((index: number) => {
    setSelectedIndex(index);
    setTypedText('');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    const targetOption = options[selectedIndex];
    
    if (e.key === 'Enter' && typedText === targetOption) {
      onSelect(targetOption);
      return;
    }
    
    if (e.key.length === 1 && typedText.length < targetOption.length) {
      const expectedChar = targetOption[typedText.length];
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
  }, [selectedIndex, typedText, options, onSelect]);

  const selectedOption = selectedIndex !== null ? options[selectedIndex] : null;

  return (
    <div className="flex flex-col items-center gap-8 p-12 bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-emerald-400/20 shadow-2xl max-w-4xl w-full">
      {/* Criterion indicator */}
      <div className="flex items-center gap-3 px-6 py-3 bg-slate-100 rounded-full">
        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">
          Criterio:
        </span>
        <span className={`text-sm font-black px-4 py-1 rounded-full ${
          criterion === 'coherent' ? 'bg-emerald-500 text-white' :
          criterion === 'funny' ? 'bg-amber-500 text-white' :
          criterion === 'absurd' ? 'bg-purple-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          {criterion === 'coherent' ? 'Más coherente' :
           criterion === 'funny' ? 'Más graciosa' :
           criterion === 'absurd' ? 'Más absurda' :
           'Más lógica'}
        </span>
      </div>

      {/* Phrase start */}
      <div className="text-4xl md:text-5xl font-black text-slate-800 text-center leading-relaxed">
        <span className="text-emerald-600">{phraseStart}</span>
        <span className="text-slate-400">_______</span>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCompleted = isSelected && typedText === option;
          
          return (
            <motion.button
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionSelect(index)}
              className={`
                relative p-6 rounded-2xl border-4 transition-all duration-200
                ${isSelected 
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-xl shadow-emerald-500/30' 
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50'}
              `}
            >
              <span className="text-lg font-bold">{option}</span>
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
              onKeyDown={handleKeyDown}
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
              Tipeá la frase completa y presioná Enter
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <span>1. Elegí una opción</span>
        <span className="w-1 h-1 bg-slate-400 rounded-full" />
        <span>2. Tipeala completa</span>
        <span className="w-1 h-1 bg-slate-400 rounded-full" />
        <span>3. Enter para confirmar</span>
      </div>
    </div>
  );
};
