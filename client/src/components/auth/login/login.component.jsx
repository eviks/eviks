import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { fadeInLeft } from 'react-animations'
import { useTranslation } from 'react-i18next'

const FadeInLeftAnimation = keyframes`${fadeInLeft}`
const FadeInLeftForm = styled.form`
  animation: 0.5s ${FadeInLeftAnimation};
`

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [t] = useTranslation()
  const { email, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <FadeInLeftForm onSubmit={e => onSubmit(e)}>
      <h1>{t('loginTitle')}</h1>
      <div className="social-container">
        <Link to="#" className="social">
          <i className="fab fa-facebook-f"></i>
        </Link>
        <Link to="#" className="social">
          <i className="fab fa-google-plus-g"></i>
        </Link>
      </div>
      <label htmlFor="email">
        <i className="fas fa-at"></i> {t('email')}
      </label>
      <input
        className="input-field"
        type="email"
        name="email"
        value={email}
        required
        onChange={e => onChange(e)}
      />
      <label htmlFor="password">
        <i className="fas fa-lock"></i> {t('password')}
      </label>
      <input
        className="input-field"
        type="password"
        name="password"
        value={password}
        required
        onChange={e => onChange(e)}
      />
      <input className="btn btn-primary" type="submit" value={t('signIn')} />
      <a href="#">{t('forgotPassword')}</a>
    </FadeInLeftForm>
  )
}

export default Login