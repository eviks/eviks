import { Dispatch } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Types } from '../store/reducers';
import { setURLParams } from '../utils/urlParams';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import getErrorMessage from '../utils/errors/getErrorMessage';
import { Post, PostFilters } from '../types';

export const fetchPost = async (postId: string) => {
  try {
    const response = await axios.get<Post>(
      `${process.env.BASE_URL}/api/posts/post/${postId}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

const getPostsQuery = (filters: PostFilters, fetch: boolean = false) => {
  const searchParams: { [key: string]: string } = {};
  if (filters.apartmentType)
    searchParams.apartmentType = filters.apartmentType.toString();
  if (filters.priceMin) searchParams.priceMin = filters.priceMin.toString();
  if (filters.priceMax) searchParams.priceMax = filters.priceMax.toString();
  if (filters.sqmMin) searchParams.sqmMin = filters.sqmMin.toString();
  if (filters.sqmMax) searchParams.sqmMax = filters.sqmMax.toString();
  if (filters.lotSqmMin) searchParams.lotSqmMin = filters.lotSqmMin.toString();
  if (filters.lotSqmMax) searchParams.lotSqmMax = filters.lotSqmMax.toString();
  if (filters.livingRoomsSqmMin)
    searchParams.livingRoomsSqmMin = filters.livingRoomsSqmMin.toString();
  if (filters.livingRoomsSqmMax)
    searchParams.livingRoomsSqmMax = filters.livingRoomsSqmMax.toString();
  if (filters.kitchenSqmMin)
    searchParams.kitchenSqmMin = filters.kitchenSqmMin.toString();
  if (filters.kitchenSqmMax)
    searchParams.kitchenSqmMax = filters.kitchenSqmMax.toString();
  if (filters.rooms.length > 0) searchParams.rooms = filters.rooms.join(',');
  if (filters.floorMin) searchParams.floorMin = filters.floorMin.toString();
  if (filters.floorMax) searchParams.floorMax = filters.floorMax.toString();
  if (filters.totalFloorsMin)
    searchParams.totalFloorsMin = filters.totalFloorsMin.toString();
  if (filters.totalFloorsMax)
    searchParams.totalFloorsMax = filters.totalFloorsMax.toString();
  // Districts
  if (
    filters.districts.length > 1 ||
    filters.subdistricts.length > 0 ||
    (filters.districts.length > 0 && fetch)
  ) {
    searchParams.districtId = filters.districts
      .map((district) => {
        return district.id;
      })
      .join(',');
  }
  // Subdistricts
  if (
    filters.subdistricts.length > 0 ||
    (filters.subdistricts.length > 0 && fetch)
  ) {
    searchParams.subdistrictId = filters.subdistricts
      .map((subdistrict) => {
        return subdistrict.id;
      })
      .join(',');
  }

  return searchParams;
};

export const fetchPosts = (filters: PostFilters) => {
  return async (
    dispatch: Dispatch<{ type: Types.GetPosts; payload: Post[] }>,
  ) => {
    try {
      const query = getPostsQuery(filters, true);

      query.cityId = filters.city.id;
      query.estateType = filters.estateType;
      query.dealType = filters.dealType;

      const url = setURLParams(query);

      const response = await axios.get<{ result: Post[] }>(
        `/api/posts/?${url && `${url}&`}limit=${15}&page=1`,
      );

      dispatch({ type: Types.GetPosts, payload: response.data.result });
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }
  };
};

export const setFilters = (postFilters: PostFilters) => {
  return async (
    dispatch: Dispatch<{ type: Types.SetFilters; payload: PostFilters }>,
  ) => {
    dispatch({ type: Types.SetFilters, payload: postFilters });
  };
};

export const pushToNewPostsRoute = (postFilters: PostFilters) => {
  let extraPathName = '';

  if (
    postFilters.districts.length === 1 &&
    postFilters.subdistricts.length === 0
  )
    extraPathName = `/${postFilters.districts[0].routeName}`;

  Router.push(
    {
      pathname: `/${postFilters.city.routeName}${extraPathName}/${postFilters.estateType}/${postFilters.dealType}`,
      query: getPostsQuery(postFilters),
    },
    undefined,
    { shallow: true },
  );
};
