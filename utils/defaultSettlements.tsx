import { Settlement, Post, UserType, EstateType, DealType } from '../types';

export const capitalCity: Settlement = {
  id: '10',
  name: 'Bakı',
  children: [
    { id: '117', name: 'Binəqədi' },
    { id: '112', name: 'Nərimanov' },
    { id: '111', name: 'Nəsimi' },
    { id: '113', name: 'Nizami' },
    { id: '122', name: 'Pirallahı' },
    { id: '121', name: 'Qaradağ' },
    { id: '118', name: 'Sabunçu' },
    { id: '115', name: 'Səbail' },
    { id: '119', name: 'Suraxanı' },
    { id: '114', name: 'Xətai' },
    { id: '120', name: 'Xəzər' },
    { id: '116', name: 'Yasamal' },
  ],
};

export const defaultPost: Post = {
  _id: 0,
  active: false,
  userType: UserType.owner,
  estateType: EstateType.house,
  dealType: DealType.sale,
  location: [],
  city: capitalCity,
  district: capitalCity.children![0],
  address: '',
  rooms: 0,
  lotSqm: 0,
  floor: 0,
  totalFloors: 0,
  sqm: 0,
  description: '',
  images: [],
  price: 0,
  step: 0,
};
