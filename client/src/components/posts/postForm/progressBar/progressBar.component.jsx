import React from 'react'
import { connect } from 'react-redux'
import ProgressStep from './progressStep/progressStep.component'
import {
  SvgInformation,
  SvgLocation,
  SvgHouse,
  SvgApartment,
  SvgPlus,
  SvgCamera,
  SvgWallet,
  SvgHandPhone,
} from '../../../layout/icons'
import PropTypes from 'prop-types'

import './progressBar.style.scss'

const ProgressBar = ({ formSteps: { currentStep } }) => {
  return (
    <div className="progress-bar">
      <ProgressStep
        icon={SvgInformation}
        stepClass={
          currentStep === 0 ? 'current' : currentStep < 0 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        icon={SvgLocation}
        stepClass={
          currentStep === 1 ? 'current' : currentStep < 1 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        icon={SvgHouse}
        stepClass={
          currentStep === 2 ? 'current' : currentStep < 2 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        icon={SvgApartment}
        stepClass={
          currentStep === 3 ? 'current' : currentStep < 3 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        icon={SvgPlus}
        stepClass={
          currentStep === 4 ? 'current' : currentStep < 4 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        icon={SvgCamera}
        stepClass={
          currentStep === 5 ? 'current' : currentStep < 6 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        icon={SvgWallet}
        stepClass={
          currentStep === 6 ? 'current' : currentStep < 7 ? 'next' : 'previous'
        }
      />
      <ProgressStep
        icon={SvgHandPhone}
        stepClass={
          currentStep === 7 ? 'current' : currentStep < 8 ? 'next' : 'previous'
        }
      />
    </div>
  )
}

ProgressBar.propTypes = {
  formSteps: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  formSteps: state.post.formSteps,
})

export default connect(mapStateToProps)(ProgressBar)
