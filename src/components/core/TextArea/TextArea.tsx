import { IBaseControls } from '../IBaseControls';
import './textArea.scss';
import React from 'react';

export interface ITextAreaProps extends IBaseControls {
  rows: number;
  columns: number;
  onBlur?: (event: React.SyntheticEvent<HTMLElement>) => void;
  spellCheck?: boolean;
  expandable?: boolean;
  maxlength?: number;
}

export const TextArea = (props: ITextAreaProps) => {
  const {
    id,
    name,
    rows,
    columns,
    tabIndex = 0,
    value = '',
    onChange,
    disabled = false,
    placeholder,
    spellCheck = true,
    customClass,
    autofocus,
    onKeyUp,
    expandable,
    maxlength
  } = props;
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      cols={columns}
      value={value}
      tabIndex={tabIndex}
      aria-label={id}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      spellCheck={spellCheck}
      className={`${customClass ? customClass : ''} ${disabled ? 'disabled' : ''} ${
        expandable ? 'expandable' : ''
      }`}
      autoFocus={autofocus}
      data-test-id={id || ''}
      data-test-class={customClass || ''}
      onKeyUp={onKeyUp}
      maxLength={maxlength}
    />
  );
};
