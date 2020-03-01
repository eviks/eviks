import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { verifyEmail } from '../../../actions/auth'
import PropTypes from 'prop-types'

const Verification = ({ auth, match, verifyEmail }) => {
  useEffect(() => {
    const activationToken = match.params.activationToken
    verifyEmail(activationToken)
  }, [match.params.activationToken, verifyEmail])

  const { isAuthenticated } = auth

  return (
    <div className="container">
      {isAuthenticated ? (
        <h1>Мы рады, что вы с нами!</h1>
      ) : (
        <div>
          <h1>
            Что-то пошло не так...
            <span role="img" aria-label="broken heart">
              💔
            </span>
          </h1>
          <p>
            Похоже вы нажали на неверную ссылку подверждения аккаунта.
            Пожалуйста, попробуйте еще раз.
          </p>
        </div>
      )}
    </div>
  )
}

Verification.propTypes = {
  verifyEmail: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { verifyEmail })(Verification)
