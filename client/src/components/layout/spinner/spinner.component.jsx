import React, { Fragment } from 'react'
import spinner from './spinner.svg'
import PropTypes from 'prop-types'

const Spinner = ({ style }) => {
  return (
    <Fragment>
      <img src={spinner} alt="Loading..." style={style} />
    </Fragment>
  )
}

Spinner.propTypes = {
  style: PropTypes.object.isRequired
}

export default Spinner
