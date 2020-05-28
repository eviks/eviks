import React, { useState, useEffect } from 'react'
import Input from '../../layout/form/input/input.component'
import Ripple from '../../layout/ripple/ripple.component'
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component'
import { connect } from 'react-redux'
import { sendResetPasswordToken } from '../../../actions/auth'
import Alert from '../../layout/alert/alert.component'
import { setAlert, deleteAllAlerts } from '../../../actions/alert'
import { toastr } from 'react-redux-toastr'
import MessageIcon from '../../layout/icons/messageIcon.component'
import { useTranslation } from 'react-i18next'
import uuid from 'uuid'
import PropTypes from 'prop-types'

import '../auth.style.scss'

const ResetPassword = ({
  loading,
  setAlert,
  deleteAllAlerts,
  sendResetPasswordToken,
  location,
  history,
}) => {
  useEffect(() => {
    return () => {
      deleteAllAlerts()
    }
  }, [deleteAllAlerts])

  const [email, setEmail] = useState('')

  const onSubmit = async () => {
    // Send reset-password-token
    const result = await sendResetPasswordToken(email)

    if (!result) return

    // Toaster
    const toastrOptions = {
      timeOut: 0,
      icon: <MessageIcon />,
      status: 'info',
    }
    toastr.light(
      t('auth.resetPassword.checkEmailTitle'),
      t('auth.resetPassword.checkEmail', { email }),
      toastrOptions
    )

    // Go to landing page
    history.push('/')
  }

  const [t] = useTranslation()

  if (location.state && location.state.showAlert) {
    location.state.showAlert = false
    setAlert(t('auth.resetPassword.invalidToken'), 'danger', uuid.v4())
  }

  return (
    <div className="container container-center">
      <Alert />
      <h1>{t('auth.resetPassword.title')}</h1>
      <span>{t('auth.resetPassword.subtitle')}</span>
      <img
        style={{ width: '400px', display: 'block' }}
        src={require('../../../img/illustrations/password.jpg')}
        alt="password"
      />
      <div className="reset-password-form">
        <Input
          mask={false}
          options={{
            type: 'email',
            name: 'email',
            value: email,
          }}
          main={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <button
            type="submit"
            className={`btn btn-primary ${loading && 'btn-loading'}`}
            disabled={loading || email === ''}
            onClick={onSubmit}
          >
            {t('auth.resetPassword.send')}
            {loading && <ButtonSpinner />}
            <Ripple />
          </button>
        </div>
      </div>
    </div>
  )
}

ResetPassword.propTypes = {
  sendResetPasswordToken: PropTypes.func.isRequired,
  deleteAllAlerts: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  showAlert: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  loading: state.async.loading,
})

export default connect(mapStateToProps, {
  setAlert,
  deleteAllAlerts,
  sendResetPasswordToken,
})(ResetPassword)
