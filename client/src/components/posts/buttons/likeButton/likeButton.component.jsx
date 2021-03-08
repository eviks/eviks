import React, { Fragment, useState } from 'react'
import {
  addPostToFavorites,
  removePostFromFavorites,
} from '../../../../actions/auth'
import { connect } from 'react-redux'
import Auth from '../../../auth/auth.component'
import { toastr } from 'react-redux-toastr'
import ReactModal from 'react-modal'
import { useTranslation } from 'react-i18next'
import { Player } from '@lottiefiles/react-lottie-player'
import heartAnimation from '../../../../assets/lottiefilesSources/heart.json'
import PropTypes from 'prop-types'

import './likeButton.style.scss'

const LikeButton = ({
  postId,
  lg = false,
  isAuthenticated,
  user,
  addPostToFavorites,
  removePostFromFavorites,
}) => {
  const [showModal, setShowModal] = useState(false)

  const favorites =
    isAuthenticated && user && user.favorites ? user.favorites : {}

  const [t] = useTranslation()

  const handleOnClick = async () => {
    if (isAuthenticated) {
      if (favorites[postId] === true) {
        removePostFromFavorites(postId)
      } else {
        const result = await addPostToFavorites(postId)

        if (result.success) {
          toastr.light(
            t('postList.buttons.like.toastrTitle'),
            t('postList.buttons.like.toastrText', {
              numberOfPosts: result.numberOfPosts,
            }),
            {
              status: 'info',
              icon: (
                <Player
                  autoplay
                  loop={false}
                  src={heartAnimation}
                  style={{ height: '70px', width: '70px' }}
                />
              ),
            }
          )
        }
      }
    } else {
      setShowModal(true)
    }
  }

  const handleCloseModal = () => setShowModal(false)

  return (
    <Fragment>
      <button
        className={`post-btn${
          lg ? '-lg' : ''
        } like-btn shadow-border like-btn-${
          favorites[postId] === true ? 'active' : 'disabled'
        }`}
        onClick={handleOnClick}
      >
        <i className={'fas fa-heart'}></i>
        {lg && <span className="ml-05">{t('post.buttons.like')}</span>}
      </button>
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <Auth handleCloseModal={handleCloseModal} showOverlay={true} />
      </ReactModal>
    </Fragment>
  )
}

LikeButton.propTypes = {
  postId: PropTypes.string.isRequired,
  lg: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, {
  addPostToFavorites,
  removePostFromFavorites,
})(LikeButton)
