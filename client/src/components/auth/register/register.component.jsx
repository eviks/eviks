import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../../actions/alert'
import Ripple from '../../layout/ripple/ripple.component'
import Alert from '../../layout/alert/alert.component'
import styled, { keyframes } from 'styled-components'
import { fadeInRight } from 'react-animations'
import { useTranslation } from 'react-i18next'
import { toastr } from 'react-redux-toastr'
import MessageIcon from '../../layout/icons/messageIcon.component'
import PropTypes from 'prop-types'
import axios from 'axios'

const FadeInRightAnimation = keyframes`${fadeInRight}`
const FadeInRightForm = styled.form`
  animation: 0.5s ${FadeInRightAnimation};
`

const Register = ({ handleCloseModal, setAlert }) => {
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
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify({ displayName, email, password })
      await axios.post('/api/users/', body, config)

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
      handleCloseModal()
    } catch (error) {
      const errors = error.response.data.errors
      if (errors) {
        errors.forEach(error => setAlert(error.msg, 'danger'))
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
      <button type="submit" className="btn btn-primary">
        {t('signUp')}
        <Ripple />
      </button>
    </FadeInRightForm>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register)
