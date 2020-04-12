import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Searchbar from './searchbar/searchbar.component'
import PostItemSkeleton from '../postItemSkeleton/postItemSkeleton.component'
import PostItem from '../postItem/postItem.component'
import { getPosts } from '../../../actions/post'
import PropTypes from 'prop-types'

import './posts.style.scss'

const Posts = ({ post: { posts }, loading, getPosts, navRef }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  const getSkeletonItems = () => {
    return (
      <Fragment>
        <PostItemSkeleton />
        <PostItemSkeleton />
        <PostItemSkeleton />
        <PostItemSkeleton />
        <PostItemSkeleton />
        <PostItemSkeleton />
      </Fragment>
    )
  }

  return (
    <div>
      <Searchbar navRef={navRef} />
      <div className="cards-container">
        {loading
          ? getSkeletonItems()
          : posts.map(post => <PostItem key={post._id} post={post} />)}
      </div>
    </div>
  )
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  post: state.post,
  loading: state.async.loading
})

export default connect(mapStateToProps, { getPosts })(Posts)
