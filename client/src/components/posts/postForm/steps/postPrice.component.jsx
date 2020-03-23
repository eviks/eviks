import React from 'react'
import Input from '../../../layout/form/input/input.component'
import Checkbox from '../../../layout/form/checkbox/checkbox.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostPrice = ({ formData, onChange }) => {
  const { price, bargain, progressPayment } = formData

  return (
    <FadeInDiv>
      <h3 className="my-1">Prices</h3>
      {/* Price */}
      <Input
        fieldName={'Price'}
        options={{
          type: 'number',
          name: 'price',
          value: price === 0 ? '' : price,
          min: '0',
          style: { width: '120px' }
        }}
        onChange={onChange}
      />
      {/* Bargain */}
      <Checkbox
        label={'Bargain'}
        showFieldName={true}
        options={{ name: 'bargain', id: 'bargain', checked: bargain }}
        onChange={onChange}
      />
      {/* Progress payment */}
      <Checkbox
        label={'Progress payment'}
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
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PostPrice
