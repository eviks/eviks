import React from 'react'
import Input from '../../../layout/form/input/input.component'
import Checkbox from '../../../layout/form/checkbox/checkbox.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostPrice = ({ formData, onChange }) => {
  const { price, bargain, progressPayment } = formData

  const [t] = useTranslation()

  return (
    <FadeInDiv>
      <h3 className="step-title my-1">{t('createPost.price.title')}</h3>
      {/* Price */}
      <Input
        fieldName={t('createPost.price.price')}
        options={{
          type: 'number',
          name: 'price',
          value: price === 0 ? '' : price,
          min: '0',
          style: { width: '120px' },
        }}
        onChange={onChange}
      />
      {/* Bargain */}
      <Checkbox
        label={t('createPost.price.bargain')}
        showFieldName={true}
        options={{ name: 'bargain', id: 'bargain', checked: bargain }}
        onChange={onChange}
      />
      {/* Progress payment */}
      <Checkbox
        label={t('createPost.price.progressPayment')}
        showFieldName={true}
        options={{
          name: 'progressPayment',
          id: 'progressPayment',
          checked: progressPayment,
        }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostPrice.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostPrice
