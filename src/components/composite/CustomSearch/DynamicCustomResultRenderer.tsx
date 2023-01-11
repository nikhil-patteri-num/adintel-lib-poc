import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { IDynamicCustomResultRendererProps } from './interfaces/CustomSearchInterfaces';
import { SearchResultType } from './enums/CustomSearchEnums';
import { SingleSelectSearchResult } from './SearchResults/SingleSelectSearchResult/SingleSelectSearchResult';
import { DatePicker } from '../../core';
import moment from 'moment';

export const DynamicCustomResultRenderer = ({
  searchResultType,
  searchResults,
  onOptionClick = () => { },
  highlight,
  setShowResults,
  datePickerPosition,
  isLoading,
  showEmptyOption,
  activeSuggestion
}: IDynamicCustomResultRendererProps) => {
  const dateRef: any = useRef(null);

  const [datePicker, toggleDatePicker] = useState(false);

  useEffect(() => {
    if (dateRef.current && searchResultType === SearchResultType.datePicker) {
      dateRef.current.flatpickr.open();
      toggleDatePicker(!datePicker);
    } else toggleDatePicker(!datePicker);
  }, [datePickerPosition]);

  useEffect(() => {
    if (datePickerPosition && searchResultType === SearchResultType.datePicker && dateRef.current) {
      const newLeftValue = parseInt(datePickerPosition.left, 10);
      dateRef.current.flatpickr.calendarContainer.style.left =
        (newLeftValue > datePickerPosition.inputLeft
          ? datePickerPosition.inputLeft - 50
          : newLeftValue) + 'px';
      dateRef.current.flatpickr.open();
    }
  }, [datePicker]);

  if (searchResultType === SearchResultType.singleSelect)
    return (
      <SingleSelectSearchResult
        activeSuggestion={activeSuggestion}
        options={searchResults ? searchResults : []}
        onOptionClick={onOptionClick}
        highlight={highlight}
        setShowResults={setShowResults}
        isLoading={isLoading}
        showEmptyOption={showEmptyOption}
      />
    );
  if (searchResultType === SearchResultType.datePicker)
    return (
      <DatePicker
        reference={dateRef}
        date={new Date()}
        onChange={(selectedDate: any) => onOptionClick(moment(selectedDate).format('MM-DD-YYYY'))}
      />
    );
  return <></>;
};
