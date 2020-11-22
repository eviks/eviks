import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { baseUrl } from '../../../../App'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './sidebar.style.scss'

const Sidebar = ({ user, isAuthenticated }) => {
  const userId = user && isAuthenticated ? user._id : null

  const [t] = useTranslation()

  return (
    <div>
      <aside className="user-menu-sidebar light-shadow-border">
        <div className="py-2 px-1">
          <ul>
            <li className="mb-05">
              <Link to={`${baseUrl}/users/${userId}`} className="py-1 px-1">
                <i className="fas fa-user-circle mr-1"></i>
                {t('userMenu.titles.profile')}
              </Link>
            </li>
            <li className="mb-05">
              <Link
                to={`${baseUrl}/users/${userId}/posts`}
                className="py-1 px-1"
              >
                <i className="fas fa-sticky-note mr-1"></i>
                {t('userMenu.titles.posts')}
              </Link>
            </li>
            <li className="mb-05">
              <Link to={`${baseUrl}/favorites`} className="py-1 px-1">
                <i className="fas fa-heart mr-1"></i>
                {t('userMenu.titles.favorites')}
              </Link>
            </li>
            <li className="mb-05">
              <Link to={`${baseUrl}/settings`} className="py-1 px-1">
                <i className="fas fa-cog mr-1"></i>
                {t('userMenu.titles.settings')}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

Sidebar.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Sidebar)
