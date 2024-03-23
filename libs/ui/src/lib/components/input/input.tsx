'use client';

import { HTMLAttributes, InputHTMLAttributes, forwardRef } from 'react';
import { merge } from '../../utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<HTMLDivElement> & {
    label?: string;
    error?: boolean;
    fulWidth?: boolean;
    helperText?: string;
    labelProps?: HTMLAttributes<HTMLLabelElement>;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    helperTextProps?: HTMLAttributes<HTMLParagraphElement>;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      type,
      value,
      error,
      fulWidth,
      onChange,
      defaultValue,
      onBlur,
      className,
      disabled,
      required,
      helperText,
      placeholder,
      labelProps,
      inputProps,
      helperTextProps,
      ...props
    },
    ref
  ) => {
    console.log('SERVER');
    const ariaDescribedby = name ? `${name}-explanation` : undefined;

    return (
      <div
        {...props}
        className={merge(className, {
          'w-full': fulWidth,
          'opacity-50': disabled,
        })}
      >
        {label && (
          <label
            {...labelProps}
            htmlFor={name}
            className={merge(
              'block mb-2 mx-2 text-sm font-medium text-gray-700 dark:text-white',
              {
                'text-rose-500': error,
                'cursor-not-allowed': disabled,
              },
              labelProps?.className
            )}
          >
            {label} {required && '*'}
          </label>
        )}
        <input
          {...inputProps}
          ref={ref}
          id={name}
          type={type}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          onBlur={onBlur}
          className={merge(
            'border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            {
              'border-rose-500': error,
              'cursor-not-allowed': disabled,
            },
            inputProps?.className
          )}
          placeholder={placeholder}
          disabled={disabled}
          aria-describedby={ariaDescribedby}
        />
        {helperText && (
          <p
            {...helperTextProps}
            id={ariaDescribedby}
            className={merge(
              'mx-2 mt-2 text-sm text-gray-500 dark:text-gray-400',
              {
                'text-rose-500': error,
                'cursor-not-allowed': disabled,
              },
              helperTextProps?.className
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
