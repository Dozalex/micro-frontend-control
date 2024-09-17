import * as React from 'react';

export type Props = {
  icon: React.JSXElementConstructor<React.SVGProps<SVGElement>>;
  onClick?: () => void;
};

export const IconButton = ({ icon: Icon, onClick }: Props) => (
  <button
    type='button'
    className='text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white focus:outline-none focus:bg-gray-600 focus:text-white'
    onClick={onClick}
  >
    <Icon className='w-5 h-5' aria-hidden='true' fill='currentColor' />
  </button>
);
