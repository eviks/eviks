import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateUser, deleteUser } from '../../../../actions/auth'
import { toastr } from 'react-redux-toastr'
import { Player } from '@lottiefiles/react-lottie-player'
import successAnimation from '../../../../assets/lottiefilesSources/success.json'
import Input from '../../../layout/form/input/input.component'
import Ripple from '../../../layout/ripple/ripple.component'
import ButtonSpinner from '../../../layout/spinner/buttonSpinner.component'
import DeleteUserMessage from './deleteUserMessage/deleteUserMessage.component'
import ReactModal from 'react-modal'
import { useTranslation } from 'react-i18next'
import {
  validationAttributeOnChange,
  validationOnSubmit,
} from '../../../../services/formValidation/validationEvents'
import PropTypes from 'prop-types'

import './settings.style.scss'

const Settings = ({ updateUser, deleteUser, currentDisplayName, loading }) => {
  const history = useHistory()

  const [state, setState] = useState({
    displayName: currentDisplayName,
    password: '',
    passwordConfirmation: '',
    validationErrors: {},
  })

  const [showModal, setShowModal] = useState(false)

  const {
    displayName,
    password,
    passwordConfirmation,
    validationErrors,
  } = state

  const onChange = (event) => {
    validationAttributeOnChange(
      'USER_SETTINGS',
      event.target.name,
      event.target.value,
      state,
      setState
    )
  }

  const submitForm = async (event) => {
    event.preventDefault()

    const formIsValid = validationOnSubmit('USER_SETTINGS', state, setState)

    if (!formIsValid) {
      return
    }

    try {
      const result = await updateUser({ displayName, password })
      if (result) {
        const toastrOptions = {
          timeOut: 0,
          icon: (
            <Player
              autoplay
              loop={true}
              src={successAnimation}
              style={{ height: '70px', width: '70px' }}
            />
          ),
          status: 'info',
        }
        toastr.light(
          t('userMenu.updateUserTitle'),
          t('userMenu.updateUser'),
          toastrOptions
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteConfirm = async () => {
    setShowModal(false)
    try {
      const result = await deleteUser()
      if (result) history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const [t] = useTranslation()

  return (
    <Fragment>
      <form onSubmit={submitForm}>
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
              type="submit"
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
      </form>
      <div className="my-2">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="link text-secondary"
          disabled={loading}
        >
          <i className="fas fa-trash"></i> {t('userMenu.deleteUser')}
        </button>
        <ReactModal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <DeleteUserMessage
            onOk={onDeleteConfirm}
            onCancel={() => setShowModal(false)}
          />
        </ReactModal>
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  currentDisplayName: state.auth.user.displayName,
  loading: state.async.loading,
})

Settings.propTypes = {
  currentDisplayName: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

export default connect(mapStateToProps, { updateUser, deleteUser })(Settings)
