import React, { Fragment } from 'react'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'
import './auth.styles.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation};
`

const Auth = ({ handleCloseModal }) => {
  return (
    <FadeInDiv className="popup">
      <div className="form-container">
        <form action="#">
          <h1>Create Account</h1>
          <div class="social-container">
            <a href="#" class="social">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social">
              <i class="fab fa-google-plus-g"></i>
            </a>
          </div>
          <input className="input-field" type="text" placeholder="Name" />
          <input className="input-field" type="email" placeholder="Email" />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
          />
          <input
            className="input-field"
            type="submit"
            className="btn btn-primary"
            value="Sign Up"
          />
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay"></div>
      </div>
    </FadeInDiv>
  )
}

export default Auth
