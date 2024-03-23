'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { merge } from '../../utils';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={merge(
          'w-min bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg',
          {
            'cursor-not-allowed opacity-50 hover:bg-blue-500': disabled,
            'w-full': fullWidth,
          },
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

export default Button;
