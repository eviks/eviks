import React, { Fragment } from 'react'
import spinner from './button-spinner.svg'
import PropTypes from 'prop-types'

const ButtonSpinner = ({ style }) => {
  return (
    <Fragment>
      <img src={spinner} alt="Loading..." style={style} />
    </Fragment>
  )
}

ButtonSpinner.propTypes = {
  style: PropTypes.object.isRequired
}

export default ButtonSpinner
