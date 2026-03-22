/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { KEYBOARD_ROWS, getKeyMapping } from '../../engine/KeyboardMap';
import type { FingerName } from '../../types/game';

const FINGER_COLORS: Record<FingerName, string> = {
  pinky:  'bg-rose-400',
  ring:   'bg-amber-400',
  middle: 'bg-sky-400',
  index:  'bg-emerald-400',
};

const FINGER_LABELS: Record<FingerName, string> = {
  pinky: 'Meñique',
  ring: 'Anular',
  middle: 'Medio',
  index: 'Índice',
};

interface FullKeyboardProps {
  targetKey?: string;
  highlightKeys?: string[];
  typedKeys?: string[];
  showFingerGuide?: boolean;
  showPattern?: string;
}

export const FullKeyboard: React.FC<FullKeyboardProps> = ({
  targetKey,
  highlightKeys,
  typedKeys,
  showFingerGuide = true,
  showPattern,
}) => {
  const target = targetKey?.toLowerCase();
  const targetMapping = target ? getKeyMapping(target) : undefined;
  const highlightSet = new Set(highlightKeys?.map(k => k.toLowerCase()));
  const typedSet = new Set(typedKeys?.map(k => k.toLowerCase()));

  return (
    <div className="flex flex-col items-center gap-2">
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex gap-1.5"
          style={{ paddingLeft: rowIdx === 1 ? 16 : rowIdx === 2 ? 32 : 0 }}
        >
          {row.map((km) => {
            const isTarget = target === km.key;
            const isHighlighted = highlightSet.has(km.key);
            const isTyped = typedSet.has(km.key);
            const isAnchor = km.key === 'f' || km.key === 'j';
            const fingerColor = FINGER_COLORS[km.finger];

            return (
              <div key={km.key} className="flex flex-col items-center gap-1">
                <div
                  className={`
                    relative w-11 h-11 flex items-center justify-center rounded-lg border-2
                    font-bold text-sm transition-all duration-150
                    ${isTarget
                      ? 'border-emerald-400 bg-emerald-100 text-emerald-800 shadow-[0_0_12px_rgba(52,211,153,0.4)] scale-110'
                      : isTyped
                        ? 'border-emerald-300 bg-emerald-200 text-emerald-600'
                        : isHighlighted
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-400'}
                  `}
                >
                  {km.key === ';' ? ';' : km.key.toUpperCase()}
                  {isAnchor && (
                    <div className="absolute bottom-1.5 w-4 h-0.5 bg-slate-300 rounded-full" />
                  )}
                  {isTarget && (
                    <div className="absolute inset-0 rounded-lg animate-[pulse-ring_1.2s_ease-in-out_infinite] border-2 border-emerald-400/50" />
                  )}
                </div>
                {showFingerGuide && isTarget && (
                  <div className={`w-2 h-2 rounded-full ${fingerColor}`} />
                )}
              </div>
            );
          })}
        </div>
      ))}

      {showFingerGuide && targetMapping && (
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500">
          <div className={`w-3 h-3 rounded-full ${FINGER_COLORS[targetMapping.finger]}`} />
          <span>{targetMapping.hand === 'left' ? 'Izquierda' : 'Derecha'} · {FINGER_LABELS[targetMapping.finger]}</span>
        </div>
      )}

      {showPattern && (
        <div className="mt-2 px-4 py-2 bg-slate-100 rounded-xl text-sm font-mono font-bold text-slate-500 tracking-widest">
          {showPattern}
        </div>
      )}

      <style>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};
