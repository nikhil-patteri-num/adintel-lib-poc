import * as React from 'react';
import { useEffect, useState } from "react";
import { CustomSearch } from './CustomSearch';
// import { bearerToken } from "../../../TestComponent/token";
import './search.scss';

export const CustomSearchWrapper = ({ searchData, handleSearchData }: { searchData: any; handleSearchData: any }) => {
    const [customSearchData, setCustomSearchData] = useState<any>();
    // const [searchQuery, setSearchQuery] = useState();
    // const [isQueryValid, setIsQueryValid] = useState(true);

    useEffect(() => {
        console.log(searchData);
        setCustomSearchData(searchData);
    }, [searchData])

    // const handleSearchData = (payload: any) => {
    //     // console.log(payload);
    //     const urlConfig = {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Authorization': bearerToken
    //         })
    //     }
    //     const url = `https://dev.api.adlake.numerator.cloud/api/classification/reference/customsearchfields/?search_text=${payload.searchText}&id=${payload.id}`;
    //     fetch(url, urlConfig).then((res) => {
    //         return res.json();
    //     }).then((response) => {
    //         const result = { ...customSearchData, searchResults: response.data.fields }
    //         // console.log(customSearchData);
    //         setCustomSearchData(result);
    //     })
    // }

    const handleOnChange = () => {
        // console.log(args);
        // setSearchQuery(args);
        // console.log(args2);
        // console.log(args3);
        // setIsQueryValid(args3);
        const result = { ...customSearchData, searchResults: [] }
        // console.log(customSearchData);
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
                planeQuery={''}
            />}
            {/* <div className={`query-label ${isQueryValid ? 'valid-text' : 'invalid-text'}`}>{searchQuery}</div> */}
        </div>
    )
}

// export default CustomSearchWrapper;