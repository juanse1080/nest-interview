import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to nest-interview',
};

export default function SignInLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-4/12 rounded-md border h-min p-3">{children}</div>
    </div>
  );
}
