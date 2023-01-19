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

export const ModuleNames = {
    classificationApp: '/classification?auth=',
    ratesApp: '/ratesmanagement?auth=',
    ingestionApp: '/ingestion?auth='
  }

  
export const sampleSidePanelData = [
    {
        "key": "classification/#",
        "label": "Classification",
        "icon":"tasks",
        "value": 5,
        "submenus": [
            {
                "key": "classification/#/digital-mapping",
                "label": "Digital Mapping",
                "value": 6,
                "submenus": null
            },
            {
                "key": "classification/#/digital-classification",
                "label": "Classification",
                "value": 7,
                "submenus": null
            },
            {
                "key": "classification/#/review",
                "label": "Creative Review",
                "value": 8,
                "submenus": null
            },
            {
                "key": "classification/#/creative-assignment",
                "label": "Creative Assignment",
                "value": 9,
                "submenus": null
            },
            {
                "key": "classification/#/admin",
                "label": "Admin",
                "value": 10,
                "submenus": null
            }
        ]
    },
    {
        "key": "ingestion/#",
        "label": "Ingestion",
        "icon":"archive",
        "value": 11,
        "submenus": [
            {
                "key": "ingestion/#/dashboard/adThenaIngestion",
                "label": "Dashboard",
                "value": 12,
                "submenus": null
            },
            {
                "key": "ingestion/#/summaryView",
                "label": "Ingestion Summary",
                "value": 13,
                "submenus": null
            },
            {
                "key": "ingestion/#/manualIngestion",
                "label": "Declarative Files",
                "value": 14,
                "submenus": null
            }
        ]
    },
    {
        "key": "ratesmanagement/#",
        "label": "Rates Management",
        "icon":"tags",
        "value": 15,
        "submenus": [
            {
                "key": "ratesmanagement/#/rates-summary",
                "label": "Media Properties",
                "value": 16,
                "submenus": null
            },
            {
                "key": "ratesmanagement/#/rategroupsummary",
                "label": "Rates Groups",
                "value": 17,
                "submenus": null
            },
            {
                "key": "ratesmanagement/#/contacts",
                "label": "Contacts",
                "value": 18,
                "submenus": null
            },
            {
                "key": "ratesmanagement/#/admin-overview",
                "label": "Admin",
                "value": 19,
                "submenus": null
            },
            {
                "key": "ratesmanagement/#/coefficientmediasubtypes",
                "label": "Programmatic Coefficients",
                "value": 20,
                "submenus": null
            }
        ]
    },
    {
        "key": "attribute-management",
        "label": "Attribute Management",
        "icon":"folder-open",
        "value": 21,
        "submenus": [
            {
                "key": "indexing-attribute",
                "label": "Indexing Attribute",
                "value": 22,
                "submenus": null
            }
        ]
    },
    {
        "key": "useraccess/#",
        "label": "User Access",
        "icon":"users",
        "value": 1,
        "submenus": [
            {
                "key": "users",
                "label": "Users",
                "value": 2,
                "submenus": null
            },
            {
                "key": "roles",
                "label": "Roles",
                "value": 3,
                "submenus": null
            },
            {
                "key": "profiles",
                "label": "Profiles",
                "value": 4,
                "submenus": null
            }
        ]
    },
    {
        "key": "template-management",
        "label": "Template Management",
        "icon":"file",
        "value": 23,
        "submenus": [
            {
                "key": "indexing-template",
                "label": "Indexing Template",
                "value": 24,
                "submenus": null
            }
        ]
    },
    {
        "key": "general-settings",
        "label": "General Settings",
        "icon":"cog",
        "value": 25,
        "submenus": [
            {
                "key": "media-group",
                "label": "Media Group",
                "value": 26,
                "submenus": null
            }
        ]
    }
]

