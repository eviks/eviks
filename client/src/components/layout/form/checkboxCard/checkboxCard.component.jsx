import React from 'react'
import Ripple from '../../ripple/ripple.component'
import PropTypes from 'prop-types'

import './checkboxCard.style.scss'

const CheckboxCard = ({ label, options, onChange, iconClass }) => {
  return (
    <label
      htmlFor={options.id}
      className={`checkbox-card shadow-border ${
        options.checked ? 'checked' : ''
      }`}
    >
      <i className={iconClass}></i>
      <input {...options} type="checkbox" onChange={onChange} />
      {label}
      <Ripple />
    </label>
  )
}

CheckboxCard.propTypes = {
  label: PropTypes.string,
  options: PropTypes.object,
  onChange: PropTypes.func,
  iconClass: PropTypes.string
}

export default CheckboxCard
