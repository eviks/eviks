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

export interface Settlement {
  id: string;
  name: string;
  nameRu: string;
  nameEn: string;
  routeName: string;
  x: number;
  y: number;
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
  rooms: number;
  lotSqm: number;
  floor: number;
  totalFloors: number;
  sqm: number;
  description: string;
  images: string[];
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
}

export interface Address {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
}
