import * as React from 'react';

export const useDisableScrollUntilUnmount = () => {
  const thisComponentDisabledBodyScrollRef = React.useRef(false);

  React.useEffect(() => {
    const { body } = document;

    if (body) {
      // modal or something other was opened and disabled body scroll
      const bodyScrollDisabled = body.style.overflow === 'hidden';

      if (!bodyScrollDisabled) {
        thisComponentDisabledBodyScrollRef.current = true;

        const scrollWidth = window.innerWidth - document.body.clientWidth;

        if (scrollWidth > 0) {
          // prevent content resize
          body.style.width = `calc(100% - ${scrollWidth}px)`;
        }

        body.style.overflow = 'hidden';
      }
    }
  }, []);

  React.useEffect(
    () => () => {
      const { body } = document;

      if (body) {
        if (thisComponentDisabledBodyScrollRef.current) {
          body.style.removeProperty('width');
          body.style.removeProperty('overflow');
        }
      }
    },
    [],
  );
};
