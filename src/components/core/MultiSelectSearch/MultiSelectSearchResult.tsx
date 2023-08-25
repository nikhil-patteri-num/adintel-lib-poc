import * as React from 'react';
import { MultiSelectSearchOptions } from './MultiSelectSearchOptions';
import { IDropdownOptions } from '../../core';
import { Button } from '../../core';
import { keyCode } from '../../utility/Constants';

export interface IMultiSelectSearchOptions {
  value: number;
  label: string;
  advertiser: IDropdownOptions;
  category: IDropdownOptions;
  subcategory: IDropdownOptions;
  industries: IDropdownOptions;
  checked: boolean;
}

export interface IMultiSelectSearchResultProps {
  searchResults: any[];
  onClick: (option: any) => void;
  searchOption: any;
  searchVal: string;
  isSearchComplete: boolean;
  setShowMultiSelectSearchResult: (val: boolean) => void;
  createButtonText?: string;
  onCreateButtonClick?: () => void;
  isDisabled?: boolean;
  onOptionRightClick?: any;
  primaryChip?: any;
  id: string;
}

export const MultiSelectSearchResult = (props: IMultiSelectSearchResultProps) => {
  const {
    id,
    searchResults,
    onClick,
    searchOption,
    isSearchComplete,
    setShowMultiSelectSearchResult,
    createButtonText,
    onCreateButtonClick,
    isDisabled = false,
    onOptionRightClick,
    primaryChip
  } = props;

  const onCreateButtonKeyDown = (event: any) => {
    if (event.keyCode === keyCode.Enter && onCreateButtonClick) onCreateButtonClick();
    setShowMultiSelectSearchResult(false);
  };

  const onCreateButtonKeyClick = () => {
    onCreateButtonClick && onCreateButtonClick();
    setShowMultiSelectSearchResult(false);
  };

  return (
    <div className='multiselect-search-body'>
      <MultiSelectSearchOptions
        id={id}
        searchResults={searchResults}
        onClick={onClick}
        searchOption={searchOption}
        isSearchComplete={isSearchComplete}
        setShowMultiSelectSearchResult={setShowMultiSelectSearchResult}
        createButtonText={createButtonText}
        isDisabled={isDisabled}
        onOptionRightClick={onOptionRightClick}
        primaryChip={primaryChip}
      />
      {isSearchComplete && (
        <div className='create-button-container'>
          {createButtonText && (
            <>
              <hr />
              <div className='create-button'>
                <Button onClick={onCreateButtonKeyClick} onKeyDown={onCreateButtonKeyDown}>
                  {createButtonText}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
