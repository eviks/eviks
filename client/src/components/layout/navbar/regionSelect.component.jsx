import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import Regions from '../regions/regions.component'
import PropTypes from 'prop-types'

const RegionSelect = ({ currentRegion }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Fragment>
      <button
        className="region-select text-secondary medium link"
        onClick={() => setOpenModal(true)}
      >
        <i className="fas fa-map-marker-alt"></i> {currentRegion.city.name}
      </button>
      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <Regions
          citySelectMode={true}
          handleCloseModal={() => setOpenModal(false)}
        />
      </ReactModal>
    </Fragment>
  )
}

RegionSelect.propTypes = {
  currentRegion: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  currentRegion: state.region.currentRegion
})

export default connect(mapStateToProps)(RegionSelect)
