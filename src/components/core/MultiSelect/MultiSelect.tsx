import * as React from 'react';
import { useState, useEffect } from 'react';
import { MultiSelectInput } from './MultiSelectInput';
import { MultiSelectOptions } from './MultiSelectOptions';
import { MultiSelectChips } from './MultiSelectChips';
import { MultiSelectAll } from './MultiSelectAll';
import { keyCode } from '../../utility/Constants';
import './multiselect.scss';

export interface IDropdownOptions {
  label: string;
  value: number;
}

export interface IMultiselectProps {
  id: string;
  options: any[];
  onClick(onClick: number[]): void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  placeholder?: any;
  defaultValues: any[];
  isPartiallyDisabled?: boolean;
  customClass?: string;
}

export const MultiSelect = ({
  options,
  onClick,
  onDropdownVisibleChange,
  id,
  placeholder,
  defaultValues,
  isPartiallyDisabled,
  customClass = ''
}: IMultiselectProps) => {
  const defaultValueItems = () => {
    return defaultValues.map(option => {
      return {
        ...option,
        checked: true,
        inSearch: true,
        disabled: !!isPartiallyDisabled
      };
    });
  };

  const allItems = (checked = false) => {
    return options.map(option => {
      return { ...option, checked, inSearch: true, disabled: !!isPartiallyDisabled };
    });
  };

  const selectedItems = allItems().map(x => {
    const item = defaultValueItems().find(({ value }) => value === x.value);
    return item ? item : x;
  });

  const allSelectedIDs = defaultValueItems().map((option: any) => option.value);

  const [showMultiselect, toggleShowMultiselect] = useState<boolean | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(selectedItems);

  const [selectedIDs, setSelectedIDs] = useState(allSelectedIDs);
  const [selectAll, showSelectAll] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);
    if (showMultiselect !== null && onDropdownVisibleChange)
      onDropdownVisibleChange(showMultiselect);
    if (!showMultiselect) {
      document.removeEventListener('mousedown', outSideClick);
    }
  }, [showMultiselect]);

  useEffect(() => {
    setSearchResult(allItems());
  }, [isPartiallyDisabled]);

  useEffect(() => {
    if (allItems().length <= selectedIDs.length || selectedItems.length === selectedIDs.length)
      showSelectAll(true);
    else showSelectAll(false);
  }, [selectedIDs]);

  useEffect(() => {
    if (!showMultiselect) {
      setSearchValue('');
    }
    sortResults();
  }, [showMultiselect]);
  const sortResults = () => {
    const checkedItems = setInSearchResults(
      searchResult.filter(({ checked }) => checked).sort(compare),
      ''
    );
    const unCheckedItems = setInSearchResults(
      searchResult.filter(({ checked }) => !checked).sort(compare),
      ''
    );
    const result = [...checkedItems, ...unCheckedItems];
    setSearchResult(result);
  };

  const compare = (a: any, b: any) => {
    const labelA = a.label?.toUpperCase();
    const labelB = b.label?.toUpperCase();
    if (labelA > labelB) return 1;
    else if (labelA < labelB) return -1;
    return 0;
  };

  const onOptionClick = (value: number) => {
    const defaultValueItemsNew = [...defaultValueItems()];
    const searchResultNew = searchResult.map((item: any) =>
      item.value === value ? { ...item, checked: !item.checked } : item
    );
    const searchResultsBasedOnInput = setInSearchResults(searchResultNew, searchValue);
    setSearchResult(searchResultsBasedOnInput);

    const index = selectedIDs.indexOf(value);
    if (index > -1) {
      selectedIDs.splice(index, 1);
      defaultValueItemsNew.splice(index, 1);
    } else {
      selectedIDs.push(value);
      const selectedObj = searchResult.find(obj => obj.value === value);
      defaultValueItemsNew.push(selectedObj);
    }
    if (allItems().length === selectedIDs.length) showSelectAll(true);
    else showSelectAll(false);

    setSelectedIDs([...selectedIDs]);
    onClick([...defaultValueItemsNew]);
  };

  const clearAll = (event: any) => {
    event.stopPropagation();
    setSearchResult(allItems(false));
    setSelectedIDs([]);
    showSelectAll(false);
    toggleShowMultiselect(false);
    onClick([]);
  };

  const handleSelectAllKeyDown = (event: any) => {
    if (event.keyCode === keyCode.Enter) {
      selectAllClick();
    }
  };

  const onInputChange = (event: any) => {
    const value = event.target.value || '';
    setSearchValue(value);
    const searchResults = setInSearchResults(searchResult, value.toLowerCase());
    setSearchResult(searchResults);
  };

  const setInSearchResults = (items: any, searchVal: string) => {
    return items.map((item: any) => {
      return !item.label?.toLowerCase().includes(searchVal)
        ? { ...item, inSearch: false }
        : { ...item, inSearch: true };
    });
  };

  const outSideClick = (event: any) => {
    const selectedElement = document.getElementById(id);

    if (selectedElement) {
      if (!selectedElement.contains(event.target)) {
        toggleShowMultiselect(false);
      }
    }
  };

  const getUniqueObjectsInArray = (arr: any[] = []) => {
    const isPresent = [];
    const result = [];
    for (const obj of arr) {
      if (!isPresent[obj.value]) {
        isPresent[obj.value] = true;
        result.push(obj);
      }
    }
    return result;
  };

  const selectAllClick = () => {
    if (!selectAll) {
      setSearchResult(allItems(true).sort(compare));
      const newSelectedObjArr = getUniqueObjectsInArray([...defaultValueItems(), ...allItems()]);
      const newSelectedIDs = newSelectedObjArr.map((option: any) => option.value);
      setSelectedIDs(newSelectedIDs);
      showSelectAll(true);
      onClick(newSelectedObjArr);
    } else {
      setSearchResult(allItems(false).sort(compare));
      setSelectedIDs([]);
      showSelectAll(false);
      onClick([]);
    }
    setSearchValue('');
  };

  useEffect(() => {
    const selectedResultsNew = isPartiallyDisabled ? selectedItems : searchResult;
    setSearchResult(
      selectedResultsNew.map(x => {
        const item = defaultValueItems().find((i: any) => i.value === x.value);
        return item
          ? { ...item, checked: true, inSearch: x.inSearch }
          : { ...x, checked: false, inSearch: x.inSearch };
      })
    );
    setSelectedIDs(allSelectedIDs);
  }, [defaultValues]);

  return (
    <div id={id} className={`multiselect${!isPartiallyDisabled ? '' : ' disabled'} ${customClass}`}>
      <MultiSelectChips
        id={id}
        chips={defaultValueItems()}
        clearAll={clearAll}
        toggleShowMultiselect={toggleShowMultiselect}
        showMultiselect={showMultiselect || false}
        placeholder={placeholder ? placeholder : ''}
        isPartiallyDisabled={!!isPartiallyDisabled}
      />
      {showMultiselect ? (
        <div className='multiselect-body' id={`multiselect-body-${id}`}>
          <>
            <MultiSelectInput value={searchValue} onChange={onInputChange} />
            {!isPartiallyDisabled ? (
              <MultiSelectAll
                id={id}
                onClick={selectAllClick}
                onKeyPress={handleSelectAllKeyDown}
                selectAll={selectAll}
              />
            ) : (
              <></>
            )}
            <MultiSelectOptions
              options={searchResult}
              onClick={onOptionClick}
              toggleShowMultiselect={toggleShowMultiselect}
            />
          </>
        </div>
      ) : null}
    </div>
  );
};
