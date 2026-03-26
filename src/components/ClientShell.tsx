'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from './Navbar';

const ClientShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
};

export default ClientShell;
