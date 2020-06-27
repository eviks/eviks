import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Searchbar from './searchbar/searchbar.component'
import SearchbarSmall from './searchbar/searchbarSmall.component'
import Pagination from '../../layout/pagination/pagination.component'
import PostItemSkeleton from '../postItemSkeleton/postItemSkeleton.component'
import PostItem from '../postItem/postItem.component'
import { getPosts } from '../../../actions/post'
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions'
import useIsMount from '../../../utils/hooks/useIsMount'
import PropTypes from 'prop-types'

import './posts.style.scss'

const Posts = ({ post: { posts, filters }, loading, getPosts, navRef }) => {
  const { result, pagination } = posts

  const [smallWidth, setSmallWidth] = useState(false)

  const { width } = useWindowDimensions()
  if (width <= 768 && !smallWidth) setSmallWidth(true)
  if (width > 768 && smallWidth) setSmallWidth(false)

  const isMounted = useIsMount()

  useEffect(() => {
    if (!smallWidth) getPosts(1, filters)
  }, [getPosts, filters, smallWidth])

  useEffect(() => {
    if (smallWidth && isMounted) getPosts(1, filters)
  }, [getPosts, filters, smallWidth, isMounted])

  const handlePaginationOnClick = pageNumber => {
    getPosts(pageNumber, filters)
  }

  const getSkeletonItems = () => (
    <Fragment>
      <PostItemSkeleton />
      <PostItemSkeleton />
      <PostItemSkeleton />
      <PostItemSkeleton />
      <PostItemSkeleton />
      <PostItemSkeleton />
    </Fragment>
  )

  return (
    <div>
      {width > 768 ? <Searchbar navRef={navRef} /> : <SearchbarSmall />}
      {!loading && result.length === 0 ? (
        <div className="container-center">
          <div className="no-results-img" />
          <span className="lead text-secondary">
            Как жаль! По вашему запросу нет результатов{' '}
            <i className="fas fa-search"></i>
          </span>
        </div>
      ) : (
        <Fragment>
          <div className="cards-container">
            {loading
              ? getSkeletonItems()
              : result.map(post => <PostItem key={post._id} post={post} />)}
          </div>
          <Pagination
            pagination={pagination}
            onClick={handlePaginationOnClick}
          />
        </Fragment>
      )}
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
