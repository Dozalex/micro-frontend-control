import * as React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Hint = ({ className, children }: Props) => (
  <div
    className={`text-sm text-gray-500 whitespace-pre-wrap pl-4 mt-2 ${className || ''}`}
  >
    {children}
  </div>
);
