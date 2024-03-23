'use client';
import { PropsWithChildren } from 'react';
import './global.css';

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen w-screen	max-w-screen max-h-screen bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
