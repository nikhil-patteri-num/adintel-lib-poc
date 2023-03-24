import * as React from 'react';
import { useEffect, useState } from "react";
import { CustomSearch } from './CustomSearch';
import { ISearchDataType } from './interfaces/CustomSearchInterfaces';
import './search.scss';

export interface CustomSearchWrapperProps {
    searchData: ISearchDataType;
    handleSearchData: any;
    plainQuery: string;
    onChange: any;
    onClearSearch: boolean;
    changedSearchText: string;
    isLoading: boolean;
    showEmptyOption: boolean;
}

export const CustomSearchWrapper = ({
    searchData,
    handleSearchData,
    plainQuery,
    onChange,
    onClearSearch,
    changedSearchText,
    isLoading,
    showEmptyOption
}: CustomSearchWrapperProps) => {
    const [customSearchData, setCustomSearchData] = useState<ISearchDataType>({ columns: [], searchResults: [] });

    useEffect(() => {
        setCustomSearchData(searchData);
    }, [searchData])

    const handleOnChange = (arg1: string, arg2: string, arg3: string) => {
        const result = { ...customSearchData, searchResults: [] };
        setCustomSearchData(result);
        onChange(arg1, arg2, arg3);
    }

    return (
        <div className='custom-wrapper'>
            <CustomSearch
                customSearchData={customSearchData}
                onChange={handleOnChange}
                onCheckBoxChecked={true}
                onEnterButtonClick={() => { }}
                onSearch={handleSearchData}
                planeQuery={plainQuery}
                isLoading={isLoading}
                onClearSearch={onClearSearch}
                onSearchTextChange={changedSearchText}
                showEmptyOption={showEmptyOption}
            />
            {/* <div className={`query-label ${isQueryValid ? 'valid-text' : 'invalid-text'}`}>{searchQuery}</div> */}
        </div>
    )
}
