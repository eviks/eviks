import React, { useState, useEffect, useRef, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Searchbar from './searchbar/searchbar.component'
import SearchbarSmall from './searchbar/searchbarSmall.component'
import Pagination from '../../layout/pagination/pagination.component'
import PostItemSkeleton from '../postItemSkeleton/postItemSkeleton.component'
import PostItem from '../postItem/postItem.component'
import { getPosts, setSrearchFilters } from '../../../actions/post'
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions'
import useIsMount from '../../../utils/hooks/useIsMount'
import { getURLParams } from '../../../utils/urlParams'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './posts.style.scss'

const Posts = ({
  post: { posts, filters },
  loading,
  getPosts,
  setSrearchFilters,
  navRef
}) => {
  const history = useHistory()

  const { result, pagination } = posts

  const [smallWidth, setSmallWidth] = useState(true)

  const { width } = useWindowDimensions()
  if (width <= 768 && !smallWidth) setSmallWidth(true)
  if (width > 768 && smallWidth) setSmallWidth(false)

  const isMounted = useIsMount()
  let firstLoad = useRef(false)

  if (isMounted) {
    const query = history.location.search
    if (query) {
      firstLoad.current = true
      const searchParams = Object.fromEntries(getURLParams(query))
      setSrearchFilters(searchParams)
    }
  }

  useEffect(() => {
    if (smallWidth) {
      if (
        (isMounted && !history.location.search) ||
        (!isMounted && firstLoad.current)
      ) {
        firstLoad.current = false
        getPosts(1, filters, history)
      }
    } else {
      if ((isMounted && !history.location.search) || !isMounted) {
        getPosts(1, filters, history)
      }
    }
    // eslint-disable-next-line
  }, [getPosts, filters, history])

  const handlePaginationOnClick = pageNumber => {
    getPosts(pageNumber, filters, history)
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

  const [t] = useTranslation()

  return (
    <div>
      {width > 768 ? <Searchbar navRef={navRef} /> : <SearchbarSmall />}
      {!loading && result.length === 0 ? (
        <div className="container-center">
          <div className="no-results-img" />
          <span className="lead text-secondary">
            {t('postList.noResults')} <i className="fas fa-search"></i>
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
  setSrearchFilters: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  post: state.post,
  loading: state.async.loading
})

export default connect(mapStateToProps, { getPosts, setSrearchFilters })(Posts)
