import React, { useEffect, useRef } from 'react';
import { IMultiSelectOption } from './MultiSelectOptions';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
export interface IOptionProps {
  option: IMultiSelectOption;
  onClick: (value: number) => void;
  focus: boolean;
  index: number;
  onkeyPressed: (event: any, index: number, value: number) => void;
}

export const Option = (props: IOptionProps) => {
  const { option, onClick, focus, index, onkeyPressed } = props;
  const { value, label, checked } = option;
  const ref = useRef<any>(null);

  useEffect(() => {
    if (focus && ref.current) ref.current.focus();
  }, [focus]);

  return (
    <div
      key={value}
      ref={ref}
      onClick={() => {
        if (!option.disabled && !option.deactivated) onClick(value);
      }}
      className={`multiselect-option ${option.disabled ? 'partially-disabled-option' : ''}`}
      tabIndex={option.disabled ? -1 : 0}
      onKeyDown={(event: any) => {
        onkeyPressed(event, index, value);
      }}
    >
      <div className={option.deactivated ? 'deactivated-check-box' : 'check-box'}>
        <span className='checkmark'>
          <Icon icon={checked ? faCheckSquare : faSquare} />
        </span>
      </div>
      <div className='multiselect-option-label'>{label}</div>
    </div>
  );
};
