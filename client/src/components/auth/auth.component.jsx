import React, { useState } from 'react'
import Register from './register/register.component'
import Login from './login/login.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'

import './auth.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const Auth = ({ handleCloseModal, showOverlay, history }) => {
  const [state, setState] = useState({ action: 'login' })
  const [t] = useTranslation()
  const { action } = state

  return (
    <div>
      <FadeInDiv
        className="popup"
        style={!showOverlay ? { width: '400px' } : {}}
      >
        <div className="form-container" style={showOverlay && { width: '55%' }}>
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
              {t('auth.login')}
            </label>
            <input
              id="register"
              className="toggle toggle-right"
              name="auth"
              type="radio"
              onClick={() => setState({ action: 'register' })}
            />
            <label htmlFor="register" className="btn btn-toggle">
              {t('auth.register')}
            </label>
          </div>
          {action === 'login' ? (
            <Login handleCloseModal={handleCloseModal} />
          ) : (
            <Register handleCloseModal={handleCloseModal} history={history} />
          )}
        </div>
        {showOverlay && (
          <div className="overlay-container">
            <div className="auth-text">
              <ul className="features lead">
                <li>
                  <span role="img" aria-label="feature">
                    🔥
                  </span>{' '}
                  {t('auth.feature1')}
                </li>
                <li>
                  <span role="img" aria-label="feature">
                    🔍
                  </span>{' '}
                  {t('auth.feature2')}
                </li>
                <li>
                  <span role="img" aria-label="feature">
                    🧡
                  </span>{' '}
                  {t('auth.feature3')}
                </li>
              </ul>
            </div>
          </div>
        )}
      </FadeInDiv>
      {showOverlay && (
        <button className="close-modal" onClick={() => handleCloseModal()}>
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  )
}

export default Auth
