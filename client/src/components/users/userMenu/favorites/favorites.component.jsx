import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPosts, cleanPosts } from '../../../../actions/post'
import PostItem from '../../../posts/postItem/postItem.component'
import SkeletonPostList from '../../../layout/skeleton/skeletonPostList/skeletonPostList.component'
import Pagination from '../../../layout/pagination/pagination.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Favorites = ({
  auth,
  posts,
  loading,
  loadingElements,
  getPosts,
  cleanPosts,
}) => {
  useEffect(() => {
    if (auth.user && auth.user && auth.user.favorites) {
      getPosts({
        ids: Object.keys(auth.user.favorites).filter(
          (key) => auth.user.favorites[key]
        ),
      })
    }
    // Set initial loading to false
    if (initialLoading) setInitialLoading(false)
    // eslint-disable-next-line
  }, [auth])

  useEffect(() => {
    return () => cleanPosts()
  }, [cleanPosts])

  const [initialLoading, setInitialLoading] = useState(true)
  const { result, pagination } = posts

  const handlePaginationOnClick = () => {}

  const [t] = useTranslation()

  return (
    <div>
      <h5 className="lead">
        <i className="fas fa-heart"></i> {t('userMenu.titles.favorites')}
      </h5>
      <div className="cards-container-sm my-1">
        {(loading && loadingElements.includes('POST_LIST')) ||
        initialLoading ? (
          <SkeletonPostList />
        ) : (
          result.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
      <Pagination pagination={pagination} onClick={handlePaginationOnClick} />
    </div>
  )
}

Favorites.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingElements: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  cleanPosts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.post.posts,
  loading: state.async.loading,
  loadingElements: state.async.loadingElements,
})

export default connect(mapStateToProps, { getPosts, cleanPosts })(Favorites)
