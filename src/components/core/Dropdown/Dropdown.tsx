import * as React from 'react';
import { IBaseControls } from '../IBaseControls';
import { DropdownSearchField } from './SearchDropdown/DropdownSearch';
import { DropdownSimple } from './SimpleDropdown/DropdownSimple';

export interface IDropdownOptions {
    label: any;
    value: any;
}

export interface IDropdownProps extends IBaseControls {
    options: IDropdownOptions[];
    onClick: (event: any) => void;
    placement?: string;
    clearSelection?: () => void;
    defaultItem?: any;
    searchOption?: boolean;
    sortOption?: boolean;
}

export enum DropdownPositions {
    up = 'up',
    down = 'down'
}

export const Dropdown = (props: IDropdownProps) => {

    const renderOption = () => {
        return props.searchOption && props.options && props.options.length > 0
    }
    return (
        <>
            {renderOption() ? <>
                <DropdownSearchField {...props} />
            </> : <>
                <DropdownSimple {...props} />
            </>}
        </>

    );
};
