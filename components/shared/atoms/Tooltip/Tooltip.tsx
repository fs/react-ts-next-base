import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

import { TTooltip } from './types';

import { TooltipTrigger, TooltipWrapper } from './styled';

const Tooltip: React.FunctionComponent<TTooltip> = ({
  text,
  active = true,
  $width = '15rem',
  offset = [0, 10],
  children,
  interactive = true,
  delayHide = 200,
  ...props
}) => {
  const { visible, setTriggerRef, setTooltipRef, getTooltipProps, getArrowProps } =
    usePopperTooltip({ offset, interactive, delayHide, ...props });

  return active ? (
    <>
      <TooltipTrigger ref={setTriggerRef} {...props}>
        {children}
      </TooltipTrigger>
      {visible && (
        <TooltipWrapper
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
          $width={$width}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {text}
        </TooltipWrapper>
      )}
    </>
  ) : (
    <>{children}</>
  );
};
export default Tooltip;
