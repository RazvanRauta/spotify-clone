/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 07 2021
 * @ Time: 23:06
 */

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { currentTrackIdAtom } from '@/store/atoms/song';

import useSpotify from './useSpotify';

export default function useSongInfo() {
  const { spotifyApi } = useSpotify();

  const [songInfo, setSongInfo] =
    useState<SpotifyApi.SingleTrackResponse | null>(null);

  const currentTrackId = useRecoilValue(currentTrackIdAtom);

  const fetchSongInfo = async () => {
    if (currentTrackId) {
      try {
        const response = await spotifyApi.getTrack(currentTrackId);
        if (response.body) {
          setSongInfo(response.body);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };
  useEffect(() => {
    fetchSongInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}
