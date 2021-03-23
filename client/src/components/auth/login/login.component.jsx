import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../../actions/auth'
import Alert from '../../layout/alert/alert.component'
import { deleteAllAlerts } from '../../../actions/alert'
import Ripple from '../../layout/ripple/ripple.component'
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component'
import Input from '../../layout/form/input/input.component'
import styled, { keyframes } from 'styled-components'
import { fadeInLeft } from 'react-animations'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '../../../LocalizedLink'
import PropTypes from 'prop-types'

const FadeInLeftAnimation = keyframes`${fadeInLeft}`
const FadeInLeftForm = styled.form`
  animation: 0.5s ${FadeInLeftAnimation};
`

const Login = ({
  handleCloseModal,
  login,
  isAuthenticated,
  loading,
  locale,
  deleteAllAlerts,
}) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [t] = useTranslation()
  const { email, password } = formData

  useEffect(() => {
    return () => {
      deleteAllAlerts()
    }
  }, [deleteAllAlerts])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    login(email, password)
  }

  const formIsValid = () => {
    return email.length > 0 && password.length > 0
  }

  if (isAuthenticated) {
    if (handleCloseModal !== undefined) {
      handleCloseModal()
    } else {
      return <Redirect to={`/${locale}/`} />
    }
  }

  const resetPasswordOnClick = () => {
    if (handleCloseModal !== undefined) handleCloseModal()
  }

  return (
    <FadeInLeftForm onSubmit={(e) => onSubmit(e)}>
      <div className="inner-container">
        <h3 className="lead">{t('auth.loginTitle')}</h3>
        <Alert />
        <div className="social-container">
          <LocalizedLink to="#" className="social">
            <i className="fab fa-facebook-f"></i>
          </LocalizedLink>
          <LocalizedLink to="#" className="social">
            <i className="fab fa-google-plus-g"></i>
          </LocalizedLink>
        </div>
        <Input
          mask={false}
          fieldName={
            <Fragment>
              <i className="fas fa-at"></i> {t('auth.email')}
            </Fragment>
          }
          options={{
            type: 'email',
            name: 'email',
            value: email,
          }}
          main={true}
          onChange={onChange}
        />
        <Input
          mask={false}
          fieldName={
            <Fragment>
              <i className="fas fa-lock"></i> {t('auth.password')}
            </Fragment>
          }
          options={{
            type: 'password',
            name: 'password',
            value: password,
          }}
          main={true}
          onChange={onChange}
        />
        <button
          type="submit"
          className={`btn btn-primary ${loading && 'btn-loading'}`}
          disabled={loading || !formIsValid()}
        >
          {t('auth.signIn')}
          {loading && <ButtonSpinner />}
          <Ripple />
        </button>
        <LocalizedLink to={`/reset_password`} onClick={resetPasswordOnClick}>
          {t('auth.forgotPassword')}
        </LocalizedLink>
      </div>
    </FadeInLeftForm>
  )
}

Login.propTypes = {
  handleCloseModal: PropTypes.func,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.async.loading,
  locale: state.locale.locale,
})

export default connect(mapStateToProps, { login, deleteAllAlerts })(Login)
