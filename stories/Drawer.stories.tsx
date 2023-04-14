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
  menuItems: sampleSidePanelData,
  subMenuAct: 'click',
  menuLocation: {},
  onSubMenuClick: demoFnctn,
  showMenuBar: true
};

const config = {
  customClass: 'my-drawer'
}
const menuLocation = {
  pathname: 'classification/#/digital-mapping'
}
export const DefaultDrawer = () => (

  <div>
    <Drawer
      menuItems={sampleSidePanelData}
      menuLocation={menuLocation}
      onSubMenuClick={(key: any) => { console.log(key); }}
      showMenuBar={false}
      config={config}
      subMenuAct={`hover`}
      menuRights={[{ id: 6 }, { id: 8 }]}
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
