/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 06 2021
 * @ Time: 21:07
 */

import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

import logger from '@/lib/logger';
import spotifyApi, { LOGIN_URL } from '@/lib/spotify';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    logger.info('REFRESHED TOKEN IS: ', refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    logger.error('ERROR WHILE REFRESHING TOKEN: ', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token || '',
          refreshToken: account.refresh_token || '',
          username: account.providerAccountId || '',
          accessTokenExpires: (account?.expires_at || 1) * 1000,
        };
      }

      if (Date.now() < token?.accessTokenExpires) {
        logger.info('TOKEN IS STILL VALID');
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session && session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;
      }
      return session;
    },
  },
});
