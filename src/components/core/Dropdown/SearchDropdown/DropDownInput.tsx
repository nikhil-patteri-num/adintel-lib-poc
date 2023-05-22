import * as React from 'react';
import { TextInput, inputType } from '../..';
import { IDropdownInputProps } from './IPropsConfig'

export const DropDownInput = ({ value, onChange, onKeyDown }: IDropdownInputProps) => {
  return (
    <div className='dropdown-search'>
      <TextInput
        id={'dropdownInput'}
        type={inputType.text}
        value={value}
        placeholder='Search here...'
        onChange={onChange}
        onKeyDown={onKeyDown}
        autofocus={true}
        spellCheck={false}
      />
    </div>
  );
};
