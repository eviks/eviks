import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Searchbar from './searchbar/searchbar.component'
import Spinner from '../../layout/spinner/spinner.component'
import PostItem from '../postItem/postItem.component'
import { getPosts } from '../../../actions/post'
import PropTypes from 'prop-types'

import './posts.styles.scss'

const Posts = ({ post: { posts, loading }, getPosts }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Searchbar />
      <div className="cards-container">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPosts })(Posts)
