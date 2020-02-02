import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../auth/auth.component'
import ReactModal from 'react-modal'
import './navbar.styles.scss'

const Navbar = () => {
  const [state, setState] = useState({ showAuthModal: false })
  const { showAuthModal } = state

  const handleOpenModal = () => {
    setState({ showAuthModal: true })
  }

  const handleCloseModal = () => {
    setState({ showAuthModal: false })
  }

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
          <li>
            <Link to="" onClick={() => handleOpenModal()}>
              Sign in or Join
            </Link>
          </li>
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

export default Navbar
