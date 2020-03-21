import React, { useState } from 'react'
import ProgressBar from './progressBar/progressBar.component'
import PostGeneralInfo from './steps/postGeneralInfo.component'
import PostMap from './steps/postMap.component'
import PostEstateInfo from './steps/postEstateInfo.component'
import PostAdditionalInfo from './steps/postAdditionalInfo.component'
import Ripple from '../../layout/ripple/ripple.component'
import { connect } from 'react-redux'
import { addPost } from '../../../actions/post'
import PropTypes from 'prop-types'

import './postForm.style.scss'

const PostForm = ({ addPost }) => {
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
    yearBuild: null,
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

  const [step, setStep] = useState({ currentStep: 0, totalSteps: 8 })
  const { currentStep, totalSteps } = step

  const onSubmit = e => {
    e.preventDefault()
    addPost(formData)
  }

  const onChange = e => {
    console.log(e)
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value, 10) : value
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
      case 0:
        return <PostGeneralInfo formData={formData} onChange={onChange} />
      case 1:
        return <PostMap formData={formData} setFormData={setFormData} />
      case 2:
        return <PostEstateInfo formData={formData} onChange={onChange} />
      case 4:
        return <PostAdditionalInfo formData={formData} onChange={onChange} />
      default:
        return <PostGeneralInfo formData={formData} onChange={onChange} />
    }
  }

  return (
    <div className="container px-4">
      <ProgressBar step={step} />
      <form onSubmit={e => onSubmit(e)}>
        {renderSwitch()}
        <button className="btn btn-secondary" onClick={e => stepChange(e)}>
          Back
          <Ripple />
        </button>
        {currentStep === totalSteps ? (
          <button
            className="btn btn-primary"
            onClick={e => stepChange(e, true)}
          >
            Submit
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
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
