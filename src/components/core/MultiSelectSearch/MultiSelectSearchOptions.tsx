import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { keyCode, noResultFound } from '../../utility/Constants';
import { Option } from './Option';
import { isEmpty } from '../../utility/Constants';

export interface IMultiSelectSearchOptionsProps {
  searchResults: any[];
  onClick: (option: any) => void;
  searchOption: any;
  isSearchComplete: boolean;
  setShowMultiSelectSearchResult: (val: boolean) => void;
  createButtonText?: string;
  isDisabled?: boolean;
  onOptionRightClick?: any;
  primaryChip?: any;
  id: string;
}

export const MultiSelectSearchOptions = (props: IMultiSelectSearchOptionsProps) => {
  const {
    id,
    searchResults,
    onClick,
    searchOption,
    isSearchComplete,
    setShowMultiSelectSearchResult,
    createButtonText,
    isDisabled = false,
    onOptionRightClick,
    primaryChip
  } = props;

  const ref = useRef<any>(null);
  const [focus, setFocus]: any = useState();

  const handleKeyDown = (event: any, index: number) => {
    switch (event.keyCode) {
      case keyCode.Down:
        setFocus(index + 1);
        event.preventDefault();
        break;
      case keyCode.Up:
        setFocus(index - 1);
        event.preventDefault();
        break;
      case keyCode.Tab:
        if (!createButtonText) setShowMultiSelectSearchResult(false);
        break;
      default:
        // Do nothing
        break;
    }
  };
  useEffect(() => {
    if (focus && ref.current) ref.current.focus();
  }, [focus]);

  const onTabPress = (event: any) => {
    setShowMultiSelectSearchResult(event.keyCode !== keyCode.Tab);
  };

  return (
    <div id={`${id}-result`} className='multiselect-search-options scroller'>
      {!isEmpty(searchResults) ? (
        searchResults.map((inSearchOption: any, index: number) => {
          return (
            <Option
              key={index}
              option={inSearchOption}
              onClick={onClick}
              index={index}
              focus={focus === index}
              onkeyPressed={handleKeyDown}
              searchOption={searchOption}
              disabled={isDisabled}
              onOptionRightClick={onOptionRightClick}
              primaryChip={primaryChip}
            />
          );
        })
      ) : isSearchComplete ? (
        <div>
          <div
            className='no-result-found'
            tabIndex={createButtonText ? -1 : 0}
            onKeyDown={onTabPress}
          >
            {' '}
            {noResultFound}
          </div>
        </div>
      ) : null}
    </div>
  );
};
