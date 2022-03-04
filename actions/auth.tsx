import axios from 'axios';
import Cookies from 'js-cookie';
import Failure from '../utils/failure';
import ServerError from '../utils/serverError';
import getErrorMessage from '../utils/getErrorMessage';

interface registerData {
  displayName: string;
  email: string;
  password: string;
}

interface loginData {
  email: string;
  password: string;
}

export const registerUser = async (data: registerData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/users', data, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const loginUser = async (data: loginData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post('/api/auth', data, config);
    Cookies.set('token', response.data.token);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};
