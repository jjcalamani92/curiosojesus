import QueryProvider from '@/src/providers/QueryProvider';
import ThemeNextProvider from '@/src/providers/ThemeNextProvider';
import '@/styles/globals.css';
import Header from '@/ui/Header';
import { ThemeProvider } from 'next-themes';
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
        
          <ThemeNextProvider>

          <Header />

          {children}
          </ThemeNextProvider>
      </body>
    </html>
  );
}
