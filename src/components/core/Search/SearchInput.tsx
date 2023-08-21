import * as React from 'react';
import { TextInput, inputType } from '../../core';
import './search.scss';

export interface ISearchInputProps {
  id: string;
  value: string;
  onChange?: (event: any) => void;
  disabled?: boolean;
  placeholder?: string;
  title?: string;
  shouldShowSearchText?: boolean;
}

export const SearchInput = (props: ISearchInputProps) => {
  const { id, value, onChange, disabled, placeholder, title, shouldShowSearchText = false } = props;

  return (
    <div className='searchInput'>
      <TextInput
        id={'textInput' + id}
        type={inputType.text}
        placeholder={!shouldShowSearchText ? placeholder : ''}
        value={!shouldShowSearchText ? value : ''}
        onChange={onChange}
        disabled={disabled}
        title={title}
        spellCheck={false}
      />
    </div>
  );
};
