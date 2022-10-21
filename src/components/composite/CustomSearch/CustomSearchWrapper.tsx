import * as React from 'react';
import { useEffect, useState } from "react";
import { CustomSearch } from './CustomSearch';
import './search.scss';

export const CustomSearchWrapper = ({ searchData, handleSearchData, plainQuery }: { searchData: any; handleSearchData: any, plainQuery: string }) => {
    const [customSearchData, setCustomSearchData] = useState<any>();

    useEffect(() => {
        console.log(searchData);
        setCustomSearchData(searchData);
    }, [searchData])

    const handleOnChange = () => {
        const result = { ...customSearchData, searchResults: [] };
        setCustomSearchData(result);
    }
    return (
        <div className='custom-wrapper'>
            {customSearchData && <CustomSearch
                customSearchData={customSearchData}
                onChange={handleOnChange}
                onCheckBoxChecked={true}
                onEnterButtonClick={() => { }}
                onSearch={handleSearchData}
                planeQuery={plainQuery}
            />}
            {/* <div className={`query-label ${isQueryValid ? 'valid-text' : 'invalid-text'}`}>{searchQuery}</div> */}
        </div>
    )
}
