import React, { Fragment, useState, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../actions/auth'
import Auth from '../../auth/auth.component'
import LocalitySelect from './localitySelect.component'
import DropdownMenu from '../dropdownMenu/dropdownMenu.component'
import MenuButton from '../menuButton/menuButton.component'
import ReactModal from 'react-modal'
import LocalizedLink from '../../../LocalizedLink'
import { locales } from '../../../config/i18n'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './navbar.style.scss'

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  navRef,
}) => {
  const ulRef = useRef(null)

  const [state, setState] = useState({ showAuthModal: false })
  const [showMenu, toggleMenu] = useState(false)
  const [t] = useTranslation()
  const { showAuthModal } = state
  const location = useLocation()

  const handleOpenModal = () => {
    setState({ showAuthModal: true })
  }

  const handleCloseModal = () => {
    setState({ showAuthModal: false })
  }

  const handleMenuToggle = () => {
    const newValue = !showMenu
    toggleMenu(newValue)
    if (newValue && ulRef) disableBodyScroll(ulRef.current)
    if (!newValue && ulRef) enableBodyScroll(ulRef.current)
  }

  const dropdownOptions = [
    <LocalizedLink className="link" to={`/users/${user && user._id}`}>
      <i className="fas fa-user-circle mr-1"></i>
      {t('userMenu.titles.profile')}
    </LocalizedLink>,
    <LocalizedLink className="link" to={`/users/${user && user._id}/posts`}>
      <i className="fas fa-sticky-note mr-1"></i>
      {t('userMenu.titles.posts')}
    </LocalizedLink>,
    <LocalizedLink className="link" to={'/settings'}>
      <i className="fas fa-cog mr-1"></i>
      {t('userMenu.titles.settings')}
    </LocalizedLink>,
    <a className="link" href="#!" onClick={logout}>
      <i className="fas fa-sign-out-alt"></i> {t('navbar.logout')}
    </a>,
  ]

  const authLinks = (
    <Fragment>
      <li>
        <LocalizedLink className="link" to={'/favorites'}>
          <i className="fas fa-heart"></i> {t('navbar.favorites')}
        </LocalizedLink>
      </li>
      <DropdownMenu
        label={
          <span>
            <i className="fas fa-user"></i> {user && user.displayName}
          </span>
        }
        menuOptions={dropdownOptions}
      />
    </Fragment>
  )

  const guestLinks = location.pathname !== '/auth' && (
    <li>
      <button className="link" onClick={() => handleOpenModal()}>
        <i className="fas fa-sign-in-alt"></i> {t('navbar.joinOrSignIn')}
      </button>
    </li>
  )

  return (
    <Fragment>
      <nav className="navbar light-shadow-border" id="navbar" ref={navRef}>
        <MenuButton onClick={handleMenuToggle} />
        <div className="right-block">
          <h1>
            <LocalizedLink to={'/'}>
              {' '}
              <span className="text-primary">
                {' '}
                <i className="fas fa-home"></i> Eviks{' '}
              </span>
            </LocalizedLink>
          </h1>
          <LocalitySelect />
        </div>
        <ul className={showMenu ? 'checked' : ''} ref={ulRef}>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
          <div className="lang">
            {locales.map((element, index) => (
              <li key={index}>
                <Link to={`/${element.code}`}>
                  {element.code.toUpperCase()}
                </Link>
              </li>
            ))}
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
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
