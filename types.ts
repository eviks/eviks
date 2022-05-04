export interface ErrorAlert {
  message: string;
  open: boolean;
}

export enum UserType {
  owner = 'owner',
  agent = 'agent',
}

export enum EstateType {
  apartment = 'apartment',
  house = 'house',
}

export enum ApartmentType {
  newBuilding = 'newBuilding',
  secondaryBuilding = 'secondaryBuilding',
}

export enum DealType {
  sale = 'sale',
  rent = 'rent',
  rentPerDay = 'rentPerDay',
}

export enum Renovation {
  cosmetic = 'cosmetic',
  designer = 'designer',
  noRenovation = 'noRenovation',
}

export interface MetroStation {
  _id: String;
  cityId: string;
  name: string;
  nameRu: string;
  nameEn: string;
  x: number;
  y: number;
}

export interface Settlement {
  id: string;
  name: string;
  nameRu: string;
  nameEn: string;
  type: string;
  routeName: string;
  x: number;
  y: number;
  metroStations?: MetroStation[];
  children?: Settlement[];
}

export interface Post {
  _id: number;
  active: boolean;
  userType: UserType;
  estateType: EstateType;
  apartmentType?: ApartmentType;
  dealType: DealType;
  location: [number, number];
  city: Settlement;
  district: Settlement;
  subdistrict?: Settlement;
  address: string;
  metroStation?: MetroStation;
  rooms: number;
  sqm: number;
  livingRoomsSqm?: number;
  kitchenSqm?: number;
  lotSqm?: number;
  floor?: number;
  totalFloors?: number;
  renovation: Renovation;
  documented?: boolean;
  redevelopment?: boolean;
  yearBuild?: number;
  ceilingHeight?: number;
  elevator?: boolean;
  parkingLot?: boolean;
  description?: string;
  balcony?: boolean;
  furniture?: boolean;
  kitchenFurniture?: boolean;
  cableTv?: boolean;
  phone?: boolean;
  internet?: boolean;
  electricity?: boolean;
  gas?: boolean;
  water?: boolean;
  heating?: boolean;
  tv?: boolean;
  conditioner?: boolean;
  washingMachine?: boolean;
  dishwasher?: boolean;
  refrigerator?: boolean;
  kidsAllowed?: boolean;
  petsAllowed?: boolean;
  garage?: boolean;
  pool?: boolean;
  bathhouse?: boolean;
  images: string[];
  originalImages: string[];
  price: number;
  step?: number;
  lastStep?: number;
}

export interface User {
  _id: String;
  displayName: String;
  email: String;
  createdAt: Date;
  updatedAt: Date;
  active?: boolean;
  activationToken?: String;
  activationTokenExpires?: Date;
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
  picture?: String;
  googleId?: String;
  favorites?: { [key: string]: boolean };
}

export interface PostsContext {
  posts: Post[];
}

export interface AuthContext {
  token?: string;
  user?: User;
}

export interface MapState {
  location: [number, number];
  city: Settlement;
  district?: Settlement;
  subdistrict?: Settlement;
  address: string;
  metroStation?: MetroStation | null;
}

export interface Address {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface ImageData {
  file?: FileWithPreview;
  id: string;
  isTemp: boolean;
  isUploaded: boolean;
}
