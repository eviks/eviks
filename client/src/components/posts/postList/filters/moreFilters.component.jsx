import React, { Fragment } from 'react'
import MinMaxFilter from './minMaxFilter.component'
import { setSrearchFilters } from '../../../../actions/post'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { fadeInDown } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './filters.style.scss'

const FadeInDownAnimation = keyframes`${fadeInDown}`
const FadeInDownDiv = styled.div`
  animation: 0.5s ${FadeInDownAnimation};
`

const MoreFilters = ({ filters, setSrearchFilters, filterOnClick }) => {
  const { estateType } = filters

  const filtersOnChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setSrearchFilters({
      [name]: type === 'number' ? parseInt(value === '' ? 0 : value, 10) : value
    })
  }

  const [t] = useTranslation()

  return (
    <FadeInDownDiv>
      <div className="more-filters-popup">
        <div className="more-filters-container">
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
          <div className="filter-footer">
            <button
              className="btn btn-white btn-md"
              onClick={() => {
                filterOnClick()
              }}
            >
              {t('postList.filters.doneButton')}
            </button>
          </div>
        </div>
      </div>
      <button
        className="close-modal"
        style={{ top: '-3%', right: '-5%' }}
        onClick={() => filterOnClick()}
      >
        <i className="fas fa-times"></i>
      </button>
    </FadeInDownDiv>
  )
}

const mapStateToProps = state => ({
  filters: state.post.filters
})

MoreFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  setSrearchFilters: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setSrearchFilters })(MoreFilters)
