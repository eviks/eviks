import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import Localities from '../localities/localities.component'
import PropTypes from 'prop-types'

const LocalitySelect = ({ currentLocality }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Fragment>
      <button
        className="locality-select text-secondary medium link"
        onClick={() => setOpenModal(true)}
      >
        <i className="fas fa-map-marker-alt"></i> {currentLocality.city.name}
      </button>
      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <Localities
          citySelectMode={true}
          handleCloseModal={() => setOpenModal(false)}
        />
      </ReactModal>
    </Fragment>
  )
}

LocalitySelect.propTypes = {
  currentLocality: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentLocality: state.locality.currentLocality
})

export default connect(mapStateToProps)(LocalitySelect)
