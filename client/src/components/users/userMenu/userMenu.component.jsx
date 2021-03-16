import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../routing/privateRoute.component'
import Sidebar from './sidebar/sidebar.component'
import User from './user/user.component'
import UserPosts from './userPosts/userPosts.component'
import Favorites from './favorites/favorites.component'
import Settings from './settings/settings.component'
import { baseUrl } from '../../../App'

import './userMenu.style.scss'

const UserMenu = () => {
  return (
    <div className="user-menu-container">
      <Sidebar />
      <div className="py-2 px-2">
        <Switch>
          <Route exact path={`${baseUrl}/users/:id`} component={User} />
          <Route
            exact
            path={`${baseUrl}/users/:id/posts`}
            component={UserPosts}
          />
          <PrivateRoute
            exact
            path={`${baseUrl}/favorites`}
            component={Favorites}
          />
          <PrivateRoute
            exact
            path={`${baseUrl}/settings`}
            component={Settings}
          />
        </Switch>
      </div>
    </div>
  )
}

export default UserMenu
