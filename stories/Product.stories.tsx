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
  isEditmode:true,
  isProductmode:true
};

export const DefaultProduct = () => (

  <div>
    <Product
     isEditmode={false}
     isProductmode={true} 
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
};
DefaultProduct.args = {
  ...defaultArgs
};
