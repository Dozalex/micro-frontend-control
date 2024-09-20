import * as React from 'react';
import {
  useFloating,
  flip,
  shift,
  autoUpdate,
  useMergeRefs,
  Placement,
  useTransitionStatus,
  FloatingPortal,
  hide,
} from '@floating-ui/react';

import { Trigger } from './constants';
import { useTriggerInteractions } from './utils';
import { Content } from './components';
import './Dropdown.css';

export type DropdownProps = {
  // trigger options
  opened?: boolean;
  trigger?: (typeof Trigger)[keyof typeof Trigger];
  onOpen?: () => void;
  onClose?: () => void;
  // popover options
  usePortal?: boolean;
  placement?: Placement;
  overflowBoundary?: HTMLElement;
  openDelay?: number;
  tether?: boolean;
  hideOnClick?: boolean;
  // render options
  className?: string;
  renderContent: (options: {
    placement: Placement;
    onClose: () => void;
  }) => React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactElement;
};

const PORTAL_Z_INDEX = 9999;

export const Dropdown = ({
  opened: controlledOpen,
  usePortal = true,
  placement = 'bottom',
  trigger = Trigger.clickAutoclose,
  overflowBoundary,
  tether = true,
  children,
  className,
  hideOnClick = false,
  renderContent,
  minWidth,
  maxWidth,
  onOpen,
  onClose,
  openDelay,
  ...rest
}: DropdownProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const isControlled = controlledOpen !== null && controlledOpen !== undefined;

  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const onOpenChange = React.useCallback(
    (opened: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(opened);
      }

      if (opened) {
        if (onOpen) {
          onOpen();
        }
      } else if (onClose) {
        onClose();
      }
    },
    [isControlled, onClose, onOpen],
  );

  const middleware = React.useMemo(
    () => [
      tether && shift(),
      flip({
        crossAxis: tether ? false : placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        boundary: overflowBoundary,
      }),
      hide(),
    ],
    [overflowBoundary, placement, tether],
  );

  const { context, placement: currentPlacement } = useFloating({
    placement,
    open,
    onOpenChange,
    whileElementsMounted: autoUpdate,
    middleware,
  });

  const {
    middlewareData: { hide: { referenceHidden } = {} },
  } = context;

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 300,
  });

  const referenceRef = useMergeRefs([
    context.refs.setReference,
    children.props.ref,
  ]);
  const popoverRef = useMergeRefs([context.refs.setFloating]);

  const interactions = useTriggerInteractions(context, {
    trigger,
    isControlled,
    openDelay,
  });

  const referenceProps = interactions.getReferenceProps({
    ref: referenceRef,
    ...interactions.getReferenceProps(children.props),
  });

  const mainPlacement = currentPlacement && currentPlacement.split('-')[0];

  const onUncontrolledClose = React.useCallback(
    () => setUncontrolledOpen(false),
    [],
  );

  const content = (
    <div
      style={{
        ...context.floatingStyles,
        zIndex: usePortal ? PORTAL_Z_INDEX : 1,
      }}
      ref={popoverRef}
      {...interactions.getFloatingProps()}
    >
      <div
        className='dropdown-transition'
        data-status={status}
        data-custom-width={
          Number.isInteger(minWidth) || Number.isInteger(maxWidth) || undefined
        }
        data-placement={mainPlacement}
      >
        <Content
          {...rest}
          minWidth={minWidth}
          maxWidth={maxWidth}
          className={className}
          hideOnClick={hideOnClick}
          setOpened={setUncontrolledOpen}
          outOfBoundaries={referenceHidden}
        >
          {renderContent({ placement, onClose: onUncontrolledClose })}
        </Content>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {React.cloneElement(children, referenceProps)}

      {isMounted &&
        (usePortal ? <FloatingPortal>{content}</FloatingPortal> : content)}
    </React.Fragment>
  );
};
