import React, { Fragment } from 'react'
import spinner from './button-spinner.svg'
import primarySpinner from './button-spinner-pm.svg'
import PropTypes from 'prop-types'

const ButtonSpinner = ({ style, primary = false }) => {
  return (
    <Fragment>
      <img
        src={primary ? primarySpinner : spinner}
        alt="Loading..."
        style={style}
      />
    </Fragment>
  )
}

ButtonSpinner.defaultProps = {
  style: {
    position: 'absolute',
    width: '20px'
  }
}

ButtonSpinner.propTypes = {
  style: PropTypes.object.isRequired,
  primary: PropTypes.bool
}

export default ButtonSpinner
