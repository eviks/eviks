import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import moment from 'moment'

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
              interpolation: {
                format(value, format, locale) {
                  if (value instanceof Date) {
                    return moment(value).locale(locale).format(format)
                  }
                  return value
                },
              },
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
