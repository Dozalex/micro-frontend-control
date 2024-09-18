import * as React from 'react';

type Props = {
  title: string;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
  onTitleClick?: () => void;
};

export const Section = ({
  children,
  title,
  headerContent,
  onTitleClick,
}: Props) => (
  <div className='grid gap-1'>
    <div className='flex items-center justify-between overflow-hidden'>
      <div
        className={`grow overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-200 ${onTitleClick ? 'hover:text-sky-400 focus:outline-none focus-visible:text-sky-500' : ''}`}
        role={onTitleClick ? 'button' : undefined}
        tabIndex={onTitleClick ? 0 : -1}
        onClick={onTitleClick}
      >
        {title}
      </div>

      {headerContent}
    </div>

    {children && (
      <div className='grid gap-5 border rounded-md p-3'>{children}</div>
    )}
  </div>
);
