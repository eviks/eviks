import React from 'react'
import { Redirect } from 'react-router-dom'

import Landing from '../landing/landing.component'
import AuthForm from '../auth/authForm.component'
import Verification from '../auth/verification/verification.component'
import ResetPassword from '../auth/resetPassword/resetPassword.component'
import PasswordConfirmation from '../auth/resetPassword/passwordConfirmation.component'
import UserMenu from '../users/userMenu/userMenu.component'
import Posts from '../posts/postList/posts.component'
import Post from '../posts/post/post.component'
import PostForm from '../posts/postForm/postForm.component'

import { defaultLocale } from '../../config/i18n'
import { localizeRoutes } from '../../services/i18n/util'

const routes = [
  {
    path: '/',
    exact: true,
    localize: false,
    component: () => <Redirect to={`/${defaultLocale}`} />,
  },
  {
    path: '/',
    exact: true,
    component: Landing,
  },
  {
    path: '/auth',
    exact: true,
    component: AuthForm,
  },
  {
    path: '/verification/:activationToken',
    exact: true,
    component: Verification,
  },
  {
    path: '/reset_password',
    exact: true,
    component: ResetPassword,
  },
  {
    path: '/password_confirmation/:resetPasswordToken',
    exact: true,
    component: PasswordConfirmation,
  },
  {
    path: ['/users/:id', '/users/:id/posts', '/favorites', '/settings'],
    component: UserMenu,
  },
  {
    path: '/posts/:id',
    exact: true,
    component: Post,
  },
  {
    path: '/create_post',
    exact: true,
    private: true,
    component: PostForm,
  },
  {
    path: '/edit_post/:id',
    exact: true,
    private: true,
    component: PostForm,
  },
  {
    path: '/:city/:dealType',
    useNavRef: true,
    component: Posts,
  },
]

export default localizeRoutes(routes)
