import { priceFormatter } from '../../../../services/util'
import i18n from 'i18next'

export const getDealTypeFilterTitle = (dealType) => {
  return dealType
    ? i18n.t(`postList.dealTypes.${dealType}`)
    : i18n.t(`postList.dealTypes.sale`)
}

export const getPriceFilterTitle = (urlParameters) => {
  const { priceMin, priceMax } = urlParameters

  if (priceMin && priceMax)
    return i18n.t('postList.filters.priceRange', {
      priceMin: priceFormatter(priceMin),
      priceMax: priceFormatter(priceMax),
    })
  if (priceMax)
    return i18n.t('postList.filters.priceUpTo', {
      priceMax: priceFormatter(priceMax),
    })
  if (priceMin)
    return i18n.t('postList.filters.priceFrom', {
      priceMin: priceFormatter(priceMin),
    })
  return i18n.t('postList.filters.price')
}

export const getRoomsFilterTitle = (urlParameters) => {
  const { roomsMin, roomsMax } = urlParameters

  if (roomsMin && roomsMax)
    return i18n.t('postList.filters.roomsRange', { roomsMin, roomsMax })
  if (roomsMax) return i18n.t('postList.filters.roomsUpTo', { roomsMax })
  if (roomsMin) return i18n.t('postList.filters.roomsFrom', { roomsMin })
  return i18n.t('postList.filters.rooms')
}

export const estateTypeFilterTitle = (urlParameters) => {
  const { estateType, apartmentType } = urlParameters

  if (apartmentType) return i18n.t(`postList.estateTypes.${apartmentType}`)
  if (estateType) return i18n.t(`postList.estateTypes.${estateType}`)
  return i18n.t('postList.filters.estateType')
}
