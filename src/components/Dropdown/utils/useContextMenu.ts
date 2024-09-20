import * as React from 'react';
import { FloatingContext, ElementProps } from '@floating-ui/react';

import { Trigger } from '../constants';

export type UseContextMenuOptions = {
  enabled?: boolean;
  followCursor?: boolean;
  trigger: (typeof Trigger)[keyof typeof Trigger];
};

export const useContextMenu = (
  context: FloatingContext,
  { enabled, followCursor, trigger }: UseContextMenuOptions,
): ElementProps => {
  const {
    elements: { domReference },
    onOpenChange,
    refs: { setPositionReference },
  } = context;

  const openTimeout = React.useRef<ReturnType<typeof setTimeout>>();
  const preventClick = React.useRef(false);

  React.useEffect(() => {
    if (!enabled) return undefined;

    let autocloseTimeout: NodeJS.Timeout;

    const touchStartListener = (e: TouchEvent) => {
      if (domReference && domReference.contains(e.target as Node)) {
        clearTimeout(openTimeout.current);

        openTimeout.current = setTimeout(() => {
          openTimeout.current = undefined;

          e.preventDefault();

          onOpenChange(true);

          if (followCursor) {
            const touch = e.touches[0];

            setPositionReference({
              getBoundingClientRect() {
                return {
                  width: 0,
                  height: 0,
                  x: touch.pageX,
                  y: touch.pageY,
                  top: touch.clientY,
                  right: touch.clientX,
                  bottom: touch.clientY,
                  left: touch.clientX,
                };
              },
            });
          }
        }, 500);
      }
    };

    const touchEndListener = () => {
      clearTimeout(openTimeout.current);
      openTimeout.current = undefined;

      // autoclose the tooltip if isMobile device and trigger is hover
      if (trigger === 'hover') {
        autocloseTimeout = setTimeout(() => {
          onOpenChange(false);
        }, 1500);
      }
    };

    const clickListener = (e: MouseEvent) => {
      if (domReference && domReference.contains(e.target as Node)) {
        if (preventClick.current) {
          preventClick.current = false;
        } else {
          onOpenChange(false);
        }
      }
    };

    const contextMenuListener = (e: MouseEvent) => {
      if (domReference && e.target && domReference.contains(e.target as Node)) {
        e.preventDefault();

        onOpenChange(true);

        if (followCursor) {
          setPositionReference({
            getBoundingClientRect() {
              return {
                width: 0,
                height: 0,
                x: e.clientX,
                y: e.clientY,
                top: e.clientY,
                right: e.clientX,
                bottom: e.clientY,
                left: e.clientX,
              };
            },
          });
        }
      }
    };

    document.addEventListener('contextmenu', contextMenuListener);
    document.addEventListener('click', clickListener);
    document.addEventListener('touchstart', touchStartListener);
    document.addEventListener('touchend', touchEndListener);
    document.addEventListener('touchmove', touchEndListener);

    return () => {
      document.removeEventListener('contextmenu', contextMenuListener);
      document.removeEventListener('click', clickListener);
      document.removeEventListener('touchstart', touchStartListener);
      document.removeEventListener('touchend', touchEndListener);
      document.removeEventListener('touchmove', touchEndListener);

      if (autocloseTimeout) {
        clearTimeout(autocloseTimeout);
      }
    };
  }, [
    enabled,
    domReference,
    onOpenChange,
    setPositionReference,
    followCursor,
    trigger,
  ]);

  return React.useMemo(() => ({}), []);
};
