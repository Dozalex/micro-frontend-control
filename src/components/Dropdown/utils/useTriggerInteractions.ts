import * as React from 'react';
import {
  useHover,
  useFocus,
  useClick,
  useDismiss,
  FloatingContext,
  useInteractions,
} from '@floating-ui/react';

import { Trigger } from '../constants';

import { useClickPoint } from './useClickPoint';
import { useContextMenu } from './useContextMenu';

type UseTriggerInteractionsOptions = {
  isControlled?: boolean;
  trigger: (typeof Trigger)[keyof typeof Trigger];
  openDelay?: number;
};

export const useTriggerInteractions = (
  context: FloatingContext,
  { isControlled, trigger, openDelay }: UseTriggerInteractionsOptions,
) => {
  const isHoverEnabled = React.useMemo(() => {
    if (isControlled) {
      return false;
    }

    return trigger === Trigger.hover;
  }, [isControlled, trigger]);

  const isClickEnabled = React.useMemo(() => {
    if (isControlled) {
      return false;
    }

    return (
      trigger === Trigger.click ||
      trigger === Trigger.clickAutoclose ||
      trigger === Trigger.clickContextmenu
    );
  }, [isControlled, trigger]);

  const isClickPointEnabled = React.useMemo(() => {
    if (isControlled) {
      return false;
    }

    return trigger === Trigger.clickContextmenu;
  }, [isControlled, trigger]);

  const isFocusEnabled = React.useMemo(() => {
    if (isControlled) {
      return false;
    }

    return trigger === Trigger.focus;
  }, [isControlled, trigger]);

  const isDismissEnabled = React.useMemo(() => {
    if (isControlled) {
      return false;
    }

    return (
      trigger === Trigger.clickAutoclose ||
      trigger === Trigger.clickContextmenu ||
      trigger === Trigger.contextmenu ||
      trigger === Trigger.contextmenuReference
    );
  }, [isControlled, trigger]);

  const isContextmenuEnabled = React.useMemo(() => {
    if (isControlled) {
      return false;
    }

    return (
      trigger === Trigger.contextmenu ||
      trigger === Trigger.contextmenuReference
    );
  }, [isControlled, trigger]);

  const hover = useHover(context, {
    move: false,
    mouseOnly: true,
    enabled: isHoverEnabled,
    delay: openDelay,
  });
  const click = useClick(context, {
    enabled: isClickEnabled,
  });
  const clickPoint = useClickPoint(context, {
    enabled: isClickPointEnabled,
  });
  const focus = useFocus(context, {
    enabled: isFocusEnabled,
  });
  const contextmenu = useContextMenu(context, {
    enabled: isContextmenuEnabled,
    followCursor: trigger !== Trigger.contextmenuReference,
    trigger,
  });
  const dismiss = useDismiss(context, {
    enabled: isDismissEnabled,
  });

  return useInteractions([
    hover,
    click,
    focus,
    contextmenu,
    clickPoint,
    dismiss,
  ]);
};
