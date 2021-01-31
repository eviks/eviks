import React from 'react'
import { useTranslation } from 'react-i18next'

const DeleteMessage = () => {
  const [t] = useTranslation()

  return (
    <div style={{ padding: '2rem' }}>
      {t('postList.buttons.delete.confirm')}
    </div>
  )
}

export default DeleteMessage
