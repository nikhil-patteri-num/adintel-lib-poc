import * as React from 'react';
import { IMultiSelectOption } from './MultiSelectOptions';
import { Chip } from './Chip';
import { isEmpty, getWidthByText } from '../../utility';
import { Button } from '../../core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTimes, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
interface IMultiselectChipsProps {
  id?: string;
  chips: IMultiSelectOption[];
  toggleShowMultiselect: (value: boolean) => void;
  clearAll: (event: any) => void;
  showMultiselect: boolean;
  placeholder: any;
  isPartiallyDisabled: boolean;
}

export enum MultiSelectChipStyles {
  chipMargin = 8,
  chipPadding = 50,
  fontSize = 11,
  fontFamily = 'sans serif',
  moreChipLabel = '+10 More'
}

const getChipWidth = (text: string) => {
  return (
    getWidthByText(text, `${MultiSelectChipStyles.fontSize} ${MultiSelectChipStyles.fontFamily}`) +
    MultiSelectChipStyles.chipMargin +
    MultiSelectChipStyles.chipPadding
  );
};

export const MultiSelectChips = (props: IMultiselectChipsProps) => {
  const {
    id,
    chips,
    clearAll,
    toggleShowMultiselect,
    showMultiselect,
    placeholder,
    isPartiallyDisabled
  } = props;

  const checkedItems = chips.filter(({ checked }) => checked);
  const getSelectedItems = () => {
    let chipContainerWidth = 0;
    const selectedItems: any = [];
    const multiSelectButton = document.getElementById(`multiselect-button-${id}`);
    const multiSelectButtonWidth = multiSelectButton ? multiSelectButton.clientWidth : 0;

    checkedItems.forEach(({ label, value, disabled, deactivated }) => {
      chipContainerWidth += getChipWidth(label);
      if (
        multiSelectButtonWidth &&
        chipContainerWidth + getChipWidth(MultiSelectChipStyles.moreChipLabel) <
          multiSelectButtonWidth
      )
        selectedItems.push(
          <Chip deactivated={deactivated} key={value} label={label} disabled={!!disabled} />
        );
    });

    return selectedItems;
  };

  const getMoreItemCount = () => {
    return checkedItems.length - getSelectedItems().length;
  };

  return (
    <Button
      onClick={() => {
        if (isPartiallyDisabled && chips.length === 0) {
          return;
        }
        toggleShowMultiselect(!showMultiselect);
      }}
      customClass='multiselect-button'
      id={'multiselect-button-' + id}
    >
      <>
        <div className='chips-container'>
          {checkedItems.length === 0 ? (
            <div className='multiselect-placeholder'>{placeholder}</div>
          ) : (
            <></>
          )}
          {getSelectedItems()}

          {getMoreItemCount() <= 0 ? (
            <></>
          ) : (
            <div className='more-label'>+{getMoreItemCount()} More</div>
          )}
        </div>
        <div className='icon-container'>
          {!isEmpty(checkedItems) && !isPartiallyDisabled ? (
            <Button customClass={'cross-button'} onClick={clearAll}>
              <Icon icon={faTimes} className='icon-cross' />
            </Button>
          ) : null}
          {!isPartiallyDisabled ? (
            !showMultiselect ? (
              <Button customClass={'down-arrow-btn'}>
                <Icon icon={faAngleDown} className='icon' />
              </Button>
            ) : (
              <Button customClass={'down-arrow-btn'}>
                <Icon icon={faAngleUp} className='icon' />
              </Button>
            )
          ) : null}
        </div>
      </>
    </Button>
  );
};
