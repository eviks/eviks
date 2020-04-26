import React, { useState } from 'react'
import { setSrearchFilters, getPosts } from '../../../../actions/post'
import { connect } from 'react-redux'
import Input from '../../../layout/form/input/input.component'
import PropTypes from 'prop-types'

import './filters.style.scss'

const PriceFilter = ({ filters, setSrearchFilters, getPosts }) => {
  const { priceMax, priceMin } = filters
  const [prevVal, setPrevVal] = useState(null)

  const filtersOnChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setSrearchFilters({
      [name]: type === 'number' ? parseInt(value === '' ? 0 : value, 10) : value
    })
  }

  const filtersOnBlur = e => {
    if (e.target.value !== prevVal) {
      getPosts(filters)
    }
  }

  const filtersOnFocus = e => {
    setPrevVal(e.target.value)
  }

  return (
    <form>
      <h4 className="filter-title">Price</h4>
      <div className="row-group">
        <Input
          required={false}
          options={{
            type: 'number',
            name: 'priceMin',
            value: priceMin === 0 ? '' : priceMin,
            min: '0',
            placeholder: 'Min',
            style: { width: '120px' }
          }}
          onChange={filtersOnChange}
          onBlur={filtersOnBlur}
          onFocus={filtersOnFocus}
        />
        <span className="input-separator">-</span>
        <Input
          required={false}
          options={{
            type: 'number',
            name: 'priceMax',
            value: priceMax === 0 ? '' : priceMax,
            min: '0',
            placeholder: 'Max',
            style: { width: '120px' }
          }}
          onChange={filtersOnChange}
          onBlur={filtersOnBlur}
          onFocus={filtersOnFocus}
        />
      </div>
    </form>
  )
}

const mapStateToProps = state => ({
  filters: state.post.filters
})

PriceFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setSrearchFilters: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setSrearchFilters, getPosts })(
  PriceFilter
)
