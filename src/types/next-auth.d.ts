/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @ @author: Razvan Rauta
 * @ Date: Dec 06 2021
 * @ Time: 22:09
 */

import type { DefaultSession } from 'next-auth';
import { Session, User } from 'next-auth';
import type { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  type JWTError = 'RefreshAccessTokenError';
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    username: string;
    accessTokenExpires: number;
    error?: JWTError;
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string | null;
      refreshToken?: string | null;
      username?: string | null;
    };
  }
}
