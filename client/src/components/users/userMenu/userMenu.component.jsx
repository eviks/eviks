import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../routing/privateRoute.component'
import Sidebar from './sidebar/sidebar.component'
import User from './user/user.component'
import UserPosts from './userPosts/userPosts.component'
import Favorites from './favorites/favorites.component'
import Settings from './settings/settings.component'
import PropTypes from 'prop-types'

import './userMenu.style.scss'

const UserMenu = ({ locale }) => {
  return (
    <div className="user-menu-container">
      <Sidebar />
      <div className="py-2 px-2">
        <Switch>
          <Route exact path={`/${locale}/users/:id`} component={User} />
          <Route
            exact
            path={`/${locale}/users/:id/posts`}
            component={UserPosts}
          />
          <PrivateRoute
            exact
            path={`/${locale}/favorites`}
            component={Favorites}
          />
          <PrivateRoute
            exact
            path={`/${locale}/settings`}
            component={Settings}
          />
        </Switch>
      </div>
    </div>
  )
}

UserMenu.propTypes = {
  locale: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  locale: state.locale.locale,
})

export default connect(mapStateToProps)(UserMenu)
