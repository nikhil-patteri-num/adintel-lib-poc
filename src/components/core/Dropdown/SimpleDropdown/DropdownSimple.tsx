import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { IBaseControls } from '../../IBaseControls';
import { keyCode } from '../../../utility/Constants';
import { DropdownOption } from './DropdownOption';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../Button';
import './dropdown.scss';

export interface IDropdownOptions {
  label: any;
  value: any;
}

export enum DropdownPositions {
  up = 'up',
  down = 'down'
}

export interface IDropdownProps extends IBaseControls {
  options: IDropdownOptions[];
  onClick: (event: any) => void;
  placement?: string;
  clearSelection?: () => void;
  defaultItem?: any;
  searchOption?: boolean;
  sortOption?: boolean;
}

export const DropdownSimple = (props: IDropdownProps) => {
  const {
    id,
    value,
    customClass = '',
    options,
    disabled = false,
    onClick,
    tabIndex = 0,
    placement = DropdownPositions.down,
    placeholder = '',
    clearSelection,
    defaultItem,
    sortOption=true
  } = props;

  const [showDropdown, toggleDropdown] = useState(false);
  const [focus, setFocus]: any = useState();
  const [selectedOption, setSelectedOption]: any = useState({ value: null, label: '' });
  const [showCrossButton, setShowCrossButton]: any = useState();

  useEffect(() => {
    if (clearSelection) setShowCrossButton(true);
    else setShowCrossButton(false);
  }, []);

  useEffect(() => {
    const defaultSelectedOption =
      options && options.find((option: IDropdownOptions) => option.value === value);
    if (defaultSelectedOption) setSelectedOption(defaultSelectedOption);
    else if (defaultItem && defaultItem.value === value && defaultItem.deactivated === true)
      setSelectedOption(defaultItem);
    else setSelectedOption({ value: null, label: '' });
  }, [value, options]);

  const getSortedOptions = () => {
    if (!sortOption) {
      return options;
    }
    return options && options.map((item: any) => item).sort(compare);
  }

  const compare = (a: any, b: any) => {
    const labelA = (a && a.label && typeof a.label === 'string') ? a.label.toUpperCase() : a.label;
    const labelB = (b && b.label && typeof a.label === 'string') ? b.label.toUpperCase() : b.label;
    if (labelA > labelB) return 1;
    else if (labelA < labelB) return -1;
    return 0;
  };

  const dropdownRef: any = useRef(null);

  const handleClickOutside = (event: any): any => {
    if (dropdownRef && dropdownRef.current && dropdownRef.current.contains(event.target)) {
      return;
    }
    setFocus(null);
    toggleDropdown(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    };
  });

  const setDropdownValue = (option: any, index: number) => {
    setSelectedOption(option);
    onClick(option.value);
    toggleDropdown(!showDropdown);
    setFocus(index);
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === keyCode.Down) {
      if (focus + 1 < options.length) setFocus(focus + 1);
      else setFocus(0);
      event.preventDefault();
    } else if (event.keyCode === keyCode.Up) {
      if (focus - 1 >= 0) setFocus(focus - 1);
      event.preventDefault();
    } else if (event.keyCode === keyCode.Tab) {
      if (showDropdown) toggleDropdown(!showDropdown);
    }
    return;
  };

  return (
    <div ref={dropdownRef} className={customClass ? `dropdown ${customClass}` : 'dropdown'}>
      <Button
        autoFocus={props.autofocus}
        id={id}
        aria-label={id}
        value={selectedOption.label}
        customClass={
          customClass
            ? disabled
              ? `dropdown-button disabled ${customClass}`
              : `dropdown-button ${customClass}`
            : disabled
              ? 'dropdown-button disabled'
              : 'dropdown-button'
        }
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={() => {
          const defaultOption: any = options.find(option => option.value === value);
          setFocus(options.indexOf(defaultOption));
          toggleDropdown(!showDropdown);
        }}
      >
        <div className='icon-container'>
          {selectedOption.value && showCrossButton ? (
            <Button
              id={id}
              customClass='cross'
              onClick={() => {
                clearSelection && clearSelection();
                setSelectedOption({ value: null, label: '' });
              }}
            >
              <Icon icon={faTimes} className='cross-icon' />
            </Button>
          ) : null}
        </div>

        {selectedOption.label ? (
          <span className='dropdown-button-label'> {selectedOption.label}</span>
        ) : customClass.includes('query') ? (
          <span style={{ color: 'rgba(0,0,0,0.6)', paddingTop: '17px' }}>{placeholder}</span>
        ) : (
          <span style={{ color: 'rgba(0,0,0,0.6)' }}>{placeholder}</span>
        )}
        {showDropdown && !disabled ? (
          <div>
            <Icon icon={faAngleUp} className='dropdown-icon' />
          </div>
        ) : !disabled ? (
          <div>
            <Icon icon={faAngleDown} className='dropdown-icon' />
          </div>
        ) : null}
      </Button>
      {showDropdown && !disabled ? (
        <div className={`dropdown-content dropdown-content-${placement}`}>
          <div className='dropdown-options scroller'>
            {getSortedOptions().map((option, index) => {
              return (
                <DropdownOption
                  key={option.value}
                  index={index}
                  option={option}
                  selectedOption={selectedOption}
                  setDropdownValue={setDropdownValue}
                  focus={focus === index}
                  handleKeyDown={handleKeyDown}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
