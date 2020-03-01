import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Alert from '../../layout/alert/alert.component'
import styled, { keyframes } from 'styled-components'
import { fadeInLeft } from 'react-animations'
import { useTranslation } from 'react-i18next'
import { login } from '../../../actions/auth'
import PropTypes from 'prop-types'

const FadeInLeftAnimation = keyframes`${fadeInLeft}`
const FadeInLeftForm = styled.form`
  animation: 0.5s ${FadeInLeftAnimation};
`

const Login = ({ handleCloseModal, login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [t] = useTranslation()
  const { email, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    login(email, password)
  }

  if (isAuthenticated) {
    handleCloseModal()
  }

  return (
    <FadeInLeftForm onSubmit={e => onSubmit(e)}>
      <h3 className="lead">{t('loginTitle')}</h3>
      <Alert />
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
      <Link to="/reset_password" onClick={() => handleCloseModal()}>
        {t('forgotPassword')}
      </Link>
    </FadeInLeftForm>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
