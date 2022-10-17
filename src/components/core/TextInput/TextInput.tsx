import * as React from 'react';
import { IBaseControls } from '../IBaseControls';
import './_textinput.scss';
import { Tooltip } from '../Tooltip';

export enum inputType {
  text = 'text',
  email = 'email',
  number = 'number',
  password = 'password'
}

export interface IInputProps extends IBaseControls {
  type: inputType;
  onBlur?: (event: React.SyntheticEvent<HTMLElement>) => void;
  spellCheck?: boolean;
  onClick?: any;
  testClass?: string;
  step?: any;
  min?: number;
  onKeyPress?: any;
  maxLength?: number;
}

export const TextInput = (props: IInputProps) => {
  const {
    id,
    name,
    type,
    customClass,
    placeholder,
    value,
    onChange,
    tabIndex = 0,
    disabled = false,
    hasError = false,
    autofocus = false,
    reference,
    onKeyUp,
    title,
    spellCheck = true,
    onBlur,
    onClick,
    onKeyDown,
    step,
    min,
    onKeyPress,
    maxLength
  } = props;
  return (
    <Tooltip text={title}>
      <input
        id={id}
        aria-label={id}
        autoComplete='off'
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        className={`input ${hasError ? 'input-error' : ''}${customClass ? customClass : ''} ${
          disabled ? 'disabled' : ''
        }`}
        onChange={onChange}
        tabIndex={tabIndex}
        disabled={disabled}
        autoFocus={autofocus}
        ref={reference}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        spellCheck={spellCheck}
        onBlur={onBlur}
        onClick={onClick}
        data-test-id={id || ''}
        data-test-class={customClass || ''}
        step={step}
        min={min}
        onKeyPress={onKeyPress}
        maxLength={maxLength}
      />
    </Tooltip>
  );
};
