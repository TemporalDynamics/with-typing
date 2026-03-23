/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DifficultyMode } from '../types/game';

/**
 * Difficulty configuration for each mode.
 * 
 * Easy: Learning focus - no Enter, more time, no penalty
 * Normal: Consolidation - Enter required, standard time, no penalty
 * Hard: Mastery - Enter required, less time, penalty for errors
 */
export const DIFFICULTY_CONFIG: Record<DifficultyMode, {
  lives: number;
  timeMultiplier: number;
  penaltyPerError: number;
  requiresEnter: boolean;
  comboLifeRecovery: number; // Combo needed to recover a life
}> = {
  easy: {
    lives: 5,
    timeMultiplier: 1.5, // 50% more time
    penaltyPerError: 0,
    requiresEnter: false,
    comboLifeRecovery: 15 // Recover life every 15 combo
  },
  normal: {
    lives: 5,
    timeMultiplier: 1.0, // Standard time
    penaltyPerError: 0,
    requiresEnter: true,
    comboLifeRecovery: 12 // Recover life every 12 combo
  },
  hard: {
    lives: 3, // Fewer lives
    timeMultiplier: 0.7, // 30% less time
    penaltyPerError: 1, // Extra penalty per error
    requiresEnter: true,
    comboLifeRecovery: 20 // Harder to recover lives
  }
};

/**
 * Get difficulty configuration for a given mode.
 */
export function getDifficultyConfig(mode: DifficultyMode): typeof DIFFICULTY_CONFIG[DifficultyMode] {
  return DIFFICULTY_CONFIG[mode];
}
