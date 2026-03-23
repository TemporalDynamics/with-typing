/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GardenMechanicProps {
  target: string;
  input: string;
  shaking?: boolean;
  wilting?: boolean;
}

export const GardenMechanic: React.FC<GardenMechanicProps> = ({ target, input, shaking, wilting }) => {
  // RULE: Uppercase for visibility and consistency across mechanics
  const displayTarget = target.toUpperCase();
  const displayInput = input.toUpperCase();
  
  const progress = displayTarget.length > 0 ? displayInput.length / displayTarget.length : 0;
  const stemHeight = Math.round(progress * 160);
  const showLeaf1 = progress >= 0.25;
  const showLeaf2 = progress >= 0.50;
  const showLeaf3 = progress >= 0.75;
  const showFlower = progress >= 1;

  const chars = displayTarget.split('');
  const typedCount = displayInput.length;

  const wiltClass = wilting ? 'opacity-50 saturate-0 scale-y-75' : '';

  return (
    <div
      className="flex flex-col items-center gap-6 p-8"
      style={{ animation: shaking ? 'shake 0.2s infinite' : undefined }}
    >
      {/* Plant visualization */}
      <div className={`relative w-40 h-52 flex flex-col items-center justify-end transition-all duration-700 origin-bottom ${wiltClass}`}>
        {/* Flower */}
        <div
          className={`absolute transition-all duration-500 ${
            showFlower ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{ bottom: stemHeight + 16 }}
        >
          <div className={`w-10 h-10 rounded-full shadow-[0_0_16px_rgba(251,113,133,0.5)] flex items-center justify-center transition-colors duration-500 ${wilting ? 'bg-amber-800' : 'bg-rose-400'}`}>
            <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${wilting ? 'bg-amber-900' : 'bg-amber-300'}`} />
          </div>
        </div>

        {/* Leaves */}
        {showLeaf3 && (
          <div
            className="absolute transition-all duration-300"
            style={{ bottom: stemHeight * 0.75 }}
          >
            <div className={`w-6 h-3 rounded-full -translate-x-5 shadow-sm transition-all duration-500 ${wilting ? 'bg-amber-700 rotate-[-50deg]' : 'bg-emerald-400 rotate-[-20deg]'}`} />
          </div>
        )}
        {showLeaf2 && (
          <div
            className="absolute transition-all duration-300"
            style={{ bottom: stemHeight * 0.50 }}
          >
            <div className={`w-6 h-3 rounded-full translate-x-5 shadow-sm transition-all duration-500 ${wilting ? 'bg-amber-700 rotate-[50deg]' : 'bg-emerald-500 rotate-[20deg]'}`} />
          </div>
        )}
        {showLeaf1 && (
          <div
            className="absolute transition-all duration-300"
            style={{ bottom: stemHeight * 0.25 }}
          >
            <div className={`w-5 h-2.5 rounded-full -translate-x-4 shadow-sm transition-all duration-500 ${wilting ? 'bg-amber-700 rotate-[-45deg]' : 'bg-emerald-400 rotate-[-15deg]'}`} />
          </div>
        )}

        {/* Stem */}
        <div
          className={`w-1.5 rounded-full transition-all duration-300 ${wilting ? 'bg-amber-800' : 'bg-emerald-500'}`}
          style={{ height: stemHeight }}
        />

        {/* Pot / ground */}
        <div className="w-12 h-4 bg-amber-700 rounded-b-lg rounded-t-sm mt-0.5" />
      </div>

      {/* Word display */}
      <div className="flex gap-0.5">
        {chars.map((char, i) => {
          const isTyped = i < typedCount;
          const isCurrent = i === typedCount;

          return (
            <span
              key={i}
              className={`
                text-3xl font-mono font-bold transition-colors duration-150
                ${isTyped
                  ? 'text-emerald-500'
                  : isCurrent
                    ? 'text-rose-600'
                    : 'text-slate-300'}
              `}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>
    </div>
  );
};
