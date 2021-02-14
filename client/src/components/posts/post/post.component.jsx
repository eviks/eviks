import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'
import SideCard from './sideCard/sideCard.component'
import PostHead from './postHead/postHead.component'
import MainInfo from './mainInfo/mainInfo.component'
import PostFeatures from './postFeatures/postFeatures.component'
import BuildingInfo from './buildingInfo/buildingInfo.component'
import PostDescription from './postDescription/postDescription.component'
import Location from './location/location.component'
import SkeletonPost from '../../layout/skeleton/skeletonPost/skeletonPost.component'
import { connect } from 'react-redux'
import { getPost } from '../../../actions/post'
import {
  renderLeftNav,
  renderRightNav,
} from '../../layout/arrowButtons/galleryButtons.component'
import PropTypes from 'prop-types'

import './post.style.scss'
import './gallery.style.scss'

const Post = ({
  auth: { user, isAuthenticated },
  post: { post },
  getPost,
  loading,
  match,
}) => {
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    getPost(match.params.id)
    setInitialLoading(false)
  }, [getPost, match.params.id])

  const getPostImages = () => {
    return post.images.map((id) => ({
      original: `/uploads/post_images/${id}/image_640.png`,
      thumbnail: `/uploads/post_images/${id}/image_160.png`,
    }))
  }

  return loading || initialLoading || post == null ? (
    <SkeletonPost />
  ) : (
    <div className="container">
      <PostHead post={post} />
      <ImageGallery
        items={getPostImages()}
        showBullets={true}
        showPlayButton={false}
        useTranslate3D={false}
        slideOnThumbnailOver={true}
        lazyLoad={true}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
      />
      <div className="post-content my-1">
        <div>
          <MainInfo post={post} />
          <PostDescription description={post.description} />
          <PostFeatures post={post} />
          <BuildingInfo post={post} />
        </div>
        <SideCard post={post} />
      </div>
      <Location location={post.location} />
    </div>
  )
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  loading: state.async.loading,
})

export default connect(mapStateToProps, { getPost })(Post)
