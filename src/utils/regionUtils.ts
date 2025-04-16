import * as RNLocalize from 'react-native-localize';

let cachedRegion: string | null = null;

export const getDeviceRegion = (): string => {
  if (cachedRegion) {
    return cachedRegion;
  }
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    cachedRegion = locales[0].countryCode;
    return cachedRegion;
  }
  
  cachedRegion = "IND";
  return cachedRegion;
};

export const refreshRegion = (): void => {
  cachedRegion = null;
  getDeviceRegion();
};