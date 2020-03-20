import React from 'react'
import Checkbox from '../../../layout/form/checkbox/checkbox.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'

import '../postForm.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostAdditionalInfo = ({ formData, onChange }) => {
  return (
    <FadeInDiv>
      <h3 className="my-1">Additional information</h3>
      <div className="grid-container">
        <div>
          {/* Balcony */}
          <Checkbox
            label={'Balcony'}
            options={{ name: 'balcony', id: 'balcony' }}
            onChange={onChange}
          />
          {/* Furniture */}
          <Checkbox
            label={'Furniture'}
            options={{ name: 'furniture', id: 'furniture' }}
            onChange={onChange}
          />
          {/* Kitchen furniture */}
          <Checkbox
            label={'Kitchen furniture'}
            options={{ name: 'kitchenFurniture', id: 'kitchenFurniture' }}
            onChange={onChange}
          />
        </div>
        <div>
          {/* CCTV */}
          <Checkbox
            label={'CCTV'}
            options={{ name: 'cctv', id: 'cctv' }}
            onChange={onChange}
          />
          {/* Phone */}
          <Checkbox
            label={'Phone'}
            options={{ name: 'phone', id: 'phone' }}
            onChange={onChange}
          />
          {/* Internet */}
          <Checkbox
            label={'Internet'}
            options={{ name: 'internet', id: 'internet' }}
            onChange={onChange}
          />
        </div>
        <div>
          {/* Electricity */}
          <Checkbox
            label={'Electricity'}
            options={{ name: 'electricity', id: 'electricity' }}
            onChange={onChange}
          />
          {/* Gas */}
          <Checkbox
            label={'Gas'}
            options={{ name: 'gas', id: 'gas' }}
            onChange={onChange}
          />
          {/* Water */}
          <Checkbox
            label={'Water'}
            options={{ name: 'water', id: 'water' }}
            onChange={onChange}
          />
          {/* Heating */}
          <Checkbox
            label={'Heating'}
            options={{ name: 'heating', id: 'heating' }}
            onChange={onChange}
          />
        </div>
        <div>
          {/* TV */}
          <Checkbox
            label={'TV'}
            options={{ name: 'tv', id: 'tv' }}
            onChange={onChange}
          />
          {/* Conditioner */}
          <Checkbox
            label={'Conditioner'}
            options={{ name: 'conditioner', id: 'conditioner' }}
            onChange={onChange}
          />
          {/* Washing machine */}
          <Checkbox
            label={'Washing machine'}
            options={{ name: 'washingMachine', id: 'washingMachine' }}
            onChange={onChange}
          />
          {/* Dishwasher */}
          <Checkbox
            label={'Dishwasher'}
            options={{ name: 'dishwasher', id: 'dishwasher' }}
            onChange={onChange}
          />
          {/* Refrigerator */}
          <Checkbox
            label={'Refrigerator'}
            options={{ name: 'refrigerator', id: 'refrigerator' }}
            onChange={onChange}
          />
        </div>
      </div>
    </FadeInDiv>
  )
}

PostAdditionalInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PostAdditionalInfo
