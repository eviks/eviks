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
        checkEmail: 'Письмо с подтверждением было отправлено на {{email}}',
        verification: {
          greeting: 'Мы рады, что вы с нами!',
          error: 'Что-то пошло не так...',
          errorDesc:
            'Похоже вы нажали на неверную ссылку подверждения аккаунта. Пожалуйста, попробуйте еще раз.'
        },
        resetPassword: {
          title: 'Забыли пароль? Не переживайте.',
          subtitle:
            'Просто сообщите нам ваш Email, и мы вышлем вам ссылку для создания нового пароля',
          send: 'Отправить',
          checkEmailTitle: 'Вам письмо!',
          checkEmail: 'Письмо с инструкциями отправлено на {{email}}',
          invalidToken:
            'Похоже, вы перешли по неправильной ссылке сброса пароля. Пожалуйста, попробуйте еще раз',
          changePasswordTitle: 'Введите ваш новый пароль',
          changePassword: 'Подтвердить',
          newPassword: 'Новый пароль',
          passwordConfirm: 'Повторите пароль'
        }
      },
      landing: {
        title: 'Всё начинается с дома',
        slogan: 'Мы поможем найти то, что подходит именно вам',
        search: 'Найти',
        sell: 'Продать'
      },
      post: {
        title: {
          apartment: 'Продается {{rooms}}-комнатная квартира {{sqm}} м²',
          house: 'Продается {{rooms}}-комнатный дом {{sqm}} м²'
        },
        info: {
          rooms: 'Комнаты',
          sqm: 'Общая площадь',
          livingSqm: 'Жилая площадь',
          kitchenSqm: 'Площадь кухни',
          floor: '{{floor}} из {{totalFloors}}',
          floorTitle: 'Этаж',
          lot: 'Участок'
        },
        desc: {
          title: 'Описание'
        },
        building: {
          title: 'О доме',
          ceilingHeight: 'Высота потолка: {{ceilingHeight}} м.',
          yearBuild: 'Год постройки: {{yearBuild}} г.',
          elevator: 'Есть лифт',
          parkingLot: 'Есть парковка'
        },
        features: {
          title: 'Дополнительно',
          maintenance: {
            redecorated: 'Косметический ремонт',
            designed: 'Дизайнерский ремонт',
            noMaintenance: 'Требуется ремонт'
          },
          mortgage: 'Ипотека',
          documented: 'Есть купчая',
          redevelopment: 'Перепланировка',
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
        location: {
          title: 'Расположение'
        },
        price: {
          priceForSqm: '{{priceForSqm}} AZN за м²',
          message:
            'Не забудьте сообщить о том, что нашли это объявление на Eviks',
          showNumber: 'Показать номер',
          userType: {
            agent: 'Агент',
            owner: 'Владелец'
          }
        }
      },
      postList: {
        noResults: 'Как жаль! По вашему запросу нет результатов',
        filters: {
          allFilters: 'Фильтры',
          remove: 'Очистить фильтры',
          search: 'Найти',
          price: 'Цена',
          bargain: 'Возможен торг',
          rooms: 'Комнаты',
          estateType: 'Тип недвижимости',
          more: 'Больше фильтров',
          doneButton: 'Готово',
          min: 'от',
          max: 'до',
          sqm: 'Общая площадь',
          livingSqm: 'Жилая площадь',
          kitchenSqm: 'Площадь кухни',
          floor: 'Этаж',
          totalFloor: 'Всего этажей',
          documented: 'Имеется купчая',
          mortgage: 'Ипотека',
          redevelopment: 'Перепланировка',
          notFirstFloor: 'Не первый',
          notLastFloor: 'Не последний'
        },
        estateTypes: {
          any: 'Любой',
          apartment: 'Квартира',
          house: 'Дом'
        },
        room: 'комната'
      },
      form: {
        googleAutoComplitePlaceholder: 'Введите адрес...',
        requiredField: 'Это обязательное поле',
        textareaMinLength: 'Описание должно содержать как минимум 100 символов'
      },
      dropzone: {
        click: 'Добавить',
        drag: 'или перетащите файлы сюда'
      },
      createPost: {
        clean: 'Очистить форму',
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
          title: 'Покажите ваш дом на карте',
          wrongApartment:
            'Укажите номер дома, в котором расположена ваша квартира. Если его нет на карте, то укажите ближайший',
          wrongHouse: 'Укажите адрес, по которому расположен ваш дом'
        },
        estateInfo: {
          title: 'Информация о недвижимости',
          rooms: 'Количество комнат',
          sqm: 'Общая полощадь',
          livingRoomsSqm: 'Жилая площадь (необязательно)',
          kitchenSqm: 'Площадь кухни (необязательно)',
          floor: 'Этаж',
          totalFloors: 'Всего этажей',
          lotSqm: 'Площадь участка (соток)',
          maintenance: 'Ремонт',
          redecorated: 'Косметический ремонт',
          designed: 'Дизайнерский ремонт',
          noMaintenance: 'Без ремонта',
          redevelopment: 'Перепланировка',
          documented: 'Имеется купчая',
          mortgage: 'Имеется кредит'
        },
        buildingInfo: {
          title: 'Информация о здании (необязательно)',
          ceilingHeight: 'Высота потолка',
          yearBuild: 'Год постройки',
          elevator: 'Лифт',
          parkingLot: 'Парковка'
        },
        additionalInfo: {
          title: 'Дополнительно',
          hint:
            'Расскажите нам о вашем доме. Например, каким материалом отделан пол, какой вид открывается из окон или какие объекты расположены поблизости. Детальное описание снимет большинство вопросов потенциальных покупателей.',
          features:
            'Отметьте характеристики вашего дома и дополнительные удобства, которые будут предоставлены покупателю.',
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
          minPhotos: 'Нужно добавить хотя бы 3 фотографии вашего дома',
          additionalInfo: 'Макимальный размер файла 10 МБ.'
        },
        contact: {
          title: 'Почти готово! Осталось лишь указать ваши контактные данные',
          userName: 'Как вас представить?',
          contact: 'Номер телефона'
        }
      }
    }
  }
}

i18n.use(initReactI18next).init({ resources, lng: 'ru' })
