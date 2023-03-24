import CryptoJS from 'crypto-js';

export const encrypt = (data: object): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), 'password').toString();
};

export const decrypt = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, 'password');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const encryptSportfireToken = (text: string) => {
  // return CryptoJS.HmacSHA1(text).salt
  return CryptoJS.SHA1(encodeURI(text)).toString(CryptoJS.enc.Hex) + '|' + text;
};
