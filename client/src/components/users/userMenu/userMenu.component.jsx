import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Sidebar from './sidebar/sidebar.component'
import User from './user/user.component'
import UserPosts from './userPosts/userPosts.component'
import Favorites from './favorites/favorites.component'
import Settings from './settings/settings.component'
import { baseUrl } from '../../../App'

import './userMenu.style.scss'

const UserMenu = () => {
  return (
    <div>
      <Sidebar />
      <div className="user-menu-container py-2 px-2">
        <Switch>
          <Route exact path={`${baseUrl}/users/:id`} component={User} />
          <Route
            exact
            path={`${baseUrl}/users/:id/posts`}
            component={UserPosts}
          />
          <Route exact path={`${baseUrl}/favorites`} component={Favorites} />
          <Route exact path={`${baseUrl}/settings`} component={Settings} />
        </Switch>
      </div>
    </div>
  )
}

export default UserMenu
