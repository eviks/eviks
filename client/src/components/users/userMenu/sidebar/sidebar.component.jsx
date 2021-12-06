import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SvgHeart, SvgUser, SvgSettings } from '../../../layout/icons';
import LocalizedLink from '../../../../components/localization/LocalizedLink.component';
import PropTypes from 'prop-types';

import './sidebar.style.scss';

const Sidebar = ({ user, isAuthenticated }) => {
  const username = user && isAuthenticated ? user.username : '';

  const [t] = useTranslation();

  return (
    <aside className="user-menu-sidebar">
      <div className="py-2 px-2">
        <ul>
          <li className="mb-05">
            <LocalizedLink to={`/users/${username}`} className="py-1 px-1">
              <SvgUser className="mr-1" />
              {t('userMenu.titles.profile')}
            </LocalizedLink>
          </li>
          <li className="mb-05">
            <LocalizedLink to={`/favorites`} className="py-1 px-1">
              <SvgHeart className="mr-1" /> {t('userMenu.titles.favorites')}
            </LocalizedLink>
          </li>
          <li className="mb-05">
            <LocalizedLink to={`/settings`} className="py-1 px-1">
              <SvgSettings className="mr-1" />
              {t('userMenu.titles.settings')}
            </LocalizedLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Sidebar);
