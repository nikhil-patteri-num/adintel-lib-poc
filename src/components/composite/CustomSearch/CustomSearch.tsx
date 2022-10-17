import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { IBaseOption } from './interfaces/CustomSearchInterfaces';
import { TextInput, inputType } from '../../core';
import { Icon } from '../../core'
import { DynamicCustomResultRenderer } from './DynamicCustomResultRenderer';
import {
  SearchResultType,
  logicalOperators,
  conditionalOperators,
  notOperator,
  inOperator,
  orderOperator,
  byOperator,
  sortingOperators,
  datePickerDefaultLeftMargin
} from './enums/CustomSearchEnums';
import { faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { isValidSearchQuery } from './SearchQueryValidator';
import { getWidthByText } from '../../utility/utils';
import { Button } from '../../core';
import { keyCode } from '../../utility/Constants';
import './customSearch.scss';

interface ICustomSearchProps {
  customSearchData: any;
  onSearch: any;
  onChange: any;
  planeQuery: string;
  onEnterButtonClick: () => void;
  onCheckBoxChecked: boolean;
}

export const CustomSearch = (props: ICustomSearchProps) => {
  const {
    customSearchData,
    onSearch,
    onChange,
    onEnterButtonClick,
    planeQuery,
    onCheckBoxChecked
  } = props;
  const { columns, searchResults } = customSearchData;
  const [showResults, setShowResults] = useState(false);
  const [options, setOptions] = useState([]);
  const [queryArray, setQueryArray] = useState(planeQuery ? planeQuery.split(' ') : []);
  const [lastColumn, setLastColumn] = useState(null);
  const [currentResultType, setCurrentResultType] = useState(SearchResultType.singleSelect);
  const [cursorElement, setCursorElement]: any = useState(null);
  const [inputCaret, setInputCaret] = useState({ status: true, position: 0 });
  const [datePickerPosition, setDatePickerPosition]: any = useState({
    left: 0
  });
  const queryRef = useRef<any>();
  const searchQuery = queryArray.join(' ');

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);
    return () => document.removeEventListener('mousedown', outSideClick);
  }, []);

  useEffect(() => {
    const query = getSearchQueryReplacedByValues();
    onChange(query ? query : searchQuery, searchQuery, isValidSearchQuery(searchQuery));
  }, [onCheckBoxChecked]);

  useEffect(() => {
    const query = getSearchQueryReplacedByValues();
    onChange(query ? query : searchQuery, searchQuery, isValidSearchQuery(searchQuery));
  }, [queryArray]);

  useEffect(() => {
    if (inputCaret && inputCaret.position && queryArray.length) { //code needs to be validated
      const thresholdQueryArray = [...queryArray];
      if (thresholdQueryArray && thresholdQueryArray.length) {
        thresholdQueryArray.splice(inputCaret.position + 1, queryArray.length - inputCaret.position);
        setCaretPosition(thresholdQueryArray.join(' ').length);
      }
    }
  }, [inputCaret]);

  const getSearchQueryReplacedByValues = () => {
    const wordsWithQuotesAndSpace: any = searchQuery.match(/'.*?'/g);
    const columnsWithQuotes: any =
      wordsWithQuotesAndSpace &&
      wordsWithQuotesAndSpace.filter(
        (wordWithSpace: string) =>
          columns &&
          columns.find(
            (column: any) =>
              column.label.toLowerCase() ===
              wordWithSpace
                .split("'")
                .join('')
                .toLowerCase()
          )
      );

    let query = searchQuery.replace(/'.*?'/g, '$');
    const remainingColumns: any = [];

    if (customSearchData.columns)
      customSearchData.columns.forEach((element: IBaseOption) => {
        let replaceCount = 0;
        query = query.replace(new RegExp(element.label, 'gi'), () => {
          replaceCount++;
          return element.value.toString();
        });
        if (!replaceCount) {
          remainingColumns.push(element);
        }
      });
    const finalQueryArray: any = [];
    let spaceWordIndex = 0;
    query.split(' ').forEach((element: any) => {
      let currentW = '';
      for (const char of element) {
        if (char === '$') {
          // TO DO Handle It Using Regex
          if (
            columnsWithQuotes.find(
              (columnWithQuote: string) =>
                columnWithQuote.toLowerCase() ===
                wordsWithQuotesAndSpace[spaceWordIndex].toLowerCase()
            )
          ) {
            const remainingColumnValue = remainingColumns.find(
              (remainingColumn: any) =>
                wordsWithQuotesAndSpace[spaceWordIndex]
                  .split("'")
                  .join('')
                  .toLowerCase() === remainingColumn.label.toLowerCase()
            );
            currentW += remainingColumnValue ? remainingColumnValue.value : '';
          } else currentW += wordsWithQuotesAndSpace[spaceWordIndex].toUpperCase();
          spaceWordIndex++;
        } else currentW += char;
      }
      finalQueryArray.push(currentW);
    });

    return finalQueryArray.join(' ');
  };

  useEffect(() => {
    if (lastColumn && searchResults) {
      setOptions(searchResults);
      setShowResults(true);
    }
  }, [JSON.stringify(customSearchData)]);

  const getAutoCompleteSuggestions = (
    lastWord: any,
    currentColumn: any,
    secondLastExpression: any
  ) => {
    const isLogicalOperator = logicalOperators.find(
      (searchOption: any) => lastWord && searchOption.label.toLowerCase() === lastWord.toLowerCase()
    );

    if (!lastWord || isLogicalOperator) return [...columns, notOperator];
    if ((lastWord === notOperator.label || lastWord === notOperator.value) && currentColumn)
      return [inOperator];
    const isSortingOperator = sortingOperators.find(
      (searchOption: any) => lastWord && searchOption.label.toLowerCase() === lastWord.toLowerCase()
    );
    if (isSortingOperator) return [];
    if (lastWord === orderOperator.label || lastWord === orderOperator.value) return [byOperator];
    if (lastWord === byOperator.label || lastWord === byOperator.value) return columns;
    if (lastWord === notOperator.label || lastWord === notOperator.value)
      return [...columns, notOperator];
    const isColumnValue = columns.find(
      (searchOption: any) =>
        searchOption.label.toLowerCase() ===
        removeCharactersFromString(lastWord, ["'", '(']).toLowerCase()
    );
    if (
      isColumnValue &&
      (secondLastExpression === byOperator.label || secondLastExpression === byOperator.value)
    )
      return sortingOperators;
    if (isColumnValue && isColumnValue.type === 'string')
      return [...conditionalOperators.filter((operator: any) => operator.type === 'any')];
    else if (isColumnValue && isColumnValue.type === 'date') return conditionalOperators;
    const isConditionalOperator = conditionalOperators.find(
      (searchOption: any) => searchOption.label.toLowerCase() === lastWord.toLowerCase()
    );
    if (isConditionalOperator) return [];
    return logicalOperators;
  };

  const getQueryArrayByQuery = (query: string) => {
    const finalQueryArray: any = [];
    const wordsWithQuotesAndSpace: any = query.match(/'.*?'/g);
    const queryArrayBySpace = query.replace(/'.*?'/g, '$').split(' ');
    let spaceWordIndex = 0;
    queryArrayBySpace.forEach((element: any) => {
      let currentW = '';
      for (const char of element) {
        if (char === '$') {
          currentW += wordsWithQuotesAndSpace[spaceWordIndex];
          spaceWordIndex++;
        } else currentW += char;
      }
      finalQueryArray.push(currentW);
    });
    return finalQueryArray;
  };

  const setLastColumnValue = (newQueryArray: string[]) => {
    const modifiedWordIndex = newQueryArray.findIndex(
      (newElement: any, index: number) =>
        newElement !== getQueryArrayByQuery(queryArray.join(' ').replace(/  +/g, ' '))[index]
    );
    const lastExpression = newQueryArray[modifiedWordIndex - 1];
    let newColumnValue = newQueryArray[modifiedWordIndex - 2];
    if (newColumnValue === notOperator.label || newColumnValue === notOperator.value)
      newColumnValue = newQueryArray[modifiedWordIndex - 3];

    const currentColumn = columns.find(
      (columnData: any) =>
        newColumnValue &&
        columnData.label.toLowerCase() ===
          removeCharactersFromString(newColumnValue, ['('])
            .toLowerCase()
            .replace(/\'/gi, '')
    );
    if (currentColumn) setLastColumn(currentColumn);
    return {
      lastExpression,
      modifiedWord: newQueryArray[modifiedWordIndex],
      currentColumn,
      modifiedWordIndex,
      newColumnValue
    };
  };

  const getMultipleColumnValues = (currentWord: string, newWord: string) => {
    if (currentWord.substr(0, 1) === '(') {
      const multipleValues = currentWord.replace('(', '').split(',');
      if (multipleValues.length) {
        multipleValues[multipleValues.length - 1] = `'${newWord}'`;
        return '(' + multipleValues;
      } else return '(' + [newWord];
    } else return '';
  };

  const isQueryValidByQuotes = (newQueryArray: string[]) => {
    let incompleteWordIndex = -1;
    let quotesCount = 0;

    newQueryArray.forEach((queryElement: any, index: number) => {
      for (const char of queryElement) {
        if (char === "'") {
          incompleteWordIndex = index;
          quotesCount++;
        }
      }
    });

    return {
      incompleteWordIndex,
      status: quotesCount % 2 === 0
    };
  };

  const getIncompleteQuoteQueryArray = (newQueryArray: string[]) => {
    const queryValidByQuotes = isQueryValidByQuotes(newQueryArray);
    if (queryValidByQuotes.status) return newQueryArray;
    else {
      const { incompleteWordIndex } = queryValidByQuotes;
      const allIncompleteElements = newQueryArray.slice(incompleteWordIndex);
      newQueryArray.splice(
        incompleteWordIndex,
        newQueryArray.length - incompleteWordIndex,
        allIncompleteElements.join(' ')
      );
      return newQueryArray;
    }
  };

  const removeCharactersFromString = (targetString: string, characters: string[]) => {
    let finalString = '';
    characters.forEach((characterToRemove: string) => {
      if (!finalString) finalString = targetString.split(characterToRemove).join('');
      else finalString = finalString.split(characterToRemove).join('');
    });
    return finalString;
  };

  const setCaretPosition = (pos: number) => {
    if (queryRef.current.setSelectionRange) {
      queryRef.current.focus();
      queryRef.current.setSelectionRange(pos, pos);
    }
  };

  const suggestOptions = (newQuery: string) => {
    if (newQuery === ' ') {
      setOptions(getAutoCompleteSuggestions(null, null, null));
      setShowResults(true);
    }
    const newQueryArray: any = getIncompleteQuoteQueryArray(getQueryArrayByQuery(newQuery));
    // .replace(/  +/g, ' ')
    const {
      lastExpression,
      modifiedWord,
      currentColumn,
      modifiedWordIndex,
      newColumnValue
    } = setLastColumnValue(newQueryArray);

    if (currentColumn && currentColumn.type === 'date') {
      setCurrentResultType(SearchResultType.datePicker);
      setCursorElement({ index: modifiedWordIndex, word: modifiedWord });
      const changedWordArray = newQueryArray;
      changedWordArray.splice(
        modifiedWordIndex + 1,
        newQueryArray.length - (modifiedWordIndex + 1)
      );

      setQueryArray(newQueryArray);
      setDatePickerPosition({
        left:
          getWidthByText(changedWordArray.join(' '), '12px system-ui') +
          datePickerDefaultLeftMargin,
        inputLeft:
          parseInt(queryRef.current.getBoundingClientRect().left, 10) +
          parseInt(queryRef.current.clientWidth, 10)
      });
      if (
        modifiedWord.substr(-1) !== ')' &&
        conditionalOperators.find(
          (operator: any) => operator.label.toLowerCase() === lastExpression.toLowerCase()
        )
      ) {
        setShowResults(true);
      } else setShowResults(false);
      return;
    }
    const numberOfSpaces = newQueryArray.filter((element: string) => element === '');
    setCurrentResultType(SearchResultType.singleSelect);
    const suggestions =
      numberOfSpaces.length > 1
        ? []
        : getAutoCompleteSuggestions(lastExpression, currentColumn, newColumnValue);
    if (
      !newQueryArray[modifiedWord] &&
      newQueryArray[modifiedWordIndex - 1] &&
      newQueryArray[modifiedWordIndex - 1].substr(0, 1) === '(' &&
      newQueryArray[modifiedWordIndex - 2] &&
      newQueryArray[modifiedWordIndex - 2].toLowerCase() === inOperator.label.toLowerCase() &&
      newQueryArray[modifiedWordIndex - 1].substr(-1) !== ')'
    ) {
      newQueryArray.pop();
      setOptions([]);
    } else if (
      currentColumn &&
      !suggestions.length &&
      modifiedWord &&
      removeCharactersFromString(modifiedWord, ["'"]).length >= 2 &&
      modifiedWord.substr(-1) !== "'"
    ) {
      if (modifiedWord.substr(0, 1) === '(') {
        const allColumnValues = modifiedWord.replace('(', '').split(',');
        let modifiedColumnValue = '';
        const modifiedIncompleteStatus = isQueryValidByQuotes(allColumnValues);
        if (modifiedIncompleteStatus.status)
          modifiedColumnValue = allColumnValues[allColumnValues.length - 1];
        else modifiedColumnValue = allColumnValues[modifiedIncompleteStatus.incompleteWordIndex];

        if (
          modifiedWord.substr(-1) !== ',' &&
          modifiedWord.substr(-1) !== ')' &&
          modifiedColumnValue &&
          modifiedColumnValue.split("'").join('').length >= 2
        )
          onSearch({
            searchText: btoa(modifiedColumnValue.split("'").join('')),
            id: currentColumn.id,
            currentValueKey: currentColumn.value
          });
      } else {
        if (/[a-zA-z]/.test(modifiedWord.substr(-1)))
          onSearch({
            searchText: btoa(modifiedWord.split("'").join('')),
            id: currentColumn.id,
            currentValueKey: currentColumn.value
          });
      }
    } else {
      setOptions(
        suggestions.filter((option: IBaseOption) =>
          option.label.toLowerCase().includes(
            modifiedWord &&
              modifiedWord.split('(').join('') &&
              modifiedWord
                .split('(')
                .join('')
                .toLowerCase()
          )
        )
      );
      setShowResults(true);
    }
    setCursorElement({ index: modifiedWordIndex, word: modifiedWord });
    setQueryArray(newQueryArray);
  };

  const onInputChange = (event: any) => {
    suggestOptions(event.target.value);
  };

  const getOptionValue = (lastConditionalOperator: string, label: string) => {
    if (
      [...logicalOperators, ...conditionalOperators, notOperator].find(
        (operator: any) => operator.label.toLowerCase() === label.toLowerCase()
      )
    ) {
      return label;
    } else if (
      lastConditionalOperator &&
      lastConditionalOperator.toLowerCase() === inOperator.label.toLowerCase()
    ) {
      return `('${label}'`;
    } else if (
      conditionalOperators.find((operator: any) => operator.label === lastConditionalOperator)
    ) {
      return `'${label}'`;
    } else return null;
  };

  const setOptionForDateTypeColumn = (lastConditionalOperator: string, option: any | string[], caretPosition: number | null) => {
    setQueryArray(
      queryArray.map((queryElement: any, index: number) => {
        if (index === cursorElement.index) {
          caretPosition = index;
          const optionValue = getOptionValue(lastConditionalOperator, option);
          if (optionValue) return optionValue;
          else return `${option.includes(' ') ? `'${option}'` : `${option}`}`;
        } else return queryElement;
      })
    );
    return caretPosition;
  };

  const setOptionForStringTypeColumn = (lastConditionalOperator: string, option: { label: string; }, caretPosition: number | null) => {
    setQueryArray(
      queryArray.map((queryElement: any, index: number) => {
        if (index === cursorElement.index) {
          caretPosition = index;
          const optionValue = getOptionValue(lastConditionalOperator, option.label);
          if (optionValue) return optionValue;
          else if (
            columns.find(
              (operator: any) => operator.label.toLowerCase() === option.label.toLowerCase()
            )
          )
            return option.label.includes(' ') ? `'${option.label}'` : option.label;
          else return `${option.label.includes(' ') ? `'${option.label}'` : `${option.label}`}`;
        } else return queryElement;
      })
    );
    return caretPosition;
  };

  const onOptionClick = (option: any) => {
    const lastConditionalOperator = queryArray[queryArray.length - 2];
    let caretPosition: any = null;
    if (cursorElement) {
      if (
        lastConditionalOperator &&
        lastConditionalOperator.toLowerCase() === inOperator.label.toLowerCase() &&
        cursorElement.word.includes('(')
      ) {
        setQueryArray(
          queryArray.map((queryElement: any, index: number) => {
            if (index === cursorElement.index) {
              caretPosition = index;
              return `${getMultipleColumnValues(
                cursorElement.word,
                currentResultType === SearchResultType.datePicker ? option : option.label
              )}`;
            } else return queryElement;
          })
        );
      } else {
        if (currentResultType === SearchResultType.datePicker) {
          caretPosition = setOptionForDateTypeColumn(
            lastConditionalOperator,
            option,
            caretPosition
          );
        } else if (currentResultType === SearchResultType.singleSelect) {
          caretPosition = setOptionForStringTypeColumn(
            lastConditionalOperator,
            option,
            caretPosition
          );
        }
      }
    }
    if (caretPosition) {
      setInputCaret({ status: !inputCaret.status, position: caretPosition });
    }

    setShowResults(false);
    queryRef.current.focus();
  };

  const outSideClick = (event: any) => {
    const selectedElement = document.getElementById('dynamic-results');
    const datePickers = document.getElementsByClassName('flatpickr-calendar') as HTMLCollection;
    if (selectedElement && selectedElement.contains(event.target)) return;
    let elementInDatePicker = false;
    Array.from(datePickers).forEach(datePicker => {
      if (datePicker.contains(event.target)) elementInDatePicker = true;
    });
    if (elementInDatePicker) return;
    return setShowResults(false);
  };

  const onInputClick = () => {
    setOptions([]);
    setShowResults(false);
  };

  const onCrossButtonClick = () => {
    setQueryArray([]);
  };

  const onEnterClick = (event: any) => {
    if (event.keyCode === keyCode.Enter && isValidSearchQuery(searchQuery) && searchQuery.length)
      onEnterButtonClick();
  };

  return (
    <div className='custom-search'>
      <TextInput
        type={inputType.text}
        customClass='custom-search-input'
        reference={queryRef}
        value={searchQuery}
        onChange={onInputChange}
        onClick={onInputClick}
        onKeyUp={onEnterClick}
        placeholder='Find records using search query'
      />
      {searchQuery.length ? (
        <Button
          customClass='clear-query'
          onClick={onCrossButtonClick}
          tabIndex={showResults ? -1 : 0}
        >
          <Icon icon={faTimes} />
        </Button>
      ) : null}
      {isValidSearchQuery(searchQuery) ? (
        <Icon className='custom-search-query-status valid' icon={faCheckCircle} />
      ) : (
        <Icon className='custom-search-query-status invalid' icon={faTimesCircle} />
      )}
      {showResults && (
        <div id='dynamic-results' className='custom-search-results'>
          <DynamicCustomResultRenderer
            searchResultType={currentResultType}
            searchResults={searchQuery.length > 0 ? options : []}
            onOptionClick={onOptionClick}
            setShowResults={setShowResults}
            datePickerPosition={datePickerPosition}
          />
        </div>
      )}
      {isValidSearchQuery(searchQuery) ? (<div>{planeQuery}</div>) : null}
    </div>
  );
};