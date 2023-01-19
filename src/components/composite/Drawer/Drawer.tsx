import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { MenuItem } from './MenuItem';
import { CSSTransition } from 'react-transition-group';
import './drawer.scss';

export interface ISubMenuItem {
  value: any;
  label: string;
  key: string;
  icon: any;
}

export interface IMenuItem extends ISubMenuItem {
  submenus: ISubMenuItem[];
}

export interface IDrawerProps {
  menuItems: IMenuItem[];
  menuLocation?: any;
  onSubMenuClick: any;
  showMenuBar: boolean;
}

export const Drawer = (props: IDrawerProps) => {
  const { menuItems, menuLocation, onSubMenuClick, showMenuBar } = props;
  const defaultRoute = menuLocation.pathname;
  const [activeMenuID, setActiveMenuID] = useState<string | null>(null);
  const [activeSubMenuID, setActiveSubMenuID] = useState<string | null>(null);
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const drawerRef: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (defaultRoute && menuItems.length) {
      const defaultRouteKey = defaultRoute.substr(1);
      const activeMenu: IMenuItem = menuItems.find(
        (menuItem: any) =>
          menuItem.key === defaultRouteKey ||
          menuItem.submenus.find((subMenu: any) => subMenu.key === defaultRouteKey)
      ) as IMenuItem;
      const activeSubMenu =
        activeMenu &&
        (activeMenu.submenus.find((subMenu: any) => subMenu.key === defaultRouteKey) as IMenuItem);
      if (activeMenu && activeSubMenu) {
        setActiveMenuID(activeMenu.key);
        setActiveSubMenuID(activeSubMenu.key);
      }
    }
  }, [defaultRoute, menuItems]);

  useEffect(() => {
    document.addEventListener('mousedown', onOutSideClick);
  }, []);

  useEffect(() => {
    const menu: any = document.querySelector('.drawer-menu');
    if (menu && showMenuBar) menu.style.width = '260px';
    // for joyride
    else if (menu) menu.style.width = null;
  }, [showMenuBar]);

  const getOrigin = () => {
    const address = location.origin + location.pathname + (location.pathname.endsWith('/') ? '' : '/')
    return address;
  }
  const onOutSideClick = (event: any): void => {
    const selectedElement = document.getElementsByClassName('drawer');
    if (selectedElement && selectedElement[0] && !selectedElement[0].contains(event.target)) {
      setShowSubMenu(false);
    }
  };

  const collapseMainDrawer = (): void => {
    if (drawerRef && drawerRef.current) {
      const menu = document.querySelector('.drawer-menu');
      if (menu) menu.classList.add('collapse-drawer');
    }
  };

  const expandMainDrawer = (): void => {
    if ((drawerRef && drawerRef.current) || showMenuBar) {
      const menu = document.querySelector('.drawer-menu');
      if (menu) menu.classList.remove('collapse-drawer');
    }
  };

  const setActiveMenu = (id: string): void => {
    setActiveMenuID(id);
    setShowSubMenu(true);
    collapseMainDrawer();
  };

  const getActiveMenuInfo = (): IMenuItem => {
    return menuItems.find((menuItem: any) => menuItem.key === activeMenuID) as IMenuItem;
  };

  const setActiveSubMenu = (e: any, key: string): void => {
    setActiveSubMenuID(key);
    onSubMenuClick(key);
    setShowSubMenu(false);
    e.preventDefault();
  };

  const isSubMenuActive = (subMenuKey: string) => {
    return subMenuKey === activeSubMenuID;
  };

  return (
    <>
      <div className='drawer'>
        <div className='drawer-menu' id='menubar' ref={drawerRef}>
          {menuItems.map((menuItem: IMenuItem) => (
            <MenuItem
              key={`menu-item-${menuItem.key}`}
              menu={menuItem}
              activeMenuID={activeMenuID}
              setActiveMenu={setActiveMenu}
              expandMainDrawer={expandMainDrawer}
            />
          ))}
        </div>
        <CSSTransition
          in={!!(activeMenuID && showSubMenu)}
          timeout={400}
          classNames='animate-submenu'
          unmountOnExit={true}
        >
          <div className='drawer-submenu' onMouseOver={expandMainDrawer}>
            <div
              data-test-id={getActiveMenuInfo() && getActiveMenuInfo().label}
              className='drawer-submenu-title'
            >
              {getActiveMenuInfo() && getActiveMenuInfo().label}
            </div>
            {getActiveMenuInfo() &&
              getActiveMenuInfo().submenus.map((subMenu: ISubMenuItem) => (
                <a
                  data-test-id={subMenu.label}
                  className={`drawer-submenu-item ${isSubMenuActive(subMenu.key) ? 'submenu-active' : ''
                    }`}
                  onClick={(e: any) => setActiveSubMenu(e, subMenu.key)}
                  key={`label-${subMenu.key}`}
                  href={`${getOrigin()}#/${subMenu.key}`}
                >
                  {subMenu.label}
                </a>
              ))}
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
