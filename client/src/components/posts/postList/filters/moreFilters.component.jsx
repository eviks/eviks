import React, { Fragment } from 'react'
import MinMaxFilter from './minMaxFilter.component'
import { setSrearchFilters, getPosts } from '../../../../actions/post'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { fadeInDown } from 'react-animations'
import PropTypes from 'prop-types'

import './filters.style.scss'

const FadeInDownAnimation = keyframes`${fadeInDown}`
const FadeInDownDiv = styled.div`
  animation: 0.5s ${FadeInDownAnimation};
`

const MoreFilters = ({
  filters,
  setSrearchFilters,
  getPosts,
  filterOnClick
}) => {
  const { estateType } = filters

  const filtersOnChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setSrearchFilters({
      [name]: type === 'number' ? parseInt(value === '' ? 0 : value, 10) : value
    })
  }

  return (
    <FadeInDownDiv>
      <div className="more-filters-popup">
        <div className="more-filters-container">
          <form className="more-filters-form">
            <div className="filter-group">
              {/* Sqm */}
              <MinMaxFilter
                title={'Square'}
                onChange={filtersOnChange}
                minInput={{ name: 'sqmMin', placeholder: 'Min' }}
                maxInput={{ name: 'sqmMax', placeholder: 'Max' }}
              />
              {/* Living sqm */}
              <MinMaxFilter
                title={'Living square'}
                onChange={filtersOnChange}
                minInput={{ name: 'livingSqmMin', placeholder: 'Min' }}
                maxInput={{ name: 'livingSqmMax', placeholder: 'Max' }}
              />
              {/* Kitchen sqm */}
              <MinMaxFilter
                title={'Kitchen square'}
                onChange={filtersOnChange}
                minInput={{ name: 'kitchenSqmMin', placeholder: 'Min' }}
                maxInput={{ name: 'kitchenSqmMax', placeholder: 'Max' }}
              />
            </div>
            <div className="filter-group">
              {estateType !== 'house' && (
                <Fragment>
                  {/* Floor */}
                  <MinMaxFilter
                    title={'Floor'}
                    onChange={filtersOnChange}
                    minInput={{ name: 'floorMin', placeholder: 'Min' }}
                    maxInput={{ name: 'floorMax', placeholder: 'Max' }}
                  />
                </Fragment>
              )}
              {/* Total floor */}
              <MinMaxFilter
                title={'Total floor'}
                onChange={filtersOnChange}
                minInput={{ name: 'totalFloorMin', placeholder: 'Min' }}
                maxInput={{ name: 'totalFloorMax', placeholder: 'Max' }}
              />
            </div>
          </form>
          <div className="filter-footer">
            <button
              className="btn btn-white btn-md"
              onClick={() => {
                filterOnClick()
                getPosts(filters)
              }}
            >
              Done
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
  setSrearchFilters: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setSrearchFilters, getPosts })(
  MoreFilters
)
