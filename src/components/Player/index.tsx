/**
 *  @author: Razvan Rauta
 *  Date: Dec 07 2021
 *  Time: 22:54
 */

import { RewindIcon, SwitchHorizontalIcon } from '@heroicons/react/outline';
import type { ReactElement } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import { useRecoilState } from 'recoil';

import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';

import { currentTrackIdAtom, isSongPlayingAtom } from '@/store/atoms/song';

import NextImage from '../NextImage';

export default function Player(): ReactElement {
  const songInfo = useSongInfo();
  const { spotifyApi } = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdAtom);

  const [_, setIsPlaying] = useRecoilState(isSongPlayingAtom);

  const [__, setVolume] = useState(50);

  const fetchCurrentTrack = async () => {
    if (!songInfo) {
      Promise.all([
        spotifyApi.getMyCurrentPlayingTrack(),
        spotifyApi.getMyCurrentPlaybackState(),
      ])
        .then(([currentTrackResponse, isPlayingResponse]) => {
          if (currentTrackResponse.body.item) {
            setCurrentTrackId(currentTrackResponse.body.item?.id);
          }
          if (isPlayingResponse.body) {
            setIsPlaying(isPlayingResponse.body.is_playing);
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  };

  const handleRewind = useCallback(async () => {
    try {
      await spotifyApi.skipToPrevious();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [spotifyApi]);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentTrack();
      setVolume(50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi]);

  if (!songInfo) {
    return <></>;
  }

  return (
    <div className='grid grid-cols-3 px-2 h-24 text-xs text-white bg-gradient-to-b from-black to-gray-900 md:px-8 md:text-base'>
      <div className='item-center flex space-x-4'>
        {songInfo.album.images?.[0]?.url && (
          <NextImage
            className='hidden md:block'
            src={songInfo.album.images?.[0]?.url}
            alt='Song cover'
            width={40}
            height={40}
          />
        )}
        <div>
          <h3>{songInfo.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div>
        <SwitchHorizontalIcon className='player-button' />
        <RewindIcon className='player-button' onClick={handleRewind} />
      </div>
    </div>
  );
}
