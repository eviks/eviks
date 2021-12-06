import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../../actions/user';
import UserPosts from '../userPosts/userPosts.component';
import SkeletonAvatar from '../../../layout/skeleton/skeletonAvatar/skeletonAvatar.component';
import Avatar from '../../../../assets/img/illustrations/avatar.svg';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './user.style.scss';

const User = ({ user, getUser, loading, loadingElements, match }) => {
  useEffect(() => {
    getUser(match.params.username);
    // Set initial loading to false
    if (initialLoading) setInitialLoading(false);
    // eslint-disable-next-line
  }, []);

  const [initialLoading, setInitialLoading] = useState(true);
  const [t] = useTranslation();

  return (
    <Fragment>
      {(loading && loadingElements.includes('USER_PROFILE')) ||
      initialLoading ? (
        <SkeletonAvatar />
      ) : (
        <div className="user-profile py-1">
          <div className="user-avatar-wrapper">
            <img className="user-avatar" src={Avatar} alt="avatar" />
          </div>
          <div className="user-info ml-05">
            <h1>{user.displayName}</h1>
            <p className="text-secondary">
              {t('userMenu.createdAt', {
                createdAt: new Date(user.createdAt),
              })}
            </p>
          </div>
        </div>
      )}

      <div className="divider mb-2" />
      <UserPosts userId={match.params.id} />
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  loadingElements: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.async.loading,
  loadingElements: state.async.loadingElements,
});

export default connect(mapStateToProps, { getUser })(User);
