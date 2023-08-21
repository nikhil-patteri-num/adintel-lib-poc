import React, { useEffect, useRef } from 'react';
import { ISearchOptions } from './SearchResult';
import './search.scss';
import { Button } from '../../core';

export interface IOptionProps {
  option: ISearchOptions;
  focus: boolean;
  index: number;
  searchOptions: any;
  createButtonText?: string;
  onClick: (option: any) => void;
  onkeyPressed: (event: any, index: number) => void;
}

export const Option = (props: IOptionProps) => {
  const { option, onClick, focus, index, onkeyPressed, createButtonText, searchOptions } = props;
  const { value, label } = option;
  const ref = useRef<any>(null);

  useEffect(() => {
    if (focus) ref.current.focus();
  }, [focus]);
  const SearchOptions = searchOptions;

  return (
    <Button
      key={value}
      btnRef={ref}
      onClick={() => onClick(option)}
      customClass={'option'}
      tabIndex={0}
      onKeyDown={(event: any) => {
        onkeyPressed(event, index);
      }}
    >
      <div>{label}</div>
      <SearchOptions options={option} createButtonText={createButtonText} />
    </Button>
  );
};
