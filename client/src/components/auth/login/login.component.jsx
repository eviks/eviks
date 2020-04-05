import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../../actions/auth'
import Alert from '../../layout/alert/alert.component'
import Ripple from '../../layout/ripple/ripple.component'
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component'
import styled, { keyframes } from 'styled-components'
import { fadeInLeft } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const FadeInLeftAnimation = keyframes`${fadeInLeft}`
const FadeInLeftForm = styled.form`
  animation: 0.5s ${FadeInLeftAnimation};
`

const Login = ({ handleCloseModal, login, isAuthenticated, loading }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [t] = useTranslation()
  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    login(email, password)
  }

  if (isAuthenticated) {
    if (handleCloseModal !== undefined) {
      handleCloseModal()
    } else {
      return <Redirect to="/" />
    }
  }

  return (
    <FadeInLeftForm onSubmit={(e) => onSubmit(e)}>
      <h3 className="lead">{t('auth.loginTitle')}</h3>
      <Alert />
      <div className="social-container">
        <Link to="#" className="social">
          <i className="fab fa-facebook-f"></i>
        </Link>
        <Link to="#" className="social">
          <i className="fab fa-google-plus-g"></i>
        </Link>
      </div>
      <label htmlFor="email" className="label-flex">
        <i className="fas fa-at"></i> {t('auth.email')}
      </label>
      <input
        className="input-field-radius"
        type="email"
        name="email"
        value={email}
        required
        onChange={(e) => onChange(e)}
      />
      <label htmlFor="password" className="label-flex">
        <i className="fas fa-lock"></i> {t('auth.password')}
      </label>
      <input
        className="input-field-radius"
        type="password"
        name="password"
        value={password}
        required
        onChange={(e) => onChange(e)}
      />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {t('auth.signIn')}
        {loading && (
          <ButtonSpinner
            style={{
              width: '20px',
              marginLeft: '4px',
              transition: 'all 0.3s ease-in-out',
            }}
          />
        )}
        <Ripple />
      </button>
      <Link to="/reset_password" onClick={() => handleCloseModal()}>
        {t('auth.forgotPassword')}
      </Link>
    </FadeInLeftForm>
  )
}

Login.propTypes = {
  handleCloseModal: PropTypes.func,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.async.loading,
})

export default connect(mapStateToProps, { login })(Login)
