import React, { Fragment } from 'react'
import { setSrearchFilters } from '../../../../actions/post'
import { connect } from 'react-redux'
import MinMaxFilter from './minMaxFilter.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const MoreFiltersForm = ({ filters, setSrearchFilters }) => {
  const { estateType } = filters

  const filtersOnChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setSrearchFilters({
      [name]: parseInt(value === '' ? 0 : value, 10)
    })
  }

  const [t] = useTranslation()

  return (
    <form className="more-filters-form">
      <div className="filter-group">
        {/* Sqm */}
        <MinMaxFilter
          title={t('postList.filters.sqm')}
          onChange={filtersOnChange}
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
      </div>
    </form>
  )
}

MoreFiltersForm.propTypes = {
  filters: PropTypes.object.isRequired,
  setSrearchFilters: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  filters: state.post.filters
})

export default connect(mapStateToProps, { setSrearchFilters })(MoreFiltersForm)
