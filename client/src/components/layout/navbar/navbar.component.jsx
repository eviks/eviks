import React, { Fragment, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import Auth from '../../auth/auth.component';
import LocalitySelect from './localitySelect.component';
import DropdownMenu from '../dropdownMenu/dropdownMenu.component';
import MenuButton from '../menuButton/menuButton.component';
import {
  SvgHeart,
  SvgUser,
  SvgSettings,
  SvgLogo,
  SvgSignOut,
  SvgSignIn,
} from '../icons';
import ReactModal from 'react-modal';
import LocalizedLink from '../../../components/localization/LocalizedLink.component';
import { locales } from '../../../config/i18n';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import './navbar.style.scss';

const Navbar = ({
  auth: { isAuthenticated, loading, user },
  logout,
  navRef,
}) => {
  const ulRef = useRef(null);

  const [state, setState] = useState({ showAuthModal: false });
  const [showMenu, toggleMenu] = useState(false);
  const [showDropdownMenu, toggleDropdownMenu] = useState(false);
  const [t] = useTranslation();
  const { showAuthModal } = state;
  const location = useLocation();

  const handleOpenModal = () => {
    setState({ showAuthModal: true });
  };

  const handleCloseModal = () => {
    setState({ showAuthModal: false });
  };

  const handleMenuToggle = () => {
    const newValue = !showMenu;
    toggleMenu(newValue);
    if (newValue && ulRef) disableBodyScroll(ulRef.current);
    if (!newValue && ulRef) enableBodyScroll(ulRef.current);
  };

  const closeDropdownMenu = () => toggleDropdownMenu(false);

  const dropdownOptions = [
    <LocalizedLink
      className="link"
      to={`/users/${user && user.username}`}
      onClick={closeDropdownMenu}
    >
      <SvgUser className="mr-1" />
      {t('userMenu.titles.profile')}
    </LocalizedLink>,
    <LocalizedLink
      className="link"
      to={'/settings'}
      onClick={closeDropdownMenu}
    >
      <SvgSettings className="mr-1" />
      {t('userMenu.titles.settings')}
    </LocalizedLink>,
    <a
      className="link"
      href="#!"
      onClick={() => {
        closeDropdownMenu();
        logout();
      }}
    >
      <SvgSignOut className="mr-1" />
      {t('navbar.logout')}
    </a>,
  ];

  const authLinks = (
    <Fragment>
      <li>
        <LocalizedLink className="link" to={'/favorites'}>
          <SvgHeart /> {t('navbar.favorites')}
        </LocalizedLink>
      </li>
      <DropdownMenu
        isOpen={showDropdownMenu}
        label={
          <button
            className="link"
            onClick={() => toggleDropdownMenu(!showDropdownMenu)}
          >
            <SvgUser /> {user && user.displayName}
          </button>
        }
        menuOptions={dropdownOptions}
        onRequestClose={closeDropdownMenu}
      />
    </Fragment>
  );

  const guestLinks = location.pathname !== '/auth' && (
    <li>
      <button className="link" onClick={() => handleOpenModal()}>
        <SvgSignIn /> {t('navbar.joinOrSignIn')}
      </button>
    </li>
  );

  return (
    <Fragment>
      <nav className="navbar light-shadow-border px-05 py-2" ref={navRef}>
        <div className="navbar-left-block">
          <MenuButton onClick={handleMenuToggle} />
          <LocalitySelect />
        </div>
        <div className="logo">
          <LocalizedLink to={'/'}>
            {' '}
            <span className="lead-2x lead-bold text-primary">
              {' '}
              <SvgLogo /> Eviks{' '}
            </span>
          </LocalizedLink>
        </div>
        <div className="navbar-right-block">
          <ul className={showMenu ? 'checked' : ''} ref={ulRef}>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
            <ul className="lang">
              {locales.map((element, index) => (
                <li key={index}>
                  <Link to={`/${element.code}`}>
                    {element.code.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
        </div>
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
  );
};

logout.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
