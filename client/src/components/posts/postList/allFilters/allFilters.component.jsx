import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { setSrearchFilters } from '../../../../actions/post'
import PriceFilter from '../filters/priceFilter.component'
import RoomFilter from '../filters/roomFilter.component'
import EstateTypeFilter from '../filters/estateTypeFilter.component'
import MoreFiltersForm from '../filters/moreFiltersForm.component'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useIsMount from '../../../../services/hooks/useIsMount'
import PropTypes from 'prop-types'

import './allFilters.style.scss'

const AllFilters = ({ filters, setSrearchFilters, toggleAllFilters }) => {
  const allFiltersRef = useRef(null)

  const [prevFilters, setPrevFilters] = useState(null)

  const isMounted = useIsMount()
  if (isMounted) if (prevFilters == null) setPrevFilters(filters)

  useEffect(() => {
    let currentRef
    if (allFiltersRef) currentRef = allFiltersRef.current
    if (currentRef) {
      disableBodyScroll(currentRef)
    }
    return () => enableBodyScroll(currentRef)
  })

  const closeFilters = () => {
    setSrearchFilters(prevFilters)
    toggleAllFilters(false)
  }

  return (
    <div className="all-filters-wrapper">
      <div className="all-filters" ref={allFiltersRef}>
        <button className="x-large close-btn" onClick={closeFilters}>
          <i className="fas fa-times"></i>
        </button>
        <PriceFilter />
        <RoomFilter />
        <EstateTypeFilter />
        <MoreFiltersForm />
      </div>
    </div>
  )
}

AllFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  setSrearchFilters: PropTypes.func.isRequired,
  toggleAllFilters: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  filters: state.post.posts.filters,
})

export default connect(mapStateToProps, { setSrearchFilters })(AllFilters)
