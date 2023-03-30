import * as React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { IMenuItem } from './Drawer';

const iconList = Object.keys(Icons)
  .filter((key: any) => key !== 'fas' && key !== 'prefix')
  .map((icon: any) => Icons[icon as keyof typeof Icons]);
// library.add(...iconList);
iconList.map((item: any) => {
  library.add(item);
});


interface IMenuItemProps {
  menu: IMenuItem;
  activeMenuID: string | null;
  selectedMenuID: string | null;
  setActiveMenu: (menuID: string) => void;
  expandMainDrawer: any;
  subMenuAct: string;  // hover || click
  selected:boolean;
}

export const MenuItem = (props: IMenuItemProps) => {
  const { menu, activeMenuID, selectedMenuID, setActiveMenu, expandMainDrawer, subMenuAct,selected } = props;
  const { label, key, icon } = menu;

  const isMenuItemActive = (): boolean => {
    return activeMenuID === key;
  };

  return (
    <div
      key={key}
      data-test-id={key}
      className={`drawer-menu-item  ${selected || selectedMenuID === key ? 'menu-selected' : ''} ${isMenuItemActive() ? 'menu-active' : ''}`}
      onMouseOver={() => {
        !isMenuItemActive() ? expandMainDrawer : null;
        if (subMenuAct === 'hover') {
          setActiveMenu(key);
        }
      }}
      onClick={() => subMenuAct === 'click' && setActiveMenu(key)}
    >
      <div className='drawer-menu-item-icon'>
        <Icon icon={icon} />
      </div>
      {subMenuAct === 'click' && <div data-test-id={label} className='drawer-menu-item-text'>
        {label}
      </div>}
    </div>
  );
};
