import React from 'react'
import Auth from './auth.component'
import img from '../../img/AuthBackground.jpg'

const AuthForm = ({ history }) => {
  return (
    <div style={style}>
      <div className="modal" style={{ left: '35%', right: '35%' }}>
        <Auth history={history} />
      </div>
    </div>
  )
}

const style = {
  position: 'relative',
  background: `url(${img}) no-repeat center center/cover`,
  height: '100vh'
}

export default AuthForm
