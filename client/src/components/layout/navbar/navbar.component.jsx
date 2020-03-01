import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import Auth from '../../auth/auth.component'
import ReactModal from 'react-modal'
import './navbar.styles.scss'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [state, setState] = useState({ showAuthModal: false })
  const [t, i18n] = useTranslation()
  const { showAuthModal } = state

  const handleOpenModal = () => {
    setState({ showAuthModal: true })
  }

  const handleCloseModal = () => {
    setState({ showAuthModal: false })
  }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
  }

  const authLinks = (
    <li>
      <a href="#!" onClick={logout}>
        {t('logout')} <i className="fas fa-sign-out-alt"></i>
      </a>
    </li>
  )

  const guestLinks = (
    <li>
      <Link to="" onClick={() => handleOpenModal()}>
        {t('joinOrSignIn')}
      </Link>
    </li>
  )

  return (
    <Fragment>
      <nav className="navbar bg-gradient">
        <h1>
          <Link to="/">
            {' '}
            <i className="fas fa-home"></i> Eviks{' '}
          </Link>
        </h1>
        <ul>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
          <div className="lang">
            <li>
              <button onClick={() => changeLanguage('az')}>AZ</button>
            </li>
            <li>
              <button onClick={() => changeLanguage('ru')}>RU</button>
            </li>
          </div>
        </ul>
      </nav>
      <ReactModal
        isOpen={showAuthModal}
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <Auth handleCloseModal={handleCloseModal} />
      </ReactModal>
    </Fragment>
  )
}

logout.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
