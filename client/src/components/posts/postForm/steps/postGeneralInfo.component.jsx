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
  userType,
  estateType,
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
        onChange={e => updatePostFormAttributes({ estateType: e.target.value })}
        error={validationErrors.estateType}
      />
    </FadeInDiv>
  )
}

PostGeneralInfo.propTypes = {
  userType: PropTypes.string.isRequired,
  estateType: PropTypes.string.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  userType: state.post.postForm.userType,
  estateType: state.post.postForm.estateType,
  validationErrors: state.post.validationErrors
})

export default connect(mapStateToProps, { updatePostFormAttributes })(
  PostGeneralInfo
)
