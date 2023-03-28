import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { MenuItem } from './MenuItem';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import './drawer.scss';

library.add(faAngleDown)
library.add(faAngleUp)
dom.watch()


export interface ISubMenuItem {
  value: any;
  label: string;
  key: string;
  icon?: any;
  submenus?: any;
}

export interface IMenuItem extends ISubMenuItem {
  submenus: ISubMenuItem[];
}


export interface IConfigProps {
  customClass: string;
}

export interface IDrawerProps {
  menuItems: IMenuItem[];
  menuLocation?: any;
  onSubMenuClick: any;
  showMenuBar: boolean;
  config?: IConfigProps;
}

export const Drawer = (props: IDrawerProps) => {
  const { menuItems, menuLocation, onSubMenuClick, showMenuBar, config } = props;
  const defaultRoute = menuLocation.pathname;
  const [activeMenuID, setActiveMenuID] = useState<string | null>(null);
  const [activeSubMenuID, setActiveSubMenuID] = useState<string | null>(null);
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const [subMenuExpand, setSubMenuExpand] = useState<boolean>(true);
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

  const getMenu = (obj: any) => {
    return (
      <>
        <a
          data-test-id={obj.label}
          className={`drawer-submenu-item ${isSubMenuActive(obj.key) ? 'submenu-active' : ''
            }`}
          onClick={(e: any) => setActiveSubMenu(e, obj.key)}
          key={`label-${obj.key}`}
          href={`${getOrigin()}#/${obj.key}`}
        >
          {obj.label}</a>
      </>
    )

  }

  const getSubMenu = (obj: any) => {
    return (
      <>
        <div
          className={`drawer-submenu-item-head ${isSubMenuActive(obj.key) ? 'submenu-active' : ''
            }`}
          onClick={() => {
            setSubMenuExpand(!subMenuExpand);
          }}
        >{obj.label}
          &nbsp;&nbsp;{obj && obj.submenus && <Icon icon={!subMenuExpand ? faAngleDown : faAngleUp} />}
          {obj && obj.submenus && subMenuExpand &&
            <>
              <ul className='sub-menu-items-ul'>
                {obj && obj.submenus.map((obj: any) => <li className='sub-menu-items-ul-li' key={`submenus-${obj.key}`} >
                  <a
                    data-test-id={obj.label}
                    className={`drawer-submenu-list-item-link ${isSubMenuActive(obj.key) ? 'submenu-active' : ''
                      }`}
                    onClick={(e: any) => {
                      setActiveSubMenu(e, obj.key);
                      e.stopPropagation();
                    }}
                    key={`label-${obj.key}`}
                    href={`${getOrigin()}#/${obj.key}`}
                  >
                    {obj.label}</a>
                </li>)}
              </ul>
            </>
          }
        </div>
      </>
    )

  }

  return (
    <>
      <div className={`drawer ${config ? config.customClass : ''}`}>
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
                <React.Fragment key={`label-${subMenu.key}`}>
                  {subMenu && subMenu.submenus ?
                    getSubMenu(subMenu)
                    : getMenu(subMenu)}
                </React.Fragment>
              ))}
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
