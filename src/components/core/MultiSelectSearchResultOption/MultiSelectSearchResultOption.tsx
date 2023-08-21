import * as React from 'react';
import { IDropdownOptions } from '../MultiSelect/MultiSelect';
import './multiSelectSearchResultOption.scss';

interface IProductSearchResultOptionProps {
  options: {
    advertiser?: IDropdownOptions;
    category?: IDropdownOptions;
    subcategory?: IDropdownOptions;
    industries?: IDropdownOptions;
    target_market?: IDropdownOptions;
  };
}

export const MultiSelectSearchResultOption = (props: IProductSearchResultOptionProps): any => {
  const { advertiser, category, subcategory, industries, target_market } = props.options;
  return (
    <div className='multiselect-search-option-info'>
      {industries && <small>{industries.label}</small>}
      {advertiser && <small>{advertiser.label}</small>}
      {category && <small> {category.label} </small>}
      {subcategory && <small>{subcategory.label}</small>}
      {target_market && <small>{target_market.label}</small>}
    </div>
  );
};
