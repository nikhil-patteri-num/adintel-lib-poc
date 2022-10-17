import * as React from 'react';
import { useEffect, RefObject } from 'react';
import { IBaseOption } from '../../interfaces/CustomSearchInterfaces';
import { Button } from '../../../../core';

export interface IOptionProps {
  option: IBaseOption;
  focus: boolean;
  index: number;
  onClick: (option: any) => void;
  onkeyPressed: (event: any, index: number) => void;
  highlight?: string;
  optionRef: RefObject<any>;
}

export const SingleSelectResultOption = (props: IOptionProps) => {
  const { option, onClick, focus, index, onkeyPressed, optionRef } = props;
  const { value, label } = option;

  useEffect(() => {
    if (focus) {
      if (optionRef && optionRef.current) optionRef.current.focus();
    }
  }, [focus]);

  return (
    <Button
      key={value}
      btnRef={optionRef}
      onClick={() => onClick(option)}
      customClass={'option'}
      tabIndex={0}
      onKeyDown={(event: any) => {
        onkeyPressed(event, index);
      }}
    >
      <div>{label}</div>
    </Button>
  );
};
