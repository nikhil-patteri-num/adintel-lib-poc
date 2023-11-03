import * as React from 'react';
import { useState, useEffect } from 'react';
import { MultiSelectSearchInput } from './MultiSelectSearchInput';
import { MultiSelectSearchResult } from './MultiSelectSearchResult';
import { isEmpty, usePrevious } from '../../utility';
import { debounce } from 'ts-debounce';
import './multiSearch.scss';
import { SEARCH_DEBOUNCE_TIME } from '../../utility/Constants';

export interface IOption {
  checked?: boolean;
}

export interface IMultiSelectSearchProps<Option extends IOption> {
  id: string;
  defaultItems: Option[];
  searchResults: Option[];
  isSearchComplete: boolean;
  minCharCount: number;
  searchOptionCard: any;
  primaryChip?: number;
  disabled?: boolean;
  createButtonText?: string;
  createdChip?: any;
  shouldClearChips?: any;
  placeholder?: string;
  isPartiallyDisabled?: boolean;
  onSearch: (searchVal: string) => void;
  onClearAll?: () => void;
  onOptionClick?: (item: any) => void;
  onChipRightClick?: (event: any, label: any, value: any, isPrimary: boolean) => void;
  onCreateButtonClick?: (value: any) => void;
  autoFocus?: boolean;
  customClass?: string;
  setSearchResultList?: () => void;
  maxOptionLength?: number;
}

