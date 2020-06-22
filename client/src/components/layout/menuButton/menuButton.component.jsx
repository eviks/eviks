import React from 'react'
import PropTypes from 'prop-types'

import './menuButton.style.scss'

const MenuButton = ({ onClick }) => {
  return (
    <div className="menu-toggle">
      <input type="checkbox" onClick={onClick} />
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

MenuButton.propTypes = {
  onClick: PropTypes.func
}

export default MenuButton
