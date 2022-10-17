export enum SearchResultType {
  singleSelect = 'singleSelect',
  multiSelect = 'multiSelect',
  datePicker = 'datePicker'
}

export enum ColumnTypes {
  date = 'date',
  string = 'string'
}
export const inOperator = { label: 'IN', value: 'in', type: 'any' };
export const notInOperator = { label: 'NOT IN', value: 'not in', type: 'any' };
export const orderByOperator = { label: 'ORDER BY', value: 'order by' };
export const byOperator = { label: 'BY', value: 'by' };
export const orderOperator = { label: 'ORDER', value: 'order' };
export const conditionalOperators = [
  { label: '=', value: '=', type: 'any' },
  { label: '<', value: '<', type: 'number' },
  { label: '>', value: '>', type: 'number' },
  { label: '<=', value: '<=', type: 'number' },
  { label: '>=', value: '>=', type: 'number' },
  { label: '!=', value: '>=', type: 'any' },
  inOperator,
  notInOperator
];

export const sortingOperators = [
  {
    label: 'ASC',
    value: 'asc'
  },
  {
    label: 'DESC',
    value: 'desc'
  }
];

export const logicalOperators = [
  { label: 'AND', value: 'and' },
  { label: 'OR', value: 'or' },
  orderByOperator
];

export const notOperator = { label: 'NOT', value: 'not' };
export const datePickerDefaultLeftMargin = 76;
