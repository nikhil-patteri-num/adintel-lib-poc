import * as React from 'react';
import { TextInput, inputType } from '../../core';

export interface IMultiselectInputProps {
  value: string;
  onChange: (event: any) => void;
}

export const MultiSelectInput = ({ value, onChange }: IMultiselectInputProps) => {
  return (
    <div className='multiselect-search'>
      <TextInput
        id={'multiselectInput'}
        type={inputType.text}
        value={value}
        placeholder='Search here...'
        onChange={onChange}
        autofocus={true}
        spellCheck={false}
      />
    </div>
  );
};
