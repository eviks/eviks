import React, { useEffect, useRef } from 'react'
import Ripple from '../../../../layout/ripple/ripple.component'
import { SvgClose } from '../../../../layout/icons'
import styled, { keyframes } from 'styled-components'
import { fadeIn, fadeOut } from 'react-animations'
import { useTranslation } from 'react-i18next'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import PropTypes from 'prop-types'

import './deleteUserMessage.style.scss'

const FadeInAnimation = keyframes`${fadeIn}`
const FadeOutAnimation = keyframes`${fadeOut}`
const FadeInDiv = styled.div`
  animation: 0.5s ${FadeInAnimation}, ${FadeOutAnimation};
`

const DeleteUserMessage = ({ onOk, onCancel }) => {
  const containerRef = useRef(null)

  // Disable body scroll
  useEffect(() => {
    let currentRef
    if (containerRef) currentRef = containerRef.current
    if (currentRef) {
      disableBodyScroll(currentRef)
    }
    return () => enableBodyScroll(currentRef)
  })

  const [t] = useTranslation()

  return (
    <FadeInDiv ref={containerRef}>
      <div className="delete-user-wrapper">
        <button className="close-modal" onClick={onCancel}>
          <SvgClose />
        </button>
        <div className="delete-user-img" />
        <div className="delete-user-msg">
          <span className="lead mb-1">
            {t('userMenu.deleteMessage.warning')}
          </span>
          <span className="medium secondary">
            {t('userMenu.deleteMessage.description')}
          </span>
          <div className="mt-1">
            <button className="btn btn-primary mt-1" onClick={onCancel}>
              {t('userMenu.deleteMessage.cancelText')}
              <Ripple />
            </button>
            <button className="btn btn-secondary mt-1" onClick={onOk}>
              {t('userMenu.deleteMessage.okText')}
              <Ripple />
            </button>
          </div>
        </div>
      </div>
    </FadeInDiv>
  )
}

DeleteUserMessage.propTypes = {
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default DeleteUserMessage
