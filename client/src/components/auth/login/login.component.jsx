import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { fadeInLeft } from 'react-animations'

const FadeInLeftAnimation = keyframes`${fadeInLeft}`
const FadeInLeftForm = styled.form`
  animation: 0.5s ${FadeInLeftAnimation};
`

const Login = () => {
  return (
    <FadeInLeftForm action="#">
      <h1>Welcome back!</h1>
      <div className="social-container">
        <Link to="#" className="social">
          <i className="fab fa-facebook-f"></i>
        </Link>
        <Link to="#" className="social">
          <i className="fab fa-google-plus-g"></i>
        </Link>
      </div>
      <label htmlFor="email">
        <i className="fas fa-at"></i> Email
      </label>
      <input className="input-field" type="email" name="email" />
      <label htmlFor="password">
        <i className="fas fa-lock"></i> Password
      </label>
      <input className="input-field" type="password" name="password" />
      <input className="btn btn-primary" type="submit" value="Sign In" />
      <a href="#">Oops! I forgot my password</a>
    </FadeInLeftForm>
  )
}

export default Login
