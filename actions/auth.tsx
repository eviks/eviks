import axios from 'axios';
import Cookies from 'js-cookie';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import getErrorMessage from '../utils/errors/getErrorMessage';

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

export const loginUser = async (email: string, password: string) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post('/api/auth', { email, password }, config);
    Cookies.set('token', response.data.token);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
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
