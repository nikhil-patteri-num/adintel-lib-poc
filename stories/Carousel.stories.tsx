import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
// import { Carousel } from '../src/components/composite/';
import { ICarouselProps, Carousel } from '../src/components/composite/Carousel/Carousel';
import { imageSlider } from './constants';
export default {
  component: Carousel,
  title: 'Carousel'
} as Meta;
const Template: Story<ICarouselProps> = args => <div style={{ width: "285px" }}><Carousel {...args} /></div>;


const defaultArgs: ICarouselProps = {
  listItems: imageSlider,
  per_page:4
};

export const DefaultDrawer = () => (

  <div style={{ width: "285px" }}>
    <Carousel
      listItems={imageSlider}
      per_page={3}
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
