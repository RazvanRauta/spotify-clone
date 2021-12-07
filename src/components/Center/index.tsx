/**
 *  @author: Razvan Rauta
 *  Date: Dec 07 2021
 *  Time: 14:39
 */

import { ChevronDownIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import shuffle from 'lodash/shuffle';
import { useSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';

import NextImage from '../NextImage';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-pink-500',
  'from-purple-500',
];

export default function Center(): ReactElement {
  const { data: session } = useSession();
  const [sectionColor, setSectionColor] = useState<string>();

  useEffect(() => {
    setSectionColor(shuffle(colors).pop());
  }, []);

  return (
    <div className='flex-grow'>
      <header className='absolute top-5 right-8'>
        <div className='flex items-center p-1 pr-2 space-x-3 bg-red-300 rounded-full opacity-90 cursor-pointer hover:opacity-80'>
          <NextImage
            src={session?.user?.image || ''}
            alt='Profile Pic'
            imgClassName='rounded-full'
            width={40}
            height={40}
          />
          <h4>{session?.user?.name}</h4>
          <ChevronDownIcon className='w-5 h-5' />
        </div>
      </header>
      <section
        className={clsx(
          'flex items-end p-8 space-x-7 w-full h-80 text-white bg-gradient-to-b to-black',
          sectionColor
        )}
      >
        <h1>hello</h1>
      </section>
    </div>
  );
}
