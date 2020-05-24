import React from 'react'
import Input from '../../../layout/form/input/input.component'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
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

  const priceMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 0, // how many digits allowed after the decimal
    integerLimit: 15, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
  })

  return (
    <FadeInDiv className="px-4">
      <h3 className="step-title my-1">{t('createPost.price.title')}</h3>
      {/* Price */}
      <Input
        fieldName={t('createPost.price.price')}
        mask={priceMask}
        options={{
          type: 'text',
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
