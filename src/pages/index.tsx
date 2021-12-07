/**
 *  @author: Razvan Rauta
 *  Date: Dec 06 2021
 *  Time: 18:30
 */

import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import * as React from 'react';

import Center from '@/components/Center';
import Layout from '@/components/Layout';
import Player from '@/components/Player';
import Seo from '@/components/Seo';
import SideBar from '@/components/Sidebar';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main className='flex'>
        <SideBar />
        <Center />
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      session,
    },
  };
};
