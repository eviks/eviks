import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
import TextArea from '../../../layout/form/textarea/textarea.component'
import CheckboxCard from '../../../layout/form/checkboxCard/checkboxCard.component'
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

const PostAdditionalInfo = ({
  postForm,
  validationErrors,
  updatePostFormAttributes
}) => {
  const {
    estateType,
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
    garage,
    pool,
    bathhouse
  } = postForm

  const onChange = event => {
    let { name, type, value } = event.target
    const fieldValue = type === 'checkbox' ? event.target.checked : value

    const newAttributes = {
      [name]:
        type === 'number'
          ? parseInt(fieldValue === '' ? 0 : fieldValue, 10)
          : fieldValue
    }

    updatePostFormAttributes(newAttributes)
  }

  const [t] = useTranslation()

  return (
    <FadeInDiv>
      <h3 className="step-title my-1">
        {t('createPost.additionalInfo.title')}
      </h3>
      {/* Description */}
      <p className="my-1 medium">
        {t('createPost.additionalInfo.hint')}
      </p>
      <TextArea
        options={{ id: 'description', name: 'description', value: description }}
        onChange={onChange}
        error={validationErrors.description}
      />
      <p className="my-1 medium">
        {t('createPost.additionalInfo.features')}
      </p>
      <div className="grid-container">
        <div>
          {estateType === 'house' && (
            <Fragment>
              {/* Garage */}
              <CheckboxCard
                label={t('createPost.additionalInfo.garage')}
                options={{
                  name: 'garage',
                  id: 'garage',
                  checked: garage
                }}
                onChange={onChange}
                iconClass={'fas fa-car'}
              />
              {/* Pool */}
              <CheckboxCard
                label={t('createPost.additionalInfo.pool')}
                options={{
                  name: 'pool',
                  id: 'pool',
                  checked: pool
                }}
                onChange={onChange}
                iconClass={'fas fa-swimming-pool'}
              />
              {/* Bathhouse */}
              <CheckboxCard
                label={t('createPost.additionalInfo.bathhouse')}
                options={{
                  name: 'bathhouse',
                  id: 'bathhouse',
                  checked: bathhouse
                }}
                onChange={onChange}
                iconClass={'fas fa-hot-tub'}
              />
            </Fragment>
          )}
          {/* Balcony */}
          <CheckboxCard
            label={t('createPost.additionalInfo.balcony')}
            options={{ name: 'balcony', id: 'balcony', checked: balcony }}
            onChange={onChange}
            iconClass={'fas fa-building'}
          />
          {/* Furniture */}
          <CheckboxCard
            label={t('createPost.additionalInfo.furniture')}
            options={{ name: 'furniture', id: 'furniture', checked: furniture }}
            onChange={onChange}
            iconClass={'fas fa-couch'}
          />
          {/* Kitchen furniture */}
          <CheckboxCard
            label={t('createPost.additionalInfo.kitchenFurniture')}
            options={{
              name: 'kitchenFurniture',
              id: 'kitchenFurniture',
              checked: kitchenFurniture
            }}
            onChange={onChange}
            iconClass={'fas fa-utensils'}
          />
        </div>
        <div>
          {/* CCTV */}
          <CheckboxCard
            label={t('createPost.additionalInfo.cctv')}
            options={{ name: 'cctv', id: 'cctv', checked: cctv }}
            onChange={onChange}
            iconClass={'fas fa-tv'}
          />
          {/* Phone */}
          <CheckboxCard
            label={t('createPost.additionalInfo.phone')}
            options={{ name: 'phone', id: 'phone', checked: phone }}
            onChange={onChange}
            iconClass={'fas fa-phone-alt'}
          />
          {/* Internet */}
          <CheckboxCard
            label={t('createPost.additionalInfo.internet')}
            options={{ name: 'internet', id: 'internet', checked: internet }}
            onChange={onChange}
            iconClass={'fas fa-wifi'}
          />
        </div>
        <div>
          {/* Electricity */}
          <CheckboxCard
            label={t('createPost.additionalInfo.electricity')}
            options={{
              name: 'electricity',
              id: 'electricity',
              checked: electricity
            }}
            onChange={onChange}
            iconClass={'fas fa-bolt'}
          />
          {/* Gas */}
          <CheckboxCard
            label={t('createPost.additionalInfo.gas')}
            options={{ name: 'gas', id: 'gas', checked: gas }}
            onChange={onChange}
            iconClass={'fas fa-burn'}
          />
          {/* Water */}
          <CheckboxCard
            label={t('createPost.additionalInfo.water')}
            options={{ name: 'water', id: 'water', checked: water }}
            onChange={onChange}
            iconClass={'fas fa-shower'}
          />
          {/* Heating */}
          <CheckboxCard
            label={t('createPost.additionalInfo.heating')}
            options={{ name: 'heating', id: 'heating', checked: heating }}
            onChange={onChange}
            iconClass={'fas fa-fire'}
          />
        </div>
        <div>
          {/* TV */}
          <CheckboxCard
            label={t('createPost.additionalInfo.tv')}
            options={{ name: 'tv', id: 'tv', checked: tv }}
            onChange={onChange}
            iconClass={'fas fa-tv'}
          />
          {/* Conditioner */}
          <CheckboxCard
            label={t('createPost.additionalInfo.conditioner')}
            options={{
              name: 'conditioner',
              id: 'conditioner',
              checked: conditioner
            }}
            onChange={onChange}
            iconClass={'fas fa-wind'}
          />
          {/* Washing machine */}
          <CheckboxCard
            label={t('createPost.additionalInfo.washingMachine')}
            options={{
              name: 'washingMachine',
              id: 'washingMachine',
              checked: washingMachine
            }}
            onChange={onChange}
            iconClass={'fas fa-recycle'}
          />
          {/* Dishwasher */}
          <CheckboxCard
            label={t('createPost.additionalInfo.dishwasher')}
            options={{
              name: 'dishwasher',
              id: 'dishwasher',
              checked: dishwasher
            }}
            onChange={onChange}
            iconClass={'fas fa-soap'}
          />
          {/* Refrigerator */}
          <CheckboxCard
            label={t('createPost.additionalInfo.refrigerator')}
            options={{
              name: 'refrigerator',
              id: 'refrigerator',
              checked: refrigerator
            }}
            onChange={onChange}
            iconClass={'fas fa-snowflake'}
          />
        </div>
      </div>
    </FadeInDiv>
  )
}

PostAdditionalInfo.propTypes = {
  postForm: PropTypes.object.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  postForm: state.post.postForm,
  validationErrors: state.post.validationErrors
})

export default connect(mapStateToProps, { updatePostFormAttributes })(
  PostAdditionalInfo
)
