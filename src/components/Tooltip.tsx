import * as React from 'react';

import { Dropdown, DropdownProps } from './Dropdown/Dropdown';

export type TooltipProps = {
  title?: React.ReactNode;
  show?: boolean;
} & Omit<DropdownProps, 'renderContent'>;

export const Tooltip = ({
  title,
  usePortal = true,
  placement = 'top',
  children,
  show = true,
  maxWidth = 500,
  openDelay = 500,
  ...rest
}: TooltipProps) =>
  title ? (
    <Dropdown
      openDelay={openDelay}
      usePortal={usePortal}
      placement={placement}
      data-show={show || undefined}
      trigger='hover'
      maxWidth={maxWidth}
      {...rest}
      className={`${show ? 'flex px-2 py-1' : 'hidden'}`}
      renderContent={() => (
        <div className='flex break-words select-none text-white'>{title}</div>
      )}
    >
      {children}
    </Dropdown>
  ) : (
    children
  );
