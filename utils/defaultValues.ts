import {
  Settlement,
  Post,
  UserType,
  EstateType,
  DealType,
  Renovation,
  PostFilters,
  AlternativePostFilters,
  SortType,
} from '../types';

export const capitalCity: Settlement = {
  id: '10',
  name: 'Bakı',
  nameRu: 'Баку',
  nameEn: 'Baku',
  routeName: 'baku',
  x: 49.8786270618439,
  y: 40.379108951404,
  type: '2',
  metroStations: [
    {
      _id: 1,
      cityId: '10',
      name: '28 May',
      nameRu: '28 Май',
      nameEn: '28 May',
      x: 49.8491334915161,
      y: 40.3798526861589,
    },
    {
      _id: 2,
      cityId: '10',
      name: 'Nəriman Nərimanov',
      nameRu: 'Нариман Нариманов',
      nameEn: 'Nariman Narimanov',
      x: 49.8704516887665,
      y: 40.4029003060097,
    },
    {
      _id: 3,
      cityId: '10',
      name: 'Qara Qarayev',
      nameRu: 'Кара Караев',
      nameEn: 'Gara Garayev',
      x: 49.93448138237,
      y: 40.4175558116373,
    },
    {
      _id: 4,
      cityId: '10',
      name: 'Neftçilər',
      nameRu: 'Нефтчиляр',
      nameEn: 'Neftchilar',
      x: 49.9434989690781,
      y: 40.4105062092501,
    },
    {
      _id: 5,
      cityId: '10',
      name: 'Xalqlar Dostluğu',
      nameRu: 'Халглар достлугу',
      nameEn: 'Halglar Doslugu',
      x: 49.9524468183517,
      y: 40.3975650404193,
    },
    {
      _id: 6,
      cityId: '10',
      name: 'Koroğlu',
      nameRu: 'Кероглу',
      nameEn: 'Koroglu',
      x: 49.9181360006332,
      y: 40.4209537339068,
    },
    {
      _id: 7,
      cityId: '10',
      name: 'Ulduz',
      nameRu: 'Улдуз',
      nameEn: 'Ulduz',
      x: 49.8916035890579,
      y: 40.4148275479144,
    },
    {
      _id: 8,
      cityId: '10',
      name: 'Gənclik',
      nameRu: 'Гянджлик',
      nameEn: 'Ganjlik',
      x: 49.8511558771133,
      y: 40.4007147774345,
    },
    {
      _id: 9,
      cityId: '10',
      name: 'Həzi Aslanov',
      nameRu: 'Ази Асланов',
      nameEn: 'Hazi Aslanov',
      x: 49.9536591768265,
      y: 40.3721166260112,
    },
    {
      _id: 10,
      cityId: '10',
      name: 'Bakmil',
      nameRu: 'Бакмил',
      nameEn: 'Bakmil',
      x: 49.8772484064102,
      y: 40.4189689107337,
    },
    {
      _id: 11,
      cityId: '10',
      name: 'Əhmədli',
      nameRu: 'Ахмедлы',
      nameEn: 'Ahmedli',
      x: 49.9539971351624,
      y: 40.3851770968207,
    },
    {
      _id: 12,
      cityId: '10',
      name: '20 Yanvar',
      nameRu: '20 января',
      nameEn: '20 Yanvar',
      x: 49.8083209991455,
      y: 40.4043014580299,
    },
    {
      _id: 13,
      cityId: '10',
      name: 'İçərişəhər',
      nameRu: 'Ичери Шехер',
      nameEn: 'Icheri Sheher',
      x: 49.8315167427063,
      y: 40.3659083369244,
    },
    {
      _id: 14,
      cityId: '10',
      name: 'İnşaatçılar',
      nameRu: 'Иншаатчылар',
      nameEn: 'Inshaatchilar',
      x: 49.8028171062469,
      y: 40.3913386675955,
    },
    {
      _id: 15,
      cityId: '10',
      name: 'Nizami',
      nameRu: 'Низами Гянджеви',
      nameEn: 'Nizami Ganjavi',
      x: 49.8299664258957,
      y: 40.3794317823335,
    },
    {
      _id: 16,
      cityId: '10',
      name: 'Memar Əcəmi',
      nameRu: 'Мемар Аджеми',
      nameEn: 'Memar Ajami',
      x: 49.8144739866257,
      y: 40.4117111472699,
    },
    {
      _id: 17,
      cityId: '10',
      name: 'Sahil',
      nameRu: 'Сахил',
      nameEn: 'Sahil',
      x: 49.8444718122482,
      y: 40.3718918460624,
    },
    {
      _id: 18,
      cityId: '10',
      name: 'Elmlər Akademiyası',
      nameRu: 'Элмляр Академиясы',
      nameEn: 'Elmlar Akademiyası',
      x: 49.815428853035,
      y: 40.3750918245097,
    },
    {
      _id: 19,
      cityId: '10',
      name: 'Avtovağzal',
      nameRu: 'Автовокзал',
      nameEn: 'Avtovagzal',
      x: 49.7950387001038,
      y: 40.4215050632847,
    },
    {
      _id: 20,
      cityId: '10',
      name: 'Nəsimi',
      nameRu: 'Насими',
      nameEn: 'Nasimi',
      x: 49.8239582777023,
      y: 40.4243596520195,
    },
    {
      _id: 21,
      cityId: '10',
      name: 'Azadlıq prospekti',
      nameRu: 'Азадлыг проспекти',
      nameEn: 'Azadlig Prospekti',
      x: 49.8427551984787,
      y: 40.4258461137809,
    },
    {
      _id: 22,
      cityId: '10',
      name: '8 Noyabr',
      nameRu: '8 ноября',
      nameEn: '8 Noyabr',
      x: 49.8201763629913,
      y: 40.4027777548833,
    },
    {
      _id: 23,
      cityId: '10',
      name: 'Dərnəgül',
      nameRu: 'Дарнагюль',
      nameEn: 'Darnagul',
      x: 49.8617023229599,
      y: 40.4250457153759,
    },
    {
      _id: 24,
      cityId: '10',
      name: 'Cəfər Cabbarlı',
      nameRu: 'Джафар Джаббарлы',
      nameEn: 'Jafar Jabbarli',
      x: 49.8487848043442,
      y: 40.3795911539942,
    },
    {
      _id: 25,
      cityId: '10',
      name: 'Şah İsmayıl Xətai',
      nameRu: 'Шах Исмаил Хатаи',
      nameEn: 'Shah Ismail Hatai',
      x: 49.8720180988312,
      y: 40.3830359415883,
    },
  ],
  children: [
    {
      id: '114',
      y: 40.379108951404,
      name: 'Xətai',
      nameRu: 'Хатаи',
      nameEn: 'Khatai',
      type: '8',
      x: 49.8786270618439,
      routeName: 'khatai',
    },
    {
      id: '111',
      y: 40.3763014830388,
      name: 'Nəsimi',
      nameRu: 'Насими',
      nameEn: 'Nasimi',
      type: '8',
      x: 49.8472934961319,
      routeName: 'nasimi',
    },
    {
      id: '112',
      y: 40.3955059887146,
      name: 'Nərimanov',
      nameRu: 'Нариманов',
      nameEn: 'Narimanov',
      type: '8',
      x: 49.8594170808792,
      routeName: 'narimanov',
    },
    {
      id: '115',
      y: 40.3691167736574,
      name: 'Səbail',
      nameRu: 'Сабаил',
      nameEn: 'Sabail',
      type: '8',
      x: 49.8363661766052,
      routeName: 'sabail',
    },
    {
      id: '120',
      y: 40.517045400302,
      name: 'Xəzər',
      nameRu: 'Хазар',
      nameEn: 'Khazar',
      type: '8',
      x: 50.106834769249,
      routeName: 'khazar',
    },
    {
      id: '117',
      y: 40.4140392714797,
      name: 'Binəqədi',
      nameRu: 'Бинагади',
      nameEn: 'Binagadi',
      type: '8',
      x: 49.839391708374,
      routeName: 'binagadi',
    },
    {
      id: '116',
      y: 40.3721125391098,
      name: 'Yasamal',
      nameRu: 'Ясамал',
      nameEn: 'Yasamal',
      type: '8',
      x: 49.817596077919,
      routeName: 'yasamal',
    },
    {
      id: '121',
      y: 40.3046121997112,
      name: 'Qaradağ',
      nameRu: 'Гарадаг',
      nameEn: 'Garadagh',
      type: '8',
      x: 49.6176052093506,
      routeName: 'garadagh',
    },
    {
      id: '113',
      y: 40.3974955893046,
      name: 'Nizami',
      nameRu: 'Низами',
      nameEn: 'Nizami',
      type: '8',
      x: 49.9464815855026,
      routeName: 'nizami',
    },
    {
      id: '119',
      y: 40.3829296992892,
      name: 'Suraxanı',
      nameRu: 'Сураханы',
      nameEn: 'Surakhani',
      type: '8',
      x: 49.9794673919678,
      routeName: 'surakhani',
    },
    {
      id: '122',
      y: 40.3169904084288,
      name: 'Pirallahı',
      nameRu: 'Пираллахи',
      nameEn: 'Pirallahi',
      type: '8',
      x: 50.5906891822815,
      routeName: 'pirallahi',
    },
    {
      id: '118',
      y: 40.4428890716172,
      name: 'Sabunçu',
      nameRu: 'Сабунчи',
      nameEn: 'Sabunchu',
      type: '8',
      x: 49.9431449174881,
      routeName: 'sabunchu',
    },
  ],
};

