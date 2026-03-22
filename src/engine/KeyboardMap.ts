/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hand, FingerName } from '../types/game';

export interface KeyMapping {
  key: string;
  row: 0 | 1 | 2;
  hand: Hand;
  finger: FingerName;
}

const KEYBOARD_LAYOUT: KeyMapping[] = [
  // Row 0 — top
  { key: 'q', row: 0, hand: 'left',  finger: 'pinky'  },
  { key: 'w', row: 0, hand: 'left',  finger: 'ring'   },
  { key: 'e', row: 0, hand: 'left',  finger: 'middle' },
  { key: 'r', row: 0, hand: 'left',  finger: 'index'  },
  { key: 't', row: 0, hand: 'left',  finger: 'index'  },
  { key: 'y', row: 0, hand: 'right', finger: 'index'  },
  { key: 'u', row: 0, hand: 'right', finger: 'index'  },
  { key: 'i', row: 0, hand: 'right', finger: 'middle' },
  { key: 'o', row: 0, hand: 'right', finger: 'ring'   },
  { key: 'p', row: 0, hand: 'right', finger: 'pinky'  },
  // Row 1 — home
  { key: 'a', row: 1, hand: 'left',  finger: 'pinky'  },
  { key: 's', row: 1, hand: 'left',  finger: 'ring'   },
  { key: 'd', row: 1, hand: 'left',  finger: 'middle' },
  { key: 'f', row: 1, hand: 'left',  finger: 'index'  },
  { key: 'g', row: 1, hand: 'left',  finger: 'index'  },
  { key: 'h', row: 1, hand: 'right', finger: 'index'  },
  { key: 'j', row: 1, hand: 'right', finger: 'index'  },
  { key: 'k', row: 1, hand: 'right', finger: 'middle' },
  { key: 'l', row: 1, hand: 'right', finger: 'ring'   },
  { key: ';', row: 1, hand: 'right', finger: 'pinky'  },
  // Row 2 — bottom
  { key: 'z', row: 2, hand: 'left',  finger: 'pinky'  },
  { key: 'x', row: 2, hand: 'left',  finger: 'ring'   },
  { key: 'c', row: 2, hand: 'left',  finger: 'middle' },
  { key: 'v', row: 2, hand: 'left',  finger: 'index'  },
  { key: 'b', row: 2, hand: 'left',  finger: 'index'  },
  { key: 'n', row: 2, hand: 'right', finger: 'index'  },
  { key: 'm', row: 2, hand: 'right', finger: 'index'  },
];

export const KEYBOARD_MAP: ReadonlyMap<string, KeyMapping> = new Map(
  KEYBOARD_LAYOUT.map(k => [k.key, k])
);

export const KEYBOARD_ROWS: readonly (readonly KeyMapping[])[] = [
  KEYBOARD_LAYOUT.filter(k => k.row === 0),
  KEYBOARD_LAYOUT.filter(k => k.row === 1),
  KEYBOARD_LAYOUT.filter(k => k.row === 2),
];

export function getKeyMapping(key: string): KeyMapping | undefined {
  return KEYBOARD_MAP.get(key.toLowerCase());
}

export function getKeysByHand(hand: Hand): KeyMapping[] {
  return KEYBOARD_LAYOUT.filter(k => k.hand === hand);
}

export function getKeysByRow(row: 0 | 1 | 2): KeyMapping[] {
  return KEYBOARD_LAYOUT.filter(k => k.row === row);
}
