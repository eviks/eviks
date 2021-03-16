import React, { useState } from 'react'
import { connect } from 'react-redux'
import Input from '../../../layout/form/input/input.component'
import Ripple from '../../../layout/ripple/ripple.component'
import ButtonSpinner from '../../../layout/spinner/buttonSpinner.component'
import { useTranslation } from 'react-i18next'
import getRequiredFields from '../../../../utils/getRequiredFields'
import attribueIsValid from '../../../../utils/attribueIsValid'
import formValidationErrors from '../../../../utils/formValidationErrors'
import getErrorMessage from '../../../../utils/getErrorMessage'
import PropTypes from 'prop-types'

import './settings.style.scss'

const Settings = ({ currentDisplayName, loading }) => {
  const [state, setState] = useState({
    displayName: currentDisplayName,
    password: '',
    passwordConfirmation: '',
    validationErrors: {},
  })

  const {
    displayName,
    password,
    passwordConfirmation,
    validationErrors,
  } = state

  const onChange = (event) => {
    const attrName = event.target.name

    const requiredFields = getRequiredFields('USER_SETTINGS')

    if (!requiredFields.includes(event.target.name)) {
      setState({
        ...state,
        [attrName]: event.target.value,
      })
      return
    }

    const updatedState = { ...state, [attrName]: event.target.value }

    const updatedValidationErrors = {
      [attrName]: !attribueIsValid(updatedState, attrName)
        ? getErrorMessage(attrName, updatedState)
        : null,
    }

    setState({
      ...state,
      [attrName]: event.target.value,
      validationErrors: { ...validationErrors, ...updatedValidationErrors },
    })
  }

  const submitForm = (event) => {
    const requiredFields = getRequiredFields('USER_SETTINGS')
    const updatedValidationErrors = formValidationErrors(state, requiredFields)
    setState({
      ...state,
      validationErrors: { ...validationErrors, ...updatedValidationErrors },
    })

    let formIsValid = true

    Object.values(updatedValidationErrors).forEach((value) => {
      if (value) formIsValid = false
    })

    if (!formIsValid) {
      return
    }
  }

  const [t] = useTranslation()

  return (
    <div>
      <h5 className="lead">
        <i className="fas fa-cog"></i> {t('userMenu.titles.settings')}
      </h5>
      <div className="form-settings">
        <div className="mt-1">
          <Input
            main
            fieldName={t('userMenu.displayName')}
            mask={false}
            options={{
              type: 'text',
              name: 'displayName',
              value: displayName,
            }}
            onChange={onChange}
            error={validationErrors.displayName}
          />
        </div>
        <div className="divider" />
        <div className="mt-1">
          <Input
            main
            fieldName={t('userMenu.password')}
            mask={false}
            options={{
              type: 'password',
              name: 'password',
              value: password,
            }}
            onChange={onChange}
            error={validationErrors.password}
          />
          <Input
            main
            fieldName={t('userMenu.passwordConfirmation')}
            mask={false}
            options={{
              type: 'password',
              name: 'passwordConfirmation',
              value: passwordConfirmation,
            }}
            onChange={onChange}
            error={validationErrors.passwordConfirmation}
          />
        </div>
        <div className="divider" />
        <div className="mt-1">
          <button
            type="button"
            onClick={submitForm}
            className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
            disabled={loading}
          >
            {t('userMenu.submit')}
            {loading && <ButtonSpinner />}
            <Ripple />
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentDisplayName: state.auth.user.displayName,
  loading: state.async.loading,
})

Settings.propTypes = {
  currentDisplayName: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

export default connect(mapStateToProps)(Settings)
