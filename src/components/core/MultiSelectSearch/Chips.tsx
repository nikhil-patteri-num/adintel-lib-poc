import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Button } from '../../core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
export interface IChipProps {
  label: string;
  value: number;
  primaryChip?: number;
  onChipRightClick?: (event: any, label: any, value: any, isPrimary: boolean) => void;
  onCrossButtonClick: (value: number) => void;
  disabled?: boolean;
  deactivated?: boolean;
}

export const Chip = (props: IChipProps) => {
  const {
    label,
    value,
    onChipRightClick,
    primaryChip,
    onCrossButtonClick,
    disabled,
    deactivated
  } = props;

  const getClassName = () => {
    let className = '';

    if (deactivated) {
      className = 'deactivated-chip';
    } else if (primaryChip === value) {
      className = 'chip-primary';
    } else if (disabled) {
      className = 'partially-disabled-chip';
    } else {
      className = 'chip';
    }
    return className;
  };

  return (
    <div
      className={getClassName()}
      onContextMenu={(event: any) =>
        onChipRightClick &&
        !disabled &&
        !deactivated &&
        onChipRightClick(event, label, value, primaryChip === value)
      }
    >
      {label}
      {!disabled && !deactivated ? (
        <Button
          id={label}
          onClick={() => !disabled && onCrossButtonClick(value)}
          customClass={'chip-cross-btn'}
        >
          <Icon className='cross-icon' icon={faTimes} />
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
