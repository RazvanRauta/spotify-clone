/**
 *  @author: Razvan Rauta
 *  Date: Dec 06 2021
 *  Time: 18:30
 */

import * as React from 'react';

import Layout from '@/components/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'></section>
      </main>
    </Layout>
  );
}
