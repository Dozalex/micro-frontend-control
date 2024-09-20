import * as React from 'react';

type Props = {
  className?: string;
  outOfBoundaries?: boolean;
  hideOnClick?: boolean;
  setOpened?: (open: boolean) => void;
  props?: Record<string, unknown>;
  children?: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
};

export const Content = ({
  children,
  props,
  outOfBoundaries,
  hideOnClick,
  className,
  setOpened,
  minWidth,
  maxWidth,
  ...rest
}: Props) => (
  <div
    className='transition'
    {...props}
    style={{
      ...(props?.style || {}),
      minWidth: minWidth ? `${minWidth}px` : undefined,
      maxWidth: maxWidth ? `${maxWidth}px` : undefined,
      opacity: outOfBoundaries ? '0 !important' : undefined,
    }}
  >
    <div
      className={`relative z-10 mt-0.5 mb-0.5 bg-gray-700 border border-gray-800 rounded-lg overflow-hidden ${className || ''}`}
      onClick={e => {
        if (hideOnClick && setOpened) {
          e.preventDefault();
          setOpened(false);
        }
      }}
      {...rest}
    >
      {children}
    </div>
  </div>
);
