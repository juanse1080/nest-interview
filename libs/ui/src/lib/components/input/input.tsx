import { HTMLAttributes, InputHTMLAttributes } from 'react';
import { merge } from '../../utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<HTMLDivElement> & {
    label?: string;
    helperText?: string;
    labelProps?: HTMLAttributes<HTMLLabelElement>;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    helperTextProps?: HTMLAttributes<HTMLParagraphElement>;
  };

export function Input({
  name,
  label,
  type,
  value,
  onChange,
  className,
  disabled,
  required,
  helperText,
  placeholder,
  labelProps,
  inputProps,
  helperTextProps,
  ...props
}: InputProps) {
  const disabledClass = { 'cursor-not-allowed opacity-50': disabled };

  const ariaDescribedby = name ? `${name}-explanation` : undefined;

  return (
    <div {...props} className={merge(className)}>
      {label && (
        <label
          {...labelProps}
          htmlFor={name}
          className={merge(
            'block mb-2 mx-2 text-sm font-medium text-gray-700 dark:text-white',
            disabledClass,
            labelProps?.className
          )}
        >
          {label} {required && '*'}
        </label>
      )}
      <input
        {...inputProps}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        className={merge(
          'border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          disabledClass,
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
            disabledClass,
            helperTextProps?.className
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
