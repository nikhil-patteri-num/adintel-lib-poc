import * as React from 'react';
import { useState, useEffect } from 'react';
import { SearchInput, ISearchInputProps } from './SearchInput';
import { ISearchOptions, SearchResult } from './SearchResult';
import { Button } from '../../core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './search.scss';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'ts-debounce';
import { SEARCH_DEBOUNCE_TIME } from '../../utility/Constants';

export interface ISearchProps extends ISearchInputProps {
  searchCharLimit: number;
  results: ISearchOptions[];
  onSearch: (searchValue: string) => void;
  onOptionClick: (item: any) => void;
  searchOptionCard: any;
  disabled?: boolean;
  createButtonText?: string;
  onCreateButtonClick?: () => void;
  isSearchComplete: boolean;
  hideResults?: boolean;
  title?: string;
  placeholder?: string;
  shouldShowSearchText?: boolean;
  shouldClearSearchText?: boolean;
}

export const Search = (props: ISearchProps): any => {
  const {
    id,
    value,
    searchCharLimit,
    results,
    searchOptionCard,
    onOptionClick,
    createButtonText,
    onCreateButtonClick,
    disabled = false,
    onSearch,
    isSearchComplete = false,
    hideResults = false,
    title,
    placeholder = '',
    shouldShowSearchText = false,
    shouldClearSearchText = false
  } = props;
  const [searchValue, setSearchValue] = useState(value);
  const [showOptions, toggleShowOptions] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    if (shouldClearSearchText) setSearchValue('');
  }, [shouldClearSearchText]);

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);
    document.addEventListener('keydown', outSideClick);
    if (!showOptions) {
      document.removeEventListener('mousedown', outSideClick);
      document.removeEventListener('keydown', outSideClick);
    }
  }, [showOptions]);

  const onSearchInputChange: any = React.useCallback(debounce(onSearch, SEARCH_DEBOUNCE_TIME), [
    onSearch
  ]);

  const getSearchValue = (searchVal: string) => {
    setSearchValue(searchVal);
    if (!searchVal) {
      onCrossIconPressed();
    }
    if (showPlaceholder) setShowPlaceholder(false);
    if (searchVal.trim().length >= searchCharLimit) {
      toggleShowOptions(true);
      onSearchInputChange(searchVal.trim());
    } else {
      toggleShowOptions(false);
    }
  };

  const onCrossIconPressed = () => {
    setSearchValue('');
    toggleShowOptions(false);
    setShowPlaceholder(true);
    onOptionClick({ label: null, value: null });
  };

  const outSideClick = (event: any) => {
    const selectedElement = document.getElementById(id + '_search');

    if (selectedElement) {
      if (event.target.className === 'app-loader') {
        return;
      }
      if (!selectedElement.contains(event.target)) {
        toggleShowOptions(false);
      }
    }
  };
  return (
    <div className='search' id={id + '_search'}>
      <div className='search-input'>
        <SearchInput
          id={id}
          value={showPlaceholder ? '' : searchValue}
          placeholder={searchValue ? searchValue : placeholder}
          disabled={disabled}
          onChange={event => {
            getSearchValue(event.target.value);
          }}
          title={title}
          shouldShowSearchText={shouldShowSearchText}
        />
        {!searchValue
          ? !disabled && (
              <Button customClass='search-icon-button' tabIndex={-1}>
                <Icon icon={faSearch} style={{ cursor: 'initial' }} className={'search-icon'} />
              </Button>
            )
          : !disabled && (
              <Button
                onClick={onCrossIconPressed}
                customClass='search-icon-button-cross'
                tabIndex={disabled ? -1 : 0}
                disabled={disabled}
              >
                <Icon
                  icon={faTimes}
                  style={{ cursor: disabled ? `initial` : `pointer` }}
                  className={'search-icon-cross'}
                />
              </Button>
            )}
      </div>
      {showOptions && !hideResults && (
        <SearchResult
          options={results}
          setSearchValue={setSearchValue}
          toggleShowOptions={toggleShowOptions}
          searchOptionCard={searchOptionCard}
          onClick={onOptionClick}
          createButtonText={createButtonText}
          onCreateButtonClick={onCreateButtonClick}
          isSearchComplete={isSearchComplete}
        />
      )}
    </div>
  );
};
