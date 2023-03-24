export const searchDebounceTime = 1000;

export const AdDetailsResponse: any = {
  adDetailsSaveFailed: 'AdDetailsSaveFailed'
};

export const saveSubCategoryResponse: any = {};
export const saveProductResponse: any = {
  saveProductSuccess: 'saveProductSuccess',
  saveProductError: 'saveProductError'
};

export const ErrorMessage = {
  FailedToDelete: 'Failed to delete record.'
};

export const APPLICATION_ENVIRONMENT = 'APPLICATION_DEPLOYMENT_ENVIRONMENT';
export const FRONTEND_BUILD_VERSION = 'FRONTEND_DEPLOYMENT_BUILD_VERSION';
export const UNIVERSAL_SEARCH_READONLY_PARAM = 'read-only';

export const USER_INACTIVITY_MESSAGE =
  'You have been signed out. As a security precaution, AdLake will end your session after a period of inactivity';

export enum REDIRECT_URL_TYPES {
  AUDIT_QUEUE = 'audit-queue/',
  AUDIT_QUEUE_DEFAULT = 'audit-queue/default',
  AUDIT_QUEUE_CUSTOM = 'audit-queue/custom',
  AUDIT_QUEUE_COMPONENT_PROGRAM = 'audit-queue/componentProgram',
  AUDIT_QUEUE_ADID = 'audit-queue/adID',
  CLASSIFICATION_QUEUE = 'classification-queue',
  CLASSIFICATION_QUEUE_DEFAULT = 'classification-queue/default',
  CLASSIFICATION_QUEUE_PROJECT = 'classification-queue/project',
  INDEXING_QUEUE = 'indexing-queue',
  COMPONENT_QUEUE = 'component-queue',
  UNIVERSAL_SEARCH = 'universal-search',
  QUERY_QUEUE = 'query-queue'
}

export const AdLockContexts = [
  'Indexing Process',
  'Classification Process',
  'Component Process',
  'Audit Process',
  'Classification Process',
  'Universal Search'
];

interface ILockParams {
  modifiedby_user: boolean;
  record_id?: any;
  label?: string;
  value: any;
  context: number;
}

export const getLockMessage = (data: ILockParams) => {
  if (data.modifiedby_user) {
    return `We detected that you have another Ad record open with you in ${
      AdLockContexts[data.context]
    }. Opening a new Ad record will result in loss of any unsaved changes in the previous Ad Record with ${
      data.label
    } ${data.value}. Do you want to continue?`;
  }
  return 'The Ad record is locked as some other AdLake user is processing it.';
};
export const TITLES = {
  sessionAboutExpired: 'Session About to Expire',
  sessionExpired: 'Session Expired'
};
export enum TIMEOUT_COUNTERS {
  SessionTimeout = 840000, // (14 minutes) in milliseconds
  CountdownStartFrom = 60, // in seconds,
  InactivityCheckTimeout = 1000
}
export const INACTIVITY_KEYS = {
  sessionInfo: 'sessionInfo',
  sessionExpirationTime: 'sessionExpirationTime',
  sessionCountDown: 'sessionCountDown'
};

export const USER_INACTIVE_ERROR_CODE = '67';

export enum mediaGroups {
  audioOnly = 3
}

export const CLASSIFICATION_APIS = ['AttributeManagement/', 'MediaGroup/'];
