import React from 'react'
import Input from '../../../layout/form/input/input.component'
import SwitchInput from '../../../layout/form/switch/switchInput.component'
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

const PostEstateInfo = ({ formData, onChange }) => {
  const [t] = useTranslation()

  const {
    rooms,
    sqm,
    livingRoomsSqm,
    kitchenSqm,
    floor,
    totalFloors,
    redevelopment,
    documented,
    onKredit,
  } = formData

  const maintenanceOptions = [
    {
      input: {
        id: 'redecorated',
        name: 'maintenance',
        type: 'radio',
        value: 'redecorated',
      },
      label: t('createPost.estateInfo.redecorated'),
    },
    {
      input: {
        id: 'designed',
        name: 'maintenance',
        type: 'radio',
        value: 'designed',
      },
      label: t('createPost.estateInfo.designed'),
    },
    {
      input: {
        id: 'noMaintenance',
        name: 'maintenance',
        type: 'radio',
        value: 'noMaintenance',
      },
      label: t('createPost.estateInfo.noMaintenance'),
    },
  ]

  return (
    <FadeInDiv>
      <h3 className="step-title my-1">{t('createPost.estateInfo.title')}</h3>
      {/* Rooms */}
      <Input
        fieldName={t('createPost.estateInfo.rooms')}
        options={{
          type: 'number',
          name: 'rooms',
          value: rooms === 0 ? '' : rooms,
          min: '0',
          style: { width: '60px' },
        }}
        onChange={onChange}
      />
      {/* Sqm */}
      <Input
        fieldName={t('createPost.estateInfo.sqm')}
        options={{
          type: 'number',
          name: 'sqm',
          value: sqm === 0 ? '' : sqm,
          min: '0',
          style: { width: '60px' },
        }}
        onChange={onChange}
      />
      {/* Living rooms sqm */}
      <Input
        fieldName={t('createPost.estateInfo.livingRoomsSqm')}
        options={{
          type: 'number',
          name: 'livingRoomsSqm',
          value: livingRoomsSqm === 0 ? '' : livingRoomsSqm,
          min: '0',
          style: { width: '60px' },
        }}
        onChange={onChange}
      />
      {/* Kitchen sqm */}
      <Input
        fieldName={t('createPost.estateInfo.kitchenSqm')}
        options={{
          type: 'number',
          name: 'kitchenSqm',
          value: kitchenSqm === 0 ? '' : kitchenSqm,
          min: '0',
          style: { width: '60px' },
        }}
        onChange={onChange}
      />
      {/* Floor */}
      <Input
        fieldName={t('createPost.estateInfo.floor')}
        options={{
          type: 'number',
          name: 'floor',
          value: floor === 0 ? '' : floor,
          min: '0',
          style: { width: '60px' },
        }}
        onChange={onChange}
      />
      {/* Total floors */}
      <Input
        fieldName={t('createPost.estateInfo.totalFloors')}
        options={{
          type: 'number',
          name: 'totalFloors',
          value: totalFloors === 0 ? '' : totalFloors,
          min: '0',
          style: { width: '60px' },
        }}
        onChange={onChange}
      />
      {/* Maintenance */}
      <SwitchInput
        fieldName={t('createPost.estateInfo.maintenance')}
        options={maintenanceOptions}
        onChange={onChange}
      />
      {/* Redevelopment */}
      <Checkbox
        label={t('createPost.estateInfo.redevelopment')}
        showFieldName={true}
        options={{
          name: 'redevelopment',
          id: 'redevelopment',
          checked: redevelopment,
        }}
        onChange={onChange}
      />
      {/* Documented */}
      <Checkbox
        label={t('createPost.estateInfo.documented')}
        showFieldName={true}
        options={{ name: 'documented', id: 'documented', checked: documented }}
        onChange={onChange}
      />
      {/* On kredit */}
      <Checkbox
        label={t('createPost.estateInfo.onKredit')}
        showFieldName={true}
        options={{
          name: 'onKredit',
          id: 'onKredit',
          checked: onKredit,
          style: { marginLeft: '200px' },
        }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostEstateInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostEstateInfo
