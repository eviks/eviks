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

    if (!token) {
      dispatch({
        type: Types.LoadUser,
        payload: { isInit: true },
      });
    }

    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      const response = await axios.get<User>(`/api/auth`, config);
      dispatch({
        type: Types.LoadUser,
        payload: { user: response.data, token, isInit: true },
      });
    } catch (error) {
      Cookies.remove('token');
      dispatch({
        type: Types.LoadUser,
        payload: { isInit: true },
      });
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
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
  Cookies.remove('token');
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

export const updateUser = async (
  token: string,
  data: { displayName: string },
) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put('/api/users', data, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const changeUserPassword = async (
  token: string,
  data: { password: string; newPassword: string },
) => {
  const config = {
    headers: {
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.put('/api/users/change_password', data, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const deleteUser = (token: string) => {
  return async (
    dispatch: Dispatch<{
      type: Types.DeleteUser;
      payload: null;
    }>,
  ) => {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await axios.delete('/api/users', config);
      Cookies.remove('token');
      dispatch({
        type: Types.DeleteUser,
        payload: null,
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

export const createResetPasswordToken = async (email: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post(
      '/api/auth/create_reset_password_token',
      { email },
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

export const verifyResetPasswordToken = async (
  email: string,
  resetPasswordToken: string,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post(
      '/api/auth/check_reset_password_token',
      { email, resetPasswordToken },
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

export const resetPassword = (
  email: string,
  resetPasswordToken: string,
  password: string,
) => {
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
        '/api/auth/reset_password',
        { email, resetPasswordToken, password },
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
