import * as React from 'react';
import { useState } from 'react';
import { Option } from './Option';
import { keyCode } from '../../utility/Constants';
import { noResultFound } from '../../utility/Constants';
import './search.scss';
import { Button } from 'react-bootstrap';

export interface ISearchOptions {
  label: any;
  value: any;
  
}

export interface ISearchResultProps {
  options: ISearchOptions[];
  setSearchValue: any;
  toggleShowOptions: any;
  searchOptionCard: any;
  onClick: (option: any) => void;
  createButtonText?: string;
  onCreateButtonClick?: () => void;
  isSearchComplete: boolean;
}

export const SearchResult = (props: ISearchResultProps) => {
  const {
    options,
    setSearchValue,
    toggleShowOptions,
    createButtonText = '',
    onCreateButtonClick,
    searchOptionCard,
    onClick,
    isSearchComplete
  } = props;
  const [focus, setFocus]: any = useState();

  const optionOnClick = (option: any) => {
    setSearchValue(option.label);
    toggleShowOptions(false);
    onClick(option);
  };
  const handleKeyDown = (event: any, index: number) => {
    if (event.keyCode === keyCode.Down) {
      setFocus(index + 1);
    } else if (event.keyCode === keyCode.Up) {
      setFocus(index - 1);
    } else if (event.keyCode === keyCode.Tab) {
      if (!createButtonText) toggleShowOptions(false);
    }
  };

  const onCreateButtonKeyDown = (event: any) => {
    if (event.keyCode === keyCode.Enter && onCreateButtonClick) onCreateButtonClick();
    toggleShowOptions(false);
  };

  return (
    <div className='search-body'>
      {options && options.length > 0 ? (
        <div>
          <div className='options scroller'>
            {options.map((inSearchOption: ISearchOptions, index: number) => {
              return (
                <Option
                  key={index}
                  option={inSearchOption}
                  onClick={optionOnClick}
                  index={index}
                  focus={focus === index}
                  onkeyPressed={handleKeyDown}
                  searchOptions={searchOptionCard}
                  createButtonText={createButtonText}
                />
              );
            })}
          </div>

          {createButtonText && options.length === 0 ? (
            <div>
              <hr />
              <div className='create-button'>
                <Button onClick={onCreateButtonClick} onKeyDown={onCreateButtonKeyDown}>
                  {createButtonText}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : isSearchComplete ? (
        <div>
          <div
            className='no-option'
            tabIndex={createButtonText ? -1 : 0}
            onKeyDown={(event: any) => {
              if (event.keyCode === keyCode.Tab) {
                toggleShowOptions(false);
              }
            }}
          >
            {noResultFound}
          </div>
          {createButtonText ? (
            <div className='create-button'>
              <Button onClick={onCreateButtonClick} onKeyDown={onCreateButtonKeyDown}>
                {createButtonText}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
