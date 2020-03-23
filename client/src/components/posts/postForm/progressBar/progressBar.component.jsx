import React from 'react'
import ProgressStep from './progressStep/progressStep.component'
import PropTypes from 'prop-types'

import './progressBar.style.scss'

const ProgressBar = ({ step: { currentStep } }) => {
  return (
    <div className="progress-bar">
      <ProgressStep
        iconClass={'fas fa-info'}
        stepClass={
          currentStep === 0 ? 'current' : currentStep < 0 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        iconClass={'fas fa-map-marked-alt'}
        stepClass={
          currentStep === 1 ? 'current' : currentStep < 1 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        iconClass={'fas fa-home'}
        stepClass={
          currentStep === 2 ? 'current' : currentStep < 2 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        iconClass={'fas fa-building'}
        stepClass={
          currentStep === 3 ? 'current' : currentStep < 3 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        iconClass={'fas fa-plus'}
        stepClass={
          currentStep === 4 ? 'current' : currentStep < 4 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        iconClass={'fas fa-money-bill-alt'}
        stepClass={
          currentStep === 5 ? 'current' : currentStep < 6 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        iconClass={'fas fa-camera'}
        stepClass={
          currentStep === 6 ? 'current' : currentStep < 7 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        iconClass={'fas fa-phone'}
        stepClass={
          currentStep === 7 ? 'current' : currentStep < 8 ? 'next' : 'previous'
        }
      />
    </div>
  )
}

ProgressBar.propTypes = {
  step: PropTypes.object.isRequired
}

export default ProgressBar
