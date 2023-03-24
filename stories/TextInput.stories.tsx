import * as React from 'react';
import { inputType, TextInput } from "../src/components/core/TextInput/TextInput"

export default {
    component: TextInput,
    title: "TextInput"
};


const Template = (args: any) => <TextInput {...args} />;

export const Text = () => (
    <div>
        <TextInput type={inputType.text} />
    </div>
);

export const Email = () => (
    <div>
        <TextInput type={inputType.email} />
    </div>
);

export const Password = () => (
    <div>
        <TextInput type={inputType.password} />
    </div>
);

export const Default = Template.bind({});