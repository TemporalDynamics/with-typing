/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TrailMechanicProps {
  target: string;
  input: string;
  shaking?: boolean;
}

export const TrailMechanic: React.FC<TrailMechanicProps> = ({ target, input, shaking }) => {
  const chars = target.split('');
  const typedCount = input.length;

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div
        className="flex items-center gap-1"
        style={{ animation: shaking ? 'shake 0.2s infinite' : undefined }}
      >
        {chars.map((char, i) => {
          const isTyped = i < typedCount;
          const isCurrent = i === typedCount;

          return (
            <React.Fragment key={i}>
              {/* Connector line */}
              {i > 0 && (
                <div
                  className={`w-6 h-0.5 transition-colors duration-200 ${
                    isTyped ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                />
              )}
              {/* Node */}
              <div
                className={`
                  relative w-12 h-12 rounded-full flex items-center justify-center
                  font-mono font-bold text-lg transition-all duration-200
                  ${isTyped
                    ? 'bg-emerald-400 text-white shadow-[0_0_12px_rgba(52,211,153,0.5)]'
                    : isCurrent
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.3)]'
                      : 'bg-slate-100 text-slate-400 border-2 border-slate-200'}
                `}
              >
                {char.toUpperCase()}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full animate-[trail-pulse_1s_ease-in-out_infinite] border-2 border-indigo-400/50" />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        @keyframes trail-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};
