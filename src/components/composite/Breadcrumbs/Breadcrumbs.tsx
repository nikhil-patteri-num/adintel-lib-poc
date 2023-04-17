import * as React from 'react';
import './breadcrumbs.scss';

export interface IBreadcrumbsProps {
  items: any;
  onBreadcrumbClick: any;
  customClass?: string;
}

export const Breadcrumbs = (props: IBreadcrumbsProps) => {
  const { items,onBreadcrumbClick, customClass } = props;
  return (
    <>
      <div className={`breadcrumbs-container ${customClass ? customClass : ''}`}>
        <ul className="breadcrumb">
          {items && items.map((item: any, index: number) => {
            return <li key={`ky-${index}-${item.link}`}>
              {items.length - 1 !== index ? <a onClick={()=>{onBreadcrumbClick(item)}}>{item.label}</a> : <span className='active-bredcrumb'>{item.label}</span>}
            </li>
          })}
        </ul>
      </div>
    </>
  );
};
