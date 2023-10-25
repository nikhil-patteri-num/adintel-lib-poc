import * as React from 'react';
import { MultiSelectSearchResultOption, Search } from '../..';
import { FormGroup } from '../../../core';


export interface IDynamicSearch {
  id: number | string;
  value: any;
  setValue: (payload: any) => void;
  getMultiselectSearchResults: any;
  commonData: any;
  modelId?: number;
  disabled?: boolean;
  name?: string;
  fieldName?: string;
  searchCharLimit?: number;
}
export const DynamicSearch = (props: IDynamicSearch) => {
  const {
    id,
    value,
    setValue,
    getMultiselectSearchResults,
    commonData,
    modelId,
    disabled,
    name,
    fieldName,
    searchCharLimit
  } = props;
  return (
    <div>
      <FormGroup>
        <Search
          id={`search-value${id}`}
          value={value ? value.label : ''}
          searchCharLimit={searchCharLimit ? searchCharLimit : 3}
          results={commonData && commonData.entities ? commonData.entities : []}
          onSearch={(searchVal: string) => {
            getMultiselectSearchResults({
              reference: modelId,
              search_text: searchVal,
              is_active: 1,
              name: fieldName
            });
          }}
          searchOptionCard={MultiSelectSearchResultOption}
          onOptionClick={(item: any) => {
            const textpayload = {
              ...item,
              type: 'mcss',
              text: item && item.value,
              label: item && item.label,
              value: item && item.value,
              fieldName: name
            };
            setValue(textpayload);
          }}
          isSearchComplete={commonData.isSearchComplete}
          disabled={disabled}
        />
      </FormGroup>
    </div>
  );
};
