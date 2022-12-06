import {
    ISearchDataType
} from "../src/components/composite/CustomSearch/interfaces/CustomSearchInterfaces";

export const sampleAllMediaData = {
    "digital": [
        {
            "id": 1,
            "label": "Advertiser",
            "type": "string",
            "value": "upper(first_seen_advertiser_name)"
        },
        {
            "id": 2,
            "label": "Category",
            "type": "string",
            "value": "category_name"
        },
        {
            "id": 3,
            "label": "Creative ID",
            "type": "string",
            "value": "kantar_creative_id"
        },
        {
            "id": 4,
            "label": "Parent",
            "type": "string",
            "value": "parent_product_name"
        },
        {
            "id": 5,
            "label": "Product",
            "type": "string",
            "value": "primary_product_name"
        },
        {
            "id": 6,
            "label": "Product ID",
            "type": "string",
            "value": "primary_product_id"
        },
        {
            "id": 7,
            "label": "Site",
            "type": "string",
            "value": "upper(first_seen_media_property_name)"
        },
        {
            "id": 8,
            "label": "Title",
            "type": "string",
            "value": "upper(descriptive_media_title)"
        }
    ],
    "tv": [
        {
            "id": 19,
            "label": "Advertiser",
            "type": "string",
            "value": "upper(first_seen_advertiser_name)"
        },
        {
            "id": 20,
            "label": "Category",
            "type": "string",
            "value": "category_name"
        },
        {
            "id": 22,
            "label": "Market",
            "type": "string",
            "value": "upper(first_seen_market_name)"
        },
        {
            "id": 23,
            "label": "Parent",
            "type": "string",
            "value": "parent_product_name"
        },
        {
            "id": 24,
            "label": "Product",
            "type": "string",
            "value": "primary_product_name"
        },
        {
            "id": 25,
            "label": "Product ID",
            "type": "string",
            "value": "primary_product_id"
        },
        {
            "id": 26,
            "label": "Station",
            "type": "string",
            "value": "upper(first_seen_media_property_name)"
        },
        {
            "id": 21,
            "label": "Creative ID",
            "type": "string",
            "value": "kantar_creative_id"
        }
    ],
    "print": [
        {
            "id": 9,
            "label": "Ad Type",
            "type": "string",
            "value": "upper(print_ad_type_n)"
        },
        {
            "id": 10,
            "label": "Category",
            "type": "string",
            "value": "category_name"
        },
        {
            "id": 11,
            "label": "Creative ID",
            "type": "string",
            "value": "kantar_creative_id"
        },
        {
            "id": 12,
            "label": "Headline",
            "type": "string",
            "value": "upper(headline_n)"
        },
        {
            "id": 13,
            "label": "Keyword",
            "type": "string",
            "value": "upper(_UNNEST__BSTART_keywords_BCLOSE__SPACE_keyword)"
        },
        {
            "id": 14,
            "label": "Market",
            "type": "string",
            "value": "upper(market)"
        },
        {
            "id": 15,
            "label": "Parent",
            "type": "string",
            "value": "parent_product_name"
        },
        {
            "id": 16,
            "label": "Product",
            "type": "string",
            "value": "primary_product_name"
        },
        {
            "id": 17,
            "label": "Product ID",
            "type": "string",
            "value": "primary_product_id"
        },
        {
            "id": 18,
            "label": "Publication Name",
            "type": "string",
            "value": "upper(publication_name)"
        }
    ]
};


export const sampleSearchData: ISearchDataType = {
    columns: sampleAllMediaData['print'],
    searchResults: [{ value: 0, label: "ONE AMERICA/21ST CNT/PSA" }]
}