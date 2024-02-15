import { ButtonHTMLAttributes } from 'react';
import { merge } from '../../utils';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  disabled,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={merge(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg',
        { 'cursor-not-allowed opacity-50 hover:bg-blue-500': disabled },
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}

export default Button;
