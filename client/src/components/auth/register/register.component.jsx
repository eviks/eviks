import React, { useState, useEffect, Fragment } from 'react'
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
import PropTypes from 'prop-types'

const FadeInRightAnimation = keyframes`${fadeInRight}`
const FadeInRightForm = styled.form`
  animation: 0.5s ${FadeInRightAnimation};
`

const Register = ({
  handleCloseModal,
  registerUser,
  loading,
  history,
  deleteAllAlerts,
}) => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
  })
  const [t] = useTranslation()
  const { displayName, email, password } = formData

  useEffect(() => {
    return () => {
      deleteAllAlerts()
    }
  }, [deleteAllAlerts])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    const success = await registerUser({ displayName, email, password })

    if (success) {
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
        history.push('/')
      }
    }
  }

  const formIsValid = () => {
    return email.length > 0 && password.length >= 6 && displayName.length > 0
  }

  return (
    <FadeInRightForm onSubmit={(e) => onSubmit(e)}>
      <div className="inner-container">
        <h3 className="lead" style={{ marginBottom: '1rem' }}>
          {t('auth.registerTitle')}
        </h3>
        <Alert />
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
        />
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
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  loading: state.async.loading,
})

export default connect(mapStateToProps, { registerUser, deleteAllAlerts })(
  Register
)
