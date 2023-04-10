import QueryProvider from '@/src/providers/QueryProvider';
import '@/styles/globals.css';
import Header from '@/ui/Header';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Curioso Jesus</title>
      </head>
      <body className="">
        {/* <QueryProvider > */}

          <Header />

          {children}
        {/* </QueryProvider> */}
      </body>
    </html>
  );
}
