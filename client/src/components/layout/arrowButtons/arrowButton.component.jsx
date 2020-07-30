import React from 'react'
import PropTypes from 'prop-types'

import './arrowButton.style.scss'

const ArrowButton = ({
  type,
  onClick,
  disabled = false,
  classNameWrapper = '',
  classNameButton = ''
}) => {
  return (
    <div className={classNameWrapper} onClick={onClick}>
      <button disabled={disabled} className={classNameButton}>
        <i className={`fas fa-arrow-${type}`}></i>
      </button>
    </div>
  )
}

ArrowButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default ArrowButton
