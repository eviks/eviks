import { Settlement, MetroStation } from '../types';

export const removeAzerbaijaniChars = (value: string): string => {
  let newValue = value;
  newValue = newValue.replaceAll(/ç/gi, 'c');
  newValue = newValue.replaceAll(/ə/gi, 'e');
  newValue = newValue.replaceAll(/ğ/gi, 'g');
  newValue = newValue.replaceAll(/ı/gi, 'i');
  newValue = newValue.replaceAll(/ö/gi, 'o');
  newValue = newValue.replaceAll(/ş/gi, 's');
  newValue = newValue.replaceAll(/ü/gi, 'u');
  return newValue;
};

export const getMetroPresentation = (
  settlement: MetroStation,
  locale: string = 'az',
) => {
  if (locale === 'az') return settlement.name;
  if (locale === 'ru' && settlement.nameRu) return settlement.nameRu;
  if (locale === 'en' && settlement.nameEn) return settlement.nameEn;

  return settlement.name;
};

export const getSettlementPresentation = (
  settlement: Settlement,
  locale: string = 'az',
) => {
  if (locale === 'az') return settlement.name;
  if (locale === 'ru' && settlement.nameRu) return settlement.nameRu;
  if (locale === 'en' && settlement.nameEn) return settlement.nameEn;

  return settlement.name;
};

export function enumFromStringValue<T>(
  enm: { [s: string]: T },
  value: string,
): T | null {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? (value as unknown as T)
    : null;
}

export const formatter = new Intl.NumberFormat('de-DE', {
  // style: 'currency',
  // currency: 'AZN',
  // maximumFractionDigits: 0,
  // currencyDisplay: 'narrowSymbol',
});
