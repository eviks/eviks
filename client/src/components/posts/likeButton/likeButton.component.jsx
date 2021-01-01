import React, { Fragment, useState } from 'react'
import {
  addPostToFavorites,
  removePostFromFavorites
} from '../../../actions/auth'
import { connect } from 'react-redux'
import Auth from '../../auth/auth.component'
import { toastr } from 'react-redux-toastr'
import FavoriteIcon from '../../layout/icons/favoriteIcon.component'
import ReactModal from 'react-modal'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './likeButton.style.scss'

const LikeButton = ({
  postId,
  isAuthenticated,
  user,
  addPostToFavorites,
  removePostFromFavorites
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
            t('auth.favorites.toastrTitle'),
            t('auth.favorites.toastrText', {
              numberOfPosts: result.numberOfPosts
            }),
            { status: 'info', icon: <FavoriteIcon /> }
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
      <button className="like-btn" onClick={handleOnClick}>
        <i
          className={`fas fa-heart shadow-border like-btn-icon like-btn-${
            favorites[postId] === true ? 'active' : 'disabled'
          }`}
        ></i>
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
  user: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {
  addPostToFavorites,
  removePostFromFavorites
})(LikeButton)
