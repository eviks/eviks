import React from 'react'
import SwitchInput from '../../../layout/form/switch/switchInput.component'
import SelectInput from '../../../layout/form/select/selectInput.component'
import TextInput from '../../../layout/form/input/input.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostGeneralInfo = ({ formData, onChange }) => {
  const { city, district, address } = formData

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
    <FadeInDiv>
      <h3 className="my-1">General Information</h3>
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
      <TextInput
        fieldName={'Address'}
        options={{ name: 'address', value: address }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostGeneralInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PostGeneralInfo
