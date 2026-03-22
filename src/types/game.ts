/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LevelId =
  | 'L1'  | 'L2'  | 'L3'  | 'L4'  | 'L5'  | 'L6'  | 'L7'  | 'L8'  | 'L9'  | 'L10'
  | 'L11' | 'L12' | 'L13' | 'L14' | 'L15' | 'L16' | 'L17' | 'L18' | 'L19' | 'L20'
  | 'L21' | 'L22' | 'L23' | 'L24' | 'L25' | 'L26' | 'L27' | 'L28' | 'L29' | 'L30'
  | 'L31' | 'L32' | 'L33' | 'L34' | 'L35' | 'L36' | 'L37' | 'L38' | 'L39' | 'L40'
  | 'L41' | 'L42' | 'L43' | 'L44' | 'L45' | 'L46' | 'L47' | 'L48' | 'L49' | 'L50';

export type TargetUnitKind = 'home_row' | 'letter' | 'sequence' | 'bigram' | 'word_build';

export type Hand = 'left' | 'right';
export type FingerName = 'pinky' | 'ring' | 'middle' | 'index';

export type HostMood = 'happy' | 'neutral' | 'sad' | 'excited' | 'thinking';

export interface LevelDefinition {
  id: LevelId;
  familyId: 1 | 2 | 3 | 4 | 5;
  familyTitle: string;
  sublevel: number;
  title: string;
  objective: string;
  targetUnitKind: TargetUnitKind;
  content: string[];
  minAccuracy: number;
  minInputs: number;
  backgroundUrl: string;
  colorTheme: string;
  mechanic: 'tutorial' | 'falling' | 'trail' | 'rescue' | 'garden';
  fallDurationSec?: number;
}

export interface LevelScore {
  bestAccuracy: number;
  bestWpm: number;
  stars: 0 | 1 | 2 | 3;
}

export interface GameProgress {
  unlockedLevels: LevelId[];
  levelScores: Partial<Record<LevelId, LevelScore>>;
  totalAccuracy: number;
}

export interface GameState {
  currentLevelId: LevelId | null;
  status: 'LOBBY' | 'PLAYING' | 'LEVEL_COMPLETE' | 'SESSION_COMPLETE';
  score: number;
  accuracy: number;
  progress: number;
  playerHandle: string;
  lives: number;
  combo: number;
}

export interface GameEvent {
  type: 'TUTORIAL_COMPLETED' | 'KEY_SUBMITTED' | 'KEY_VALIDATED' | 'UNIT_FAILED' | 'LEVEL_COMPLETED' | 'SESSION_COMPLETED';
  levelId: LevelId | null;
  runId: string;
  sessionId: string;
  payload: any;
  timestamp: number;
}

export type F1SignalClass = 'observabilidad' | 'apoyo' | 'promocion';

export type B1SignalType = 
  | 'feature.action_bar_action_usage'
  | 'interaction.response_latency_ms'
  | 'interaction.session_turn_count'
  | 'feature.resolution_kind_usage'
  | 'feature.resolver_id_usage'
  | 'reliability.insufficient_evidence_count'
  | 'reliability.fallback_path_used';

export interface B1Signal {
  signal_id?: string;
  signal_type: B1SignalType;
  schema_version: 'v1';
  payload: Record<string, any>;
  runtime_mode: 'local_strict' | 'hybrid';
  app_version: string;
  emitted_at?: string;
}
