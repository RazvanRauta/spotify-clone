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
import React from 'react';

export default function SideBar(): ReactElement {
  return (
    <div className='p-5 text-sm text-gray-500 border-r border-gray-900'>
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

        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
        <p className='cursor-pointer hover:text-white'>Playlist Name...</p>
      </div>
    </div>
  );
}
