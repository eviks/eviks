import React from 'react'
import Input from '../../../layout/form/input/input.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostContact = ({ formData, onChange }) => {
  const { contact } = formData

  const [t] = useTranslation()

  const phoneMask = [
    '+',
    /[1-9]/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ]

  return (
    <FadeInDiv className="px-4">
      <h3 className="step-title my-1">{t('createPost.contact.title')}</h3>
      {/* Contact */}
      <Input
        fieldName={t('createPost.contact.contact')}
        mask={phoneMask}
        options={{
          type: 'text',
          name: 'contact',
          value: contact === 0 ? '' : contact,
          placeholder: '+994 77 777-77-77',
        }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostContact.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PostContact
