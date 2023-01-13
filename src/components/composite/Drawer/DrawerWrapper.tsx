import * as React from 'react';
import { Drawer } from './Drawer';

export const DrawerWrapper = (props: any) => {
    const { menuItems, menuLocation, navigateToRoute, onSubMenuClick, showMenuBar, ModuleNames } = props;
    
    const onSetActiveSubMenu = (key: string): void => {
        console.log('On Menu Click:',key);
        if (onSubMenuClick) onSubMenuClick();
        if (key === 'collection') {
            window.open('https://abc.def.com/', '_self');
        } else if (key.includes('classification/#')) {
            const page = redirectToModule(ModuleNames.classificationApp)
            window.open(page, '_self');
        } else if (key.includes('ingestion/#')) {
            const page = redirectToModule(ModuleNames.ingestionApp)
            window.open(page, '_self');
        } else if (key.includes('ratesmanagement/#')) {
            const page = redirectToModule(ModuleNames.ratesApp)
            window.open(page, '_self');
        } else if (key.includes('ingestion/#/dashboard/')) {
            const page = redirectToModule(ModuleNames.ingestionApp)
            window.open(page, '_self');
        } else {
            navigateToRoute(`/${key}`);
        }
    };

    const redirectToModule = (landingpage: string) => {
        console.log("Auth Check");
        return window.location.origin + landingpage + 'authtoken';
    }


    return (
        <Drawer
            menuItems={menuItems}
            menuLocation={() => { menuLocation() }}
            navigateToRoute={() => { navigateToRoute() }}
            onSubMenuClick={onSetActiveSubMenu}
            showMenuBar={showMenuBar}
        />
    )
}
