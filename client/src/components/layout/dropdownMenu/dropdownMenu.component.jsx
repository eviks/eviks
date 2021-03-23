import React from 'react'
import PropTypes from 'prop-types'

import './dropdownMenu.style.scss'

const DropdownMenu = ({ menuOptions, label }) => {
  return (
    <div className="dropdown-menu">
      {label}
      <div className="dropdown-content light-shadow-border">
        {menuOptions.map((option, index) => (
          <div key={index} className="py-05 px-05">
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

DropdownMenu.propTypes = {
  menuOptions: PropTypes.array.isRequired,
  label: PropTypes.object.isRequired,
}

export default DropdownMenu
