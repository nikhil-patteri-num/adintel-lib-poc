import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Breadcrumbs } from '../src/components/composite/';
import { IBreadcrumbsProps } from '../src/components/composite/Breadcrumbs/Breadcrumbs';

export default {
  component: Breadcrumbs,
  title: 'Breadcrumbs'
} as Meta;
const Template: Story<IBreadcrumbsProps> = args => <Breadcrumbs {...args} />;


const defaultArgs: IBreadcrumbsProps = {
  items: [{ link: '#', label: 'Home' }, { link: '#', label: 'Pictures' }, { link: '#', label: 'Summer 15' }, { link: '#', label: 'Italy' }],
  onBreadcrumbClick: (a) => console.log(a)
};


export const DefaultBreadcrumbs = () => (

  <div>
    <Breadcrumbs
      customClass="breadcrumbs-app"
      items={[{ link: '#', label: 'Home' }, { link: '#', label: 'Pictures' }, { link: '#', label: 'Summer 15' }, { link: '#', label: 'Italy' }]}
      onBreadcrumbClick={(a) => console.log(a)}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
};

DefaultBreadcrumbs.args = {
  ...defaultArgs
};
