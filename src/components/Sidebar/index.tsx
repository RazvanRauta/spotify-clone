/**
 *  @author: Razvan Rauta
 *  Date: Dec 06 2021
 *  Time: 20:31
 */

import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import type { ReactElement } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import { useRecoilState } from 'recoil';

import useSpotify from '@/hooks/useSpotify';

import { selectedPlaylistIdAtom } from '@/store/atoms/playlist';

export default React.memo(function SideBar(): ReactElement {
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const { spotifyApi } = useSpotify();

  const [_, setSelectedPlaylistId] = useRecoilState(selectedPlaylistIdAtom);

  const handlePlayListSelect = useCallback(
    (id: string | null) => {
      setSelectedPlaylistId(id);
    },
    [setSelectedPlaylistId]
  );

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        handlePlayListSelect(data?.body?.items[0]?.id ?? null);
      });
    }
  }, [handlePlayListSelect, spotifyApi]);

  return (
    <div className='scrollbar-hide hidden overflow-y-scroll p-5 h-screen text-xs text-gray-500 border-r border-gray-900 sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm'>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='w-5 h-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='w-5 h-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='w-5 h-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='w-5 h-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='w-5 h-5' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='w-5 h-5' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        {playlists &&
          playlists.map((playlist) => (
            <p
              className='cursor-pointer hover:text-white'
              onClick={() => handlePlayListSelect(playlist.id)}
              key={playlist.id}
            >
              {playlist.name}
            </p>
          ))}
      </div>
    </div>
  );
});
