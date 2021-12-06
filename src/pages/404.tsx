/**
 *  @author: Razvan Rauta
 *  Date: Dec 06 2021
 *  Time: 18:30
 */

import { EmojiSadIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import * as React from 'react';

import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center text-black'>
            <EmojiSadIcon className='animate-flicker drop-shadow-glow w-14 h-14 text-red-500' />
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>

            <Link href={'/'}>
              <a className={'mt-4 md:text-lg'}>Back to Home</a>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
