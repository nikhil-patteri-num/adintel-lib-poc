import * as React from 'react';
import { Drawer } from './Drawer';

export const DrawerWrapper = (props: any) => {
    const { menuItems, menuLocation, onSubMenuClick, showMenuBar } = props;

    const onSetActiveSubMenu = (key: string): void => {
        console.log('On Menu Click:', key);
        onSubMenuClick(key);
    };

    return (
        <Drawer
            menuItems={menuItems}
            menuLocation={() => { menuLocation() }}
            onSubMenuClick={onSetActiveSubMenu}
            showMenuBar={showMenuBar}
        />
    )
}
