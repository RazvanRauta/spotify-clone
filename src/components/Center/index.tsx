/**
 *  @author: Razvan Rauta
 *  Date: Dec 07 2021
 *  Time: 14:39
 */

import {
  ChevronDownIcon,
  PhotographIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import clsx from 'clsx';
import shuffle from 'lodash/shuffle';
import { signOut, useSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useSpotify from '@/hooks/useSpotify';

import { playlistAtom, selectedPlaylistIdAtom } from '@/store/atoms/playlist';

import NextImage from '../NextImage';
import Songs from '../Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-pink-500',
  'from-purple-500',
];

export default React.memo(function Center(): ReactElement {
  const { data: session } = useSession();
  const [sectionColor, setSectionColor] = useState<string>();
  const selectedPlaylistId = useRecoilValue(selectedPlaylistIdAtom);
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);
  const { spotifyApi } = useSpotify();

  useEffect(() => {
    setSectionColor(shuffle(colors).pop());
  }, [selectedPlaylistId]);

  useEffect(() => {
    if (selectedPlaylistId) {
      spotifyApi
        .getPlaylist(selectedPlaylistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log({ err });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlaylistId, spotifyApi]);

  return (
    <div className='scrollbar-hide overflow-y-scroll flex-grow h-screen'>
      <header className='absolute top-5 right-8'>
        <div
          className='flex items-center p-1 pr-2 space-x-3 bg-black rounded-full opacity-90 cursor-pointer hover:opacity-80'
          onClick={() => signOut()}
          title='Sign Out'
        >
          {session?.user?.image ? (
            <NextImage
              src={session?.user?.image}
              alt='Profile Pic'
              imgClassName='rounded-full'
              width={40}
              height={40}
              priority
            />
          ) : (
            <UserCircleIcon className='w-10 h-10 text-green-500' />
          )}
          <h4 className='text-white'>{session?.user?.name}</h4>
          <ChevronDownIcon className='w-5 h-5 text-white' />
        </div>
      </header>
      <section
        className={clsx(
          'flex items-end p-8 space-x-7 w-full h-80 text-white bg-gradient-to-b to-black',
          sectionColor
        )}
      >
        {playlist?.images?.[0]?.url ? (
          <NextImage
            src={playlist?.images?.[0]?.url}
            alt='Cover'
            imgClassName='shadow-2xl'
            width={176}
            height={176}
            useSkeleton
          />
        ) : (
          <div className='flex flex-col justify-center items-center w-44 h-44 border-2'>
            <PhotographIcon className='w-32 h-32' />
            <p>No Cover</p>
          </div>
        )}
        <div>
          <p>PLAYLIST</p>
          {playlist?.name && (
            <h2 className='text-2xl font-bold md:text-3xl xl:text-5xl'>
              {playlist?.name}
            </h2>
          )}
        </div>
      </section>
      <div>
        {playlist?.tracks.items && <Songs songs={playlist?.tracks.items} />}
      </div>
    </div>
  );
});
