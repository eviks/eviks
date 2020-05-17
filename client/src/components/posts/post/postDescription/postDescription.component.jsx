import React from 'react'
import PropTypes from 'prop-types'

const PostDescription = ({ description }) => {
  return (
    <div className="my-1">
      <h2>Описание</h2>
      <p>{description}</p>
    </div>
  )
}

PostDescription.propTypes = {
  description: PropTypes.string.isRequired
}

export default PostDescription