export function MultiSelectSearch<Option extends IOption>({
  defaultItems = [],
  minCharCount,
  onSearch,
  searchResults,
  id,
  searchOptionCard,
  onClearAll,
  onOptionClick,
  onChipRightClick,
  primaryChip,
  isSearchComplete,
  disabled,
  createButtonText,
  onCreateButtonClick,
  createdChip,
  shouldClearChips,
  placeholder,
  isPartiallyDisabled,
  autoFocus = false,
  customClass,
  maxOptionLength = 1000
}: IMultiSelectSearchProps<Option>): JSX.Element {
  const getCheckedOption = (option: any) => ({
    ...option,
    checked: true,
    disabled: isPartiallyDisabled || disabled ? true : false
  });

  const generateCheckedOptions = (items: Option[]) => {
    return items?.map(item => getCheckedOption(item));
  };

  const [selectedItems, setSelectedItems] = useState<Option[]>(
    generateCheckedOptions(Array.isArray(defaultItems) ? defaultItems : [])
  );
  const prevSelectedItems: any = usePrevious(selectedItems);

  const isSearchResultItemDefaultItem = (item: any): boolean => {
    return (
      !isEmpty(selectedItems) &&
      !isEmpty(selectedItems.find(({ value }: any) => item.value === value))
    );
  };

  const arrangeCheckedAndUncheckedItemsInConsecutiveOrder = (items: any) => {
    const checkedItems = !isEmpty(items) ? items.filter(({ checked }: any) => checked) : [];
    const unCheckedItems = !isEmpty(items) ? items.filter(({ checked }: any) => !checked) : [];
    return [...checkedItems, ...unCheckedItems];
  };

  const getInitialItems = () => {
    const initialItems: any[] = searchResults.map((searchResultItem: any) => {
      if (isSearchResultItemDefaultItem(searchResultItem))
        return {
          ...searchResultItem,
          checked: true,
          disabled: isPartiallyDisabled || disabled ? true : false
        };
      return { ...searchResultItem, checked: false };
    });
    return arrangeCheckedAndUncheckedItemsInConsecutiveOrder(initialItems);
  };
  const onSearchInputChange: any = React.useCallback(debounce(onSearch, SEARCH_DEBOUNCE_TIME), [
    onSearch
  ]);

  const getSearchValue = (searchValue: string) => {
    setSearchVal(searchValue);
    if (searchValue.trim().length >= minCharCount) {
      onSearchInputChange(searchValue.trim());
      setShowMultiSelectSearchResult(true);
    } else {
      setShowMultiSelectSearchResult(false);
    }
  };

  const [allSearchResults, setSearchResults]: any = useState(getInitialItems());
  const [searchVal, setSearchVal]: any = useState('');
  const [showMultiselectSearchResult, setShowMultiSelectSearchResult]: any = useState(false);

  const previousSearchItems: any = usePrevious(searchResults);
  useEffect(() => {
    if (createdChip) {
      setSearchVal('');
      setSelectedItems([...selectedItems, getCheckedOption(createdChip)]);
    }
  }, [createdChip]);

  useEffect(() => {
    onOptionClick && onOptionClick(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    setSearchResults(getInitialItems());
  }, [JSON.stringify(searchResults)]);

  useEffect(() => {
    if (JSON.stringify(searchResults) === JSON.stringify(previousSearchItems))
      if (!isEmpty(searchResults)) setSearchResults(getInitialItems());
  }, [searchResults]);

  useEffect(() => {
    if (JSON.stringify(prevSelectedItems) !== JSON.stringify(defaultItems)) {
      if (!isEmpty(defaultItems)) {
        setSelectedItems(generateCheckedOptions(Array.isArray(defaultItems) ?defaultItems : []));
      }
    }
  }, [defaultItems]);

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);
    if (!showMultiselectSearchResult)
      return document.removeEventListener('mousedown', outSideClick);
  }, [showMultiselectSearchResult]);

  const onSearchOptionClick = (option: any) => {
    const newSelectedItems: any[] = selectedItems;
    const isOptionPresent = selectedItems.length ? selectedItems.find((selected: any) => selected.value === option.value) : true;
    if (selectedItems.length < maxOptionLength || (selectedItems.length === maxOptionLength && isOptionPresent)) {
      setSearchResults(toggleOptionByValue(allSearchResults, option.value));
      const index = newSelectedItems.findIndex(selectedItem => selectedItem.value === option.value);
      if (index > -1) {
        newSelectedItems.splice(index, 1);
        setSelectedItems(newSelectedItems);
      } else {
        newSelectedItems.push(option);
        setSelectedItems(newSelectedItems);
      }
      if (onOptionClick) onOptionClick(selectedItems);
      setSearchVal('');
    }
  };

  const outSideClick = (event: any) => {
    const selectedElement = document.getElementById(id);
    if (selectedElement && !selectedElement.contains(event.target)) {
      setShowMultiSelectSearchResult(false);
      setSearchResults(selectedItems);
    }
  };

  const clearAll = (event: any) => {
    event.stopPropagation();
    setSearchResults([]);
    setSelectedItems([]);
    setShowMultiSelectSearchResult(false);
    setSearchVal('');
    if (onOptionClick) onOptionClick([]);
    if (onClearAll) onClearAll();
  };

  const toggleOptionByValue = (items: any, value: number) => {
    return items.map((item: any) =>
      item.value === value ? { ...item, checked: !item.checked } : item
    );
  };

  const filterItemsByValue = (items: any, value: any) => {
    return items.filter((item: any) => item.value !== value);
  };

  const onChipCrossButtonClick = (value: number) => {
    setSelectedItems(filterItemsByValue(selectedItems, value));
    setSearchResults(toggleOptionByValue(allSearchResults, value));
    if (onOptionClick) onOptionClick(filterItemsByValue(selectedItems, value));
    setShowMultiSelectSearchResult(false);
  };

  const onMoreButtonClick = () => {
    setSearchResults([...selectedItems]);
    setShowMultiSelectSearchResult(true);
  };

  useEffect(() => {
    if (shouldClearChips) {
      setSelectedItems([]);
    }
  }, [shouldClearChips]);

  useEffect(() => {
    if (!shouldClearChips) setSelectedItems(movePrimaryProductFirst(selectedItems));
  }, [primaryChip]);

  const movePrimaryProductFirst = (items: any[]) => {
    const primaryProductIndex = items.findIndex((item: any) => item.value === primaryChip);
    items.unshift(...items.splice(primaryProductIndex, 1));
    return [...items];
  };

  const handleCreateButtonClick = () => {
    onCreateButtonClick && onCreateButtonClick(searchVal);
    setSearchVal('');
  };

  return (
    <>
      <div
        id={id}
        className={
          disabled
            ? `multiselect-search disabled${customClass ? ` ${customClass}` : ''}`
            : `multiselect-search${customClass ? ` ${customClass}` : ''}`
        }
      >
        <MultiSelectSearchInput
          id={id}
          selectedItems={primaryChip ? movePrimaryProductFirst(selectedItems) : selectedItems}
          onChange={event => {
            getSearchValue(event.target.value);
          }}
          searchVal={searchVal}
          onCrossIconPressed={clearAll}
          onChipRightClick={onChipRightClick}
          onChipCrossButtonClick={onChipCrossButtonClick}
          primaryChip={primaryChip}
          onMoreButtonClick={onMoreButtonClick}
          isDisabled={disabled}
          isPartiallyDisabled={isPartiallyDisabled}
          placeholder={selectedItems.length === 0 ? placeholder : ''}
          autoFocus={autoFocus}
        />
        {showMultiselectSearchResult && (
          <MultiSelectSearchResult
            id={id}
            searchResults={allSearchResults}
            onClick={onSearchOptionClick}
            searchOption={searchOptionCard}
            searchVal={searchVal}
            isSearchComplete={isSearchComplete}
            setShowMultiSelectSearchResult={setShowMultiSelectSearchResult}
            createButtonText={createButtonText}
            onCreateButtonClick={handleCreateButtonClick}
            isDisabled={disabled}
            onOptionRightClick={onChipRightClick}
            primaryChip={primaryChip}
          />
        )}
      </div>
    </>
  );
}