export const defaultPost: Post = {
  _id: 0,
  userType: UserType.owner,
  estateType: EstateType.house,
  dealType: DealType.sale,
  location: [0, 0],
  city: capitalCity,
  district: capitalCity.children![0],
  address: '',
  rooms: 0,
  lotSqm: 0,
  floor: 0,
  totalFloors: 0,
  sqm: 0,
  renovation: Renovation.cosmetic,
  videoLink: '',
  images: [],
  originalImages: [],
  phoneNumber: '',
  username: '',
  user: '',
  price: 0,
  step: 0,
  reviewHistory: [],
  createdAt: null,
  updatedAt: null,
  isExternal: false,
  source: '',
};

export const defaultPostFilters: PostFilters = {
  city: capitalCity,
  districts: [],
  subdistricts: [],
  metroStations: [],
  estateType: EstateType.apartment,
  dealType: DealType.sale,
  priceMin: 0,
  priceMax: 0,
  roomsMin: 0,
  roomsMax: 0,
  rooms: [],
  sqmMin: 0,
  sqmMax: 0,
  livingRoomsSqmMin: 0,
  livingRoomsSqmMax: 0,
  kitchenSqmMin: 0,
  kitchenSqmMax: 0,
  lotSqmMin: 0,
  lotSqmMax: 0,
  floorMin: 0,
  floorMax: 0,
  totalFloorsMin: 0,
  totalFloorsMax: 0,
  hasVideo: false,
  documented: false,
  fromOwner: false,
  withoutRedevelopment: false,
  sort: SortType.dateDsc,
  pagination: {
    current: 1,
  },
};

export const defaultAlternativeFilters: AlternativePostFilters = {
  pagination: {
    current: 1,
  },
};
