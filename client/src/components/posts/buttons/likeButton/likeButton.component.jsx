import React, { Fragment, useState } from 'react'
import {
  addPostToFavorites,
  removePostFromFavorites,
} from '../../../../actions/user'
import { connect } from 'react-redux'
import Auth from '../../../auth/auth.component'
import { toastr } from 'react-redux-toastr'
import { Player } from '@lottiefiles/react-lottie-player'
import ReactModal from 'react-modal'
import { useTranslation } from 'react-i18next'
import heartAnimation from '../../../../assets/lottiefilesSources/heart.json'
import PropTypes from 'prop-types'

import './likeButton.style.scss'

const LikeButton = ({
  postId,
  isAuthenticated,
  user,
  addPostToFavorites,
  removePostFromFavorites,
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false)

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
      setShowAuthModal(true)
    }
  }

  const handleCloseModal = () => setShowAuthModal(false)

  return (
    <Fragment>
      <button
        className={`like-btn shadow-border like-btn-${
          favorites[postId] === true ? 'active' : 'disabled'
        }`}
        onClick={handleOnClick}
      >
        <i className={'fas fa-heart'}></i>
      </button>
      <ReactModal
        isOpen={showAuthModal}
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
