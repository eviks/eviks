import React from 'react'
import MinMaxFilter from '../minMaxFilter.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Square = ({ filtersOnChange, filtersOnBlur }) => {
  const [t] = useTranslation()

  return (
    <div className="filter-group">
      {/* Sqm */}
      <MinMaxFilter
        title={t('postList.filters.sqm')}
        onChange={filtersOnChange}
        onBlur={filtersOnBlur}
        minInput={{
          name: 'sqmMin',
          placeholder: t('postList.filters.min')
        }}
        maxInput={{
          name: 'sqmMax',
          placeholder: t('postList.filters.max')
        }}
      />
      {/* Living sqm */}
      <MinMaxFilter
        title={t('postList.filters.livingSqm')}
        onChange={filtersOnChange}
        onBlur={filtersOnBlur}
        minInput={{
          name: 'livingSqmMin',
          placeholder: t('postList.filters.min')
        }}
        maxInput={{
          name: 'livingSqmMax',
          placeholder: t('postList.filters.max')
        }}
      />
      {/* Kitchen sqm */}
      <MinMaxFilter
        title={t('postList.filters.kitchenSqm')}
        onChange={filtersOnChange}
        onBlur={filtersOnBlur}
        minInput={{
          name: 'kitchenSqmMin',
          placeholder: t('postList.filters.min')
        }}
        maxInput={{
          name: 'kitchenSqmMax',
          placeholder: t('postList.filters.max')
        }}
      />
    </div>
  )
}

Square.propTypes = {
  filtersOnChange: PropTypes.func.isRequired,
  filtersOnBlur: PropTypes.func.isRequired
}

export default Square
