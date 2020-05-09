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
      logout: 'Çıxış',
      forgotPassword: 'Ups! Şifrəni unutdum',
      checkEmailTitle: 'Sizə məktub!',
      checkEmail: 'Təsdiqi ilə məktub göndərildi {{email}}',
      favorites: 'Seçilmişlər',
      myAccount: 'Mənim hesabım',
      room: 'otaq',
      back: 'Geri',
      next: 'Ardıncı',
      submit: 'Təsdiq eləmək'
    }
  },
  ru: {
    translation: {
      navbar: {
        favorites: 'Избранное',
        myAccount: 'Мой аккаунт',
        logout: 'Выйти',
        joinOrSignIn: 'Вход и регистрация'
      },
      auth: {
        login: 'Вход',
        register: 'Регистрация',
        feature1: 'Размещайте бесплатные объявления',
        feature2: 'Сохраняйте параметры поиска',
        feature3: 'Добавляйте объявления в избранное',
        loginTitle: 'С возвращением!',
        registerTitle: 'Давайте знакомиться',
        displayName: 'Имя',
        email: 'E-mail',
        password: 'Пароль',
        signIn: 'Войти',
        signUp: 'Зарегистрироваться',
        forgotPassword: 'Упс! Я забыл пароль',
        checkEmailTitle: 'Вам письмо!',
        checkEmail: 'Письмо с подтверждением было отправлено на {{email}}'
      },
      landing: {
        title: 'Всё начинается с дома',
        slogan: 'Мы поможем найти то, что подходит именно вам',
        search: 'Найти',
        sell: 'Продать'
      },
      postList: {
        filters: {
          price: 'Цена',
          rooms: 'Комнаты',
          estateType: 'Тип недвижимости',
          more: 'Больше фильтров'
        },
        room: 'комната'
      },
      form: {
        googleAutoComplitePlaceholder: 'Введите адрес...',
        requiredField: 'Это обязательное поле'
      },
      dropzone: {
        click: 'Добавить',
        drag: 'или перетащите файлы сюда'
      },
      createPost: {
        back: 'Назад',
        next: 'Далее',
        submit: 'Разместить объявление',
        generalInfo: {
          title: 'Общая информация',
          userType: 'Кто вы?',
          owner: 'Владелец',
          agent: 'Агент',
          estateType: 'Вид недвижимости',
          apartment: 'Квартира',
          house: 'Дом',
          city: 'Город',
          cityField: 'Выберите ваш город',
          district: 'Район',
          districtField: 'Выберите ваш район'
        },
        mapInfo: {
          title: 'Покажите ваш дом на карте'
        },
        estateInfo: {
          title: 'Информация о недвижимости',
          rooms: 'Количество комнат',
          sqm: 'Общая полощадь',
          livingRoomsSqm: 'Жилая площадь (необязательно)',
          kitchenSqm: 'Площадь кухни (необязательно)',
          floor: 'Этаж',
          totalFloors: 'Всего этажей',
          lotSqm: 'Площадь участка',
          maintenance: 'Ремонт',
          redecorated: 'Косметический ремонт',
          designed: 'Дизайнерский ремонт',
          noMaintenance: 'Без ремонта',
          redevelopment: 'Перепланировка',
          documented: 'Имеется купчая',
          mortgage: 'Имеется кредит'
        },
        buildingInfo: {
          title: 'Информация о здании',
          ceilingHeight: 'Высота потолка',
          yearBuild: 'Год постройки',
          elevator: 'Лифт',
          parkingLot: 'Парковка'
        },
        additionalInfo: {
          title: 'Дополнительно',
          balcony: 'Балкон',
          furniture: 'Мебель',
          kitchenFurniture: 'Кухонная мебель',
          cctv: 'Кабельное',
          phone: 'Телефон',
          internet: 'Интернет',
          electricity: 'Электричество',
          gas: 'Газ',
          water: 'Вода',
          heating: 'Отопление',
          tv: 'Телевизор',
          conditioner: 'Кондиционер',
          washingMachine: 'Стиральная машина',
          dishwasher: 'Посудомоечная машина',
          refrigerator: 'Холодильник',
          garage: 'Гараж',
          pool: 'Бассейн',
          bathhouse: 'Баня'
        },
        price: {
          title: 'Цена',
          price: 'Цена',
          bargain: 'Возможен торг',
          progressPayment: 'Возможна оплата в несколько этапов'
        },
        photos: {
          title: 'Добавьте несколько фотографий',
          additionalInfo: 'Макимальный размер файла 10 МБ.'
        },
        contact: {
          title: 'Почти готово! Осталось лишь указать ваши контактные данные',
          contact: 'Контактная информация'
        }
      }
    }
  }
}

i18n.use(initReactI18next).init({ resources, lng: 'ru' })
