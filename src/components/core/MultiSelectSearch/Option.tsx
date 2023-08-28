import React, { useEffect, useRef } from 'react';
import { Button } from '../../core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
export interface IOptionProps {
  option: any;
  onClick: (option: any) => void;
  focus: boolean;
  index: number;
  onkeyPressed: (event: any, index: number, option: any) => void;
  searchOption: any;
  disabled?: boolean;
  onOptionRightClick?: any;
  primaryChip?: any;
}

export const Option = (props: IOptionProps) => {
  const {
    option,
    onClick,
    focus,
    index,
    onkeyPressed,
    searchOption,
    disabled = false,
    onOptionRightClick,
    primaryChip
  } = props;
  const { value, label, checked } = option;
  const ref = useRef<any>(null);
  const SearchOptions = searchOption;
  useEffect(() => {
    if (focus && ref.current) ref.current.focus();
  }, [focus]);

  return (
    <div
      onContextMenu={(event: any) => {
        if (onOptionRightClick && !disabled && checked)
          onOptionRightClick(event, label, value, primaryChip === value);
      }}
    >
      <Button
        key={value}
        btnRef={ref}
        onClick={() => {
          if (!option.disabled && !option.deactivated)
            onClick({ ...option, checked: !option.checked });
        }}
        customClass={`multiselect-search-option ${
          option.disabled ? 'partially-disabled-option' : ''
        }`}
        tabIndex={0}
        onKeyDown={(event: any) => {
          onkeyPressed(event, index, { ...option, checked: !option.checked });
        }}
      >
        <div className={option.deactivated ? 'deactivated-check-box' : 'check-box'}>
          <span className='checkmark'>
            <Icon icon={checked ? faCheckSquare : faSquare} className='icon' />
          </span>
        </div>
        <div className='multiselect-option-data'>
          <div className='multiselect-search-option-label'>{label}</div>
          <SearchOptions options={option} />
        </div>
      </Button>
    </div>
  );
};
