import * as React from 'react';
// import React from "react";
import { inputType, TextInput } from "./TextInput";

export default {
    title: "TextInput"
};

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