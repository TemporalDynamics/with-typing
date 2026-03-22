/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { StarSVG, CrownSVG, WarningSVG } from '../icons/Icons';
import { motion, AnimatePresence } from 'motion/react';
import { soundService } from '../../services/soundService';

interface HostCharacterProps {
  mood: 'happy' | 'neutral' | 'sad' | 'excited' | 'thinking';
  message?: string;
  sparkle?: boolean;
  celebrating?: boolean;
}

const KoalaSVG: React.FC<{ mood: string; celebrating?: boolean }> = ({ mood, celebrating }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    {/* Ears */}
    <circle cx="20" cy="35" r="18" fill="#94a3b8" />
    <circle cx="80" cy="35" r="18" fill="#94a3b8" />
    <circle cx="20" cy="35" r="10" fill="#cbd5e1" />
    <circle cx="80" cy="35" r="10" fill="#cbd5e1" />
    
    {/* Head */}
    <path d="M 15 60 Q 15 20 50 20 Q 85 20 85 60 Q 85 90 50 90 Q 15 90 15 60" fill="#cbd5e1" />
    
    {/* Blush for excited/celebrating */}
    {(mood === 'excited' || celebrating) && (
      <>
        <circle cx="30" cy="65" r="5" fill="#fca5a5" opacity="0.4" />
        <circle cx="70" cy="65" r="5" fill="#fca5a5" opacity="0.4" />
      </>
    )}

    {/* Eyes */}
    <g>
      {mood === 'sad' ? (
        <>
          <path d="M 30 55 Q 35 50 40 55" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 60 55 Q 65 50 70 55" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : mood === 'thinking' ? (
        <>
          <circle cx="35" cy="55" r="3" fill="#1e293b" />
          <path d="M 60 55 L 75 53" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : mood === 'excited' || celebrating ? (
        <>
          {/* Star Eyes for Excited */}
          <g transform="translate(35, 55) scale(0.6)">
            <StarSVG className="text-[#1e293b] w-12 h-12 -translate-x-6 -translate-y-6" />
          </g>
          <g transform="translate(65, 55) scale(0.6)">
            <StarSVG className="text-[#1e293b] w-12 h-12 -translate-x-6 -translate-y-6" />
          </g>
        </>
      ) : (
        <>
          <motion.circle 
            cx="35" cy="55" r="4" 
            fill="#1e293b" 
            animate={{ scaleY: [1, 1, 1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, times: [0, 0.9, 0.95, 0.98, 1] }}
          />
          <motion.circle 
            cx="65" cy="55" r="4" 
            fill="#1e293b" 
            animate={{ scaleY: [1, 1, 1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, times: [0, 0.9, 0.95, 0.98, 1] }}
          />
        </>
      )}
    </g>

    {/* Nose */}
    <rect x="44" y="58" width="12" height="16" rx="6" fill="#1e293b" />
    
    {/* Mouth */}
    <motion.path
      d={
        mood === 'happy' || celebrating || mood === 'excited' 
          ? "M 42 80 Q 50 88 58 80" 
          : mood === 'sad' 
          ? "M 42 84 Q 50 78 58 84"
          : mood === 'thinking'
          ? "M 45 82 L 55 80"
          : "M 42 82 Q 50 82 58 82"
      }
      stroke="#1e293b"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const BirdSVG: React.FC<{ active: boolean }> = ({ active }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
    {/* Body */}
    <path d="M 20 60 Q 50 30 85 60 Q 50 90 20 60" fill="#475569" />
    
    {/* Head */}
    <circle cx="80" cy="50" r="18" fill="#475569" />
    
    {/* Eye */}
    <g>
      <circle cx="85" cy="45" r="4" fill="white" />
      <circle cx="87" cy="45" r="2" fill="black" />
      {active && (
        <path d="M 78 38 L 88 42" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      )}
    </g>

    {/* Beak */}
    <motion.g
      animate={active ? { rotate: [0, -10, 0], x: [0, 5, 0] } : {}}
      transition={{ repeat: Infinity, duration: 0.4 }}
    >
      <path d="M 95 50 L 110 55 L 95 60 Z" fill="#f59e0b" />
    </motion.g>

    {/* Wing */}
    <motion.path 
      d="M 35 60 Q 50 45 65 60" 
      stroke="#334155" 
      strokeWidth="5" 
      fill="none" 
      strokeLinecap="round"
      animate={active ? { rotate: [0, -30, 0], y: [0, -5, 0] } : { rotate: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: active ? 0.2 : 1 }}
    />
  </svg>
);

export const HostCharacter: React.FC<HostCharacterProps> = ({ mood, message, sparkle, celebrating }) => {
  return (
    <div className="fixed bottom-8 left-8 z-20 flex items-end space-x-4">
      <div className="relative w-32 h-32">
        <AnimatePresence>
          {(sparkle || celebrating) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: celebrating ? [0, 2, 0] : [0, 1.5, 0], 
                opacity: [0, 1, 0],
                rotate: celebrating ? [0, 90, 180, 270, 360] : 0
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: celebrating ? 1 : 0.5 }}
              className="absolute -top-8 -right-8 pointer-events-none flex space-x-1"
            >
              <StarSVG className="w-8 h-8 text-amber-400" />
              {celebrating && <StarSVG className="w-10 h-10 text-amber-300" />}
              <StarSVG className="w-8 h-8 text-amber-400" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          animate={celebrating ? {
            y: [0, -100, 0],
            rotate: [0, 360, 720],
            scale: [1, 1.5, 1]
          } : {
            y: [0, -10, 0],
            rotate: mood === 'excited' ? [0, 5, -5, 0] : 0,
            scale: sparkle ? [1, 1.2, 1] : 1
          }}
          transition={celebrating ? {
            duration: 1,
            ease: "easeOut"
          } : { 
            y: { repeat: Infinity, duration: 3 },
            scale: { duration: 0.3 }
          }}
          className="w-full h-full"
        >
          <KoalaSVG mood={mood} celebrating={celebrating} />
        </motion.div>

        {celebrating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full -z-10"
          />
        )}
      </div>
      
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            className="bg-white text-emerald-900 px-6 py-3 rounded-2xl rounded-bl-none shadow-xl border-2 border-emerald-100 font-medium max-w-xs"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ComboBurst: React.FC<{ combo: number }> = ({ combo }) => {
  const isMajor = combo > 0 && combo % 10 === 0;
  
  return (
    <AnimatePresence>
      {combo > 0 && combo % 5 === 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 0 }}
          animate={{ 
            scale: isMajor ? [1, 2.5, 2] : [1, 2, 1.5], 
            opacity: [0, 1, 0], 
            y: isMajor ? -200 : -100 
          }}
          exit={{ opacity: 0 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 flex flex-col items-center"
        >
          <div className={`
            font-black drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]
            ${isMajor ? 'text-8xl text-amber-400' : 'text-6xl text-emerald-400'}
          `}>
            {combo} COMBO!
          </div>
          <div className="flex space-x-4 mt-4">
            {Array.from({ length: isMajor ? 6 : 4 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: (i - (isMajor ? 2.5 : 1.5)) * (isMajor ? 80 : 50), 
                  y: -100 - Math.random() * 100,
                  rotate: Math.random() * 720,
                  scale: [0, 1.5, 0]
                }}
                transition={{ duration: 1.2, delay: i * 0.05 }}
                className="w-12 h-12"
              >
                {isMajor && i % 2 === 0 ? (
                  <CrownSVG className="text-amber-400" />
                ) : (
                  <StarSVG className="text-emerald-400" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface EnemyActorProps {
  type: 'bird' | 'fox' | 'raccoon';
  active: boolean;
  onSteal?: () => void;
}

export const EnemyActor: React.FC<EnemyActorProps> = ({ type, active, onSteal }) => {
  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        soundService.playEnemyAction();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ x: '100vw', y: 100, rotate: 0 }}
          animate={{ 
            x: '80vw', 
            y: [150, 140, 150],
            rotate: [0, -10, 0]
          }}
          exit={{ x: '100vw', y: 100 }}
          transition={{ 
            x: { duration: 1, type: 'spring' },
            y: { repeat: Infinity, duration: 0.5 },
            rotate: { repeat: Infinity, duration: 0.5 }
          }}
          className="fixed z-20 w-32 h-32 filter drop-shadow-md flex flex-col items-center"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="bg-rose-500 text-white text-[10px] uppercase tracking-tighter font-black px-3 py-1 rounded-full mb-2 shadow-lg"
          >
            ¡ROBANDO!
          </motion.div>
          <div className="relative w-full h-full">
            <BirdSVG active={active} />
            <motion.div
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                x: [-20, -40, -20]
              }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="absolute top-0 left-0 text-2xl"
            >
              <WarningSVG className="w-8 h-8 text-rose-500" />
            </motion.div>
            
            {/* Swipe line indicating stealing attempt */}
            <motion.div
              animate={{ 
                width: [0, 300, 0],
                opacity: [0, 0.5, 0],
                x: [0, -300, 0]
              }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              className="absolute top-1/2 right-full h-1 bg-rose-400 blur-sm rounded-full origin-right pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
