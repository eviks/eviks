import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  az: {
    translation: {
      joinOrSignIn: 'Giriş və qeydiyyat',
      welcome: 'Evdə daha yaxşıdır',
      slogan: 'Xəyallarınızın evini tapın',
      search: 'Axtarmaq',
      sell: 'Satmaq',
      login: 'Daxil olmaq',
      register: 'Qeydiyyat',
      authTitle: 'Maksimum \n imkanlardan \n istifadə edin',
      loginTitle: 'Qayıtmaqla!',
      registerTitle: 'Gəlin tanış olaq',
      displayName: 'Ad',
      email: 'E-mail',
      password: 'Şifrə',
      signIn: 'Daxil ol',
      signUp: 'Qeydiyyatdan keç',
      forgotPassword: 'Ups! Şifrəni unutdum'
    }
  },
  ru: {
    translation: {
      joinOrSignIn: 'Вход и регистрация',
      welcome: 'Хорошо быть дома',
      slogan: 'Найдите нечто большее, чем просто четыре стены',
      search: 'Найти',
      sell: 'Продать',
      login: 'Вход',
      register: 'Регистрация',
      authTitle: 'Используйте \n максимум \n возможностей',
      loginTitle: 'С возвращением!',
      registerTitle: 'Давайте знакомиться',
      displayName: 'Имя',
      email: 'E-mail',
      password: 'Пароль',
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
      forgotPassword: 'Упс! Я забыл пароль'
    }
  }
}

i18n.use(initReactI18next).init({ resources, lng: 'ru' })
