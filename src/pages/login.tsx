import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import type { BuiltInProviderType } from 'next-auth/providers';
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { getProviders, getSession, signIn } from 'next-auth/react';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

export default function LoginPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const { query } = useRouter();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (query && query.error) {
      setIsError(true);
    } else if (isError) {
      setIsError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main>
        <div className='flex flex-col justify-center items-center w-full min-h-screen'>
          <NextImage
            src='/favicon/large-og.png'
            width={200}
            height={200}
            objectFit='contain'
            className='mb-5'
            alt='Logo'
            priority
          />
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} className='pb-5'>
                  {/* https://devdojo.com/tailwindcss/buttons#_ */}
                  <button
                    className='group inline-flex overflow-hidden relative justify-start items-center px-6 py-3 font-medium bg-white rounded-full transition-all hover:bg-white'
                    onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  >
                    <span className='bg-[#18D860] rotate-[-40deg] absolute bottom-0 left-0 mb-9 ml-9 w-48 h-48 rounded transition-all duration-500 ease-out -translate-x-full translate-y-full group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0'></span>
                    <span className='relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white'>
                      Login in with {provider.name}
                    </span>
                  </button>
                </div>
              ))}
            {isError && (
              <div className='flex justify-center items-center p-2 w-48 text-center bg-red-500 rounded'>
                <p className='text-red-100'>
                  Try signing in with a different account.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

type GetServerSideCustomProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};
export const getServerSideProps: GetServerSideProps<
  GetServerSideCustomProps
> = async (ctx) => {
  const providers = await getProviders();
  const session = await getSession(ctx);

  return {
    props: {
      providers,
      session,
    },
  };
};
