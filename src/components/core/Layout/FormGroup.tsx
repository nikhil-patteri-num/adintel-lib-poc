import * as React from 'react';
import '../../assets/scss/components.scss';
import './layout.scss';
import { IBaseControls } from '../IBaseControls';

export const FormGroup = (props: IBaseControls) => {
  const { id, children, customClass = '' } = props;
  return (
    <div id={id ? id : `form-group ${customClass}`} className={`form-group ${customClass}`}>
      {children}
    </div>
  );
};
