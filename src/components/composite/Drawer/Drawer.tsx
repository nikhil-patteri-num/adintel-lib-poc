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
  customClass?: string;
  currentKey?: string;
}

export interface IDrawerProps {
  menuItems: IMenuItem[];
  menuLocation?: any;
  onSubMenuClick: any;
  showMenuBar: boolean;
  config?: IConfigProps;
  subMenuAct: string;   // hover || click
}

export const Drawer = (props: IDrawerProps) => {
  const { menuItems, menuLocation, onSubMenuClick, showMenuBar, config, subMenuAct } = props;
  const currentKey = config && config.currentKey;
  const customClass = config && config.customClass;
  const defaultRoute = menuLocation.pathname;
  const [selectedMenuID, setSelectedMenuID] = useState<string | null>(null);
  const [activeMenuID, setActiveMenuID] = useState<string | null>(null);
  const [activeSubMenuID, setActiveSubMenuID] = useState<string | null>(null);
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const [subMenuExpand, setSubMenuExpand] = useState<boolean>(true);
  const drawerRef: React.RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (defaultRoute && menuItems.length) {
      //const defaultRouteKey = defaultRoute.substr(1);
      const activeMenu: IMenuItem = menuItems.find(
        (menuItem: any) =>
          menuItem.key === defaultRoute ||
          menuItem.submenus.find((subMenu: any) => subMenu.key === defaultRoute)
      ) as IMenuItem;
      const activeSubMenu =
        activeMenu &&
        (activeMenu.submenus.find((subMenu: any) => subMenu.key === defaultRoute) as IMenuItem);
      if (activeMenu && activeSubMenu) {
        setSelectedMenuID(activeMenu.key);
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
    // setSelectedMenuID(id);
    setActiveMenuID(id);
    setShowSubMenu(true);
    collapseMainDrawer();
  };

  const getActiveMenuInfo = (): IMenuItem => {
    return menuItems.find((menuItem: any) => menuItem.key === activeMenuID) as IMenuItem;
  };

  const setActiveSubMenu = (e: any, key: string): void => {
    setSelectedMenuID(key);
    setActiveSubMenuID(key);
    onSubMenuClick  && onSubMenuClick(key);
    setShowSubMenu(false);
    e.preventDefault();
  };

  const isSubMenuActive = (subMenuKey: string) => {
    return subMenuKey === activeSubMenuID;
  };

  const setCurrentKeySelected = (key: string) => {
    return currentKey === key ? 'submenu-active' : ''
  }

  const getMenu = (obj: any) => {
    return (
      <>
        <a
          data-test-id={obj.label}
          className={`drawer-submenu-item ${setCurrentKeySelected(obj.key)} ${isSubMenuActive(obj.key) ? 'submenu-active' : ''
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
          className={`drawer-submenu-item-head ${setCurrentKeySelected(obj.key)} ${isSubMenuActive(obj.key) ? 'submenu-active' : ''}`}
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

  const checkSelectedSubmenu = (obj: any) => {
    if (selectedMenuID === obj.key) {
      return true
    } else {
      var tmp = obj.submenus.filter((item: any) => item.key === selectedMenuID);
      if (obj.submenus && obj.submenus.submenus) {
        var tmp1 = obj.submenus && obj.submenus.submenus.filter((item: any) => item.key === selectedMenuID);
        if (tmp1.length > 0) {
          return true
        }
      }
      if (tmp.length > 0) {
        return true
      }
    }
    return false
  }

  return (
    <>
      <div className={`drawer ${customClass ? customClass : ''}`}>
        <div className={`drawer-menu ${subMenuAct === 'click' ? 'drawer-menu-hover' : ''}`} id='menubar' ref={drawerRef}>
          {menuItems.map((menuItem: IMenuItem) => (
            <MenuItem
              key={`menu-item-${menuItem.key}`}
              menu={menuItem}
              activeMenuID={activeMenuID}
              selectedMenuID={selectedMenuID}
              selected={checkSelectedSubmenu(menuItem)}
              setActiveMenu={setActiveMenu}
              expandMainDrawer={expandMainDrawer}
              subMenuAct={subMenuAct}
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
