import { Dispatch } from 'react';
import { Types } from '../store/reducers';
import { Post } from '../types';

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
