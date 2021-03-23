import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

export const setUiLocale = (locale) => {
  return fetch(`/translations/${locale}.json`)
    .then((response) => response.json())
    .then(
      (loadedResources) =>
        new Promise((resolve, reject) => {
          i18next.use(initReactI18next).init(
            {
              lng: locale,
              debug: true,
              resources: { [locale]: loadedResources },
            },
            (err, t) => {
              if (err) {
                reject(err)
                return
              }
              resolve()
            }
          )
        })
    )
    .catch((err) => Promise.reject(err))
}

export default i18next
