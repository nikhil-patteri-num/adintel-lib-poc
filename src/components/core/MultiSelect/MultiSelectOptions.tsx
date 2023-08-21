import * as React from 'react';
import { Option } from './Option';
import { keyCode } from '../../utility/Constants';
import { useState } from 'react';

export interface IMultiSelectOption {
  label: string;
  checked: boolean;
  inSearch: boolean;
  value: number;
  disabled?: boolean;
  deactivated?: boolean;
}
export interface IMultiSelectOptionsProps {
  options: IMultiSelectOption[];
  onClick: (value: number) => void;
  toggleShowMultiselect: any;
}

export const MultiSelectOptions = (props: IMultiSelectOptionsProps): any => {
  const { options, onClick, toggleShowMultiselect } = props;
  const [focus, setFocus]: any = useState();

  const handleKeyDown = (event: any, index: number, value: number) => {
    if (event.keyCode === keyCode.Down) {
      setFocus(index + 1);
      event.preventDefault();
    } else if (event.keyCode === keyCode.Up) {
      setFocus(index - 1);
      event.preventDefault();
    } else if (event.keyCode === keyCode.Enter) {
      onClick(value);
      event.preventDefault();
    } else if (!event.shiftKey && event.keyCode === keyCode.Tab) {
      toggleShowMultiselect(false);
      event.preventDefault();
    }
  };

  const getInSearchOptions = (allOptions: any[]) => {
    return allOptions.filter(option => option.inSearch);
  };

  return (
    <div className='multiselect-options scroller'>
      {getInSearchOptions(options).map((inSearchOption, index) => (
        <Option
          key={index}
          option={inSearchOption}
          onClick={onClick}
          index={index}
          focus={focus === index}
          onkeyPressed={handleKeyDown}
        />
      ))}
    </div>
  );
};
