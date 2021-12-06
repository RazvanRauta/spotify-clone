/**
 *  @author: Razvan Rauta
 *  Date: Dec 06 2021
 *  Time: 18:30
 */

import type { AppProps } from 'next/app';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
