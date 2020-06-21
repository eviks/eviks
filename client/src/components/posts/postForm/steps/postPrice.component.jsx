import React from 'react'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
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

const PostPrice = ({
  postForm,
  updatePostFormAttributes,
  validationErrors
}) => {
  const { price, bargain, progressPayment } = postForm

  const onChange = event => {
    let { name, type, value } = event.target

    let fieldValue
    if (name === 'price') {
      type = 'number'
      fieldValue = value.replace(/\s/g, '').replace(/AZN/g, '')
    } else {
      fieldValue = type === 'checkbox' ? event.target.checked : value
    }

    const newAttributes = {
      [name]: parseInt(fieldValue === '' ? 0 : fieldValue, 10)
    }

    updatePostFormAttributes(newAttributes)
  }

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
    allowLeadingZeroes: false
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
          min: '0'
        }}
        onChange={onChange}
        error={validationErrors.price}
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
          checked: progressPayment
        }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostPrice.propTypes = {
  postForm: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm,
  validationErrors: state.post.validationErrors
})

export default connect(mapStateToProps, { updatePostFormAttributes })(PostPrice)
