import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import './formItemLabel.scss';
import { IBaseControls } from '../IBaseControls';

export interface IFormItemLabelProps extends IBaseControls {
  isMandatory?: boolean;
}

export const FormItemLabel = (props: IFormItemLabelProps) => {
  const { children, customClass = '', isMandatory = false } = props;
  return (
    <div className={`form-item-label ${customClass}`}>
      {children}
      {isMandatory ? (
        <sup>
          <Icon icon={faAsterisk} className='mandatory-icon' />
        </sup>
      ) : null}
    </div>
  );
};
