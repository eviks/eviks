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

const PostBuildingInfo = ({ formData, onChange }) => {
  const { ceilingHeight, yearBulid, elevator, parkingLot } = formData

  return (
    <FadeInDiv>
      <h3 className="my-1">Information about building</h3>
      {/* Ceiling height */}
      <Input
        fieldName={'Ceiling height'}
        options={{
          type: 'number',
          name: 'ceilingHeight',
          value: ceilingHeight === 0 ? '' : ceilingHeight,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Year build */}
      <Input
        fieldName={'Year build'}
        options={{
          type: 'number',
          name: 'yearBulid',
          value: yearBulid === 0 ? '' : yearBulid,
          min: '0',
          style: { width: '60px' }
        }}
        onChange={onChange}
      />
      {/* Elevator */}
      <Checkbox
        label={'Elevator'}
        showFieldName={true}
        options={{ name: 'elevator', id: 'elevator', checked: elevator }}
        onChange={onChange}
      />
      {/* Parking lot */}
      <Checkbox
        label={'Parking lot'}
        showFieldName={true}
        options={{ name: 'parkingLot', id: 'parkingLot', checked: parkingLot }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostBuildingInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PostBuildingInfo
