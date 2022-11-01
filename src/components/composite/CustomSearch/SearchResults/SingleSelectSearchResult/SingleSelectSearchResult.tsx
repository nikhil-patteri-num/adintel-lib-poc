import * as React from 'react';
import { useState, useEffect, RefObject, createRef } from 'react';
import { ISingleSelectSearchResult } from '../../interfaces/CustomSearchInterfaces';
import { SingleSelectResultOption } from './SingleSelectResultOption';
import { IBaseOption } from '../../interfaces/CustomSearchInterfaces';
import { keyCode } from '../../../../utility/Constants';
import '../../search.scss'

export const SingleSelectSearchResult = ({
  options,
  onOptionClick,
  highlight,
  setShowResults,
  isLoading,
  showEmptyOption
}: ISingleSelectSearchResult) => {
  const [focus, setFocus]: any = useState();
  const selectedRefs: { current: Array<RefObject<any>> } = React.useRef([]);

  useEffect(() => {
    selectedRefs.current = Array(options.length)
      .fill(null)
      .map((_, i) => selectedRefs.current[i] || createRef());
  }, [options]);

  const handleKeyDown = (event: any, index: number) => {
    if (event.keyCode === keyCode.Down) {
      setFocus(index + 1);
    } else if (event.keyCode === keyCode.Up) {
      setFocus(index - 1);
    } else if (event.keyCode === keyCode.Tab) {
      setShowResults(false);
    }
    if (selectedRefs.current[index] && selectedRefs.current[index].current) {
      selectedRefs.current[index].current.scrollIntoView({
        block: 'center',
        behavior: 'auto'
      });
    }
  };
  return (
    <div className='search-body'>
      {options && options.length > 0 && (
        <div>
          <div className='options scroller'>
            {options.map((inSearchOption: IBaseOption, index: number) => {
              return (
                <SingleSelectResultOption
                  key={index}
                  option={inSearchOption}
                  onClick={onOptionClick}
                  index={index}
                  focus={focus === index}
                  onkeyPressed={handleKeyDown}
                  highlight={highlight}
                  optionRef={selectedRefs.current[index]}
                />
              );
            })}
          </div>
        </div>
      )}
      {showEmptyOption && !options.length && !isLoading && (<div className='empty-option'>No results found!</div>)}
      {showEmptyOption && !options.length && isLoading && (<div className='empty-option'>Loading...</div>)}
    </div>
  );
};
