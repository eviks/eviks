import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserPosts } from '../../../../actions/user'
import PostItem from '../../../posts/postItem/postItem.component'
import SkeletonPostList from '../../../layout/skeleton/skeletonPostList/skeletonPostList.component'
import Pagination from '../../../layout/pagination/pagination.component'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const UserPosts = ({ posts, loading, loadingElements, getUserPosts, match }) => {

  useEffect(() => {
    getUserPosts(match.params.id)
    // Set initial loading to false
    if (initialLoading) setInitialLoading(false)
    // eslint-disable-next-line
  }, [])

  const [initialLoading, setInitialLoading] = useState(true)
  const { result, pagination } = posts

  const handlePaginationOnClick = () => {}

  const [t] = useTranslation()

  return (
    <div>
      <h5 className="lead">{t('userMenu.titles.posts')}</h5>
      <div className="cards-container my-1">
        {(loading && loadingElements.includes('USER_POST_LIST')) ||
        initialLoading ? (
          <SkeletonPostList />
        ) : (
          result.map(post => <PostItem key={post._id} post={post} />)
        )}
      </div>
      <Pagination pagination={pagination} onClick={handlePaginationOnClick} />
    </div>
  )
}

UserPosts.propTypes = {
  posts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingElements: PropTypes.array.isRequired,
  getUserPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  posts: state.user.posts,
  loading: state.async.loading,
  loadingElements: state.async.loadingElements
})

export default connect(mapStateToProps, { getUserPosts })(UserPosts)
