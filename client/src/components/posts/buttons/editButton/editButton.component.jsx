import React from 'react'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '../../../../components/localization/LocalizedLink.component'
import { SvgPencil } from '../../../layout/icons'
import PropTypes from 'prop-types'

const EditButton = ({ postId, lg = false }) => {
  const [t] = useTranslation()

  return (
    <LocalizedLink
      to={`/edit_post/${postId}`}
      className={`post-btn${lg ? '-lg' : ''} shadow-border`}
    >
      <SvgPencil />
      {lg && <span className="ml-05">{t('post.buttons.edit')}</span>}
    </LocalizedLink>
  )
}

EditButton.propTypes = {
  postId: PropTypes.number.isRequired,
  lg: PropTypes.bool,
}

export default EditButton
