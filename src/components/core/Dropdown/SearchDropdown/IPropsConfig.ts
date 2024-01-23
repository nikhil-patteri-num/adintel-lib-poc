export interface IDropDownOption {
    label: string;
    checked: boolean;
    value: number;
}

export interface IDropDownOptionsProps {
    options: IDropDownOption[];
    onClick: (value: number) => void;
    toggleShowDropdown: any;
    activeSuggestion?: any;
}

export interface IOptionProps {
    option: IDropDownOption;
    onClick: (value: any) => void;
    index: number;
    onkeyPressed: (event: any, index: number, value: number) => void;
    activeSuggestion?: any;
}

export interface IDropdownOptions {
    label: string;
    value: number;
}

export interface IDropdownSearchProps {
    id: string;
    options: any[];
    onClick(onClick: number[]): void;
    onDropdownVisibleChange?: (visible: boolean) => void;
    placeholder?: any;
    defaultValues: any[];
    customClass?: string;
    isSorted?:boolean;
}

export interface IDropdownInputProps {
    value: string;
    onChange: (event: any) => void;
    onKeyDown?: (event: any) => void;
}

export interface IDropDownChipsProps {
    id?: string;
    chips: IDropDownOption[];
    toggleShowDropdown: (value: boolean) => void;
    showDropdown: boolean;
    placeholder: any;
}
