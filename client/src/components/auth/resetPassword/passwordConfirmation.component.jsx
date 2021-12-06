import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../layout/form/input/input.component';
import Ripple from '../../layout/ripple/ripple.component';
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component';
import { connect } from 'react-redux';
import { checkResetPasswordToken, resetPassword } from '../../../actions/auth';
import Spinner from '../../layout/spinner/spinner.component';
import { SvgPadlock } from '../../layout/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import '../auth.style.scss';

const PasswordConfirmation = ({
  checkResetPasswordToken,
  resetPassword,
  validResetPasswordToken,
  loading,
  locale,
  match,
  history,
}) => {
  const resetPasswordToken = match.params.resetPasswordToken;

  useEffect(() => {
    checkResetPasswordToken(resetPasswordToken);
  }, [
    match.params.resetPasswordToken,
    checkResetPasswordToken,
    resetPasswordToken,
  ]);

  const [initialLoading, setInitialLoading] = useState(true);
  const [form, setForm] = useState({ password: '', passwordConfirm: '' });
  const [isValid, setValidation] = useState(false);
  const { password, passwordConfirm } = form;

  useEffect(() => setInitialLoading(false), [setInitialLoading]);

  useEffect(() => {
    setValidation(password.length >= 6 && password === passwordConfirm);
  }, [password, passwordConfirm, setValidation]);

  const [t] = useTranslation();

  if (loading || initialLoading || validResetPasswordToken == null)
    return (
      <div className="container container-center">
        <Spinner style={{ width: '50px', marginBottom: '10rem' }} />
      </div>
    );

  // If token is invalid return to reset-password page
  if (!validResetPasswordToken)
    return (
      <Redirect
        to={{
          pathname: `/${locale}/reset_password`,
          state: { showAlert: true },
        }}
      />
    );

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    resetPassword(resetPasswordToken, password, passwordConfirm, history);
  };

  return (
    <div
      className="container container-center"
      style={{ textAlign: 'inherit' }}
    >
      <form
        className="new-password-form shadow-border"
        onSubmit={(e) => onSubmit(e)}
      >
        <h1 className="my-1">{t('auth.resetPassword.changePasswordTitle')}</h1>
        <Input
          mask={false}
          fieldName={
            <Fragment>
              <SvgPadlock /> {t('auth.resetPassword.newPassword')}
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
        <Input
          mask={false}
          fieldName={
            <Fragment>
              <SvgPadlock /> {t('auth.resetPassword.passwordConfirm')}
            </Fragment>
          }
          options={{
            type: 'password',
            name: 'passwordConfirm',
            value: passwordConfirm,
          }}
          main={true}
          onChange={onChange}
        />
        <button
          type="submit"
          className={`btn btn-primary ${
            (loading || initialLoading) && 'btn-loading'
          }`}
          disabled={loading || initialLoading || !isValid}
        >
          {t('auth.resetPassword.changePassword')}
          {(loading || initialLoading) && <ButtonSpinner />}
          <Ripple />
        </button>
      </form>
    </div>
  );
};

PasswordConfirmation.propTypes = {
  loading: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  validResetPasswordToken: PropTypes.bool,
  checkResetPasswordToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.async.loading,
  locale: state.locale.locale,
  validResetPasswordToken: state.auth.validResetPasswordToken,
});

export default connect(mapStateToProps, {
  checkResetPasswordToken,
  resetPassword,
})(PasswordConfirmation);
