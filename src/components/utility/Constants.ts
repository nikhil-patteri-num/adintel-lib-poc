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
