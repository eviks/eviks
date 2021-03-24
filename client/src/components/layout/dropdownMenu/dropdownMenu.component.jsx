import React, { useRef } from 'react'
import useOutsideClick from '../../../services/hooks/useOutsideClick'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

import './dropdownMenu.style.scss'

const DropdownMenu = ({ isOpen, menuOptions, label, onRequestClose }) => {
  const wrapperRef = useRef(null)

  useOutsideClick([wrapperRef], onRequestClose)

  return (
    <div className="dropdown-menu" ref={wrapperRef}>
      {label}
      <CSSTransition
        in={isOpen}
        timeout={400}
        classNames="dropdown-transition-ease-in"
        unmountOnExit
      >
        <div className="dropdown-content light-shadow-border">
          {menuOptions.map((option, index) => (
            <div key={index} className="py-05 px-05">
              {option}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  )
}

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool,
  menuOptions: PropTypes.array.isRequired,
  label: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func.isRequired,
}

export default DropdownMenu
