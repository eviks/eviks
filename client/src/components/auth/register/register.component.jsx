import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../../actions/auth'
import Alert from '../../layout/alert/alert.component'
import { deleteAllAlerts } from '../../../actions/alert'
import Ripple from '../../layout/ripple/ripple.component'
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component'
import Input from '../../layout/form/input/input.component'
import { toastr } from 'react-redux-toastr'
import MessageIcon from '../../layout/icons/messageIcon.component'
import styled, { keyframes } from 'styled-components'
import { fadeInRight } from 'react-animations'
import { useTranslation } from 'react-i18next'
import {
  validationAttributeOnChange,
  validationOnSubmit,
} from '../../../services/formValidation/validationEvents'
import PropTypes from 'prop-types'

const FadeInRightAnimation = keyframes`${fadeInRight}`
const FadeInRightForm = styled.form`
  animation: 0.5s ${FadeInRightAnimation};
`

const Register = ({
  handleCloseModal,
  registerUser,
  loading,
  locale,
  deleteAllAlerts,
}) => {
  const history = useHistory()

  const [state, setState] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
    validationErrors: {},
  })

  const { username, displayName, email, password, validationErrors } = state

  useEffect(() => {
    return () => {
      deleteAllAlerts()
    }
  }, [deleteAllAlerts])

  const onChange = (event) => {
    validationAttributeOnChange(
      'REGISTER',
      event.target.name,
      event.target.value,
      state,
      setState
    )
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const formIsValid = validationOnSubmit('REGISTER', state, setState)

    if (!formIsValid) {
      return
    }

    try {
      await registerUser({
        username,
        displayName,
        email,
        password,
      })

      const toastrOptions = {
        timeOut: 0,
        icon: <MessageIcon />,
        status: 'info',
      }
      toastr.light(
        t('auth.checkEmailTitle'),
        t('auth.checkEmail', { email }),
        toastrOptions
      )
      if (handleCloseModal !== undefined) {
        handleCloseModal()
      } else {
        history.push(`/${locale}/`)
      }
    } catch (errors) {
      setState({
        ...state,
        validationErrors: Object.assign(
          validationErrors,
          ...errors.errors.map((error) => ({
            [error.param]: error.msg,
          }))
        ),
      })
    }
  }

  const [t] = useTranslation()

  return (
    <FadeInRightForm onSubmit={(e) => onSubmit(e)}>
      <div className="inner-container">
        <h3 className="lead" style={{ marginBottom: '1rem' }}>
          {t('auth.registerTitle')}
        </h3>
        <Alert />
        {/* Username */}
        <Input
          mask={false}
          fieldName={
            <Fragment>
              <i className="fas fa-user"></i> {t('auth.username')}
            </Fragment>
          }
          options={{
            type: 'text',
            name: 'username',
            value: username,
          }}
          main={true}
          onChange={onChange}
          error={validationErrors.username}
        />
        {/* Display name */}
        <Input
          mask={false}
          fieldName={
            <Fragment>
              <i className="fas fa-user"></i> {t('auth.displayName')}
            </Fragment>
          }
          options={{
            type: 'text',
            name: 'displayName',
            value: displayName,
          }}
          main={true}
          onChange={onChange}
          error={validationErrors.displayName}
        />
        {/* Email */}
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
          error={validationErrors.email}
        />
        {/* Password */}
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
          error={validationErrors.password}
        />
        <button
          type="submit"
          className={`btn btn-primary mb-1 ${loading ? 'btn-loading' : ''}`}
          disabled={loading}
        >
          {t('auth.signUp')}
          {loading && <ButtonSpinner />}
          <Ripple />
        </button>
      </div>
    </FadeInRightForm>
  )
}

Register.propTypes = {
  handleCloseModal: PropTypes.func,
  registerUser: PropTypes.func.isRequired,
  deleteAllAlerts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  loading: state.async.loading,
  locale: state.locale.locale,
})

export default connect(mapStateToProps, { registerUser, deleteAllAlerts })(
  Register
)
