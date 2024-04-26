// convert array object into dropdown compatible format
export const getDropdownCompatibleData = (
  data: Array<any>,
  { label, value }: { label: string; value: string }
) => {
  try {
    return data.map(item => ({
      label: item[label] || '',
      value: item[value]
    }));
  } catch {
    return [];
  }
};
export const getDropdownClassesCompatibleData = (  
  data: Array<any>,
  { label, value, code }: { label: string, value: string, code: string}
) => {
  try {
    return data.map(item => ({
      label: item[code] + ' : ' + item[label],
      value: item[value],
      code: item[code]
    }));
  } catch {
    return [];
  }
};
// check exact search value in drop-down data
export const checkExactSearchMatch = (searchedText: string, data: Array<any>, labelKey: string) => {
  debugger;
  try {
    if(searchedText.indexOf('%') > -1)
    {
      return true;
    }
    else{
    const searchResult = data.some(item => item[labelKey]?.toLowerCase() === searchedText?.toLowerCase());
    return searchResult;
    }
  } catch {
    return false;;
  }
};
