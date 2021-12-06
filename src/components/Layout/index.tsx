import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className='overflow-hidden h-screen bg-black'>{children}</div>;
}
