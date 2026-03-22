/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LightbulbSVG, KeyboardSVG, AnchorSVG } from '../icons/Icons';
import { getKeyMapping } from '../../engine/KeyboardMap';

interface HandGuideProps {
  targetKey: string;
}

export const HandGuide: React.FC<HandGuideProps> = ({ targetKey }) => {
  const key = targetKey.toLowerCase();
  const mapping = getKeyMapping(key);

  const isLeft = mapping?.hand === 'left';
  const isRight = mapping?.hand === 'right';

  const fingerLabel = mapping
    ? { pinky: 'Meñique', ring: 'Anular', middle: 'Medio', index: 'Índice' }[mapping.finger]
    : '';

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <div className="flex space-x-16">
        {/* Left Hand */}
        <div className={`relative w-44 h-28 border-4 rounded-[2rem] transition-all duration-500 ${isLeft ? 'border-emerald-400 bg-emerald-400/10 scale-110 shadow-2xl' : 'border-slate-300 bg-slate-100/50'}`}>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Izquierda</div>
          {isLeft && (
            <div className="flex items-center justify-center h-full text-sm font-black text-emerald-600">
              {fingerLabel} · {key.toUpperCase()}
            </div>
          )}
        </div>

        {/* Right Hand */}
        <div className={`relative w-44 h-28 border-4 rounded-[2rem] transition-all duration-500 ${isRight ? 'border-emerald-400 bg-emerald-400/10 scale-110 shadow-2xl' : 'border-slate-300 bg-slate-100/50'}`}>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Derecha</div>
          {isRight && (
            <div className="flex items-center justify-center h-full text-sm font-black text-emerald-600">
              {fingerLabel} · {key.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {(key === 'f' || key === 'j') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-100 text-amber-900 px-6 py-4 rounded-2xl text-sm font-bold border border-amber-200 shadow-sm max-w-md text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <LightbulbSVG className="w-5 h-5 text-amber-500" />
            <span className="underline decoration-2 underline-offset-4">F</span> y <span className="underline decoration-2 underline-offset-4">J</span> son tus anclas.
          </div>
          <div className="text-xs font-medium opacity-80">Tienen un pequeño relieve que puedes sentir sin mirar. Úsalos para orientar tus manos sin despegar la vista de la pantalla.</div>
        </motion.div>
      )}
    </div>
  );
};

import { FullKeyboard } from './FullKeyboard';

interface TutorialOverlayProps {
  onClose: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[3rem] p-12 max-w-3xl w-full shadow-2xl border-4 border-emerald-400/20 text-slate-800"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <KeyboardSVG className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tighter">Teclado Completo</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Lección 1: Posicionamiento</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <FullKeyboard highlightKeys={['f', 'j']} showFingerGuide={false} />
          <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Guía de Posicionamiento Inicial</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative overflow-hidden">
            <AnchorSVG className="absolute -right-4 -bottom-4 w-24 h-24 text-emerald-500/5 rotate-12" />
            <h3 className="font-black mb-2 flex items-center text-sm">
              <span className="w-5 h-5 bg-emerald-500 text-white rounded-full text-[10px] flex items-center justify-center mr-2">1</span>
              Relieve Táctil
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Las teclas <span className="font-black text-emerald-600">F</span> y <span className="font-black text-emerald-600">J</span> tienen marcas que puedes sentir. Son tus "anclas" para orientarte sin mirar.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-black mb-2 flex items-center text-sm">
              <span className="w-5 h-5 bg-emerald-500 text-white rounded-full text-[10px] flex items-center justify-center mr-2">2</span>
              Alineación
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Coloca tus dedos índices en las anclas y deja caer el resto en <span className="font-bold">A S D</span> y <span className="font-bold">K L ;</span>.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-black mb-2 flex items-center text-sm">
              <span className="w-5 h-5 bg-emerald-500 text-white rounded-full text-[10px] flex items-center justify-center mr-2">3</span>
              Memoria Muscular
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Confía en tus dedos. Si te pierdes, busca de nuevo el relieve. ¡El objetivo es no mirar nunca el teclado!
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-emerald-500/20"
        >
          ¡Entendido, vamos allá!
        </button>
      </motion.div>
    </motion.div>
  );
};

interface FallingLetterProps {
  char: string;
  input: string;
  onFail: () => void;
  speed?: number;
  shaking?: boolean;
}

export const FallingLetter: React.FC<FallingLetterProps> = ({ char, input, onFail, speed = 5, shaking }) => {
  const lane = React.useMemo(() => 8 + Math.random() * 84, [char]);
  const chars = char.split('');
  const typedCount = input.length;

  return (
    <motion.div
      initial={{ y: -120, x: '-50%' }}
      animate={{ y: '80vh' }}
      transition={{ duration: speed, ease: 'linear' }}
      onAnimationComplete={onFail}
      className="absolute flex bg-slate-800/80 px-5 py-4 rounded-2xl border-2 border-white/20 gap-0.5"
      style={{
        left: `${lane}%`,
        animation: shaking ? 'shake 0.2s infinite' : undefined
      }}
    >
      {chars.map((c, i) => {
        const isTyped = i < typedCount;
        const isCurrent = i === typedCount;

        return (
          <span
            key={i}
            className={`
              text-5xl font-mono font-bold transition-all duration-100
              ${isTyped
                ? 'text-emerald-400 scale-95'
                : isCurrent
                  ? 'text-white scale-110'
                  : 'text-white/30'}
            `}
          >
            {c}
          </span>
        );
      })}
    </motion.div>
  );
};
