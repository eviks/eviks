import React from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeInRight } from 'react-animations'

const FadeInRightAnimation = keyframes`${fadeInRight}`
const FadeInRightForm = styled.form`
  animation: 0.5s ${FadeInRightAnimation};
`

const Register = () => {
  return (
    <FadeInRightForm action="#">
      <h1>Create Account</h1>
      <label htmlFor="display-name">
        <i className="fas fa-user"></i> Name
      </label>
      <input className="input-field" type="text" name="display-name" />
      <label htmlFor="email">
        <i className="fas fa-at"></i> Email
      </label>
      <input className="input-field" type="email" name="email" />
      <label htmlFor="password">
        <i className="fas fa-lock"></i> Password
      </label>
      <input className="input-field" type="password" name="password" />
      <input className="btn btn-primary" type="submit" value="Sign Up" />
    </FadeInRightForm>
  )
}

export default Register
