import React, { useState } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../../actions/auth'
import Alert from '../../layout/alert/alert.component'
import Ripple from '../../layout/ripple/ripple.component'
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component'
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

const Register = ({ handleCloseModal, registerUser, loading, history }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: ''
  })
  const [t] = useTranslation()
  const { displayName, email, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()

    const success = await registerUser({ displayName, email, password })

    if (success) {
      const toastrOptions = {
        timeOut: 0,
        icon: <MessageIcon />,
        status: 'info'
      }
      toastr.light(
        t('checkEmailTitle'),
        t('checkEmail', { email }),
        toastrOptions
      )
      if (handleCloseModal !== undefined) {
        handleCloseModal()
      } else {
        history.push('/')
      }
    }
  }

  return (
    <FadeInRightForm onSubmit={e => onSubmit(e)}>
      <h3 className="lead">{t('registerTitle')}</h3>
      <Alert />
      <label htmlFor="displayName" className="label-flex">
        <i className="fas fa-user"></i> {t('displayName')}
      </label>
      <input
        className="input-field-radius"
        type="text"
        name="displayName"
        value={displayName}
        required
        onChange={e => onChange(e)}
      />
      <label htmlFor="email" className="label-flex">
        <i className="fas fa-at"></i> {t('email')}
      </label>
      <input
        className="input-field-radius"
        type="email"
        name="email"
        value={email}
        required
        onChange={e => onChange(e)}
      />
      <label htmlFor="password" className="label-flex">
        <i className="fas fa-lock"></i> {t('password')}
      </label>
      <input
        className="input-field-radius"
        type="password"
        name="password"
        value={password}
        required
        onChange={e => onChange(e)}
      />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {t('signUp')}
        {loading && (
          <ButtonSpinner
            style={{
              width: '20px',
              marginLeft: '4px',
              transition: 'all 0.3s ease-in-out'
            }}
          />
        )}
        <Ripple />
      </button>
    </FadeInRightForm>
  )
}

Register.propTypes = {
  handleCloseModal: PropTypes.func,
  registerUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loading: state.async.loading
})

export default connect(mapStateToProps, { registerUser })(Register)
