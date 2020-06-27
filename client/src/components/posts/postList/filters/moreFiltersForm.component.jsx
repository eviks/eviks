import React from 'react'
import { setSrearchFilters } from '../../../../actions/post'
import { connect } from 'react-redux'
import Square from './additionalFilters/square.component'
import Floors from './additionalFilters/floors.component'
import Documents from './additionalFilters/documents.component'
import PropTypes from 'prop-types'

const MoreFiltersForm = ({ filters, setSrearchFilters }) => {
  const filtersOnChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setSrearchFilters({
      [name]:
        typeof value === 'boolean'
          ? value
          : parseInt(value === '' ? 0 : value, 10)
    })
  }

  return (
    <form className="more-filters-form">
      <Square filtersOnChange={filtersOnChange} />
      <Floors filters={filters} filtersOnChange={filtersOnChange} />
      <Documents filters={filters} filtersOnChange={filtersOnChange} />
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
