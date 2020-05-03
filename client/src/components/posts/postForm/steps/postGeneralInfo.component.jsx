import React from 'react'
import SwitchInput from '../../../layout/form/switch/switchInput.component'
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
  const { userType, estateType } = formData

  const [t] = useTranslation()

  const userTypeOptions = [
    {
      input: {
        id: 'owner',
        name: 'userType',
        type: 'radio',
        value: 'owner',
        checked: userType === 'owner'
      },
      label: t('createPost.generalInfo.owner')
    },
    {
      input: {
        id: 'agent',
        name: 'userType',
        type: 'radio',
        value: 'agent',
        checked: userType === 'agent'
      },
      label: t('createPost.generalInfo.agent')
    }
  ]

  const estateTypeOptions = [
    {
      input: {
        id: 'apartment',
        name: 'estateType',
        type: 'radio',
        value: 'apartment',
        checked: estateType === 'apartment'
      },
      label: t('createPost.generalInfo.apartment')
    },
    {
      input: {
        id: 'house',
        name: 'estateType',
        type: 'radio',
        value: 'house',
        checked: estateType === 'house'
      },
      label: t('createPost.generalInfo.house')
    }
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
    </FadeInDiv>
  )
}

PostGeneralInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PostGeneralInfo
