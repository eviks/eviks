import React from 'react'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
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

const PostEstateInfo = ({
  postForm,
  validationErrors,
  updatePostFormAttributes
}) => {
  const [t] = useTranslation()

  const {
    estateType,
    rooms,
    sqm,
    livingRoomsSqm,
    kitchenSqm,
    lotSqm,
    floor,
    totalFloors,
    renovation,
    redevelopment,
    documented,
    mortgage
  } = postForm

  const renovationOptions = [
    {
      input: {
        id: 'cosmetic',
        name: 'renovation',
        type: 'radio',
        value: 'cosmetic',
        checked: renovation === 'cosmetic'
      },
      label: t('createPost.estateInfo.cosmetic')
    },
    {
      input: {
        id: 'designer',
        name: 'renovation',
        type: 'radio',
        value: 'designer',
        checked: renovation === 'designer'
      },
      label: t('createPost.estateInfo.designer')
    },
    {
      input: {
        id: 'noRenovation',
        name: 'renovation',
        type: 'radio',
        value: 'noRenovation',
        checked: renovation === 'noRenovation'
      },
      label: t('createPost.estateInfo.noRenovation')
    }
  ]

  const onChange = event => {
    let { name, type, value } = event.target
    const fieldValue = type === 'checkbox' ? event.target.checked : value

    const newAttributes = {
      [name]:
        typeof fieldValue === 'number'
          ? parseInt(fieldValue === '' ? 0 : fieldValue, 10)
          : fieldValue
    }

    updatePostFormAttributes(newAttributes)
  }

  return (
    <FadeInDiv className="px-4">
      <h3 className="step-title my-1">{t('createPost.estateInfo.title')}</h3>
      {/* Rooms */}
      <Input
        fieldName={t('createPost.estateInfo.rooms')}
        options={{
          type: 'text',
          name: 'rooms',
          value: rooms === 0 ? '' : rooms,
          min: '0'
        }}
        onChange={onChange}
        error={validationErrors.rooms}
      />
      {/* Sqm */}
      <Input
        fieldName={t('createPost.estateInfo.sqm')}
        options={{
          type: 'text',
          name: 'sqm',
          value: sqm === 0 ? '' : sqm,
          min: '0'
        }}
        onChange={onChange}
        error={validationErrors.sqm}
      />
      {/* Living rooms sqm */}
      <Input
        fieldName={t('createPost.estateInfo.livingRoomsSqm')}
        options={{
          type: 'text',
          name: 'livingRoomsSqm',
          value: livingRoomsSqm === 0 ? '' : livingRoomsSqm,
          min: '0'
        }}
        onChange={onChange}
      />
      {/* Kitchen sqm */}
      <Input
        fieldName={t('createPost.estateInfo.kitchenSqm')}
        options={{
          type: 'text',
          name: 'kitchenSqm',
          value: kitchenSqm === 0 ? '' : kitchenSqm,
          min: '0'
        }}
        onChange={onChange}
      />
      {/* Floor or Lot */}
      {estateType === 'apartment' ? (
        <Input
          fieldName={t('createPost.estateInfo.floor')}
          options={{
            type: 'text',
            name: 'floor',
            value: floor === 0 ? '' : floor,
            min: '0'
          }}
          onChange={onChange}
          error={validationErrors.floor}
        />
      ) : (
        <Input
          fieldName={t('createPost.estateInfo.lotSqm')}
          options={{
            type: 'text',
            name: 'lotSqm',
            value: lotSqm === 0 ? '' : lotSqm,
            min: '0'
          }}
          onChange={onChange}
          error={validationErrors.lotSqm}
        />
      )}
      {/* Total floors */}
      <Input
        fieldName={t('createPost.estateInfo.totalFloors')}
        options={{
          type: 'text',
          name: 'totalFloors',
          value: totalFloors === 0 ? '' : totalFloors,
          min: '0'
        }}
        onChange={onChange}
        error={validationErrors.totalFloors}
      />
      {/* Renovation */}
      <SwitchInput
        fieldName={t('createPost.estateInfo.renovation')}
        options={renovationOptions}
        onChange={onChange}
        error={validationErrors.renovation}
      />
      {/* Redevelopment */}
      <Checkbox
        label={t('createPost.estateInfo.redevelopment')}
        options={{
          name: 'redevelopment',
          id: 'redevelopment',
          checked: redevelopment
        }}
        onChange={onChange}
      />
      {/* Documented */}
      <Checkbox
        label={t('createPost.estateInfo.documented')}
        options={{ name: 'documented', id: 'documented', checked: documented }}
        onChange={onChange}
      />
      {/* On kredit */}
      <Checkbox
        label={t('createPost.estateInfo.mortgage')}
        options={{
          name: 'mortgage',
          id: 'mortgage',
          checked: mortgage,
          style: { marginLeft: '200px' }
        }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostEstateInfo.propTypes = {
  postForm: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm,
  validationErrors: state.post.validationErrors
})

export default connect(mapStateToProps, { updatePostFormAttributes })(
  PostEstateInfo
)
