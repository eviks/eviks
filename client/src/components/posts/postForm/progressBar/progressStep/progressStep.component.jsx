import React from 'react'
import PropTypes from 'prop-types'

import './progressStep.style.scss'

const ProgressStep = ({ iconClass, stepClass }) => {
  return (
    <div className={`progress-step ${stepClass}`}>
      <div className="circle">
        <div className="progress-icon">
          <i className={iconClass}></i>
        </div>
      </div>
    </div>
  )
}

ProgressStep.propTypes = {
  iconClass: PropTypes.string.isRequired,
  stepClass: PropTypes.string.isRequired
}

export default ProgressStep
