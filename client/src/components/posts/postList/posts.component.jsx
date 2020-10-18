import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import Searchbar from './searchbar/searchbar.component'
import SearchbarSmall from './searchbar/searchbarSmall.component'
import Pagination from '../../layout/pagination/pagination.component'
import PostItemSkeleton from '../postItemSkeleton/postItemSkeleton.component'
import PostItem from '../postItem/postItem.component'
import {
  getPosts,
  setSrearchFiltersFromURL,
  removeAllFilters
} from '../../../actions/post'
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions'
import { getURLParams } from '../../../utils/urlParams'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './posts.style.scss'

const Posts = ({
  posts,
  currentLocality,
  loading,
  getPosts,
  setSrearchFiltersFromURL,
  removeAllFilters,
  navRef
}) => {
  const history = useHistory()

  const { result, pagination } = posts

  const [smallWidth, setSmallWidth] = useState(true)

  const { width } = useWindowDimensions()
  if (width <= 768 && !smallWidth) setSmallWidth(true)
  if (width > 768 && smallWidth) setSmallWidth(false)

  useEffect(() => {
    return () => removeAllFilters()
  }, [removeAllFilters])

  useEffect(() => {
    // City ID & deal type are required
    const path = history.location.pathname
    const pathArray = path.split('/')
    let searchParams = { cityId: currentLocality.city.id, dealType: pathArray[2] }

    // Other filters
    const query = history.location.search
    if (query) {
      searchParams = {
        ...searchParams,
        ...Object.fromEntries(getURLParams(query))
      }
    }

    // Update state
    setSrearchFiltersFromURL(searchParams)
    getPosts(searchParams)

    // eslint-disable-next-line
  }, [history.location.search])

  const handlePaginationOnClick = page => {
    // getPosts({ ...filters, page }, history)
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
  posts: PropTypes.object.isRequired,
  currentLocality: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  setSrearchFiltersFromURL: PropTypes.func.isRequired,
  removeAllFilters: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  currentLocality: state.locality.currentLocality,
  loading: state.async.loading
})

export default connect(mapStateToProps, {
  getPosts,
  setSrearchFiltersFromURL,
  removeAllFilters
})(Posts)
