import * as React from 'react';
import { MultiSelectSearch, MultiSelectSearchResultOption } from '../..';
import { FormGroup } from '../../../core';

export interface IDynamicMultiSelectSearch {
  id: number | string;
  value: any;
  setValue: (payload: any) => void;
  getMultiselectSearchResults: any;
  modelId?: number;
  name?: string;
  commonData: any;
  disabled?: boolean;
  setSearchResultList?: () => void;
  fieldName?: string;
}
export const DynamicMultiSelectSearch = (props: IDynamicMultiSelectSearch) => {
  const {
    id,
    value,
    setValue,
    getMultiselectSearchResults,
    modelId,
    name,
    commonData,
    disabled,
    setSearchResultList,
    fieldName
  } = props;

  return (
    <div>
      <FormGroup>
        <MultiSelectSearch
          id={`search-entity-value-${id}`}
          key={id}
          defaultItems={(value && (value.mcssValues ? value.mcssValues : value)) || []}
          searchResults={commonData && commonData.entities ? commonData.entities : []}
          isSearchComplete={commonData.isSearchComplete}
          minCharCount={2}
          searchOptionCard={MultiSelectSearchResultOption}
          onSearch={(searchVal: string) => {
            getMultiselectSearchResults({
              reference: modelId,
              search_text: searchVal,
              is_active: 1,
              name: fieldName
            });
          }}
          onOptionClick={(selectedItems: any) => {
            const textpayload = {
              type: 'mcms',
              mcssValues: selectedItems,
              fieldName: name
            };
            setValue(textpayload);
          }}
          disabled={disabled}
          setSearchResultList={setSearchResultList}
        />
      </FormGroup>
    </div>
  );
};
