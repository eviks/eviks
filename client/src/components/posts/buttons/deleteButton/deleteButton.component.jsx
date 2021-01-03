import React, { Fragment } from 'react'
import { deletePost } from '../../../../actions/user'
import { connect } from 'react-redux'
import { Player } from '@lottiefiles/react-lottie-player'
import { toastr } from 'react-redux-toastr'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './deleteButton.style.scss'

const DeleteButton = ({ postId, deletePost }) => {
  const [t] = useTranslation()

  const handleOnClick = async () => {
    // const result = await deletePost(postId)

    // if (result.success) {
    if (true) {
      toastr.light(
        t('postList.buttons.delete.toastrTitle'),
        t('postList.buttons.delete.toastrText'),
        {
          status: 'info',
          icon: (
            <Player
              autoplay
              loop={false}
              src="https://assets3.lottiefiles.com/packages/lf20_WcyRdM.json"
              style={{ height: '70px', width: '70px' }}
            />
          ),
        }
      )
    }
  }

  return (
    <Fragment>
      <button className="delete-btn " onClick={handleOnClick}>
        <i className="fas fa-trash shadow-border delete-btn-icon"></i>
      </button>
    </Fragment>
  )
}

DeleteButton.propTypes = {
  postId: PropTypes.string.isRequired,
}

export default connect(null, { deletePost })(DeleteButton)
