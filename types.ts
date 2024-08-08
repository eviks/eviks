import { NextPage } from 'next';

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

export enum SortType {
  priceAsc = 'priceAsc',
  priceDsc = 'priceDsc',
  sqmAsc = 'sqmAsc',
  sqmDsc = 'sqmDsc',
  dateAsc = 'dateAsc',
  dateDsc = 'dateDsc',
}

export interface MetroStation {
  _id: number;
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

export interface PostBlocking {
  user: string;
  username: string;
  blockingExpires: Date;
}

export type ReviewStatus = 'onreview' | 'confirmed' | 'rejected';

export interface ReviewHistory {
  user: string;
  date: Date;
  result: boolean;
  comment: string;
}

export interface Post {
  _id: number;
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
  originalImages?: string[];
  price: number;
  haggle?: boolean;
  installmentOfPayment?: boolean;
  prepayment?: boolean;
  municipalServicesIncluded?: boolean;
  videoLink?: string;
  phoneNumber?: string;
  username: string;
  user: string;
  step?: number;
  lastStep?: number;
  blocking?: PostBlocking;
  reviewStatus?: ReviewStatus;
  rereview?: boolean;
  reviewHistory: ReviewHistory[];
  createdAt: Date | null;
  updatedAt: Date | null;
  isExternal: boolean;
  source: string;
}

export interface Pagination {
  current: number;
  available?: number;
  skipped?: number;
}

export interface PostsWithPagination {
  result: Post[];
  pagination: Pagination;
}

export interface User {
  _id: string;
  displayName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  active?: boolean;
  activationToken?: string;
  activationTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  picture?: string;
  googleId?: string;
  favorites?: { [key: string]: boolean };
  role: 'user' | 'moderator';
}

export interface PostFilters {
  city: Settlement;
  districts: Settlement[];
  subdistricts: Settlement[];
  metroStations: MetroStation[];
  dealType: DealType;
  estateType: EstateType;
  apartmentType?: ApartmentType | null;
  priceMin: number;
  priceMax: number;
  roomsMin: number;
  roomsMax: number;
  rooms: number[];
  sqmMin: number;
  sqmMax: number;
  livingRoomsSqmMin: number;
  livingRoomsSqmMax: number;
  kitchenSqmMin: number;
  kitchenSqmMax: number;
  lotSqmMin: number;
  lotSqmMax: number;
  floorMin: number;
  floorMax: number;
  totalFloorsMin: number;
  totalFloorsMax: number;
  sort: SortType;
  pagination: Pagination;
  hasVideo: boolean;
  documented: boolean;
  fromOwner: boolean;
  withoutRedevelopment: boolean;
}

export interface AlternativePostFilters {
  ids?: string[];
  userId?: string;
  reviewStatus?: ReviewStatus;
  pagination: Pagination;
}

export interface PostsContext {
  posts: Post[];
  filters: PostFilters;
  alternativeFilters: AlternativePostFilters;
}

export interface AuthContext {
  token?: string;
  user?: User;
  isInit: boolean;
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

export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  displayBottomNavigationBar?: boolean;
  displaySearchBar?: boolean;
  hideAppbar?: boolean;
};

export interface QueryParams {
  districtId: string;
  subdistrictId: string;
  metroStationId: string;
  apartmentType: string;
  priceMin: string;
  priceMax: string;
  sqmMin: string;
  sqmMax: string;
  lotSqmMin: string;
  lotSqmMax: string;
  livingRoomsSqmMin: string;
  livingRoomsSqmMax: string;
  kitchenSqmMin: string;
  kitchenSqmMax: string;
  rooms: string;
  floorMin: string;
  floorMax: string;
  totalFloorsMin: string;
  totalFloorsMax: string;
  hasVideo: string;
  documented: string;
  fromOwner: string;
  withoutRedevelopment: string;
  sort: string;
  page: string;
}

export interface AddressError {
  errorText: string;
  errorFiled: 'location' | 'city' | 'settlement' | '';
  displayError: boolean;
}

export interface CarouselContent {
  type: 'image' | 'video';
  link: string;
}
