import React from 'react'
import { useHistory } from 'react-router-dom'
import { updateURLParams } from '../../../../actions/post'
import { connect } from 'react-redux'
import Square from './additionalFilters/square.component'
import Floors from './additionalFilters/floors.component'
import Documents from './additionalFilters/documents.component'
import PropTypes from 'prop-types'

const MoreFiltersForm = ({ filters, updateURLParams }) => {
  const history = useHistory()

  const filtersOnChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    updateURLParams(
      {
        [name]:
          typeof value === 'boolean'
            ? value
            : parseInt(value === '' ? 0 : value, 10)
      },
      history
    )
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
  updateURLParams: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  filters: state.post.posts.filters
})

export default connect(mapStateToProps, { updateURLParams })(MoreFiltersForm)
