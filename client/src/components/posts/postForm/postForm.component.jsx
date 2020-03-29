import React, { useState, useEffect } from 'react'
import ProgressBar from './progressBar/progressBar.component'
import PostGeneralInfo from './steps/postGeneralInfo.component'
import PostMap from './steps/postMap.component'
import PostEstateInfo from './steps/postEstateInfo.component'
import PostBuidingInfo from './steps/postBuildingInfo.component'
import PostAdditionalInfo from './steps/postAdditionalInfo.component'
import PostPrice from './steps/postPrice.component'
import PostPhotos from './steps/postPhotos.component'
import PostContact from './steps/postContact.component'
import { connect } from 'react-redux'
import { addPost } from '../../../actions/post'
import { toastr } from 'react-redux-toastr'
import SuccessIcon from '../../layout/icons/successIcon.component'
import Ripple from '../../layout/ripple/ripple.component'
import ButtonSpinner from '../../layout/spinner/buttonSpinner.component'
import PropTypes from 'prop-types'

import './postForm.style.scss'

const PostForm = ({ addPost, loading, history }) => {
  const [formData, setFormData] = useState({
    userType: '',
    city: '',
    district: '',
    address: '',
    lat: 40.40926169999999,
    lng: 49.8670924,
    estateType: '',
    rooms: 0,
    sqm: 0,
    livingRoomsSqm: 0,
    kitchenSqm: 0,
    floor: 0,
    totalFloors: 0,
    maintenance: '',
    redevelopment: false,
    ceilingHeight: 0,
    yearBuild: 0,
    elevator: false,
    parkingLot: false,
    documented: false,
    onKredit: false,
    balcony: false,
    bathroomType: '',
    windows: 0,
    frontWindow: false,
    rearWindow: false,
    furniture: false,
    kitchenFurniture: false,
    cctv: false,
    phone: false,
    internet: false,
    electricity: false,
    gas: false,
    water: false,
    heating: false,
    tv: false,
    conditioner: false,
    washingMachine: false,
    dishwasher: false,
    refrigerator: false,
    description: '',
    price: 0,
    bargain: false,
    progressPayment: false,
    contact: ''
  })

  const [step, setStep] = useState({ currentStep: 0, totalSteps: 7 })
  const { currentStep, totalSteps } = step

  const [files, setFiles] = useState([])

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  const onSubmit = async e => {
    e.preventDefault()

    const data = new FormData()
    Object.keys(formData).forEach(key => data.append(key, formData[key]))
    data.append('photos', files[0])

    const post = await addPost(data)

    if (post) {
      const toastrOptions = {
        timeOut: 0,
        icon: <SuccessIcon />,
        status: 'info'
      }
      toastr.light('Success', 'Your post is published', toastrOptions)
      history.push('/')
    }
  }

  const onChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value === '' ? 0 : value, 10) : value
    })
  }

  const stepChange = (e, inc = false) => {
    e.preventDefault()
    let newStep = inc ? step.currentStep + 1 : step.currentStep - 1
    newStep = Math.max(newStep, 0)
    setStep({
      ...step,
      currentStep: newStep
    })
  }

  const renderSwitch = () => {
    switch (step.currentStep) {
      case 1:
        return <PostMap formData={formData} setFormData={setFormData} />
      case 2:
        return <PostEstateInfo formData={formData} onChange={onChange} />
      case 3:
        return <PostBuidingInfo formData={formData} onChange={onChange} />
      case 4:
        return <PostAdditionalInfo formData={formData} onChange={onChange} />
      case 5:
        return <PostPrice formData={formData} onChange={onChange} />
      case 6:
        return <PostPhotos files={files} setFiles={setFiles} />
      case 7:
        return <PostContact formData={formData} onChange={onChange} />
      case 0:
      default:
        return <PostGeneralInfo formData={formData} onChange={onChange} />
    }
  }

  return (
    <div className="container px-4" style={{ maxWidth: '1000px' }}>
      <ProgressBar step={step} />
      <form onSubmit={e => onSubmit(e)}>
        {renderSwitch()}
        <div className="form-button-box">
          {/* Back */}

          <button
            className="btn btn-secondary"
            onClick={e => stepChange(e)}
            disabled={loading}
            style={{ visibility: currentStep === 0 ? 'hidden' : 'visible' }}
          >
            Back
            <Ripple />
          </button>

          {/* Next / Submit */}
          {currentStep === totalSteps ? (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Submit
              {loading && (
                <ButtonSpinner
                  style={{
                    width: '20px',
                    marginLeft: '4px',
                    transition: 'all 0.3s ease-in-out'
                  }}
                />
              )}
              <Ripple />
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={e => stepChange(e, true)}
            >
              Next
              <Ripple />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loading: state.async.loading
})

export default connect(mapStateToProps, { addPost })(PostForm)
