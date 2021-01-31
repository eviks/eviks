import React from 'react'
import { deletePost } from '../../../../actions/post'
import { connect } from 'react-redux'
import { Player } from '@lottiefiles/react-lottie-player'
import DeleteMessage from './deleteMessage/deleteMessage.component'
import { toastr } from 'react-redux-toastr'
import { useTranslation } from 'react-i18next'
import trashAnimation from '../../../../assets/lottiefilesSources/trash.json'
import PropTypes from 'prop-types'

import './deleteButton.style.scss'

const DeleteButton = ({ postId, deletePost }) => {
  const [t] = useTranslation()

  const handleOnClick = async () => {
    const toastrConfirmOptions = {
      onOk: () => onDeleteConfirm(),
      okText: t('postList.buttons.delete.okText'),
      cancelText: t('postList.buttons.delete.cancelText'),
      component: DeleteMessage,
    }
    toastr.confirm(null, toastrConfirmOptions)
  }

  const onDeleteConfirm = async () => {
    try {
      const result = await deletePost(postId)
      if (result) {
        toastr.light(
          t('postList.buttons.delete.toastrTitle'),
          t('postList.buttons.delete.toastrText'),
          {
            status: 'info',
            icon: (
              <Player
                autoplay
                loop={false}
                src={trashAnimation}
                style={{ height: '70px', width: '70px' }}
              />
            ),
          }
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button className="delete-btn shadow-border" onClick={handleOnClick}>
      <i className="fas fa-trash"></i>
    </button>
  )
}

DeleteButton.propTypes = {
  postId: PropTypes.string.isRequired,
}

export default connect(null, { deletePost })(DeleteButton)
