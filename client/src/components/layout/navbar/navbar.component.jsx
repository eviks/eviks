import React, { Fragment, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import Auth from '../../auth/auth.component'
import MenuButton from '../menuButton/menuButton.component'
import ReactModal from 'react-modal'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './navbar.style.scss'

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  navRef
}) => {
  const ulRef = useRef(null)

  const [state, setState] = useState({ showAuthModal: false })
  const [showMenu, toggleMenu] = useState(false)
  const [t, i18n] = useTranslation()
  const { showAuthModal } = state
  const location = useLocation()

  const handleOpenModal = () => {
    setState({ showAuthModal: true })
  }

  const handleCloseModal = () => {
    setState({ showAuthModal: false })
  }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
  }

  const handleMenuToggle = () => {
    const newValue = !showMenu
    toggleMenu(newValue)
    if (newValue && ulRef) disableBodyScroll(ulRef.current)
    if (!newValue && ulRef) enableBodyScroll(ulRef.current)
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
          <i className="fas fa-user"></i>{' '}
          {user && user.local && user.local.displayName}
        </Link>
      </li>
      <li>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> {t('navbar.logout')}
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = location.pathname !== '/auth' && (
    <li>
      <button onClick={() => handleOpenModal()}>
        <i className="fas fa-sign-in-alt"></i> {t('navbar.joinOrSignIn')}
      </button>
    </li>
  )

  return (
    <Fragment>
      <nav className="navbar light-shadow-border" id="navbar" ref={navRef}>
        <MenuButton onClick={handleMenuToggle} />
        <h1>
          <Link to="/">
            {' '}
            <span className="text-primary">
              {' '}
              <i className="fas fa-home"></i> Eviks{' '}
            </span>
          </Link>
        </h1>
        <ul className={showMenu ? 'checked' : ''} ref={ulRef}>
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
