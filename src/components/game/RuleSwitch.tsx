/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Target, Zap } from 'lucide-react';

interface RuleSwitchProps {
  phrase: string;
  options: string[];
  currentRule: 'coherent' | 'funny' | 'absurd' | 'logical';
  onRuleChange?: (rule: 'coherent' | 'funny' | 'absurd' | 'logical') => void;
  onSelect: (optionIndex: number) => void;
}

/**
 * FASE E: Cambio de regla
 * El usuario debe aplicar diferentes criterios para seleccionar
 * Señales: cognitive_flexibility, context_switch_cost, rule_adherence
 */
export const RuleSwitch: React.FC<RuleSwitchProps> = ({
  phrase,
  options,
  currentRule,
  onRuleChange,
  onSelect
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [typedText, setTypedText] = useState('');

  const ruleConfig = {
    coherent: { label: 'Más coherente', color: 'emerald', icon: Target },
    funny: { label: 'Más graciosa', color: 'amber', icon: Sparkles },
    absurd: { label: 'Más absurda', color: 'purple', icon: Zap },
    logical: { label: 'Más lógica', color: 'blue', icon: Target }
  };

  const currentRuleConfig = ruleConfig[currentRule];
  const Icon = currentRuleConfig.icon;

  const handleOptionSelect = useCallback((index: number) => {
    setSelectedIndex(index);
    setTypedText('');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    
    const targetOption = options[selectedIndex];
    
    if (e.key === 'Enter' && typedText === targetOption) {
      onSelect(selectedIndex);
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
  }, [selectedIndex, typedText, options, onSelect]);

  const selectedOption = selectedIndex !== null ? options[selectedIndex] : null;

  return (
    <div className="flex flex-col items-center gap-8 p-12 bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-slate-400/20 shadow-2xl max-w-5xl w-full">
      {/* Rule selector */}
      <div className="flex items-center gap-3">
        {Object.entries(ruleConfig).map(([rule, config]) => {
          const isActive = currentRule === rule;
          const IconComponent = config.icon;
          
          return (
            <motion.button
              key={rule}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRuleChange?.(rule as typeof currentRule)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-full border-2 transition-all
                ${isActive 
                  ? `bg-${config.color}-500 text-white border-${config.color}-600 shadow-lg shadow-${config.color}-500/30` 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}
              `}
            >
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-black">{config.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Current rule indicator - large */}
      <motion.div
        key={currentRule}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`flex items-center gap-4 px-8 py-4 rounded-full bg-${currentRuleConfig.color}-100 text-${currentRuleConfig.color}-700`}
      >
        <Icon className="w-6 h-6" />
        <span className="text-xl font-black uppercase tracking-widest">
          Criterio: {currentRuleConfig.label}
        </span>
      </motion.div>

      {/* Phrase */}
      <div className="text-3xl md:text-4xl font-black text-slate-800 text-center leading-relaxed max-w-3xl">
        {phrase}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
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
                relative p-6 rounded-2xl border-4 transition-all duration-200 text-left
                ${isSelected 
                  ? `bg-${currentRuleConfig.color}-500 text-white border-${currentRuleConfig.color}-600 shadow-xl` 
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'}
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
      {selectedOption && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
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
            Tipeá la opción y presioná Enter
          </p>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <span>1. Notá el criterio</span>
        <span className="w-1 h-1 bg-slate-400 rounded-full" />
        <span>Elegí según la regla</span>
        <span className="w-1 h-1 bg-slate-400 rounded-full" />
        <span>Tipeá para confirmar</span>
      </div>
    </div>
  );
};
