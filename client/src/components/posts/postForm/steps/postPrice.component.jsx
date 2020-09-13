import React, { Fragment } from 'react'
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
  const {
    dealType,
    price,
    bargain,
    progressPayment,
    prepayment,
    municipalServices
  } = postForm

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
      [name]:
        type === 'number'
          ? parseInt(fieldValue === '' ? 0 : fieldValue, 10)
          : fieldValue
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
    decimalSymbol: ',',
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
      {dealType === 'sale' ? (
        // Progress payment
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
      ) : (
        <Fragment>
          {/* Prepayment */}
          <Checkbox
            label={t('createPost.price.prepayment')}
            showFieldName={true}
            options={{
              name: 'prepayment',
              id: 'prepayment',
              checked: prepayment
            }}
            onChange={onChange}
          />
          {/* Municipal services */}
          <Checkbox
            label={t('createPost.price.municipalServices')}
            showFieldName={true}
            options={{
              name: 'municipalServices',
              id: 'municipalServices',
              checked: municipalServices
            }}
            onChange={onChange}
          />
        </Fragment>
      )}
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
