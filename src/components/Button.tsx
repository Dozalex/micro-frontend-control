import * as React from 'react';

type Props = JSX.IntrinsicElements['button'];

export const Button = ({ className, ...props }: Props) => (
  <button
    type='button'
    className={`text-white focus-visible:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-sky-700 enabled:hover:bg-sky-900 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-sky-800 ${className || ''}`}
    {...props}
  />
);
