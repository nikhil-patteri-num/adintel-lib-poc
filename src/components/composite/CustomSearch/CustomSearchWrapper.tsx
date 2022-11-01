import * as React from 'react';
import { useEffect, useState } from "react";
import { CustomSearch } from './CustomSearch';
import './search.scss';

export interface CustomSearchWrapperProps {
    searchData: any;
    handleSearchData: any;
    plainQuery: string;
    onChange: any;
    onClearSearch: boolean;
}

export const CustomSearchWrapper = ({
    searchData,
    handleSearchData,
    plainQuery,
    onChange,
    onClearSearch
}: CustomSearchWrapperProps) => {
    const [customSearchData, setCustomSearchData] = useState<any>({ columns: []});

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
                isLoading={!customSearchData}
                onClearSearch={onClearSearch}
            />
            {/* <div className={`query-label ${isQueryValid ? 'valid-text' : 'invalid-text'}`}>{searchQuery}</div> */}
        </div>
    )
}
