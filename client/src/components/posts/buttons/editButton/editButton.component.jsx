import React from 'react'
import { baseUrl } from '../../../../App'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './editButton.style.scss'

const EditButton = ({ postId }) => {
  return (
    <Link
      to={`${baseUrl}/edit_post/${postId}`}
      className="edit-btn shadow-border"
    >
      <i className="fas fa-edit"></i>
    </Link>
  )
}

EditButton.propTypes = {
  postId: PropTypes.string.isRequired,
}

export default EditButton
