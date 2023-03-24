import * as React from 'react';

export const Spinner = () => (
  <div className='spinner-container'>
    <div className='spinner'>
      <div className='rotater' />
    </div>
    <span className='spinner-text'>Loading</span>
  </div>
);
