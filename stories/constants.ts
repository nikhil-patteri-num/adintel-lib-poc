import { ISearchDataType } from "../src/components/composite/CustomSearch/interfaces/CustomSearchInterfaces";

export const sampleSearchData: ISearchDataType = {
    columns: [
        {
            "id": 8,
            "label": "Ad ID",
            "value": "ad.adid",
            "type": "string"
        },
        {
            "id": 2,
            "label": "Advertiser",
            "value": "upper(advertiser.name)",
            "type": "string"
        },
        {
            "id": 3,
            "label": "Category",
            "value": "upper(category.name)",
            "type": "string"
        },
        {
            "id": 12,
            "label": "Classified By",
            "value": "upper(concat(appuser.firstname,' ',appuser.lastname))",
            "type": "string"
        },
        {
            "id": 11,
            "label": "Classified On",
            "value": "to_char(ad.classifiedon :: date, 'mm-dd-yyyy')",
            "type": "date"
        },
        {
            "id": 13,
            "label": "Component Program",
            "value": "upper(cptemplate.name)",
            "type": "string"
        },
        {
            "id": 10,
            "label": "Indexed By",
            "value": "upper(concat(t14.firstname,' ',t14.lastname))",
            "type": "string"
        },
        {
            "id": 9,
            "label": "Indexed On",
            "value": "to_char(ad.indexedon :: date, 'mm-dd-yyyy')",
            "type": "date"
        },
        {
            "id": 1,
            "label": "Industry",
            "value": "upper(industry.name)",
            "type": "string"
        },
        {
            "id": 7,
            "label": "Language",
            "value": "upper(language.name)",
            "type": "string"
        },
        {
            "id": 6,
            "label": "Media",
            "value": "upper(media.name)",
            "type": "string"
        },
        {
            "id": 5,
            "label": "Product",
            "value": "upper(product.name)",
            "type": "string"
        },
        {
            "id": 4,
            "label": "Sub Category",
            "value": "upper(subcategory.name)",
            "type": "string"
        }
    ],
    searchResults: []
}