import React, { useState, useEffect, useRef } from 'react'
import Register from './register/register.component'
import Login from './login/login.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import PropTypes from 'prop-types'

import './auth.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const Auth = ({ handleCloseModal, showOverlay }) => {
  const [state, setState] = useState({ action: 'login' })
  const [t] = useTranslation()
  const { action } = state

  const containerRef = useRef(null)

  // Disable body scroll
  useEffect(() => {
    let currentRef
    if (containerRef) currentRef = containerRef.current
    if (currentRef) {
      disableBodyScroll(currentRef)
    }
    return () => enableBodyScroll(currentRef)
  })

  return (
    <FadeInDiv
      className={`popup ${showOverlay ? 'popup-with-overlay' : ''}`}
      ref={containerRef}
    >
      <div
        className={`form-container ${
          showOverlay ? 'form-container-half-size' : ''
        }`}
      >
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
          <Register handleCloseModal={handleCloseModal} />
        )}
      </div>
      {showOverlay && <FadeInDiv className="overlay-container"></FadeInDiv>}
      {showOverlay && (
        <button className="close-modal" onClick={() => handleCloseModal()}>
          <i className="fas fa-times"></i>
        </button>
      )}
    </FadeInDiv>
  )
}

Auth.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  showOverlay: PropTypes.bool,
}

export default Auth
