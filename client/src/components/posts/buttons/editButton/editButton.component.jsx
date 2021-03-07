import React from 'react'
import { baseUrl } from '../../../../App'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const EditButton = ({ postId, lg = false }) => {
  const [t] = useTranslation()

  return (
    <Link
      to={`${baseUrl}/edit_post/${postId}`}
      className={`post-btn${lg ? '-lg' : ''} shadow-border`}
    >
      <i className="fas fa-edit"></i>
      {lg && <span className="ml-05">{t('post.buttons.edit')}</span>}
    </Link>
  )
}

EditButton.propTypes = {
  postId: PropTypes.string.isRequired,
  lg: PropTypes.bool,
}

export default EditButton
