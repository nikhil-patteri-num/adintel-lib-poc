import * as React from 'react';
import { CustomSearchWrapper } from '../src/components/composite/CustomSearch/CustomSearchWrapper';
import { sampleSearchData } from './constants';

export default {
    component: CustomSearchWrapper,
    title: "CustomSearch"
};

export const DefaultSearch = () => (
    <div>
        <CustomSearchWrapper
            searchData={sampleSearchData}
            handleSearchData={() => {}}
            plainQuery={''}
            onChange={() => {}}
            onClearSearch={false}
            changedSearchText={''}
            isLoading={false}
            showEmptyOption={true} />
    </div>
);
