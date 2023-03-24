import * as React from 'react';
import { CustomSearchWrapper, CustomSearchWrapperProps } from '../src/components/composite/CustomSearch/CustomSearchWrapper';
import { sampleSearchData } from './constants';

export default {
    component: CustomSearchWrapper,
    title: "CustomSearch",
    argTypes: {
        searchData: { type: { name: 'string', required: true }, defaultValue: { columns: [] } }
    }
};

const Template = (args: CustomSearchWrapperProps) => <CustomSearchWrapper {...args} />;

export const DefaultSearch = () => (
    <div>
        <CustomSearchWrapper
            searchData={sampleSearchData}
            handleSearchData={() => { }}
            plainQuery={''}
            onChange={() => { }}
            onClearSearch={false}
            changedSearchText={''}
            isLoading={false}
            showEmptyOption={false} />
    </div>
);

export const Default = Template.bind({});
