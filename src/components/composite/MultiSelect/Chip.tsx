import * as React from 'react';

export interface IChipProps {
  label: string;
  disabled: boolean;
  deactivated?: boolean;
}

export const Chip = (props: IChipProps) => {
  const { label, disabled, deactivated } = props;

  const getClassName = () => {
    let className = 'chip';
    if (disabled) {
      className = `partially-disabled-chip ${className}`;
    }
    if (deactivated) {
      className = `deactivated-chip ${className}`;
    }
    return className;
  };
  return <div className={getClassName()}>{label}</div>;
};
