import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Searchbar from './searchbar/searchbar.component'
import Pagination from '../../layout/pagination/pagination.component'
import PostItemSkeleton from '../postItemSkeleton/postItemSkeleton.component'
import PostItem from '../postItem/postItem.component'
import { getPosts } from '../../../actions/post'
import PropTypes from 'prop-types'

import './posts.style.scss'

const Posts = ({ post: { posts, filters }, loading, getPosts, navRef }) => {
  const { result, pagination } = posts

  useEffect(() => {
    getPosts(1, filters)
  }, [getPosts, filters])

  const handlePaginationOnClick = pageNumber => {
    getPosts(pageNumber, filters)
  }

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
          : result.map(post => <PostItem key={post._id} post={post} />)}
      </div>
      <Pagination pagination={pagination} onClick={handlePaginationOnClick} />
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
