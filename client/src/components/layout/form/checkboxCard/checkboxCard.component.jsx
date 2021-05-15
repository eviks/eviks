import React from 'react'
import Ripple from '../../ripple/ripple.component'
import PropTypes from 'prop-types'

import './checkboxCard.style.scss'

const CheckboxCard = ({ label, options, onChange, icon: Icon }) => {
  return (
    <label
      htmlFor={options.id}
      className={`checkbox-card shadow-border ${
        options.checked ? 'checked' : ''
      }`}
    >
      <div className="mx-05">
        <Icon />
      </div>
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
  icon: PropTypes.elementType,
}

export default CheckboxCard
