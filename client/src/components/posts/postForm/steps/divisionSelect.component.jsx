import React, { useState } from 'react'
import { connect } from 'react-redux'
import Regions from '../../../layout/regions/regions.component'
import ReactModal from 'react-modal'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const DivisionSelect = ({ city, district, subdistrict }) => {
  const [openModal, setOpenModal] = useState(false)

  const [t] = useTranslation()

  const getFullAddress = () => {
    if (subdistrict.id !== '')
      return `${city.name}, ${district.name}, ${subdistrict.name}`
    if (district.id !== '') return `${city.name}, ${district.name}`
    if (city.id !== '') return `${city.name}`
    return t('createPost.mapInfo.selectHint')
  }

  const buttonText = city
    ? 'createPost.mapInfo.change'
    : 'createPost.mapInfo.select'

  return (
    <div>
      <div className="address-wrapper">
        <div className="lead">{getFullAddress()}</div>
        <button
          className="btn btn-primary btn-md"
          onClick={() => setOpenModal(true)}
        >
          {t(buttonText)}
        </button>
      </div>
      <ReactModal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <Regions handleCloseModal={() => setOpenModal(false)} />
      </ReactModal>
    </div>
  )
}

DivisionSelect.propTypes = {
  city: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  subdistrict: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  city: state.post.postForm.city,
  district: state.post.postForm.district,
  subdistrict: state.post.postForm.subdistrict
})

export default connect(mapStateToProps)(DivisionSelect)
