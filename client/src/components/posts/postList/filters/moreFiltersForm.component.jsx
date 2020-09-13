import React from 'react'
import { useHistory } from 'react-router-dom'
import { setSrearchFilters, updateURLParams } from '../../../../actions/post'
import { connect } from 'react-redux'
import Square from './additionalFilters/square.component'
import Floors from './additionalFilters/floors.component'
import Documents from './additionalFilters/documents.component'
import PropTypes from 'prop-types'

const MoreFiltersForm = ({ filters, setSrearchFilters, updateURLParams }) => {
  const history = useHistory()

  const filtersOnChange = event => {
    const { name, value } = event.target

    const numericValue = value.replace(/\s/g, '').replace(/AZN/g, '')
    setSrearchFilters({
      [name]: parseInt(numericValue === '' ? 0 : numericValue, 10)
    })
  }

  const filtersOnBlur = event => {
    updateURLParams({}, history)
  }

  const checkboxOnChange = event => {
    const { name, checked } = event.target
    updateURLParams({ [name]: checked }, history)
  }

  return (
    <form className="more-filters-form">
      <Square filtersOnChange={filtersOnChange} filtersOnBlur={filtersOnBlur} />
      <Floors
        filters={filters}
        filtersOnChange={filtersOnChange}
        filtersOnBlur={filtersOnBlur}
        checkboxOnChange={checkboxOnChange}
      />
      <Documents
        filters={filters}
        filtersOnChange={filtersOnChange}
        checkboxOnChange={checkboxOnChange}
      />
    </form>
  )
}

MoreFiltersForm.propTypes = {
  filters: PropTypes.object.isRequired,
  setSrearchFilters: PropTypes.func.isRequired,
  updateURLParams: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  filters: state.post.posts.filters
})

export default connect(mapStateToProps, { setSrearchFilters, updateURLParams })(
  MoreFiltersForm
)
