import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateURLParams } from '../../../../../actions/post'
import LocalitiesFilter from './localitiesFilter/localitiesFilter.component'
import Ripple from '../../../../layout/ripple/ripple.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './locationsFilter.style.scss'

const LocationsFilter = ({
  cityName,
  locationIds,
  updateURLParams,
  closeFilter
}) => {
  const [selectedLocalities, setSelectedLocalities] = useState(
    locationIds.split(',')
  )
  const [t] = useTranslation()
  const history = useHistory()

  const showResultOnClick = () => {
    updateURLParams({ locationIds: selectedLocalities.join(',') }, history)
    closeFilter()
  }

  return (
    <div className="locations-filter-wrapper">
      <div className="locations-filter-header">
        <div>
          <span className="text-bold">{cityName}</span>
        </div>
        <button className="close-modal" onClick={closeFilter}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <LocalitiesFilter
        selectedLocalities={selectedLocalities}
        setSelectedLocalities={setSelectedLocalities}
      />
      <div className="locations-filter-buttons">
        <button className="btn btn-primary" onClick={showResultOnClick}>
          {t('postList.showResult')}
          <Ripple />
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cityName: state.locality.currentLocality.city.name,
  locationIds: state.post.posts.filters.locationIds
})

LocationsFilter.propTypes = {
  cityName: PropTypes.string.isRequired,
  locationIds: PropTypes.string.isRequired,
  updateURLParams: PropTypes.func.isRequired,
  closeFilter: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { updateURLParams })(LocationsFilter)
