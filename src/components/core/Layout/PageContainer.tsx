import * as React from 'react';
import '../../assets/scss/components.scss';
import './layout.scss';

interface IPageContainerProps {
  children: JSX.Element[] | JSX.Element;
  customClass?: string;
}

export const PageContainer = (props: IPageContainerProps) => {
  const { children, customClass = '' } = props;

  return (
    <div id='page-container' className={`page-container ${customClass}`}>
      {children}
    </div>
  );
};
