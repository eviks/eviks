import { Reducer } from 'react';
import {
  defaultPost,
  defaultPostFilters,
  defaultAlternativeFilters,
} from '../utils/defaultValues';
import {
  Post,
  PostFilters,
  AlternativePostFilters,
  PostsContext,
  AuthContext,
  PostsWithPagination,
} from '../types';

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
  DeletePost = 'DELETE_POST',
  SetFilters = 'SET_FILTERS',
  SetAlternativeFilters = 'SET_ALTERNATIVE_FILTERS',
  ClearPosts = 'CLEAR_POSTS',
  LoadUser = 'LOAD_USER',
  LoginUser = 'LOGIN_USER',
  VerifyUser = 'VERIFY_USER',
  Logout = 'LOGOUT',
  DeleteUser = 'DELETE_USER',
  AddPostToFavorites = 'ADD_POST_TO_FAVORITES',
  RemovePostFromFavorites = 'REMOVE_POST_FROM_FAVORITES',
  InitPost = 'INIT_POST',
  SetPostData = 'SET_POST_DATA',
  SetTheme = 'SET_THEME',
}

// PAYLOAD TYPES
type PostsPayload = {
  [Types.GetPosts]: PostsWithPagination;
  [Types.DeletePost]: number;
  [Types.SetFilters]: PostFilters;
  [Types.SetAlternativeFilters]: AlternativePostFilters;
  [Types.ClearPosts]: undefined;
};

type AuthPayload = {
  [Types.LoadUser]: AuthContext;
  [Types.LoginUser]: string;
  [Types.VerifyUser]: string;
  [Types.Logout]: null;
  [Types.DeleteUser]: null;
  [Types.AddPostToFavorites]: { [key: string]: boolean };
  [Types.RemovePostFromFavorites]: { [key: string]: boolean };
};

type PostPayload = {
  [Types.InitPost]: Post | null;
  [Types.SetPostData]: Post;
};

type ThemePayload = {
  [Types.SetTheme]: 'light' | 'dark';
};

// ACTION TYPES
export type PostsActions =
  ActionMap<PostsPayload>[keyof ActionMap<PostsPayload>];

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

export type ThemeActions =
  ActionMap<ThemePayload>[keyof ActionMap<ThemePayload>];

// REDUCERS
export const postsReducer: Reducer<
  PostsContext,
  PostsActions | AuthActions | PostActions | ThemeActions
> = (state, action) => {
  switch (action.type) {
    case Types.GetPosts:
      return {
        ...state,
        posts: action.payload.result,
        filters: { ...state.filters, pagination: action.payload.pagination },
        alternativeFilters: {
          ...state.alternativeFilters,
          pagination: action.payload.pagination,
        },
      };
    case Types.DeletePost:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action.payload;
        }),
      };
    case Types.SetFilters:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case Types.SetAlternativeFilters:
      return {
        ...state,
        alternativeFilters: { ...state.alternativeFilters, ...action.payload },
      };
    case Types.ClearPosts:
      return {
        ...state,
        posts: [],
        filters: defaultPostFilters,
        alternativeFilters: defaultAlternativeFilters,
      };
    default:
      return state;
  }
};

export const authReducer: Reducer<
  AuthContext,
  PostsActions | AuthActions | PostActions | ThemeActions
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
    case Types.DeleteUser:
      return {
        ...state,
        token: undefined,
        user: undefined,
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

export const postReducer: Reducer<
  Post,
  PostsActions | AuthActions | PostActions | ThemeActions
> = (state, action) => {
  switch (action.type) {
    case Types.InitPost:
      if (action.payload) {
        return {
          ...action.payload,
          originalImages: action.payload.images,
          step: 0,
          lastStep: 8,
        };
      }
      return defaultPost;
    case Types.SetPostData:
      return action.payload;
    default:
      return state;
  }
};

export const themeReducer: Reducer<
  'light' | 'dark',
  PostsActions | AuthActions | PostActions | ThemeActions
> = (state, action) => {
  switch (action.type) {
    case Types.SetTheme:
      return action.payload;
    default:
      return state;
  }
};
