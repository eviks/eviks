import React from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const PostDescription = ({ description }) => {
  const [t] = useTranslation()
  return (
    <div className="my-1">
      <h2>{t('post.desc.title')}</h2>
      <p>{description}</p>
    </div>
  )
}

PostDescription.propTypes = {
  description: PropTypes.string.isRequired,
}

export default PostDescription
