import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import ru from './translations/ru'
import az from './translations/az'

i18n.on('initialized', options => {
  const path = window.location.pathname
  const pathArray = path.split('/')
  if (pathArray[1] !== 'az' && pathArray[1] !== 'ru') {
    pathArray.splice(1, 0, 'az')
    const newUrl = pathArray.join('/')
    window.location.replace(newUrl)
  }
})

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      az,
      ru
    },
    whitelist: ['az', 'ru'],
    fallbackLng: ['az'],
    detection: {
      order: ['path', 'htmlTag'],
      lookupFromPathIndex: 0,
      htmlTag: document.documentElement,
      checkWhitelist: true
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: '.'
    }
  })

export default i18n
