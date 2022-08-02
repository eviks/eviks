import getT from 'next-translate/getT';
import { DealType, EstateType, ApartmentType } from '../types';

export const getDealTypeFilterTitle = async (
  dealType: DealType,
  locale: string,
) => {
  const t = await getT(locale, 'filters');

  if (dealType === DealType.rent) return t('rent');
  if (dealType === DealType.rentPerDay) return t('rentPerDay');
  return t('buy');
};

export const getEstateTypeFilterTitle = async (
  estateType: EstateType,
  locale: string,
) => {
  const t = await getT(locale, 'post');

  return t(`${estateType}`);
};

export const getApartmentTypeFilterTitle = async (
  apartmentType: ApartmentType | undefined | null,
  locale: string,
) => {
  const t = await getT(locale, 'filters');
  if (apartmentType === ApartmentType.newBuilding) {
    return t(`newBuildings`);
  }
  if (apartmentType === ApartmentType.secondaryBuilding) {
    return t(`secondaryBuildings`);
  }
  return t(`allApartmentTypes`);
};

export const priceFormatter = async (
  num: number,
  locale: string,
  digits?: number,
) => {
  const t = await getT(locale, 'filters');

  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: t('thousand') },
    { value: 1e6, symbol: t('million') },
    { value: 1e9, symbol: t('billion') },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break;
    }
  }
  return `${(num / si[i].value).toFixed(digits).replace(rx, '$1')} ${
    si[i].symbol
  }`;
};

export const getPriceFilterTitle = async (
  priceMin: number,
  priceMax: number,
  locale: string,
) => {
  const t = await getT(locale, 'filters');

  if (priceMin && priceMax)
    return t('priceRange', {
      priceMin: await priceFormatter(priceMin, locale),
      priceMax: await priceFormatter(priceMax, locale),
    });
  if (priceMax)
    return t('priceUpTo', {
      priceMax: await priceFormatter(priceMax, locale),
    });
  if (priceMin)
    return t('priceFrom', {
      priceMin: await priceFormatter(priceMin, locale),
    });
  return t('price');
};

export const getRoomsFilterTitle = async (rooms: number[], locale: string) => {
  const t = await getT(locale, 'filters');

  if (rooms.length > 0) {
    return t(`room`, { rooms: rooms.join(',') });
  }
  return t('rooms');
};

export const getSqmFilterTitle = async (
  sqmMin: number,
  sqmMax: number,
  locale: string,
) => {
  const t = await getT(locale, 'filters');

  if (sqmMin && sqmMax)
    return t('sqmRange', {
      sqmMin,
      sqmMax,
    });
  if (sqmMax)
    return t('sqmUpTo', {
      sqmMax,
    });
  if (sqmMin)
    return t('sqmFrom', {
      sqmMin,
    });
  return t('sqm');
};

export const getLotSqmFilterTitle = async (
  lotSqmMin: number,
  lotSqmMax: number,
  locale: string,
) => {
  const t = await getT(locale, 'filters');

  if (lotSqmMin && lotSqmMax)
    return t('lotSqmRange', {
      lotSqmMin,
      lotSqmMax,
    });
  if (lotSqmMax)
    return t('lotSqmUpTo', {
      lotSqmMax,
    });
  if (lotSqmMin)
    return t('lotSqmFrom', {
      lotSqmMin,
    });
  return t('lotSqm');
};

export const getFloorFilterTitle = async (
  floorMin: number,
  floorMax: number,
  locale: string,
) => {
  const t = await getT(locale, 'filters');

  if (floorMin && floorMax)
    return t('floorRange', {
      floorMin,
      floorMax,
    });
  if (floorMax)
    return t('floorUpTo', {
      floorMax,
    });
  if (floorMin)
    return t('floorFrom', {
      floorMin,
    });
  return t('floor');
};
