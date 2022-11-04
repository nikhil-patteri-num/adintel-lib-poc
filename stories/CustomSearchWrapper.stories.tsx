import * as React from 'react';
import { CustomSearchWrapper } from '../src/components/composite/CustomSearch/CustomSearchWrapper';

export default {
    component: CustomSearchWrapper,
    title: "CustomSearch"
};

export const DefaultSearch = () => (
    <div>
        <CustomSearchWrapper
            searchData={{}}
            handleSearchData={() => {}}
            plainQuery={''}
            onChange={() => {}}
            onClearSearch={false}
            changedSearchText={''}
            isLoading={false}
            showEmptyOption={true} />
    </div>
);
