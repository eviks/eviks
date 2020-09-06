import React from 'react'
import { connect } from 'react-redux'
import { getRegions, setCurrentRegion } from '../../../actions/region'
import PropTypes from 'prop-types'

const Region = ({
  region,
  getRegions,
  setCurrentRegion,
  handleCloseModal,
  citySelectMode = false
}) => {
  const handleOnClick = () => {
    if (citySelectMode) {
      setCurrentRegion({
        nextQuestionDate: new Date(Date.now() + 86400000 * 365),
        city: {
          id: region.id,
          name: region.name,
          routeName: region.routeName,
          location: [region.x, region.y]
        }
      })
      handleCloseModal()
    } else {
      getRegions({ id: region.id })
    }
  }

  return (
    <button className="link" onClick={() => handleOnClick()}>
      {region.name}
    </button>
  )
}

Region.propTypes = {
  region: PropTypes.object.isRequired,
  getRegions: PropTypes.func.isRequired,
  setCurrentRegion: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  citySelectMode: PropTypes.bool
}

export default connect(null, { getRegions, setCurrentRegion })(Region)
