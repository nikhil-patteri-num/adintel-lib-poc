import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Button } from '../../Button';

interface IDropdownOptionProps {
  selectedOption: any;
  setDropdownValue: (option: any, index: number) => void;
  option: any;
  focus: boolean;
  index: number;
  handleKeyDown: (event: any) => void;
}

export const DropdownOption = (props: IDropdownOptionProps) => {
  const { selectedOption, setDropdownValue, option, focus, handleKeyDown, index } = props;
  const { value, label } = option;
  const ref = useRef<any>(null);

  useEffect(() => {
    if (focus && ref.current) ref.current.focus();
  }, [focus]);

  return (
    <Button
      id={label}
      btnRef={ref}
      tabIndex={0}
      customClass={
        (focus && ref.current) || selectedOption.value === value ? 'option active' : 'option'
      }
      onClick={() => setDropdownValue(option, index)}
      onKeyDown={handleKeyDown}
    >
      {label}
    </Button>
  );
};
