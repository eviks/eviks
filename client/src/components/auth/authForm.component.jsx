import React from 'react'
import Auth from './auth.component'

import './auth.style.scss'

const AuthForm = ({ history }) => {
  return (
    <div className="auth-background">
      <Auth history={history} />
    </div>
  )
}

export default AuthForm
