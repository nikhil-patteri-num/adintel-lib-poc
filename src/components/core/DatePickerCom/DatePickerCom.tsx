import * as React from 'react';
import { IBaseControls } from '../IBaseControls';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './_datePickerCom.scss';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import 'flatpickr/dist/themes/material_green.css';
import Flatpickr from 'react-flatpickr';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button';

export interface IDatePicker extends IBaseControls {
  date: any;
  minDate?: any;
  maxDate?: any;
  popperPlacement?: string;
  clearDate?: () => void;
  small?: boolean;
}

const DatePickerCom = (props: IDatePicker) => {
  const {
    id,
    name,
    date,
    onChange,
    minDate,
    maxDate,
    placeholder,
    clearDate,
    disabled,
    reference,
    small,
    customClass
  } = props;
  return (
    <div className={small ? 'date-picker-small' : 'date-picker'}>
      <Flatpickr
        ref={reference}
        id={id}
        data-test-id={id || ''}
        name={name}
        className={`${customClass} date-picker-input ${disabled ? ' disabled' : ''}`}
        value={date}
        options={{ minDate, maxDate, dateFormat: 'm-d-Y' }}
        placeholder={placeholder}
        autocomplete='off'
        disabled={disabled}
        data-selected-date={date}
        onChange={(changedDate: any) => {
          if (onChange) onChange(changedDate[0]);
          else return;
        }}
      />
      <div className='icon-container'>
        {date ? (
          <Button id={id} customClass='cross' onClick={clearDate} disabled={disabled}>
            <Icon icon={faTimes} className={disabled ? 'cross-icon disabled' : 'cross-icon'} />
          </Button>
        ) : (
          <label htmlFor={id} className={disabled ? 'calender-icon disabled' : 'calender-icon'}>
            <Icon icon={faCalendarAlt} />
          </label>
        )}
      </div>
    </div>
  );
};

export default DatePickerCom;
