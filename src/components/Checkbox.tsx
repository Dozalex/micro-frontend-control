import * as React from 'react';

type Props = {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

export const Checkbox = ({ checked, label, onChange }: Props) => (
  <div className='flex'>
    <label className='flex items-center gap-2 ms-2 text-sm font-medium text-gray-300 cursor-pointer'>
      <input
        type='checkbox'
        value=''
        checked={checked}
        className='w-4 h-4 bg-gray-100 border-gray-300 rounded accent-sky-700 focus:outline-none focus:ring-sky-800 focus:ring-4'
        onChange={() => onChange(!checked)}
      />

      {label}
    </label>
  </div>
);