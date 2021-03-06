/**
 *  @author: Razvan Rauta
 *  Date: Dec 07 2021
 *  Time: 20:26
 */

import clsx from 'clsx';
import format from 'date-fns/format';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import React from 'react';
import { useRecoilState } from 'recoil';

import useSpotify from '@/hooks/useSpotify';

import { currentTrackIdAtom, isSongPlayingAtom } from '@/store/atoms/song';

import NextImage from '../NextImage';

interface SongProps {
  song: SpotifyApi.PlaylistTrackObject;
  order: number;
}

export default React.memo(function Song({
  song: { track },
  order,
}: SongProps): ReactElement {
  const { spotifyApi } = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isSongPlayingAtom);

  const [isCurrentTrackPlaying, setIsCurrentTrackPlaying] = useState(false);

  const playSong = useCallback(() => {
    setCurrentTrackId(track?.id);
    setIsPlaying(true);
    spotifyApi
      .play({
        uris: [track.uri],
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Play Error', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track, spotifyApi]);

  useEffect(() => {
    setIsCurrentTrackPlaying(currentTrackId === track?.id && isPlaying);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrackId]);

  if (!track) {
    return <></>;
  }

  return (
    <div
      className='grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900'
      onClick={playSong}
    >
      <div className='flex items-center space-x-4'>
        <p className={clsx(isCurrentTrackPlaying && 'text-[#1DB954]')}>
          {order + 1}
        </p>
        {track.album.images?.[0]?.url && (
          <NextImage
            src={track.album.images?.[0]?.url}
            alt='Track Cove'
            width={40}
            height={40}
            imgClassName={
              isCurrentTrackPlaying ? 'rounded-full animate-spin-slow' : ''
            }
          />
        )}
        <div>
          <p
            className={clsx(
              'w-36 text-white truncate lg:w-64',
              isCurrentTrackPlaying && 'text-[#1DB954]'
            )}
          >
            {track.name}
          </p>
          <p className='w-40'>{track.artists[0].name}</p>
        </div>
      </div>

      <div className='flex justify-between items-center ml-auto md:ml-0'>
        <p className='hidden w-40 md:inline'>{track.album.name}</p>
        <p>{format(track.duration_ms, 'mm:ss')}</p>
      </div>
    </div>
  );
});
