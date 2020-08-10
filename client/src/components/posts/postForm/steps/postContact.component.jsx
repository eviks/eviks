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
  userName,
  displayName,
  validationErrors,
  updatePostFormAttributes
}) => {
  useEffect(() => {
    if (userName === '') {
      updatePostFormAttributes({ userName: displayName })
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
    /\d/
  ]

  return (
    <FadeInDiv className="px-4">
      <h3 className="step-title my-1">{t('createPost.contact.title')}</h3>
      {/* User name */}
      <Input
        fieldName={t('createPost.contact.userName')}
        mask={false}
        options={{
          type: 'text',
          name: 'userName',
          value: userName
        }}
        onChange={e => updatePostFormAttributes({ userName: e.target.value })}
        error={validationErrors.userName}
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
          style: { width: '200px' }
        }}
        onChange={e => updatePostFormAttributes({ contact: e.target.value })}
        error={validationErrors.contact}
      />
    </FadeInDiv>
  )
}

PostContact.propTypes = {
  contact: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  updatePostFormAttributes: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  contact: state.post.postForm.contact,
  userName: state.post.postForm.userName,
  validationErrors: state.post.validationErrors,
  displayName: state.auth.user.local.displayName
})

export default connect(mapStateToProps, { updatePostFormAttributes })(
  PostContact
)
