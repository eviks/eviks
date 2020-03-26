import React from 'react'
import Input from '../../../layout/form/input/input.component'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import PropTypes from 'prop-types'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const PostContact = ({ formData, onChange }) => {
  const { contact } = formData

  return (
    <FadeInDiv>
      <h3 className="my-1">
        Everything is up & ready! Just leave us your contact information
      </h3>
      {/* Contact */}
      <Input
        fieldName={'Contact'}
        options={{
          type: 'text',
          name: 'contact',
          value: contact === 0 ? '' : contact
        }}
        onChange={onChange}
      />
    </FadeInDiv>
  )
}

PostContact.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PostContact
