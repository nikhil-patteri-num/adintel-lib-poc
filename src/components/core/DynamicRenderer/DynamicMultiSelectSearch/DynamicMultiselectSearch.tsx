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
  createButtonText?: string;
  keyName?: string;
  onMoreButtonClickCallback?: () => void;
  onCreateButtonClick?: (obj: any) => void;
  maxLength?: number;
  masterColumn?: string;
  setDirtyFields?: (key: string | any ,flag: boolean) => void;
  can_create_new?: boolean;
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
    fieldName,
    masterColumn,
    setDirtyFields,
    can_create_new
  } = props;

  const onCreateClick = (value: string) => {
    const textpayload = {
      type: 'mcms',
      mcssValues: props.value?.mcssValues,
      fieldName: name,
      keyName: props.keyName
    };
    setValue(textpayload);
    if (setDirtyFields) {
      setDirtyFields(props.keyName, false);
    }
    props.onCreateButtonClick && props.onCreateButtonClick({ key: 'celebrity', value: value.trim(), id, type: "multi" });
  }

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
          setDirtyFields={setDirtyFields}
          keyName={props.keyName}
          onSearch={(searchVal: string) => {
            getMultiselectSearchResults({
              reference: modelId,
              search_text: searchVal,
              is_active: 1,
              name: fieldName,
              keycolumn: masterColumn
            });
          }}
          onOptionClick={(selectedItems: any) => {
            const textpayload = {
              type: 'mcms',
              mcssValues: selectedItems,
              fieldName: name,
              keyName: props.keyName
            };
            if (setDirtyFields) {
              setDirtyFields(props.keyName, false);
            }
            setValue(textpayload);
          }}
          disabled={disabled}
          setSearchResultList={setSearchResultList}
          createButtonText={props.createButtonText}
          onCreateButtonClick={onCreateClick}
          onMoreButtonClickCallback={props.onMoreButtonClickCallback}
          maxLength={props.maxLength}
          can_create_new={can_create_new}
        />
      </FormGroup>
    </div>
  );
};
