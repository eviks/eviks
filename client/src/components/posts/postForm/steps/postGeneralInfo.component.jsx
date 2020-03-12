import React, { Fragment } from 'react'
import SwitchInput from '../../../layout/form/switch/switchInput.component'
import SelectInput from '../../../layout/form/select/selectInput.component'
import PropTypes from 'prop-types'

const PostGeneralInfo = ({ formData, setFormData }) => {
  const { city, district, address } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const userTypeOptions = [
    {
      input: { id: 'owner', name: 'userType', type: 'radio', value: 'owner' },
      label: 'Owner'
    },
    {
      input: { id: 'agent', name: 'userType', type: 'radio', value: 'agent' },
      label: 'Agent'
    }
  ]

  const estateTypeOptions = [
    {
      input: {
        id: 'apartment',
        name: 'estateType',
        type: 'radio',
        value: 'apartment'
      },
      label: 'Apartment'
    },
    {
      input: { id: 'house', name: 'estateType', type: 'radio', value: 'house' },
      label: 'House'
    }
  ]

  const cityOptions = [
    {
      input: { id: 'baku', name: 'city', type: 'radio', value: 'Baku' },
      label: 'Baku'
    },
    {
      input: { id: 'ganja', name: 'city', type: 'radio', value: 'Ganja' },
      label: 'Ganja'
    }
  ]

  const districtOptions = [
    {
      input: {
        id: 'icheri-sheher',
        name: 'district',
        type: 'radio',
        value: 'Icheri Sheher'
      },
      label: 'Icheri Sheher'
    },
    {
      input: {
        id: 'sabunchu',
        name: 'district',
        type: 'radio',
        value: 'Sabunchu'
      },
      label: 'Sabunchu'
    }
  ]

  return (
    <Fragment>
      <h3 className="my-1">General information</h3>
      {/* User type */}
      <SwitchInput
        fieldName={'Who are you?'}
        options={userTypeOptions}
        onChange={onChange}
      />
      {/* Estate type */}
      <SwitchInput
        fieldName={'Estate type'}
        options={estateTypeOptions}
        onChange={onChange}
      />
      {/* City */}
      <SelectInput
        fieldName={'City'}
        options={cityOptions}
        placeholder={city ? city : 'Choose your city'}
        onChange={onChange}
      />
      {/* District */}
      <SelectInput
        fieldName={'District'}
        options={districtOptions}
        placeholder={district ? district : 'Choose your district'}
        onChange={onChange}
      />
      {/* Address */}
      <div className="field">
        <div className="field-name">Address</div>
        <input
          className="input-field"
          type="text"
          name="address"
          value={address}
          onChange={e => onChange(e)}
        />
      </div>
    </Fragment>
  )
}

PostGeneralInfo.propTypes = {
  generalInfo: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired
}

export default PostGeneralInfo
