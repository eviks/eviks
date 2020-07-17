import React, { useState } from 'react'
import Division from '../../../layout/division/division.component'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

const DivisionSelect = ({ changeMapCenter }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>Select</button>
      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <Division
          handleCloseModal={() => setOpenModal(false)}
          changeMapCenter={changeMapCenter}
        />
      </ReactModal>
    </div>
  )
}

DivisionSelect.propTypes = {
  changeMapCenter: PropTypes.func.isRequired
}

export default DivisionSelect
