import React from 'react'
import PropTypes from 'prop-types'

import './arrowButton.style.scss'

const ArrowButton = ({
  icon: Icon,
  onClick,
  disabled = false,
  classNameWrapper = '',
  classNameButton = '',
}) => {
  return (
    <div className={classNameWrapper} onClick={onClick}>
      <button disabled={disabled} className={classNameButton}>
        <Icon />
      </button>
    </div>
  )
}

ArrowButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default ArrowButton
