import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts, cleanPosts } from '../../../../actions/post';
import PostItem from '../../../posts/postItem/postItem.component';
import SkeletonPostList from '../../../layout/skeleton/skeletonPostList/skeletonPostList.component';
import Pagination from '../../../layout/pagination/pagination.component';
import PropTypes from 'prop-types';

const UserPosts = ({
  userId,
  posts,
  loading,
  loadingElements,
  getPosts,
  cleanPosts,
}) => {
  useEffect(() => {
    getPosts({ user: userId });
    // Set initial loading to false
    if (initialLoading) setInitialLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => cleanPosts();
  }, [cleanPosts]);

  const [initialLoading, setInitialLoading] = useState(true);
  const { result, pagination } = posts;

  const handlePaginationOnClick = () => {};

  return (
    <Fragment>
      <div className="cards-container-sm my-1">
        {(loading && loadingElements.includes('POST_LIST')) ||
        initialLoading ? (
          <SkeletonPostList />
        ) : (
          result.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
      <Pagination pagination={pagination} onClick={handlePaginationOnClick} />
    </Fragment>
  );
};

UserPosts.propTypes = {
  userId: PropTypes.string.isRequired,
  posts: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingElements: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  cleanPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.post.posts,
  loading: state.async.loading,
  loadingElements: state.async.loadingElements,
});

export default connect(mapStateToProps, { getPosts, cleanPosts })(UserPosts);
