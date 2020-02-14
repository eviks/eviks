import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../../actions/alert'
import Alert from '../../layout/alert/alert.component'
import styled, { keyframes } from 'styled-components'
import { fadeInRight } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const FadeInRightAnimation = keyframes`${fadeInRight}`
const FadeInRightForm = styled.form`
  animation: 0.5s ${FadeInRightAnimation};
`

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: ''
  })
  const [t] = useTranslation()
  const { displayName, email, password } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    setAlert('Error!', 'danger', 5000)
  }

  return (
    <FadeInRightForm onSubmit={e => onSubmit(e)}>
      <h1>{t('registerTitle')}</h1>
      <Alert />
      <label htmlFor="displayName">
        <i className="fas fa-user"></i> {t('displayName')}
      </label>
      <input
        className="input-field"
        type="text"
        name="displayName"
        value={displayName}
        required
        onChange={e => onChange(e)}
      />
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
      <input className="btn btn-primary" type="submit" value={t('signUp')} />
    </FadeInRightForm>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register)
