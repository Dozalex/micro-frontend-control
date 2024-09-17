import * as React from 'react';

type Props = {
  label: string;
} & JSX.IntrinsicElements['textarea'];

export const Textarea = ({ label, id, className, value, ...props }: Props) => (
  <div className={`overflow-hidden ${className || ''}`}>
    <label
      htmlFor={id}
      className='block mb-2 text-sm font-medium text-gray-400 overflow-ellipsis whitespace-nowrap overflow-hidden'
    >
      {label}
    </label>
    <textarea
      id={id}
      className='border text-sm rounded-lg block w-full p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-200 focus:outline-none focus:border-sky-800'
      value={value || ''}
      {...props}
    />
  </div>
);
