import React from 'react'
import SwitchInput from '../../../layout/form/switch/switchInput.component'
import SelectInput from '../../../layout/form/select/selectInput.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostGeneralInfo = ({ formData, onChange }) => {
  const { city, district, userType, estateType } = formData

  const [t] = useTranslation()

  const userTypeOptions = [
    {
      input: {
        id: 'owner',
        name: 'userType',
        type: 'radio',
        value: 'owner',
        checked: userType === 'owner',
      },
      label: t('createPost.generalInfo.owner'),
    },
    {
      input: {
        id: 'agent',
        name: 'userType',
        type: 'radio',
        value: 'agent',
        checked: userType === 'agent',
      },
      label: t('createPost.generalInfo.agent'),
    },
  ]

  const estateTypeOptions = [
    {
      input: {
        id: 'apartment',
        name: 'estateType',
        type: 'radio',
        value: 'apartment',
        checked: estateType === 'apartment',
      },
      label: t('createPost.generalInfo.apartment'),
    },
    {
      input: {
        id: 'house',
        name: 'estateType',
        type: 'radio',
        value: 'house',
        checked: estateType === 'house',
      },
      label: t('createPost.generalInfo.house'),
    },
  ]

  const cityOptions = [
    {
      input: { id: 'baku', name: 'city', type: 'radio', value: 'Baku' },
      label: 'Baku',
    },
    {
      input: { id: 'ganja', name: 'city', type: 'radio', value: 'Ganja' },
      label: 'Ganja',
    },
  ]

  const districtOptions = [
    {
      input: {
        id: 'icheri-sheher',
        name: 'district',
        type: 'radio',
        value: 'Icheri Sheher',
      },
      label: 'Icheri Sheher',
    },
    {
      input: {
        id: 'sabunchu',
        name: 'district',
        type: 'radio',
        value: 'Sabunchu',
      },
      label: 'Sabunchu',
    },
  ]

  return (
    <FadeInDiv className="px-4">
      <h3 className="step-title my-1">{t('createPost.generalInfo.title')}</h3>
      {/* User type */}
      <SwitchInput
        fieldName={t('createPost.generalInfo.userType')}
        options={userTypeOptions}
        onChange={onChange}
      />
      {/* Estate type */}
      <SwitchInput
        fieldName={t('createPost.generalInfo.estateType')}
        options={estateTypeOptions}
        onChange={onChange}
      />
      {/* City */}
      <SelectInput
        fieldName={t('createPost.generalInfo.city')}
        options={cityOptions}
        placeholder={city ? city : t('createPost.generalInfo.cityField')}
        onChange={onChange}
      />
      {/* District */}
      <SelectInput
        fieldName={t('createPost.generalInfo.district')}
        options={districtOptions}
        placeholder={
          district ? district : t('createPost.generalInfo.districtField')
        }
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostGeneralInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostGeneralInfo
