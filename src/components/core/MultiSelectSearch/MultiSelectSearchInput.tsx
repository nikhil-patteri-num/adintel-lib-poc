import * as React from 'react';
import { TextInput, inputType } from '../../core';
import { getWidthByText, isEmpty } from '../../utility/Constants';
import { MultiSelectChipStyles } from '../MultiSelect/MultiSelectChips';
import { Chip } from './Chips';
import { Button } from '../../core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { keyCode } from '../../utility/Constants';
interface IMultiSelectSearchInputProps {
  id: string;
  selectedItems: any[];
  searchVal: string;
  primaryChip?: number;
  onChange: (event: any) => void;
  onCrossIconPressed: (event: any) => void;
  onChipRightClick?: (event: any, label: any, value: any, isPrimary: boolean) => void;
  onChipCrossButtonClick: (value: any) => void;
  isDisabled?: boolean;
  isPartiallyDisabled?: boolean;
  onMoreButtonClick: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const getChipWidth = (text: string) => {
  return Math.ceil(
    getWidthByText(text, `${MultiSelectChipStyles.fontSize} ${MultiSelectChipStyles.fontFamily}`) +
      MultiSelectChipStyles.chipMargin +
      MultiSelectChipStyles.chipPadding
  );
};

export function MultiSelectSearchInput({
  selectedItems,
  onChange,
  searchVal,
  onCrossIconPressed,
  id,
  onChipRightClick,
  primaryChip,
  onChipCrossButtonClick,
  isDisabled,
  onMoreButtonClick,
  placeholder,
  isPartiallyDisabled,
  autoFocus = false
}: IMultiSelectSearchInputProps): JSX.Element {
  const inputRef = useRef<any>(null);
  const getSelectedItems = () => {
    let chipContainerWidth = 0;
    const allSelectedItems: any = [];
    const multiSelectSearchButton = document.getElementById('multiselect-search-selector');
    const multiSelectSearchButtonWidth = multiSelectSearchButton
      ? multiSelectSearchButton.clientWidth
      : 200;

    selectedItems.forEach(({ label, value, disabled, deactivated }: any) => {
      chipContainerWidth += getChipWidth(label);
      if (
        multiSelectSearchButtonWidth &&
        chipContainerWidth + getChipWidth(MultiSelectChipStyles.moreChipLabel) <
          multiSelectSearchButtonWidth
      )
        allSelectedItems.push(
          <Chip
            key={value}
            value={value}
            label={label}
            onChipRightClick={onChipRightClick}
            onCrossButtonClick={onChipCrossButtonClick}
            primaryChip={primaryChip}
            disabled={disabled}
            deactivated={deactivated}
          />
        );
    });

    return allSelectedItems;
  };

  const getMoreItemCount = () => {
    return selectedItems.length - getSelectedItems().length;
  };

  const onInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const moreChipAction = (event: any) => {
    event.stopPropagation();
    onMoreButtonClick();
  };

  return (
    <div
      className={'multiselect-search-input-container'}
      id='multiselect-search-selector'
      onClick={onInputClick}
    >
      {getSelectedItems()}

      <div className='chips-container'>
        {getMoreItemCount() <= 0 ? (
          <></>
        ) : (
          <div
            className='chip-more-items'
            tabIndex={0}
            onClick={e => {
              moreChipAction(e);
            }}
            onKeyDown={e => {
              if (e.keyCode === keyCode.Enter) moreChipAction(e);
            }}
          >
            +{getMoreItemCount()} More
          </div>
        )}
      </div>

      {!isDisabled ? (
        <div style={!placeholder ? { width: '70px' } : { width: '100%' }}>
          <TextInput
            id={id}
            type={inputType.text}
            customClass={
              isDisabled ? 'multiselect-search-input disabled' : 'multiselect-search-input'
            }
            onChange={onChange}
            value={searchVal}
            reference={inputRef}
            spellCheck={false}
            placeholder={placeholder}
            autofocus={autoFocus}
          />
        </div>
      ) : null}
      <div className='icon-container'>
        {!isEmpty(selectedItems) && !isPartiallyDisabled ? (
          <Button
            id={'cross-button'}
            onClick={onCrossIconPressed}
            customClass='search-icon-button'
            tabIndex={isDisabled ? -1 : 0}
          >
            <Icon icon={faTimes}  />
          </Button>
        ) : (
          <Button customClass='search-icon-button' tabIndex={-1}>
            <Icon icon={faSearch} style={{ cursor: 'initial' }} />
          </Button>
        )}
      </div>
    </div>
  );
}
