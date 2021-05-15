import React from 'react'
import PropTypes from 'prop-types'

import './progressStep.style.scss'

const ProgressStep = ({ icon: Icon, stepClass }) => {
  return (
    <div className={`progress-step ${stepClass}`}>
      <div className="circle">
        <div className="progress-icon">
          <Icon />
        </div>
      </div>
    </div>
  )
}

ProgressStep.propTypes = {
  icon: PropTypes.elementType.isRequired,
  stepClass: PropTypes.string.isRequired,
}

export default ProgressStep
