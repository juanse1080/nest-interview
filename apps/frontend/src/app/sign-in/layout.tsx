'use client';
import { PropsWithChildren } from 'react';

export default function SignInLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-80 rounded-md border h-min p-3">{children}</div>
    </div>
  );
}
