import { Dispatch } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Types } from '../store/reducers';
import { AuthContext, User } from '../types';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import getErrorMessage from '../utils/errors/getErrorMessage';

export const loadUser = () => {
  return async (
    dispatch: Dispatch<{
      type: Types.LoadUser;
      payload: AuthContext;
    }>,
  ) => {
    const token = Cookies.get('token');

    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      const response = await axios.get<User>(`/api/auth`, config);
      dispatch({
        type: Types.LoadUser,
        payload: { user: response.data, token },
      });
    } catch (error) {
      Cookies.remove('token');
    }
  };
};

export const registerUser = async (
  displayName: string,
  email: string,
  password: string,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/users', { displayName, email, password }, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<{ type: Types.Login; payload: string }>) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post(
        '/api/auth',
        { email, password },
        config,
      );
      Cookies.set('token', response.data.token);
      dispatch({ type: Types.Login, payload: response.data.token });
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }
  };
};

export const verifyUser = async (email: string, activationToken: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(
      '/api/auth/verification',
      { email, activationToken },
      config,
    );
    Cookies.set('token', response.data.token);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const addPostToFavorites = (postId: number, token: string) => {
  return async (
    dispatch: Dispatch<{
      type: Types.AddPostToFavorites;
      payload: { [key: string]: boolean };
    }>,
  ) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `/api/users/add_to_favorites/${postId}`,
        null,
        config,
      );

      dispatch({
        type: Types.AddPostToFavorites,
        payload: response.data.favorites,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }
  };
};

export const removePostFromFavorites = (postId: number, token: string) => {
  return async (
    dispatch: Dispatch<{
      type: Types.AddPostToFavorites;
      payload: { [key: string]: boolean };
    }>,
  ) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `/api/users/remove_from_favorites/${postId}`,
        null,
        config,
      );

      dispatch({
        type: Types.AddPostToFavorites,
        payload: response.data.favorites,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }
  };
};
