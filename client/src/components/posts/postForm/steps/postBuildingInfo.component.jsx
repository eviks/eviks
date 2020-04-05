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

const PostBuildingInfo = ({ formData, onChange }) => {
  const { ceilingHeight, yearBuild, elevator, parkingLot } = formData

  const [t] = useTranslation()

  return (
    <FadeInDiv>
      <h3 className="step-title my-1">{t('createPost.buildingInfo.title')}</h3>
      {/* Ceiling height */}
      <Input
        fieldName={t('createPost.buildingInfo.ceilingHeight')}
        options={{
          type: 'number',
          name: 'ceilingHeight',
          value: ceilingHeight === 0 ? '' : ceilingHeight,
          min: '0',
          style: { width: '60px' },
        }}
        onChange={onChange}
      />
      {/* Year build */}
      <Input
        fieldName={t('createPost.buildingInfo.yearBuild')}
        options={{
          type: 'number',
          name: 'yearBuild',
          value: yearBuild === 0 ? '' : yearBuild,
          min: '0',
          style: { width: '60px' },
        }}
        onChange={onChange}
      />
      {/* Elevator */}
      <Checkbox
        label={t('createPost.buildingInfo.elevator')}
        showFieldName={true}
        options={{ name: 'elevator', id: 'elevator', checked: elevator }}
        onChange={onChange}
      />
      {/* Parking lot */}
      <Checkbox
        label={t('createPost.buildingInfo.parkingLot')}
        showFieldName={true}
        options={{ name: 'parkingLot', id: 'parkingLot', checked: parkingLot }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostBuildingInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostBuildingInfo
