import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
// import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import './drawer.scss';
import CustomIcons from './Icons';

const iconList = Object.keys(Icons)
  .filter((key: any) => key !== 'fas' && key !== 'prefix')
  .map((icon: any) => Icons[icon as keyof typeof Icons]);
// library.add(...iconList);
iconList.map((item: any) => {
  library.add(item);
});


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
  // const [selectedMenuID, setSelectedMenuID] = useState<string | null>(null);
  // const [activeMenuID, setActiveMenuID] = useState<string | null>(null);
  // const [activeSubMenuID, setActiveSubMenuID] = useState<string | null>(null);
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  // const [subMenuExpand, setSubMenuExpand] = useState<boolean>(true);
  const [activeMenuInfo, setActiveMenuInfo] = useState<any>(null);
  const drawerRef: React.RefObject<HTMLDivElement> = useRef(null);


  const [activeId, setActiveId] = useState<any>(null);

  const path = window.location.hash.split("?auth");
  const currentPath = path && path[0].replace('#/', '');

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
        // setSelectedMenuID(activeMenu.key);
        // setActiveMenuID(activeMenu.key);
        // setActiveSubMenuID(activeSubMenu.key);
      }
    }
  }, [defaultRoute, menuItems]);


  useEffect(() => {
    document.addEventListener('mousedown', onOutSideClick);
  }, []);

  useEffect(() => {
    document.addEventListener('onmouseout', onOutSideHover);
  }, []);

  useEffect(() => {
    document.addEventListener('onmouseleave', onOutSideHover);
  }, []);


  const getOrigin = () => {
    const address = location.origin + location.pathname + (location.pathname.endsWith('/') ? '' : '/')
    return address;
  }
  const onOutSideClick = (event: any): void => {
    const selectedElement = document.getElementsByClassName('drawer');
    if (selectedElement && selectedElement[0] && !selectedElement[0].contains(event.target)) {
      setShowSubMenu(false);
      setActiveId(null);
    }
  };

  const onOutSideHover = (event: any): void => {
    const selectedElement = document.getElementsByClassName('drawer');
    if (selectedElement && selectedElement[0] && !selectedElement[0].contains(event.target)) {
      setShowSubMenu(false);
      setActiveMenu();
      setActiveId(null);
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

  const setActiveMenu = (): void => {
    // setSelectedMenuID(id);
    // setActiveMenuID(id);
    setShowSubMenu(true);
    collapseMainDrawer();
  };

  const getActiveMenuInfo = (): IMenuItem => {
    return activeMenuInfo;
  };

  const setActiveSubMenu = (e: any, key: string): void => {
    // setSelectedMenuID(key);
    // setActiveSubMenuID(key);
    onSubMenuClick && onSubMenuClick(key);
    setShowSubMenu(false);
    e.preventDefault();
  };

  // const isSubMenuActive = (subMenuKey: string) => {
  //   return subMenuKey === activeSubMenuID;
  // };

  const setCurrentKeySelected = (key: string) => {
    // var path = window.location.hash.replace('#/', '');
    if (key.endsWith(currentPath)) {
      if (currentPath !== currentKey) {
        return currentPath && isExactMatch(key, currentPath) ? 'submenu-active' : ''
      }
      return currentKey && isExactMatch(key, currentKey) ? 'submenu-active' : ''
    }
    return ''
  }


  const escapeRegExpMatch = function (s: any) {
    return s && s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  const isExactMatch = (str: any, match: any) => {
    return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`).test(str)
  }

  const selectDefaultMenu = (obj: any) => {
    var cls = '';
    var tmp = obj.submenus.filter((item: any) => {
      var key;
      key = item && item.key && item.key.replace('-', '')
      if (item && item.key && item.key.endsWith(currentPath)) {
        if (currentPath) {
          if (isExactMatch(key, currentPath && currentPath.replace('-', ''))) {
            return item
          }
        } else if (currentKey) {
          if (isExactMatch(key, currentKey && currentKey.replace('-', ''))) {
            return item
          }
        }
      }
    });

    if (tmp.length > 0) {
      return `${cls} menu-selected`
    }
    return `${cls} `
  }

  const getActivemenu = (obj: string) => {
    var cls = '';
    if (activeId === obj) {
      return `${cls} menu-active`
    }
    return `${cls} `
  }

  const showSubMenus = (obj: any) => {
    // setActiveMenuID(obj.key);
    setShowSubMenu(true);
    setActiveMenuInfo(obj);
  }



  return (
    <>
      <div className={`drawer ${customClass ? customClass : ''}`}>
        <div className={`drawer-menu ${subMenuAct === 'click' ? 'drawer-menu-hover' : ''}`} id='menubar' ref={drawerRef}>
          {menuItems.map((menuItem: IMenuItem) => (
            <div
              key={`menu-item-${menuItem.key}`}
              data-test-id={`menu-item-${menuItem.key}`}
              className={`drawer-menu-item  ${selectDefaultMenu(menuItem)} ${getActivemenu(menuItem.key)}`}
              onMouseOver={() => {
                showSubMenus(menuItem);
                setActiveId(menuItem.key);
              }}
            >
              <div className={`drawer-menu-item-icon svg-${menuItem.icon}`}>
                {/* {menuItem.icon ? <Icon icon={menuItem.icon} /> : <Icon icon={'arrow-circle-right'} />} */}
                <CustomIcons type={menuItem.icon} label={menuItem.label} />
              </div>
            </div>
          ))}
        </div>
        <CSSTransition
          in={!!(showSubMenu)}
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
                  <a
                    data-test-id={subMenu.label}
                    className={`drawer-submenu-item ${setCurrentKeySelected(subMenu.key)}`}
                    onClick={(e: any) => setActiveSubMenu(e, subMenu.key)}
                    key={`label-${subMenu.key}`}
                    href={`${getOrigin()}#/${subMenu.key}`}
                  >
                    {subMenu.label}</a>
                </React.Fragment>
              ))}
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
