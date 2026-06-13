/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

/**
 * Hook para detectar si estamos en modo embedded (universo_with)
 * y aplicar escala mobile viewport.
 */
export function useMobileViewportMode() {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const surface = urlParams.get('surface');
    
    if (surface === 'universo_with') {
      setIsMobileViewport(true);
      
      // Calcular escala óptima para simular viewport mobile
      // Target: ~375x667px (iPhone SE) escalado al espacio disponible
      const updateScale = () => {
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;
        
        // Dimensiones target mobile
        const mobileWidth = 375;
        const mobileHeight = 667;
        
        // Calcular escala para que quepa en ambas dimensiones
        const scaleX = containerWidth / mobileWidth;
        const scaleY = containerHeight / mobileHeight;
        
        // Usar la menor escala para que quepa en ambas dimensiones
        // Mínimo 0.4x para que entre en contraportada
        const newScale = Math.min(scaleX, scaleY, 1);
        
        setScale(newScale > 0.4 ? newScale : 0.4);
      };
      
      updateScale();
      window.addEventListener('resize', updateScale);
      
      return () => window.removeEventListener('resize', updateScale);
    }
  }, []);

  return { isMobileViewport, scale };
}

/**
 * Wrapper para aplicar mobile viewport mode
 * En modo universo_with, escala el juego para que quepa en la contraportada
 */
export function MobileViewportWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { isMobileViewport, scale } = useMobileViewportMode();

  if (!isMobileViewport) {
    return <>{children}</>;
  }

  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0d5c47',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: '375px',
          height: '667px',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
}
