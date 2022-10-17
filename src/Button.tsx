import React from "react";

export interface ButtonProps {
    btnLabel: string;
}

export function PocButton({ btnLabel }: ButtonProps) {
    return (<button>{btnLabel}</button>)
};
