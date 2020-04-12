import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import Auth from '../../auth/auth.component'
import ReactModal from 'react-modal'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './navbar.style.scss'

const Navbar = ({ auth: { isAuthenticated, loading }, logout, navRef }) => {
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
    <Fragment>
      <li>
        <Link to="/">
          <i className="fas fa-heart"></i> {t('navbar.favorites')}
        </Link>
      </li>
      <li>
        <Link to="/">
          <i className="fas fa-user"></i> {t('navbar.myAccount')}
        </Link>
      </li>
      <li>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> {t('navbar.logout')}
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <li>
      <Link to="" onClick={() => handleOpenModal()}>
        <i className="fas fa-sign-in-alt"></i> {t('navbar.joinOrSignIn')}
      </Link>
    </li>
  )

  return (
    <Fragment>
      <nav className="navbar" id="navbar" ref={navRef}>
        <h1>
          <Link to="/">
            {' '}
            <span className="text-primary">
              {' '}
              <i className="fas fa-home"></i> Eviks{' '}
            </span>
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
        <Auth handleCloseModal={handleCloseModal} showOverlay={true} />
      </ReactModal>
    </Fragment>
  )
}

logout.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
