/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface RescueMechanicProps {
  target: string;
  input: string;
  onFail: () => void;
  speed?: number;
  shaking?: boolean;
}

export const RescueMechanic: React.FC<RescueMechanicProps> = ({
  target,
  input,
  onFail,
  speed = 6,
  shaking,
}) => {
  const chars = target.split('');
  const typedCount = input.length;

  return (
    <div className="relative w-full h-48 flex items-center overflow-hidden">
      {/* River background */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-200/30 via-violet-100/20 to-transparent" />

      {/* Floating syllable */}
      <motion.div
        key={`rescue-${target}`}
        initial={{ x: '80vw' }}
        animate={{ x: '-20vw' }}
        transition={{ duration: speed, ease: 'linear' }}
        onAnimationComplete={onFail}
        className="absolute flex items-center gap-0.5"
        style={{ animation: shaking ? 'shake 0.2s infinite' : undefined }}
      >
        <div className="flex bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-violet-300 shadow-xl px-4 py-3 gap-1">
          {chars.map((char, i) => {
            const isTyped = i < typedCount;
            const isCurrent = i === typedCount;

            return (
              <span
                key={i}
                className={`
                  text-4xl font-mono font-bold transition-colors duration-150
                  ${isTyped
                    ? 'text-emerald-500'
                    : isCurrent
                      ? 'text-violet-700'
                      : 'text-slate-300'}
                `}
              >
                {char}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Left edge danger zone */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-red-500/20 to-transparent" />
    </div>
  );
};
