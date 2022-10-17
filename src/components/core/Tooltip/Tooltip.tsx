import * as React from 'react';
import { useRef, useEffect } from 'react';
import './_tooltip.scss';

export enum tooltipPosition {
  left = 'left-tooltip',
  top = 'top-tooltip',
  bottom = 'bottom-tooltip',
  right = 'right-tooltip'
}

export interface ITooltipProps {
  children?: any;
  text: string | undefined;
  position?:
    | tooltipPosition.left
    | tooltipPosition.bottom
    | tooltipPosition.top
    | tooltipPosition.right;
}

export const Tooltip: React.FC<ITooltipProps> = ({ children, text, position }) => {
  const tooltipRef: any = useRef(null);
  const tooltipTextRef: any = useRef(null);

  const showTooltip = () => (tooltipTextRef.current.style.visibility = 'visible');
  const hideTooltip = () => (tooltipTextRef.current.style.visibility = 'hidden');

  useEffect(() => {
    const tooltip: HTMLElement = tooltipRef.current;
    if (tooltip) {
      tooltip.addEventListener('mouseenter', showTooltip);
      tooltip.addEventListener('mouseleave', hideTooltip);
    }
    if (!position) {
      const tooltipTextElement: HTMLElement = tooltipTextRef.current;
      if (tooltip && tooltipTextElement) {
        if (tooltipTextElement.getBoundingClientRect().top < 0)
          tooltip.className = 'bottom-tooltip';
        if (
          tooltip.getBoundingClientRect().left + tooltipTextElement.getBoundingClientRect().width >
          screen.width
        )
          tooltip.className = 'left-tooltip';
      }
    }
    return () =>
      tooltipRef.current && tooltipRef.current.removeEventListener('mouseenter', showTooltip);
  }, []);

  return text ? (
    <div
      ref={tooltipRef}
      className={position ? position : 'top-tooltip'}
      onClick={(event: any) => {
        event.stopPropagation();
        tooltipTextRef.current.style.visibility = 'hidden';
      }}
    >
      {children}
      <span
        ref={tooltipTextRef}
        className='tooltiptext'
        onMouseEnter={event => event.preventDefault()}
      >
        {text}
      </span>
    </div>
  ) : (
    children
  );
};

export default Tooltip;
