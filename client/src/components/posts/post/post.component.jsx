import React, { useEffect } from 'react'
import ImageGallery from 'react-image-gallery'
import SideCard from './sideCard/sideCard.component'
import PostHead from './postHead/postHead.component'
import MainInfo from './mainInfo/MainInfo.component'
import PostFeatures from './postFeatures/postFeatures.component'
import BuildingInfo from './buildingInfo/buildingInfo.component'
import PostDescription from './postDescription/postDescription.component'
import PostSkeleton from './postSkeleton/postSkeleton.component'
import { connect } from 'react-redux'
import { getPost } from '../../../actions/post'
import PropTypes from 'prop-types'

import './post.style.scss'
import './gallery.style.scss'

const Post = ({ post: { post }, getPost, loading, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])

  const getPostPhotos = () => {
    return post.photos.map(photo => ({
      original: photo.img,
      thumbnail: photo.thumb
    }))
  }

  return loading || post == null ? (
    <PostSkeleton />
  ) : (
    <div className="post-wrapper">
      <div className="post-container light-border">
        <PostHead post={post} />
        <ImageGallery
          items={getPostPhotos()}
          showIndex={true}
          showPlayButton={false}
          useTranslate3D={false}
          slideOnThumbnailOver={true}
        />
        <div className="px-2">
          <MainInfo post={post} />
          <PostDescription description={post.description} />
          <PostFeatures post={post} />
          <BuildingInfo post={post} />
        </div>
      </div>
      <SideCard post={post} />
    </div>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  post: state.post,
  loading: state.async.loading
})

export default connect(mapStateToProps, { getPost })(Post)
