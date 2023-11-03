import { createCanvas } from 'canvas';
import { useEffect, useRef } from 'react';
import { PATTERNS } from './Constants';

export const isEmpty = (obj: any) => {
  if (Array.isArray(obj)) return !(obj && obj.length > 0);
  if (typeof obj === typeof {})
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
  return true;
};

export const getWidthByText = (text: string, font: string) => {
  const canvas = createCanvas(0, 0);
  const context = canvas.getContext('2d');

  if (context) {
    context.font = font;
    return context.measureText(text).width;
  }

  return 0;
};

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const isEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const urlQueryParser = (searchString: string) => {
  if (!searchString) return {};
  const stringWithVariables = searchString.split('?')[1];
  const splittedVariables = stringWithVariables.includes('&')
    ? stringWithVariables.split('&')
    : null;
  const parsedUrlData = Object.assign({});
  if (!splittedVariables) {
    const splittedItemKey = stringWithVariables.slice(0, stringWithVariables.indexOf('='));
    const splittedItemValue = stringWithVariables.slice(stringWithVariables.indexOf('=') + 1);
    parsedUrlData[splittedItemKey] = splittedItemValue;
    return parsedUrlData;
  }
  splittedVariables.forEach(item => {
    const splittedItemKey = item.slice(0, item.indexOf('='));
    const splittedItemValue = item.slice(item.indexOf('=') + 1);
    parsedUrlData[splittedItemKey] = splittedItemValue;
  });
  return parsedUrlData;
};

export const urlSearchQueryStringify = (searchObject: any): string => {
  let queryString = '?';
  Object.keys(searchObject).forEach((key: string, index: number) => {
    queryString += (index === 0 ? '' : '&') + key + '=' + String(searchObject[key]);
  });
  return queryString;
};

export const getValidInteger = (numberString: string) => {
  const trimmedNumber = numberString.trim();
  if (!isNaN(Number(trimmedNumber))) {
    return trimmedNumber;
  } else {
    if (trimmedNumber[0] === '-') {
      return `-${trimmedNumber.replace(PATTERNS.AllowOnlyNumericInput, '')}`;
    } else {
      return trimmedNumber.replace(PATTERNS.AllowOnlyNumericInput, '');
    }
  }
};



export const getBradcrumbsUrl = (menus: any, label: any) => {
  const attrmenu = menus.filter((x: any) => x.key.includes(label));
  if (attrmenu.length > 0) {
    const submenu = attrmenu && attrmenu[0].submenus[0];
    const keyurl = submenu && submenu.key
    return keyurl;
  }
  return ''
}
