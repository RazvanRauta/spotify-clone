/**
 *  @author: Razvan Rauta
 *  Date: Dec 07 2021
 *  Time: 22:54
 */

import {
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';
import debounce from 'lodash/debounce';
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

  const [isPlaying, setIsPlaying] = useRecoilState(isSongPlayingAtom);

  const [volume, setVolume] = useState(25);

  const fetchCurrentTrack = async () => {
    if (!songInfo) {
      Promise.all([
        spotifyApi.getMyCurrentPlayingTrack(),
        spotifyApi.getMyCurrentPlaybackState(),
      ])
        .then(([currentTrackResponse, isPlayingResponse]) => {
          if (currentTrackResponse.body && currentTrackResponse.body.item) {
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

  const handlePlayPause = useCallback(async () => {
    try {
      const response = await spotifyApi.getMyCurrentPlaybackState();

      if (response.body) {
        if (response.body.is_playing) {
          await spotifyApi.pause();
          setIsPlaying(false);
        } else {
          await spotifyApi.play();
          setIsPlaying(true);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi]);

  const handleFastForward = useCallback(async () => {
    try {
      await spotifyApi.skipToNext();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [spotifyApi]);

  const handleReplay = useCallback(async () => {
    try {
      // eslint-disable-next-line no-console
      console.log('Repeat On');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentTrack();
      setVolume(50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

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
            useSkeleton
          />
        )}
        <div>
          <h3>{songInfo.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className='flex justify-evenly items-center'>
        <SwitchHorizontalIcon className='player-button' />
        <RewindIcon className='player-button' onClick={handleRewind} />
        {isPlaying ? (
          <PauseIcon
            className='player-button w-10 h-10'
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className='player-button w-10 h-10'
            onClick={handlePlayPause}
          />
        )}

        <FastForwardIcon
          className='player-button'
          onClick={handleFastForward}
        />

        <ReplyIcon className='player-button' onClick={handleReplay} />
      </div>

      <div className='flex justify-end items-center pr-5 space-x-3 md:space-x-4'>
        <VolumeDownIcon
          className='player-button'
          onClick={() =>
            setVolume((prev) => {
              const newVol = prev - 5 <= 0 ? 1 : prev - 5;
              return newVol;
            })
          }
        />
        <input
          type='range'
          className='w-14 md:w-28'
          onChange={(e) => setVolume(Number(e.target.value))}
          value={volume}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          className='player-button'
          onClick={() =>
            setVolume((prev) => {
              const newVol = prev + 5 >= 100 ? 99 : prev + 5;
              return newVol;
            })
          }
        />
      </div>
    </div>
  );
}
