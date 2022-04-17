import { Reducer } from 'react';
import { defaultPost } from '../utils/defaultSettlements';
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
  Logout = 'LOGOUT',
  AddPostToFavorites = 'ADD_POST_TO_FAVORITES',
  RemovePostFromFavorites = 'REMOVE_POST_FROM_FAVORITES',
  InitPost = 'INIT_POST',
  UpdatePost = 'UPDATE_POST',
}

// PAYLOAD TYPES
type PostsPayload = {
  [Types.GetPosts]: Post[];
};

type AuthPayload = {
  [Types.LoadUser]: AuthContext;
  [Types.LoginUser]: string;
  [Types.VerifyUser]: string;
  [Types.Logout]: null;
  [Types.AddPostToFavorites]: { [key: string]: boolean };
  [Types.RemovePostFromFavorites]: { [key: string]: boolean };
};

type PostPayload = {
  [Types.InitPost]: null;
  [Types.UpdatePost]: Post;
};

// ACTION TYPES
export type PostsActions =
  ActionMap<PostsPayload>[keyof ActionMap<PostsPayload>];

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

// REDUCERS
export const postsReducer: Reducer<
  PostsContext,
  PostsActions | AuthActions | PostActions
> = (state, action) => {
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

export const authReducer: Reducer<
  AuthContext,
  PostsActions | AuthActions | PostActions
> = (state, action) => {
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
    case Types.Logout:
      return {};
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

export const postReducer: Reducer<
  Post,
  PostsActions | AuthActions | PostActions
> = (state, action) => {
  switch (action.type) {
    case Types.InitPost:
      return defaultPost;
    case Types.UpdatePost:
      return action.payload;
    default:
      return state;
  }
};