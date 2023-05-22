import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Product, IProductProps } from '../src/components/composite/Product';
export default {
  component: Product,
  title: 'Product'
} as Meta;
const Template: Story<IProductProps> = args => <Product {...args} />;

const demoFnctn = () => {
  // comment;
};
const defaultArgs: IProductProps = {
};



export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
};

