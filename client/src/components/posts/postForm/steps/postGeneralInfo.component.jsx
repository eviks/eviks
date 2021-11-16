import React from 'react'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
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

const PostGeneralInfo = ({
  postForm: { userType, estateType, apartmentType, dealType },
  updatePostFormAttributes,
  validationErrors
}) => {
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

  const apartmentTypeOptions = [
    {
      input: {
        id: 'newBuilding',
        name: 'apartmentType',
        type: 'radio',
        value: 'newBuilding',
        checked: apartmentType === 'newBuilding'
      },
      label: t('createPost.generalInfo.newBuilding')
    },
    {
      input: {
        id: 'resale',
        name: 'apartmentType',
        type: 'radio',
        value: 'resale',
        checked: apartmentType === 'resale'
      },
      label: t('createPost.generalInfo.resale')
    }
  ]

  const dealTypeOptions = [
    {
      input: {
        id: 'sale',
        name: 'dealType',
        type: 'radio',
        value: 'sale',
        checked: dealType === 'sale'
      },
      label: t('createPost.generalInfo.sale')
    },
    {
      input: {
        id: 'rent',
        name: 'dealType',
        type: 'radio',
        value: 'rent',
        checked: dealType === 'rent'
      },
      label: t('createPost.generalInfo.rent')
    },
    {
      input: {
        id: 'rentPerDay',
        name: 'dealType',
        type: 'radio',
        value: 'rentPerDay',
        checked: dealType === 'rentPerDay'
      },
      label: t('createPost.generalInfo.rentPerDay')
    }
  ]

  const onEstateTypeChange = e => {
    const value = e.target.value
    const newAttributes = { estateType: value }
    if (value === 'house') newAttributes.apartmentType = ''
    updatePostFormAttributes(newAttributes)
  }

  const onDealTypeChange = e => {
    const value = e.target.value
    const newAttributes = { dealType: value }
    if (value === 'sale') {
      newAttributes.kidsAllowed = false
      newAttributes.petsAllowed = false
      newAttributes.prepayment = false
      newAttributes.municipalServicesIncluded = false
    }
    updatePostFormAttributes(newAttributes)
  }

  return (
    <FadeInDiv className="px-4">
      <h3 className="step-title my-1">{t('createPost.generalInfo.title')}</h3>
      {/* User type */}
      <SwitchInput
        fieldName={t('createPost.generalInfo.userType')}
        options={userTypeOptions}
        onChange={e => updatePostFormAttributes({ userType: e.target.value })}
        error={validationErrors.userType}
      />
      {/* Estate type */}
      <SwitchInput
        fieldName={t('createPost.generalInfo.estateType')}
        options={estateTypeOptions}
        onChange={onEstateTypeChange}
        error={validationErrors.estateType}
      />
      {/* Apartment type */}
      {estateType === 'apartment' && (
        <SwitchInput
          fieldName={t('createPost.generalInfo.apartmentType')}
          options={apartmentTypeOptions}
          onChange={e =>
            updatePostFormAttributes({ apartmentType: e.target.value })
          }
          error={validationErrors.apartmentType}
        />
      )}
      {/* Deal type */}
      <SwitchInput
        fieldName={t('createPost.generalInfo.dealType')}
        options={dealTypeOptions}
        onChange={onDealTypeChange}
        error={validationErrors.dealType}
      />
    </FadeInDiv>
  )
}

PostGeneralInfo.propTypes = {
  postForm: PropTypes.object.isRequired,
  validationErrors: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm,
  validationErrors: state.post.validationErrors
})

export default connect(mapStateToProps, { updatePostFormAttributes })(
  PostGeneralInfo
)
