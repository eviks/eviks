import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '../../../../LocalizedLink'
import PropTypes from 'prop-types'

import './sidebar.style.scss'

const Sidebar = ({ user, isAuthenticated }) => {
  const userId = user && isAuthenticated ? user._id : null

  const [t] = useTranslation()

  return (
    <div>
      <aside className="user-menu-sidebar">
        <div className="py-2 px-2">
          <ul>
            <li className="mb-05">
              <LocalizedLink to={`/users/${userId}`} className="py-1 px-1">
                <i className="fas fa-user-circle mr-1"></i>
                {t('userMenu.titles.profile')}
              </LocalizedLink>
            </li>
            <li className="mb-05">
              <LocalizedLink
                to={`/users/${userId}/posts`}
                className="py-1 px-1"
              >
                <i className="fas fa-sticky-note mr-1"></i>
                {t('userMenu.titles.posts')}
              </LocalizedLink>
            </li>
            <li className="mb-05">
              <LocalizedLink to={`/favorites`} className="py-1 px-1">
                <i className="fas fa-heart mr-1"></i>
                {t('userMenu.titles.favorites')}
              </LocalizedLink>
            </li>
            <li className="mb-05">
              <LocalizedLink to={`/settings`} className="py-1 px-1">
                <i className="fas fa-cog mr-1"></i>
                {t('userMenu.titles.settings')}
              </LocalizedLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

Sidebar.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Sidebar)
