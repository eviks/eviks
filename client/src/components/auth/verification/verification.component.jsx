import React, { useEffect } from 'react'
import Spinner from '../../layout/spinner/spinner.component'
import { connect } from 'react-redux'
import { verifyEmail } from '../../../actions/auth'
import { useTranslation } from 'react-i18next'
import SuccessImage from '../../../img/illustrations/success.jpg'
import QuestionImage from '../../../img/illustrations/question.jpg'
import PropTypes from 'prop-types'

const Verification = ({ verifyEmail, loading, isAuthenticated, match }) => {
  useEffect(() => {
    const activationToken = match.params.activationToken
    verifyEmail(activationToken)
  }, [match.params.activationToken, verifyEmail])

  const [t] = useTranslation()

  if (loading)
    return (
      <div className="container container-center">
        <Spinner style={{ width: '50px', marginBottom: '10rem' }} />
      </div>
    )

  return (
    <div className="container container-center">
      {isAuthenticated ? (
        <div>
          <img
            style={{ width: '400px' }}
            src={SuccessImage}
            alt="success"
          />
          <h1>
            {t('auth.verification.greeting')}
            <span role="img" aria-label="hello">
              🖐
            </span>
          </h1>
        </div>
      ) : (
        <div>
          <img
            style={{ width: '400px' }}
            src={QuestionImage}
            alt="question"
          />
          <h1>
            {t('auth.verification.error')}
            <span role="img" aria-label="broken heart">
              💔
            </span>
          </h1>
          <p>{t('auth.verification.errorDesc')}</p>
        </div>
      )}
    </div>
  )
}

Verification.propTypes = {
  verifyEmail: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  loading: state.async.loading,
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { verifyEmail })(Verification)
