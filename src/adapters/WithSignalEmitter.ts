/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { B1Signal } from '../types/game';

/**
 * Emisor de señales para modo embedded en Universo WITH.
 * Envía señales por postMessage al host para persistencia en global_signals.
 */
export interface GameEventEmitter {
  emitSignal(signal: B1Signal): void;
}

export class WithIframeSignalEmitter implements GameEventEmitter {
  private hostOrigin: string | null = null;
  private messageQueue: B1Signal[] = [];

  constructor() {
    this.listenForHostContext();
  }

  private listenForHostContext() {
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'with:host_context') {
        this.hostOrigin = event.origin;
        console.log('[WithSignalEmitter] Host origin set:', event.origin);
        
        // Enviar señales encoladas una vez que el host está listo
        if (this.messageQueue.length > 0) {
          console.log('[WithSignalEmitter] Flushing queued signals:', this.messageQueue.length);
          this.messageQueue.forEach(signal => this.sendSignalToHost(signal));
          this.messageQueue = [];
        }
      }
    });
  }

  private sendSignalToHost(signal: B1Signal) {
    if (!this.hostOrigin) {
      // Encolar señal si el host aún no está listo
      this.messageQueue.push(signal);
      return;
    }

    window.parent.postMessage(
      { 
        type: 'with-typing:signal_emitted', 
        payload: signal 
      },
      this.hostOrigin
    );

    if (import.meta.env.DEV && import.meta.env.VITE_DEBUG_SIGNALS === 'true') {
      console.log('[WithSignalEmitter] Signal sent to host:', signal.signal_type, signal.payload);
    }
  }

  emitSignal(signal: B1Signal) {
    if (this.hostOrigin) {
      this.sendSignalToHost(signal);
    } else {
      // Encolar señal hasta que el host esté listo
      this.messageQueue.push(signal);
      
      // Fallback: logging en consola para standalone mode / debug
      if (import.meta.env.DEV) {
        console.log('[WithSignalEmitter] Host not ready, queuing signal:', signal.signal_type);
      }
    }
  }
}
