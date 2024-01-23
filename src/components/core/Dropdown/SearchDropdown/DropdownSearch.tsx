import * as React from 'react';
import { useState, useEffect } from 'react';
import { DropDownInput } from './DropDownInput';
import { DropDownOptions } from './DropDownOptions';
import { DropDownChips } from './DropDownChips';
import './dropdown-search.scss';
import { IBaseControls } from '../../IBaseControls';
import { IDropdownSearchProps } from './IPropsConfig'
import { isEqual } from '../../../utility';

const DropdownSearch = ({
  options,
  onClick,
  onDropdownVisibleChange,
  id,
  placeholder,
  defaultValues,
  customClass = '',
  isSorted = true
}: IDropdownSearchProps) => {

  const defaultValueItems = () => {
    return defaultValues.map(option => {
      return {
        ...option,
        checked: true,
        inSearch: true
      };
    });
  };

  const allItems = (checked = false) => {
    return options.map(option => {
      return { ...option, checked };
    });
  };

  const selectedItem = allItems().map(x => {
    const item = defaultValueItems().find(({ value }) => value === x.value);
    return item ? item : x;
  });

  const allSelectedID = defaultValueItems().map((option: any) => option.value);

  const [showDropdown, toggleShowDropdown] = useState<boolean | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<any[]>(selectedItem);
  const [selectedIDs, setSelectedIDs] = useState(allSelectedID);
  const [defaultVal, setDefaultVal] = useState<any>();

  const dropdownRef = React.useRef<any>(null);

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);
    if (showDropdown !== null && onDropdownVisibleChange)
      onDropdownVisibleChange(showDropdown);
    if (!showDropdown) {
      document.removeEventListener('mousedown', outSideClick);
    }
  }, [showDropdown]);

  useEffect(() => {
    if (!showDropdown) {
      setSearchValue('');
    }
    sortResults();
  }, [showDropdown]);

  useEffect(() => {
    setSearchResult(options);
  }, [options]);


  const sortResults = () => {
    const checkedItems = setInSearchResults(
      isSorted ? searchResult.filter(({ checked }) => checked).sort(compare) : searchResult.filter(({ checked }) => checked),
      ''
    );
    const unCheckedItems = setInSearchResults(
      isSorted ? searchResult.filter(({ checked }) => !checked).sort(compare) : searchResult.filter(({ checked }) => !checked),
      ''
    );
    const result = [...checkedItems, ...unCheckedItems];
    setSearchResult(result);
  };

  const compare = (a: any, b: any) => {
    const labelA = (a && a.label && typeof a.label === 'string') ? a.label.toUpperCase() : a.label;
    const labelB = (b && b.label && typeof a.label === 'string') ? b.label.toUpperCase() : b.label;
    if (labelA > labelB) return 1;
    else if (labelA < labelB) return -1;
    return 0;
  };

  const onOptionClick = (data: any) => {
    const value = data.value;
    const defaultValueItemsNew: any = [];
    const searchResultNew = searchResult.map((item: any) =>
      item.value === value ? { ...item, checked: !item.checked } : item
    );
    const searchResultsBasedOnInput = setInSearchResults(searchResultNew, searchValue);
    setSearchResult( isSorted ? searchResultsBasedOnInput : options);

    const index = selectedIDs.indexOf(value);
    if (index > -1) {
      selectedIDs.splice(index, 1);
      defaultValueItemsNew.splice(index, 1);
    } else {
      selectedIDs.push(value);
      const selectedObj = searchResult.find(obj => obj.value === value);
      defaultValueItemsNew.push(selectedObj);
    }

    setSelectedIDs([...selectedIDs]);
    onClick([...defaultValueItemsNew]);
    toggleShowDropdown(false);
  };

  const onInputChange = (event: any) => {
    const value = event.target.value.trimStart() || '';
    setSearchValue(value);
    const searchResults = setInSearchResults(searchResult, value.toLowerCase());
    setSearchResult(searchResults);
  };

  const setInSearchResults = (items: any, searchVal: string) => {
    return items.map((item: any) => {
      var str = (item && item.label && typeof item.label === 'string') ? item.label.toLowerCase() : item.label.toString();
      return !str.includes(searchVal)
        ? { ...item, inSearch: false }
        : { ...item, inSearch: true };
    });
  };

  const outSideClick = (event: any) => {
    const selectedElement = document.getElementById(id);

    if (selectedElement) {
      if (!selectedElement.contains(event.target)) {
        toggleShowDropdown(false);
      }
    }
  };

  useEffect(() => {
    if (!isEqual(defaultValues, defaultVal)) {
      setDefaultVal(defaultValues);
      const selectedResultsNew = searchResult;
      const res = selectedResultsNew.map(x => {
        const item = defaultValueItems().find((i: any) => i.value === x.value);
        return item
          ? { ...item, checked: true }
          : { ...x, checked: false };
      })
      setSearchResult(res);
      setSelectedIDs(allSelectedID);
    }
  }, [defaultValues]);

  const onKeyPressHandler = (event: any) => {
    dropdownRef.current.scrollToSelectedOption(event);
  }

  return (
    <div id={id} className={`dropdown-search  ${customClass}`}>
      <DropDownChips
        id={id}
        chips={defaultValueItems()}
        toggleShowDropdown={toggleShowDropdown}
        showDropdown={showDropdown || false}
        placeholder={placeholder ? placeholder : ''}
      />
      {showDropdown ? (
        <div className='dropdown-search-body' id={`dropdown-body-${id}`}  >
          <>
            <DropDownInput
              value={searchValue}
              onChange={onInputChange}
              onKeyDown={(event) => {
                onKeyPressHandler(event)
              }}
            />
            <DropDownOptions
              ref={dropdownRef}
              options={searchResult}
              onClick={onOptionClick}
              toggleShowDropdown={toggleShowDropdown}
            />
          </>
        </div>
      ) : null}
    </div>
  );
};


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
  isSorted?: boolean;
}


export const DropdownSearchField = ({
  id,
  value,
  options,
  onClick,
  defaultItem,
  isSorted
}: IDropdownProps) => {

  const [defaultSelectedItem, setDefaultSelectedItem] = useState(defaultItem || {});

  useEffect(() => {
    if (defaultItem === undefined) {
      setDefaultSelectedItem(options.find(element => element.value === value));
    } else {
      setDefaultSelectedItem(defaultItem);
    }
  }, [value, options, defaultItem]);

  return (
    <>
      <DropdownSearch
        id={id}
        placeholder={"Select option"}
        options={options}
        defaultValues={[defaultSelectedItem]}
        onClick={(obj: any) => {
          onClick(obj && obj[0] && obj[0].value);
        }}
        isSorted={isSorted}
      />
    </>
  )
}