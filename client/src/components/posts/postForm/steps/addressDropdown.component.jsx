import React, { Fragment } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

import '../postForm.style.scss'

const FadeInAnimation = keyframes`{
   0% {
      opacity: 0;
      transform: translateY(-20px);
   }
   100% {
      opacity: 1;
      transform: translateY(0);
   }
}`

const FadeInUl = styled.ul`
  animation: 0.5s ${FadeInAnimation};
`

const DropdownItem = ({ listItem: { addr, x, y }, updatePlacemark }) => {
  return (
    <li
      className="dropdown-address-item"
      onClick={() => updatePlacemark([x, y], true)}
    >
      {addr}
    </li>
  )
}

const AddressDropdown = ({ list, updatePlacemark }) => {
  return (
    <Fragment>
      {list.length > 0 && (
        <FadeInUl className="dropdown-address">
          {list.map((listItem, index) => (
            <DropdownItem
              key={index}
              listItem={listItem}
              updatePlacemark={updatePlacemark}
            />
          ))}
        </FadeInUl>
      )}
    </Fragment>
  )
}

AddressDropdown.propTypes = {
  list: PropTypes.array.isRequired,
  updatePlacemark: PropTypes.func.isRequired
}

export default AddressDropdown
