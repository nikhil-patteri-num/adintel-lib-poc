import { IBaseProperties } from "./types";

export enum keyCode {
  Down = 40,
  Up = 38,
  Enter = 13,
  Tab = 9,
  Space = 32,
  Ctrl = 17,
  Right = 39,
  Left = 37,
  One = 49,
  Two = 50,
  Three = 51,
  Period = 46,
  Minus = 45
}

export const scrollBehaviours = {
  smoothCentered: { behavior: 'smooth', block: 'nearest', inline: 'start' }
};
// All Component Library regex patterns should go here
export const PATTERNS = {
  AllowOnlyNumericInput: new RegExp(/[a-zA-Z`~!@#$%^&*()_|.+\-=?;:'",<>\{\}\[\]\\\/]/gi),
  ZipCode: new RegExp(/^\d+$/),
  EveryYear: new RegExp(/^[0-9]+$/),
  StartYear: new RegExp(/^[12][0-9]{3}$/)
};

export const noResultFound = 'No Results Found';

// export const defaultMediaPlayerThumbnail = {
//   path: require('../assets/images/player-thumbnail.png')
// };

export const MULTI_CHOICE_GENERATOR = {
  AddChoices: 'Add Choices',
  RadioNote: 'Select corresponding radio option to set the choice as default'
};

export const ExportOptionMenu = [
  { value: 'xlsx', label: 'MS Excel' },
  { value: 'csv', label: 'CSV' }
];

export const TITLES = {
  exportList: 'Export List'
};
export const MediaNotAvailable = 'Creative not available for this resolution.';
export const AdIdPlaceholder = 'Enter comma separated Ad ID’s';

export const UserInactivityMessages = {
  sessionAboutToExpireTitle: 'Session About to Expire',
  sessionExpiredTitle: 'Session Expired',
  sessionExpiredMessage:
    'You have been signed out. As a security precaution, AdLake ends your session after a period of inactivity',
  getSessionAboutToExpireMessage: (timer: string): string => {
    return `Are you still there?
    You are being signed out in ${timer} sec.
    Click OK to continue your session`;
  }
};

export const BUTTON_TOOLTIP_TEXT = {
  Add: ' Add',
  Remove: 'Remove',
  MoveUp: 'Move Up',
  MoveDown: 'Move Down'
};

export const SEARCH_DEBOUNCE_TIME = 750;

export const LEAD_AUDIO_ID = 4;
export const HEADLINE_ID = 3;
export const LEAD_AUDIO = 'Lead Audio';
export const HEADLINE = 'Headline';

// Width of header-item and row-item should be set to same in listSelector.scss
export const LIST_SELECTOR_ROW_ITEM_WIDTH = 300;

export const RELATED_AD_KEY = 'mapping_count';

export const EXPAND_TEXT_AREA_FIELD_IDS = [3, 4, 5, 6, 7, 8, 9];

export const ERROR_MESSAGES = {
  OnlyPrintMediaRecordsSupported: 'Please select a valid Print record',
  RecordNotSelected: 'Please select a record before continuing.',
  AdvertiserNotSelected: 'Please select an advertiser.',
  IndustryNotSelected: 'Please select an industry.',
  TagLineNameCanNotBeEmpty: 'Please provide a valid tagline.',
  IndustryIsEmpty: 'Please provide a valid industry name.',
  DuplicateRecord: 'Duplicate Check: The record is already exists.',
  MandatoryFields: 'Please enter correct information for the mandatory fields.',
  ZipcodeContainsAlphabets: 'Please provide a valid zipcode',
  ComponentNotReadyForCoding: 'Please complete component coding.',
  fileFormatNotSupportedErrorText: 'File Format is Not supported',
  // mediaNotFoundErrorImage: require('../assets/images/media-unavailable.jpg'),
  mediaNotFoundErrorText: 'Media Not Available',
  adDetailErrorMessage: 'The Classification Step One information is not saved.',
  mandatoryAttributeValidationMessage: 'Please complete response for the mandatory Ad Attributes',
  SelectOptions: 'Please define attribute choices.',
  SelectCoopProgram: 'Please select the component program.',
  QuestionHierarchyNotDefined: 'Please define question hierarchy',
  thumbnailRequired: 'Please select appropriate thumbnail to proceed.',
  ComponentItemNotSelected: 'Please select at least one component attribute',
  InvalidIndexingFieldsSelection: 'Invalid Indexing Field Selection',
  IndexingFieldsDuplicate: 'Please remove one of the field from the selected fields section',
  FieldsMandatoryNotSelected: 'The following fields needs to be the part of selected fields :',
  ComponontReject:
    'The Component Programs can be rejected only for "Ready for Ad Splitter" records.',
  CreativesMediaMismatch: "The New Ad & Similar Ad creatives doesn't match",
  NegativeSplitterDimensions: 'Splitter Dimensions can not be negative',
  ParentDeactivate: 'You cannot activate as the corresponding parent record(s) is deactivated',
  PDFEmptyContent: 'End of the Document',
  SumExceed: 'Total percentage value should be in the range of 1 to 100 only',
  AuditNumberOfAdRecords: 'Audit Number of Ad Records can not be 0',
  MediaGroupIsEmpty: 'Please provide valid Media Group name.',
  NotRemoveDefault: 'The Default column(s) cannot be removed',
  SelectedWidthZero: 'Selected columns width cannot be blank or should be more than 5 characters',
  AtleatHaveOneColumn: 'The Selected Columns section must have at least one column.',
  InvalidAttributeConditions: 'Please check the attribute condition',
  InvalidAttributeSearchConditions: 'Please check the attribute search condition',
  RoleRightsNotSelected: 'Please check the Role Rights',
  Unauthorized: 'User does not have permission to perform this action',
  DeleteConfirmationMessage:
    "This record is about to be permanently deleted. Once you delete, it's gone for good.",
  DiviCollectionResponseValidation: 'Please provide responses for all the creatives to proceed.',
  DropdownChoices: 'Please add dropdown choices',
  DuplicateDropdownChoices: 'Please remove duplicate dropdown choices.',
  ConditionNotSelected: ' Please select a  condition for delete.',
  MediaNotAvailable: 'Creative not available for this resolution.',
  AuditQueueMandateDateSelection: 'Please define From or To Date.',
  NoRecordsinPreSalesGrid: 'No records - Project cannot be created',
  UserInactivityMessage:
    'You have been signed out. As a security precaution, AdLake will end your session after a period of inactivity',
  InvalidMediaGroupMediaSelection: 'Invalid Media Group & Media Selection',
  InvalidMediaGroupMediaSelectionMessage:
    'Indexing Templates already exists for the selected Media Group and Media Combination',
  DuplicateIndexingFieldSelection: (fieldArr: string[]) => {
    return (
      fieldArr.slice(0, -1).join(', ') +
      ` and ${fieldArr.slice(
        -1
      )} fields cannot be part of the same template. Please remove one of the fields from the selected field section`
    );
  },
  MediaGroupWithNoMedia:
    'Please select another Media Group as there is no Media associated with it',
  DefineChoices: 'Please add choices',
  LowHighLimit: 'Low Limit should be less than or equal to High Limit',
  FieldAvailabilityConditionsCheck: 'Please check the Field availability condition',
  RaiseQueryMandatoryFields: 'Please enter the mandatory fields for all queries',
  MandatoryFieldsInIndexingDetails: 'Please enter the mandatory fields for the indexing detail',
  MandatoryFieldsInClassificationDetails:
    'Please enter the mandatory fields for the classification detail',
  RaiseQueryResponseMandatoryFields: 'Please enter the mandatory fields for all queries responses',
  DuplicateMappingExists:
    'Duplicate mapping of fields is not allowed. Please provide correct mapping',
  DeactivateIndexingTemplate:
    'Deactivating the template will result in loss of the attributes on the indexing screen. Are you sure you want to deactivate the ',
  STEP2_WORK_IN_PROGRESS:
    'Classification Step 1 Data Saved! The Query Queue Implementation for Classification Step 2 Page is Work In Progress...', // to be removed
  INDEXING_TEMPLATE_UNSAVED_CHANGES_ALERT:
    'The changes in the template needs to be saved before proceeding to map fields. Do you want to save?',
  INDEXING_FIELD_MAPPING_REVIEW_ALERT:
    'The changes in the template may affect the field mapping for the indexing fields. Do you want to Save the changes and review the field mapping sheet?',
  TourGuideNotFound: 'Tour Guide for current page is in progress',
  HistoryFormError: 'Error present in the form.',
  MapADAlert:
    'Mapping the two records mean that the creatives are exactly the same.Are you sure you want to Map?',
  MinimumCreativeLengthError: 'Selected creative length should be minimum 5 seconds',
  CreativeRangeError: 'Start time should be always less than End time',
  TimeNegative: 'Start time and End time cannot be negative',
  EmptyStartOrEndTime: 'Please enter start and end time',
  EndTimeOutOfRange: 'End time should be always less than creative duration',
  ParentAdvertiserIndustryDisableMessage:
    'You can either edit Corporation/Parent Name or Industry at a time'
};

export const Creative = {
  playbackQualityPopup: 'playbackQualityPopup',
  playbackRatePopup: 'playbackRatePopup',
  playbackQualityButton: 'playbackQualityButton',
  playbackRateButton: 'playbackRateButton',
  playbackRateHeader: 'Playback Speed',
  playbackQualityHeader: 'Video Quality',
  newTab: 'Open in new tab',
  reportIssue: 'Report an Issue',
  editVideo: 'Edit Video'
};

export const playbackRateList: IBaseProperties[] = [
  { value: 0.5, label: '0.5' },
  { value: 0.75, label: '0.75' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: '1.25' },
  { value: 1.5, label: '1.5' }
];

export const playbackQualityList = [
  { value: 0, label: 'High Res' },
  { value: 1, label: 'Low Res' }
];

export const CREATIVE_PLAYER = {
  SupportedFileFormats: [
    {
      extension: 'mp4',
      type: 'video'
    },
    {
      extension: 'mp3',
      type: 'audio'
    },
    {
      extension: 'jpg',
      type: 'image'
    },
    {
      extension: 'jpeg',
      type: 'image'
    },
    {
      extension: 'png',
      type: 'image'
    },
    {
      extension: 'gif',
      type: 'image'
    },
    {
      extension: 'pdf',
      type: 'document'
    }
  ],
  title: 'New Ad',
  next: 'next',
  prev: 'prev'
};

export const CreativeStatus = {
  UN_PROCESSED: 0,
  IN_PROGRESS: 1,
  COMPLETE: 2
};

// export const defaultMediaPlayerThumbnail = {
//   path: require('../assets/images/player-thumbnail.png')
// };
