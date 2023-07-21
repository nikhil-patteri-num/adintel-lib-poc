import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MultiSelect } from './../src/components/composite';
import { IMultiselectProps } from './../src/components/Composite/MultiSelect/MultiSelect';
import { IDropdownOptions } from '../src/components/core';   // ../../core

const options: IDropdownOptions[] = [
  {
    label: 'Audio',
    value: 1
  },
  {
    label: 'Video',
    value: 2
  },
  {
    label: 'english',
    value: 3
  }
];

export default {
  component: MultiSelect,
  title: 'Composite/MultiSelect'
} as Meta;

const demoFnctn = () => {
  // comment;
};

const Template: Story<IMultiselectProps> = args => <MultiSelect {...args} />;

const defaultArgs: IMultiselectProps = {
  id: '1',
  options,
  onClick: demoFnctn,
  placeholder: 'languages',
  defaultValues: [{ value: 2, label: 'Video', deactivated: false }]
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs
};

export const Deactivate = Template.bind({});
Deactivate.args = {
  ...defaultArgs,
  defaultValues: [{ value: 1, label: 'Video with Audio', deactivated: true }]
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultArgs,
  isPartiallyDisabled: true,
  defaultValues: [{ value: 1, label: 'Video with Audio', disabled: true }]
};


export const DefaultMultiSelectDropdown = () => {
  const [defaultValues, setDefaultValues]: any = React.useState([]);
  return (
    <>
      <div>
        <MultiSelect
          id="my-eke"
          customClass="multiselect-app"
          options={options}
          defaultValues={defaultValues}
          onClick={(arr) => {
            setDefaultValues(arr)
          }}
        />
      </div>
    </>
  )

}