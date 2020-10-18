import React, { useState } from 'react'
import { connect } from 'react-redux'
import Localities from '../../../layout/localities/localities.component'
import ReactModal from 'react-modal'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const LocalitySelect = ({ city, district, subdistrict }) => {
  const [openModal, setOpenModal] = useState(false)

  const [t] = useTranslation()

  const getFullAddress = () => {
    if (subdistrict) return `${city}, ${district}, ${subdistrict}`
    if (district) return `${city}, ${district}`
    if (city) return `${city}`
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
        <Localities handleCloseModal={() => setOpenModal(false)} />
      </ReactModal>
    </div>
  )
}

LocalitySelect.propTypes = {
  city: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  subdistrict: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  city: state.post.postForm.city,
  district: state.post.postForm.district,
  subdistrict: state.post.postForm.subdistrict
})

export default connect(mapStateToProps)(LocalitySelect)
