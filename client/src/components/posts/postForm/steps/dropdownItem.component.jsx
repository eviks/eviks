import React from 'react'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
import PropTypes from 'prop-types'

const DropdownItem = ({
  listItem: { addr, x, y },
  updatePostFormAttributes
}) => {
  return (
    <li
      className="dropdown-address-item"
      onClick={() =>
        updatePostFormAttributes({ location: [x, y], address: addr })
      }
    >
      {addr}
    </li>
  )
}

DropdownItem.propTypes = {
  listItem: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired
}

export default connect(null, { updatePostFormAttributes })(DropdownItem)
