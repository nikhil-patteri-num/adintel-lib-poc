import React from 'react';
import { Button } from '../../core';

interface IBaseProperties {
  value: number;
  label: string;
}
interface IPlaybackRateSelector {
  id: string;
  onOptionClick?: (playbackRate: number) => void;
  selectedOption?: number;
  data: IBaseProperties[];
  headerTitle: string;
}

export const PlaybackSelector = (props: IPlaybackRateSelector) => {
  const { id, onOptionClick, selectedOption, headerTitle, data } = props;

  return (
    <>
      <div className='playback-rate-header' id={id}>
        {headerTitle}
      </div>
      <div className='playback-container'>
        {data.map((option: IBaseProperties) => {
          return (
            <Button
              id={option.label}
              key={option.label}
              onClick={() => {
                onOptionClick && onOptionClick(option.value);
              }}
              name={'Quality'}
              customClass={
                selectedOption === option.value
                  ? 'playback-rate-options selected-background'
                  : 'playback-rate-options'
              }
              autoFocus={selectedOption === option.value}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </>
  );
};
