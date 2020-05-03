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
    const { name, value } = e.target
    const numericValue = value.replace(/\s/g, '').replace(/AZN/g, '')
    setSrearchFilters({
      [name]: parseInt(numericValue === '' ? 0 : numericValue, 10)
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
            type: 'text',
            name: 'priceMin',
            value: priceMin === 0 ? '' : priceMin,
            placeholder: 'Min',
            style: { width: '120px' }
          }}
          currency={true}
          onChange={filtersOnChange}
          onBlur={filtersOnBlur}
          onFocus={filtersOnFocus}
        />
        <span className="input-separator">-</span>
        <Input
          required={false}
          options={{
            type: 'text',
            name: 'priceMax',
            value: priceMax === 0 ? '' : priceMax,
            placeholder: 'Max',
            style: { width: '120px' }
          }}
          currency={true}
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
