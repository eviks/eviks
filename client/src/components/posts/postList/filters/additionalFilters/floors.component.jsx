import React, { Fragment } from 'react'
import MinMaxFilter from '../minMaxFilter.component'
import Checkbox from '../../../../layout/form/checkbox/checkbox.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Square = ({ filters, filtersOnChange }) => {
  const { estateType, notFirstFloor, notLastFloor } = filters

  const [t] = useTranslation()

  return (
    <div className="filter-group">
      {estateType !== 'house' && (
        <Fragment>
          {/* Floor */}
          <MinMaxFilter
            title={t('postList.filters.floor')}
            onChange={filtersOnChange}
            minInput={{
              name: 'floorMin',
              placeholder: t('postList.filters.min')
            }}
            maxInput={{
              name: 'floorMax',
              placeholder: t('postList.filters.max')
            }}
          />
        </Fragment>
      )}
      {/* Total floor */}
      <MinMaxFilter
        title={t('postList.filters.totalFloor')}
        onChange={filtersOnChange}
        minInput={{
          name: 'totalFloorMin',
          placeholder: t('postList.filters.min')
        }}
        maxInput={{
          name: 'totalFloorMax',
          placeholder: t('postList.filters.max')
        }}
      />
      {/* Checkboxes */}
      {estateType === 'apartment' && (
        <div className="filter-block">
          <Checkbox
            label={t('postList.filters.notFirstFloor')}
            showFieldName={true}
            options={{
              name: 'notFirstFloor',
              id: 'notFirstFloor',
              checked: notFirstFloor
            }}
            onChange={filtersOnChange}
          />
          <Checkbox
            label={t('postList.filters.notLastFloor')}
            showFieldName={true}
            options={{
              name: 'notLastFloor',
              id: 'notLastFloor',
              checked: notLastFloor
            }}
            onChange={filtersOnChange}
          />
        </div>
      )}
    </div>
  )
}

Square.propTypes = {
  filters: PropTypes.object.isRequired,
  filtersOnChange: PropTypes.func.isRequired
}

export default Square
