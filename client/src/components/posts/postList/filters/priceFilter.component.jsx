import React from 'react'
import { setSrearchFilters, getPosts } from '../../../../actions/post'
import { connect } from 'react-redux'
import Input from '../../../layout/form/input/input.component'

import './filters.style.scss'

const PriceFilter = ({ filters, setSrearchFilters, getPosts }) => {
  const { maxPrice, minPrice } = filters

  const filtersOnChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setSrearchFilters({
      [name]: type === 'number' ? parseInt(value === '' ? 0 : value, 10) : value
    })
  }

  const filtersOnBlur = () => {
    getPosts(filters)
  }

  return (
    <form>
      <h4 style={styles.title}>Price</h4>
      <div className="row-group">
        <Input
          required={false}
          options={{
            type: 'number',
            name: 'minPrice',
            value: minPrice === 0 ? '' : minPrice,
            min: '0',
            placeholder: 'Min',
            style: styles.input
          }}
          onChange={filtersOnChange}
          onBlur={filtersOnBlur}
        />
        {'-'}
        <Input
          required={false}
          options={{
            type: 'number',
            name: 'maxPrice',
            value: maxPrice === 0 ? '' : maxPrice,
            min: '0',
            placeholder: 'Max',
            style: styles.input
          }}
          onChange={filtersOnChange}
          onBlur={filtersOnBlur}
        />
      </div>
    </form>
  )
}

const styles = {
  title: { marginLeft: '0.8rem', marginBottom: '1rem' },
  input: { width: '120px', marginLeft: '0.7rem', marginRight: '0.7rem' }
}

const mapStateToProps = state => ({
  filters: state.post.filters
})

export default connect(mapStateToProps, { setSrearchFilters, getPosts })(
  PriceFilter
)
