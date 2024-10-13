import * as React from 'react';

type Props = {
  className?: string;
};

export const Divider = ({ className }: Props) => (
  <div className={`flex w-full border-b border-gray-700 ${className || ''}`} />
);
