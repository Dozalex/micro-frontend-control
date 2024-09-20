import * as React from 'react';
import { FloatingContext, ElementProps } from '@floating-ui/react';

export type UseClickPointOptions = {
  enabled?: boolean;
};

export const useClickPoint = (
  context: FloatingContext,
  { enabled }: UseClickPointOptions,
): ElementProps => {
  const {
    open,
    refs: { setPositionReference },
  } = context;

  const referenceProps: React.ComponentProps<'div'> = React.useMemo(
    () => ({
      onClick: e => {
        if (!open) {
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
      },
    }),
    [open, setPositionReference],
  );

  return React.useMemo(
    () => (enabled ? { reference: referenceProps } : {}),
    [enabled, referenceProps],
  );
};
