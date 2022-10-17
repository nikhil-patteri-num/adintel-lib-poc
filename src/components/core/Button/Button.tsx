import * as React from 'react';
import { IBaseControls } from '../IBaseControls';
import './_button.scss';

export enum buttonSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

export enum buttonVariant {
  primary = 'primary',
  secondary = 'secondary'
}

export interface IButtonProps extends IBaseControls {
  size?: buttonSize;
  variant?: buttonVariant;
  block?: boolean;
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  btnRef?: any;
  autoFocus?: boolean;
  onFocus?: () => void;
  onDoubleClick?: () => void;
  testId?: string;
}

const getClassName = (props: IButtonProps, customClass?: string): string => {
  const { size = buttonSize.medium, block = false, variant = buttonVariant.primary } = props;
  let buttonClass = 'c_btn c_btn-' + size;
  buttonClass = block ? buttonClass + ' c_btn-block' : buttonClass;
  buttonClass = variant ? buttonClass + ' c_btn-' + variant : buttonClass;
  buttonClass = customClass ? buttonClass + ' ' + customClass : buttonClass;
  return buttonClass;
};

export const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  const {
    type = 'button',
    onClick,
    children,
    customClass,
    disabled = false,
    id = '',
    tabIndex = 0,
    btnRef,
    onKeyDown,
    onKeyUp,
    autoFocus = false,
    name,
    onFocus,
    onDoubleClick,
    testId
  } = props;

  return (
    <button
      ref={btnRef}
      type={type}
      name={name}
      onClick={onClick}
      className={getClassName(props, customClass)}
      disabled={disabled}
      id={id}
      aria-label={id}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus={autoFocus}
      onFocus={onFocus}
      onDoubleClick={onDoubleClick}
      data-test-id={testId || id || ''}
      data-test-class={customClass || ''}
    >
      {children}
    </button>
  );
};

// export default Button;