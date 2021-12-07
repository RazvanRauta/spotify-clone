/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 29 2021
 * @ Time: 22:14
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_CLIENT_ID: string;
      NEXT_PUBLIC_CLIENT_SECRET: string;
      PUBLIC_URLS: string;
    }
  }
}

export {};
