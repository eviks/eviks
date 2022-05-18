import { Dispatch } from 'react';
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

export const fetchPosts = (filters: PostFilters) => {
  return async (
    dispatch: Dispatch<{ type: Types.GetPosts; payload: Post[] }>,
  ) => {
    try {
      const searchParams = {
        cityId: filters.city.id,
        dealType: filters.dealType,
      };

      const url = setURLParams(searchParams);

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
