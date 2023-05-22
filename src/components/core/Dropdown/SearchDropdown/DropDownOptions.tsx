import * as React from 'react';
import { keyCode } from '../../../utility/Constants';
import { useState } from 'react';
import { IOptionProps, IDropDownOptionsProps } from './IPropsConfig'


const Option = (props: IOptionProps) => {
  const { option, onClick, index, onkeyPressed, activeSuggestion } = props;
  const { value, label, checked } = option;

  return (
    <div
      key={value}
      onClick={() => {
        onClick(option);
      }}
      onMouseUp={() => {
        onClick(option);
      }}
      onMouseDown={() => {
        onClick(option);
      }}
      className={`dropdown-option ${checked ? 'active' : ''} ${index === activeSuggestion ? 'suggestion-active' : ''}`}
      tabIndex={0}
      onKeyDown={(event: any) => {
        onkeyPressed(event, index, value);
      }}
    >
      <div className={`dropdown-option-label`}>{label}</div>
    </div>
  );
};


export const DropDownOptions = React.forwardRef((props: IDropDownOptionsProps, ref: any): any => {
  const { options, onClick, toggleShowDropdown } = props;
  const [setFocus]: any = useState();
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const dropdRef : any = React.useRef();
  const containerdRef : any = React.useRef();
  
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
      toggleShowDropdown(false);
      event.preventDefault();
    }
  };

  const getInSearchOptions = (allOptions: any[]) => {
    return allOptions.filter(option => option.inSearch);
  };


  const scrollToPage = (key: string, index: number) => {
    const selectedOptionOffsetTop = dropdRef.current.querySelector('.suggestion-active').offsetTop;
    if (key === 'UP') {
      if (index === 0) {
        containerdRef.current.scrollTop = -30;
      } else {
        containerdRef.current.scrollTop = selectedOptionOffsetTop - 60;
      }
    } else {
      containerdRef.current.scrollTop = selectedOptionOffsetTop;
    }
  };


  React.useImperativeHandle(ref, () => ({
    scrollToSelectedOption(event: any) {
      if (event.keyCode === keyCode.Down) {
        if (getInSearchOptions(options).length === activeSuggestion + 1) {
          return;
        }
        setActiveSuggestion(prev => prev + 1)
        scrollToPage('DOWN', activeSuggestion);
        event.preventDefault();
      } else if (event.keyCode === keyCode.Up) {
        if (activeSuggestion === 0) {
          return;
        }
        setActiveSuggestion(prev => prev - 1)
        scrollToPage('UP', activeSuggestion);
        event.preventDefault();
      } else if (event.keyCode === keyCode.Enter) {
        onClick(getInSearchOptions(options)[activeSuggestion]);
        setActiveSuggestion(0);
      }

    }
  }));

  return (
    <div className='dropdown-options scroller' ref={containerdRef} >
      <div className="suggestions" ref={dropdRef}>
        {getInSearchOptions(options).length > 0 ?
          <>
            {getInSearchOptions(options).map((inSearchOption, index) => (
              <Option
                key={index}
                option={inSearchOption}
                activeSuggestion={activeSuggestion}
                onClick={onClick}
                index={index}
                onkeyPressed={handleKeyDown}
              />
            ))}
          </>
          : <>
            <div
              className={`dropdown-option`}
              tabIndex={0}
            >
              <div className={`dropdown-option-label`}>{`No results`}</div>
            </div>
          </>}
      </div>
    </div>
  );
});
