import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Drawer } from '../src/components/composite/';
import { IDrawerProps } from '../src/components/composite/Drawer/Drawer';
import { sampleSidePanelData } from './constants';
export default {
  component: Drawer,
  title: 'Drawer'
} as Meta;
const Template: Story<IDrawerProps> = args => <Drawer {...args} />;

const demoFnctn = () => {
  // comment;
};
const defaultArgs: IDrawerProps = {
  menuItems: [
    {
      key: 'dashboard',
      icon: 'database',
      submenus: [
        { key: 'dashboard', value: 27, label: 'Dashboard' },
        { key: 'user-reports', value: 28, label: 'User Reports' },
        { key: 'universal-reports', value: 29, label: 'Universal Reports' }
      ],
      value: 1,
      label: 'Dashboard'
    },
    {
      key: 'queues',
      icon: 'bars',
      submenus: [
        { key: 'divi', value: 32, label: 'DIVI' },
        { key: 'indexing-queue', value: 3, label: 'Indexing Queue' },
        { key: 'classification-queue/default', value: 4, label: 'Classification Queue' },
        { key: 'component-queue', value: 5, label: 'Component Queue' },
        { key: 'audit-queue/default', value: 6, label: 'Audit Queue' },
        { key: 'query-queue', value: 7, label: 'Query Queue' }
      ],
      value: 2,
      label: 'Queues'
    }
  ],
  navigateToRoute: demoFnctn,
  onSubMenuClick: demoFnctn,
  defaultRoute: '/classification-queue/route'
};

export const DefaultDrawer = () => (

  <div>
    <Drawer
      menuItems={sampleSidePanelData}
      menuLocation={() => { }}
      onSubMenuClick={(key: any) => { console.log(key); }}
      showMenuBar={false}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
};

DefaultDrawer.args = {
  ...defaultArgs
};
