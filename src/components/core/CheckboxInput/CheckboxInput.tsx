import * as React from 'react';
import { IBaseControls } from '../IBaseControls';
import { Button } from '../Button';
import { Icon } from '../index';
import './checkboxInput.scss';
import {
  faCheckSquare,
  faSquare,
  faCheckCircle,
  faCircle,
  faMinusSquare as minusFaSquare
} from '@fortawesome/free-regular-svg-icons';
import {
  faCheckSquare as solidFaCheckSquare,
  faSquare as solidFaSquare
} from '@fortawesome/free-solid-svg-icons';

export interface ICheckboxProps extends IBaseControls {
  label?: string;
  checked: boolean;
  variant?: 'primary' | 'secondary';
  autoFocus?: boolean;
  checkedButSome?: boolean;
  keepSingleClick?: boolean;
}

export const CheckboxInput = (props: ICheckboxProps) => {
  const {
    id,
    label,
    value,
    customClass,
    onChange,
    checked = false,
    disabled = false,
    variant = 'primary',
    autoFocus,
    checkedButSome // Used to show - icon when it means that some icons are selected, used in the grid select all checkbox
  } = props;

  const getClassName = (): any => {
    if (customClass === 'side-panel-column') return checked ? faCheckCircle : faCircle;
    // else return checked ? faCheckSquare : faSquare;
    else if (checked && checkedButSome) {
      return minusFaSquare;
    } else if (checked) {
      return faCheckSquare;
    }
    return faSquare;
  };

  return (
    <div className={customClass ? `checkbox ${customClass}` : 'checkbox'}>
      <div className='checkmark'>
        <Button
          id={`${id}-checkbox-button`}
          customClass='checkbox-button'
          onClick={onChange}
          disabled={disabled}
          autoFocus={autoFocus}
        >
          <input
            id={id ? id : label}
            type='checkbox'
            value={value}
            aria-label={id ? id : label}
            defaultChecked={checked}
            disabled={disabled}
            onChange={e => {
              // OnChange executes multiple times in some cases
              // to disable one, using keepSingleClick
              if (!props.keepSingleClick) {
                onChange && onChange(e);
              }
            }}
            tabIndex={-1}
            data-test-id={id || ''}
            data-test-class={customClass || ''}
          />
          {checked && variant === 'secondary' ? (
            <Icon
              icon={checked ? solidFaCheckSquare : solidFaSquare}
              className={`${
                disabled ? 'disabled' : variant === 'secondary' && checked ? 'icon' : ''
              }`}
            />
          ) : (
            <Icon
              icon={getClassName()}
              className={`${
                disabled ? 'disabled' : variant === 'secondary' && checked ? 'icon' : ''
              }`}
            />
          )}
        </Button>
        {label ? (
          <label htmlFor={id ? id : label} className='checkbox-label'>
            {label}
          </label>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
