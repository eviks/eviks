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

export const loadUserOnServer = async (token: string) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };

  try {
    const result = await axios.get<User>(
      `${process.env.BASE_URL}/api/auth`,
      config,
    );
    return result.data;
  } catch (error) {
    return undefined;
  }
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
  return async (
    dispatch: Dispatch<{ type: Types.LoginUser; payload: string }>,
  ) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post<{ token: string }>(
        '/api/auth',
        { email, password },
        config,
      );
      Cookies.set('token', response.data.token, { expires: 365 });
      dispatch({ type: Types.LoginUser, payload: response.data.token });
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }
  };
};

export const verifyUser = (email: string, activationToken: string) => {
  return async (
    dispatch: Dispatch<{
      type: Types.VerifyUser;
      payload: string;
    }>,
  ) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post<{ token: string }>(
        '/api/auth/verification',
        { email, activationToken },
        config,
      );
      Cookies.set('token', response.data.token, { expires: 365 });
      dispatch({ type: Types.VerifyUser, payload: response.data.token });
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === '500')
        throw new ServerError(error.message);
      else {
        throw new Failure(getErrorMessage(error));
      }
    }
  };
};
export const logout = () => {
  return async (
    dispatch: Dispatch<{
      type: Types.Logout;
      payload: null;
    }>,
  ) => {
    dispatch({
      type: Types.Logout,
      payload: null,
    });
  };
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
      const response = await axios.put<{
        favorites: { [key: string]: boolean };
      }>(`/api/users/add_to_favorites/${postId}`, null, config);

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
      const response = await axios.put<{
        favorites: { [key: string]: boolean };
      }>(`/api/users/remove_from_favorites/${postId}`, null, config);

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
