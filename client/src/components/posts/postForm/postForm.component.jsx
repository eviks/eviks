import React, { useState } from 'react'
import PostGeneralInfo from './steps/postGeneralInfo.component'
import PostEstateInfo from './steps/postEstateInfo.component'
import PostAdditionalInfo from './steps/postAdditionalInfo.component'
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

  const onSubmit = e => {
    e.preventDefault()
    addPost(formData)
  }

  const onChange = e => {
    const { name, type } = e.target
    const value = type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value, 10) : value
    })
  }

  return (
    <div className="container px-4">
      <h1 className="text-primary">Create add</h1>
      <form onSubmit={e => onSubmit(e)}>
        <PostGeneralInfo formData={formData} onChange={onChange} />
        <PostEstateInfo formData={formData} onChange={onChange} />
        <PostAdditionalInfo formData={formData} onChange={onChange} />
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
