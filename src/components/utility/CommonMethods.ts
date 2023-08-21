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
