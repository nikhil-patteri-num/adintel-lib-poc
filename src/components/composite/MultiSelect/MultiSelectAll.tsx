import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
export interface IMultiSelectAllProps {
  id?: string;
  onClick: (event: any) => void;
  onKeyPress: (event: any) => void;
  selectAll: boolean;
}

export const MultiSelectAll = (props: IMultiSelectAllProps) => {
  const { id, onClick, onKeyPress, selectAll } = props;

  return (
    <div
      className={'multiselect-all'}
      id={`multiselect-all-${id}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyPress}
    >
      <div className='check-box'>
        <span className='checkmark'>
          <Icon icon={selectAll ? faCheckSquare : faSquare} className='icon' />
        </span>
      </div>
      <div className='multiselect-option-label'>{selectAll ? 'Unselect All' : 'Select All'}</div>
    </div>
  );
};
