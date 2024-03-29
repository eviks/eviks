import { Dispatch } from 'react';
import axios from 'axios';
import { getLocalities } from './localities';
import { Types } from '../store/reducers';
import { setURLParams } from '../utils/urlParams';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import AddressNotFound from '../utils/errors/addressNotFound';
import getErrorMessage from '../utils/errors/getErrorMessage';
import { Post, Address, Settlement, ImageData } from '../types';

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

export const initPost = (post: Post | null) => {
  return async (
    dispatch: Dispatch<{ type: Types.InitPost; payload: Post | null }>,
  ) => {
    if (post) {
      try {
        // City
        const cityResult = await getLocalities({ id: post.city.id });
        const city = cityResult.data[0];

        // District
        const districtResult = await getLocalities({ id: post.district.id });
        const district = districtResult.data[0];

        dispatch({
          type: Types.InitPost,
          payload: { ...post, city, district },
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === '500')
          throw new ServerError(error.message);
        else {
          throw new Failure(getErrorMessage(error));
        }
      }
    } else {
      dispatch({ type: Types.InitPost, payload: post });
    }
  };
};

export const setPostData = (post: Post) => {
  return async (
    dispatch: Dispatch<{ type: Types.SetPostData; payload: Post }>,
  ) => {
    dispatch({ type: Types.SetPostData, payload: post });
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
    } else if (district?.children?.length === 1) {
      [subdistrict] = district.children;
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

export const getImageUploadId = async (token: string) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  try {
    const result = await axios.get<{ id: string }>(
      '/api/posts/generate_upload_id',
      config,
    );
    return result.data.id;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const uploadImage = async (token: string, imageData: ImageData) => {
  const formData = new FormData();
  formData.append('image', imageData.file ?? '');
  formData.append('id', imageData.id);

  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    await axios.post<{ id: string }>(
      '/api/posts/upload_image',
      formData,
      config,
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const deleteImage = async (token: string, id: string) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  try {
    await axios.delete<{ id: string }>(`/api/posts/delete_image/${id}`, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const createPost = async (token: string, post: Post) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    return await axios.post<Post>('/api/posts/', post, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const updatePost = async (token: string, post: Post) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    return await axios.put<Post>(`/api/posts/${post._id}`, post, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const deletePost = (token: string, postId: number) => {
  return async (
    dispatch: Dispatch<{ type: Types.DeletePost; payload: number }>,
  ) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await axios.delete(`/api/posts/${postId}`, config);
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }

    dispatch({ type: Types.DeletePost, payload: postId });
  };
};

export const deleteUnreviewedPost = (token: string, postId: number) => {
  return async (
    dispatch: Dispatch<{ type: Types.DeletePost; payload: number }>,
  ) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await axios.delete(`/api/posts/unreviewed/${postId}`, config);
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }

    dispatch({ type: Types.DeletePost, payload: postId });
  };
};

export const confirmPost = async (token: string, postId: number) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    return await axios.post<Post>(`/api/posts/confirm/${postId}`, {}, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const rejectPost = async (
  token: string,
  postId: number,
  comment: string,
) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    return await axios.post<Post>(
      `/api/posts/reject/${postId}`,
      { comment },
      config,
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};
