/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 07 2021
 * @ Time: 21:25
 */

import { atom } from 'recoil';

export const currentTrackIdAtom = atom<string | null>({
  key: 'currentTrackId',
  default: null,
});

export const isSongPlayingAtom = atom<boolean>({
  key: 'isSongPlaying',
  default: false,
});
