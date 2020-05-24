import React, { Fragment } from 'react'
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

const PostBuildingInfo = ({ formData, onChange }) => {
  const {
    estateType,
    ceilingHeight,
    yearBuild,
    elevator,
    parkingLot,
  } = formData

  const [t] = useTranslation()

  const heightFormat = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 15, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
  })

  return (
    <FadeInDiv className="px-4">
      <h3 className="step-title my-1">{t('createPost.buildingInfo.title')}</h3>
      {/* Ceiling height */}
      <Input
        fieldName={t('createPost.buildingInfo.ceilingHeight')}
        mask={heightFormat}
        options={{
          type: 'text',
          name: 'ceilingHeight',
          value: ceilingHeight === 0 ? '' : ceilingHeight,
          min: '0',
          style: { width: '120px' },
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
          style: { width: '120px' },
        }}
        onChange={onChange}
      />
      {/* Elevator & Parking lot */}
      {estateType === 'apartment' && (
        <Fragment>
          <Checkbox
            label={t('createPost.buildingInfo.elevator')}
            showFieldName={true}
            options={{ name: 'elevator', id: 'elevator', checked: elevator }}
            onChange={onChange}
          />
          <Checkbox
            label={t('createPost.buildingInfo.parkingLot')}
            showFieldName={true}
            options={{
              name: 'parkingLot',
              id: 'parkingLot',
              checked: parkingLot,
            }}
            onChange={onChange}
          />
        </Fragment>
      )}
    </FadeInDiv>
  )
}

PostBuildingInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostBuildingInfo
