import * as React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const TableColumnHeader = ({ className, ...props }: Props) => (
  <div
    className={`text-sm text-gray-400 font-medium ${className || ''}`}
    {...props}
  />
);
