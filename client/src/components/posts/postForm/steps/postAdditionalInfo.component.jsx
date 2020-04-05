import React from 'react'
import TextArea from '../../../layout/form/textarea/textarea.component'
import Checkbox from '../../../layout/form/checkbox/checkbox.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import '../postForm.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostAdditionalInfo = ({ formData, onChange }) => {
  const {
    description,
    balcony,
    furniture,
    kitchenFurniture,
    cctv,
    phone,
    internet,
    electricity,
    gas,
    water,
    heating,
    tv,
    conditioner,
    washingMachine,
    dishwasher,
    refrigerator,
  } = formData

  const [t] = useTranslation()

  return (
    <FadeInDiv>
      <h3 className="step-title my-1">
        {t('createPost.additionalInfo.title')}
      </h3>
      {/* Description */}
      <TextArea
        options={{ id: 'description', name: 'description', value: description }}
        onChange={onChange}
      />
      <br />
      <div className="flex-container">
        <div>
          {/* Balcony */}
          <Checkbox
            label={t('createPost.additionalInfo.balcony')}
            options={{ name: 'balcony', id: 'balcony', checked: balcony }}
            onChange={onChange}
          />
          {/* Furniture */}
          <Checkbox
            label={t('createPost.additionalInfo.furniture')}
            options={{ name: 'furniture', id: 'furniture', checked: furniture }}
            onChange={onChange}
          />
          {/* Kitchen furniture */}
          <Checkbox
            label={t('createPost.additionalInfo.kitchenFurniture')}
            options={{
              name: 'kitchenFurniture',
              id: 'kitchenFurniture',
              checked: kitchenFurniture,
            }}
            onChange={onChange}
          />
        </div>
        <div>
          {/* CCTV */}
          <Checkbox
            label={t('createPost.additionalInfo.cctv')}
            options={{ name: 'cctv', id: 'cctv', checked: cctv }}
            onChange={onChange}
          />
          {/* Phone */}
          <Checkbox
            label={t('createPost.additionalInfo.phone')}
            options={{ name: 'phone', id: 'phone', checked: phone }}
            onChange={onChange}
          />
          {/* Internet */}
          <Checkbox
            label={t('createPost.additionalInfo.internet')}
            options={{ name: 'internet', id: 'internet', checked: internet }}
            onChange={onChange}
          />
        </div>
        <div>
          {/* Electricity */}
          <Checkbox
            label={t('createPost.additionalInfo.electricity')}
            options={{
              name: 'electricity',
              id: 'electricity',
              checked: electricity,
            }}
            onChange={onChange}
          />
          {/* Gas */}
          <Checkbox
            label={t('createPost.additionalInfo.gas')}
            options={{ name: 'gas', id: 'gas', checked: gas }}
            onChange={onChange}
          />
          {/* Water */}
          <Checkbox
            label={t('createPost.additionalInfo.water')}
            options={{ name: 'water', id: 'water', checked: water }}
            onChange={onChange}
          />
          {/* Heating */}
          <Checkbox
            label={t('createPost.additionalInfo.heating')}
            options={{ name: 'heating', id: 'heating', checked: heating }}
            onChange={onChange}
          />
        </div>
        <div>
          {/* TV */}
          <Checkbox
            label={t('createPost.additionalInfo.tv')}
            options={{ name: 'tv', id: 'tv', checked: tv }}
            onChange={onChange}
          />
          {/* Conditioner */}
          <Checkbox
            label={t('createPost.additionalInfo.conditioner')}
            options={{
              name: 'conditioner',
              id: 'conditioner',
              checked: conditioner,
            }}
            onChange={onChange}
          />
          {/* Washing machine */}
          <Checkbox
            label={t('createPost.additionalInfo.washingMachine')}
            options={{
              name: 'washingMachine',
              id: 'washingMachine',
              checked: washingMachine,
            }}
            onChange={onChange}
          />
          {/* Dishwasher */}
          <Checkbox
            label={t('createPost.additionalInfo.dishwasher')}
            options={{
              name: 'dishwasher',
              id: 'dishwasher',
              checked: dishwasher,
            }}
            onChange={onChange}
          />
          {/* Refrigerator */}
          <Checkbox
            label={t('createPost.additionalInfo.refrigerator')}
            options={{
              name: 'refrigerator',
              id: 'refrigerator',
              checked: refrigerator,
            }}
            onChange={onChange}
          />
        </div>
      </div>
    </FadeInDiv>
  )
}

PostAdditionalInfo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostAdditionalInfo
