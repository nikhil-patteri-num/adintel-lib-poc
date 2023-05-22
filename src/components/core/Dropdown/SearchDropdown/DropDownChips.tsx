import * as React from 'react';
import { Button } from '../../Button';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { IDropDownChipsProps } from './IPropsConfig'

export const DropDownChips = (props: IDropDownChipsProps) => {
  const {
    id,
    chips,
    toggleShowDropdown,
    showDropdown,
    placeholder
  } = props;

  const checkedItems = chips.filter(({ checked }) => checked);

  const getSelectedItems = () => {
    const selectedItems: any = [];
    checkedItems.forEach(({ label, value }) => {
      selectedItems.push(
        <div key={`item-${value}`} className={"chip-selected"}>{label}</div>
      );
    });
    return selectedItems;
  };


  return (
    <Button
      onClick={() => {
        toggleShowDropdown(!showDropdown);
      }}
      customClass='dropdown-search-button'
      id={'dropdown-button-' + id}
    >
      <>
        <div className='dropdown-chips-container'>
          {checkedItems.length === 0 ? (
            <div className='dropdown-search-placeholder'>{placeholder}</div>
          ) : (
            <></>
          )}
          {getSelectedItems()}

        </div>
        <div className='icon-container'>
          {!showDropdown ? (
            <Button customClass={'down-arrow-btn'}>
              <Icon icon={faAngleDown} className='icon' />
            </Button>
          ) : (
            <Button customClass={'down-arrow-btn'}>
              <Icon icon={faAngleUp} className='icon' />
            </Button>
          )}
        </div>
      </>
    </Button>
  );
};
