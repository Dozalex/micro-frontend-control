import * as React from 'react';

export type IconButtonProps = {
  icon: React.JSXElementConstructor<React.SVGProps<SVGElement>>;
  onClick?: () => void;
  disabled?: boolean;
};

export const IconButton = ({
  icon: Icon,
  onClick,
  disabled,
}: IconButtonProps) => (
  <button
    type='button'
    className='text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:bg-gray-600 enabled:hover:text-white focus:outline-none focus-visible:bg-gray-600 focus-visible:text-white'
    onClick={onClick}
    disabled={disabled}
  >
    <Icon className='w-5 h-5' aria-hidden='true' fill='currentColor' />
  </button>
);
