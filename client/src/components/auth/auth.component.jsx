import React, { useState } from 'react'
import Register from './register/register.component'
import Login from './login/login.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import './auth.styles.scss'
import { useTranslation } from 'react-i18next'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const Auth = ({ handleCloseModal }) => {
  const [state, setState] = useState({ action: 'login' })
  const [t] = useTranslation()
  const { action } = state

  return (
    <FadeInDiv className="popup">
      <div className="form-container">
        <div className="button-box">
          <input
            id="login"
            className="toggle toggle-left"
            name="auth"
            type="radio"
            defaultChecked
            onClick={() => setState({ action: 'login' })}
          />
          <label htmlFor="login" className="btn btn-toggle">
            {t('login')}
          </label>
          <input
            id="register"
            className="toggle toggle-right"
            name="auth"
            type="radio"
            onClick={() => setState({ action: 'register' })}
          />
          <label htmlFor="register" className="btn btn-toggle">
            {t('register')}
          </label>
        </div>
        {action === 'login' ? (
          <Login />
        ) : (
          <Register handleCloseModal={handleCloseModal} />
        )}
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <span className="large">{t('authTitle')}</span>
        </div>
      </div>
    </FadeInDiv>
  )
}

export default Auth
