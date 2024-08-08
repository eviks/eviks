import { Dispatch } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Types } from '../store/reducers';
import { setURLParams } from '../utils/urlParams';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import getErrorMessage from '../utils/errors/getErrorMessage';
import {
  Post,
  PostFilters,
  PostsWithPagination,
  AlternativePostFilters,
} from '../types';

export const fetchPost = async (postId: string) => {
  try {
    const response = await axios.get<Post>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/post/${postId}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchUnreviewedPost = async (token: string, postId: string) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  try {
    const response = await axios.get<Post>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/unreviewed_post/${postId}`,
      config,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchPostPhoneNumber = async (postId: string) => {
  const response = await axios.get<{ phoneNumber: string }>(
    `/api/posts/phone_number/${postId}`,
  );
  return response.data;
};

export const getPostsQuery = (filters: PostFilters, fetch: boolean = false) => {
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
  if (filters.hasVideo) searchParams.hasVideo = 'true';
  if (filters.documented) searchParams.documented = 'true';
  if (filters.fromOwner) searchParams.fromOwner = 'true';
  if (filters.withoutRedevelopment) searchParams.withoutRedevelopment = 'true';
  if (filters.sort) searchParams.sort = filters.sort.toString();
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
  // Metro stations
  if (filters.metroStations.length > 0) {
    searchParams.metroStationId = filters.metroStations
      .map((metroStation) => {
        return metroStation._id;
      })
      .join(',');
  }
  // Page
  searchParams.page = filters.pagination.current.toString();

  return searchParams;
};

export const getAlternativePostQuery = (filters: AlternativePostFilters) => {
  const searchParams: { [key: string]: string } = {};
  if (filters.ids && filters.ids.length > 0)
    searchParams.ids = filters.ids.join(',');
  if (filters.userId) searchParams.userId = filters.userId;
  if (filters.reviewStatus) searchParams.reviewStatus = filters.reviewStatus;
  searchParams.page = filters.pagination.current.toString();
  return searchParams;
};

export const fetchPosts = (query: { [key: string]: string }) => {
  return async (
    dispatch: Dispatch<{ type: Types.GetPosts; payload: PostsWithPagination }>,
  ) => {
    try {
      const url = setURLParams(query);

      const response = await axios.get<PostsWithPagination>(
        `/api/posts/?${url && `${url}&`}limit=${15}`,
      );

      dispatch({ type: Types.GetPosts, payload: response.data });
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }
  };
};

export const fetchUnreviewedPosts = (
  token: string,
  query: { [key: string]: string },
) => {
  return async (
    dispatch: Dispatch<{ type: Types.GetPosts; payload: PostsWithPagination }>,
  ) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      const url = setURLParams(query);

      const response = await axios.get<PostsWithPagination>(
        `/api/posts/unreviewed_posts?${url && `${url}&`}limit=${50}`,
        config,
      );

      dispatch({ type: Types.GetPosts, payload: response.data });
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }
  };
};

export const fetchPostsOnServer = async (query: { [key: string]: string }) => {
  try {
    const url = setURLParams(query);

    const response = await axios.get<PostsWithPagination>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/?${
        url && `${url}&`
      }limit=${15}`,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const fetchUnreviewedPostsOnServer = async (
  token: string,
  query: { [key: string]: string },
) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  try {
    const url = setURLParams(query);

    const response = await axios.get<PostsWithPagination>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/unreviewed_posts/?${
        url && `${url}&`
      }limit=${15}`,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const setFilters = (postFilters: PostFilters) => {
  return async (
    dispatch: Dispatch<{ type: Types.SetFilters; payload: PostFilters }>,
  ) => {
    dispatch({ type: Types.SetFilters, payload: postFilters });
  };
};

export const setPosts = (posts: PostsWithPagination) => {
  return async (
    dispatch: Dispatch<{ type: Types.GetPosts; payload: PostsWithPagination }>,
  ) => {
    dispatch({ type: Types.GetPosts, payload: posts });
  };
};

export const setAlternativeFilters = (postFilters: AlternativePostFilters) => {
  return async (
    dispatch: Dispatch<{
      type: Types.SetAlternativeFilters;
      payload: AlternativePostFilters;
    }>,
  ) => {
    dispatch({ type: Types.SetAlternativeFilters, payload: postFilters });
  };
};

export const clearPosts = () => {
  return async (
    dispatch: Dispatch<{
      type: Types.ClearPosts;
    }>,
  ) => {
    dispatch({ type: Types.ClearPosts });
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
  );
};

export const blockUnreviewedPostForModeration = async (
  token: string,
  postId: string,
) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  try {
    const response = await axios.put<Post>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/block_for_moderation/${postId}`,
      null,
      config,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const unblockPostFromModeration = async (
  token: string,
  postId: string,
) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  try {
    const response = await axios.put<Post>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/unblock_from_moderation/${postId}`,
      null,
      config,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
