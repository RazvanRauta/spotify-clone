/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 07 2021
 * @ Time: 17:23
 */

import { atom } from 'recoil';

export const selectedPlaylistIdAtom = atom<string | null>({
  key: 'selectedPlaylistIdState',
  default: null,
});

export const playlistAtom = atom<SpotifyApi.SinglePlaylistResponse | null>({
  key: 'playListAtomState',
  default: null,
});
