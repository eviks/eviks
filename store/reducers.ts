import { Reducer } from 'react';
import { Post, PostsContext, AuthContext } from '../types';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  GetPosts = 'GET_POSTS',
  LoadUser = 'LOAD_USER',
  LoginUser = 'LOGIN_USER',
  VerifyUser = 'VERIFY_USER',
  AddPostToFavorites = 'ADD_POST_TO_FAVORITES',
  RemovePostFromFavorites = 'REMOVE_POST_FROM_FAVORITES',
}

// PAYLOAD TYPES
type PostsPayload = {
  [Types.GetPosts]: Post[];
};

type AuthPayload = {
  [Types.LoadUser]: AuthContext;
  [Types.LoginUser]: string;
  [Types.VerifyUser]: string;
  [Types.AddPostToFavorites]: { [key: string]: boolean };
  [Types.RemovePostFromFavorites]: { [key: string]: boolean };
};

// ACTION TYPES
export type PostsActions =
  ActionMap<PostsPayload>[keyof ActionMap<PostsPayload>];

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

// REDUCERS
export const postsReducer: Reducer<PostsContext, PostsActions | AuthActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case Types.GetPosts:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export const authReducer: Reducer<AuthContext, PostsActions | AuthActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case Types.LoadUser:
      return {
        ...action.payload,
      };
    case Types.LoginUser:
    case Types.VerifyUser:
      return {
        ...state,
        token: action.payload,
      };
    case Types.AddPostToFavorites:
    case Types.RemovePostFromFavorites:
      return {
        ...state,
        user: state.user
          ? { ...state.user, favorites: action.payload }
          : undefined,
      };
    default:
      return state;
  }
};
