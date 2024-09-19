import * as React from 'react';

import { Close } from 'icons';
import { useDisableScrollUntilUnmount } from 'utils';
import { IconButton } from 'components/IconButton';

type Props = {
  onClose: () => void;
  title: string;
  noTopPadding?: boolean;
  fullHeight?: boolean;
  children: React.ReactNode;
};

export const Modal = ({
  title,
  onClose,
  children,
  fullHeight,
  noTopPadding,
}: Props) => {
  useDisableScrollUntilUnmount();

  const onKeyUp = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  React.useEffect(() => {
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp]);

  return (
    <div
      tabIndex={-1}
      aria-hidden='true'
      className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-80'
    >
      <div
        className={`relative p-4 w-full max-w-2xl max-h-full ${fullHeight ? 'h-full' : ''}`}
      >
        <div className='relative rounded-lg shadow bg-gray-800 min-h-full'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600'>
            <h3 className='text-xl font-semibold text-white'>{title}</h3>

            <IconButton icon={Close} onClick={onClose} />
          </div>

          <div
            className='p-4 md:p-5 space-y-4'
            style={{ paddingTop: noTopPadding ? 0 : undefined }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
