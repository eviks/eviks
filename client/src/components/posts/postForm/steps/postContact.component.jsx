import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { updatePostFormAttributes } from '../../../../actions/post'
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

const PostContact = ({
  contact,
  username,
  displayName,
  validationErrors,
  updatePostFormAttributes,
}) => {
  useEffect(() => {
    if (username === '') {
      updatePostFormAttributes({ username: displayName })
    }
    // eslint-disable-next-line
  }, [])

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
      {/* User name */}
      <Input
        fieldName={t('createPost.contact.username')}
        mask={false}
        options={{
          type: 'text',
          name: 'username',
          value: username,
        }}
        onChange={(e) => updatePostFormAttributes({ username: e.target.value })}
        error={validationErrors.username}
      />
      {/* Contact */}
      <Input
        fieldName={t('createPost.contact.contact')}
        mask={phoneMask}
        options={{
          type: 'text',
          name: 'contact',
          value: contact,
          placeholder: '+994 77 777-77-77',
          style: { width: '200px' },
        }}
        onChange={(e) => updatePostFormAttributes({ contact: e.target.value })}
        error={validationErrors.contact}
      />
    </FadeInDiv>
  )
}

PostContact.propTypes = {
  contact: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  contact: state.post.postForm.contact,
  username: state.post.postForm.username,
  validationErrors: state.post.validationErrors,
  displayName: state.auth.user.displayName,
})

export default connect(mapStateToProps, { updatePostFormAttributes })(
  PostContact
)
