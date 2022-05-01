import { Dispatch } from 'react';
import axios from 'axios';
import { Types } from '../store/reducers';
import { setURLParams } from '../utils/urlParams';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import AddressNotFound from '../utils/errors/addressNotFound';
import getErrorMessage from '../utils/errors/getErrorMessage';
import { Post, Address, Settlement } from '../types';

interface GeocoderResponse {
  rows: [
    {
      addr: string;
      city: string;
      district: string;
      fax: string;
      guid: string;
      id: number;
      mctt: string;
      nm: string;
      phone: string;
      postal: string;
      settlement: string;
      stp: string;
      street: string;
      subtypeid: string;
      type: string;
      typeid: string;
      url: string;
      x: number;
      y: number;
    },
  ];
  success: boolean;
  total: number;
}

interface Coords {
  lng: string;
  x: number;
  y: number;
}

interface CoordsResponse {
  addr: string;
  addr_components: [
    {
      name: string;
      type: string;
    },
  ];
  success: boolean;
}

interface GetAddressResult {
  city: Settlement;
  district?: Settlement;
  subdistrict?: Settlement;
  address: string;
  metroStation?: null;
}

export const initPost = () => {
  return async (
    dispatch: Dispatch<{ type: Types.InitPost; payload: null }>,
  ) => {
    dispatch({ type: Types.InitPost, payload: null });
  };
};

export const updatePost = (post: Post) => {
  return async (
    dispatch: Dispatch<{ type: Types.UpdatePost; payload: Post }>,
  ) => {
    dispatch({ type: Types.UpdatePost, payload: post });
  };
};

export const geocoder = async (text: string, lon: number, lat: number) => {
  const url = setURLParams({
    q: text,
    lon: lon.toString(),
    lat: lat.toString(),
  });

  try {
    const response = await axios.get<GeocoderResponse>(
      `/api/localities/geocoder/?${url}`,
    );

    const addresses: Address[] = response.data.rows.map((element) => {
      return {
        name: element.nm,
        address: element.addr,
        longitude: element.x,
        latitude: element.y,
      };
    });

    return addresses;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const getLocalities = async (queryParameters: {
  [key: string]: string;
}) => {
  const url = setURLParams(queryParameters);

  try {
    return await axios.get<Settlement[]>(`/api/localities/?${url}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const getAddressByCoords = async (data: Coords) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post<CoordsResponse>(
      '/api/localities/getAddressByCoords',
      data,
      config,
    );

    let cityName = '';
    let districtName = '';
    let subdistrictName = '';
    let address = '';

    if (response.data.success === true) {
      response.data.addr_components.forEach(async (addressComponent) => {
        if (addressComponent.type === 'country district') {
          cityName = addressComponent.name;
        }
        if (addressComponent.type === 'settlement district') {
          districtName = addressComponent.name;
        }
        if (addressComponent.type === 'settlement') {
          subdistrictName = addressComponent.name;
        }
        if (addressComponent.type === 'street') {
          address = addressComponent.name;
        }
      });
    }

    if (!cityName) {
      throw new AddressNotFound('');
    }

    let district;
    let subdistrict;

    // City
    const result = await getLocalities({ name: cityName, type: '2' });
    const city = result.data[0];

    // District
    if (districtName) {
      district = city.children?.find((element) => {
        return element.name === districtName;
      });
      if (district) {
        const result = await getLocalities({ id: district.id });
        const districtResult = result.data[0];
        district = districtResult;
      }
    }

    // Subdistrict
    if (subdistrictName && district) {
      subdistrict = district.children?.find((element) => {
        return element.name === subdistrictName;
      });
    }

    const state: GetAddressResult = {
      city,
      district,
      subdistrict,
      address,
    };

    if (!city.metroStations) {
      state.metroStation = null;
    }

    return state;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};
