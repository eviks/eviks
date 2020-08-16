import React from 'react'
import { connect } from 'react-redux'
import { getRegions } from '../../../actions/region'
import PropTypes from 'prop-types'

const Region = ({ region, getRegions }) => {
  return (
    <button className="link" onClick={() => getRegions({ ID: region.ID })}>
      {region.Name}
    </button>
  )
}

Region.propTypes = {
  region: PropTypes.object.isRequired,
  getRegions: PropTypes.func.isRequired
}

export default connect(null, { getRegions })(Region)
