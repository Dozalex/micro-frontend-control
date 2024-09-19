import * as React from 'react';

const VARIANT_CLASS = {
  primary:
    'text-white bg-sky-700 enabled:hover:bg-sky-800 focus-visible:ring-sky-900',
  secondary:
    'text-white bg-gray-500 enabled:hover:bg-gray-600 focus-visible:ring-gray-700',
  warning:
    'text-white bg-rose-500 enabled:hover:bg-rose-600 focus-visible:ring-rose-700',
} as const;

type Props = {
  variant?: keyof typeof VARIANT_CLASS;
} & JSX.IntrinsicElements['button'];

export const Button = ({ variant = 'primary', className, ...props }: Props) => (
  <button
    type='button'
    className={`focus-visible:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 disabled:cursor-not-allowed focus:outline-none ${VARIANT_CLASS[variant]} ${className || ''}`}
    {...props}
  />
);
